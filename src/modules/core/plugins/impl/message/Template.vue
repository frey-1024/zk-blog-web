<template>
  <transition name="fade">
    <div class="zk-message-wrapper flex-row fs-16" :class="`zk-message ${options.type}`" v-show="show">
      <div class="flex-row row-left row-center">
        <i :class="`fa fa-${typeIcon}`"></i>
        <div class="pl-10" v-html="options.tip"></div>
      </div>
      <span class="text-gray flex-row pointer" @click="close" v-if="options.showClose"><i class="fa fa-times"></i></span>
    </div>
  </transition>
</template>

<script>
  let timer;
  export default {
    data() {
      return {
        show: false,
        options: {},
        typeIcon: 'info-circle',
        timer: null,
      };
    },
    methods: {
      /**
       * 根据类型设置icon
       */
      setTypeIcon() {
        switch (this.options.type) {
          case 'warning':
            this.typeIcon = 'exclamation-triangle';
            break;
          case 'success':
            this.typeIcon = 'check-circle';
            break;
          case 'danger':
            this.typeIcon = 'times-circle';
            break;
          default:
            this.typeIcon = 'info-circle';
        }
      },
      open(options) {
        this.clearTimer();
        // 复制options, 防止引用问题
        this.options = { ...options };
        this.setTypeIcon();
        // 显示提示
        this.show = true;
        // 定时器关闭提示
        timer = setTimeout(() => {
          this.close();
        }, this.options.expire || 3000);
      },
      close() {
        this.show = false;
      },
      clearTimer() {
        if (timer) {
          clearTimeout(timer);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../styles/color";
  .zk-message-wrapper{
    position: fixed;
    min-width: 380px;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    z-index: 999;
    padding: 15px;
    line-height: 20px;
  }
  @mixin type($text, $bg){
    border-color: $bg;
    background-color: $bg;
    color: $text;
  }
  .zk-message{
    background-color: $c-light-gray;
    color: $c-light-text;
    border: 1px solid $c-light-border;
    border-radius: 5px;
    &.warning{
      @include type($c-yellow, $c-light-yellow);
    }
    &.success{
      @include type($c-green, $c-light-green);
    }
    &.danger{
      @include type($c-red, $c-light-red);
    }
  }
  // 动画过渡
  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s;
  }
  .fade-enter, .fade-leave-to {
    top: 3%;
    opacity: 0;
  }
</style>
