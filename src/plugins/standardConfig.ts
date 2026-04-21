/**
 * 标准组件配置字段接口
 *
 * 外部插件可以通过实现此接口的部分字段来复用内置设置项。
 * 例如：声明 `placeholder` 字段会自动在右侧面板显示 Placeholder 设置项。
 */
export interface StandardComponentConfig {
  // ─── 基础字段（所有组件） ───

  /** 组件名称（内部标识） */
  name: string
  /** 组件类型 */
  type: string
  /** 组件标题（显示在表单中） */
  title: string
  /** 描述文本 */
  description?: string | null

  // ─── 值相关 ───

  /** 组件当前值 */
  dataValue?: any
  /** 默认值 */
  defaultValue?: any
  /** 组件值（某些组件使用 value 而非 dataValue） */
  value?: string | string[] | null

  // ─── 表单验证 ───

  /** 是否必填 */
  isRequired?: boolean
  /** 自定义错误提示 */
  customErrorMessage?: string
  /** 是否启用自定义错误提示 */
  isCustomErrorMessage?: boolean
  /** 验证格式（如 'phone', 'email', 'idcard', 'url'） */
  formValidationFormat?: string
  /** 自定义正则表达式 */
  formValidationFormatRegex?: string

  // ─── 输入组件 ───

  /** 占位符文本 */
  placeholder?: string
  /** 范围占位符（DateRange、TimeRange） */
  placeholderRange?: [string, string]

  // ─── 选项组件（Radio、Checkout、Select） ───

  /** 选项列表 */
  dataList?: Array<{ label: string; value: any; _index: number }>
  /** "其他"选项列表 */
  dataOtherList?: Array<{ label: string; value: any; _index: number }>
  /** 是否启用"其他"选项 */
  useOtherDataList?: boolean
  /** 布局方式 */
  layoutType?: 'horizontal' | 'vertical'

  // ─── 数值组件 ───

  /** 最小值 */
  minValue?: number
  /** 最大值 */
  maxValue?: number

  // ─── 布局组件 ───

  /** 分割线文本 */
  dividerValue?: string
  /** 分页文本 */
  pagingValue?: string
  /** 位置 */
  position?: 'left' | 'right' | 'center'
  /** 尺寸 */
  size?: 'large' | 'middle' | 'small'

  // ─── 地址组件 ───

  /** 地址（省/市/区） */
  address?: string[]
  /** 详细地址 */
  address_detail?: string
  /** 默认地址 */
  address_default?: string[]
  /** 默认详细地址 */
  address_detail_default?: string
  /** 地址占位符 */
  address_placeholder?: string
  /** 详细地址占位符 */
  address_detail_placeholder?: string

  // ─── 评分组件 ───

  /** 评分数量 */
  rateCount?: number
  /** 评分字符 */
  rateCharacter?: string
  /** 评分颜色 */
  rateColor?: string
  /** 是否允许半星 */
  rateAllowHalf?: boolean

  // ─── NPS 组件 ───

  /** 起始值 */
  startValue?: number
  /** 起始值列表 */
  startValueList?: number[]

  // ─── 签名组件 ───

  /** 签名图片格式 */
  sign_create_type?: 'png' | 'jpg'

  // ─── 标题组件 ───

  /** 标题文本 */
  titleValue?: string
  /** 标题尺寸 */
  titleSize?: 'large' | 'middle' | 'small'
  /** 标题描述 */
  titleDescription?: string
  /** 标题图片 URL */
  titleImageUrl?: string
  /** 是否显示标题描述 */
  titleDescriptionShow?: boolean
  /** 是否显示标题图片 */
  titleImageShow?: boolean
  /** 标题描述位置 */
  titleDescriptionPosition?: 'left' | 'center' | 'right'

  // ─── 按钮 ───

  /** 按钮文本 */
  buttonText?: string
  /** 是否显示按钮图标 */
  buttonIconShowBool?: boolean

  // ─── 分页 ───

  /** 分页副标题 */
  pageSubTitle?: string
  /** 分页副描述 */
  pageSubDescription?: string

  // ─── 分类标签 ───

  /** 分类标签（用于数据统计） */
  classify?: string[]

  // ─── 内部字段（运行时） ───

  /** 组件唯一 ID */
  id?: string
  /** 选中状态 ID */
  _selectedId?: string
  /** 行号 */
  lineNumber?: string
  /** 是否为布局组件（内部标记） */
  isLayoutComp?: boolean

  // ─── 图片/视频组件 ───

  /** 图片 URL */
  imgUrl?: string
  /** 图片宽度 */
  imgWidth?: number
  /** 图片高度 */
  imgHeight?: number
  /** 视频 URL */
  videoUrl?: string
  /** 视频宽度 */
  videoWidth?: number
  /** 视频高度 */
  videoHeight?: number
}

/**
 * 配置字段到设置项组件的映射
 *
 * 用于文档化：当 defaultConfig 中声明某个字段时，右侧面板会显示对应的设置项。
 */
export const SETTING_FIELD_MAP = {
  // 基础设置
  name: 'Title',                          // 标题设置
  description: 'Description',             // 描述设置
  buttonText: 'ButtonText',               // 按钮文本

  // 输入设置
  placeholder: 'Placeholder',             // 占位符
  placeholderRange: 'RangePlaceholder',   // 范围占位符
  address_placeholder: 'AddressPlaceholder', // 地址占位符

  // 布局设置
  layoutType: 'LayoutType',               // 布局方式
  position: 'Position',                   // 位置
  size: 'Size',                           // 尺寸
  dividerValue: 'DividerText',            // 分割线文本

  // 分页设置
  pageSubTitle: 'PageSubTitle',           // 分页副标题
  pageSubDescription: 'PageSubDescription', // 分页副描述

  // 数据设置
  dataList: 'DataList',                   // 选项列表
  useOtherDataList: 'UseOtherDataList',   // "其他"选项

  // 验证设置
  isRequired: 'Required',                 // 必填
  formValidationFormat: 'ValidationSystem', // 验证格式
  maxValue: 'NumberConfig',               // 数值范围

  // 特殊组件设置
  sign_create_type: 'SignCreateImgType',  // 签名格式
  rateCount: 'RateConfig',                // 评分配置
  startValue: 'NPSConfig',                // NPS 配置
  titleValue: 'FormTitle',                // 标题配置
} as const

/**
 * 设置项字段 key 类型
 */
export type SettingFieldKey = keyof typeof SETTING_FIELD_MAP

/**
 * 设置项组件名称类型
 */
export type SettingComponentName = typeof SETTING_FIELD_MAP[SettingFieldKey]
