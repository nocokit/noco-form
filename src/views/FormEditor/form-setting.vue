<template>
  <div class="setting glass" >
    <!-- Tab Navigation -->
    <div class="panel-tabs">
      <div class="tabs-wrapper">
        <button
          class="tab-item"
          :class="{ active: activeTab === 'component' }"
          @click="activeTab = 'component'"
          v-if="currentCompId"
        >
          组件设置
        </button>
        <button
          class="tab-item"
          :class="{ active: activeTab === 'form' }"
          @click="activeTab = 'form'"
        >
          表单设置
        </button>
      </div>
    </div>

    <div class="setting-base">
      <!-- Component Settings Tab -->
      <div v-show="activeTab === 'component'" class="tab-content-panel">
        <div class="panel-header-title" v-if="selectComp?.type">
          <h2 class="component-title-main">
            {{ selectComp?.type || 'Component' }}
            <span class="comp-type-badge">{{ selectComp?.type }}</span>
          </h2>
        </div>

        <template v-if="currentCompId">
          <!-- Basic Settings Group -->
          <div class="group-container">
            <div class="group-header" @click="toggleGroup('basic')">
              <div class="group-header-title">
                <i class="ri-settings-2-line"></i>
                <span>基础设置</span>
              </div>
              <i class="ri-arrow-down-s-line" :class="{ 'rotate-180': !collapsedGroups.basic }"></i>
            </div>
            <div class="group-content" v-show="!collapsedGroups.basic">
              <div class="content m-b-0">
        <FormTitle v-if="selectComp.type === 'FormTitle'" :comp="selectComp" :key="selectComp._selectedId "/>
        <ImageConfig v-if="selectComp.type === 'Image'" :comp="selectComp" :key="selectComp._selectedId "/>
        <VideoConfig v-if="selectComp.type === 'Video'" :comp="selectComp" :key="selectComp._selectedId "/>
        <Title v-if="showParams('name') && !showParams('isLayoutComp') && !['FormTitle', 'Image', 'Video'].includes(selectComp.type)" :comp="selectComp" :key="selectComp._selectedId "/>
        <ButtonText v-if="showParams('buttonText')" :comp="selectComp" :key="selectComp._selectedId "/>
        <Description v-if="showParams('description') && !['FormTitle', 'Image', 'Video'].includes(selectComp.type)"s :comp="selectComp" :key="selectComp._selectedId "/>
        <PageSubTitle v-if="showParams('pageSubTitle')"  :comp="selectComp" :key="selectComp._selectedId "/>
        <PageSubDescription v-if="showParams('pageSubTitle')" :comp="selectComp" :key="selectComp._selectedId "/>
        <Placeholder v-if="showParams('placeholder')" :comp="selectComp" :key="selectComp._selectedId "/>
        <AddressPlaceholder v-if="showParams('address_placeholder')" :comp="selectComp" :key="selectComp._selectedId "/>
        <RangePlaceholder v-if="showParams('placeholderRange')" :comp="selectComp" :key="selectComp._selectedId "/>
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
            </div>
          </div>

          <!-- Validation Group -->
          <div class="group-container" v-if="selectComp?.type && !JustShowCompType.includes(selectComp?.type)">
            <div class="group-header" @click="toggleGroup('validation')">
              <div class="group-header-title">
                <i class="ri-shield-check-line"></i>
                <span>校验与逻辑</span>
              </div>
              <i class="ri-arrow-down-s-line" :class="{ 'rotate-180': !collapsedGroups.validation }"></i>
            </div>
            <div class="group-content" v-show="!collapsedGroups.validation">
              <div class="content">
                <NumberConfig v-if="showParams('maxValue')" :comp="selectComp"/>
                <Required v-if="showParams('isRequired')" :comp="selectComp"/>
                <ValidationSystem v-if="showRegParams()" :comp="selectComp"/>
                <ValidationCustom v-if="showParams('isCustomErrorMessage')" :comp="selectComp" />
                <CustomText v-if="selectComp?.isCustomErrorMessage" :comp="selectComp"/>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Form Settings Tab -->
      <div v-show="activeTab === 'form'" class="tab-content-panel">
        <div class="panel-header-title">
          <h2 class="component-title-main">表单设置</h2>
        </div>

        <LocalizationSimple :form="selectForm"/>

        <!-- Configuration Section -->
        <div class="group-container">
          <div class="group-header" @click="toggleGroup('configuration')">
            <div class="group-header-title">
              <i class="ri-settings-3-line"></i>
              <span>配置选项</span>
            </div>
            <i class="ri-arrow-down-s-line" :class="{ 'rotate-180': !collapsedGroups.configuration }"></i>
          </div>
          <div class="group-content" v-show="!collapsedGroups.configuration">
            <div class="toggle-list">
              <div class="toggle-item">
                <div class="toggle-label-group">
                  <span class="toggle-label-main">Submit Button</span>
                  <span class="toggle-label-sub">Show/Hide form footer</span>
                </div>
                <DisplayBtn :form="selectForm" compact/>
              </div>

              <div class="toggle-item">
                <div class="toggle-label-group">
                  <span class="toggle-label-main">Field Indexing</span>
                  <span class="toggle-label-sub">Display question numbers</span>
                </div>
                <DisplaySerialNumber :form="selectForm" compact/>
              </div>

              <div class="toggle-item">
                <div class="toggle-label-group">
                  <span class="toggle-label-main">Watermark</span>
                  <span class="toggle-label-sub">Show branding watermark</span>
                </div>
                <DisplayWaterMark :form="selectForm" compact/>
              </div>
            </div>
          </div>
        </div>

        <!-- Branding Configuration -->
        <BrandingConfig :form="selectForm"/>
      </div>

    </div>

    <!-- Footer Metadata -->
    <div class="panel-metadata">
      <span>Schema v2.4</span>
      <span>Build 76603010</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue'

// 基础设置
import Title from '@/components-form-setting/base/Title.vue'
import FormTitle from '@/components-form-setting/show/FormTitle.vue'
import VideoConfig from '@/components-form-setting/show/VideoConfig.vue'
import ImageConfig from '@/components-form-setting/show/ImageConfig.vue'
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
import Localization from '@/components-form-setting/common-global-configurations/Localization.vue'
import LocalizationSimple from '@/components-form-setting/common-global-configurations/LocalizationSimple.vue'
import BrandingConfig from '@/components-form-setting/common-global-configurations/BrandingConfig.vue'

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

// Tab management
const activeTab = ref(props.currentCompId ? 'component' : 'form')

// Group collapse management
const collapsedGroups = reactive({
  basic: false,
  validation: false,
  configuration: false,
})

const toggleGroup = (groupName: string) => {
  collapsedGroups[groupName] = !collapsedGroups[groupName]
}

// Update active tab when component selection changes
watch(() => props.currentCompId, (newId) => {
  if (newId) {
    activeTab.value = 'component'
  } else {
    activeTab.value = 'form'
  }
})

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
/* Glass effect */
.glass {
  background: var(--bg-panel-alpha);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Right Config Panel */
.setting {
  background: var(--bg-panel);
  border-left: 1px solid var(--border-base);
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Tab Navigation */
.panel-tabs {
  padding: 16px;
  border-bottom: 1px solid var(--border-base);
}

.tabs-wrapper {
  display: flex;
  padding: 4px;
  background: var(--bg-hover-alpha);
  border-radius: 8px;
  gap: 0;
}

.tab-item {
  flex: 1;
  padding: 6px 12px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-tertiary);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  border: none;
  background: transparent;

  &:hover {
    color: var(--text-secondary);
  }

  &.active {
    color: var(--text-primary);
    background: var(--bg-hover);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

/* Panel Header Title */
.panel-header-title {
  padding: 0 0 12px;
  border-bottom: none;
  margin-bottom: 0;
}

.component-title-main {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.comp-type-badge {
  font-size: 10px;
  background: var(--primary-bg-alpha);
  color: var(--primary);
  padding: 3px 6px;
  border-radius: 6px;
  border: 1px solid var(--primary-border-alpha);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Group Container (Collapsible Sections) */
.group-container {
  border-bottom: 1px solid var(--border-base);
  margin-bottom: 0;

  &:last-child {
    border-bottom: none;
  }
}

.group-header {
  padding: 16px 0;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-tertiary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    color: var(--text-secondary);
  }

  .group-header-title {
    display: flex;
    align-items: center;
    gap: 6px;

    i {
      font-size: 14px;
    }
  }

  > i {
    font-size: 16px;
    transition: transform 0.2s;

    &.rotate-180 {
      transform: rotate(180deg);
    }
  }
}

.group-content {
  padding-bottom: 20px;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tab-content-panel {
  /* Content within each tab */
}

.setting-base {
  padding: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;

  /* Custom slim scrollbar */
  scrollbar-width: thin;
  scrollbar-color: var(--border-base) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-base);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--border-medium);
  }
}

.category-name {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin: 0;
  letter-spacing: 0.08em;
  padding: 16px 0;
  height: auto;
  line-height: 1.4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-base);

  &:first-child {
    margin-top: 0;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 0;

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
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 12px;
  letter-spacing: 0.1em;
}

.setting-item {
  position: relative;
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

/* New Simplified Configuration Section */
.config-section {
  margin-bottom: 0;
  padding-top: 0;
}

.section-title-simple {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin: 0 0 16px 0;
}

.toggle-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.toggle-label-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.toggle-label-main {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);

  &.disabled {
    opacity: 0.5;
    font-style: italic;
  }
}

.toggle-label-sub {
  font-size: 11px;
  color: var(--text-tertiary);
  line-height: 1.4;
}

/* Panel Metadata Footer */
.panel-metadata {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid var(--border-base);
  margin-top: auto;

  span {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--text-tertiary);
  }
}
</style>