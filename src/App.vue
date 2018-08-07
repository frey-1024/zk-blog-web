<template>
  <div id="app" class="flex-col row-between">
    <zk-header></zk-header>
    <router-view class="flex-1"/>
    <zk-footer></zk-footer>
  </div>
</template>

<script>
import ZkHeader from '@/components/ZkHeader.vue';
import ZkFooter from '@/components/ZkFooter.vue';

export default {
  components: { ZkHeader, ZkFooter },
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
  #app{
    min-height: 100%;
  }
</style>
