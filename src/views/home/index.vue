<template>
  <div class="home">
    <Banner :banner="bannerImg"></Banner>
    <Menu :menuList="menuList"></Menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Banner from './components/Banner.vue'
import Menu from './components/Menu.vue'
import { MenuSutrct } from './types/menuStruct-types'

export default defineComponent({
  name: 'Home',
  components: {
    Banner,
    Menu
  },
  setup() {
    const bannerImg = [{ img: require('../../assets/index/bannrt.png') }]
    const menuList = [
      {
        icon: require('../../assets/index/qa03.png'),
        title: '最新资讯',
        url: 'NewsList'
      },
      {
        icon: require('../../assets/index/qa02.png'),
        title: '居家监测管理',
        url: 'MonitorUser'
      },
      {
        icon: require('../../assets/index/qa01.png'),
        title: '个人主动申报',
        url: 'PersonalReport'
      },
      {
        icon: require('../../assets/index/qa07.png'),
        title: '宣恩县发热门诊通道',
        url: 'FeverClinic'
      },
      {
        icon: require('../../assets/index/qa08.png'),
        title: '宣恩县新冠肺炎定点收治医院',
        url: 'TreatmentHospital'
      },
      {
        icon: require('../../assets/index/qa09.png'),
        title: '宣恩县疫苗（预约）接种点',
        url: 'VaccinePoint'
      },
      {
        icon: require('../../assets/index/qa04.png'),
        title: '我要电话12320咨询',
        url: 'tel://12320',
        link: true
      },
      {
        icon: require('../../assets/index/qa05.png'),
        title: '我要投诉举报',
        url: 'tel://12320',
        link: true
      }
    ]
    return {
      bannerImg,
      menuList
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  background: #f5f5f5;
}
</style>
