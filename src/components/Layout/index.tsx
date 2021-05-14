import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '../NavBar'
import './index.scss'

export default defineComponent({
  setup() {
    const route = useRoute()

    return () => (
      <div>
         {route.meta.showBack &&<NavBar />}
         {route.meta.showBack &&<div class="ignore-margin-top"></div>}
        <router-view />
      </div>
    )
  }
})

