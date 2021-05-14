import { getNewsDetail, NewsDeatilResponse } from '@/api'
import { reactive, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import BScroll from '@better-scroll/core'

export const newsDetailEffect = () => {
  const newsDetailInfo = reactive<NewsDeatilResponse>({
    id: '',
    title: '',
    desctiption: '',
    imgUrl: '',
    content: '',
    origin: '',
    pushTime: ''
  })
  const requestNewsDetail = async (id: string) => {
    const res = await getNewsDetail({ id })
    const data = res.data
    newsDetailInfo.id = data.id
    newsDetailInfo.title = data.title
    newsDetailInfo.desctiption = data.desctiption
    newsDetailInfo.imgUrl = data.imgUrl
    newsDetailInfo.content = data.content
    newsDetailInfo.origin = data.origin
    newsDetailInfo.pushTime = data.pushTime
  }

  const router = useRouter();

  const onNavigate = ()=> {
    router.back();
  }

  const root = ref<HTMLDivElement | string>('')
  const navTitle = ref<string>('')

  const init = () => {
    if (root.value instanceof HTMLDivElement) {
      //解决 better-scroll 适配 移动端 Safari 遮挡问题
      root.value.style.height = document.documentElement.clientHeight + 'px'
    }
    const bs = new BScroll(root.value, {
      screenX: false,
      scrollY: true,
      click: true,
      probeType: 3
    })
    bs.on('scroll', (pos: { y: number }) => {
      const currentY = Math.abs(pos.y)
      if (currentY > 30) {
        navTitle.value = newsDetailInfo.title
      } else if (currentY <= 30) {
        navTitle.value = ''
      } 
    })
  }

  return {
    newsDetailInfo,
    requestNewsDetail,
    onNavigate,
    root,
    navTitle,
    init
  }
}
