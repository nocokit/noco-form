import { CompType } from "./comp-data"

// 枚举定义
export enum DisplayMode {
  Display = 'display',
  Hidden = 'hidden',
  ReadOnly = 'readonly'
}

export enum DataSourceType {
  Static = 'static',
  API = 'api',
  Expression = 'expression'
}

export enum DateType {
  Date = 'date',
  DateTime = 'datetime',
  DateRange = 'daterange',
  Month = 'month',
  Year = 'year'
}

interface CompConfig {
  name: string
  type: string // 类型
  title: string // 标题
  description: string | null // 描述
  dataValue: any // 赋值，因为value和vue的绑定冲突，所以改成dataValue
  dividerValue?: string // 分割线文本
  pagingValue?: string // 分页内容
  pageSubTitle?: string // 分页标题
  pageSubDescription?: string // 分页描述
  defaultValue: string | null// 默认值
  dataList?: any[] // 列表数据，包括单选，多选，下拉选择
  dataOtherList?: any[] // 其他数据
  useOtherDataList?: boolean // 是否使用其他数据
  isRequired?: boolean // 必填
  placeholder?: string // 占位符
  isCustomErrorMessage?: boolean // 自定义报错
  customErrorMessage?: string // 自定义报错
  formValidationFormat?: string // 表单校验格式
  formValidationFormatRegex?: string // 表单正则校验内容

  // 值
  value?: string | string[] | null // 值

  // 标题
  titleValue?: string
  titleSize?: string
  titleDescription?: string
  titleImageUrl?: string

  // 尺寸和位置
  size?: 'large' | 'middle' | 'small' // 尺寸
  position?: 'left' | 'right' | 'center' // 位置

  // 电子签名
  sign_create_type?: 'png' | 'jpg'

  // 扩展字段
  minValue?: number // 最小值
  maxValue?: number // 最大值

  // 布局组件
  isLayoutComp?: boolean // 布局组件

  // ===== 新增字段（从新类型系统） =====
  id?: string // 组件唯一ID
  field?: string // 数据字段名
  display?: DisplayMode // 显示模式
  readonly?: boolean // 只读
  disabled?: boolean // 禁用

  // Input 特有
  minLength?: number // 最小长度
  maxLength?: number // 最大长度
  showCount?: boolean // 显示字数统计
  allowClear?: boolean // 清除按钮

  // Number 特有
  step?: number // 步长
  precision?: number // 精度

  // Date 特有
  dateType?: DateType // 日期类型
  format?: string // 显示格式
  valueFormat?: string // 值格式

  // 数据源
  dataSource?: any // 数据源配置

  // Upload 特有
  uploadConfig?: {
    maxCount?: number
    maxSize?: number
    accept?: string
    multiple?: boolean
  }

  // 响应式控制
  hiddenExpression?: string
  disabledExpression?: string
  readonlyExpression?: string

  // 联动和事件
  linkage?: any[]
  events?: any
  rules?: any[]
}

// 更新：支持新旧两种组件类型
export const HasSettingTypeList = ['Checkout', 'CheckboxGroup', 'RadioGroup', 'Select']

export const defaultConfig: CompConfig = {
  name: '',
  type: '',
  description: null,
  dataValue: null,
  defaultValue: null,
  customErrorMessage: '',
  title: '',
  display: DisplayMode.Display,
  readonly: false,
  disabled: false,
}

// 组件类型分类（更新以支持新类型）
export const isFormTitle: CompType[] = [CompType.formTitle]
export const dataListType: CompType[] = [CompType.checkboxGroup, CompType.radioGroup, CompType.select] // 数组列表
export const isLayoutType: CompType[] = [CompType.paging, CompType.divider]
export const hasIgnoreRequireType: CompType[] = [CompType.paging, CompType.divider]  // 忽略必填
export const hasPlaceholderType: CompType[] = [
  CompType.input,
  CompType.textarea,
  CompType.number,
  CompType.date,
  CompType.url,
  CompType.email,
  CompType.select,
  CompType.cascader,
  CompType.countrySelector,
]
export const isNumberType: CompType[] = [CompType.number]
export const isInputType: CompType[] = [CompType.input]
export const isTextareaType: CompType[] = [CompType.textarea]
export const isDateType: CompType[] = [CompType.date]
export const isRate: CompType[] = [CompType.rate]
export const isSign: CompType[] = [CompType.electronicSignature]
export const isUpload: CompType[] = [CompType.upload]
export const isImage: CompType[] = [CompType.image]
export const isVideo: CompType[] = [CompType.video]

export const getCompConfig = (type: CompType) => {
  let compConfig: any = {
    display: DisplayMode.Display,
    readonly: false,
    disabled: false,
  }

  // 数组列表类型（Select, CheckboxGroup, RadioGroup）
  if(dataListType.includes(type)) {
    compConfig  = {
      ...compConfig,
      dataList: [{
        label: '选项一',
        value: '选项一',
        _index: 0,
      },{
        label: '选项二',
        value: '选项二',
        _index: 1,
      },{
        label: '选项三',
        value: '选项三',
        _index: 2,
      }],
      // 新增：数据源配置
      dataSource: {
        type: DataSourceType.Static,
        staticData: [
          { label: '选项一', value: 'option1' },
          { label: '选项二', value: 'option2' },
          { label: '选项三', value: 'option3' }
        ]
      }
    }
  }

  // Input 组件
  if(isInputType.includes(type)) {
    compConfig = {
      ...compConfig,
      minLength: 0,
      maxLength: 200,
      showCount: false,
      allowClear: true,
    }
  }

  // Textarea 组件
  if(isTextareaType.includes(type)) {
    compConfig = {
      ...compConfig,
      minLength: 0,
      maxLength: 1000,
      showCount: true,
      allowClear: true,
    }
  }

  // Number 组件
  if(isNumberType.includes(type)) {
    compConfig = {
      ...compConfig,
      minValue: 0,
      maxValue: 100,
      step: 1,
      precision: 0,
      placeholder: '请输入数字'
    }
  }

  // Date 组件
  if(isDateType.includes(type)) {
    compConfig = {
      ...compConfig,
      dateType: DateType.Date,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    }
  }

  // Upload 组件
  if(isUpload.includes(type)) {
    compConfig = {
      ...compConfig,
      uploadConfig: {
        maxCount: 5,
        maxSize: 10 * 1024 * 1024, // 10MB
        accept: 'image/*,.pdf,.doc,.docx',
        multiple: true
      }
    }
  }

  // 布局组件
  if(isLayoutType.includes(type)) {
    let data = {}

    if (CompType.paging === type) {
      data = {
        pagingValue: '分页',
        pageSubTitle: '',
        pageSubDescription: ''
      }
    } else if (CompType.divider === type) {
      data = {
        dividerValue: '分割线',
        position: 'center'
      }
    } else if (CompType.grid === type) {
      data = {
        columnCount: 2,
        gap: 16,
        layout: [12, 12], // 基于24栅格
        responsiveStack: true,
        children: [] // 子组件ID列表
      }
    } else if (CompType.stepper === type) {
      data = {
        steps: [
          { title: 'Step 1', description: '' },
          { title: 'Step 2', description: '' },
          { title: 'Step 3', description: '' }
        ],
        currentStep: 0
      }
    }

    compConfig = {
      ...compConfig,
      ...data,
      isLayoutComp: true
    }
  }

  // 非布局组件需要必填和描述
  if(!hasIgnoreRequireType.includes(type)) {
    compConfig = {
      ...compConfig,
      isRequired: true,
      isCustomErrorMessage: false,
      description: '',
      rules: [] // 新增：校验规则数组
    }
  }

  // 占位符
  if(hasPlaceholderType.includes(type)) {
    compConfig = {
      ...compConfig,
      placeholder: getCompPlaceHolderDataByType(type) || '请输入'
    }
  }

  // 评分组件
  if(isRate.includes(type)) {
    compConfig = {
      ...compConfig,
      rateCount: 5,
      rateCharacter: '⭐️',
      rateColor: '#ff9900',
      rateAllowHalf: false,
    }
  }

  // 标题组件
  if(isFormTitle.includes(type)) {
    compConfig = {
      type,
      titleValue: '表单标题',
      titleSize: 'middle',
      titleDescription: 'noco-form 表单编辑器，Github仓库已免费开源，感谢你的使用！',
      titleImageUrl: 'bg.png',
      titleDescriptionShow: true,
      titleImageShow: true,
      titleDescriptionPosition: 'center'
    }
    return compConfig
  }

  // 电子签名
  if(isSign.includes(type)) {
    compConfig = {
      ...compConfig,
      sign_create_type: 'png'
    }
  }

  // 图片组件
  if(isImage.includes(type)) {
    compConfig = {
      type,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
      imageTitle: '关于我们的愿景',
      imageDescription: '在 NOCO FORM，我们相信数据收集应当是优雅且充满力量的。',
      imageBadge: 'Introduction',
      imageAlt: 'Product Preview',
      showOverlay: true,
      showBadge: true,
    }
    return compConfig
  }

  // 视频组件
  if(isVideo.includes(type)) {
    compConfig = {
      type,
      videoUrl: '',
      videoTitle: '快速了解我们的生产环境 (2025版)',
      videoDescription: '观看此 2 分钟视频，深入了解我们的背后团队。',
      videoPoster: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2344',
      videoLabel: 'Company Showreel',
      autoplay: false,
      controls: true,
      loop: false,
    }
    return compConfig
  }

  return compConfig
}

export const getCompPlaceHolderDataByType = (type: string) => {
  const placeholderObject: any = {
    Input: '请输入',
    Textarea: '请输入',
    Number: '请输入数字',
    Date: '请选择日期',
    Url: '请输入网址',
    Email: '请输入邮箱',
    Select: '请选择',
    CheckboxGroup: '请选择',
    RadioGroup: '请选择',
    Cascader: '请选择',
    CountrySelector: '请选择国家',
  }

  return placeholderObject[type]
}

/**
 * 获取默认配置（增强版）
 * 自动生成 id 和 field
 */
export const getDefaultConfig = (type: CompType | CompType[], ignoreDefault: boolean = false) => {
  let configData: any = ignoreDefault ? {} :{
    ...defaultConfig
  }

  // 生成唯一ID和字段名
  const singleType = Array.isArray(type) ? type[0] : type

  if (!singleType) {
    console.error('getDefaultConfig: type is undefined or empty')
    return configData
  }

  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)

  configData.id = `comp_${singleType}_${timestamp}_${random}`
  configData.field = `field_${String(singleType).toLowerCase()}_${timestamp}`

  if(Array.isArray(type)) {
    type.map((itemType) => {
      const compConfig = getCompConfig(itemType)
      configData = {
        ...configData,
        ...compConfig
      }
    })
  } else {
    const compConfig = getCompConfig(type)
    configData = {
      ...configData,
      ...compConfig
    }
  }

  return {...configData}
}

export const disableInputByDev = '编辑模式不支持输入'
export const hasOwnPropertyFunction = (object: Object, key: string)=> {
  return object && Object.prototype.hasOwnProperty.call(object, key)
}

export const verifyRegularityCompList = () => {
  return [
    CompType.input,
    CompType.textarea,
    CompType.url,
    CompType.email,
  ]
}
