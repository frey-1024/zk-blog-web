<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      position: {
        type: String,
        default: 'xyz', // x, xy, xz, xyz, yz, y, z
      },
      // 抖动范围，单位是px, 例如：{x: 4, y: 2, z: 10}
      range: {
        type: Object,
        default: () => { return { x: 4, y: 2, z: 10 }; },
      },
      start: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        timer: null,
        currentRange: null,
        // 正数
        isPositive: false,
      };
    },
    mounted() {
      console.log(this.$el);
    },
    methods: {
      beginJitter() {
        // 把start变成false， 方便下次点击
        this.$emit('update:start', false);
        if (this.timer) {
          window.cancelAnimationFrame(this.timer);
        }
        this.x = 5;
//        this.currentRange = Object.assign({ x: 0, y: 0, z: 0 }, this.range);
        this.timer = window.requestAnimationFrame(this.continueJitter);
      },
      // 持续抖动
      continueJitter() {
        if (this.x <= 0) {
          return;
        }
        let x = this.x;
        if (this.a) {
          x = -x;
        }
        this.a = !this.a;
        this.$el.style.transform = `translate3d(${x}px, 0, 0)`;
        this.x -= 1;
        // 判断是否已经执行结束

        // 更新range
//        this.currentRange = this.getCurrentRange();
        // 继续执行动画
        this.timer = window.requestAnimationFrame(this.continueJitter);
      },
      // 修改元素位置
      jitterView(x, y, z) {
        this.$el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      },
    },
    watch: {
      start(newVal) {
        console.log(newVal);
        // 开始抖动
        if (newVal) {
          this.beginJitter();
        }
      }
    }
  };
</script>
