<template>
  <transition-group tag="ul" name="push" class="zk-catalog-list" mode="in-out">
    <li v-for="item in list" :key="item.text">
      <h3 v-text="item.text"></h3>
    </li>
  </transition-group>
</template>

<script>
  import { getWindowSize } from '../../core/utils/get';
  export default {
    name: 'ZkCatalog',
    data() {
      return {
        list: [],
      };
    },
    created() {
      // 计算窗口大小，判断显示几列
      console.log(getWindowSize());
    },
    mounted() {
      setTimeout(() => {
        this.list = Array.from({length: 5}, (v, i) => {
          return {
            text: i,
          };
        });
      }, 1000);
    },
  };
</script>

<style lang="scss" scoped>
  .zk-catalog-list{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    & > li {
      border: 1px solid #CCC;
      border-radius: 5px;
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
