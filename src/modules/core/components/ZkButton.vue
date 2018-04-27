<template>
  <button class="zk-btn">
    <canvas class="zk-ripple" @click="ripple"></canvas> 按钮
  </button>
</template>

<script>
  import { getStyle } from '../utils/get';

  let radius, el, color, context;
  const origin = {
    x: 0,
    y: 0
  };
  export default {
    name: 'ZkButton',
    data () {
      return {
        color: '',
      };
    },
    methods: {
      ripple(event) {
        el = event.target;
        color = color || getStyle(el.parentElement, 'color');
        context = el.getContext('2d');
        radius = 0;
        origin.x = event.offsetX;
        origin.y = event.offsetY;
        context.clearRect(0, 0, el.width, el.height);
        this.draw();
        console.log(event);
      },
      draw() {
        context.beginPath();
        context.arc(100, 10, 12, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        radius += 6;
        console.log(radius);
        // 通过判断半径小于元素宽度，不断绘制 radius += 6 的圆形
        // if (radius < el.width) {
        // window.requestAnimationFrame(this.draw);
        // }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .zk-{
    &btn{
      overflow: hidden;
      position: relative;
      width: 150px;
      height: 40px;
      border: 1px solid #d9d9d9;
      outline: none;
      background: #008DC5;
      color: #fff;
      cursor: pointer;
    }
    &ripple{
      opacity: 0.25;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
