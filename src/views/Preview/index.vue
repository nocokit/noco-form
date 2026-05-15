<template>
  <div class="body">
    <a-drawer
      :title="'表单预览'"
      class="drawer"
      :style="{ 'background-image': `url(${bgImageUrl})` }"
      :height="'calc(100% - 0px)'"
      placement="bottom"
      :open="props.open"
      @close="onClose"
    >
      <template #extra>
        <div class="controls">
          <a-radio-group v-model:value="previewType">
            <a-radio-button value="Phone">移动端</a-radio-button>
            <a-radio-button value="PC">桌面端</a-radio-button>
          </a-radio-group>
        </div>
        <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
        <a-button type="primary" @click="onClose">保存</a-button>
      </template>

      <div class="body-content" :class="{ phone: previewType === 'Phone' }">
        <a-watermark :content="selectForm?.displayWaterMark ? selectForm?.waterMarkText || '' : ''">
          <a-alert class="alert" message="预览状态无法提交" type="warning" show-icon closable />

          <div class="comps" v-if="pageCompList.length">
            <div
              v-for="item in pageCompList"
              :key="item?.id"
              class="form-item"
              v-show="!hiddenIds.has(item.id)"
            >
              <FormComponent
                v-if="!isPagingType(item.type)"
                renderType="preview"
                :key="item.id + previewType"
                :component="item"
                :type="item.type"
                :isDev="false"
                :formConfig="selectForm"
                :previewType="previewType"
                :fieldError="fieldErrors[item.id]"
              />
            </div>

            <div
              class="form-footer form-item"
              :style="{ 'text-align': pageFooter.position || 'left' }"
            >
              <a-button
                :icon="pageFooter.buttonIconShowBool ? h(CheckOutlined) : null"
                class="submit"
                type="primary"
                :size="pageFooter.size"
                :style="{ padding: footerPadding }"
                @click="handleSubmit"
              >
                {{ pageFooter.buttonText || '提交' }}
              </a-button>
            </div>
          </div>

          <div v-else class="no-data">
            <img src="@/assets/form/no_data.svg" alt="">
            <div class="description">表单为空，请返回编辑器配置内容</div>
          </div>
        </a-watermark>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import FormComponent from '@/components-form/index.vue'
import { validateForm } from '@/composables/useFormValidation'
import { provideFormValues } from '@/composables/useFormValues'
import { getHiddenIds } from '@/composables/useLogicEvaluator'
import { getComponentDef } from '@/plugins/pluginManager'

type PreviewType = 'Phone' | 'PC'

interface Props {
  open: boolean
  selectForm: Record<string, any>
  pageFooter: {
    size?: 'large' | 'middle' | 'small'
    position?: 'left' | 'right' | 'center'
    buttonText?: string
    buttonIconShowBool?: boolean
  }
  pageCompList: any[]
}

const props = defineProps<Props>()
const emit = defineEmits(['onClose'])

const isPagingType = (type: string): boolean => {
  const def = getComponentDef(type)
  return def?.meta?.isPagingComponent === true
}

const formValues = provideFormValues()
const previewType = ref<PreviewType>('Phone')
const fieldErrors = ref<Record<string, string>>({})

const hiddenIds = computed(() => getHiddenIds(props.pageCompList, formValues))

const onClose = () => emit('onClose')

const handleSubmit = () => {
  const hidden = hiddenIds.value
  const visibleComps = props.pageCompList.filter(c => !hidden.has(c.id))
  const errors = validateForm(visibleComps)
  fieldErrors.value = errors
  if (Object.keys(errors).length > 0) {
    message.error('请检查表单填写内容', 2)
    // 滚动到第一个错误
    const firstErrId = Object.keys(errors)[0]
    document.getElementById(`field-${firstErrId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }
  message.success('校验通过！', 2)
}

const footerPadding = computed(() => {
  const s = props.pageFooter?.size
  return s === 'large' ? '0 ji26px' : s === 'small' ? '0 10px' : '0 16px'
})

const getImageUrl = (imgUrl?: string) => {
  try {
    return new URL(`/src/assets/background/${imgUrl || 'bg0.png'}`, import.meta.url).href
  } catch {
    return new URL('/src/assets/background/bg0.png', import.meta.url).href
  }
}

const bgImageUrl = computed(() => getImageUrl(props.selectForm?.bgImgUrl))
</script>

<style scoped lang="scss">
.alert {
  margin: 0 10px;
}

.body-content {
  width: 686px;
  background: #fff;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  height: calc(100% - 110px);
  border-radius: 6px;
  overflow-y: auto;
  padding: 20px 0 30px 0;

  &.phone {
    width: 390px;

    .form-item .comp-item { padding: 10px 20px 30px; }

    .form-footer { padding: 0 20px; margin-top: 15px; }

    ::v-deep(.comp-item .number) { left: 5px; }

    ::v-deep(.description.input-comp) { margin-left: 20px !important; }
  }
}

.comps {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.form-footer {
  height: 90px;
  line-height: 90px;
  padding: 0 60px;
  width: 100%;
  margin-top: 30px;
}

::v-deep(.ant-drawer-header) {
  background: red !important;
}
::v-deep(.form-footer) {
  .submit {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.no-data {
  text-align: center;
  margin: 20px;
  font-size: 16px;
  color: #666;

  img { width: 300px; margin: 20px; }
}

.controls {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
}
</style>
