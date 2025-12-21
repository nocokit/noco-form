<template>
  <div class="sign-wrapper" ref="signRef" :id="currId" style="width: 100%; max-width: 100%; box-sizing: border-box;">
    <!-- 重构的电子签名板 -->
    <div class="sig-pad relative w-full h-52 rounded-2xl overflow-hidden group/pad cursor-crosshair" style="background: radial-gradient(circle at center, #18181b 0%, #09090b 100%); border: 1px solid #27272a;">

      <!-- 引导基准线 -->
      <div class="absolute bottom-12 left-12 right-12 h-px sig-line opacity-30" style="background-image: linear-gradient(to right, #3f3f46 50%, transparent 50%); background-size: 8px 1px; background-repeat: repeat-x;"></div>

      <!-- Canvas 签名板 -->
      <canvas class="absolute inset-0 w-full h-full" />

      <!-- 签名动作按钮组：优雅的漂浮式 -->
      <div class="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover/pad:opacity-100 transition-opacity duration-300">
        <button @click="control('undo')" title="撤销" class="p-2 bg-zinc-800/80 backdrop-blur hover:bg-zinc-700 text-zinc-300 rounded-lg transition-all active:scale-90">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 7v6h6"></path>
            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
          </svg>
        </button>
        <button @click="control('redo')" title="重做" class="p-2 bg-zinc-800/80 backdrop-blur hover:bg-zinc-700 text-zinc-300 rounded-lg transition-all active:scale-90">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 7v6h-6"></path>
            <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path>
          </svg>
        </button>
        <div class="w-px h-8 bg-zinc-700/50 mx-1"></div>
        <button @click="control('clear')" title="清空" class="p-2 bg-rose-500/10 backdrop-blur hover:bg-rose-500/20 text-rose-400 rounded-lg transition-all active:scale-90">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      </div>

      <!-- 水印标识 -->
      <div class="absolute bottom-4 left-4 flex items-center gap-1.5 opacity-20 group-hover/pad:opacity-40 transition-opacity">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
        <span class="text-[10px] font-bold uppercase tracking-widest">Digital Slate</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import SmoothSignature from "smooth-signature";
const signRef = ref(null);
interface Props {
  id: string
  isPreviewRender?: boolean
  previewType?: string
}
const props = defineProps<Props>()
const currId = ref(props.isPreviewRender ? `preview_${props.id}`: `${props.id}` )
const signature: any = ref(null)
const contList = [{
  name: '清空',
  type: 'clear'
}, {
  name: '撤销',
  type: 'undo'
},{
  name: '重做',
  type: 'redo'
},]

const control = (type: 'clear' | 'undo' | 'redo' | string) => {
  switch(type) {
    case 'clear':
      signature.value.clear()
      break;
    case 'redo':
      signature.value.redo()
      break;
    case 'undo':
      signature.value.undo()
      break;
  }
  console.log(type)
}

const initData = () => {
  const signDOM = document.getElementById(currId.value)
  const rect = signDOM?.getBoundingClientRect()
  const canvas: HTMLCanvasElement | null | undefined = signDOM?.querySelector("canvas");
  if (!canvas) {
    return 
  }

  let _width = rect?.width   
  if(props.isPreviewRender) {
    _width = props.previewType === 'PC' ? 566 : 350;
  }
  signature.value = new SmoothSignature(canvas, {
    width:_width || 300,
    height: 208,
    scale: 2,
    minWidth: 4,
    maxWidth: 10,
    color: '#f4f4f5',
    bgColor: 'transparent'
  });
}

onMounted(() => {
  initData()
})

watch([props.previewType] ,() => {
  initData()
})

</script>
