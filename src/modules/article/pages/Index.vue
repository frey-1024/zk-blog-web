<template>
  <div class="container pt-15 article-wrapper">
    <router-view/>
  </div>
</template>

<script>
  import 'highlight.js/styles/github.css';
  export default {
    data() {
      return {
      };
    },
    components: {},
  };
</script>

<style lang="scss">
  .article-wrapper{
    position: relative;
  }
</style>
