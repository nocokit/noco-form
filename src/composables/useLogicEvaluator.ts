/**
 * 逻辑联动引擎
 * 根据组件的 logicRules 和当前表单值，计算哪些组件应该隐藏
 */

export interface LogicRule {
  sourceId: string
  operator: string
  value: string | number
  action: 'show' | 'hide'
}

/** 从组件配置中取当前填写值（兼容各组件的字段名） */
export const getCompValue = (comp: Record<string, any>): any => {
  if (comp.dataValue !== undefined && comp.dataValue !== null) return comp.dataValue
  if (comp.value !== undefined && comp.value !== null) return comp.value
  if (comp.address !== undefined) return comp.address?.length ? comp.address.join('') : null
  return null
}

/** 评估单条规则是否匹配 */
const evalRule = (rule: LogicRule, formValues: Record<string, any>): boolean => {
  const raw = formValues[rule.sourceId]
  // 统一规范化：对象取 .value，数组保留，其余转字符串
  const normalizeItem = (v: any): string => String(v?.value ?? v ?? '')
  const ruleVal = String(rule.value ?? '')

  switch (rule.operator) {
    case 'equals':
      if (Array.isArray(raw)) return raw.some(v => normalizeItem(v) === ruleVal)
      return normalizeItem(raw) === ruleVal
    case 'not_equals':
      if (Array.isArray(raw)) return !raw.some(v => normalizeItem(v) === ruleVal)
      return normalizeItem(raw) !== ruleVal
    case 'contains':
      if (Array.isArray(raw)) return raw.some(v => normalizeItem(v) === ruleVal)
      return normalizeItem(raw).includes(ruleVal)
    case 'not_contains':
      if (Array.isArray(raw)) return !raw.some(v => normalizeItem(v) === ruleVal)
      return !normalizeItem(raw).includes(ruleVal)
    case 'is_empty':
      if (raw === null || raw === undefined || raw === '') return true
      if (Array.isArray(raw)) return raw.length === 0
      return false
    case 'is_not_empty':
      if (raw === null || raw === undefined || raw === '') return false
      if (Array.isArray(raw)) return raw.length > 0
      return true
    case 'gt':
      return isNaN(Number(raw)) ? String(raw) > String(ruleVal) : Number(raw) > Number(ruleVal)
    case 'lt':
      return isNaN(Number(raw)) ? String(raw) < String(ruleVal) : Number(raw) < Number(ruleVal)
    case 'gte':
      return isNaN(Number(raw)) ? String(raw) >= String(ruleVal) : Number(raw) >= Number(ruleVal)
    case 'lte':
      return isNaN(Number(raw)) ? String(raw) <= String(ruleVal) : Number(raw) <= Number(ruleVal)
    default:
      return false
  }
}

/**
 * 计算应隐藏的组件 ID 集合
 * @param compList 表单组件列表
 * @param formValues 当前表单值 { [compId]: value }
 */
export const getHiddenIds = (
  compList: Record<string, any>[],
  formValues: Record<string, any>,
): Set<string> => {
  const hidden = new Set<string>()

  for (const comp of compList) {
    if (!comp.logicRules?.length) continue

    const rules = comp.logicRules as LogicRule[]
    const validRules = rules.filter(r => r.sourceId && r.operator)
    if (!validRules.length) continue

    const matchMode: 'and' | 'or' = comp.matchMode || 'and'

    // 按 action 分组求值
    const showRules = validRules.filter(r => r.action === 'show')
    const hideRules = validRules.filter(r => r.action === 'hide')

    let shouldHide = false

    if (matchMode === 'and') {
      // 所有 hide 规则都满足 → 隐藏；所有 show 规则都满足 → 显示，否则隐藏（show 优先）
      const hideMatched = hideRules.length > 0 && hideRules.every(r => evalRule(r, formValues))
      const showMatched = showRules.length > 0 && showRules.every(r => evalRule(r, formValues))
      if (showRules.length > 0 && hideRules.length > 0) {
        // 混合模式：show 优先，show 满足则显示；否则看 hide
        shouldHide = !showMatched && hideMatched
      } else if (showRules.length > 0) {
        // 只有 show 规则：满足则显示，不满足则隐藏
        shouldHide = !showMatched
      } else if (hideMatched) {
        shouldHide = true
      }
    } else {
      // or: 任一 hide 规则满足 → 隐藏；任一 show 规则满足 → 显示，否则隐藏
      const hideMatched = hideRules.some(r => evalRule(r, formValues))
      const showMatched = showRules.some(r => evalRule(r, formValues))
      if (showRules.length > 0 && hideRules.length > 0) {
        // 混合模式：show 优先，任一 show 满足则显示；否则看 hide
        shouldHide = !showMatched && hideMatched
      } else if (showRules.length > 0) {
        // 只有 show 规则：任一满足则显示，否则隐藏
        shouldHide = !showMatched
      } else if (hideMatched) {
        shouldHide = true
      }
    }

    if (shouldHide) hidden.add(comp.id)
  }

  return hidden
}
