<template>
  <div class="setting" >
    <div class="comp-name">
      <a-typography-title class="title-val" :level="5">
        <img v-if="currCompIcon" :src="currCompIcon" class="compIcon" alt="">
        <span v-if="!currCompIcon" class="compIcon">🍋</span>
        <span class="name">{{ compName }}</span>
      </a-typography-title>
    </div>
    <div class="setting-base">
      <template v-if="currentCompId">  
        <div class="category-name">
        基础设置 
      </div>
      <div class="content m-b-0">
        <FormTitle v-if="selectComp.type === CompType.formTitle" :comp="selectComp" :key="selectComp._selectedId "/>
        <Title v-if="showParams('name') && !showParams('isLayoutComp') && selectComp.type !== CompType.formTitle" :comp="selectComp" :key="selectComp._selectedId "/>
        <ButtonText v-if="showParams('buttonText')" :comp="selectComp" :key="selectComp._selectedId "/>
        <Description v-if="showParams('description') && selectComp.type !== CompType.formTitle"s :comp="selectComp" :key="selectComp._selectedId "/>
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
        <RateConfig v-if="selectComp?.type === CompType.rate" :comp="selectComp" />
        <NPSConfig v-if="[CompType.nps, CompType.selectRate].includes(selectComp?.type)" :comp="selectComp" />
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
      </div>
      </template>
      <div class="category-name">
        全局表单配置
      </div>
      <div class="content" v-if="selectForm">
        <DisplayBtn :form="selectForm"/>
        <DisplaySerialNumber :form="selectForm"/>
        <DisplayDescription :form="selectForm"/>
        <DisplayWaterMark :form="selectForm"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch, reactive, computed } from 'vue'

import Title from '@/components-form-setting/base/Title.vue'
import FormTitle from '@/components-form-setting/show/FormTitle.vue'
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
import NumberConfig from '@/components-form-setting/form-validation/NumberConfig.vue'
import SignCreateImgType from '@/components-form-setting/data/SignCreateImgType.vue'
import UseOtherDataList from '@/components-form-setting/data/UseOtherDataList.vue'
import DataList from '@/components-form-setting/data/DataList.vue'
import DisplayWaterMark from '@/components-form-setting/common-global-configurations/DisplayWaterMark.vue'
import DisplaySerialNumber from '@/components-form-setting/common-global-configurations/DisplaySerialNumber.vue'
import DisplayDescription from '@/components-form-setting/common-global-configurations/DisplayDescription.vue'
import DisplayBtn from '@/components-form-setting/common-global-configurations/DisplayBtn.vue'

import { hasOwnPropertyFunction, verifyRegularityCompList } from '@/views/FormEditor/comp-config-data'
import { JustShowCompType, CompType, CompListData } from '@/views/FormEditor/comp-data'
import Icon from './comp-icon'

const allCompList = CompListData.flatMap(item => item.children)

interface Props {
  selectComp: any
  selectForm: any
  currentCompId: string
}

const props = defineProps<Props>()
const selectComp = reactive(props.selectComp)
const selectForm = reactive(props.selectForm)

const currCompIcon = computed(() => {
  const comp = allCompList.find(item => item.type === selectComp?.type)?.icon
  return comp || (selectComp?.type === CompType.button && Icon.Button)
})

const compName = computed(() => {
  if (selectComp?.name) return selectComp.name
  if (selectComp?.type === CompType.button) return '提交按钮'
  return '表单配置'
})

const showParams = (params: string) => hasOwnPropertyFunction(selectComp, params)

const showRegParams = () => verifyRegularityCompList().includes(selectComp?.type)

watch([() => props.selectComp, () => props.selectForm], ([newValue, newFormConfig]) => {
  if (!newValue) return
  Object.assign(selectComp, newValue)
  Object.assign(selectForm, newFormConfig)
})
</script>

<style>
.comp-name {
  padding: 10px 10px 0 15px;
  border-bottom: 1px solid rgba(0, 0, 0, .06);
  top: 0;
  position: sticky;
  z-index: 10;
  background: #fff;

  .compIcon {
    width: 18px;
  }

  .name {
    color: rgba(0, 0, 0, 0.65);
    padding: 0 8px;
  }
}
.setting {
  background: #fafafa;
  max-height: 100%;
  overflow-y: auto;
}
.setting-base {
  padding: 5px 15px;
  overflow-x: hidden;
}
.category-name {
  height: 56px;
  line-height: 56px;
  font-weight: 700;
  color: rgba(0, 0, 0, .65);
  font-size: 14px;
  &::before {
    content: '';
    border-left: 3px solid #1677ff;
    padding-left: 8px;
    height: 10px;
    width: 100px;
  }
}
.border-top {
  margin-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, .065);
}

.block-title {
  display: block;
  padding-bottom: 8px;
}
.setting-item {
  position: relative;
  .ant-select {
    top: 10px;
  }
}
.h-80 {
  height: 80px;
  line-height: 80px;
}
.h-50 {
  height: 50px;
  line-height: 50px;
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

.content {
  display: block;
  margin-bottom: 18px;

  &.m-b-0 {
    margin-bottom: 0;
  }
}

</style>