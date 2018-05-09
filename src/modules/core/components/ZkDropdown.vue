<template>
  <transition-group tag="ul" name="push" class="zk-dropdown-list" :style="dropStyle" mode="in-out">
    <li v-for="item in menus" :key="item.name">
      <a class="flex-row row-left" @click.stop="selectItem(item)" @mousedown.stop="fn" href="javascript:;" :class="{'active': item.active}">
        <i class="icon icon-checked"></i>
        <span v-text="item.name"></span>
      </a>
    </li>
  </transition-group>
</template>
<script>
  export default {
    props: {
      dropStyle: {
        type: Object,
        required: false,
        default: {
          left: 0,
          top: 0,
        }
      },
      dropList: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        menus: this.dropList,
      };
    },
    methods: {
      fn() {},
      selectItem(item) {
        this.menus.forEach((menu) => {
          menu.active = false;
        });
        item.active = true;
        this.$emit('selected:menu-list', this.menus);
        this.$emit('selected', item);
      },
    }
  };
</script>
<style lang="scss">
  @import "../styles/color";
  .zk-dropdown-list{
    position: absolute;
    overflow: auto;
    border: 1px solid $c-border;
    background-color: $c-white;
    & > li{
      & > a{
        padding: 4px 8px;
        color: inherit;
        &:hover, &.active{
          background-color: $c-blue;
          color: $c-white;
        }
        &.active{
          .icon-checked{
            visibility: visible;
          }
        }
      }
      .icon-checked{
        margin-right: 5px;
        visibility: hidden;
      }
    }
  }
  // 动画过渡
  .push-enter-active, .push-leave-active {
    transition: all 1s;
  }
  .push-enter, .push-leave-to {
    transform: translateX(60px);
    opacity: 0;
  }
</style>
