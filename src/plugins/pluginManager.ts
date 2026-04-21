import { defineAsyncComponent, type Component } from 'vue'
import type { PluginComponentDef, LemonFormPlugin, PluginContext } from './types'
import Icon, { type IconKey } from '@/views/FormEditor/comp-icon'

/** 所有已注册组件定义 */
const componentDefs = new Map<string, PluginComponentDef>()

/** 已解析的渲染组件缓存 */
const resolvedComponents = new Map<string, Component>()

/** 已解析的设置面板组件缓存 */
const resolvedSettingComponents = new Map<string, Component>()

// ─── 注册 API ───

/** 注册单个组件 */
export function registerComponent(def: PluginComponentDef): void {
  if (componentDefs.has(def.type)) {
    console.warn(`[LemonForm] Component "${def.type}" is already registered, overwriting.`)
  }
  // 解析图标：内置 key → URL，URL 直接使用
  def.resolvedIcon = resolveIcon(def.icon)
  componentDefs.set(def.type, def)
  // 清除缓存，下次获取时重新解析
  resolvedComponents.delete(def.type)
  resolvedSettingComponents.delete(def.type)
}

/** 注册插件 */
export function registerPlugin(plugin: LemonFormPlugin): void {
  const ctx: PluginContext = { registerComponent }
  // 注册声明式组件
  if (plugin.components) {
    plugin.components.forEach(def => registerComponent(def))
  }
  // 执行 install 钩子
  if (plugin.install) {
    plugin.install(ctx)
  }
}

// ─── 查询 API ───

/** 获取渲染组件（同步返回，异步组件会被包装为 defineAsyncComponent） */
export function getComponent(type: string): Component | undefined {
  if (resolvedComponents.has(type)) {
    return resolvedComponents.get(type)
  }
  const def = componentDefs.get(type)
  if (!def) return undefined

  const comp = resolveComponent(def.component)
  resolvedComponents.set(type, comp)
  return comp
}

/** 获取设置面板组件 */
export function getSettingComponent(type: string): Component | undefined {
  if (resolvedSettingComponents.has(type)) {
    return resolvedSettingComponents.get(type)
  }
  const def = componentDefs.get(type)
  if (!def?.settingComponent) return undefined

  const comp = resolveComponent(def.settingComponent)
  resolvedSettingComponents.set(type, comp)
  return comp
}

/** 获取组件定义 */
export function getComponentDef(type: string): PluginComponentDef | undefined {
  return componentDefs.get(type)
}

/** 获取所有已注册组件定义 */
export function getAllComponentDefs(): PluginComponentDef[] {
  return Array.from(componentDefs.values())
}

/** 按分类获取组件列表 */
export function getComponentDefsByCategory(category: string): PluginComponentDef[] {
  return getAllComponentDefs().filter(def => def.category === category)
}

/** 获取组件默认配置 */
export function getPluginDefaultConfig(type: string): Record<string, any> {
  const def = componentDefs.get(type)
  if (!def) return {}
  return {
    name: def.name,
    type: def.type,
    title: def.label,
    description: null,
    dataValue: null,
    defaultValue: null,
    customErrorMessage: '',
    ...def.defaultConfig,
  }
}

/** 判断类型是否已注册 */
export function isRegisteredType(type: string): boolean {
  return componentDefs.has(type)
}

/** 判断组件是否为纯展示（不可编辑） */
export function isJustShowType(type: string): boolean {
  const def = componentDefs.get(type)
  return def?.meta?.justShow === true
}

/** 判断组件是否为布局组件 */
export function isLayoutCompType(type: string): boolean {
  const def = componentDefs.get(type)
  return def?.meta?.isLayoutComp === true
}

/** 判断组件是否有数据列表 */
export function hasDataListType(type: string): boolean {
  const def = componentDefs.get(type)
  return def?.meta?.hasDataList === true
}

/** 判断组件是否有验证格式 */
export function hasValidationFormatType(type: string): boolean {
  const def = componentDefs.get(type)
  return def?.meta?.hasValidationFormat === true
}

/** 获取组件已解析的图标 URL */
export function getResolvedIcon(type: string): string {
  const def = componentDefs.get(type)
  return def?.resolvedIcon || ''
}

/** 获取按分类分组的组件列表（用于侧边栏展示） */
export function getGroupedComponentList(): {
  name: string
  label: string
  type: string
  tooltip?: string
  children: { name: string; label: string; type: string; icon: string }[]
}[] {
  const categoryConfig: Record<string, { name: string; label: string; type: string; tooltip?: string; order: number }> = {
    show:     { name: '展示',       label: '展示',       type: 'Show Component',     order: 0 },
    basic:    { name: '基础',       label: '基础',       type: 'Basic Component',    order: 1 },
    rate:     { name: '评分和满意度', label: '评分和满意度', type: 'Basic Component',    order: 2 },
    time:     { name: '日期和时间',   label: '日期和时间',   type: 'Basic Component',    order: 3 },
    layout:   { name: '布局',       label: '布局',       type: 'Layout Component',   order: 4 },
    personal: { name: '个人信息',    label: '个人信息',    type: 'Personal Component', tooltip: '提供常见的个人信息配置，同时方便后期数据统计', order: 5 },
    advanced: { name: '高级',       label: '高级',       type: 'Advanced Component', order: 6 },
  }

  const groups = new Map<string, typeof categoryConfig[string] & { children: any[] }>()

  for (const def of componentDefs.values()) {
    const catKey = def.category
    if (!groups.has(catKey)) {
      const config = categoryConfig[catKey] || { name: catKey, label: catKey, type: catKey, order: 99 }
      groups.set(catKey, { ...config, children: [] })
    }
    groups.get(catKey)!.children.push({
      name: def.name,
      label: def.label,
      type: def.type,
      icon: def.resolvedIcon || '',
    })
  }

  return Array.from(groups.values())
    .filter(g => g.children.length > 0)
    .sort((a, b) => a.order - b.order)
    .map(({ order, ...rest }) => rest)
}

// ─── 内部工具函数 ───

/** 解析图标：内置 key 映射为 URL，URL/路径直接返回 */
function resolveIcon(icon?: string): string {
  if (!icon) return ''
  // 如果是 URL 或路径（包含 / 或 . 或 data:），直接使用
  if (icon.includes('/') || icon.includes('.') || icon.startsWith('data:')) {
    return icon
  }
  // 尝试从内置图标映射中查找
  return Icon[icon as IconKey] ?? ''
}

function resolveComponent(comp: Component | (() => Promise<{ default: Component }>)): Component {
  if (typeof comp === 'function' && comp.length === 0) {
    // 异步组件工厂函数
    return defineAsyncComponent(comp as () => Promise<{ default: Component }>)
  }
  return comp as Component
}

// ─── Vue Plugin 接口 ───

export function createLemonForm() {
  const plugins: LemonFormPlugin[] = []
  return {
    use(plugin: LemonFormPlugin) {
      plugins.push(plugin)
      registerPlugin(plugin)
      return this
    },
    install() {
      // 所有插件已在 use() 时注册，install 为空操作
      // 保持 Vue app.use() 兼容
    },
  }
}
