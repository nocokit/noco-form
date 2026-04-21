import { type Ref, watch, toRaw } from 'vue'
import { indexedDB } from '@/utils/indexedDB'
import { useSelectCompStore } from '@/stores/selectCompStore'

/**
 * 表单数据持久化 composable
 * 封装 IndexedDB 的加载和保存逻辑
 */
export function useFormPersistence(
  pageCompList: Ref<any[]>,
  pageHeader: Ref<any>,
  pageFooter: Ref<any>,
) {
  const compStore = useSelectCompStore()

  const loadFormData = async () => {
    try {
      const savedData = await indexedDB.getForm()
      if (!savedData) return

      pageCompList.value = savedData.pageCompList || []
      if (savedData.pageHeader) pageHeader.value = savedData.pageHeader
      if (savedData.pageFooter) pageFooter.value = savedData.pageFooter
      if (savedData.globalConfig) compStore.initGlobalFormConfig(savedData.globalConfig)
    } catch (error) {
      console.error('加载表单数据失败:', error)
    }
  }

  const deepClone = (obj: any) => JSON.parse(JSON.stringify(toRaw(obj)))

  const saveFormData = async () => {
    try {
      await indexedDB.saveForm({
        pageCompList: deepClone(pageCompList.value),
        pageHeader: deepClone(pageHeader.value),
        pageFooter: deepClone(pageFooter.value),
        globalConfig: deepClone(compStore.currentGlobalFormConfig),
      })
    } catch (error) {
      console.error('保存表单数据失败:', error)
    }
  }

  // 监听组件列表深度变化自动保存
  watch(pageCompList, saveFormData, { deep: true })

  // 监听全局配置变化自动保存
  watch(() => compStore.currentGlobalFormConfig, saveFormData, { deep: true })

  return { loadFormData, saveFormData }
}
