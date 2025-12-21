import Icon from './comp-icon'

/**
 * 组件类型枚举
 * @deprecated 建议使用 ComponentType from '@/types/component-schema'
 * 保留此枚举以兼容旧代码
 */
export enum CompType {
  // Layout 布局组件
  formTitle = 'FormTitle', // 表单标题/Typography
  divider = 'Divider', // 分割线
  paging = 'Paging', // 分页

  // Media & Content 媒体与内容组件
  image = 'Image', // 图片
  video = 'Video', // 视频

  // Inputs 基础输入组件
  input = 'Input', // 单行输入
  textarea = 'Textarea', // 多行输入
  number = 'Number', // 数字输入
  date = "Date", // 日期选择
  url = "Url", // 网址
  email = "Email", // 邮箱

  // Selection 选择组件
  select = 'Select', // 下拉选择
  checkboxGroup = 'CheckboxGroup', // 多选框组（原 checkout）
  radioGroup = 'RadioGroup', // 单选框组（新增）
  switch = "Switch", // 开关
  cascader = 'Cascader', // 级联选择
  countrySelector = 'CountrySelector', // 国家选择

  // Feedback 反馈交互组件
  rate = 'Rate', // 评分
  upload = "Upload", // 上传
  electronicSignature = 'ElectronicSignature', // 电子签名
  captcha = 'Captcha', // 验证码
  payment = 'Payment', // 支付信息
}

// 向后兼容的别名
export const checkout = CompType.checkboxGroup;

export const IgnoreLineNumberTypeList = [
  CompType.formTitle,
  CompType.divider,
  CompType.paging,
  CompType.grid,
  CompType.stepper
]

// 组件元素类型
export interface CompItemType {
  name: string
  label: string
  type: CompType
  icon?: string
}

enum CompListType {
  inputs = "Inputs",
  selection = "Selection",
  feedback = "Feedback",
  layout = "Layout",
  media = "Media",
}

// 组件分类列表类型
interface CompCategoryType {
  name: string
  label: string
  type: CompListType,
  tooltip?: string
  children: CompItemType[]
}

export const JustShowCompType: string[] = [
  CompType.formTitle,
  CompType.divider,
  CompType.paging,
  CompType.image,
  CompType.video,
]

// INPUTS - Text & Number Entry
const InputsComponentList: CompItemType[] = [
  {
    label: 'Input',
    name: 'Input',
    type: CompType.input,
    icon: 'ri-text'
  },
  {
    label: 'Number',
    name: 'Number',
    type: CompType.number,
    icon: 'ri-hashtag'
  },
  {
    label: 'Textarea',
    name: 'Textarea',
    type: CompType.textarea,
    icon: 'ri-file-text-line'
  },
  {
    label: 'Date & Time',
    name: 'Date & Time',
    type: CompType.date,
    icon: 'ri-calendar-line'
  },
  {
    label: 'URL',
    name: 'URL',
    type: CompType.url,
    icon: 'ri-link'
  },
  {
    label: 'Email',
    name: 'Email',
    type: CompType.email,
    icon: 'ri-mail-line'
  }
]

// SELECTION - Choices & Pickers
const SelectionComponentList: CompItemType[] = [
  {
    label: 'Select',
    name: 'Select',
    type: CompType.select,
    icon: 'ri-arrow-down-s-line'
  },
  {
    label: 'Checkbox Group',
    name: 'CheckboxGroup',
    type: CompType.checkboxGroup,
    icon: 'ri-checkbox-multiple-line'
  },
  {
    label: 'Radio Group',
    name: 'RadioGroup',
    type: CompType.radioGroup,
    icon: 'ri-radio-button-line'
  },
  {
    label: 'Cascader',
    name: 'Cascader',
    type: CompType.cascader,
    icon: 'ri-node-tree'
  },
  {
    label: 'Country',
    name: 'Country',
    type: CompType.countrySelector,
    icon: 'ri-global-line'
  },
  {
    label: 'Switch',
    name: 'Switch',
    type: CompType.switch,
    icon: 'ri-toggle-line'
  }
]

// FEEDBACK - Interaction & Media
const FeedbackComponentList: CompItemType[] = [
  {
    label: 'Rating',
    name: 'Rating',
    type: CompType.rate,
    icon: 'ri-star-line'
  },
  {
    label: 'Upload',
    name: 'Upload',
    type: CompType.upload,
    icon: 'ri-upload-cloud-line'
  },
  {
    label: 'Signature',
    name: 'Signature',
    type: CompType.electronicSignature,
    icon: 'ri-pen-nib-line'
  },
  {
    label: 'Captcha',
    name: 'Captcha',
    type: CompType.captcha,
    icon: 'ri-shield-check-line'
  },
  {
    label: 'Payment',
    name: 'Payment',
    type: CompType.payment,
    icon: 'ri-bank-card-line'
  }
]

// MEDIA & CONTENT - Images and Videos
const MediaComponentList: CompItemType[] = [
  {
    label: 'Image',
    name: 'Image',
    type: CompType.image,
    icon: 'ri-image-line'
  },
  {
    label: 'Video',
    name: 'Video',
    type: CompType.video,
    icon: 'ri-video-line'
  }
]

// LAYOUT - Structure & Organization
const LayoutComponentList: CompItemType[] = [
  {
    label: 'Paging',
    name: 'Paging',
    type: CompType.paging,
    icon: 'ri-file-list-line'
  },
  {
    label: 'Divider',
    name: 'Divider',
    type: CompType.divider,
    icon: 'ri-separator'
  },
  {
    label: 'Typography',
    name: 'Typography',
    type: CompType.formTitle,
    icon: 'ri-h-1'
  }
]


// Component list - Function-based categorization for better UX
export const CompListData: CompCategoryType[] = [
  {
    name: 'Layout',
    label: 'Layout',
    type: CompListType.layout,
    tooltip: 'Structure, organization, and containers',
    children: [...LayoutComponentList]
  },
  {
    name: 'Media',
    label: 'Media & Content',
    type: CompListType.media,
    tooltip: 'Images, videos, and rich media',
    children: [...MediaComponentList]
  },
  {
    name: 'Inputs',
    label: 'Inputs',
    type: CompListType.inputs,
    tooltip: 'Text, numbers, and basic data entry',
    children: [...InputsComponentList]
  },
  {
    name: 'Selection',
    label: 'Selection',
    type: CompListType.selection,
    tooltip: 'Dropdowns, choices, and pickers',
    children: [...SelectionComponentList]
  },
  {
    name: 'Feedback',
    label: 'Feedback',
    type: CompListType.feedback,
    tooltip: 'Ratings, uploads, and interactive components',
    children: [...FeedbackComponentList]
  }
]
