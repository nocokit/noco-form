<template>
  <div class="video-config">
    <span class="text-gray-500 block-title">{{ t('settings.videoUrl') }}</span>
    <input
      type="text"
      class="custom-input mb-10"
      :placeholder="t('settings.videoUrlPlaceholder')"
      v-model="comp.videoUrl"
      @input="handleChangeInput($event, 'videoUrl')"
      maxlength="500"
    />

    <span class="text-gray-500 block-title">{{ t('settings.videoTitle') }}</span>
    <input
      type="text"
      class="custom-input mb-10"
      :placeholder="t('settings.videoTitlePlaceholder')"
      v-model="comp.videoTitle"
      @input="handleChangeInput($event, 'videoTitle')"
      maxlength="100"
    />

    <span class="text-gray-500 block-title">{{ t('settings.videoDescription') }}</span>
    <div class="relative mb-10">
      <textarea
        class="custom-textarea"
        :placeholder="t('settings.videoDescriptionPlaceholder')"
        v-model="comp.videoDescription"
        @input="handleChangeInput($event, 'videoDescription')"
        rows="3"
        maxlength="200"
      ></textarea>
      <div class="text-right text-[10px] text-[#71717a] mt-1" v-if="comp.videoDescription">
        {{ comp.videoDescription.length }} / 200
      </div>
    </div>

    <span class="text-gray-500 block-title">{{ t('settings.videoPoster') }}</span>
    <input
      type="text"
      class="custom-input mb-10"
      :placeholder="t('settings.videoPosterPlaceholder')"
      v-model="comp.videoPoster"
      @input="handleChangeInput($event, 'videoPoster')"
      maxlength="500"
    />

    <span class="text-gray-500 block-title">{{ t('settings.videoLabel') }}</span>
    <input
      type="text"
      class="custom-input mb-10"
      :placeholder="t('settings.videoLabelPlaceholder')"
      v-model="comp.videoLabel"
      @input="handleChangeInput($event, 'videoLabel')"
      maxlength="50"
    />

    <span class="text-gray-500 block-title">视频宽高比</span>
    <TwSelect
      v-model="comp.videoAspectRatio"
      :options="aspectRatioOptions"
      @change="(value) => handleAspectRatioChange(value)"
      custom-class="mb-10"
    />

    <div class="setting-item h-42">
      <span class="text-gray-500 secondary">{{ t('settings.autoplay') }}</span>
      <div class="abs-r switch-r">
        <TwSwitch v-model="comp.autoplay" @change="(value) => changeValue(value, 'autoplay')" />
      </div>
    </div>

    <div class="setting-item h-42">
      <span class="text-gray-500 secondary">{{ t('settings.controls') }}</span>
      <div class="abs-r switch-r">
        <TwSwitch v-model="comp.controls" @change="(value) => changeValue(value, 'controls')" />
      </div>
    </div>

    <div class="setting-item h-42">
      <span class="text-gray-500 secondary">{{ t('settings.loop') }}</span>
      <div class="abs-r switch-r">
        <TwSwitch v-model="comp.loop" @change="(value) => changeValue(value, 'loop')" />
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
  { label: '9:16 (竖屏)', value: '9/16' },
]

const handleChangeInput = (event: any, params?: string) => {
  const data = event.target.value
  compStore.updateCurrentComp({
    [params || 'videoUrl']: data
  })
}

const handleAspectRatioChange = (value: any) => {
  compStore.updateCurrentComp({
    videoAspectRatio: value
  })
}

const changeValue = (event: any, param?: string) => {
  const data = event
  compStore.updateCurrentComp({
    [param || 'autoplay']: data
  })
}
</script>

<style scoped>
.video-config {
  width: 100%;
}
</style>
