<template>
  <van-tabs
    v-model:active="active"
    title-active-color="#0cb7f5"
    sticky
    animated
    swipeable
  >
    <van-tab title="疫苗说明" class="van-hairline--top">
      <div class="box1">
        <h3>接种效果</h3>
        <p>
          {{ info.effect }}
        </p>
        <van-divider dashed :style="{ borderColor: '#0cb7f5' }" />
        <h3>接种部位</h3>
        <p>{{ info.site }}</p>
        <van-divider dashed :style="{ borderColor: '#0cb7f5' }" />
        <h3>接种禁忌</h3>
        <p>{{ info.taboos }}</p>
        <van-divider dashed :style="{ borderColor: '#0cb7f5' }" />
        <h3>注意事项</h3>
        <p>
          {{ info.attention }}
        </p>
        <van-divider dashed :style="{ borderColor: '#0cb7f5' }" />
        <h3>可能反应</h3>
        <p>
          {{ info.reaction }}
        </p>
        <p class="tips">请以门诊医生接种操作为准</p>
      </div>
    </van-tab>
    <van-tab title="常见问题" class="van-hairline--top">
      <van-empty
        class="custom-image"
        :image="require('../../assets/no_data.png')"
        description="暂无常见问题"
      />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { Divider, Empty, Tab, Tabs } from 'vant'
import { vaccineInfoEffect } from './hooks/vaccinInfoEffect'

export default defineComponent({
  name: 'VaccineInfo',
  setup() {
    const route = useRoute()
    const id = route.params.id as string
    const { active, info, requestVaccineDetailInfo } = vaccineInfoEffect()
    requestVaccineDetailInfo(id)

    return {
      active,
      info
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Empty.name]: Empty,
    [Divider.name]: Divider
  }
})
</script>

<style lang="scss" scoped>
::v-deep(.van-tabs__line) {
  background-color: #0cb7f5;
}
::v-deep(.van-empty) {
  padding: 140px 0;
}

.box1 {
  padding: 0 28px 28px;
  text-align: justify;
  min-height: 75vh;
  overflow: auto;
  h3 {
    margin: 46px 0 16px;
    font-size: 38px;
    font-weight: normal;
  }
  p {
    font-size: 34px;
    color: #999;
    position: relative;
    line-height: 1.5;
  }
  .tips {
    padding-top: 28px;
    font-size: 28px;
    color: #999;
    text-align: center;
  }
}
</style>
