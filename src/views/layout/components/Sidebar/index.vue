<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :unique-opened="true"
      class="el-menu-vertical-demo"
      mode="vertical"
      background-color="#2865a7"
      text-color="#bfcbd9"
      active-text-color="#ffffff"
    >
      <div class="logo-con">
        <!--<img v-show="isCollapse" src="./minlogo.png" style="width: 100%">-->
        <!--<img v-show="!isCollapse" src="./maxlogo.png" style="width: 100%">-->
      </div>
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  data(){
    return{
      // routes:[]
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
      // this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style scoped lang="scss">
 .logo-con {
    height: 40px;
   background-color: #99a9bf;
  }
 /deep/ .el-menu--vertical{
   background-color: rgb(48, 65, 86);
   max-height: 400px;
   overflow-y: auto;
 }
</style>
