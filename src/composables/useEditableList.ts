import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export function useEditableList(dataList: any[]) {
  const _updateKey = ref('')

  const updateKey = () => {
    _updateKey.value = uuidv4()
  }

  const deleteSubItem = (index: number) => {
    dataList.splice(index, 1)
    updateKey()
  }

  const changeValue = (event: Event, index: number) => {
    const target = event.target as HTMLElement
    const innerText = target.innerText
    const hasData = innerText !== null && innerText !== '\n'
    const isOther = dataList[index].subType === 'other'
    const value = !hasData ? (isOther ? '其他' : '选项') : innerText

    if (dataList[index].label === value) return

    dataList[index].label = value
    if (!isOther) {
      dataList[index].value = value
    }

    updateKey()
  }

  return { _updateKey, deleteSubItem, changeValue }
}
