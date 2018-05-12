<template>
  <div>
    <zk-cover></zk-cover>
    <zk-modal size="sm">
      <span slot="title">插入代码</span>
      <slot slot="body">
        <textarea placeholder="请添加代码" ref="insertCode" class="form-control code-input"></textarea>
      </slot>
      <slot slot="footer">
        <zk-button class="btn btn-blue" @click="save">插入</zk-button>
      </slot>
    </zk-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      save() {
        const el = this.$refs.insertCode;
        const val = el.value;
        if (val === '' || val.trim() === '') {
          return;
        }
        this.$emit('code', val);
      }
    },
    components: {
      ZkModal: () => import('./ZkModal.vue'),
      ZkCover: () => import('./ZkCover.vue'),
    },
  };
</script>

<style lang="scss">
  @import "../styles/color";
  .code-input{
    min-height: 200px;
    resize: vertical;
  }
</style>
