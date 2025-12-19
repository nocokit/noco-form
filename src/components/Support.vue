<template>
  <div class="support-content">
    <div class="support">
      <span class="logo">📝</span>
      <span class="des">
        noco-form 提供技术支持
      </span>
    </div>
  </div>

</template>
<script setup lang="ts">
interface Props {

}
const props = defineProps<Props>()

</script>

<style scoped lang="scss">
.support-content {
  position: relative;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 12px;
  color: #8f959e;

  .support {
    .logo {
      font-size: 18px;
      vertical-align: middle;
    }

    .des {
      padding-left: 8px;
      padding-top: 1px;
      vertical-align: middle;
    }
  }
}
</style>
