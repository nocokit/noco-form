<template>
  <div class="form-editor">
    <div class="nav-data">
      <div class="header">
        <div class="logo-title">
          <img class="logo" src="@/assets/logo.png" alt="logo">
          <div class="title-data">
            <span class="name">Noco-Form</span>
            <a-typography-text type="secondary" class="time">by nocokit</a-typography-text>
          </div>
        </div>
        <div class="control">
          <div class="cont-item">
            <a-button type="default" @click="toGithub">
              <img class="btn-icon" src="@/assets/form-editor/github.svg" alt="">
              <span class="name">GitHub</span>
            </a-button>
          </div>
          <div class="cont-item">
            <a-button type="primary" @click="handleSave">
              <img class="btn-icon" src="@/assets/form-editor/publish.svg" alt="">
              <span class="name">保存</span>
            </a-button>
          </div>
          <!-- <div class="cont-item">
            <a-button type="primary">
              <img class="btn-icon" src="@/assets/form-editor/publish.svg" alt="">
              <span class="name">发布</span>
            </a-button>
          </div> -->
        </div>
      </div>
    </div>

    <div class="content editor-content">
      <SidebarComp @selectSideItemType="onSideItemSelect" :currentSideItemType="currentSideItemType" />

      <div class="comps">
        <template v-if="currentSideItemType === 'theme'">
          <div class="theme">
            <div class="theme-item" v-for="item in themeList" :key="item.url" @click="selectThemeImg(item.url)">
              <img :src="getImageUrl(item.url)" alt="">
            </div>
          </div>
        </template>

        <template v-if="currentSideItemType === 'questionBank'">
          <div class="comp-category-item" v-for="compCategory in compList" :key="compCategory.name">
            <div class="category-title">
              {{ compCategory.name }}
              <a-tooltip placement="top" v-if="compCategory.tooltip">
                <template #title><span>{{ compCategory.tooltip }}</span></template>
                <QuestionCircleOutlined />
              </a-tooltip>
            </div>
            <VueDraggable
              v-model="compCategory.children"
              :animation="0"
              :group="{ name: 'sevenBotForm', pull: 'clone', put: false }"
              :sort="false"
              :clone="onClone"
              class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded compList"
            >
              <div
                v-for="item in compCategory.children"
                :key="item.type"
                class="cursor-move h-50px bg-gray-500/5 item"
                :class="{
                  person: compCategory.type === 'Personal Component',
                  advanced: compCategory.type === 'Advanced Component',
                  layout: compCategory.type === 'Layout Component',
                }"
                @click="createCompByClick(item)"
              >
                <img class="icon" :src="item.icon" alt="" v-if="item.icon">
                {{ item.label }}
              </div>
            </VueDraggable>
          </div>
        </template>
      </div>

      <div class="editor" :style="{ 'background-image': `url(${getImageUrl(selectForm?.bgImgUrl)})` }">
        <div class="preview-control" title="预览" @click="preview">
          <img :src="Icon.Preview" alt="">
          <div class="label">预览</div>
        </div>

        <div class="form" :class="{ 'no-data': !pageCompList?.length }">
          <div class="body">
            <a-watermark :content="selectForm?.displayWaterMark ? selectForm?.waterMarkText : ''">
              <div class="form-body form-body-content">
                <div class="comp-list-content">
                  <VueDraggable
                    v-model="pageCompList"
                    :animation="150"
                    group="sevenBotForm"
                    ghostClass="ghost"
                    handle=".handle"
                    class="flex flex-col gap-2 p-4 w-300px max-h-350px m-auto bg-gray-500/5 rounded overflow-auto form-body"
                  >
                    <template v-if="!pageCompList?.length">
                      <div @dragenter="handleDragEnter" @mouseleave="resetDragState" @dragleave="resetDragState">
                        <div class="no-data-content" :class="{ dragenter: isDragEnter }">
                          <span class="text">点击左侧题目 / 拖拽题目到此区域</span>
                        </div>
                      </div>
                    </template>

                    <template v-else>
                      <div
                        v-for="(item, index) in pageCompList"
                        :key="item?.id"
                        class="cursor-move form-item"
                        :class="{ 'active-comp': activeCompId === item?.id }"
                        @click="selectComp(item)"
                      >
                        <FormComponent
                          :key="item?.id"
                          @compControl="onCompControl"
                          @addItem="addItem($event, item, index)"
                          :component="item"
                          :formConfig="selectForm"
                          :type="item?.type"
                          :isDev="isFormEditorDev"
                          :selectedComp="activeComp"
                        />
                      </div>
                    </template>
                  </VueDraggable>
                </div>
              </div>

              <div
                v-if="globalData?.displayBtn"
                class="form-footer form-item"
                :class="{ 'active-comp': activeCompId === pageFooter.id }"
                :style="{ 'text-align': pageFooter.position || 'left' }"
                @click="selectComp(pageFooter)"
              >
                <a-button
                  class="submit"
                  type="primary"
                  :icon="pageFooter.buttonIconShowBool ? h(CheckOutlined) : null"
                  :size="pageFooter.size"
                  :style="{ padding: footerPadding, lineHeight: footerLineHeight }"
                >
                  {{ pageFooter.buttonText || '提交' }}
                </a-button>
              </div>
            </a-watermark>
          </div>
        </div>
      </div>

      <SettingComp
        v-if="selectForm"
        :currentCompId="activeCompId"
        :key="activeCompId + updateCompKey"
        :selectForm="selectForm"
        :selectComp="activeComp"
      />
    </div>
  </div>

  <PreviewPage
    v-if="openPreview && selectForm"
    :selectForm="selectForm!"
    :open="openPreview"
    :pageCompList="pageCompList"
    :pageFooter="pageFooter"
    @onClose="openPreview = false"
  />

  <a-drawer
    title="逻辑配置"
    placement="right"
    :width="760"
    :open="logicDrawerOpen"
    @close="logicDrawerOpen = false"
    :destroyOnClose="false"
  >
    <LogicPanel :pageCompList="pageCompList" />
  </a-drawer>

  <JsonPreviewModal v-model:open="jsonModalOpen" :data="jsonSnapshot" />
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { VueDraggable } from 'vue-draggable-plus'
import { CheckOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRoute } from 'vue-router'

import { CompListData, CompType } from './comp-data'
import { generateCompListData } from './comp-list-generator'
import { getDefaultConfig } from './comp-config-data'
import Icon from './comp-icon'
import SidebarComp from './form-sidebar.vue'
import SettingComp from './form-setting.vue'
import LogicPanel from './LogicPanel.vue'
import JsonPreviewModal from './JsonPreviewModal.vue'

import FormComponent from '@/components-form/index.vue'
import PreviewPage from '@/views/Preview/index.vue'
import { useSelectCompStore } from '@/stores/selectCompStore'
import { useFormPersistence } from '@/composables/useFormPersistence'
import { useCompList } from '@/composables/useCompList'
import { toGithub } from '@/utils/toGithub'

interface HeaderType {
  id: string
  type: string
  titleValue: string
  titleSize: string
  titleDescription: string
  titleImageUrl: string
  defUrl: string
  titleDescriptionShow: boolean
  titleImageShow: boolean
  titleDescriptionPosition: 'left' | 'right' | 'center'
}

interface FooterType {
  id: string
  size: 'large' | 'middle' | 'small'
  buttonText: string
  position: 'left' | 'right' | 'center'
  buttonIconShowBool: boolean
}

const compStore = useSelectCompStore()

const currentSideItemType = ref('questionBank')
const openPreview = ref(false)
const logicDrawerOpen = ref(false)
const jsonModalOpen = ref(false)
const jsonSnapshot = ref<unknown>(null)
const isDragEnter = ref(false)
const updateCompKey = ref('')
const activeCompId = ref('')
const selectForm = ref<Record<string, any>>()
const globalData = ref<Record<string, any>>()

const pageCompList = ref<any[]>([])
const pageHeader = ref<HeaderType>({
  id: '',
  titleValue: '标题名称',
  titleSize: 'middle',
  titleDescription: 'Noco-Form，Github仓库已免费开源，感谢你的使用！',
  titleImageUrl: 'bg.png',
  defUrl: 'bg.png',
  type: '',
  titleDescriptionShow: true,
  titleImageShow: true,
  titleDescriptionPosition: 'center',
})
const pageFooter = ref<FooterType>({
  id: '',
  size: 'large',
  position: 'left',
  buttonText: '提交',
  buttonIconShowBool: true,
})

const compList = generateCompListData().length > 0 ? generateCompListData() : CompListData
const themeList = [
  { url: 'bg0.png' }, { url: 'bg1.png' }, { url: 'bg2.png' },
  { url: 'bg3.png' }, { url: 'bg4.png' }, { url: 'bg5.png' },
]

const { loadFormData, saveFormData } = useFormPersistence(pageCompList, pageHeader, pageFooter)
const { createCompByClick, onClone, addItem, compControl, updateCompLineNumber } = useCompList(pageCompList)

const isFormEditorDev = computed(() => useRoute().path.includes('form-editor'))

const footerPadding = computed(() => {
  const s = pageFooter.value.size
  return s === 'large' ? '0 26px' : s === 'small' ? '0 10px' : '0 16px'
})

const footerLineHeight = computed(() => {
  const s = pageFooter.value.size
  return s === 'large' ? '40px' : s === 'small' ? '24px' : '32px'
})

const activeComp = computed(() => {
  const inList = pageCompList.value.find(item => item.id === activeCompId.value)
  if (inList) return inList
  if (activeCompId.value === pageFooter.value.id) return pageFooter.value
  if (activeCompId.value === pageHeader.value.id) return pageHeader.value
  return undefined
})

const getImageUrl = (imgUrl?: string) => {
  try {
    return new URL(`/src/assets/background/${imgUrl || 'bg0.png'}`, import.meta.url).href
  } catch {
    return new URL('/src/assets/background/bg0.png', import.meta.url).href
  }
}

const selectThemeImg = (url: string) => compStore.updateGlobalFormConfig({ bgImgUrl: url })

const selectComp = (item: any) => {
  compStore.initCurrentComp(item)
  activeCompId.value = item.id
}

const onCompControl = (type: string, compData: any) => {
  compControl(type as 'copy' | 'delete', compData, activeCompId)
  if (type === 'delete' && activeCompId.value === '') {
    compStore.initCurrentComp({})
  }
}

const handleDragEnter = () => { isDragEnter.value = true }
const resetDragState = () => { isDragEnter.value = false }

const onSideItemSelect = (type: string) => {
  if (type === 'logic') {
    logicDrawerOpen.value = true
  } else {
    currentSideItemType.value = type
  }
}

const handleSave = async () => {
  try {
    await saveFormData()
    jsonSnapshot.value = {
      pageCompList: pageCompList.value,
      pageHeader: pageHeader.value,
      pageFooter: pageFooter.value,
      globalConfig: compStore.currentGlobalFormConfig,
    }
    jsonModalOpen.value = true
  } catch {
    message.error('保存失败，请重试', 1)
  }
}

const preview = () => { openPreview.value = true }

watch(() => compStore.currentCompKey, val => { updateCompKey.value = val })

watch(
  [() => compStore.compConfig, () => compStore.currentGlobalFormConfig],
  ([compConfig, globalConfig]) => {
    const index = pageCompList.value.findIndex(item => item.id === (compConfig as any).id)
    if (index > -1) {
      pageCompList.value[index] = { ...pageCompList.value[index], ...compConfig }
    }
    selectForm.value = globalConfig as Record<string, any>
  },
)

watch(pageCompList, updateCompLineNumber, { deep: true })

onMounted(async () => {
  const defaultFormConfig = {
    displayNumberSort: true,
    displayDescription: true,
    displayTitle: true,
    displayBtn: true,
    displayWaterMark: false,
    waterMarkText: 'Noco-Form',
  }
  compStore.initGlobalFormConfig({ ...defaultFormConfig })
  globalData.value = compStore.currentGlobalFormConfig as Record<string, any>
  selectForm.value = compStore.currentGlobalFormConfig as Record<string, any>

  // @ts-ignore
  pageHeader.value = { ...getDefaultConfig(CompType.formTitle, true), id: uuidv4() }
  // @ts-ignore
  pageFooter.value = { ...getDefaultConfig(CompType.button), id: uuidv4() }

  await loadFormData()
})
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

.nav-data {
  height: 56px;
  line-height: 1;
  box-shadow: inset 0 -1px 0 #e7e7e7;
  padding: 0 16px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .logo-title {
    display: flex;
    align-items: center;
    gap: 12px;

    .logo {
      width: 36px;
      height: 36px;
    }
  }

  .title-data {
    display: flex;
    flex-direction: column;
    font-size: 16px;

    .name {
      font-weight: 600;
      font-size: 16px;
      line-height: 1.4;
    }

    .time {
      font-size: 12px;
      line-height: 1.4;
    }
  }
}

.editor-content {
  display: grid;
  grid-template-columns: 56px 270px 1fr 260px;
  height: calc(100% - 86px);

  @media (max-width: 1400px) {
    grid-template-columns: 56px 260px 1fr 250px;
    overflow-x: auto;

    .form { width: auto; }
  }

  ::v-deep(.content .compList .item) {
    font-size: 14px;
  }
}

.content {
  .category-title {
    font-weight: 600;
    color: rgba(0, 0, 0, .65);
    padding: 15px 0;
    font-size: 14px;
    user-select: none;
  }

  .comps {
    padding: 0 20px;
    background: #fafafa;
    max-height: 100%;
    overflow-y: auto;
  }

  .compList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin-bottom: 15px;
    user-select: none;

    .item {
      cursor: pointer;
      height: 38px;
      line-height: 38px;
      text-align: left;
      padding: 0 2px 0 10px;
      border-radius: 5px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 15px;
      font-weight: 400;
      border: 1px solid #dcdcdcc4;
      background: #fff;

      &:hover { border-color: royalblue; }

      @media (max-width: 1400px) { font-size: 14px; }
    }
  }

  .editor {
    position: relative;
    height: 100%;
    overflow-y: auto;
    background-image: url(./bg.png);
    background-repeat: round;
  }

  .theme {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px 2px;

    .theme-item {
      flex: 0 0 100%;
      cursor: pointer;

      img {
        height: 120px;
        width: 100%;
        border-radius: 5px;
      }
    }
  }

  .body {
    height: 100%;
    border-radius: 6px;
    padding: 20px;
    background: #ffffff;
  }

  .form {
    margin: 10px 30px;
    min-height: calc(100% - 10px);
    border-radius: 0;
    width: 686px;
    position: absolute;
    transform: translateX(-50%);
    margin-left: 50%;
    display: grid;
    padding-bottom: 10px;

    .sortable-chosen:not(.active-comp) {
      background: aliceblue;
      border-radius: 4px;
      border: 1px dashed #94b4ff;
      width: 100%;
      padding: 48px 50px;
      height: 116px;
      text-align: center;
      margin: 2px 0;
      z-index: 0;
    }

    &.no-data .sortable-chosen {
      margin: 2px;
      width: calc(100% - 4px);
    }
  }

  .form-item {
    position: relative;
    background: #fff;
  }

  .active-comp {
    background: aliceblue;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 4px 16px 4px rgba(31, 35, 41, 0.03), 0 4px 8px rgba(31, 35, 41, 0.02),
      0 2px 4px -4px rgba(31, 35, 41, 0.02);
    border: 1px dashed #94b4ff;

    &::before {
      content: '';
      height: 100%;
      display: block;
      width: 4px;
      height: 100%;
      position: absolute;
    }
  }

  .no-data-content {
    border: 1px dashed #cdcdcd;
    text-align: center;
    border-radius: 4px;
    color: #666;
    padding: 50px 100px;
    position: absolute;
    top: -2px;
    width: 100%;

    &:hover,
    &.dragenter {
      border-color: #1677ff;
      color: #1677ff;
      z-index: 1000;
    }
  }

  .form-body-content {
    min-height: 120px;
  }

  .form-footer {
    height: 90px;
    line-height: 90px;
    padding: 0 60px;
    width: 100%;
    margin-top: 20px;
  }

  ::v-deep(.form-footer) {
    .submit {
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.preview-control {
  position: fixed;
  box-shadow: 0 0 6px rgba(0, 0, 0, .08);
  color: #666;
  width: 50px;
  height: 55px;
  text-align: center;
  font-size: 14px;
  padding: 5px 4px;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #fff;
  transform: translateX(388px);
  left: 50%;
  top: 66px;

  img {
    width: 24px;
    height: 24px;
  }

  .label {
    font-size: 12px;
    padding-top: 5px;
  }

  &:hover {
    color: #1677ff;
    background: #fafafa;
  }
}

::v-deep(.ant-drawer-bottom > .ant-drawer-content-wrapper) {
  height: calc(100% - 50px) !important;
}

.control {
  position: absolute;
  right: 6px;
  top: 12px;
  display: flex;
  flex-grow: 2;

  .cont-item {
    cursor: pointer;
    margin-right: 10px;
  }

  .btn-icon {
    width: 18px;
    padding: 0;
    margin-top: -2px;
    filter: grayscale(1);
  }

  &:hover .btn-icon {
    filter: grayscale(0);
  }

  .name {
    padding: 0 4px;
  }
}

.comp-list-content {
  position: relative;
  min-height: 130px;
}
</style>
