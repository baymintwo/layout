<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
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
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data: function() {
    return {
      aaa:false,
      rolename:'',
      areaname:''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    device() {
      return this.$store.state.app.device
    },
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
  .navbar {
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
          right: -50px;
          top: 2px;
          font-size: 12px;
        }
      }
    }
    .logo-position{
      width: 150px;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      float: left;
      margin: 10px;
      border: 1px solid #dddddd;
      background-color: #666666;
    }
  }

</style>

