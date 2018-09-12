<template>
  <div>
    <transition name="cover">
      <div class="zk-cover" v-show="visible"></div>
    </transition>
    <transition name="shrink">
      <div class="zk-modal-wrapper" v-show="visible">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import ZkCover from './ZkCover.vue';
  export default {
    props: {
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
      removeParent() {
        // perspective 导致fixed失效， 所以去掉父级的这个样式（一般很少父级的父级是perspective， 这里没有递归冒泡逐个去掉）
        const perspectiveStyles = ['perspective', 'perspectiveOrigin'];
        const parentEl = this.$el.parentNode;
        perspectiveStyles.forEach((key) => {
          parentEl.style[key] = '';
        });
      }
    },
    components: {
      ZkCover,
    },
    watch: {
      visible(newVal) {
        // 开始抖动
        if (newVal) {
          this.removeParent();
        }
      }
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
