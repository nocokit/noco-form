import { getAllComponents } from '@/components-config/registry'
import { CompType } from './comp-data'
import Icon, { type IconKey } from './comp-icon'

interface CategoryItem {
  name: string
  label: string
  type: string
  tooltip?: string
  children: { name: string; label: string; type: CompType; icon: string }[]
}

// 动态生成组件列表
export const generateCompListData = () => {
  const components = getAllComponents()

  const categoryMap: Record<string, CategoryItem> = {
    show:     { name: '展示',   label: '展示',   type: 'Show Component',     children: [] },
    basic:    { name: '基础',   label: '基础',   type: 'Basic Component',    children: [] },
    personal: { name: '个人信息', label: '个人信息', type: 'Personal Component', tooltip: '提供常见的个人信息配置，同时方便后期数据统计', children: [] },
    layout:   { name: '布局',   label: '布局',   type: 'Layout Component',   children: [] },
    advanced: { name: '高级',   label: '高级',   type: 'Advanced Component', children: [] },
  }

  components.forEach(config => {
    const category = categoryMap[config.category]
    if (category) {
      category.children.push({
        name:  config.name,
        label: config.label,
        type:  config.type as CompType,
        icon:  Icon[config.icon as IconKey] ?? '',
      })
    }
  })

  return Object.values(categoryMap).filter(cat => cat.children.length > 0)
}
