<template>
  <el-menu
    :show-timeout="200"
    :default-active="$route.path"
    class="myheader"
    mode="horizontal">
    <div class="logo-position">
      <!--<img src="./maxlogo.png">-->
    </div>
    <navbar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarItem from './NavbarItem'

export default {
  components: { NavbarItem },
  data: function() {
    return {
      aaa: false,
      rolename: '',
      areaname: ''
    }
  },
  created() {
    this.rolename = localStorage.RoleName
    this.areaname = localStorage.AreaName
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    routes() {
      return this.$router.options.routes
      //
    },
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({
          path: '/login'
        })
        // location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .myheader {
    height: 60px;
    line-height: 60px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 70px;
      height: 70px;
      float: left;
      padding: 0 10px;
    }
    .roleArea-name{
      height: 60px;
      display: inline-block;
      float: right;
      margin-right: 100px;
      padding: 0 10px;
      border-right: 1px solid #e6e6e6
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 60px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 20px;
        position: relative;
        line-height: initial;
        .user-avatar {
          width: 18px;
          height: 18px;
          /*border-radius: 10px;*/
        }
        .el-caret-bottom {
          position: absolute;
          left: 30px;
          max-width: 60px;
          top: 2px;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .logo-position{
      width: 200px;
      height: 50px;
      line-height: 50px;
      display: inline-block;
      background-color: #99a9bf;
      float: left;
      margin:0 10px;
      img{
        height: 100%;
        width: 100%;
      }
    }
  }

</style>

