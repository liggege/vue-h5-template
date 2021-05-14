<template>
  <div class="main">
    <van-image :src="require('../../assets/success02.png')"></van-image>
    <div class="message">提交成功</div>
    <div class="desc">
      我们会对您的信息持续跟踪，在潜伏期（自接触日起14天）内，请您留意填写监测指标。如您有任何疑问，请拨打025-1230咨询
    </div>
    <div class="bottom-button" @click="onNavigate">返回首页</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Empty } from 'vant'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MonitorSuccess',
  setup() {
    const router = useRouter()
    const onNavigate = () => {
      router.push({ path: '/' })
    }
    return {
      onNavigate
    }
  },
  components: {
    [Empty.name]: Empty
  }
})
</script>

<style lang="scss" scoped>
.main {
  margin: 120px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ::v-deep .van-image__img {
    width: 90px;
    height: 90px;
  }
  .message {
    margin-bottom: 35px;
    line-height: 1.5;
    font-size: 40px;
    color: #323233;
  }
  .desc {
    background-color: #ffe4c4a1;
    padding: 30px;
    line-height: 1.5;
    font-size: 34px;
    color: #323233;
  }
  .bottom-button {
    color: #1989fa;
    margin-top: 35px;
    line-height: 1.5;
    font-size: 40px;
  }
}
</style>
