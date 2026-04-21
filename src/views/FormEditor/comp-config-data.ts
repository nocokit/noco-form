
import { CompType } from "./comp-data"
import { getComponentConfig } from '@/components-config/registry'

interface CompConfig {
  name: string
  type: string
  title: string
  description: string | null
  dataValue: any
  dividerValue?: string
  pagingValue?: string
  defaultValue: string | null
  dataList?: any[]
  dataOtherList?: any[]
  useOtherDataList?: boolean
  layoutType?: 'horizontal' | 'vertical'
  isRequired?: boolean
  placeholder?: string
  placeholderRange?: [string, string]
  isCustomErrorMessage?: boolean
  customErrorMessage?: string
  formValidationFormat?: string
  formValidationFormatRegex?: string
  classify?: string[]
  value?: string | string[] | null
  startValue?: number
  startValueList?: number[]
  titleValue?: string
  titleSize?: string
  titleDescription?: string
  titleImageUrl?: string
  buttonText?: string
  size?: 'large' | 'middle' | 'small'
  position?: 'left' | 'right' | 'center'
  buttonIconShowBool?: boolean
  address?: string[]
  address_detail?: string
  address_default?: string[]
  address_detail_default?: string
  address_placeholder?: string
  address_detail_placeholder?: string
  sign_create_type?: 'png' | 'jpg'
  minValue?: number
  maxValue?: number
  isLayoutComp?: boolean
}


/** 组件基础默认值，用于兜底 */
const defaultConfig: CompConfig = {
  name: '',
  type: '',
  description: null,
  dataValue: null,
  defaultValue: null,
  customErrorMessage: '',
  title: '',
}

export const isFormTitle: CompType[] = [CompType.formTitle]
export const dataListType: CompType[] = [CompType.checkout, CompType.radio, CompType.select]
export const isLayoutType: CompType[] = [CompType.paging, CompType.divider]
export const hasIgnoreRequireType: CompType[] = [CompType.paging, CompType.divider, CompType.button]
export const hasPlaceholderType: CompType[] = [
  CompType.input, CompType.textarea, CompType.number, CompType.date, CompType.time,
  CompType.url, CompType.email, CompType.phone, CompType.idCard, CompType.location,
  CompType.wx, CompType.telePhone, CompType.name, CompType.select,
]
export const isPersonalClassifyList = [
  CompType.email, CompType.phone, CompType.idCard, CompType.location,
  CompType.wx, CompType.telePhone, CompType.name, CompType.gender,
]
export const isGender = [CompType.gender]
export const isRangePlaceholderType: CompType[] = [CompType.dateRange, CompType.timeRange]
export const isNumberType: CompType[] = [CompType.number]
export const isButton: CompType[] = [CompType.button]
export const isRate: CompType[] = [CompType.rate]
export const isNPS: CompType[] = [CompType.nps, CompType.selectRate]
export const isAddress: CompType[] = [CompType.address]
export const isSign: CompType[] = [CompType.electronicSignature]

/**
 * 获取组件默认配置
 * 优先从 JSON 配置文件读取（registry），JSON 缺失时回退到代码内联配置
 */
export const getDefaultConfig = (type: CompType | CompType[], ignoreDefault = false): Record<string, any> => {
  const base = ignoreDefault ? {} : { ...defaultConfig }

  const resolveOne = (t: CompType): Record<string, any> => {
    const pluginConfig = getComponentConfig(t)
    return Object.keys(pluginConfig).length > 0 ? pluginConfig : getFallbackConfig(t)
  }

  if (Array.isArray(type)) {
    return type.reduce((acc, t) => ({ ...acc, ...resolveOne(t) }), base)
  }

  return { ...base, ...resolveOne(type) }
}

/**
 * 兜底配置生成（仅在 JSON 未覆盖时使用）
 * 保留原有逻辑作为安全网
 */
const getFallbackConfig = (type: CompType): Record<string, any> => {
  let config: Record<string, any> = {}

  if (dataListType.includes(type)) {
    config.layoutType = 'vertical'
    config.dataList = [
      { label: '选项一', value: '选项一', _index: 0 },
      { label: '选项二', value: '选项二', _index: 1 },
      { label: '选项三', value: '选项三', _index: 2 },
    ]
  }

  if (isGender.includes(type)) {
    config.layoutType = 'vertical'
    config.dataList = [
      { label: '男', value: '男', _index: 0 },
      { label: '女', value: '女', _index: 1 },
    ]
    config.dataOtherList = [{ label: '暂不透露', value: '暂不透露', _index: 2 }]
    config.useOtherDataList = true
  }

  if (isLayoutType.includes(type)) {
    config.isLayoutComp = true
    if (type === CompType.paging) {
      Object.assign(config, { pagingValue: '分页', pageSubTitle: '', pageSubDescription: '' })
    } else {
      Object.assign(config, { dividerValue: '分割线', position: 'center' })
    }
  }

  if (!hasIgnoreRequireType.includes(type)) {
    config.isRequired = true
    config.isCustomErrorMessage = false
    config.description = '描述'
  }

  if (hasPlaceholderType.includes(type)) {
    config.placeholder = getCompPlaceholderByType(type) || '请输入'
  }

  if (isNumberType.includes(type)) {
    config.minValue = 0
    config.maxValue = 100
    config.placeholder = '请输入数字'
  }

  if (isRangePlaceholderType.includes(type)) {
    const rangePlaceholder: Record<string, [string, string]> = {
      [CompType.dateRange]: ['开始日期', '结束日期'],
      [CompType.timeRange]: ['开始时间', '结束时间'],
    }
    config.placeholderRange = rangePlaceholder[type] ?? ['开始', '结束']
  }

  if (isRate.includes(type)) {
    Object.assign(config, { rateCount: 5, rateCharacter: '⭐️', rateColor: '#ff9900', rateAllowHalf: false })
  }

  if (isFormTitle.includes(type)) {
    return {
      type,
      titleValue: '标题名称',
      titleSize: 'middle',
      titleDescription: 'Noco-Form，Github仓库已免费开源，感谢你的使用！',
      titleImageUrl: 'bg.png',
      titleDescriptionShow: true,
      titleImageShow: true,
      titleDescriptionPosition: 'center',
    }
  }

  if (isButton.includes(type)) {
    Object.assign(config, {
      type,
      title: '提交按钮',
      buttonText: '提交',
      size: 'large',
      position: 'center',
      buttonIconShowBool: true,
    })
  }

  if (isPersonalClassifyList.includes(type)) {
    config.classify = ['personal']
  }

  if (isNPS.includes(type)) {
    Object.assign(config, { defaultValue: 0, startValue: 0, rateCount: 10, startValueList: [0, 1] })
  }

  if (isAddress.includes(type)) {
    Object.assign(config, {
      address: [],
      address_detail: '',
      address_default: [],
      address_detail_default: '',
      address_placeholder: '请选择省/市/区',
      address_detail_placeholder: '请输入详细地址',
    })
  }

  if (isSign.includes(type)) {
    config.sign_create_type = 'png'
  }

  return config
}

const getCompPlaceholderByType = (type: string): string => {
  const placeholders: Record<string, string> = {
    Name: '请输入名称',
    Gender: '请选择性别',
    Phone: '请输入手机号',
    TelePhone: '请输入固话',
    IDCard: '请输入身份证',
    Email: '请输入邮件',
    WX: '请输入微信',
    Select: '请选择',
  }
  return placeholders[type] || ''
}

/** @deprecated 使用 getDefaultConfig 替代 */
export const getCompConfig = getFallbackConfig

export const getCompPlaceHolderDataByType = getCompPlaceholderByType

export const disableInputByDev = '编辑模式不支持输入'

export const hasOwnPropertyFunction = (object: object, key: string): boolean =>
  object != null && Object.prototype.hasOwnProperty.call(object, key)

export const verifyRegularityCompList = (): CompType[] => [
  CompType.input,
  CompType.textarea,
  CompType.url,
  CompType.email,
  CompType.phone,
  CompType.idCard,
]
