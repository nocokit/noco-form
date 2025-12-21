<template>
  <div class="video-config">
    <span class="text-gray-500 block-title">视频 URL</span>
    <input
      type="text"
      class="mb-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="请输入视频URL (支持 MP4, WebM 等格式)"
      v-model="comp.videoUrl"
      @input="handleChangeInput($event, 'videoUrl')"
      maxlength="500"
    />

    <span class="text-gray-500 block-title">视频标题</span>
    <input
      type="text"
      class="mb-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="请输入视频标题"
      v-model="comp.videoTitle"
      @input="handleChangeInput($event, 'videoTitle')"
      maxlength="100"
    />

    <span class="text-gray-500 block-title">视频描述</span>
    <div class="relative mb-10">
      <textarea
        class="w-full px-4 py-2.5 text-xs text-white rounded-xl border outline-none transition-all resize-y min-h-[80px] leading-relaxed bg-[#18181b] border-[#27272a] placeholder:text-[#52525b] hover:border-[#3f3f46] hover:bg-[#09090b] focus:border-indigo-500/50 focus:bg-[#09090b]"
        placeholder="请输入视频描述"
        v-model="comp.videoDescription"
        @input="handleChangeInput($event, 'videoDescription')"
        rows="3"
        maxlength="200"
      ></textarea>
      <div class="text-right text-[10px] text-[#71717a] mt-1" v-if="comp.videoDescription">
        {{ comp.videoDescription.length }} / 200
      </div>
    </div>

    <span class="text-gray-500 block-title">封面图片 URL</span>
    <input
      type="text"
      class="mb-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="请输入视频封面图片URL"
      v-model="comp.videoPoster"
      @input="handleChangeInput($event, 'videoPoster')"
      maxlength="500"
    />

    <span class="text-gray-500 block-title">视频标签</span>
    <input
      type="text"
      class="mb-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="请输入视频标签"
      v-model="comp.videoLabel"
      @input="handleChangeInput($event, 'videoLabel')"
      maxlength="50"
    />

    <div class="setting-item h-42">
      <span class="text-gray-500 secondary">自动播放</span>
      <div class="abs-r switch-r">
        <TwSwitch v-model="comp.autoplay" @change="(value) => changeValue(value, 'autoplay')" />
      </div>
    </div>

    <div class="setting-item h-42">
      <span class="text-gray-500 secondary">显示控制栏</span>
      <div class="abs-r switch-r">
        <TwSwitch v-model="comp.controls" @change="(value) => changeValue(value, 'controls')" />
      </div>
    </div>

    <div class="setting-item h-42">
      <span class="text-gray-500 secondary">循环播放</span>
      <div class="abs-r switch-r">
        <TwSwitch v-model="comp.loop" @change="(value) => changeValue(value, 'loop')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { TwSwitch } from '@/components/ui'
import { useSelectCompStore } from '@/stores/selectCompStore'

const compStore: any = useSelectCompStore()

const handleChangeInput = (event: any, params?: string) => {
  const data = event.target.value
  compStore.updateCurrentComp({
    [params || 'videoUrl']: data
  })
}

const changeValue = (event: any, param?: string) => {
  const data = event
  compStore.updateCurrentComp({
    [param || 'autoplay']: data
  })
}

interface Props {
  comp: any
}

const props = defineProps<Props>()
</script>

<style scoped>
.video-config {
  width: 100%;
}
</style>
