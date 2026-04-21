/**
 * 注册所有内置设置项到 settingRegistry
 * 每个设置项声明自己的匹配条件（基于字段/meta），实现自动映射
 */
import { registerSettingItem } from './settingRegistry'

// ─── 基础设置 ───

registerSettingItem({
  name: 'FormTitle',
  component: () => import('@/components-form-setting/show/FormTitle.vue'),
  group: 'basic',
  order: 0,
  match: (comp) => comp.type === 'FormTitle',
})

registerSettingItem({
  name: 'Title',
  component: () => import('@/components-form-setting/base/Title.vue'),
  group: 'basic',
  order: 10,
  match: (comp) =>
    has(comp, 'name') && !has(comp, 'isLayoutComp') && comp.type !== 'FormTitle',
})

registerSettingItem({
  name: 'ButtonText',
  component: () => import('@/components-form-setting/base/ButtonText.vue'),
  group: 'basic',
  order: 15,
  match: (comp) => has(comp, 'buttonText'),
})

registerSettingItem({
  name: 'Description',
  component: () => import('@/components-form-setting/base/Description.vue'),
  group: 'basic',
  order: 20,
  match: (comp) => has(comp, 'description') && comp.type !== 'FormTitle',
})

registerSettingItem({
  name: 'PageSubTitle',
  component: () => import('@/components-form-setting/base/PageSubTitle.vue'),
  group: 'basic',
  order: 25,
  match: (comp) => has(comp, 'pageSubTitle'),
})

registerSettingItem({
  name: 'PageSubDescription',
  component: () => import('@/components-form-setting/base/PageSubDescription.vue'),
  group: 'basic',
  order: 26,
  match: (comp) => has(comp, 'pageSubTitle'),
})

registerSettingItem({
  name: 'Placeholder',
  component: () => import('@/components-form-setting/base/Placeholder.vue'),
  group: 'basic',
  order: 30,
  match: (comp) => has(comp, 'placeholder'),
})

registerSettingItem({
  name: 'AddressPlaceholder',
  component: () => import('@/components-form-setting/base/AddressPlaceholder.vue'),
  group: 'basic',
  order: 31,
  match: (comp) => has(comp, 'address_placeholder'),
})

registerSettingItem({
  name: 'RangePlaceholder',
  component: () => import('@/components-form-setting/base/RangePlaceholder.vue'),
  group: 'basic',
  order: 32,
  match: (comp) => has(comp, 'placeholderRange'),
})

registerSettingItem({
  name: 'LayoutType',
  component: () => import('@/components-form-setting/base/LayoutType.vue'),
  group: 'basic',
  order: 40,
  match: (comp) => has(comp, 'layoutType'),
})

registerSettingItem({
  name: 'DividerText',
  component: () => import('@/components-form-setting/base/DividerText.vue'),
  group: 'basic',
  order: 50,
  match: (comp) => has(comp, 'dividerValue'),
})

registerSettingItem({
  name: 'DividerBorderType',
  component: () => import('@/components-form-setting/base/DividerBorderType.vue'),
  group: 'basic',
  order: 51,
  match: (comp) => has(comp, 'dividerValue'),
})

registerSettingItem({
  name: 'Position',
  component: () => import('@/components-form-setting/base/Position.vue'),
  group: 'basic',
  order: 60,
  match: (comp) => has(comp, 'position'),
})

registerSettingItem({
  name: 'Size',
  component: () => import('@/components-form-setting/base/Size.vue'),
  group: 'basic',
  order: 61,
  match: (comp) => has(comp, 'size'),
})

registerSettingItem({
  name: 'RateConfig',
  component: () => import('@/components-form-setting/base/RateConfig.vue'),
  group: 'basic',
  order: 70,
  match: (_comp, def) => has(_comp, 'rateCount') && !def?.meta?.hasNumberRange,
})

registerSettingItem({
  name: 'NPSConfig',
  component: () => import('@/components-form-setting/base/NPSConfig.vue'),
  group: 'basic',
  order: 71,
  match: (comp) => has(comp, 'startValue') && has(comp, 'startValueList'),
})

registerSettingItem({
  name: 'DataList',
  component: () => import('@/components-form-setting/data/DataList.vue'),
  group: 'basic',
  order: 80,
  match: (comp) => has(comp, 'dataList'),
})

registerSettingItem({
  name: 'UseOtherDataList',
  component: () => import('@/components-form-setting/data/UseOtherDataList.vue'),
  group: 'basic',
  order: 81,
  match: (comp) => has(comp, 'useOtherDataList'),
})

registerSettingItem({
  name: 'SignCreateImgType',
  component: () => import('@/components-form-setting/data/SignCreateImgType.vue'),
  group: 'basic',
  order: 90,
  match: (comp) => has(comp, 'sign_create_type'),
})

// ─── 验证设置 ───

registerSettingItem({
  name: 'NumberConfig',
  component: () => import('@/components-form-setting/form-validation/NumberConfig.vue'),
  group: 'validation',
  order: 0,
  match: (comp) => has(comp, 'maxValue'),
})

registerSettingItem({
  name: 'Required',
  component: () => import('@/components-form-setting/form-validation/Required.vue'),
  group: 'validation',
  order: 10,
  match: (comp) => has(comp, 'isRequired'),
})

registerSettingItem({
  name: 'ValidationSystem',
  component: () => import('@/components-form-setting/form-validation/ValidationFormat.vue'),
  group: 'validation',
  order: 20,
  match: (_comp, def) => def?.meta?.hasValidationFormat === true,
})

// ─── 工具函数 ───

function has(comp: Record<string, any>, key: string): boolean {
  return comp != null && Object.prototype.hasOwnProperty.call(comp, key)
}
