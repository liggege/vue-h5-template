<template>
  <van-swipe :autoplay="3000" indicator-color="white" lazy-render>
    <van-swipe-item v-for="(item, idx) in banner" :key="idx">
      <van-image width="100%" :src="item.img" />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    banner: {
      type: Array as PropType<string[]>,
      required: true,
      default: () => []
    }
  }
})
</script>
