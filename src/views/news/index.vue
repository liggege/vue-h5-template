<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="true"
      @load="onLoad"
    >
      <div class="news">
        <div class="list">
          <div
            v-for="item in newsList"
            :key="item.id"
            class="item"
            @click="onNavigate(item.id)"
          >
            <div class="pic">
              <van-image class="img" :src="item.imgUrl" />
            </div>
            <section class="title-body">
              <header class="title">{{ item.title }}</header>
            </section>
          </div>
        </div>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { newsListEffect } from './hooks/newsListEffect'

export default defineComponent({
  name: 'NewsList',
  setup() {
    const router = useRouter()
    const onNavigate = (id: string) => {
      router.push({
        path: `/newsDetail/${id}`
      })
    }
    const {
      loading,
      finished,
      refreshing,
      newsList,
      requestNewsList,
      onLoad,
      onRefresh
    } = newsListEffect()

    // requestNewsList()

    return {
      loading,
      finished,
      refreshing,
      newsList,
      onLoad,
      onRefresh,
      onNavigate
    }
  }
})
</script>

<style lang="scss" scoped>
.news {
  .list {
    .item {
      display: flex;
      flex-flow: row;
      flex-direction: row-reverse;
      align-items: center;
      margin: 12px 0px;
      padding: 20px 20px;
      overflow: hidden;
      background-color: #fff;
      border-bottom: 1px solid #ebebeb;
      .img {
        width: 216px;
        min-width: 216px;
        height: 160px;
        border-radius: 3px;
      }
      .title-body {
        padding-left: 0;
        padding-right: 10px;
        flex-grow: 1;
        .title {
          font-size: 36px;
          line-height: 1.5;
          color: #333333;
        }
      }
    }
  }
}
</style>
