<template>
  <div class="data-list-manager">
    <section class="options-section">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-title-wrapper">
          <i class="ri-list-check-2"></i>
          <span class="section-title">选项管理</span>
        </div>
        <button class="batch-edit-btn" @click="handleBatchEdit">批量编辑</button>
      </div>

      <!-- Options List -->
      <VueDraggable
        v-if="comp.dataList.length"
        v-model="comp.dataList"
        :animation="150"
        ghostClass="ghost"
        handle=".drag-handle"
        class="options-list"
      >
        <div
          v-for="(item, index) in comp.dataList"
          :key="item.value + index"
          class="option-item"
        >
          <!-- Drag Handle -->
          <div class="drag-handle">
            <i class="ri-draggable"></i>
          </div>

          <!-- Input Field -->
          <div class="option-input-wrapper">
            <input
              type="text"
              :value="item.value"
              @input="updateOptionValue($event, index)"
              class="option-input"
              placeholder="选项内容"
            />
          </div>

          <!-- Delete Button -->
          <button
            class="delete-btn"
            @click="deleteOption(index)"
            :disabled="comp.dataList.length <= 1"
          >
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </VueDraggable>

      <!-- Add Option Button -->
      <button class="add-option-btn" @click="addOption">
        <i class="ri-add-line"></i>
        添加新选项
      </button>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus'

interface Props {
  comp: any
}

const props = defineProps<Props>()
const emit = defineEmits(['batchEdit'])

const dataList = ref(props.comp.dataList)

watch(
  () => props.comp.dataList,
  (newValue: any) => {
    dataList.value = newValue
  }
)

// Update option value
const updateOptionValue = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  props.comp.dataList[index].value = target.value
  props.comp.dataList[index].label = target.value
}

// Delete option
const deleteOption = (index: number) => {
  if (props.comp.dataList.length > 1) {
    props.comp.dataList.splice(index, 1)
  }
}

// Add new option
const addOption = () => {
  const newIndex = props.comp.dataList.length + 1
  props.comp.dataList.push({
    label: `选项${newIndex}`,
    value: `选项${newIndex}`,
    _index: newIndex - 1
  })
}

// Handle batch edit
const handleBatchEdit = () => {
  emit('batchEdit')
}
</script>

<style scoped>
.data-list-manager {
  margin-bottom: 0;
}

.options-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.section-title-wrapper i {
  font-size: 14px;
  color: #71717a;
}

.section-title {
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #71717a;
}

.batch-edit-btn {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #3b82f6;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.batch-edit-btn:hover {
  color: #60a5fa;
}

/* Options List */
.options-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

/* Drag Handle */
.drag-handle {
  cursor: grab;
  color: #52525b;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  flex-shrink: 0;
}

.drag-handle:active {
  cursor: grabbing;
}

.drag-handle:hover {
  color: #71717a;
}

.drag-handle i {
  font-size: 16px;
}

/* Input Wrapper */
.option-input-wrapper {
  flex: 1;
  position: relative;
}

.option-input {
  width: 100%;
  background: rgba(24, 24, 27, 0.5);
  border: 1px solid #27272a;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  color: #a1a1aa;
  transition: all 0.2s;
}

.option-input:focus {
  outline: none;
  background: #18181b;
  border-color: #3f3f46;
}

.option-input::placeholder {
  color: #52525b;
}

/* Delete Button */
.delete-btn {
  opacity: 0;
  color: #52525b;
  background: transparent;
  border: none;
  padding: 4px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.option-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  color: #f87171;
}

.delete-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.delete-btn:disabled:hover {
  color: #52525b;
}

.delete-btn i {
  font-size: 14px;
}

/* Add Option Button */
.add-option-btn {
  width: 100%;
  padding: 8px 12px;
  background: #18181b;
  border: 1px dashed #27272a;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  color: #71717a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.add-option-btn:hover {
  background: #27272a;
  color: #f4f4f5;
  border-color: #3f3f46;
}

.add-option-btn i {
  font-size: 14px;
}

/* Ghost class for dragging */
:deep(.ghost) {
  opacity: 0.5;
  background: #27272a;
  border-radius: 8px;
}
</style>
