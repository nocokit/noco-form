import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSelectCompStore = defineStore('compEvent', () => {
  // 当前表单全局配置
  const globalFormConfig = ref({})

  // 当前选中的组件配置
  const compConfig = ref({})
  const currentCompKey = ref('') // 更新Key

  // init组件配置
  const initCurrentComp = (comp: any) => {
    compConfig.value = {...comp}
  }

  // 更新组件
  const updateCurrentComp = (updateData: any) => {
    compConfig.value = {
      ...compConfig.value,
      ...updateData
    }
  }

  // 当前组件配置
  const currentCompConfig = computed(() => compConfig.value)

  // 获取当前组件
  const getCurrentCompConfig = () => {
    return currentCompConfig
  }

  // 初始化全局配置
  const initGlobalFormConfig = (config: any) => {
    globalFormConfig.value = {...config}
  }

  const updateGlobalFormConfig = (updateData: any) => {
    globalFormConfig.value = {
      ...globalFormConfig.value,
      ...updateData
    }
  }

  const currentGlobalFormConfig = computed(() => globalFormConfig.value)

  const getGlobalFormConfig = () => {
    return currentGlobalFormConfig
  }

  const updateCurrentCompKey = (key: string) => {
    currentCompKey.value = key
  }

  return {
    compConfig,
    currentCompConfig,
    globalFormConfig,
    currentGlobalFormConfig,
    initCurrentComp,
    updateCurrentComp,
    getCurrentCompConfig,
    initGlobalFormConfig,
    updateGlobalFormConfig,
    getGlobalFormConfig,
    currentCompKey,
    updateCurrentCompKey,
  }
})
