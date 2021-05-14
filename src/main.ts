import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './utils/permission'

import './icons/index'
import './styles/index.scss'

import vant from '@/components/Vant'
import FastClick  from 'fastclick'

//处理点击事件延迟300ms问题
FastClick.attach(document.body)

createApp(App)
  .use(store)
  .use(router)
  .use(vant)
  .mount('#app')
