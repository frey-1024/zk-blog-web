<template>
  <section class="zk-dropdown-wrapper">
    <div class="zk-dropdown-title" @click="showDropdownMenu">
      <slot name="title"></slot>
    </div>
    <transition name="dropdown">
      <div class="zk-dropdown-menu" v-show="show" @click="hideDropdownMenu" :class="`zk-dropdown-menu-${position.y} zk-dropdown-menu-${position.x}`">
        <div class="zk-dropdown-hidden">
          <div class="zk-dropdown-scroll">
            <slot name="menu"></slot>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    props: {
      position: {
        type: Object,
        default: () => { return { x: 'left', y: 'bottom' }; },
      }
    },
    data() {
      return {
        show: false,
      };
    },
    mounted() {
      window.addEventListener('click', this.hideDropdownMenu, false);
    },
    methods: {
      showDropdownMenu(ev) {
        ev.stopPropagation();
        this.show = !this.show;
      },
      hideDropdownMenu(ev) {
        if (ev) {
          ev.stopPropagation();
        }
        this.show = false;
      }
    },
    destroyed() {
      window.removeEventListener('click', this.hideDropdownMenu, false);
    }
  };
</script>

<style lang="scss" scoped>
  @import "../styles/color";
  .zk-dropdown-{
    &wrapper{
      position: relative;
    }
    &title{
      text-align: center;
    }
    &menu{
      position: absolute;
      min-width: 150px;
      max-height: 300px;
      overflow: hidden;
      &-top{
        bottom: 100%;
        padding-bottom: 6px;
      }
      &-bottom{
        top: 100%;
        padding-top: 6px;
      }
      &-left{
        left: 0;
      }
      &-right{
        right: 0;
      }
    }
    &hidden{
      overflow: hidden;
      border: 1px solid $c-border;
      border-radius: 4px;
      background-color: $c-white;
      box-shadow: 0 2px 12px 0 rgba($c-black,.1);
    }
    &scroll{
      height: 100%;
      overflow: scroll;
      margin-bottom: -17px;
      margin-right: -17px;
    }
  }
  // 动画过渡
  .dropdown-enter-active, .dropdown-leave-active {
    transition: all 0.3s;
    transform-origin: center top;
  }
  .dropdown-enter, .dropdown-leave-to {
    max-height: 0;
    opacity: 0.6;
  }
</style>
