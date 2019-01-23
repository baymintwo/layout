import store from '@/store'
import {_debounce} from "@/utils/validate";

const {body} = document
const WIDTH = 1370
const RATIO = 3
export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('CloseSideBar', {withoutAnimation: false})
      }
    }
  },
  // beforeMount() {
  //   window.addEventListener('resize', this.resizeHandler)
  // },
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('ToggleDevice', 'mobile')
      store.dispatch('CloseSideBar', {withoutAnimation: true})
    }
  },
  computed:{
    routes(){
      return this.$store.state.user.menus
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      if (this.routes.length > 8 || rect.width - RATIO < WIDTH)
        return true
    },
    resizeHandler() {
      if (!document.hidden) {
        setTimeout(() => {
          const isMobile = this.isMobile()
          // store.dispatch('ToggleDevice', 'mobile')
          store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')
          if (isMobile) {
            store.dispatch('CloseSideBar', {withoutAnimation: true})
          }
        }, 10)
      }
    }
  }
}

