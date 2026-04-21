import { getGroupedComponentList } from '@/plugins/pluginManager'

// 动态生成组件列表（从插件系统获取）
export const generateCompListData = () => {
  return getGroupedComponentList()
}
