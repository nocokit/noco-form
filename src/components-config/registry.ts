import {
  getComponentDef,
  getPluginDefaultConfig,
  getAllComponentDefs,
  getComponentDefsByCategory,
} from '@/plugins/pluginManager'
import Icon, { type IconKey } from '@/views/FormEditor/comp-icon'

interface ComponentConfig {
  type: string
  name: string
  label: string
  icon: string
  category: string
  defaultConfig: Record<string, any>
}

// 获取组件默认配置（兼容旧 API）
export const getComponentConfig = (type: string): Record<string, any> => {
  return getPluginDefaultConfig(type)
}

// 获取组件元数据（兼容旧 API）
export const getComponentMeta = (type: string) => {
  return getComponentDef(type)
}

// 按分类获取组件列表（兼容旧 API）
export const getComponentsByCategory = (category: string) => {
  return getComponentDefsByCategory(category)
    .map(def => ({
      name: def.name,
      label: def.label,
      type: def.type,
      icon: def.icon ? (Icon[def.icon as IconKey] ?? '') : '',
    }))
}

// 获取所有组件（兼容旧 API）
export const getAllComponents = () => {
  return getAllComponentDefs().map(def => ({
    type: def.type,
    name: def.name,
    label: def.label,
    icon: def.icon || '',
    category: def.category,
    defaultConfig: def.defaultConfig,
  }))
}

// 兼容默认导出
const componentConfigs = new Map<string, ComponentConfig>()
export default componentConfigs
