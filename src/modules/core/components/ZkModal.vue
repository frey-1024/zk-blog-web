<template>
  <zk-empty-modal :visible.sync="visible">
    <div class="zk-modal" :class="size">
      <div class="zk-modal-title flex-row fs-18">
        <slot name="title"></slot>
        <span @click.stop="close" class="flex-row row-center"><i class="fa fa-times text-gray hover-blue pointer"></i></span>
      </div>
      <div class="zk-modal-body">
        <slot name="body"></slot>
      </div>
      <div class="zk-modal-footer flex-row row-right">
        <slot name="footer"></slot>
      </div>
    </div>
  </zk-empty-modal>
</template>

<script>
  import ZkEmptyModal from './ZkEmptyModal.vue';
  export default {
    props: {
      size: {
        type: String,
        default: 'md'
      },
      visible: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {};
    },
    methods: {
      close() {
        this.$emit('update:visible', false);
      },
    },
    components: {
      ZkEmptyModal
    }
  };
</script>

<style lang="scss">
  @import "../styles/color";
  .zk-modal{
    background-color: $c-white;
    box-shadow: 0 1px 3px rgba($c-black,.3);
    border-radius: 6px;
    margin: 0 auto;
    margin-top: 15vh;
    &-title{
      padding: 15px;
      border-bottom: 1px solid $c-light-border;
    }
    &-body{
      padding: 10px 15px;
    }
    &-footer{
      border-top: 1px solid $c-light-border;
      padding: 10px 15px;
      .btn{
        margin-left: 20px;
      }
    }

    // 宽度大小
    &.lg{
      width: 960px;
    }
    &.md{
      width: 700px;
    }
    &.sm{
      width: 600px;
    }
    &.xs{
      width: 420px;
    }
  }
</style>
