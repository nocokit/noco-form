<template>
  <div class="comp-item">
    <div class="comp-item-title" v-if="!!displaySection">
      <a-typography-title :level="5" class="title-value">
        <span class="number" v-bind:class="{ 'title-value-isRequired': component.isRequired, number: true }"
          v-if="formConfig?.displayNumberSort">
          {{ component?.lineNumber }}.
        </span>
        <span class="title-value">
          <a-textarea class="input-comp" v-if="isDev && component?.id === selectedComp?.id"
            :auto-size="{ minRows: 1, maxRows: 5 }" maxlength="50" v-model:value="component.title"
            :placeholder="'请输入标题'" @change="changeValue($event, 'title')" allow-clear>
          </a-textarea>

          <a-typography-text v-else type="secondary">
            <div class="description input-comp">
              {{ component.title }}
            </div>
          </a-typography-text>
        </span>
      </a-typography-title>
    </div>
    <div class="comp-item-description" v-if="displaySection && formConfig?.displayDescription">
      <div type="secondary" v-if="component?.id !== selectedComp?.id && isDev || renderType">
        <div class="description">
          {{ component.description }}
        </div>
      </div>
      <a-textarea v-else :auto-size="{ minRows: 1, maxRows: 5 }" v-model:value="component.description"
        :placeholder="'请输入描述'" @change="changeValue($event, 'description')" allow-clear>

      </a-textarea>
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

          <span class="add-item">
            <a-typography-text type="warning" @click="addItem('new')">
              <PlusCircleTwoTone class="icon" :style="{ fontSize: '16px', color: '#646a73' }" />
              <span class="add-label">添加单项 </span>
            </a-typography-text>
          </span>

          <!-- <span class="add-item">
            <a-typography-text type="warning">模版</a-typography-text>
            <span class="line"></span>
          </span> -->
          <span class="add-item">
            <a-typography-text type="warning" :class="{ disabled: checkAddOtherClass() }"
              @click="!checkAddOtherClass() && addItem('other')">
              <PlusCircleTwoTone class="icon" :style="{ fontSize: '16px', color: '#646a73' }" />
              <span class="add-label">添加其他 </span>
            </a-typography-text>
          </span>
          <span class="add-item">
            <a-typography-text type="warning"
              @click="batchChangeData">
              <ControlTwoTone class="icon" :style="{ fontSize: '16px', color: '#646a73' }" />
              <span class="add-label">批量操作 </span>
            </a-typography-text>
          </span>
        </div>
        <!-- <a-checkbox class="setting-item" v-model:checked="component.isRequired"
          @click="component.isRequired = !component.isRequired">必填</a-checkbox> -->
        <span class="setting-item">
          <a-switch class="switch" v-model:checked="component.isRequired" @change="handleChangeRequired"> </a-switch>
          <label for=""> 必填</label>
        </span>

      </div>
    </div>
    <div class="floating-action-toolbar" v-if="compConfig.id === selectedComp?.id">
      <a-tooltip placement="top">
        <template #title>拖拽</template>
        <div class="toolbar-btn handle">
          <i class="ri-drag-move-fill"></i>
        </div>
      </a-tooltip>
      <a-tooltip placement="top">
        <template #title>复制</template>
        <div class="toolbar-btn" @click="compControl($event, 'copy')">
          <i class="ri-file-copy-line"></i>
        </div>
      </a-tooltip>
      <a-tooltip placement="top">
        <template #title>删除</template>
        <div class="toolbar-btn toolbar-btn-danger" @click="compControl($event, 'delete')">
          <i class="ri-delete-bin-line"></i>
        </div>
      </a-tooltip>
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
// 显示组件
import ImageComponent from '@/components-form/show/Image.vue'
import VideoComponent from '@/components-form/show/Video.vue'
import FormTitleComponent from '@/components-form/show/FormTitle.vue'

// 基础组件
import RadioComponent from '@/components-form/base/Radio.vue'
import SelectComponent from '@/components-form/base/Select.vue'
import CheckoutComponent from '@/components-form/base/Checkout.vue'
import InputComponent from '@/components-form/base/Input.vue'
import TextareaComponent from '@/components-form/base/Textarea.vue'
import UrlComponent from '@/components-form/base/Url.vue'
import DateComponent from '@/components-form/base/Date.vue'
import DateRangeComponent from '@/components-form/base/DateRange.vue'
import TimeComponent from '@/components-form/base/Time.vue'
import DividerComponent from '@/components-form/base/Divider.vue'
import PagingComponent from '@/components-form/base/Paging.vue'
import RateComponent from '@/components-form/base/Rate.vue'
import SelectRateComponent from '@/components-form/base/SelectRate.vue'
import NPSComponent from '@/components-form/base/NPS.vue'
import UploadComponent from '@/components-form/base/Upload.vue'
import SwitchComponent from '@/components-form/base/Switch.vue'
import NumberComponent from '@/components-form/base/Number.vue'
import TimeRangeComponent from '@/components-form/base/TimeRange.vue'

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

const displaySection = computed(() => !['Divider', 'Paging', 'FormTitle'].includes(props.type))

function getTypeToComponent(type: string) {
  const compsObject: any = {
    // 显示组件
    Img: ImageComponent,
    Video: VideoComponent,
    FormTitle: FormTitleComponent,
    
    // 基础组件
    Radio: RadioComponent,
    Input: InputComponent,
    Textarea: TextareaComponent,
    Checkout: CheckoutComponent,
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

    // 评分和满意度
    Rate: RateComponent,
    NPS: NPSComponent,
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
    SelectRate: SelectRateComponent,
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

</script>
<style lang="scss" scoped>
@import './form-common.css';

::v-deep {
  textarea.input-comp,
  .description.input-comp {
    background: transparent;
    border: none !important;
    padding: 6px 12px !important;
    margin-left: -10px !important;
    color: var(--text-secondary) !important;
    font-size: var(--text-base) !important;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  textarea.input-comp,
  span.input-comp {
    background: rgba(99, 102, 241, 0.05);
    border-radius: var(--radius-sm);
  }
}


.description {
  width: 100%;
  padding: 6px 12px;
  outline: none;
  margin-left: -10px;
  border-radius: var(--radius-md);
  overflow-wrap: break-word;
  white-space: normal;
  font-weight: var(--font-normal);
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
}

.data-list-setting {
  display: inline-block;
  left: 0;
}

.add-item {
  position: relative;
  cursor: pointer;
  margin-right: 20px;

  .icon {
    margin-right: 5px;
    font-size: 18px;
    position: absolute;
    left: 0;
    top: 4px;
  }

  .add-label {
    margin-left: 24px;
  }
}

.disabled {
  color: #ddd !important;
}

::v-deep(.ant-typography.ant-typography-warning) {
  color: var(--text-secondary);
  padding: 2px 0px;
  font-size: var(--text-sm);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--primary);
  }
}

.line {
  border-left: 1px solid #e0e0e0;
  height: 10px;
  margin: 0 12px;
}

/* Disabled states are now handled in form-common.css */

::v-deep(.ant-divider-horizontal.ant-divider-with-text::before) {
  transform: translateY(100%) !important;
}

::v-deep(.ant-divider-horizontal.ant-divider-with-text::after) {
  transform: translateY(100%) !important;
}

.control {

  &:active,
  &:hover {
    background: #ebebeb;
  }
}

.form-item {
  .comp-item {
    padding: 16px 60px 24px;
  }
}

.form-item-active {
  .comp-item {
    padding: 32px 60px 40px;
  }

}

.comp-item {
  position: relative;

  .title-value {
    position: relative;
    color: var(--text-primary);
    font-weight: var(--font-medium);

    .description {
      &:empty:before {
        content: '请输入标题';
        color: var(--text-tertiary);
        font-weight: var(--font-normal);
      }
    }
  }

  .number {
    position: absolute;
    left: -40px;
    top: 6px;
    color: var(--text-secondary);
    font-size: var(--text-sm);
  }

  .title-value-isRequired::before {
    color: var(--error);
    font-size: 12px;
    position: absolute;
    top: 8px;
    left: -9px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    display: inline-block;
    margin-inline-end: 4px;
    content: "*";
  }

  .comp-item-title {
    min-height: 36px;
    line-height: 36px;
  }

  .comp-item-description {
    padding-bottom: var(--spacing-3);
    color: var(--text-secondary);
    font-size: var(--text-sm);
    line-height: 1.6;
  }
}

.active-drag {
  position: absolute;
  left: 3px;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  width: 46px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  padding: 10px 6px;
  height: 100%;
  border-radius: 6px;
  cursor: move;

  img {
    width: 20px;
    position: absolute;
    top: 50%;
    z-index: 1000000;
    transform: translateY(-50%);
  }
}

.active-comp-setting-side-bar {
  position: absolute;
  right: -33px;
  width: 32px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--bg-panel);
  border: 1px solid var(--border-medium);
  font-size: 14px;
  padding: 5px 3px;
  border-bottom-right-radius: var(--radius-md);
  border-top-right-radius: var(--radius-md);
  box-shadow: var(--shadow-md);

  .control {
    padding: 10px 5px;
    color: var(--text-secondary);
    transition: all var(--transition-fast);
    border-radius: var(--radius-sm);

    &:hover {
      color: var(--text-primary);
      background: var(--bg-hover);
    }
  }
}

.active-comp-setting {
  width: 100%;
  position: relative;
  height: 64px;
  line-height: 64px;
  padding-top: var(--spacing-4);
  margin-top: var(--spacing-3);
  border-top: 1px solid var(--border-subtle);

  .bottom-setting {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 120px;
  }
}

.item-comp {
  width: 100%;
}

.setting-item {
  position: absolute;
  right: 0px;
  top: 16px;
  font-size: var(--text-sm);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  label {
    color: var(--text-primary);
    font-weight: var(--font-medium);
  }

  .switch {
    position: relative;
    margin-top: -2px;
  }
}

::v-deep(:where(.comp-item-description .css-dev-only-do-not-override-17yhhjv).ant-input-affix-wrapper-textarea-with-clear-btn) {
  background: transparent !important;
  left: -10px;

  .anticon-close-circle {
    display: none;

    &:hover,
    &:active,
    &:focus {
      display: block;
    }
  }



  :where(.comp-item-description .css-dev-only-do-not-override-17yhhjv).ant-input {
    background: transparent !important;
    border-style: none;
    color: rgba(0, 0, 0, 0.45);

    &:active,
    &:hover,
    &:focus {
      // border-style: solid;
      // border-color: #e0e0e0;
      outline: none;
      box-shadow: none;


    }
  }
}
</style>