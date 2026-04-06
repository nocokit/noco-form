<template>
  <SettingSelect :comp="comp" field="formValidationFormat" label="格式校验" :options="FORMAT_OPTIONS" />

  <div v-if="comp.formValidationFormat === 'regular'">
    <SettingInput
      :comp="comp"
      field="formValidationFormatRegex"
      label="正则表达式"
      placeholder="请输入正则，如：^\d{6}$"
      :maxlength="100"
    />
  </div>

  <div v-if="comp.formValidationFormat">
    <SettingSwitch :comp="comp" field="isCustomErrorMessage" label="自定义错误提示" />
    <div v-if="comp.isCustomErrorMessage" class="setting-item h-42">
      <a-textarea
        v-model:value="comp.customErrorMessage"
        placeholder="请输入自定义错误提示文字"
        allow-clear
        :maxlength="60"
        :auto-size="{ minRows: 2, maxRows: 3 }"
        @change="onCustomMessageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SettingSelect from '../base/SettingSelect.vue'
import SettingInput from '../base/SettingInput.vue'
import SettingSwitch from '../base/SettingSwitch.vue'
import { useSettingField } from '@/composables/useSettingField'

interface Props {
  comp: Record<string, any>
}
const props = defineProps<Props>()
const comp = props.comp

const { updateFieldFromEvent } = useSettingField()

const FORMAT_OPTIONS = [
  { label: '手机号',     value: 'phone' },
  { label: '数字',       value: 'number' },
  { label: '网站',       value: 'website' },
  { label: '身份证',     value: 'idCard' },
  { label: '邮件',       value: 'email' },
  { label: '自定义正则', value: 'regular' },
]

const onCustomMessageChange = (e: Event) => {
  updateFieldFromEvent('customErrorMessage', e)
}
</script>
