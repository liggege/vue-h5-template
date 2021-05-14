import router from '@/router'

router.beforeEach(async (to: any, from, next) => {
  // 设置标题
  document.title = to.meta.title || ' '

  next()
})
