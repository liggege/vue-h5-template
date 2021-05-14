<template>
  <div>
    <van-nav-bar
      id="van-nav-bar"
      :title="navTitle"
      safe-area-inset-top
      left-arrow
      fixed
      @click="onNavigate()"
    />
    <div ref="root" class="scroll-wrapper">
      <div class="scroll-content">
        <div class="ignore-empty-el"></div>
        <div class="news">
          <div class="title">{{ newsDetailInfo.title }}</div>
          <div class="head">
            <span>{{ newsDetailInfo.pushTime }}</span>
            <span> · </span>
            <span>{{ newsDetailInfo.origin }}</span>
          </div>
          <div class="content" v-html="newsDetailInfo.content"></div>
          <div class="footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { newsDetailEffect } from './hooks/newsDetailEffect'

export default defineComponent({
  name: 'NewsDetail',
  setup() {
    const route = useRoute()
    const newId = route.params.id as string
    const {
      newsDetailInfo,
      requestNewsDetail,
      onNavigate,
      root,
      navTitle,
      init
    } = newsDetailEffect()

    requestNewsDetail(newId)

    watch(newsDetailInfo, () => {
      nextTick(() => {
        init()
      })
    })

    return {
      newsDetailInfo,
      onNavigate,
      navTitle,
      root
    }
  }
})
</script>

<style lang="scss">
#van-nav-bar {
  .van-icon {
    color: #969799;
  }
  .van-nav-bar__title {
    max-width: 74%;
  }
}
.scroll-wrapper {
  overflow: hidden;
  position: fixed;
  top: 0;
}
.ignore-empty-el {
  height: 58px;
}
.news {
  background-color: #ffffff;
  padding: 0 20px;
  .title {
    font-size: 32px;
    line-height: 1.5;
  }
  .head {
    padding: 15px 0;
    font-size: 28px;
    line-height: 1;
    color: #b3b3b3;
  }
  .footer {
    height: 50px;
  }
}
</style>
