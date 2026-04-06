<template>
  <div class="logic-panel">
    <div v-if="!compList.length" class="empty">
      <img src="@/assets/form/no_data.svg" alt="">
      <div class="empty-text">请先在题库中添加题目</div>
    </div>

    <template v-else>
      <div v-for="comp in compList" :key="comp.id" class="logic-item">
        <div class="logic-item-title">
          <div>
            <span class="line-number">{{ comp.lineNumber }}.</span>
            <span class="title">{{ comp.title || comp.name }}</span>
          </div>
          <div v-if="(comp.logicRules || []).length > 1" class="match-mode-toggle">
            <span class="match-label">条件关系：</span>
            <a-radio-group
              :value="comp.matchMode || 'and'"
              size="small"
              button-style="solid"
              @change="onMatchModeChange(comp, $event.target.value)"
            >
              <a-radio-button value="and">且（全部满足）</a-radio-button>
              <a-radio-button value="or">或（任一满足）</a-radio-button>
            </a-radio-group>
          </div>
        </div>

        <div class="rules">
          <template v-for="(rule, ruleIndex) in comp.logicRules || []" :key="ruleIndex">
            <!-- 条件之间的分隔符（从第二条开始显示） -->
            <div v-if="ruleIndex > 0" class="rule-connector">
              <span :class="['connector-tag', comp.matchMode === 'or' ? 'or' : 'and']">
                {{ comp.matchMode === 'or' ? '或' : '且' }}
              </span>
            </div>

            <div class="rule-row">
              <div class="rule-top">
                <span class="rule-label">当</span>
                <a-select
                  v-model:value="rule.sourceId"
                  placeholder="选择题目"
                  class="rule-source"
                  size="small"
                  @change="onSourceChange(comp, rule)"
                >
                  <a-select-option
                    v-for="source in getSourceOptions(comp.id)"
                    :key="source.id"
                    :value="source.id"
                  >
                    {{ source.lineNumber }}. {{ source.title || source.name }}
                  </a-select-option>
                </a-select>

                <a-select
                  v-model:value="rule.operator"
                  class="rule-operator"
                  size="small"
                  :disabled="!rule.sourceId"
                  @change="onOperatorChange(rule)"
                >
                  <a-select-option
                    v-for="op in getOperatorOptions(rule.sourceId)"
                    :key="op.value"
                    :value="op.value"
                  >
                    {{ op.label }}
                  </a-select-option>
                </a-select>
              </div>

              <div class="rule-bottom" v-if="showValueInput(rule)">
                <!-- 枚举下拉 (Radio/Select/Gender/Switch) -->
                <a-select
                  v-if="getValueInputType(rule) === 'enum'"
                  v-model:value="rule.value"
                  placeholder="选择值"
                  class="rule-value-full"
                  size="small"
                  @change="save"
                >
                  <a-select-option
                    v-for="opt in getValueOptions(rule.sourceId)"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </a-select-option>
                </a-select>

                <!-- 数字输入 -->
                <a-input-number
                  v-else-if="getValueInputType(rule) === 'number'"
                  v-model:value="rule.value"
                  class="rule-value-full"
                  size="small"
                  placeholder="输入数值"
                  @change="save"
                />

                <!-- 日期选择 -->
                <a-date-picker
                  v-else-if="getValueInputType(rule) === 'date'"
                  v-model:value="rule.value"
                  class="rule-value-full"
                  size="small"
                  valueFormat="YYYY-MM-DD"
                  placeholder="选择日期"
                  @change="save"
                />

                <!-- 时间选择 -->
                <a-time-picker
                  v-else-if="getValueInputType(rule) === 'time'"
                  v-model:value="rule.value"
                  class="rule-value-full"
                  size="small"
                  valueFormat="HH:mm:ss"
                  placeholder="选择时间"
                  @change="save"
                />

                <!-- 文本输入 -->
                <a-input
                  v-else-if="getValueInputType(rule) === 'text'"
                  v-model:value="rule.value"
                  class="rule-value-full"
                  size="small"
                  placeholder="输入文本"
                  @change="save"
                />
              </div>

              <div class="rule-action-row">
                <span class="rule-label">时</span>
                <a-select
                  v-model:value="rule.action"
                  class="rule-action"
                  size="small"
                  @change="save"
                >
                  <a-select-option value="show">显示</a-select-option>
                  <a-select-option value="hide">隐藏</a-select-option>
                </a-select>
                <span class="rule-label">本题</span>
                <DeleteOutlined class="del-icon" @click="removeRule(comp, ruleIndex)" />
              </div>
            </div>
          </template>

          <a-button type="dashed" size="small" class="add-rule-btn" @click="addRule(comp)">
            <PlusOutlined /> 添加条件
          </a-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
// Types that cannot appear as logic targets
const SKIP_TYPES = ['Divider', 'Paging', 'FormTitle', 'Button']
// Types that cannot be used as source (no value to read)
const NO_SOURCE_TYPES = ['Divider', 'Paging', 'FormTitle', 'Button', 'Upload', 'ElectronicSignature', 'DateRange', 'TimeRange']

// Source type categories
const ENUM_TYPES = ['Radio', 'Select']        // single-select from dataList
const MULTI_TYPES = ['Checkout']              // multi-select from dataList
const SWITCH_TYPES = ['Switch']               // boolean
const GENDER_TYPES = ['Gender']               // fixed 男/女
const NUMBER_TYPES = ['Number', 'Rate', 'SelectRate', 'NPS']
const DATE_TYPES = ['Date', 'DateRange']
const TIME_TYPES = ['Time', 'TimeRange']
// everything else is TEXT: Input, Textarea, Name, WX, Email, Phone, TelePhone, IDCard, Address, Url

const BOOL_OPTIONS = [
  { label: '是', value: 'true' },
  { label: '否', value: 'false' },
]
const GENDER_OPTIONS = [
  { label: '男', value: '男' },
  { label: '女', value: '女' },
]

const OPERATOR_MAP: Record<string, { label: string; value: string }[]> = {
  enum: [
    { label: '等于', value: 'equals' },
    { label: '不等于', value: 'not_equals' },
  ],
  multi: [
    { label: '包含', value: 'contains' },
    { label: '不包含', value: 'not_contains' },
  ],
  switch: [
    { label: '等于', value: 'equals' },
  ],
  gender: [
    { label: '等于', value: 'equals' },
    { label: '不等于', value: 'not_equals' },
  ],
  number: [
    { label: '等于', value: 'equals' },
    { label: '不等于', value: 'not_equals' },
    { label: '大于', value: 'gt' },
    { label: '小于', value: 'lt' },
    { label: '大于等于', value: 'gte' },
    { label: '小于等于', value: 'lte' },
  ],
  date: [
    { label: '等于', value: 'equals' },
    { label: '大于', value: 'gt' },
    { label: '小于', value: 'lt' },
    { label: '大于等于', value: 'gte' },
    { label: '小于等于', value: 'lte' },
  ],
  time: [
    { label: '等于', value: 'equals' },
    { label: '大于', value: 'gt' },
    { label: '小于', value: 'lt' },
    { label: '大于等于', value: 'gte' },
    { label: '小于等于', value: 'lte' },
  ],
  text: [
    { label: '包含', value: 'contains' },
    { label: '不包含', value: 'not_contains' },
    { label: '等于', value: 'equals' },
    { label: '不等于', value: 'not_equals' },
    { label: '为空', value: 'is_empty' },
    { label: '不为空', value: 'is_not_empty' },
  ],
}

interface Props {
  pageCompList: any[]
}
const props = defineProps<Props>()

const compList = computed(() =>
  props.pageCompList.filter(c => !SKIP_TYPES.includes(c.type))
)

const getSourceOptions = (selfId: string) =>
  props.pageCompList.filter(c => c.id !== selfId && !NO_SOURCE_TYPES.includes(c.type))

const getSourceCategory = (sourceId: string): string => {
  const source = props.pageCompList.find(c => c.id === sourceId)
  if (!source) return 'text'
  const t = source.type
  if (ENUM_TYPES.includes(t)) return 'enum'
  if (MULTI_TYPES.includes(t)) return 'multi'
  if (SWITCH_TYPES.includes(t)) return 'switch'
  if (GENDER_TYPES.includes(t)) return 'gender'
  if (NUMBER_TYPES.includes(t)) return 'number'
  if (DATE_TYPES.includes(t)) return 'date'
  if (TIME_TYPES.includes(t)) return 'time'
  return 'text'
}

const getOperatorOptions = (sourceId: string) => {
  const cat = getSourceCategory(sourceId)
  return OPERATOR_MAP[cat] || OPERATOR_MAP.text
}

const getValueInputType = (rule: any): 'enum' | 'number' | 'date' | 'time' | 'text' | 'none' => {
  if (!rule.sourceId || !rule.operator) return 'none'
  if (['is_empty', 'is_not_empty'].includes(rule.operator)) return 'none'
  const cat = getSourceCategory(rule.sourceId)
  if (cat === 'enum' || cat === 'multi' || cat === 'switch' || cat === 'gender') return 'enum'
  if (cat === 'number') return 'number'
  if (cat === 'date') return 'date'
  if (cat === 'time') return 'time'
  return 'text'
}

const showValueInput = (rule: any): boolean => {
  return getValueInputType(rule) !== 'none'
}

const getValueOptions = (sourceId: string) => {
  const source = props.pageCompList.find(c => c.id === sourceId)
  if (!source) return []
  const cat = getSourceCategory(sourceId)
  if (cat === 'enum' || cat === 'multi') {
    return (source.dataList || []).map((d: any) => ({ label: d.label, value: d.value }))
  }
  if (cat === 'switch') return BOOL_OPTIONS
  if (cat === 'gender') return GENDER_OPTIONS
  return []
}

const addRule = (comp: any) => {
  if (!comp.logicRules) comp.logicRules = []
  if (!comp.matchMode) comp.matchMode = 'and'
  comp.logicRules.push({ sourceId: '', operator: 'equals', value: '', action: 'show' })
  save()
}

const removeRule = (comp: any, index: number) => {
  comp.logicRules.splice(index, 1)
  save()
}

const onMatchModeChange = (comp: any, mode: 'and' | 'or') => {
  comp.matchMode = mode
  save()
}

const onSourceChange = (comp: any, rule: any) => {
  const cat = getSourceCategory(rule.sourceId)
  const ops = OPERATOR_MAP[cat] || OPERATOR_MAP.text
  rule.operator = ops[0]?.value || 'equals'
  rule.value = ''
  save()
}

const onOperatorChange = (rule: any) => {
  if (['is_empty', 'is_not_empty'].includes(rule.operator)) {
    rule.value = ''
  }
  save()
}

const save = () => {
  // logicRules 直接 mutate props.pageCompList 中的对象引用，
  // useFormPersistence 的 deep watch 会自动触发持久化，无需额外操作
}
</script>

<style scoped lang="scss">
.logic-panel {
  padding: 0 0 20px;
  overflow-y: auto;
  height: 100%;
}

.empty {
  text-align: center;
  padding-top: 60px;
  color: #999;
  font-size: 14px;

  img { width: 120px; margin-bottom: 12px; }
}

.logic-item {
  border: 1px solid #e8eaed;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
  background: #fff;
}

.logic-item-title {
  font-size: 13px;
  color: rgba(0,0,0,.65);
  margin-bottom: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;

  .line-number {
    color: #1677ff;
    margin-right: 4px;
  }
}

.match-mode-toggle {
  display: flex;
  align-items: center;
  gap: 6px;

  .match-label {
    font-size: 12px;
    color: #888;
    font-weight: 400;
    white-space: nowrap;
  }
}

.rules {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rule-connector {
  display: flex;
  align-items: center;
  gap: 8px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e8eaed;
  }

  .connector-tag {
    font-size: 12px;
    font-weight: 600;
    padding: 1px 10px;
    border-radius: 10px;
    white-space: nowrap;

    &.and {
      color: #1677ff;
      background: #e6f4ff;
      border: 1px solid #91caff;
    }

    &.or {
      color: #d46b08;
      background: #fff7e6;
      border: 1px solid #ffd591;
    }
  }
}

.rule-row {
  background: #f7f8fa;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rule-top,
.rule-action-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rule-bottom {
  display: flex;
}

.rule-label {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  flex-shrink: 0;
}

.rule-source {
  width: 120px;
  flex-shrink: 0;
}

.rule-operator {
  flex: 1;
  min-width: 80px;
}

.rule-value-full {
  width: 100%;
}

.rule-action {
  width: 72px;
  flex-shrink: 0;
}

.del-icon {
  color: #ff4d4f;
  cursor: pointer;
  font-size: 14px;
  margin-left: auto;

  &:hover { opacity: 0.75; }
}

.add-rule-btn {
  width: 100%;
  margin-top: 4px;
  font-size: 12px;
}
</style>
