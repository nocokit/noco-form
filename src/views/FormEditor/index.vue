<template>
  <div class="form-editor">
    <!-- Ambient Glow Background -->
    <div class="ambient-glow"></div>

    <header class="navbar">
      <div class="logo-area">
        <div class="logo-icon-box">
          <i class="ri-flashlight-fill"></i>
        </div>
        <span class="brand-logo">NOCO</span>
        <span class="brand-text">FORM</span>
      </div>

      <div class="toolbar-center">
        <button class="view-btn active">Editor</button>
        <button class="view-btn">Logic</button>
        <button class="view-btn">Data</button>
      </div>

      <div class="actions-right">
        <a-button type="primary" class="btn-publish" @click="preview">
          <i class="ri-rocket-2-line"></i>
          <span>Publish</span>
        </a-button>
      </div>
    </header>
    <div class="content editor-content">
      <div class="comps">
        <div class="panel-header">
          <span>Components</span>
          <i class="ri-search-line search-icon"></i>
        </div>
        <div class="component-list">
          <div class="comp-category-item" v-for="compCategory in compList">
            <div class="category-title">
              {{ compCategory.name }}
              <a-tooltip placement="top" v-if="compCategory.tooltip">
                <template #title>
                  <span>{{ compCategory.tooltip }}</span>
                </template>
                <QuestionCircleOutlined />
              </a-tooltip>
            </div>
          <VueDraggable v-model="compCategory.children" :animation="0"
            :group="{ name: 'sevenBotForm', pull: 'clone', put: false }" :sort="false" :clone="onClone"
            class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded compList">
            <div v-for="item in compCategory.children" class="cursor-move h-50px bg-gray-500/5 item" v-bind:class="{
              'person': compCategory.type === 'Personal Component',
              'advanced': compCategory.type === 'Advanced Component',
              'layout': compCategory.type === 'Layout Component'
            }" @click="createCompByClick(item)">
              <i class="icon" :class="item.icon" v-if="item.icon"></i>
              {{ item.label }}
            </div>
          </VueDraggable>
          </div>
        </div>
      </div>
      <div class="editor">
        <div class="form" v-bind:class="{
          'no-data': !pageCompList?.length
        }">
          <div class="body">
            <a-watermark :content="selectForm?.displayWaterMark ? selectForm?.waterMarkText : ''">
              <div class="form-body form-body-content">
                <div class="comp-list-content">
                  <!-- Form Header Preview -->
                  <div class="form-header-preview">
                    <h2 class="form-title">Product Feedback</h2>
                    <p class="form-description">We value your feedback.</p>
                  </div>

                  <VueDraggable v-model="pageCompList" :animation="150" group="sevenBotForm" ghostClass="ghost"
                    handle=".handle"
                    class="flex flex-col gap-2 p-4 w-300px max-h-350px m-auto bg-gray-500/5 rounded overflow-auto form-body">
                    <template v-if="!pageCompList?.length">
                      <div v-if="!pageCompList?.length" @dragenter="handleDragHandle" @mouseleave="handleDragHandle"
                        @dragleave="handleDragHandle">
                        <div class="no-data-content" :class="[{
                          'dragenter': noDataContentRef === 'dragenter',
                        }]">
                          <span class="text" :class="{
                            'has-data': pageCompList.length
                          }">
                            点击左侧题目 / 拖拽题目到此区域
                          </span>

                        </div>
                      </div>
                    </template>

                    <template v-else>
                      <div v-for="(item, index) in pageCompList" :key="item?.name" :class="{
                        'cursor-move': true,
                        'form-item': true,
                        'active-comp': activeComp.id == item?.id
                      }" @click="selectComp(item)">
                        <FormComponent :key="item?.id" @compControl="compControl"
                          @addItem="addItem($event, item, index)" :component="item" :formConfig="selectForm"
                          :type="item?.type" :isDev="isFormEditorDevBool" :selectedComp="getActiveComp()">
                        </FormComponent>
                      </div>
                    </template>
                  </VueDraggable>
                </div>
              </div>
              <div class="form-footer" @click="selectComp(pageFooter)"
              v-if="globalData && globalData.displayBtn"
               :class="{
                'form-item': true,
                'active-comp': activeComp.id === pageFooter.id
              }" :style="{
                'text-align': pageFooter.position || 'left'
              }">
                <a-button class="submit" type="primary" :icon="pageFooter.buttonIconShowBool ? h(CheckOutlined) : null"
                  :size="pageFooter.size" :style="{ 'padding': getSize(), 'lineHeight': getLineHeight() }">
                  {{ pageFooter.buttonText || '提交' }}
                </a-button>
              </div>
            </a-watermark>
          </div>

        </div>

      </div>
      <SettingComp v-if="selectForm" :currentCompId="activeComp.id" :key="activeComp.id + updateCompKey"
        :selectForm="selectForm" :selectComp="getActiveComp()"></SettingComp>
    </div>
  </div>
  <PreviewPage v-if="openDraw" :selectForm="selectForm" :open="openDraw" :pageCompList="pageCompList"
    :pageFooter="pageFooter" @onClose="onClose"></PreviewPage>

</template>
<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { computed, h, onMounted, ref, watch, } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { CompListData, CompType, IgnoreLineNumberTypeList } from './comp-data'
// import SidebarComp from '@/views/FormEditor/form-sidebar.vue' // Removed - No longer using sidebar
import SettingComp from '@/views/FormEditor/form-setting.vue'
import PreviewPage from '@/views/Preview/index.vue'
import FormComponent from '@/components-form/index.vue'
import { getDefaultConfig } from '@/views/FormEditor/comp-config-data';
import { useSelectCompStore } from '@/stores/selectCompStore'
import { useRoute } from 'vue-router';
import { toGithub } from '@/utils/toGithub'
import { CheckOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';


import * as _ from 'lodash'
import Icon from './comp-icon'
import router from '@/router'

interface ActiveCompType {
  type: 'component' | 'header'
  id: string
}

interface HeaderType {
  type: string,
  id: string
  titleValue: string
  titleSize: string
  titleDescription: string
  titleImageUrl: string
  titleDescriptionShow: boolean
  titleImageShow: boolean
  defUrl: string
  titleDescriptionPosition: 'left' | 'right' | 'center'
}


interface FooterType {
  id: string
  size: string
  buttonText: string
  position: 'left' | 'right' | 'center'
  buttonIconShowBool: boolean
}

const openDraw = ref(false)
const compList = ref([...CompListData]) // 来源组件列表
const globalData = ref()

/**
 * 编辑器编辑内容
 * 1. pageHeader // 底部配置
 * 2. pageCompList // 页面组件
 * 3. pageFooter // 底部提交按钮配置
 */

const getSize = () => {
  const data = pageFooter?.value
  return data?.size == 'large' ? "0 26px" : (data?.size == "small" ? "0 10px" : "0 16px")
}

const getLineHeight = () => {
  const data = pageFooter.value
  return data.size == 'large' ? "40px" : (data.size == "small" ? "24px" : "32px")
}

const pageCompList = ref<any[]>([]) // 页面组件内容
const pageHeader = ref<HeaderType>({
  id: '',
  titleValue: '表单标题',
  titleSize: 'middle',
  titleDescription: 'noco-form 表单编辑器，Github仓库已免费开源，感谢你的使用！',
  titleImageUrl: 'bg.png',
  defUrl: 'bg.png',
  type: '',
  titleDescriptionShow: true,
  titleImageShow: true,
  titleDescriptionPosition: 'center'
})

const pageFooter = ref<FooterType>({
  id: '',
  size: 'large',
  position: 'left',
  buttonText: '提交',
  buttonIconShowBool: true,
}) // 底部

const currentComp = ref()
const updateCompKey = ref()
const noDataContentRef = ref()
const activeComp = ref<ActiveCompType>({
  type: 'component',
  id: '',
}) // 当前选中组件

const selectForm = ref()

const defaultFormConfig = {
  displayNumberSort: true,
  displayDescription: true,
  displayTitle: true,
  displayBtn: true,
  displayWaterMark: false,
  waterMarkText: 'noco-form 📝',
}

onMounted(() => {
  const data = useCompStore.initGlobalFormConfig({ ...defaultFormConfig })
  globalData.value = useCompStore.currentGlobalFormConfig
  // 组件初始化
  // @ts-ignore
  pageHeader.value = getDefaultConfig(CompType.formTitle, true)
  pageHeader.value.id = uuidv4()
  // @ts-ignore
  pageFooter.value = getDefaultConfig(CompType.button)
  pageFooter.value.id = uuidv4()

})

const useCompStore = useSelectCompStore()
const isFormEditorDevBool = computed(() => {
  const bool = useRoute().path.includes('form-editor')
  return bool
})


const initDataState = () => {
  noDataContentRef.value = ''
}

// 更新选中组件数据
const updateCompByChange = (compConfig: any) => {
  currentComp.value = compConfig
  const index = getActiveCompIndex()
  if (index > -1 && pageCompList.value.length) {
    pageCompList.value[index] = { ...pageCompList.value[index], ...compConfig }
  }
}
const currentCompKeyData = computed(() => useCompStore.currentCompKey)

watch(currentCompKeyData, (newValue) => {
  updateCompKey.value = newValue
})


watch([() => useCompStore.compConfig, () => useCompStore.currentGlobalFormConfig], ([compConfig, currentGlobalFormConfig]) => {
  updateCompByChange({
    ...compConfig,
  })
  selectForm.value = currentGlobalFormConfig
})


const updateCompLineNumber = () => {
  if (Array.isArray(pageCompList.value)) {
    let lineNumber = 0
    let pageCount = _.filter(pageCompList.value, {
      type: CompType.paging
    })?.length
    let pageNumber = 0
    _.map(pageCompList.value, (item: any) => {
      const isIgnoreTypeBool = IgnoreLineNumberTypeList.includes(item.type)
      const isPageTypeBool = CompType.paging === item.type
      if (!isIgnoreTypeBool) {
        lineNumber++
        item.lineNumber = lineNumber && lineNumber.toString()?.length === 1 ? '0' + lineNumber : lineNumber
      }
      if (isPageTypeBool) {
        pageNumber++
        item.pagingValue = `第 ${pageNumber} 页 / 共 ${pageCount} 页`
      }
    })
  }
}

watch(pageCompList, (newValue) => {
  pageCompList.value = newValue
  updateCompLineNumber()
})

const createByClickOrClone = (element: any) => {
  const defaultComp: any = getDefaultConfig(element.type)
  const item = {
    ...defaultComp,
    ...element.value,
    id: element.id || uuidv4(),
    title: element.name,
    type: element.type,
    name: element.name
  }
  return { ...item }
}

const onClone = (element: any) => {
  return createByClickOrClone(element)
}

const createCompByClick = (item: any) => {
  const createElement = createByClickOrClone(item)
  pageCompList.value.splice(pageCompList.value.length, 0, { ...createElement })
  updateCompLineNumber()
}



const selectComp = (item: any) => {
  useCompStore.initCurrentComp({
    ...item
  })
  activeComp.value.id = item.id

  console.log("当前选中组件：", item)
}

const updateDataListIndex = (index: number) => {
  if (index > -1 && Array.isArray(pageCompList.value[index]?.dataList)) {
    _.map(pageCompList.value[index].dataList, (item: any, index: number) => {
      item._index = index
    })
  }
}

const addItem = (type: 'new' | 'other', item: any, index: number) => {
  const isNewBool = type === 'new'
  const isOtherBool = type === 'other'
  const newDataItem = isNewBool ? {
    label: '选项',
    value: '选项',
  } : {
    subType: 'other',
    label: '其他',
    value: '',
  }
  if (['new', 'other'].includes(type)) {
    pageCompList.value[index].dataList.push(newDataItem)
  }

  updateDataListIndex(index)
  initDataState()
}



const deleteSuccess = (compName = '') => {
  message.success(`【${compName}】删除成功！`, 1);
};

const compControl = (controlType: string, value: any) => {
  const index = _.findIndex(pageCompList.value, (item: any) => item.id === value.id)
  if (index === -1) {
    console.log("没有查询到组件！！！")
    return
  }
  if (controlType === 'copy') {
    const newComp: any = {
      ...value,
      id: uuidv4()
    }
    pageCompList.value.splice(index + 1, 0, { ...newComp })
  }
  if (controlType === 'delete') {
    const deleteComp = pageCompList.value.splice(index, 1)
    activeComp.value.id = pageCompList.value[index - 1]?.id
    deleteSuccess(deleteComp?.[0]?.name)
  }
  initDataState()
  updateCompLineNumber()
}


const getActiveComp = () => {
  // 组件列表
  const item = _.filter(pageCompList.value, (item: any) => item.id === activeComp.value.id)?.[0]
  if (item) {
    return item
  }
  if (activeComp.value.id === pageFooter.value.id) {
    return pageFooter.value
  }
  if (activeComp.value.id === pageHeader.value.id) {
    return pageHeader.value
  }
}

const getActiveCompIndex = () => {
  return _.findIndex(pageCompList.value, (item: any) => item.id === activeComp.value.id)
}

const callback = () => {
  // 返回到表单编辑器首页
  router.push('/')
}

const getImageUrl = (imgUrl: string) => {
  try {
    return new URL(`/src/assets/background/${imgUrl}`, import.meta.url).href;
  } catch (e) {
    // @ts-ignore
    const defaultUrl = pageHeader?.defUrl
    return new URL(`/src/assets/background/${defaultUrl}`, import.meta.url).href;
  }
}


const handleDragHandle = (e: any) => {
  e.preventDefault()
  const { type } = e
  noDataContentRef.value = type
}

const preview = () => {
  openDraw.value = true
}

const onClose = () => {
  openDraw.value = false
}
</script>

<style scoped lang="scss">
.icon {
  width: 20px;
  height: 20px;
  margin-top: -4px;
}

.form-editor {
  height: 100%;
  overflow: hidden;
  min-width: 1260px;
}

/* Header Navbar - New Design */
.navbar {
  height: var(--header-h);
  background: var(--bg-panel);
  border-bottom: 1px solid var(--border-base);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: var(--z-sticky);
  position: relative;

  .logo-area {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -0.5px;
    color: var(--text-primary);

    .logo-icon-box {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        color: white;
        font-size: 14px;
      }
    }

    .brand-logo {
      font-weight: 700;
    }

    .brand-text {
      font-weight: 400;
      color: #666;
    }
  }

  /* Center Toolbar */
  .toolbar-center {
    background: #27272A;
    padding: 3px;
    border-radius: 8px;
    display: flex;
    gap: 2px;

    .view-btn {
      background: transparent;
      color: var(--text-sub);
      border: none;
      padding: 6px 16px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 12px;
      font-weight: 500;

      &.active {
        background: #3F3F46;
        color: white;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
      }

      &:hover:not(.active) {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }

  .actions-right {
    .btn-publish {
      background: var(--primary);
      border: none;
      color: white;
      padding: 8px 16px;
      height: auto;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      box-shadow: 0 0 15px var(--primary-glow);
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 6px;

      &:hover {
        background: var(--primary-hover);
      }
    }
  }
}

/* Editor Layout - Three Column */
.editor-content {
  display: grid;
  grid-template-columns: var(--sidebar-w) 1fr var(--config-w);
  padding: 0;
  gap: 0;
  height: calc(100vh - var(--header-h));
  background: transparent;
  overflow: hidden;

  @media(max-width: 1200px) {
    grid-template-columns: 260px 1fr 280px;
  }

  @media(max-width: 768px) {
    grid-template-columns: 1fr;

    .comps, .setting {
      display: none;
    }
  }
}

.content {
  /* Left Component Library */
  .comps {
    display: flex;
    flex-direction: column;
    background: var(--bg-panel);
    border-right: 1px solid var(--border-base);
    overflow: hidden;
  }

  .panel-header {
    padding: 16px;
    border-bottom: 1px solid var(--border-base);
    font-weight: 600;
    color: var(--text-main);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search-icon {
      font-weight: 400;
      color: #666;
      cursor: pointer;
    }
  }

  .component-list {
    padding: 16px;
    overflow-y: auto;
  }

  .comp-category-item {
    margin-bottom: 24px;
  }

  .category-title {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 12px;
    margin-top: 8px;
    letter-spacing: 1px;
    user-select: none;
  }

  .compList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 0;
    user-select: none;
    background: transparent !important;
    padding: 0 !important;
    width: 100% !important;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px;
      background: var(--bg-card) !important;
      border: 1px solid var(--border-base) !important;
      border-radius: var(--radius-md);
      cursor: grab;
      transition: all 0.2s;
      color: var(--text-sub);
      font-size: 12px;
      height: auto !important;
      min-height: auto;

      .icon {
        font-size: 20px;
        color: var(--text-sub);
        transition: all 0.2s;
      }

      &:hover {
        background: #27272a !important;
        border-color: var(--text-dim) !important;

        .icon {
          color: var(--text-primary);
        }
      }

      &:active {
        cursor: grabbing;
      }
    }
  }

  /* Center Canvas */
  .editor {
    position: relative;
    height: 100%;
    margin: 0;
    padding: 40px;
    overflow-y: auto;
    background-color: var(--bg-canvas);
    /* Dot pattern background */
    background-image: radial-gradient(#27272a 1px, transparent 1px);
    background-size: 20px 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }

  /* Form Paper */
  .body {
    width: 100%;
    max-width: 400px;
    min-height: 700px;
    background: #000000;
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    border: 1px solid var(--border-base);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: all 0.3s;

    .form-header {
      padding: 0;
      margin-bottom: var(--spacing-3);

      img {
        width: 100%;
        height: 180px;
        border-radius: var(--radius-sm);
        object-fit: cover;
      }

      .title {
        text-align: center;
        font-size: var(--text-xl);
        color: var(--text-primary);
        font-weight: var(--font-semibold);
        margin-bottom: var(--spacing-2);
        margin-top: var(--spacing-4);
      }

      .description {
        font-size: var(--text-sm);
        text-align: center;
        color: var(--text-secondary);
        margin: var(--spacing-2) 0;
        line-height: 1.6;
      }
    }

    /* Form Header Preview */
    .form-header-preview {
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 1px dashed #27272a;
      margin-bottom: 12px;

      .form-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 4px;
        color: var(--text-main);
      }

      .form-description {
        color: #52525b;
        font-size: 12px;
        margin: 0;
      }
    }
  }

  /* Form Container */
  .form {
    width: 100%;
    max-width: var(--canvas-width);
    position: relative;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .sortable-chosen:not(.active-comp) {
      background: aliceblue;
      border-radius: 4px;
      border: 1px dashed #94b4ff;
      width: calc(100% - 0px);
      padding: 48px 50px;
      height: 116px;
      text-align: center;
      margin: 2px 0;
      z-index: 0;
    }

    &.no-data {
      .sortable-chosen {
        margin: 2px;
        width: calc(100% - 4px);
      }
    }

  }

  /* Form Item Styles */
  .form-item {
    position: relative;
    background: var(--bg-card);
    padding: 16px;
    border: 1px solid var(--border-base);
    border-radius: var(--radius-md);
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.02);
    }
  }

  /* Active Component State with Glow */
  .active-comp {
    background: rgba(99, 102, 241, 0.05) !important;
    border: 1px solid var(--primary) !important;
    border-radius: var(--radius-md);
    position: relative;
    box-shadow: 0 0 0 1px var(--primary), 0 0 20px var(--primary-glow) !important;

    &::before {
      display: none;
    }
  }

  /* Empty State - Ghost Placeholder */
  .no-data-content {
    border: 2px dashed var(--primary);
    border-radius: var(--radius-md);
    background: var(--primary-glow);
    text-align: center;
    color: var(--primary);
    padding: 60px 40px;
    min-height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    font-size: 12px;

    .text {
      font-size: 12px;
      font-weight: 500;
    }

    &:hover,
    &.dragenter {
      border-color: var(--primary);
      color: var(--primary);
      background: rgba(99, 102, 241, 0.2);
    }
  }

  .form-body-content {
    min-height: 120px;
  }

  .form-footer {
    padding: 0;
    width: 100%;
    margin-top: auto;

    :deep(.submit) {
      width: 100%;
      background: var(--primary);
      color: white;
      border: none;
      height: 40px;
      border-radius: 6px;
      font-weight: 600;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

/* Preview Button - Removed (Now in Header) */

::v-deep(.ant-drawer-bottom>.ant-drawer-content-wrapper) {
  height: calc(100% - 50px) !important;

}


.control {
  margin-left: auto;
  display: flex;
  gap: 10px;
  align-items: center;

  .cont-item {
    cursor: pointer;
  }

  .btn-icon {
    width: 18px;
    padding: 0px;
    margin-top: -2px;
    filter: grayscale(1);
  }

  &:hover {
    .btn-icon {
      filter: grayscale(0);
    }
  }

  .name {
    padding: 0 4px;
  }
}

.form-header {
  margin: 0;

  .title {
    height: 42px;
    line-height: 42px;

    .title-val {
      font-size: 20px;
    }
  }

  .description-value {
    color: rgba(0, 0, 0, 0.45);
    margin: 8px 0 30px 0;
  }
}

.comp-list-content {
  position: relative;
  min-height: 130px;
}
</style>
