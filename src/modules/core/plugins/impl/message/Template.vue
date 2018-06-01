<template>
  <div class="zk-message-wrapper">
    <div>
      <!--<icon :name="item.icon"></icon>-->
      <div v-html="options.tip"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        options: {},
      };
    },
    methods: {
      open(options) {
        // 复制options, 防止引用问题
        this.options = { ...options };
        console.log(options);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .zk-message-wrapper{

  }
</style>
