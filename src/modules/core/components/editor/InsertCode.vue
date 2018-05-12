<template>
  <zk-modal size="sm" :visible.sync="openModal">
    <span slot="title">插入代码</span>
    <slot slot="body">
      <textarea placeholder="请添加代码" ref="insertCode" class="form-control code-input"></textarea>
    </slot>
    <slot slot="footer">
      <zk-button class="btn btn-blue" @click="save">插入</zk-button>
    </slot>
  </zk-modal>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {
        openModal: this.visible
      };
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
      ZkModal: () => import('../ZkModal.vue'),
    },
    watch: {
      openModal(newVal) {
        if (!newVal) {
          this.$emit('update:visible', false);
        }
      },
      visible(newVal) {
        this.openModal = newVal;
        if (!newVal) {
          const el = this.$refs.insertCode;
          el.value = '';
        }
      }
    }
  };
</script>

<style lang="scss">
  @import "../../styles/color";
  .code-input{
    min-height: 200px;
    resize: vertical;
  }
</style>
