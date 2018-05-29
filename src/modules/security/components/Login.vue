<template>
  <section>
    <div class="form-group" :class="{'error': error.name}">
      <label class="form-title">账号</label>
      <input class="form-control" type="text" placeholder="账号"/>
    </div>
    <zk-jitter :start.sync="begin" class="form-group" :class="{'error': error.pwd}">
      <label class="form-title">密码</label>
      <input class="form-control" type="password" placeholder="密码"/>
    </zk-jitter>
    <button @click="jitter">按钮</button>
  </section>
</template>

<script>
  import ZkJitter from '../../core/components/ZkJitter.vue';
  export default {
    data() {
      return {
        error: {},
        begin: false,
      };
    },
    methods: {
      jitter() {
        this.begin = !this.begin;
      }
    },
    components: {
      ZkJitter,
    }
  };
</script>

<style lang="scss">

</style>
