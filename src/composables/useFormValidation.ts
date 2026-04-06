/**
 * 表单校验引擎
 * 支持：必填、格式校验（手机/邮件/身份证/网址/数字/自定义正则）、数字范围
 */

export type ValidationFormat = 'phone' | 'number' | 'website' | 'idCard' | 'email' | 'regular'

const PATTERNS: Record<string, RegExp> = {
  phone:   /^1[3-9]\d{9}$/,
  number:  /^-?\d+(\.\d+)?$/,
  website: /^(https?:\/\/)[\w-]+(\.[\w-]+)+([\w\-._~:/?#[\]@!$&'()*+,;=]+)?$/i,
  idCard:  /^\d{17}[\dXx]$/,
  email:   /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/,
}

/** 内置格式验证规则对应的默认错误提示 */
const FORMAT_MESSAGES: Record<string, string> = {
  phone:   '请输入正确的手机号',
  number:  '请输入有效的数字',
  website: '请输入正确的网址',
  idCard:  '请输入正确的身份证号',
  email:   '请输入正确的邮件地址',
  regular: '格式不正确',
}

/** 个人信息组件内置格式规则 */
const PERSONAL_BUILTIN: Record<string, ValidationFormat> = {
  Phone:     'phone',
  Email:     'email',
  IDCard:    'idCard',
  TelePhone: 'phone',
}

export interface FieldComp {
  id: string
  type: string
  title?: string
  isRequired?: boolean
  isCustomErrorMessage?: boolean
  customErrorMessage?: string
  formValidationFormat?: string
  formValidationFormatRegex?: string
  minValue?: number
  maxValue?: number
  dataValue?: any
  value?: any
  [key: string]: any
}

/** 从组件配置中取当前填写的值 */
const getValue = (comp: FieldComp): any => {
  if (comp.dataValue !== undefined && comp.dataValue !== null) return comp.dataValue
  if (comp.value !== undefined && comp.value !== null) return comp.value
  // address
  if (comp.address !== undefined) return comp.address?.length ? comp.address : null
  return null
}

const isEmpty = (val: any): boolean => {
  if (val === null || val === undefined || val === '') return true
  if (Array.isArray(val)) return val.length === 0
  return false
}

/** 校验单个组件，返回错误信息（null = 通过） */
export const validateComp = (comp: FieldComp): string | null => {
  const val = getValue(comp)
  const empty = isEmpty(val)

  // 必填校验
  if (comp.isRequired && empty) {
    return comp.isCustomErrorMessage && comp.customErrorMessage
      ? comp.customErrorMessage
      : `${comp.title || '该项'} 为必填项`
  }

  // 值为空时后续格式校验跳过
  if (empty) return null

  const strVal = String(val).trim()

  // 数字范围校验
  if (comp.type === 'Number') {
    const num = Number(strVal)
    if (!isNaN(num)) {
      if (comp.minValue !== undefined && num < comp.minValue) {
        return `不能小于 ${comp.minValue}`
      }
      if (comp.maxValue !== undefined && num > comp.maxValue) {
        return `不能大于 ${comp.maxValue}`
      }
    }
  }

  // 个人信息内置格式
  const builtinFormat = PERSONAL_BUILTIN[comp.type]
  if (builtinFormat) {
    const regex = PATTERNS[builtinFormat]
    if (!regex.test(strVal)) {
      const msg = comp.isCustomErrorMessage && comp.customErrorMessage
        ? comp.customErrorMessage
        : FORMAT_MESSAGES[builtinFormat]
      return msg
    }
  }

  // formValidationFormat 自定义格式
  const fmt = comp.formValidationFormat as ValidationFormat | undefined
  if (fmt && fmt !== 'regular') {
    const regex = PATTERNS[fmt]
    if (regex && !regex.test(strVal)) {
      const msg = comp.isCustomErrorMessage && comp.customErrorMessage
        ? comp.customErrorMessage
        : FORMAT_MESSAGES[fmt]
      return msg
    }
  }

  // 自定义正则
  if (fmt === 'regular' && comp.formValidationFormatRegex) {
    try {
      const regex = new RegExp(comp.formValidationFormatRegex)
      if (!regex.test(strVal)) {
        return comp.isCustomErrorMessage && comp.customErrorMessage
          ? comp.customErrorMessage
          : '格式不正确'
      }
    } catch {
      // 正则无效时跳过
    }
  }

  return null
}

/** 校验整个表单，返回 { id → errorMsg } 映射 */
export const validateForm = (
  compList: FieldComp[],
  skipTypes = ['Divider', 'Paging', 'FormTitle', 'Button']
): Record<string, string> => {
  const errors: Record<string, string> = {}
  for (const comp of compList) {
    if (skipTypes.includes(comp.type)) continue
    const err = validateComp(comp)
    if (err) errors[comp.id] = err
  }
  return errors
}
