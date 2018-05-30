<template>
  <section class="form">
    <div class="form-group" :class="{'error': error.name}">
      <label class="form-title">账号</label>
      <input class="form-control" type="text" placeholder="账号"/>
    </div>
    <zk-jitter :start.sync="begin" class="form-group" :class="{'error': error.pwd}">
      <label class="form-title">密码</label>
      <input class="form-control" type="password" placeholder="密码"/>
      <p class="tip">请输入秘密</p>
    </zk-jitter>
    <zk-button @click="jitter" class="btn btn-blue w-100 mt-10 fs-14">按钮</zk-button>
    <zk-button @click="jittera" class="btn btn-blue w-100 mt-10 fs-14">取消</zk-button>
  </section>
</template>

<script>
  import ZkJitter from '../../core/components/ZkJitter.vue';
  export default {
    data() {
      return {
        error: { pwd: false, },
        begin: false,
      };
    },
    methods: {
      jitter() {
        this.error.pwd = true;
        this.begin = true;
      },
      jittera() {
        this.error.pwd = false;
      },
    },
    components: {
      ZkJitter,
    }
  };
</script>

<style lang="scss">

</style>
