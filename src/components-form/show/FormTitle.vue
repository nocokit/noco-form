<template>
  <div class="form-header">
    <div class="header-img" v-if="props.titleImageShow">
      <img :src="getImageUrl(props.titleImageUrl)" />
    </div>
    <section class="title-section" :style="computedStyle">
      <div class="title" :style="{
        'margin-top': props.titleSize === 'large' ? '16px' : (props.titleSize === 'middle' ? '10px' : '6px'),
        'margin-bottom': props.titleSize === 'large' ? '16px' : (props.titleSize === 'middle' ? '10px' : '6px'),
      }">
        <div class="title-val" :style="{
          'font-size': props.titleSize === 'large' ? '36px' : (props.titleSize === 'middle' ? '24px' : '18px'),
          'line-height': props.titleSize === 'large' ? '40px' : (props.titleSize === 'middle' ? '28px' : '22px'),
        }">{{ props.titleValue }}</div>
      </div>
      <div class="description" v-if="props.titleDescriptionShow">
        <div class="description-value" :style="{
          ...computedStyle,
         'font-size': props.titleSize === 'large' ? '16px' : (props.titleSize === 'middle' ? '14px' : '12px'),
        }"> {{ props.titleDescription }}</div>
      </div>
    </section>

  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { disableInputByDev } from '@/views/FormEditor/comp-config-data'

interface Props {
  id: string
  placeholder: string
  titleImageShow: boolean
  titleImageUrl: string
  titleValue: string
  titleSize: string
  titleDescriptionShow: boolean
  titleDescription: string
  titleDescriptionPosition: string
  titleDescriptionSize: string
  titleDescriptionColor: string
  titleDescriptionFontWeight: string
  titleDescriptionFontStyle: string
  value: string
  isDev: boolean
}

const props = defineProps<Props>()
const computedStyle = computed(() => ({
     'text-align': props.titleDescriptionPosition || 'center'
}));

const getImageUrl = (imgUrl: string) => {
  try {
    return new URL(`/src/assets/background/${imgUrl}`, import.meta.url).href;
  } catch (e) {
    // @ts-ignore
    const defaultUrl = props?.defUrl
    return new URL(`/src/assets/background/${defaultUrl}`, import.meta.url).href;
  }
}

onMounted(() => {
  if (props.isDev) {
    console.log('FormTitle mounted with props:', props)
  }

})


</script>
<style lang="scss" scoped>
  .header-img {
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
</style>