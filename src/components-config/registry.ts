import { CompType } from '@/views/FormEditor/comp-data'
import Icon from '@/views/FormEditor/comp-icon'

interface ComponentConfig {
  type: string
  name: string
  label: string
  icon: string
  category: string
  defaultConfig: Record<string, any>
}

// 组件配置映射
const componentConfigs = new Map<string, ComponentConfig>()

// 自动导入所有组件配置
const configModules = import.meta.glob('./*.json', { eager: true })

Object.entries(configModules).forEach(([path, module]: [string, any]) => {
  const config = module.default || module
  componentConfigs.set(config.type, config)
})

// 获取组件默认配置
export const getComponentConfig = (type: CompType): Record<string, any> => {
  const config = componentConfigs.get(type)
  if (!config) return {}

  return {
    name: config.name,
    type: config.type,
    title: config.label,
    description: null,
    dataValue: null,
    defaultValue: null,
    customErrorMessage: '',
    ...config.defaultConfig
  }
}

// 获取组件元数据
export const getComponentMeta = (type: CompType) => {
  return componentConfigs.get(type)
}

// 按分类获取组件列表
export const getComponentsByCategory = (category: string) => {
  return Array.from(componentConfigs.values())
    .filter(config => config.category === category)
    .map(config => ({
      name: config.name,
      label: config.label,
      type: config.type as CompType,
      icon: (Icon as any)[config.icon]
    }))
}

// 获取所有组件
export const getAllComponents = () => {
  return Array.from(componentConfigs.values())
}

export default componentConfigs
