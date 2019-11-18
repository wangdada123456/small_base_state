<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <div class="hamburger">
      <svg-icon icon-class="retract" :class-name="this.isActive ? 'is-open' : 'is-active'"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  position:absolute;
  top:5px;
  right:4px;
  background: #304156;
    & .is-active {
      transform: rotate(180deg);
    }
    & .is-open {
      margin-right:0px !important;
    }
}
</style>
