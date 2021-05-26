import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/home/index.vue'),
    meta: {
      title: '新冠疫情服务专栏',
      showBack: false,
      keepAlive: true
    }
  },
  {
    path: '/newsList',
    name: 'NewsList',
    component: () => import('../views/news/index.vue'),
    meta: {
      title: '资讯',
      showBack: true,
      keepAlive: true
    }
  },
  {
    path: '/newsDetail/:id',
    name: 'NewsDetail',
    component:  () => import('../views/news-detail/index.vue'),
    meta: {
      title: '',
      showBack: false,
      keepAlive: true
    }
  },
  {
    path: '/monitor-user',
    name: "MonitorUser",
    component: () => import('../views/monitor-man/user-info.vue'),
    meta: {
      title: '个人信息',
      showBack: true,
      keepAlive: true
    }
  },
  {
    path: '/monitor-user-sym',
    name: "MointorUserSym",
    component: () => import('../views/monitor-man/user-symptoms.vue'),
    meta: {
      title: '个人症状',
      showBack: true,
      keepAlive: true
    }
  },
  {
    path: '/monitor-success',
    name: "MointorSuccess",
    component: () => import('../views/monitor-man/success.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/person-report',
    name: "PersonalReport",
    component: () => import('../views/person-report/person-info.vue'),
    meta: {
      title: '个人主动申报',
      showBack: true,
      keepAlive: true
    }
  },
  {
    path: '/fever-clinic',
    name: "FeverClinic",
    component: () => import('../views/fever-clinic/index.vue'),
    meta: {
      title: '发热门诊通道',
      showBack: true,
      keepAlive: true
    }
  },
  {
    path: '/treatment-hospital',
    name: "TreatmentHospital",
    component: () => import('../views/treatment-hospital/index.vue'),
    meta: {
      title: '定点医院',
      showBack: true,
      keepAlive: true
    }
  },
  {
    path: '/vaccine-point',
    name: "VaccinePoint",
    component: () => import('../views/vaccine/index.vue'),
    meta: {
      title: '新冠疫苗（预约）接种点',
      showBack: true,
      keepAlive: true
    }
  },
  {
    path: '/report-success',
    name: "ReportSuccess",
    component: () => import('../views/person-report/success.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/child-vaccine',
    name: "ChildVaccineInfo",
    component: () => import('../views/vaccine-info/child.vue'),
    meta: {
      title: '儿童疫苗',
      keepAlive: true
    }
  },
  {
    path: '/adult-vaccine',
    name: "AdultVaccineInfo",
    component: () => import('../views/vaccine-info/adult.vue'),
    meta: {
      title: '成人疫苗',
      keepAlive: true
    }
  },
  {
    path: '/vaccine-info/:id',
    name: "VaccineInfo",
    component: () => import('../views/vaccine-info/vaccine-info.vue'),
    meta: {
    }
  },
  {
    path: '/risk',
    name: "RiskAssessment",
    component: () => import('../views/assessment/risk/index.vue'),
    meta: {
      title: '慢病风险评估',
      showBack: false,
      keepAlive: true
    }
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
