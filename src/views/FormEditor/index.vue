<template>
  <div class="form-editor">
    <!-- Ambient Glow Background -->
    <div class="ambient-glow"></div>

    <header class="navbar glass">
      <div class="logo-area">
        <div class="logo-icon-box">
          <i class="ri-layers-line"></i>
        </div>
        <span class="workspace-name">NOCO FORM <span class="separator">/</span> Product Feedback</span>
      </div>

      <div class="actions-right">
        <div class="lang-selector">
          <i class="ri-global-line lang-icon"></i>
          <select class="item-comp w-full bg-[#18181b] border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed hover:border-zinc-600" v-model="currentShortLocale">
            <option
              v-for="locale in availableLocales"
              :key="locale.code"
              :value="locale.code"
            >
              {{ locale.label }}
            </option>
          </select>
        </div>
        <div class="divider-vertical"></div>
        <button class="github-btn" @click="toGithub" :title="t('header.github')">
          <i class="ri-github-fill"></i>
        </button>
        <div class="divider-vertical"></div>
        <button class="btn-publish px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2" @click="preview">
          <i class="ri-send-plane-line"></i>
          <span>{{ t('header.publish') }}</span>
        </button>
      </div>
    </header>
    <div class="content editor-content">
      <div class="comps glass">
        <div class="panel-header">
          <span>{{ t('components.title') }}</span>
        </div>

        <!-- Quick Search with shortcut hint -->
        <div class="search-wrapper-enhanced">
          <div class="search-box-enhanced">
            <i class="ri-search-line search-icon-enhanced"></i>
            <input
              type="text"
              :placeholder="t('components.searchPlaceholder')"
              class="search-input-enhanced"
              v-model="searchQuery"
              @input="handleSearch"
            />
            <span class="search-shortcut">⌘F</span>
          </div>
        </div>

        <div class="component-list-enhanced">
          <div class="comp-category-section" v-for="compCategory in filteredCompList" :key="compCategory.name" v-show="compCategory.children.length > 0">
            <!-- Category Title with minimal design -->
            <div class="category-title-enhanced">
              <span>{{ t(`components.categories.${compCategory.name}`).toUpperCase() }}</span>
              <i class="ri-information-line category-info-icon" v-if="compCategory.tooltip" :title="compCategory.tooltip"></i>
            </div>

            <!-- 2-Column Grid Layout -->
            <VueDraggable
              v-model="compCategory.children"
              :animation="0"
              :group="{ name: 'sevenBotForm', pull: 'clone', put: false }"
              :sort="false"
              :clone="onClone"
              class="comp-grid-2col"
            >
              <div
                v-for="item in compCategory.children"
                :key="item.type"
                class="comp-item-card"
                :class="{ 'highlight': compCategory.name === 'Advanced' && item.label === 'Payment' }"
                @click="createCompByClick(item)"
              >
                <i class="comp-icon" :class="item.icon" v-if="item.icon"></i>
                <span class="comp-label">{{ t(`componentTypes.${item.type}`) }}</span>
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
            <div class="watermark-wrapper" :data-watermark="selectForm?.displayWaterMark ? selectForm?.waterMarkText : ''">
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
                            {{ t('canvas.noData') }}
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
              }" style="display: flex; justify-content: center;">
                <TwButton
                  :text="pageFooter.buttonText || t('common.submit')"
                  :size="(pageFooter.size as 'small' | 'default' | 'large') || 'default'"
                  :show-icon="pageFooter.buttonIconShowBool"
                />
              </div>
            </div>
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
import { TwButton } from '@/components/ui'

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

// Use i18n for translations
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Use locale composable for i18n management
import { useLocale } from '@/composables/useLocale'
const { currentLocale, currentShortLocale, availableLocales } = useLocale()

// Watch for locale changes and show notification
watch(currentLocale, (newLocale, oldLocale) => {
  if (oldLocale && newLocale !== oldLocale) {
    const localeName = availableLocales.value.find(l => l.fullCode === newLocale)?.label || newLocale
    showLocaleNotification(`${t('actions.languageChanged')} ${localeName}`)
    console.log('Locale changed to:', newLocale)
  }
})

const showLocaleNotification = (message: string) => {
  const notification = document.createElement('div')
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 24px;
    background: var(--primary);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 4px 12px var(--primary-glow);
    animation: slideInNotif 0.3s ease;
  `

  // Add animation styles if not exists
  if (!document.getElementById('locale-notification-styles')) {
    const style = document.createElement('style')
    style.id = 'locale-notification-styles'
    style.textContent = `
      @keyframes slideInNotif {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutNotif {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
    `
    document.head.appendChild(style)
  }

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = 'slideOutNotif 0.3s ease'
    setTimeout(() => notification.remove(), 300)
  }, 2500)
}
const compList = ref([...CompListData]) // 来源组件列表
const globalData = ref()
const searchQuery = ref('') // 搜索关键词
const filteredCompList = ref([...CompListData]) // 过滤后的组件列表

// 搜索处理函数
const handleSearch = () => {
  const query = searchQuery.value.toLowerCase().trim()

  if (!query) {
    // 如果搜索框为空,显示所有组件
    filteredCompList.value = [...CompListData]
    return
  }

  // 过滤组件
  filteredCompList.value = CompListData.map(category => {
    const filteredChildren = category.children.filter(comp => {
      return comp.label.toLowerCase().includes(query) ||
             comp.name.toLowerCase().includes(query) ||
             comp.type.toLowerCase().includes(query)
    })

    return {
      ...category,
      children: filteredChildren
    }
  }).filter(category => category.children.length > 0)
}

/**
 * 编辑器编辑内容
 * 1. pageHeader // 底部配置
 * 2. pageCompList // 页面组件
 * 3. pageFooter // 底部提交按钮配置
 */

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
  console.log(`【${compName}】删除成功！`);
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

/* Glass effect */
.glass {
  background: var(--bg-panel-alpha);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Header Navbar - Premium SaaS Design */
.navbar {
  height: var(--header-h);
  background: var(--bg-panel);
  border-bottom: 1px solid var(--border-base);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: var(--z-sticky);
  position: relative;

  .logo-area {
    display: flex;
    align-items: center;
    gap: 16px;

    .logo-icon-box {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--primary), var(--primary-light));
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px var(--primary-glow);

      i {
        color: white;
        font-size: 20px;
      }
    }

    .workspace-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: -0.02em;

      .separator {
        color: var(--text-tertiary);
        margin: 0 8px;
      }
    }
  }

  /* Language Selector */
  .lang-selector {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bg-panel-alpha);
    border: 1px solid var(--border-base);
    border-radius: 8px;
    padding: 4px 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: var(--border-medium);

      .lang-icon {
        color: var(--primary);
      }
    }

    .lang-icon {
      font-size: 14px;
      color: var(--text-tertiary);
      transition: all 0.2s;
    }

    .lang-select {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      outline: none;
      padding-right: 16px;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m3 4.5 3 3 3-3'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right center;

      option {
        background: var(--bg-panel);
        color: var(--text-primary);
      }
    }
  }

  .actions-right {
    display: flex;
    align-items: center;
    gap: 12px;

    .github-btn {
      background: transparent;
      border: 1px solid var(--border-base);
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      color: var(--text-secondary);
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 16px;
      }

      &:hover {
        background: var(--bg-hover);
        color: var(--primary);
        border-color: var(--border-medium);
      }
    }

    .btn-settings {
      background: transparent;
      border: none;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      color: var(--text-secondary);
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 16px;
      }

      &:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
    }

    .divider-vertical {
      width: 1px;
      height: 16px;
      background: var(--border-base);
    }

    .btn-publish {
      background: var(--primary);
      border: none;
      color: white;
      padding: 6px 20px;
      height: auto;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 0 20px var(--primary-glow);
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 8px;

      i {
        font-size: 16px;
      }

      &:hover {
        background: var(--primary-hover);
        box-shadow: 0 0 30px var(--primary-glow-strong);
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
    padding: 24px 24px 16px;
    font-weight: 600;
    font-size: 14px;
    color: var(--text-main);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search-wrapper {
    padding: 0 24px 16px;
  }

  .search-box {
    position: relative;
    display: flex;
    align-items: center;

    .search-icon {
      position: absolute;
      left: 12px;
      font-size: 16px;
      color: var(--text-tertiary);
      pointer-events: none;
      transition: color 0.2s;
    }

    .search-input {
      width: 100%;
      background: var(--bg-panel);
      border: 1px solid var(--border-base);
      border-radius: 12px;
      padding: 10px 12px 10px 38px;
      font-size: 12px;
      color: var(--text-primary);
      outline: none;
      transition: all 0.2s;

      &::placeholder {
        color: var(--text-tertiary);
      }

      &:focus {
        border-color: var(--primary);
        background: var(--bg-deep);

        ~ .search-icon {
          color: var(--primary);
        }
      }
    }
  }

  .component-list {
    padding: 0 24px 24px;
    overflow-y: auto;

    /* Slim scrollbar */
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
  }

  .comp-category-item {
    margin-bottom: 24px;
  }

  .category-title {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin-bottom: 16px;
    margin-top: 0;
    letter-spacing: 0.15em;
    user-select: none;
  }

  .comp-category-item {
    margin-bottom: 32px;

    &:first-child {
      margin-top: 0;
    }
  }

  .compList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
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
      padding: 20px 12px;
      background: var(--bg-hover-alpha) !important;
      border: 1px solid var(--border-base) !important;
      border-radius: 16px;
      cursor: grab;
      transition: all 0.2s;
      color: var(--text-secondary);
      font-size: 11px;
      font-weight: 500;
      height: auto !important;
      min-height: 80px;

      .icon {
        font-size: 20px;
        color: var(--text-secondary);
        transition: all 0.2s;
      }

      &:hover {
        background: var(--bg-active-alpha) !important;
        border-color: var(--border-medium) !important;
        transform: translateY(-2px);

        .icon {
          color: var(--primary);
        }
      }

      &:active {
        cursor: grabbing;
        transform: translateY(0);
      }
    }
  }

  /* Center Canvas */
  .editor {
    position: relative;
    height: 100%;
    margin: 0;
    padding: 64px 40px;
    overflow-y: auto;
    background-color: var(--bg-deep);
    /* Premium dot pattern background */
    background-image: radial-gradient(var(--border-base) 1px, transparent 1px);
    background-size: 24px 24px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;

    /* Slim scrollbar */
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
  }

  /* Form Paper */
  .body {
    width: 100%;
    max-width: 640px;
    min-height: 800px;
    background: var(--bg-panel);
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.4);
    border-radius: 32px;
    border: 1px solid var(--border-base);
    padding: 36px 28px 48px;
    display: flex;
    flex-direction: column;
    gap: 40px;
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
      padding-bottom: 32px;
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      &::before {
        content: '';
        width: 80px;
        height: 80px;
        background: var(--bg-deep);
        border: 1px solid var(--border-base);
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
      }

      .form-title {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 0;
        color: var(--text-primary);
        letter-spacing: -0.02em;
      }

      .form-description {
        color: var(--text-tertiary);
        font-size: 14px;
        margin: 0;
        max-width: 480px;
        line-height: 1.6;
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
      background: var(--primary-bg-alpha);
      border-radius: 16px;
      border: 2px dashed var(--primary);
      width: calc(100% - 0px);
      // padding: 48px 50px;
      height: 116px;
      text-align: center;
      margin: 2px 0;
      z-index: 0;
      backdrop-filter: blur(8px);
      box-shadow: 0 8px 24px var(--primary-shadow);
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
    background: transparent;
    padding: 24px;
    border: 2px solid transparent;
    border-radius: 16px;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background: var(--bg-hover-alpha);
      border-color: transparent;
    }
  }

  /* Active Component State with Glow */
  .active-comp {
    background: var(--bg-active-alpha) !important;
    border: 2px solid transparent !important;
    border-radius: 16px;
    position: relative;
    box-shadow: 0 0 0 2px var(--primary), 0 0 20px var(--primary-glow) !important;

    &::before {
      display: none;
    }
  }

  /* Empty State - Ghost Placeholder */
  .no-data-content {
    border: 2px dashed var(--border-base);
    border-radius: 24px;
    background: var(--bg-hover-alpha);
    text-align: center;
    color: var(--text-tertiary);
    padding: 80px 40px;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    font-size: 13px;
    font-style: italic;

    .text {
      font-size: 13px;
      font-weight: 500;
    }

    &:hover,
    &.dragenter {
      border-color: var(--primary);
      color: var(--primary);
      background: var(--primary-bg-alpha);
    }
  }

  /* Drag Ghost Style */
  :deep(.ghost) {
    opacity: 0.6;
    background: var(--primary-bg-light);
    border: 2px dashed var(--primary) !important;
    border-radius: 16px;
    backdrop-filter: blur(8px);
    box-shadow: 0 8px 24px var(--primary-shadow);
    max-width: 600px;
    width: 100%;
  }

  .form-body-content {
    min-height: 120px;
  }

}

/* Preview Button - Removed (Now in Header) */


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

/* ============================================
   ENHANCED COMPONENT LIST - 2 COLUMN GRID
   Atomic Design - 99+ SaaS Quality
   ============================================ */

/* Enhanced Search Box */
.search-wrapper-enhanced {
  padding: 8px 16px 12px;
  border-bottom: 1px solid var(--border-base);
}

.search-box-enhanced {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--bg-panel-alpha);
  border: 1px solid var(--border-base);
  border-radius: 8px;
  padding: 0px 10px;
  transition: all 0.2s;

  &:focus-within {
    border-color: var(--primary);
    background: var(--bg-deep-alpha);
    box-shadow: 0 0 0 3px var(--primary-bg-alpha);
  }
}

.search-icon-enhanced {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-right: 8px;
}

.search-input-enhanced {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 11px;
  color: var(--text-primary);
  font-weight: 500;

  &::placeholder {
    color: var(--text-tertiary);
  }
}

.search-shortcut {
  font-size: 10px;
  color: var(--text-tertiary);
  background: var(--bg-panel);
  border: 1px solid var(--border-base);
  border-radius: 4px;
  padding: 2px 6px;
  font-family: 'SF Mono', 'Monaco', 'Courier New', monospace;
}

/* Component List Container */
.component-list-enhanced {
  padding: 20px 12px 40px;
  overflow-y: auto;
  height: calc(100vh - var(--header-h) - 80px);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-base);
    border-radius: 10px;
  }
}

/* Category Section */
.comp-category-section {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
}

/* Category Title - Minimal & Uppercase */
.category-title-enhanced {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px 12px;
  margin-bottom: 8px;

  span {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: var(--text-tertiary);
  }

  .category-info-icon {
    font-size: 12px;
    color: var(--border-medium);
    cursor: help;
    transition: color 0.2s;

    &:hover {
      color: var(--primary);
    }
  }
}

/* 2-Column Grid Layout */
.comp-grid-2col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

/* Component Item Card - Clean & Functional Design */
.comp-item-card {
  height: 80px;
  border: 1px solid var(--border-base);
  border-radius: 8px;
  background: var(--bg-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: grab;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:active {
    cursor: grabbing;
    transform: scale(0.98);
  }

  &:hover {
    border-color: var(--primary);
    background: var(--primary-bg-alpha);
    transform: translateY(-1px);

    .comp-icon {
      color: var(--primary);
      transform: scale(1.1);
    }

    .comp-label {
      color: var(--text-primary);
    }
  }

  /* Highlight for Premium Components (e.g., Payment) */
  &.highlight {
    border-color: var(--primary-border-alpha);
    background: var(--primary-bg-alpha);

    .comp-icon {
      color: var(--primary-light);
    }

    .comp-label {
      color: var(--primary-lighter);
    }

    &:hover {
      border-color: var(--primary);
      background: var(--primary-bg-light);
    }
  }
}

.comp-icon {
  font-size: 18px;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.comp-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  text-align: center;
  line-height: 1.2;
}

/* Watermark Wrapper - CSS-only watermark */
.watermark-wrapper {
  position: relative;

  &[data-watermark]:not([data-watermark=""]):before {
    content: attr(data-watermark);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 48px;
    color: rgba(0, 0, 0, 0.04);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    z-index: 1;
  }
}
</style>
