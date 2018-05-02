<template>
  <header class="zk-header">
    <div class="container pc-show">
      <div class="flex-row">
        <ul>
          <li>首页</li>
        </ul>
        <ul>
          <li>登录</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return {};
    }
  };
</script>

<style lang="scss" scoped>
  @import "../styles/color";
  .zk-{
    &header{
      box-shadow: 0 2px 10px 0 rgba($c-black,.1), 0 1px rgba($c-black,.1);
      background: $c-bg-gray;
      width: 100%;
    }
  }
</style>
