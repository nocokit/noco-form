<template>
  <div class="image-config">
    <span class="text-gray-500 block-title">图片 URL</span>
    <input
      type="text"
      class="mb-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="请输入图片URL"
      v-model="comp.imageUrl"
      @input="handleChangeInput($event, 'imageUrl')"
      maxlength="500"
    />

    <span class="text-gray-500 block-title">图片标题</span>
    <input
      type="text"
      class="mb-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="请输入图片标题"
      v-model="comp.imageTitle"
      @input="handleChangeInput($event, 'imageTitle')"
      maxlength="100"
    />

    <span class="text-gray-500 block-title">图片描述</span>
    <div class="relative mb-10">
      <textarea
        class="w-full px-4 py-2.5 text-xs text-white rounded-xl border outline-none transition-all resize-y min-h-[80px] leading-relaxed bg-[#18181b] border-[#27272a] placeholder:text-[#52525b] hover:border-[#3f3f46] hover:bg-[#09090b] focus:border-indigo-500/50 focus:bg-[#09090b]"
        placeholder="请输入图片描述"
        v-model="comp.imageDescription"
        @input="handleChangeInput($event, 'imageDescription')"
        rows="3"
        maxlength="200"
      ></textarea>
      <div class="text-right text-[10px] text-[#71717a] mt-1" v-if="comp.imageDescription">
        {{ comp.imageDescription.length }} / 200
      </div>
    </div>

    <span class="text-gray-500 block-title">徽章文本</span>
    <input
      type="text"
      class="mb-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="请输入徽章文本"
      v-model="comp.imageBadge"
      @input="handleChangeInput($event, 'imageBadge')"
      maxlength="50"
    />

    <span class="text-gray-500 block-title">替代文本 (Alt)</span>
    <input
      type="text"
      class="mb-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="请输入图片替代文本"
      v-model="comp.imageAlt"
      @input="handleChangeInput($event, 'imageAlt')"
      maxlength="100"
    />

    <div class="setting-item h-42">
      <span class="text-gray-500 secondary">显示叠加层</span>
      <div class="abs-r switch-r">
        <TwSwitch v-model="comp.showOverlay" @change="(value) => changeValue(value, 'showOverlay')" />
      </div>
    </div>

    <div class="setting-item h-42">
      <span class="text-gray-500 secondary">显示徽章</span>
      <div class="abs-r switch-r">
        <TwSwitch v-model="comp.showBadge" @change="(value) => changeValue(value, 'showBadge')" />
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
    [params || 'imageUrl']: data
  })
}

const changeValue = (event: any, param?: string) => {
  const data = event
  compStore.updateCurrentComp({
    [param || 'showOverlay']: data
  })
}

interface Props {
  comp: any
}

const props = defineProps<Props>()
</script>

<style scoped>
.image-config {
  width: 100%;
}
</style>
