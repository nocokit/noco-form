<template>
  <div class="payment-wrapper" :class="{ 'component-hidden': hidden }" style="width: 100%; max-width: 100%; box-sizing: border-box;">
    <div class="space-y-4 p-6 bg-zinc-900/30 border border-zinc-800 rounded-3xl">
      <div class="flex items-center justify-between mb-2">
        <label class="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Payment Information</label>
        <div class="flex gap-2">
          <div class="w-8 h-5 bg-zinc-800 rounded-sm"></div>
          <div class="w-8 h-5 bg-zinc-800 rounded-sm"></div>
        </div>
      </div>
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl divide-y divide-zinc-800 overflow-hidden">
        <div class="px-4 py-3">
          <input
            v-model="cardNumber"
            type="text"
            placeholder="Card number"
            maxlength="19"
            class="w-full bg-transparent border-none outline-none text-sm text-zinc-300 placeholder:text-zinc-500 placeholder:italic focus:ring-0"
            :disabled="isDev || disabled || readonly"
            @input="formatCardNumber"
            @blur="handleBlur"
          />
        </div>
        <div class="flex divide-x divide-zinc-800">
          <div class="w-1/2 px-4 py-3">
            <input
              v-model="expiry"
              type="text"
              placeholder="MM / YY"
              maxlength="7"
              class="w-full bg-transparent border-none outline-none text-sm text-zinc-300 placeholder:text-zinc-500 placeholder:italic focus:ring-0"
              :disabled="isDev || disabled || readonly"
              @input="formatExpiry"
              @blur="handleBlur"
            />
          </div>
          <div class="w-1/2 px-4 py-3">
            <input
              v-model="cvc"
              type="text"
              placeholder="CVC"
              maxlength="4"
              class="w-full bg-transparent border-none outline-none text-sm text-zinc-300 placeholder:text-zinc-500 placeholder:italic focus:ring-0"
              :disabled="isDev || disabled || readonly"
              @input="handleInput"
              @blur="handleBlur"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { type DisplayMode } from '@/views/FormEditor/comp-config-data'

interface PaymentData {
  cardNumber: string
  expiry: string
  cvc: string
  cardholderName: string
}

interface Props {
  // 基础字段
  id?: string
  field?: string
  type?: string
  label?: string
  required?: boolean
  isDev?: boolean
  isSelected?: boolean
  isPreviewRender?: boolean
  dataValue?: PaymentData

  // 新增：响应式控制字段
  display?: DisplayMode
  hidden?: boolean
  disabled?: boolean
  readonly?: boolean

  // Payment 特有配置
  provider?: 'stripe' | 'alipay' | 'wechat' | 'custom'
  supportedCards?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  label: '支付信息',
  required: true,
  isDev: false,
  isSelected: false,
  isPreviewRender: false,
  provider: 'stripe'
})

const emit = defineEmits<{
  change: [value: PaymentData]
  update: [field: string, value: PaymentData]
}>()

const cardNumber = ref('')
const expiry = ref('')
const cvc = ref('')
const cardholderName = ref('')

const formatCardNumber = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\s/g, '').replace(/\D/g, '')

  // Add space every 4 digits
  const formatted = value.match(/.{1,4}/g)?.join(' ') || value
  cardNumber.value = formatted
  handleInput()
}

const formatExpiry = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\s/g, '').replace(/\D/g, '')

  if (value.length >= 2) {
    value = value.slice(0, 2) + ' / ' + value.slice(2, 4)
  }

  expiry.value = value
  handleInput()
}

// 处理输入变化
const handleInput = () => {
  emitPaymentData()
}

// 处理失焦
const handleBlur = () => {
  emitPaymentData()
}

// 触发支付数据更新
const emitPaymentData = () => {
  const paymentData: PaymentData = {
    cardNumber: cardNumber.value,
    expiry: expiry.value,
    cvc: cvc.value,
    cardholderName: cardholderName.value
  }

  emit('change', paymentData)
  if (props.field) {
    emit('update', props.field, paymentData)
  }
}

// 初始化数据
watch(() => props.dataValue, (newVal) => {
  if (newVal) {
    cardNumber.value = newVal.cardNumber || ''
    expiry.value = newVal.expiry || ''
    cvc.value = newVal.cvc || ''
    cardholderName.value = newVal.cardholderName || ''
  }
}, { immediate: true })
</script>

