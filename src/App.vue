<template>
  <div id="app">
    <zk-button class="btn btn-default">默认按钮</zk-button>
    <zk-button class="btn btn-blue">蓝色按钮</zk-button>
    <zk-button class="btn btn-red">红色按钮</zk-button>
    <br>
    <br>
    <zk-button class="btn btn-default btn-round">默认按钮</zk-button>
    <zk-button class="btn btn-blue btn-round">蓝色按钮</zk-button>
    <zk-button class="btn btn-red btn-round">红色按钮</zk-button>
    <router-view/>
  </div>
</template>

<script>
import ZkButton from './modules/core/components/ZkButton.vue';

export default {
  components: {ZkButton},
  name: 'App',
  data () {
    return {
    };
  },
  methods: {
  }
};
</script>

<style lang="scss">
@import "./modules/core/styles/basic.scss";
</style>
