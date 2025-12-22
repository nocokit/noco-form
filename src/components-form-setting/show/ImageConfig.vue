<template>
  <div class="image-config">
    <span class="text-gray-500 block-title">{{ t('settings.imageUrl') }}</span>
    <input
      type="text"
      class="custom-input mb-10"
      :placeholder="t('settings.imageUrlPlaceholder')"
      v-model="comp.imageUrl"
      @input="handleChangeInput($event, 'imageUrl')"
      maxlength="500"
    />

    <span class="text-gray-500 block-title">{{ t('settings.imageTitle') }}</span>
    <input
      type="text"
      class="custom-input mb-10"
      :placeholder="t('settings.imageTitlePlaceholder')"
      v-model="comp.imageTitle"
      @input="handleChangeInput($event, 'imageTitle')"
      maxlength="100"
    />

    <span class="text-gray-500 block-title">{{ t('settings.imageDescription') }}</span>
    <div class="relative mb-10">
      <textarea
        class="custom-textarea"
        :placeholder="t('settings.imageDescriptionPlaceholder')"
        v-model="comp.imageDescription"
        @input="handleChangeInput($event, 'imageDescription')"
        rows="3"
        maxlength="200"
      ></textarea>
      <div class="text-right text-[10px] text-[#71717a] mt-1" v-if="comp.imageDescription">
        {{ comp.imageDescription.length }} / 200
      </div>
    </div>

    <span class="text-gray-500 block-title">{{ t('settings.imageBadge') }}</span>
    <input
      type="text"
      class="custom-input mb-10"
      :placeholder="t('settings.imageBadgePlaceholder')"
      v-model="comp.imageBadge"
      @input="handleChangeInput($event, 'imageBadge')"
      maxlength="50"
    />

    <span class="text-gray-500 block-title">{{ t('settings.imageAlt') }}</span>
    <input
      type="text"
      class="custom-input mb-10"
      :placeholder="t('settings.imageAltPlaceholder')"
      v-model="comp.imageAlt"
      @input="handleChangeInput($event, 'imageAlt')"
      maxlength="100"
    />

    <span class="text-gray-500 block-title">图片宽高比</span>
    <TwSelect
      v-model="comp.imageAspectRatio"
      :options="aspectRatioOptions"
      @change="(value) => handleAspectRatioChange(value)"
      custom-class="mb-10"
    />

    <div class="setting-item h-42">
      <span class="text-gray-500 secondary">{{ t('settings.showOverlay') }}</span>
      <div class="abs-r switch-r">
        <TwSwitch v-model="comp.showOverlay" @change="(value) => changeValue(value, 'showOverlay')" />
      </div>
    </div>

    <div class="setting-item h-42">
      <span class="text-gray-500 secondary">{{ t('settings.showBadge') }}</span>
      <div class="abs-r switch-r">
        <TwSwitch v-model="comp.showBadge" @change="(value) => changeValue(value, 'showBadge')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { TwSwitch, TwSelect } from '@/components/ui'
import { useSelectCompStore } from '@/stores/selectCompStore'

const { t } = useI18n()

const compStore: any = useSelectCompStore()

interface Props {
  comp: any
}

const props = defineProps<Props>()
const comp = ref(props.comp)

const aspectRatioOptions = [
  { label: '16:9 (宽屏)', value: '16/9' },
  { label: '4:3 (标准)', value: '4/3' },
  { label: '1:1 (正方形)', value: '1/1' },
  { label: '21:9 (超宽)', value: '21/9' },
  { label: '3:2 (照片)', value: '3/2' },
]

const handleChangeInput = (event: any, params?: string) => {
  const data = event.target.value
  compStore.updateCurrentComp({
    [params || 'imageUrl']: data
  })
}

const handleAspectRatioChange = (value: any) => {
  compStore.updateCurrentComp({
    imageAspectRatio: value
  })
}

const changeValue = (event: any, param?: string) => {
  const data = event
  compStore.updateCurrentComp({
    [param || 'showOverlay']: data
  })
}
</script>

<style scoped>
.image-config {
  width: 100%;
}
</style>
