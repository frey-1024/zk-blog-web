<template>
  <div>
    <zk-cover v-show="showCover"></zk-cover>
    <transition name="shrink" @after-leave="afterLeave" @before-enter="beforeEnter">
      <div class="zk-modal-wrapper" v-show="visible">
        <div class="zk-modal" :class="size">
          <div class="zk-modal-title flex-row">
            <slot name="title"></slot>
            <icon name="times-circle" class="text-gray"></icon>
          </div>
          <div class="zk-modal-body">
            <slot name="body"></slot>
          </div>
          <div class="zk-modal-footer flex-row row-right">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: String,
        default: 'md'
      },
      visible: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {
        showCover: false,
      };
    },
    methods: {
      beforeEnter() {
        this.showCover = true;
      },
      afterLeave() {
        this.showCover = false;
      },
    },
    components: {
      ZkCover: () => import('./ZkCover.vue'),
    }
  };
</script>

<style lang="scss">
  @import "../styles/color";
  .zk-modal-wrapper{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: transparent;
  }

  .zk-modal{
    background-color: $c-white;
    box-shadow: 0 1px 3px rgba($c-black,.3);
    border-radius: 6px;
    margin: 0 auto;
    margin-top: 15vh;
    &-title{
      padding: 10px 15px;
    }
    &-body{
      padding: 10px 15px;
    }
    &-footer{
      padding: 10px 15px;
    }

    // 宽度大小
    &.lg{
      width: 75%;
    }
    &.md{
      width: 50%;
    }
    &.sm{
      width: 40%;
    }
  }
  // 动画过渡
  .shrink-enter-active, .shrink-leave-active {
    transition: all .5s;
  }
  .shrink-enter, .shrink-leave-to {
    transform: translateY(-120px);
    opacity: 0;
  }
</style>
