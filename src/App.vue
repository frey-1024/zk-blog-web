<template>
  <div id="app">
    <zk-header></zk-header>
    <router-view/>
  </div>
</template>

<script>
import ZkHeader from '@/components/ZkHeader.vue';

export default {
  components: { ZkHeader },
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
