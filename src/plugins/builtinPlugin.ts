import type { LemonFormPlugin, PluginComponentDef } from './types'

/**
 * 内置组件插件
 * 将所有内置组件通过插件系统注册，使用懒加载
 */

// 注册内置设置项（副作用导入，执行 registerSettingItem）
import './builtinSettings'

// 自动加载所有 JSON 配置
const configModules = import.meta.glob('../components-config/*.json', { eager: true })
const jsonConfigs = new Map<string, any>()
Object.entries(configModules).forEach(([, module]: [string, any]) => {
  const config = module.default || module
  jsonConfigs.set(config.type, config)
})

// 组件懒加载映射
const componentLoaders: Record<string, () => Promise<{ default: any }>> = {
  Img:                 () => import('@/components-form/show/Image.vue'),
  Video:               () => import('@/components-form/show/Video.vue'),
  FormTitle:           () => import('@/components-form/show/FormTitle.vue'),
  Radio:               () => import('@/components-form/base/Radio.vue'),
  Input:               () => import('@/components-form/base/Input.vue'),
  Textarea:            () => import('@/components-form/base/Textarea.vue'),
  Checkout:            () => import('@/components-form/base/Checkout.vue'),
  Date:                () => import('@/components-form/base/Date.vue'),
  DateRange:           () => import('@/components-form/base/DateRange.vue'),
  Time:                () => import('@/components-form/base/Time.vue'),
  TimeRange:           () => import('@/components-form/base/TimeRange.vue'),
  Url:                 () => import('@/components-form/base/Url.vue'),
  Number:              () => import('@/components-form/base/Number.vue'),
  Switch:              () => import('@/components-form/base/Switch.vue'),
  Upload:              () => import('@/components-form/base/Upload.vue'),
  Divider:             () => import('@/components-form/base/Divider.vue'),
  Paging:              () => import('@/components-form/base/Paging.vue'),
  Select:              () => import('@/components-form/base/Select.vue'),
  Rate:                () => import('@/components-form/base/Rate.vue'),
  NPS:                 () => import('@/components-form/base/NPS.vue'),
  SelectRate:          () => import('@/components-form/base/SelectRate.vue'),
  ElectronicSignature: () => import('@/components-form/advanced/Sign.vue'),
  Name:                () => import('@/components-form/contact-information/Name.vue'),
  Gender:              () => import('@/components-form/contact-information/Gender.vue'),
  Phone:               () => import('@/components-form/contact-information/Phone.vue'),
  TelePhone:           () => import('@/components-form/contact-information/TelePhone.vue'),
  IDCard:              () => import('@/components-form/contact-information/IdCard.vue'),
  Email:               () => import('@/components-form/contact-information/Email.vue'),
  WX:                  () => import('@/components-form/contact-information/WX.vue'),
  Address:             () => import('@/components-form/contact-information/Address.vue'),
}

// 组件元信息映射（描述编辑器行为）
const componentMeta: Record<string, PluginComponentDef['meta']> = {
  FormTitle:  { justShow: true, logicSourceEnabled: false },
  Divider:    { isLayoutComp: true, justShow: true, ignoreRequired: true, logicSourceEnabled: false },
  Paging:     { isLayoutComp: true, justShow: true, ignoreRequired: true, isPagingComponent: true, logicSourceEnabled: false },
  Radio:      { hasDataList: true, hasPlaceholder: true, logicCategory: 'enum' },
  Checkout:   { hasDataList: true, hasPlaceholder: true, logicCategory: 'multi' },
  Select:     { hasDataList: true, hasPlaceholder: true, logicCategory: 'enum' },
  Input:      { hasPlaceholder: true, hasValidationFormat: true, logicCategory: 'text' },
  Textarea:   { hasPlaceholder: true, hasValidationFormat: true, logicCategory: 'text' },
  Number:     { hasPlaceholder: true, hasNumberRange: true, logicCategory: 'number' },
  Url:        { hasPlaceholder: true, hasValidationFormat: true, builtinFormat: 'url', logicCategory: 'text' },
  Date:       { hasPlaceholder: true, logicCategory: 'date' },
  Time:       { hasPlaceholder: true, logicCategory: 'time' },
  DateRange:  { hasRangePlaceholder: true, logicCategory: 'date', logicSourceEnabled: false },
  TimeRange:  { hasRangePlaceholder: true, logicCategory: 'time', logicSourceEnabled: false },
  Name:       { hasPlaceholder: true, isPersonalClassify: true, logicCategory: 'text' },
  Gender:     { hasPlaceholder: true, isPersonalClassify: true, logicCategory: 'enum' },
  Phone:      { hasPlaceholder: true, isPersonalClassify: true, hasValidationFormat: true, builtinFormat: 'phone', logicCategory: 'text' },
  TelePhone:  { hasPlaceholder: true, isPersonalClassify: true, builtinFormat: 'telephone', logicCategory: 'text' },
  IDCard:     { hasPlaceholder: true, isPersonalClassify: true, hasValidationFormat: true, builtinFormat: 'idcard', logicCategory: 'text' },
  Email:      { hasPlaceholder: true, isPersonalClassify: true, hasValidationFormat: true, builtinFormat: 'email', logicCategory: 'text' },
  WX:         { hasPlaceholder: true, isPersonalClassify: true, logicCategory: 'text' },
  Address:    { isPersonalClassify: true, logicCategory: 'text' },
  ElectronicSignature: { logicSourceEnabled: false },
  Rate:       { logicCategory: 'number' },
  NPS:        { logicCategory: 'number' },
  SelectRate: { logicCategory: 'number' },
  Switch:     { logicCategory: 'boolean' },
  Upload:     { logicSourceEnabled: false },
  Img:        { justShow: true, logicSourceEnabled: false },
  Video:      { justShow: true, logicSourceEnabled: false },
}

// 分类排序（决定侧边栏组件列表的分组顺序）
const categoryOverride: Record<string, string> = {
  Rate:       'rate',
  SelectRate: 'rate',
  NPS:        'rate',
  Date:       'time',
  DateRange:  'time',
  Time:       'time',
  TimeRange:  'time',
}

/** 根据 JSON 配置 + 组件加载器 + 元信息，构建插件组件定义 */
function buildComponentDefs(): PluginComponentDef[] {
  const defs: PluginComponentDef[] = []

  for (const [type, loader] of Object.entries(componentLoaders)) {
    const json = jsonConfigs.get(type)
    if (!json) {
      console.warn(`[builtinPlugin] No JSON config found for component "${type}", skipping.`)
      continue
    }

    defs.push({
      type: json.type,
      name: json.name,
      label: json.label,
      icon: json.icon,
      category: categoryOverride[type] || json.category,
      component: loader,
      defaultConfig: json.defaultConfig || {},
      meta: componentMeta[type] || {},
    })
  }

  return defs
}

export const builtinPlugin: LemonFormPlugin = {
  name: 'builtin',
  components: buildComponentDefs(),
}
