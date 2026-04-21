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
        <!-- 插件自定义设置面板（优先级最高） -->
        <component v-if="customSettingComp" :is="customSettingComp" :comp="selectComp" :key="selectComp._selectedId" />

        <!-- 自动匹配的内置设置项 -->
        <template v-else>
          <component
            v-for="item in matchedBasicSettings"
            :key="item.name"
            :is="item.component"
            :comp="selectComp"
          />
        </template>
      </div>
      <div class="category-name" v-if="selectComp?.type && !isJustShowType(selectComp?.type) && matchedValidationSettings.length > 0">
        表单验证
      </div>
      <div class="content" v-if="!customSettingComp">
        <component
          v-for="item in matchedValidationSettings"
          :key="item.name"
          :is="item.component"
          :comp="selectComp"
        />
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

import DisplayWaterMark from '@/components-form-setting/common-global-configurations/DisplayWaterMark.vue'
import DisplaySerialNumber from '@/components-form-setting/common-global-configurations/DisplaySerialNumber.vue'
import DisplayDescription from '@/components-form-setting/common-global-configurations/DisplayDescription.vue'
import DisplayBtn from '@/components-form-setting/common-global-configurations/DisplayBtn.vue'

import { isJustShowType, getResolvedIcon, getComponentDef, getSettingComponent } from '@/plugins/pluginManager'
import { getMatchedSettings } from '@/plugins/settingRegistry'

interface Props {
  selectComp: any
  selectForm: any
  currentCompId: string
}

const props = defineProps<Props>()
const selectComp = reactive(props.selectComp)
const selectForm = reactive(props.selectForm)

const currCompIcon = computed(() => {
  if (!selectComp?.type) return ''
  return getResolvedIcon(selectComp.type)
})

const compName = computed(() => {
  if (selectComp?.name) return selectComp.name
  const def = getComponentDef(selectComp?.type)
  if (def) return def.name
  return '表单配置'
})

const customSettingComp = computed(() => {
  if (!selectComp?.type) return null
  return getSettingComponent(selectComp.type) || null
})

const matchedSettings = computed(() => {
  if (!selectComp?.type) return { basic: [], validation: [] }
  const def = getComponentDef(selectComp.type)
  return getMatchedSettings(selectComp, def)
})

const matchedBasicSettings = computed(() => matchedSettings.value.basic)
const matchedValidationSettings = computed(() => matchedSettings.value.validation)

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