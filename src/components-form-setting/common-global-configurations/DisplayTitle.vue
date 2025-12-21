
<template>
  <div class="setting-item h-42">
    <span class="text-gray-500 secondary">
      表单标题
      <span class="relative inline-block group ml-1">
        <QuestionCircleOutlined class="cursor-help" />
        <span class="invisible group-hover:visible absolute z-10 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg -top-8 left-0 whitespace-nowrap">
          批量操作：针对有值的描述字段显示隐藏操作，没有赋值预览页面会自动隐藏
        </span>
      </span>
    </span>
    <div class="abs-r switch-r">
      <TwSwitch v-model="form.displayTitle" @change="changeValue" />
    </div>
  </div>

</template>
<script lang="ts" setup>
import { ref, watch, defineProps } from 'vue';
import { TwSwitch } from '@/components/ui'
import { useSelectCompStore  } from '@/stores/selectCompStore'

interface Props {
  form: any
}

const props = defineProps<Props>()
const form = ref(props.form)

const compStore = useSelectCompStore()

const changeValue = (value: boolean) => {
  compStore.updateGlobalFormConfig({
    displayTitle: value
  })
}

</script>
