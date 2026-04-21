import { defineAsyncComponent, type Component } from 'vue'
import type { PluginComponentDef } from './types'

/**
 * 设置项定义
 */
export interface SettingItemDef {
  /** 设置项名称（唯一标识） */
  name: string
  /** 设置项组件 */
  component: Component | (() => Promise<{ default: Component }>)
  /** 分组: basic = 基础设置, validation = 表单验证 */
  group: 'basic' | 'validation'
  /** 排序权重（越小越靠前） */
  order: number
  /**
   * 匹配条件：返回 true 则显示该设置项
   * @param comp 当前选中的组件实例
   * @param def 组件的插件定义（可能为 undefined）
   */
  match: (comp: Record<string, any>, def?: PluginComponentDef) => boolean
}

/** 已解析的设置项（含 resolved component） */
export interface ResolvedSettingItem {
  name: string
  component: Component
  group: 'basic' | 'validation'
  order: number
}

/** 已注册的设置项 */
const settingItems: SettingItemDef[] = []

/** 已解析的组件缓存 */
const resolvedCache = new Map<string, Component>()

/** 注册设置项 */
export function registerSettingItem(item: SettingItemDef): void {
  const existingIndex = settingItems.findIndex(s => s.name === item.name)
  if (existingIndex >= 0) {
    settingItems[existingIndex] = item
  } else {
    settingItems.push(item)
  }
  resolvedCache.delete(item.name)
}

/** 解析设置项组件 */
function resolveSettingComp(item: SettingItemDef): Component {
  if (resolvedCache.has(item.name)) {
    return resolvedCache.get(item.name)!
  }
  const comp = typeof item.component === 'function' && item.component.length === 0
    ? defineAsyncComponent(item.component as () => Promise<{ default: Component }>)
    : item.component as Component
  resolvedCache.set(item.name, comp)
  return comp
}

/** 获取匹配当前组件的所有设置项（按 group 和 order 排序，组件已解析） */
export function getMatchedSettings(
  comp: Record<string, any>,
  def?: PluginComponentDef,
): { basic: ResolvedSettingItem[]; validation: ResolvedSettingItem[] } {
  const matched = settingItems
    .filter(item => item.match(comp, def))
    .map(item => ({
      name: item.name,
      component: resolveSettingComp(item),
      group: item.group,
      order: item.order,
    }))
  return {
    basic: matched.filter(s => s.group === 'basic').sort((a, b) => a.order - b.order),
    validation: matched.filter(s => s.group === 'validation').sort((a, b) => a.order - b.order),
  }
}

/** 获取所有已注册的设置项 */
export function getAllSettingItems(): SettingItemDef[] {
  return [...settingItems]
}
