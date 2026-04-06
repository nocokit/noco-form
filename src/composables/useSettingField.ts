import { useSelectCompStore } from '@/stores/selectCompStore'

/**
 * 配置面板通用字段操作 composable
 * 统一处理组件配置字段更新，避免每个配置组件重复编写相同逻辑
 */
export function useSettingField() {
  const compStore = useSelectCompStore()

  /** 更新当前组件的某个字段 */
  const updateField = (field: string, value: unknown) => {
    compStore.updateCurrentComp({ [field]: value })
  }

  /** 从 input/textarea 事件中提取值并更新字段 */
  const updateFieldFromEvent = (field: string, event: Event) => {
    const value = (event.target as HTMLInputElement).value
    compStore.updateCurrentComp({ [field]: value })
  }

  /** 更新全局表单配置字段 */
  const updateGlobalField = (field: string, value: unknown) => {
    compStore.updateGlobalFormConfig({ [field]: value })
  }

  return {
    compStore,
    updateField,
    updateFieldFromEvent,
    updateGlobalField,
  }
}
