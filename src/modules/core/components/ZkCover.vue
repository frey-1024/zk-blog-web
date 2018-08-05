<template>
  <div class="zk-cover">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
  };
</script>

<style lang="scss">
  @import "../styles/color";
  .zk-cover{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba($c-black, 0.4);
  }
</style>
