<template>
  <div id="app">
    <zk-button></zk-button>
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

<style>
#app {

}
</style>
