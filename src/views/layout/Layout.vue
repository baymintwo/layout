<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container" />
    <el-header style="height: 60px;border-bottom: 1px solid #e6e6e6;">
      <navbar v-if="screenWidth < 1360 || routes.length >10"/>
      <MyHeader v-else/>
    </el-header>
    <el-main>
      <app-main/>
    </el-main>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, MyHeader } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    MyHeader
  },
  data() {
    return {
      screenWidth: document.body.clientWidth
    }
  },
  // mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    routes() {
      return this.$router.options.routes
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        mobile: true
      }
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    },
    $route(route) {
      if (this.sidebar.opened) {
        this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
      }
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: true })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
    .el-main {
      padding: 10px;
      background-color: #f9f9f9;
      overflow-x: hidden;
      overflow-y: auto;
      width: 1360px;
      margin: 0 auto;
    }
    .el-header{
      position: fixed;
      width: 100%;
      top: 0;
      right: 0;
      z-index: 99;
      background-color: #ffffff;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
