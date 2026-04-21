import Icon from './comp-icon'
export enum CompType {
  // form表单
  formTitle = 'FormTitle', // 表单标题

  // 基础组件
  input = 'Input',
  textarea = 'Textarea',
  number = 'Number',
  switch = "Switch",
  url = "Url", // 网址
  radio = 'Radio',
  checkout = 'Checkout',
  date = "Date",
  dateRange = 'DateRange', // 日期范围
  time = 'Time',
  timeRange = 'TimeRange', // 时间范围
  upload = "Upload",
  select = 'Select', // 下拉选择
  img = 'Img', // 图片选择
  sort = 'Sort', // 排序
  button = "Button", // 按钮

  // 个人信息
  name = 'Name', // 姓名
  gender = 'Gender', // 性别
  wx = "WX", // 微信
  phone = 'Phone', // 手机
  telePhone = 'TelePhone', // 固话
  email = "Email", // 邮箱
  landline = 'Landline', // 座机
  idCard = 'IDCard', // 身份证
  address = 'Address', // 地址
  
  // 布局组件
  divider = 'Divider', // 分割线
  paging = 'Paging', // 分页

  // 高级组件
  rate = 'Rate', // 评分
  selectRate = 'SelectRate', // 下拉评分
  nps = 'NPS', // nps
  electronicSignature = 'ElectronicSignature', // 电子签名
  location = 'Location', // 位置信息
  editor = "Editor", // 富文本
  serialNumber = 'SerialNumber', // 流水号

  // 常见组件
  boolean = "Boolean", // 常见组件
  satisfactionLevel = "SatisfactionLevel", // 满意度
  annualIncome = "AnnualIncome", // 年收入

  // 显示组件
  imgText = 'ImgText', // 图文
  video = 'Video', // 视频  
  title = 'Title', // 表单标题
}


// 组件元素类型
export interface CompItemType {
  name: string 
  label: string 
  type: CompType
  icon?: string
}

enum CompListType {
  basic = "Basic Component",
  advanced = "Advanced Component",
  personal = "Personal Component",
  form = "Form Component",
  layout = "Layout Component",
  business = "Business Component",
  common = "Common Component",
  show = "Show Component",
}

// 组件分类列表类型
interface CompCategoryType {
  name: string
  label: string 
  type: CompListType,
  tooltip?: string
  children: CompItemType[]
}


// 显示组件
const ShowComponentList: CompItemType[] = [
  {
    label: '标题',
    name: '标题',
    type: CompType.formTitle,
    icon: Icon.Title
  },
  // {
  //   label: '图片',
  //   name: '图片',
  //   type: CompType.img,
  //   icon: Icon.Img
  // },
  //   {
  //   label: '视频',
  //   name: '视频',
  //   type: CompType.video,
  //   icon: Icon.Video
  // },
  //   {
  //   label: '图文',
  //   name: '图文',
  //   type: CompType.imgText,
  //   icon: Icon.ImgText
  // },
]

// 基础组件
const BasicComponentList:CompItemType[] = [
  {
    label: '单选',
    name: '单选',
    type: CompType.radio,
    icon: Icon.Radio
  },
  {
    label: '多选',
    name: '多选',
    type: CompType.checkout,
    icon: Icon.Checkout
  },
  {
    label: '数字',
    name: '数字',
    type: CompType.number,
    icon: Icon.Number
  },
  {
    label: '开关',
    name: '开关',
    type: CompType.switch,
    icon: Icon.Switch
  },
  {
    label: '单行输入',
    name: '单行输入',
    type: CompType.input,
    icon: Icon.Input
  },
  {
    label: '多行输入',
    name: '多行输入',
    type: CompType.textarea,
    icon: Icon.TextArea
  },
    {
    label: '下拉组件',
    name: '下拉组件',
    type: CompType.select,
    icon: Icon.Select
  }
]

const RateComponentList: CompItemType[] = [
  {
    label: '评分',
    name: '评分',
    type: CompType.rate,
    icon: Icon.Rate
  },
  {
    label: '下拉评分',
    name: '下拉评分',
    type: CompType.selectRate,
    icon: Icon.Select
  },
  {
    label: 'NPS',
    name: 'NPS',
    type: CompType.nps,
    icon: Icon.NPS
  },
]

const TimeComponentList: CompItemType[] = [
  {
    label: '日期',
    name: '日期',
    type: CompType.date,
    icon: Icon.Date
  },
  {
    label: '日期范围',
    name: '日期范围',
    type: CompType.dateRange,
    icon: Icon.DateRange
  },
  {
    label: '时间',
    name: '时间',
    type: CompType.time,
    icon: Icon.Time
  },
  {
    label: '时间范围',
    name: '时间范围',
    type: CompType.timeRange,
    icon: Icon.TimeRange
  },

]


// 布局组件
const LayoutComponentList: CompItemType[] = [
  {
    label: '分割线',
    name: '分割线',
    type: CompType.divider,
    icon: Icon.Divider
  },  {
    label: '分页',
    name: '分页',
    type: CompType.paging,
    icon: Icon.Paging
  }
]

// 个人信息
const PersonalComponentList: CompItemType[] = [
  {
    label: '姓名',
    name: '姓名',
    type: CompType.name,
    icon: Icon.Name
  },
  {
    label: '性别',
    name: '性别',
    type: CompType.gender,
    icon: Icon.Gender
  },{
    label: '手机',
    name: '手机',
    type: CompType.phone,
    icon: Icon.Phone
  },{
    label: '固定电话',
    name: '固定电话',
    type: CompType.telePhone,
    icon: Icon.TelePhone
  },{
    label: '身份证',
    name: '身份证',
    type: CompType.idCard,
    icon: Icon.ID
  }, {
    label: '邮件',
    name: '邮件',
    type: CompType.email,
    icon: Icon.Email
  },{
    label: '微信',
    name: '微信',
    type: CompType.wx,
    icon: Icon.WX
  }, {
    label: '地址',
    name: '地址',
    type: CompType.address,
    icon: Icon.Address
  },  
  {
    label: '网址',
    name: '网址',
    type: CompType.url,
    icon: Icon.Url
  },
]

// 高级
const AdvancedComponentList = [  
//   {
//   label: 'NPS',
//   name: 'NPS',
//   type: CompType.nps
// },  {
//   label: '排序',
//   name: '排序',
//   type: CompType.sort
// },{
//   label: '定位',
//   name: '定位',
//   type: CompType.location
// },{
//   label: '流水号',
//   name: '流水号',
//   type: CompType.serialNumber
// }, {
//   label: '富文本',
//   name: '富文本',
//   type: CompType.editor
// },
{
  label: '上传',
  name: '上传',
  type: CompType.upload,
  icon: Icon.Upload
},
{
  label: '电子签名',
  name: '电子签名',
  icon: Icon.Sign,
  type: CompType.electronicSignature
}]

// 常见组件
const CommonComponentList = [
//{
//   label: '满意度',
//   name: '满意度',
//   type: CompType.satisfactionLevel
// },{
//   label: '是否',
//   name: '是否',
//   type: CompType.boolean
// },{
//   label: '社会关系',
//   name: '社会关系',
//   type: CompType.select
// },{
//   label: '年收入',
//   name: '年收入',
//   type: CompType.annualIncome
// }, {
//   label: '年收入',
//   name: '年收入',
//   type: CompType.radio
// },{
//   label: '部门',
//   name: '部门',
//   type: CompType.select
// },{
//   label: '政治面貌',
//   name: '政治面貌',
//   type: CompType.radio
// }
]

// 组件列表
export const CompListData:CompCategoryType[] = [{
  name: '展示',
  label: '展示',
  type: CompListType.show,
  children: [...ShowComponentList]
},{
  name: '基础',
  label: '基础',
  type: CompListType.basic,
  children: [...BasicComponentList]
},{
  name: '评分和满意度',
  label: '评分和满意度',
  type: CompListType.basic,
  children: [...RateComponentList]
},{
  name: '日期和时间',
  label: '日期和时间',
  type: CompListType.basic,
  children: [...TimeComponentList]
},{
  name: '布局',
  label: '布局',
  type: CompListType.layout,
  children: [...LayoutComponentList]
},{
  name: '个人信息',
  label: '个人信息',
  type: CompListType.personal,
  tooltip: '提供常见的个人信息配置，同时方便后期数据统计',
  children: [...PersonalComponentList]
},
{
  name: '高级',
  label: '高级',
  type: CompListType.advanced,
  children: [...AdvancedComponentList]
}, 
// {
//   name: '通用',
//   label: '通用',
//   type: CompListType.common,
//   children:  [...CommonComponentList]
// }
]