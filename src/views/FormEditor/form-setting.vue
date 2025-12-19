<template>
  <div class="setting" >
    <div class="comp-name">
      <span class="panel-title">Properties</span>
      <span class="comp-id-badge" v-if="selectComp?.id">ID: {{ selectComp?.id?.substring(0, 8) }}</span>
    </div>
    <div class="setting-base">
      <template v-if="currentCompId">  
        <div class="category-name">
        基础设置 
      </div>
      <div class="content m-b-0">
        <FormTitle v-if="selectComp.type === 'FormTitle'" :comp="selectComp" :key="selectComp._selectedId "/>
        <Title v-if="showParams('name') && !showParams('isLayoutComp') && !['FormTitle'].includes(selectComp.type)" :comp="selectComp" :key="selectComp._selectedId "/>
        <ButtonText v-if="showParams('buttonText')" :comp="selectComp" :key="selectComp._selectedId "/>
        <Description v-if="showParams('description') && !['FormTitle'].includes(selectComp.type)"s :comp="selectComp" :key="selectComp._selectedId "/>
        <PageSubTitle v-if="showParams('pageSubTitle')"  :comp="selectComp" :key="selectComp._selectedId "/>
        <PageSubDescription v-if="showParams('pageSubTitle')" :comp="selectComp" :key="selectComp._selectedId "/>
        <Placeholder v-if="showParams('placeholder')" :comp="selectComp" :key="selectComp._selectedId "/>
        <AddressPlaceholder v-if="showParams('address_placeholder')" :comp="selectComp" :key="selectComp._selectedId "/>
        <RangePlaceholder v-if="showParams('placeholderRange')" :comp="selectComp" :key="selectComp._selectedId "/>
        <LayoutType v-if="showParams('layoutType')" :comp="selectComp"/>
        <DividerText v-if="showParams('dividerValue')" :comp="selectComp" ></DividerText>
        <DividerBorderType v-if="showParams('dividerValue')" :comp="selectComp"></DividerBorderType>
        <Position v-if="showParams('position')" :comp="selectComp"/>
        <Size v-if="showParams('size')" :comp="selectComp"/>
        <RateConfig v-if="selectComp?.type=== 'Rate'" :comp="selectComp" />
        <NPSConfig v-if="['NPS', 'SelectRate'].includes(selectComp?.type)" :comp="selectComp" />
        <DataList v-if="showParams('dataList')" :comp="selectComp" />
        <UseOtherDataList v-if="showParams('useOtherDataList')" :comp="selectComp"/>
        <SignCreateImgType v-if="showParams('sign_create_type')" :comp="selectComp"/>
      </div>
      <div class="category-name" v-if="selectComp?.type && !JustShowCompType.includes(selectComp?.type)">
        表单验证 
      </div>
      <div class="content">
        <NumberConfig v-if="showParams('maxValue')" :comp="selectComp"/>
        <Required v-if="showParams('isRequired')" :comp="selectComp"/>
        <ValidationSystem v-if="showRegParams()" :comp="selectComp"/>
        <ValidationCustom v-if="showParams('isCustomErrorMessage')" :comp="selectComp" />
        <CustomText v-if="selectComp?.isCustomErrorMessage" :comp="selectComp"/>
      </div>
      </template>
      <div class="category-name">
        全局表单配置
      </div>
      <div class="content" v-if="selectForm">
        <!-- <DisplayTitle :form="selectForm"/> -->
        <DisplayBtn :form="selectForm"/>
        <DisplaySerialNumber :form="selectForm"/>
        <DisplayDescription :form="selectForm"/>
        <DisplayWaterMark :form="selectForm"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue'

// 基础设置
import Title from '@/components-form-setting/base/Title.vue'
import FormTitle from '@/components-form-setting/show/FormTitle.vue'
import Video from '@/components-form-setting/show/Video.vue'
import Image from '@/components-form-setting/show/Image.vue'
import Position from '@/components-form-setting/base/Position.vue'
import Size from '@/components-form-setting/base/Size.vue'
import ButtonText from '@/components-form-setting/base/ButtonText.vue'
import Description from '@/components-form-setting/base/Description.vue'
import Placeholder from '@/components-form-setting/base/Placeholder.vue'
import AddressPlaceholder from '@/components-form-setting/base/AddressPlaceholder.vue'
import RangePlaceholder from '@/components-form-setting/base/RangePlaceholder.vue'
import PageSubTitle from '@/components-form-setting/base/PageSubTitle.vue'
import PageSubDescription from '@/components-form-setting/base/PageSubDescription.vue'
import DividerText from '@/components-form-setting/base/DividerText.vue'
import LayoutType from '@/components-form-setting/base/LayoutType.vue'
import RateConfig from '@/components-form-setting/base/RateConfig.vue'
import NPSConfig from '@/components-form-setting/base/NPSConfig.vue'
import DividerBorderType from '@/components-form-setting/base/DividerBorderType.vue'
import Required from '@/components-form-setting/form-validation/Required.vue'
import ValidationSystem from '@/components-form-setting/form-validation/ValidationFormat.vue'
import ValidationCustom from '@/components-form-setting/form-validation/ValidationCustom.vue'
import CustomText from '@/components-form-setting/form-validation/CustomText.vue'
import NumberConfig from '@/components-form-setting/form-validation/NumberConfig.vue'
import SignCreateImgType from '@/components-form-setting/data/SignCreateImgType.vue'

// 数据设置
import UseOtherDataList from '@/components-form-setting/data/UseOtherDataList.vue'
import DataList from '@/components-form-setting/data/DataList.vue'

// 全局设置
import DisplayWaterMark from '@/components-form-setting/common-global-configurations/DisplayWaterMark.vue'
import DisplaySerialNumber from '@/components-form-setting/common-global-configurations/DisplaySerialNumber.vue'
import DisplayDescription from '@/components-form-setting/common-global-configurations/DisplayDescription.vue'
import DisplayTitle from '@/components-form-setting/common-global-configurations/DisplayTitle.vue'
import DisplayBtn from '@/components-form-setting/common-global-configurations/DisplayBtn.vue'

import { hasOwnPropertyFunction, verifyRegularityCompList } from '@/views/FormEditor/comp-config-data'
import * as _ from 'lodash'
import { JustShowCompType } from '@/views/FormEditor/comp-data'
import { CompListData } from '@/views/FormEditor/comp-data'
import Icon from './comp-icon'


interface Props {
  selectComp: any
  selectForm: any
  currentCompId: string
}

const props = defineProps<Props>()
const selectComp = reactive(props.selectComp)
const selectForm = reactive(props.selectForm)

const currCompIcon = computed(() => {
  let _list: any[] = []
  CompListData.map(item =>{
    _list = [..._list, ...item.children]})
  const comp = _.filter(_list, {
    type : selectComp?.type
  })?.[0]?.icon

  return comp || selectComp?.type === 'Button' && Icon.Button
})

const showParams = (params: string) => {
  const bool = hasOwnPropertyFunction(selectComp, params)
  return bool
}

const showRegParams = () => {
  const compList = verifyRegularityCompList()
  return compList.includes(selectComp?.type)
}

watch([() => props.selectComp, () => props.selectForm],
([newValue,newFormConfig]) => {
    if(!selectComp) {
      return 
    }
    selectComp.value = newValue
    selectForm.value = newFormConfig
  },
);


</script>

<style lang="scss">
/* Right Config Panel */
.setting {
  background: var(--bg-panel);
  border-left: 1px solid var(--border-base);
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.comp-name {
  padding: 16px;
  border-bottom: 1px solid var(--border-base);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .panel-title {
    font-weight: 600;
    color: var(--text-main);
    font-size: 14px;
  }

  .comp-id-badge {
    font-size: 10px;
    background: #27272a;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 400;
    color: #888;
  }
}

.setting-base {
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;

  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: var(--border-medium) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-medium);
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--border-strong);
  }
}

.category-name {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-dim);
  margin: var(--spacing-6) 0 var(--spacing-3) 0;
  letter-spacing: 1px;
  padding-left: 0;
  height: auto;
  line-height: 1.4;
  display: flex;
  align-items: center;

  &:first-child {
    margin-top: 0;
  }

  &::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 12px;
    background: var(--primary);
    border-radius: var(--radius-sm);
    margin-right: var(--spacing-2);
    flex-shrink: 0;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);

  &.m-b-0 {
    margin-bottom: 0;
  }
}

.border-top {
  margin-top: var(--spacing-5);
  padding-top: var(--spacing-5);
  border-top: 1px solid var(--border-subtle);
}

.block-title {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-2);
}

.setting-item {
  position: relative;

  .ant-select {
    width: 100%;
  }

  /* Ant Design component overrides for dark theme */
  :deep(.ant-input),
  :deep(.ant-input-number),
  :deep(.ant-select-selector) {
    background: #09090b !important;
    border: 1px solid var(--border-base) !important;
    color: var(--text-primary) !important;
    border-radius: 6px !important;
    font-size: 13px !important;
    transition: all 0.2s !important;

    &:hover {
      border-color: var(--border-medium) !important;
      background: rgba(255, 255, 255, 0.05) !important;
    }

    &:focus,
    &.ant-input-focused,
    &.ant-select-focused {
      border-color: var(--primary) !important;
      background: rgba(0, 0, 0, 0.3) !important;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
    }
  }

  :deep(.ant-input::placeholder) {
    color: var(--text-tertiary) !important;
  }

  :deep(.ant-switch) {
    background: #27272a !important;
    border: 1px solid transparent !important;

    &.ant-switch-checked {
      background: var(--primary) !important;
      border-color: var(--primary) !important;
    }

    .ant-switch-handle::before {
      background: #a1a1aa !important;
    }

    &.ant-switch-checked .ant-switch-handle::before {
      background: white !important;
    }
  }

  :deep(.ant-select-dropdown) {
    background: var(--bg-panel) !important;
    border: 1px solid var(--border-subtle) !important;
    box-shadow: var(--shadow-lg) !important;
  }

  :deep(.ant-select-item) {
    color: var(--text-primary) !important;

    &:hover {
      background: var(--bg-hover) !important;
    }

    &.ant-select-item-option-selected {
      background: rgba(99, 102, 241, 0.1) !important;
      color: var(--primary) !important;
    }
  }

  :deep(.ant-radio-group) {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
  }

  :deep(.ant-radio-wrapper) {
    color: var(--text-primary) !important;
    font-size: var(--text-sm) !important;

    .ant-radio {
      .ant-radio-inner {
        background: rgba(255, 255, 255, 0.03) !important;
        border-color: var(--border-medium) !important;
      }

      &.ant-radio-checked .ant-radio-inner {
        background: var(--primary) !important;
        border-color: var(--primary) !important;
      }
    }
  }

  :deep(.ant-input-textarea) {
    textarea {
      background: rgba(255, 255, 255, 0.03) !important;
      border: 1px solid var(--border-subtle) !important;
      color: var(--text-primary) !important;
      border-radius: var(--radius-md) !important;

      &:focus {
        border-color: var(--primary) !important;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
      }
    }
  }
}

/* Utility classes */
.h-80 {
  height: auto;
  min-height: 80px;
  line-height: 1.5;
}

.h-50 {
  height: auto;
  min-height: 50px;
  line-height: 1.5;
}

.h-42 {
  height: 42px;
  line-height: 42px;
}

.p-t-10 {
  padding-top: 6px;
}

.abs-r {
  position: absolute;
  right: 0px;
}

.switch-r {
  top: -5px;
}
</style>