import  { defineComponent } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import './index.scss'
// import { Toast } from 'vant';

export default defineComponent({
    setup() {
      const route = useRoute()
      const router = useRouter()
      const onClickBack = () => {
          router.back()
        // Toast('返回')
      }
  
      return () => (
        <van-nav-bar id="van-nav-bar-reset"
        safe-area-inset-top
        title={route.meta.title}
        left-arrow
        fixed
        onClickLeft={onClickBack}>   
        </van-nav-bar>
      )
    }
  })