<template>
  <div class="comp-item" :id="`field-${compConfig.id}`" :class="{ 'has-error': !!fieldError }">
    <div class="comp-item-title" v-if="displaySection">
      <a-typography-title :level="5" class="title-value">
        <span
          class="number"
          :class="{ 'title-value-isRequired': component.isRequired }"
          v-if="formConfig?.displayNumberSort"
        >
          {{ component?.lineNumber }}.
        </span>
        <span class="title-value">
          <a-textarea
            class="input-comp"
            v-if="isDev && component?.id === selectedComp?.id"
            :auto-size="{ minRows: 1, maxRows: 5 }"
            maxlength="50"
            v-model:value="component.title"
            placeholder="请输入标题"
            @change="changeValue($event, 'title')"
            allow-clear
          />
          <a-typography-text v-else type="secondary">
            <div class="description input-comp">{{ component.title }}</div>
          </a-typography-text>
        </span>
      </a-typography-title>
    </div>

    <div class="comp-item-description" v-if="displaySection && formConfig?.displayDescription">
      <div v-if="(component?.id !== selectedComp?.id && isDev) || renderType">
        <div class="description">{{ component.description }}</div>
      </div>
      <a-textarea
        v-else
        :auto-size="{ minRows: 1, maxRows: 5 }"
        v-model:value="component.description"
        placeholder="请输入描述"
        @change="changeValue($event, 'description')"
        allow-clear
      />
    </div>

    <div class="component">
      <component
        :key="component.id"
        :isSelected="component?.id === selectedComp?.id"
        :isPreviewRender="renderType === 'preview'"
        :isDev="isDev"
        :previewType="previewType"
        :is="resolvedComp"
        v-bind="component"
      />
    </div>

    <div v-if="fieldError" class="field-error">
      <ExclamationCircleOutlined class="error-icon" />
      {{ fieldError }}
    </div>

    <div class="active-comp-setting" v-if="compConfig.id === selectedComp?.id && !isIgnoreEditor()">
      <div class="bottom-setting">
        <div class="data-list-setting" v-if="hasDataListType(compConfig.type)">
          <span class="add-item">
            <a-typography-text type="warning" @click="addItem('new')">
              <PlusCircleTwoTone class="icon" :style="{ fontSize: '16px', color: '#646a73' }" />
              <span class="add-label">添加单项</span>
            </a-typography-text>
          </span>
          <span class="add-item">
            <a-typography-text
              type="warning"
              :class="{ disabled: checkAddOtherClass() }"
              @click="!checkAddOtherClass() && addItem('other')"
            >
              <PlusCircleTwoTone class="icon" :style="{ fontSize: '16px', color: '#646a73' }" />
              <span class="add-label">添加其他</span>
            </a-typography-text>
          </span>
          <span class="add-item">
            <a-typography-text type="warning" @click="batchChangeData">
              <ControlTwoTone class="icon" :style="{ fontSize: '16px', color: '#646a73' }" />
              <span class="add-label">批量操作</span>
            </a-typography-text>
          </span>
        </div>
        <span class="setting-item">
          <a-switch class="switch" v-model:checked="component.isRequired" @change="handleChangeRequired" />
          <label>必填</label>
        </span>
      </div>
    </div>

    <div class="active-drag handle" v-if="compConfig.id === selectedComp?.id">
      <img src="/src/assets/form/drag.svg" alt="">
    </div>

    <div class="active-comp-setting-side-bar" v-if="compConfig.id === selectedComp?.id">
      <a-tooltip placement="left" @click="compControl($event, 'copy')">
        <template #title><span>复制</span></template>
        <CopyOutlined class="control" />
      </a-tooltip>
      <a-tooltip placement="left" :color="'#f50'" @click="compControl($event, 'delete')">
        <template #title><span>删除</span></template>
        <DeleteOutlined class="control" />
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
import { ref, computed, defineEmits, type Component } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

import BatchOperationData from '@/components/form/BatchOperationData.vue'
import { useSelectCompStore } from '@/stores/selectCompStore'
import { v4 as uuidv4 } from 'uuid'
import { getComponent, isJustShowType, hasDataListType, isLayoutCompType } from '@/plugins/pluginManager'

const resolvedComp = computed(() => getComponent(props.type))

interface Props {
  component: Record<string, any>
  type: string
  lineNumber?: string
  formConfig?: Record<string, any>
  selectedComp?: Record<string, any>
  isDev: boolean
  renderType?: 'preview'
  previewType?: 'Phone' | 'PC'
  fieldError?: string
}

const compStore = useSelectCompStore()
const props = defineProps<Props>()
const emit = defineEmits(['compControl', 'addItem'])

const openBatchOperationDataBool = ref(false)
const compConfig = props.component

const displaySection = computed(() => !isJustShowType(props.type) && !isLayoutCompType(props.type))

const changeValue = (event: Event, params: 'title' | 'description') => {
  const value = (event.target as HTMLInputElement).value
  compConfig[params] = value
  compStore.updateCurrentComp({ [params]: value })
  compStore.updateCurrentCompKey(uuidv4())
}

const handleChangeRequired = (value: boolean) => {
  props.component.isRequired = value
  compStore.updateCurrentCompKey(uuidv4())
}

const handleBatchOperation = (isOk: boolean, dataList: any[]) => {
  openBatchOperationDataBool.value = false
  if (isOk) {
    compStore.updateCurrentComp({ dataList })
    compStore.updateCurrentCompKey(uuidv4())
  }
}

const compControl = (event: Event, type: string) => {
  event.stopPropagation()
  emit('compControl', type, props.component)
}

const isIgnoreEditor = () => isJustShowType(props.type)

const addItem = (type: string) => emit('addItem', type)

const batchChangeData = () => { openBatchOperationDataBool.value = true }

const checkAddOtherClass = () =>
  props.component.dataList?.some((item: any) => item.subType === 'other') ?? false
</script>

<style lang="scss" scoped>
::v-deep {
  textarea.input-comp,
  .description.input-comp {
    background: transparent;
    border: none !important;
    padding: 6px 12px !important;
    margin-left: -10px !important;
    color: rgb(73, 96, 141) !important;
    font-size: 16px !important;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  textarea.input-comp,
  span.input-comp {
    background: aliceblue;
  }
}

.description {
  width: 100%;
  padding: 6px 12px;
  outline: none;
  margin-left: -10px;
  border-radius: 6px;
  overflow-wrap: break-word;
  white-space: normal;
  font-weight: 400;
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
  color: #646a73;
  padding: 2px 0px;
  font-size: 14px;
}

::v-deep(input[disabled]) { background: #ffffff !important; }
::v-deep(textarea[disabled]) { background: #ffffff !important; }
::v-deep(.ant-picker-disabled) { background: #ffffff !important; }
::v-deep(.ant-input-affix-wrapper-disabled) { background: #ffffff !important; }

::v-deep(.ant-select-disabled:where(.css-dev-only-do-not-override-17yhhjv).ant-select:not(.ant-select-customize-input) .ant-select-selector) {
  background: #fff;
}

::v-deep(.ant-divider-horizontal.ant-divider-with-text::before),
::v-deep(.ant-divider-horizontal.ant-divider-with-text::after) {
  transform: translateY(100%) !important;
}

.control {
  &:active, &:hover { background: #ebebeb; }
}

.form-item .comp-item { padding: 16px 60px 24px; }
.form-item-active .comp-item { padding: 32px 60px 40px; }

.field-error {
  color: #ff4d4f;
  font-size: 13px;
  margin-top: 4px;
  padding: 0 12px;
  line-height: 1.6;

  .error-icon {
    margin-right: 4px;
    font-size: 12px;
  }
}

.has-error {
  .comp-item-title .title-value {
    color: #ff4d4f;
  }
}

.comp-item {
  position: relative;

  .title-value {
    position: relative;
    color: rgb(73, 96, 141);
    font-weight: 400;

    .description {
      &:empty:before {
        content: '请输入标题';
        color: #b3b3b3;
        font-weight: 200;
      }
    }
  }

  .number {
    position: absolute;
    left: -40px;
    top: 6px;
  }

  .title-value-isRequired::before {
    color: #ff4d4f;
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
    padding-bottom: 10px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}

.active-drag {
  position: absolute;
  left: 3px;
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
  background: #ffffff;
  font-size: 14px;
  padding: 5px 3px;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  box-shadow: 1px 1px 3px silver;

  .control { padding: 10px 5px; }
}

.active-comp-setting {
  width: 100%;
  position: relative;
  height: 64px;
  line-height: 64px;
  padding-top: 16px;

  .bottom-setting {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 100px;
  }
}

.setting-item {
  position: absolute;
  right: 0px;
  top: 16px;
  font-size: 14px;
  color: #646a73;

  .switch {
    position: relative;
    margin-top: -2px;
    margin-right: 5px;
  }
}

::v-deep(:where(.comp-item-description .css-dev-only-do-not-override-17yhhjv).ant-input-affix-wrapper-textarea-with-clear-btn) {
  background: transparent !important;
  left: -10px;

  .anticon-close-circle {
    display: none;
    &:hover, &:active, &:focus { display: block; }
  }

  :where(.comp-item-description .css-dev-only-do-not-override-17yhhjv).ant-input {
    background: transparent !important;
    border-style: none;
    color: rgba(0, 0, 0, 0.45);

    &:active, &:hover, &:focus {
      outline: none;
      box-shadow: none;
    }
  }
}
</style>
