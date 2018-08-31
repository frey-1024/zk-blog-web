<template>
  <div>
    <transition name="cover">
      <div class="zk-cover" v-show="visible"></div>
    </transition>
    <transition name="shrink">
      <div class="zk-modal-wrapper" v-show="visible">
        <div class="zk-modal" :class="size">
          <div class="zk-modal-title flex-row fs-18">
            <slot name="title"></slot>
            <span @click.stop="close" class="flex-row row-center"><icon name="times" class="text-gray hover-blue pointer"></icon></span>
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
  import ZkCover from './ZkCover.vue';
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
      return {};
    },
    methods: {
      close() {
        this.$emit('update:visible', false);
      },
    },
    components: {
      ZkCover,
    }
  };
</script>

<style lang="scss">
  @import "../styles/color";
  .zk-cover{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba($c-black, 0.4);
  }
  .zk-modal-wrapper{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: transparent;
  }

  .zk-modal{
    background-color: $c-white;
    box-shadow: 0 1px 3px rgba($c-black,.3);
    border-radius: 6px;
    margin: 0 auto;
    margin-top: 15vh;
    &-title{
      padding: 15px;
      border-bottom: 1px solid $c-light-border;
    }
    &-body{
      padding: 10px 15px;
    }
    &-footer{
      border-top: 1px solid $c-light-border;
      padding: 10px 15px;
      .btn{
        margin-left: 20px;
      }
    }

    // 宽度大小
    &.lg{
      width: 960px;
    }
    &.md{
      width: 700px;
    }
    &.sm{
      width: 600px;
    }
    &.xs{
      width: 420px;
    }
  }

  // 动画过渡
  .cover-enter-active, .cover-leave-active {
    transition: all .6s;
  }
  .cover-enter, .cover-leave-to {
    opacity: 0;
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
