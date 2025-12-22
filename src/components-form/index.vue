<template>
  <div class="comp-item" :class="{ selected: compConfig.id === selectedComp?.id }">
    <div class="comp-item-title" v-if="!!displaySection">
      <div class="flex items-center gap-2">
        <span v-if="formConfig?.displayNumberSort" class="text-zinc-600 font-mono text-xs">
          {{ component?.lineNumber }}.
        </span>
        <h3 v-if="isDev && component?.id === selectedComp?.id" class="flex-1">
          <input
            type="text"
            class="w-full bg-transparent border-none outline-none text-zinc-200 font-semibold tracking-wide placeholder:text-zinc-600"
            maxlength="50"
            v-model="component.title"
            placeholder="请输入标题"
            @change="changeValue($event, 'title')"
          />
        </h3>
        <h3 v-else class="flex-1 text-zinc-200 font-semibold tracking-wide">
          {{ component.title }}
        </h3>
        <span v-if="component.isRequired" class="required-star text-lg leading-none" style="color: rgb(244, 63, 94)">*</span>
      </div>
    </div>
    <div class="comp-item-description" v-if="displaySection && (component.description || component?.id === selectedComp?.id)">
      <!-- 未选中状态：显示描述文本 -->
      <div class="text-xs text-zinc-500 leading-relaxed" v-if="component?.id !== selectedComp?.id && component.description">
        {{ component.description }}
      </div>
      <!-- 选中状态：显示可编辑的 textarea -->
      <textarea
        v-if="component?.id === selectedComp?.id"
        class="w-full mt-2 mb-2 px-4 py-2.5 text-xs text-zinc-300 rounded-xl border outline-none transition-all resize-y min-h-[80px] leading-relaxed bg-[#18181b] border-[#27272a] placeholder:text-[#52525b] hover:border-[#3f3f46] hover:bg-[#09090b] focus:border-indigo-500/50 focus:bg-[#09090b]"
        v-model="component.description"
        placeholder="请输入描述"
        @change="changeValue($event, 'description')"
        rows="1"
        @input="autoResize($event)">
      </textarea>
    </div>
    <div class="component">
      <component
        :key="currentComp"
        :isSelected="component?.id === selectedComp?.id"
        :isPreviewRender="renderType === 'preview'"
        :isDev="isDev"
        :previewType="previewType"
        :is="getCompConfig(props.type).comp" v-bind="component"></component>
    </div>
    <div class="active-comp-setting" v-if="compConfig.id === selectedComp?.id && !isIgnoreEditor()">
      <div class="bottom-setting">
        <div class="data-list-setting" v-if="HasSettingTypeList.includes(compConfig.type)">
          <div class="flex gap-4">
            <button class="text-xs font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors" @click="addItem('new')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              增加选项
            </button>
            <button
              class="text-xs font-semibold flex items-center gap-1 transition-colors"
              :class="checkAddOtherClass() ? 'text-zinc-600 cursor-not-allowed' : 'text-blue-500 hover:text-blue-400 cursor-pointer'"
              @click="!checkAddOtherClass() && addItem('other')"
              :disabled="checkAddOtherClass()"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              增加"其他"
            </button>
          </div>
          <button class="text-[10px] font-bold text-zinc-600 hover:text-zinc-400 uppercase tracking-tighter transition-colors" @click="batchChangeData">
            批量编辑选项
          </button>
        </div>
      </div>
    </div>
    <div class="floating-action-toolbar" v-if="compConfig.id === selectedComp?.id">
      <div class="flex items-center gap-2 pr-2 border-r border-zinc-700" v-if="displaySection">
        <span class="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">必填</span>
        <TwSwitch v-model="component.isRequired" @change="handleChangeRequired" />
      </div>
      <div class="flex gap-3">
        <div class="toolbar-btn handle" title="拖拽移动">
          <i class="ri-drag-move-fill"></i>
        </div>
        <div class="toolbar-btn" @click="compControl($event, 'copy')" title="复制">
          <i class="ri-file-copy-line"></i>
        </div>
        <div class="toolbar-divider"></div>
        <div class="toolbar-btn toolbar-btn-danger" @click="compControl($event, 'delete')" title="删除">
          <i class="ri-delete-bin-line"></i>
        </div>
      </div>
    </div>
    <BatchOperationData 
    v-if="openBatchOperationDataBool"
    :open="openBatchOperationDataBool"
    :dataList="component.dataList"
    @handleBatchOperation="handleBatchOperation"
     />
  </div>


</template>

<script lang="ts" setup>
import { ref, computed, watch, defineEmits } from 'vue'
import { TwSwitch } from '@/components/ui'
// 显示组件
import ImageComponent from '@/components-form/show/Image.vue'
import VideoComponent from '@/components-form/show/Video.vue'
import FormTitleComponent from '@/components-form/show/FormTitle.vue'

// 基础组件
import SelectComponent from '@/components-form/base/Select.vue'
import CheckboxGroupComponent from '@/components-form/base/CheckboxGroup.vue'
import RadioGroupComponent from '@/components-form/base/RadioGroup.vue'
import InputComponent from '@/components-form/base/Input.vue'
import TextareaComponent from '@/components-form/base/Textarea.vue'
import UrlComponent from '@/components-form/base/Url.vue'
import DateComponent from '@/components-form/base/Date.vue'
import DateRangeComponent from '@/components-form/base/DateRange.vue'
import TimeComponent from '@/components-form/base/Time.vue'
import DividerComponent from '@/components-form/base/Divider.vue'
import PagingComponent from '@/components-form/base/Paging.vue'
import RateComponent from '@/components-form/base/Rate.vue'
import UploadComponent from '@/components-form/base/Upload.vue'
import SwitchComponent from '@/components-form/base/Switch.vue'
import NumberComponent from '@/components-form/base/Number.vue'
import TimeRangeComponent from '@/components-form/base/TimeRange.vue'
import CascaderComponent from '@/components-form/base/Cascader.vue'
import CountrySelectorComponent from '@/components-form/base/CountrySelector.vue'
import CaptchaComponent from '@/components-form/base/Captcha.vue'
import PaymentComponent from '@/components-form/base/Payment.vue'

// 联系方式
import NameComponent from '@/components-form/contact-information/Name.vue'
import GenderComponent from '@/components-form/contact-information/Gender.vue'
import PhoneComponent from '@/components-form/contact-information/Phone.vue'
import TelePhoneComponent from '@/components-form/contact-information/TelePhone.vue'
import IdCardComponent from '@/components-form/contact-information/IdCard.vue'
import EmailComponent from '@/components-form/contact-information/Email.vue'
import WXComponent from '@/components-form/contact-information/WX.vue'
import AddressComponent from '@/components-form/contact-information/Address.vue'

// 组件
import BatchOperationData from '@/components/form/BatchOperationData.vue'

// 高级
import SignComponent from '@/components-form/advanced/Sign.vue'

import * as _ from 'lodash'
import { useSelectCompStore } from '@/stores/selectCompStore'
import { v4 as uuidv4 } from 'uuid';
import { HasSettingTypeList } from '@/views/FormEditor/comp-config-data'
import { JustShowCompType } from '@/views/FormEditor/comp-data'


interface Props {
  component: any,
  type: string,
  lineNumber?: string
  formConfig?: any
  selectedComp?: any
  isDev: boolean
  renderType?: 'preview'
  previewType?: 'Phone' | 'PC'
}



const compStore = useSelectCompStore()
const props = defineProps<Props>()

// 批量操作
const openBatchOperationDataBool = ref(false)

const compConfig = props.component // 组件配置
const currentComp = getCompConfig(props.type)//组件
const emit = defineEmits(['compControl', 'addItem'])

function getCompConfig(type: any) {
  const compType = { comp: getTypeToComponent(type) }
  const comp = { ...compConfig, ...compType }
  return comp
}

const changeValue = (event: any, params: string) => {
  const {
    innerText,
    value
  } = event?.target
  const isChangeParams = ['description', 'title'].includes(params)
  if (isChangeParams) {
    updateParams(params, value)
    compConfig[params] = value
  } else {
    const hasDataBool = innerText !== null && innerText !== '\n'
    const value = hasDataBool ? innerText : ''
    compConfig[params] = value
  }
}

const updateParams = (params: string, value: any) => {
  compStore.updateCurrentComp({
    [params]: value
  })
  compStore.updateCurrentCompKey(uuidv4())
}

const handleChangeRequired = (value: boolean) => {
  props.component.isRequired = value
  compStore.updateCurrentCompKey(uuidv4())
}

// 批量操作
const handleBatchOperation = (isOk: boolean, dataList: any[]) => {
  openBatchOperationDataBool.value = false
  if(isOk) {
    updateParams('dataList', dataList)
  }
}

const displaySection = computed(() => !['Divider', 'Paging', 'FormTitle', 'Image', 'Video'].includes(props.type))

function getTypeToComponent(type: string) {
  const compsObject: any = {
    // 显示组件
    Image: ImageComponent,
    Video: VideoComponent,
    FormTitle: FormTitleComponent,

    // 基础组件
    Input: InputComponent,
    Textarea: TextareaComponent,
    CheckboxGroup: CheckboxGroupComponent,
    RadioGroup: RadioGroupComponent,
    // 向后兼容旧的 Checkout 命名
    Checkout: CheckboxGroupComponent,
    Date: DateComponent,
    DateRange: DateRangeComponent,
    Time: TimeComponent,
    TimeRange: TimeRangeComponent,
    Url: UrlComponent,
    Number: NumberComponent,
    Switch: SwitchComponent,
    Upload: UploadComponent,
    Divider: DividerComponent,
    Paging: PagingComponent,
    Select: SelectComponent,
    Cascader: CascaderComponent,
    CountrySelector: CountrySelectorComponent,
    Captcha: CaptchaComponent,
    Payment: PaymentComponent,

    // 评分和满意度
    Rate: RateComponent,
    ElectronicSignature: SignComponent,

    // 联系信息
    Name: NameComponent,
    Gender: GenderComponent,
    WX: WXComponent,
    Email: EmailComponent,
    IDCard: IdCardComponent,
    Phone: PhoneComponent,
    TelePhone: TelePhoneComponent,
    Address: AddressComponent,
  }
  const comp = compsObject[type]
  return comp
}

const compControl = (event: any, type: string) => {
  event.stopPropagation()
  emit('compControl', type, props.component)
}

const isIgnoreEditor = () => {
  return JustShowCompType.includes(props.type)
}

const addItem = (type: string) => {
  emit('addItem', type)
}

const batchChangeData = () => {
  openBatchOperationDataBool.value =  true
}

const checkAddOtherClass = () => {
  return _.filter(props.component.dataList, { subType: 'other' }).length > 0
}

const autoResize = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}

</script>

<style scoped lang="scss">
@use './form-common.scss';
</style>
