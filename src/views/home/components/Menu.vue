<template>
  <div
    class="row"
    v-for="(item, idx) in menuList"
    :key="idx"
    @click="onNavigate(item.url, item.link)"
  >
    <em>
      <img class="icon" :src="item.icon" />
    </em>
    <span class="title">{{ item.title }}</span>
    <em>
      <img class="arrow" :src="require('../../../assets/index/you.png')" />
    </em>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { MenuSutrct } from '../types/menuStruct-types'
import { Col, Row, Toast } from 'vant'

export default defineComponent({
  props: {
    menuList: {
      type: Array as PropType<MenuSutrct[]>,
      required: true,
      default: () => []
    }
  },
  setup() {
    const router = useRouter()
    const onNavigate = (name: string, link = false) => {
      if (!link) {
        router.push({ name })
      } else {
        location.href = name
      }
    }
    return { onNavigate }
  },
  components: {
    [Col.name]: Col,
    [Row.name]: Row
  }
})
</script>

<style lang="scss" scoped>
.row {
  background: #fff;
  height: 108px;
  line-height: 108px;
  margin: 18px 23px;
  padding: 0 23px;
  border: 1px solid #e9edee;
  position: relative;
  em {
    float: right;
    width: 15px;
    height: 27px;
    margin: 23px 12px 0 23px;
  }
  .icon {
    width: 49px;
    position: absolute;
    left: 38px;
    top: 30px;
  }
  .arrow {
    width: 15px;
    height: 27px;
    position: absolute;
    right: 35px;
    top: 42px;
  }
  .title {
    margin-left: 93px;
    font-size: 32px;
  }
}
</style>
