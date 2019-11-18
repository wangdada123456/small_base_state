<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
      <router-link  key="expand" class="sidebar-logo-link" to="/">
        <svg-icon icon-class="nav" class-name="sidebar-logo"/>
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
      <Indent-button :is-active="!collapse" class="hamburger-container" @toggleClick="toggleSideBar"/>
  </div>
</template>

<script>
import IndentButton from './IndentButton'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '系统导航'
    }
  },
  components: {
    IndentButton
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left:20px;
  overflow: hidden;
  display: flex;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    & .sidebar-logo {
      vertical-align: middle;
      font-size:24px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
