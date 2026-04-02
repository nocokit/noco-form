<template>
  <div class="form-editor">
    <div class="nav-data">
      <div class="header">
        <div class="title-data">
          <span class="name">Vue动态表单</span>
          <a-typography-text type="secondary" class='time'>编辑于2024-11-03 09:12</a-typography-text>
        </div>
        <div class="control">
          <div class="cont-item">
            <a-button type="default" @click="toGithub">
              <img class="btn-icon" src="@/assets/form-editor/github.svg" alt="">
              <span class="name">
                GitHub
              </span>
            </a-button>
          </div>
          <div class="cont-item">
            <a-button type="default" @click="handleSave">
              <img class="btn-icon" src="@/assets/form-editor/save.svg" alt="">
              <span class="name">
                保存
              </span>
            </a-button>
          </div>
          <div class="cont-item">
            <a-button type="primary">
              <img class="btn-icon" src="@/assets/form-editor/publish.svg" alt="">
              <span class="name">
                发布
              </span>
            </a-button>
          </div>

        </div>
      </div>
    </div>
    <div class="content editor-content">
      <SidebarComp @selectSideItemType="selectSideItemType" :currentSideItemType="currentSideItemType" />
      <div class="comps">
        <template v-if="currentSideItemType === 'theme'">
          <div class="theme">
            <div class="theme-item" v-for="item in themeList" :key="item.url" @click="selectThemeImg(item.url)">
              <img :src="getImageUrl(item.url)" alt="">
            </div>
          </div>
        </template>
        <template v-if="currentSideItemType === 'questionBank'">
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
          <div class="label">
            预览
          </div>

        </div>
        <div class="form" v-bind:class="{
          'no-data': !pageCompList?.length
        }">
          <div class="body">
            <a-watermark :content="selectForm?.displayWaterMark ? selectForm?.waterMarkText : ''">
              <div class="form-body form-body-content">
                <div class="comp-list-content">
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
                  :size="pageFooter.size" :style="{ 'padding': getSize, 'lineHeight': getLineHeight }">
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
import { generateCompListData } from './comp-list-generator'
import SidebarComp from '@/views/FormEditor/form-sidebar.vue'
import SettingComp from '@/views/FormEditor/form-setting.vue'
import PreviewPage from '@/views/Preview/index.vue'
import FormComponent from '@/components-form/index.vue'
import { getDefaultConfig } from '@/views/FormEditor/comp-config-data';
import { useSelectCompStore } from '@/stores/selectCompStore'
import { useRoute } from 'vue-router';
import { toGithub } from '@/utils/toGithub'
import { CheckOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import Icon from './comp-icon'
import { indexedDB } from '@/utils/indexedDB'


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

const currentSideItemType = ref('questionBank') // 当前侧边栏选中类型

const openDraw = ref(false)
// 优先使用动态生成的组件列表，回退到静态配置
const compList = generateCompListData().length > 0 ? generateCompListData() : CompListData
const globalData = ref()

const themeList = ref([{
  url: 'bg0.png',
},{
  url: 'bg1.png',
},{
  url: 'bg2.png',
},{
  url: 'bg3.png',
},{
  url: 'bg4.png',
},{
  url: 'bg5.png',
}])

const selectThemeImg = (url: string) => {
  useCompStore.updateGlobalFormConfig({
    bgImgUrl: url
  })
}

const getImageUrl = (imgUrl: string) => {
  try {
    return new URL(`/src/assets/background/${imgUrl}`, import.meta.url).href
  } catch (e) {
    const defaultUrl = 'bg0.png'
    return new URL(`/src/assets/background/${defaultUrl}`, import.meta.url).href
  }
}

const selectSideItemType = (item: string) => {
  currentSideItemType.value = item
}

/**
 * 编辑器编辑内容
 * 1. pageHeader // 底部配置
 * 2. pageCompList // 页面组件
 * 3. pageFooter // 底部提交按钮配置
 */

const footerSize = computed(() => pageFooter.value?.size)

const getSize = computed(() => {
  return footerSize.value === 'large' ? '0 26px' : (footerSize.value === 'small' ? '0 10px' : '0 16px')
})

const getLineHeight = computed(() => {
  return footerSize.value === 'large' ? '40px' : (footerSize.value === 'small' ? '24px' : '32px')
})

const pageCompList = ref<any[]>([]) // 页面组件内容
const pageHeader = ref<HeaderType>({
  id: '',
  titleValue: '标题名称',
  titleSize: 'middle',
  titleDescription: '柠檬轻表单，Github仓库已免费开源，感谢你的使用！',
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
  waterMarkText: '柠檬轻表单🍋',
}

const useCompStore = useSelectCompStore()

// 从 IndexedDB 加载表单数据
const loadFormData = async () => {
  try {
    const savedData = await indexedDB.getForm()
    if (savedData) {
      pageCompList.value = savedData.pageCompList || []
      if (savedData.pageHeader) {
        pageHeader.value = savedData.pageHeader
      }
      if (savedData.pageFooter) {
        pageFooter.value = savedData.pageFooter
      }
      if (savedData.globalConfig) {
        useCompStore.initGlobalFormConfig(savedData.globalConfig)
      }
    }
  } catch (error) {
    console.error('加载表单数据失败:', error)
  }
}

// 保存表单数据到 IndexedDB
const saveFormData = async () => {
  try {
    await indexedDB.saveForm({
      pageCompList: pageCompList.value,
      pageHeader: pageHeader.value,
      pageFooter: pageFooter.value,
      globalConfig: useCompStore.currentGlobalFormConfig
    })
  } catch (error) {
    console.error('保存表单数据失败:', error)
  }
}

onMounted(async () => {
  useCompStore.initGlobalFormConfig({ ...defaultFormConfig })
  globalData.value = useCompStore.currentGlobalFormConfig
  // 组件初始化
  // @ts-ignore
  pageHeader.value = getDefaultConfig(CompType.formTitle, true)
  pageHeader.value.id = uuidv4()
  // @ts-ignore
  pageFooter.value = getDefaultConfig(CompType.button)
  pageFooter.value.id = uuidv4()

  // 加载保存的数据
  await loadFormData()
})

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
watch(() => useCompStore.currentCompKey, (newValue) => {
  updateCompKey.value = newValue
})


watch([() => useCompStore.compConfig, () => useCompStore.currentGlobalFormConfig], ([compConfig, currentGlobalFormConfig]) => {
  updateCompByChange({
    ...compConfig,
  })
  selectForm.value = currentGlobalFormConfig
})


const updateCompLineNumber = () => {
  if (!Array.isArray(pageCompList.value)) return
  const pageCount = pageCompList.value.filter(item => item.type === CompType.paging).length
  let lineNumber = 0
  let pageNumber = 0
  for (const item of pageCompList.value) {
    if (!IgnoreLineNumberTypeList.includes(item.type)) {
      lineNumber++
      item.lineNumber = lineNumber < 10 ? '0' + lineNumber : lineNumber
    }
    if (item.type === CompType.paging) {
      pageNumber++
      item.pagingValue = `第 ${pageNumber} 页 / 共 ${pageCount} 页`
    }
  }
}

watch(pageCompList, () => {
  updateCompLineNumber()
  saveFormData()
}, { deep: true })

// 监听全局配置变化，自动保存
watch(() => useCompStore.currentGlobalFormConfig, () => {
  saveFormData()
}, { deep: true })

const createByClickOrClone = (element: any) => {
  const defaultComp: any = getDefaultConfig(element.type)
  return {
    ...defaultComp,
    ...element.value,
    id: element.id || uuidv4(),
    title: element.name,
    type: element.type,
    name: element.name
  }
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
  useCompStore.initCurrentComp(item)
  activeComp.value.id = item.id
}

const updateDataListIndex = (index: number) => {
  if (index > -1 && Array.isArray(pageCompList.value[index]?.dataList)) {
    pageCompList.value[index].dataList.forEach((item: any, i: number) => {
      item._index = i
    })
  }
}

const addItem = (type: 'new' | 'other', _item: any, index: number) => {
  const isNewBool = type === 'new'
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
  const index = pageCompList.value.findIndex((item: any) => item.id === value.id)
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
    activeComp.value.id = pageCompList.value[index]?.id || pageCompList.value[index - 1]?.id || ''
    deleteSuccess(deleteComp?.[0]?.name)
  }
  initDataState()
  updateCompLineNumber()
}


const getActiveComp = () => {
  // 组件列表
  const item = pageCompList.value.find((item: any) => item.id === activeComp.value.id)
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
  return pageCompList.value.findIndex((item: any) => item.id === activeComp.value.id)
}

const handleDragHandle = (e: any) => {
  e.preventDefault()
  const { type } = e
  noDataContentRef.value = type
}

const handleSave = async () => {
  try {
    await saveFormData()
    message.success('保存成功！', 1)
  } catch (error) {
    message.error('保存失败，请重试', 1)
  }
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

.nav-data {
  height: 56px;
  line-height: 1;
  box-shadow: inset 0 -1px 0 #e7e7e7;
  padding: 0 50px;

  .title-data {
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-size: 16px;
  }
}

.editor-content {
  display: grid;
  grid-template-columns: 56px 270px 1fr 260px;
  padding: 0 0 0 0px;
  height: calc(100% - 86px);

  @media(max-width: 1400px) {
    grid-template-columns: 56px 260px 1fr 250px;
    overflow-x: auto;

    .form {
      width: auto;
    }
  }

      ::v-deep(.content .compList .item) {
      font-size: 14px;
    }
}

.content {

  /* background-image: url(/src/assets/form-editor/bg-body.png); */

  .category-title {
    font-weight: 600;
    color: rgba(0, 0, 0, .65);
    padding: 15px 0px 15px;
    font-size: 14px;
    user-select: none;
  }

  .comps {
    padding: 0 20px 0 20px;
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
      /* border: 1px solid #D7D9DC; */
      /* background: rgba(0, 102, 255, .08); */
      cursor: pointer;
      height: 38px;
      line-height: 38px;
      text-align: left;
      padding: 0px 2px 0 10px;
      border-radius: 5px;
      /* color: #141E31; */
      color: rgba(0, 0, 0, 0.45);
      font-size: 15px;
      font-weight: 400;
      border: 1px solid #dcdcdcc4;
      background: #fff;
      // box-shadow: 0 0px 2px #4096ff6e;
      &:hover {
        border-color: royalblue;
      }

        @media(max-width: 1400px) {
          font-size: 14px;
        }
    }

    &.hover {
      .item {
        color: #151b26 !important;
      }
    }

  }

  .editor {
    position: relative;
    /* background: lavender; */
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    background-image: url(./bg.png);
    background-repeat: round;
  }

  .theme {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 10px;
    padding: 20px 2px;

    .theme-item {
      display: flex;
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
    /* background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px;
    background-image: linear-gradient(rgba(200,205,208,.2) 1px,transparent 0),linear-gradient(90deg,rgba(200,205,208,.1),1px,transparent 0),linear-gradient(rgba(200,205,208,.1) 1px,transparent 0),linear-gradient(90deg,rgba(200,205,208,.1) 1px,transparent 0); */
    height: 100%;
    border-radius: 6px;
    padding: 20px;
    background: #ffffff;



    .form-header {
      padding: 0;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 220px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      }

      .title {
        text-align: center;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.8);
        font-weight: 600;
        margin-bottom: 10px;
      }

      .description {
        font-size: 14px;
        text-align: center;
        color: rgba(0, 0, 0, 0.8);
        margin: 10px;
      }
    }
  }

  .form {
    margin: 10px 30px;
    /* background: #fff; */
    min-height: calc(100% - 10px);
    border-radius: 0px;
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

  .form-item {
    position: relative;
    background: #fff;
  }



  .active-comp {
    /* background: mintcream; */
    /* border-left: 6px solid red;
    border-color: teal; */
    /* background: aliceblue; */
    /* border-bottom: 1px dashed #ccc;
    border-top: 1px dashed #ccc; */
    /* border: 1px dashed #1677ff; */
    /* background: lightyellow; */
    background: aliceblue;
    /* darkseagreen; */
    border-radius: 5px;
    position: relative;
    box-shadow: 0px 4px 16px 4px rgba(31, 35, 41, 0.03), 0px 4px 8px 0px rgba(31, 35, 41, 0.02), 0px 2px 4px -4px rgba(31, 35, 41, 0.02);
    border: 1px dashed #94b4ff;

    &::before {
      content: '';
      /* border: 4px solid teal; */
      height: 100%;
      display: block;
      width: 4px;
      /* background: teal; */
      /* background: cornflowerblue; */
      /* background: #1677ff; */
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
    width: calc(100% - 0px);


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
      /* 不换行 */
      overflow: hidden;
      /* 隐藏超出部分 */
      text-overflow: ellipsis;
      /* 显示省略号 */
    }
  }
}

.preview-control {
  position: fixed;
  box-shadow: 0 0 6px rgba(0, 0, 0, .08);
  color: #666;
  width: 50px;
  height: 55px;
  top: 0;
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

::v-deep(.ant-drawer-bottom>.ant-drawer-content-wrapper) {
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
