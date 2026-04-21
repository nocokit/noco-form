import type { Component } from 'vue'
import type { StandardComponentConfig } from './standardConfig'

/** 插件组件定义 */
export interface PluginComponentDef {
  /** 唯一类型标识，如 'Input', 'MyWidget' */
  type: string
  /** 显示名称 */
  name: string
  /** 标签 */
  label: string
  /**
   * 图标，支持三种形式：
   * 1. 内置图标 key（如 'Radio'，对应 comp-icon.ts 中的 key）
   * 2. 图片 URL（如 '/icons/my-widget.svg' 或 'https://...'）
   * 3. 不传则使用默认图标
   */
  icon?: string
  /**
   * 已解析的图标 URL（内部使用）
   * 注册时如果 icon 是内置 key 会自动解析为 URL，
   * 如果 icon 本身就是 URL 则直接使用
   */
  resolvedIcon?: string
  /** 分类: 'basic' | 'advanced' | 'show' | 'personal' | 'layout' | 'rate' | 'time' 或自定义分类 */
  category: string
  /** 渲染组件，支持同步或异步懒加载 */
  component: Component | (() => Promise<{ default: Component }>)
  /** 设置面板组件（可选），支持同步或异步懒加载 */
  settingComponent?: Component | (() => Promise<{ default: Component }>)
  /** 默认配置，支持标准字段（有类型提示）+ 自定义扩展字段 */
  defaultConfig: Partial<StandardComponentConfig> & Record<string, any>
  /** 组件元信息 */
  meta?: PluginComponentMeta
}

/** 组件元信息，用于控制编辑器行为 */
export interface PluginComponentMeta {
  /** 是否为布局组件（分割线、分页等） */
  isLayoutComp?: boolean
  /** 纯展示组件，无编辑交互 */
  justShow?: boolean
  /** 是否有选项列表（Radio、Checkout、Select 等） */
  hasDataList?: boolean
  /** 是否有 placeholder */
  hasPlaceholder?: boolean
  /** 是否有范围 placeholder */
  hasRangePlaceholder?: boolean
  /** 是否忽略必填设置 */
  ignoreRequired?: boolean
  /** 支持正则验证 */
  hasValidationFormat?: boolean
  /** 是否为个人信息分类 */
  isPersonalClassify?: boolean
  /** 是否为分页组件（用于行号和分页逻辑） */
  isPagingComponent?: boolean
  /** 支持数值范围验证（minValue/maxValue） */
  hasNumberRange?: boolean
  /** 自动检测格式验证（手机号、邮箱等内置格式） */
  builtinFormat?: 'phone' | 'email' | 'idcard' | 'telephone' | 'url' | 'number'
  /**
   * 逻辑面板中的值分类，决定操作符和值输入方式：
   * - 'enum': 单选（从 dataList 中选取）
   * - 'multi': 多选（从 dataList 中选取）
   * - 'boolean': 布尔（是/否）
   * - 'number': 数字输入
   * - 'date': 日期选择
   * - 'time': 时间选择
   * - 'text': 文本输入（默认值）
   * - 不设置或 undefined: 自动推断（有 dataList → enum/multi，有 hasNumberRange → number，否则 text）
   */
  logicCategory?: 'enum' | 'multi' | 'boolean' | 'number' | 'date' | 'time' | 'text'
  /** 是否可作为逻辑条件的来源组件（默认 true，设为 false 排除） */
  logicSourceEnabled?: boolean
}

/** 插件上下文，传递给 install 钩子 */
export interface PluginContext {
  registerComponent: (def: PluginComponentDef) => void
}

/** 插件定义 */
export interface LemonFormPlugin {
  name: string
  components?: PluginComponentDef[]
  install?: (ctx: PluginContext) => void
}
