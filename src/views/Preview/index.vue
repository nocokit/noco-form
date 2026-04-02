<template>
  <div class="body">
    <a-drawer :title="formShowConfig.formTitle" class="drawer" :height="'calc(100% - 0px)'" :placement="placement"
      :rootStyle="{
      }" :bodyStyle="{
        background: 'aliceblue',
        phone: previewType === 'Phone',
      }" :open="props.open" @close="onClose">
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
      <div class="body-content" :class="{
        phone: previewType === 'Phone',
      }">
        <a-watermark :content="selectForm?.displayWaterMark ? selectForm?.waterMarkText || '' : ''">
          <a-alert class="alert" message="预览状态无法提交" type="warning" show-icon closable/>
          <div class="comps" v-if="pageCompList.length">
            <div v-for="(item, index) in pageCompList" :key="item?.name" :class="{
              'cursor-move': true,
              'form-item': true,
            }">
              <FormComponent
                v-if="!['Paging'].includes(item.type) || (['Paging'].includes(item.type) && formShowConfig.displayPaging)"
                :renderType="'preview'"
                :key="item.id + previewType" 
                :component="item" 
                :type="item.type" 
                :isDev="false"
                :formConfig="selectForm"
                :previewType="previewType">
              </FormComponent>
            </div>
            <div class="form-footer" :class="{
              'form-item': true
            }"
            :style="{
              'text-align': pageFooter.position || 'left'
            }">
              <a-button 
                :icon="pageFooter.buttonIconShowBool ? h(CheckOutlined): null"
                class="submit" 
                type="primary"
                :size="pageFooter.size" :style="{ 'padding': getSize(), 'lineHeight': getLineheight() }">
                {{ pageFooter.buttonText || '提交' }}
              </a-button>

            </div>
          </div>
          <div v-else class="no-data">
            <img src="@/assets/form/no_data.svg" alt="">
            <div class="description">表单为空，请返回编辑器配置内容</div>
          </div>

          <!-- <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
            autocomplete="off">
            <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.username" />
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
              <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
          </a-form> -->

        </a-watermark>


      </div>



    </a-drawer>

  </div>

</template>
<script setup lang="ts">
type PreviewType = 'Phone' | 'PC'
import { ref, h } from 'vue';
import type { DrawerProps } from 'ant-design-vue';
import { CheckOutlined } from '@ant-design/icons-vue';
import FormComponent from '@/components-form/index.vue'
const placement = ref<DrawerProps['placement']>('bottom');
const formShowConfig = ref({
  formTitle: '表单预览',
  waterMarkBool: true,
  displayPaging: true,
})

const previewType = ref<PreviewType>('Phone')
const emit = defineEmits(['onClose'])

interface Props {
  open: any
  selectForm: any
  pageFooter: any
  pageCompList: any[]
}

const props = defineProps<Props>()


const onClose = () => {
  emit('onClose')
};


const getSize = () => {
  const data = props.pageFooter?.value
  return data?.size == 'large' ? "0 26px" : (data?.size == "small" ? "0 10px" : "0 16px")
}

const getLineheight = () => {
  const data = props?.pageFooter?.value
  return data?.size == 'large' ? "40px" : (data?.size == "small" ? "24px" : "32px")
}


</script>

<style scoped lang="scss">
.drawer {
  background-image: url(./bg.png);

}
.alert {
    margin:0 10px;
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

    .form-item .comp-item {
      padding: 10px 20px 30px;
    }
    .form-footer {
      padding: 0 20px;
      margin-top: 15px;
    }
    ::v-deep(.comp-item .number) {
      left: 5px;
    }
    ::v-deep(.description.input-comp) {
      margin-left: 20px !important;
    }
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

::v-deep(.form-footer) {
  .submit {

    max-width: 100%;
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 隐藏超出部分 */
    text-overflow: ellipsis;
    /* 显示省略号 */
  }


}

.no-data {
  text-align: center;
  margin: 20px;
  font-size: 16px;
  color: #666;

  img {
    width: 300px;
    margin: 20px;
  }
}

.controls {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;

  .cont-item {
    padding: 2px 5px;
  }
}


</style>
