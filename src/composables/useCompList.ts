import { type Ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { CompType, IgnoreLineNumberTypeList } from '@/views/FormEditor/comp-data'
import { getDefaultConfig } from '@/views/FormEditor/comp-config-data'
import { message } from 'ant-design-vue'

export function useCompList(pageCompList: Ref<any[]>) {

  const createCompInstance = (element: any): any => {
    const defaultComp = getDefaultConfig(element.type)
    return {
      ...defaultComp,
      ...element.value,
      id: element.id || uuidv4(),
      title: element.name,
      type: element.type,
      name: element.name,
    }
  }

  const updateCompLineNumber = () => {
    if (!Array.isArray(pageCompList.value)) return
    const pageCount = pageCompList.value.filter(item => item.type === CompType.paging).length
    let lineNumber = 0
    let pageNumber = 0
    for (const item of pageCompList.value) {
      if (!IgnoreLineNumberTypeList.includes(item.type)) {
        lineNumber++
        item.lineNumber = String(lineNumber).padStart(2, '0')
      }
      if (item.type === CompType.paging) {
        pageNumber++
        item.pagingValue = `第 ${pageNumber} 页 / 共 ${pageCount} 页`
      }
    }
  }

  const createCompByClick = (item: any) => {
    pageCompList.value.push(createCompInstance(item))
    updateCompLineNumber()
  }

  const onClone = (element: any) => createCompInstance(element)

  const updateDataListIndex = (index: number) => {
    const comp = pageCompList.value[index]
    if (Array.isArray(comp?.dataList)) {
      comp.dataList.forEach((item: any, i: number) => { item._index = i })
    }
  }

  const addItem = (type: 'new' | 'other', _item: any, index: number) => {
    const newDataItem = type === 'new'
      ? { label: '选项', value: '选项' }
      : { subType: 'other', label: '其他', value: '' }
    pageCompList.value[index].dataList.push(newDataItem)
    updateDataListIndex(index)
  }

  const compControl = (
    controlType: 'copy' | 'delete',
    value: any,
    activeCompId: Ref<string>,
  ) => {
    const index = pageCompList.value.findIndex(item => item.id === value.id)
    if (index === -1) {
      console.warn('没有查询到组件：', value.id)
      return
    }

    if (controlType === 'copy') {
      pageCompList.value.splice(index + 1, 0, { ...value, id: uuidv4() })
    }

    if (controlType === 'delete') {
      const [deleted] = pageCompList.value.splice(index, 1)
      activeCompId.value =
        pageCompList.value[index]?.id || pageCompList.value[index - 1]?.id || ''
      message.success(`【${deleted?.name}】删除成功！`, 1)
    }

    updateCompLineNumber()
  }

  return {
    createCompInstance,
    createCompByClick,
    onClone,
    addItem,
    compControl,
    updateCompLineNumber,
  }
}
