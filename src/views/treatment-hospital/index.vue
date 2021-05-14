<template>
  <div class="hos">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="true"
        @load="onLoad"
      >
        <van-cell-group v-for="item in hospitalList" :key="item.id">
          <van-cell :title="item.name" :label="item.address" />
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { hospitalListEffect } from './hooks/hospitalListEffect'

export default defineComponent({
  name: 'TreatmentHospital',
  setup() {
    const {
      loading,
      finished,
      refreshing,
      hospitalList,
      requestHospitalList,
      onLoad,
      onRefresh
    } = hospitalListEffect()

    // requestHospitalList()

    return {
      loading,
      finished,
      refreshing,
      hospitalList,
      onLoad,
      onRefresh
    }
  }
})
</script>

<style lang="scss" scoped>
.hos {
  ::v-deep .van-cell {
    background-color: #f0f3f5;
    color: #4ba7f8;
    font-size: 18px;
  }
  ::v-deep .van-cell__label {
    font-size: 16px;
  }
  ::v-deep .van-cell-group {
    background-color: #f0f3f5;
    margin: 20px 2px;
    padding: 16px 6px;
  }
}
</style>
