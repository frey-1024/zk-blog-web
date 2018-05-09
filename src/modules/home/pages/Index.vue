<template>
  <div class="container pt-15 zk-home-wrapper">
    <!--<cards></cards>-->
    <zk-editor></zk-editor>
  </div>
</template>

<script>
  import Cards from '../components/ZkCatalog.vue';
  import ZkEditor from '../../core/components/ZkEditor.vue';
  export default {
    data() {
      return {};
    },
    components: { Cards, ZkEditor },
  };
</script>

<style lang="scss">
  .zk-home-wrapper{
    position: relative;
  }
</style>
