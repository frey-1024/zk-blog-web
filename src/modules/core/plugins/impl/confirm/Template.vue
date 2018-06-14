<template>
  <zk-modal size="xs" :visible.sync="openModal">
    <span slot="title" v-html="options.title"></span>
    <slot slot="body">
      <div class="flex-row row-left pt-10 pb-10 fs-14">
        <icon :name="typeIcon" class="zk-confirm-icon" :class="options.type"></icon>
        <div v-html="options.tip"></div>
      </div>
    </slot>
    <slot slot="footer">
      <zk-button class="btn btn-default" @click="close" v-if="options.showCancelBtn">{{options.cancelBtnText}}</zk-button>
      <zk-button class="btn btn-blue" @click="confirm" v-if="options.showConfirmBtn">{{options.confirmBtnText}}</zk-button>
    </slot>
  </zk-modal>
</template>

<script>
  export default {
    data() {
      return {
        options: {},
        typeIcon: 'info-circle',
        openModal: false,
        resolve: null,
        reject: null,
      };
    },
    methods: {
      /**
       * 根据类型设置icon
       */
      setTypeIcon() {
        switch (this.options.type) {
          case 'warning':
            this.typeIcon = 'exclamation-triangle';
            break;
          case 'success':
            this.typeIcon = 'check-circle';
            break;
          case 'danger':
            this.typeIcon = 'times-circle';
            break;
          default:
            this.typeIcon = 'info-circle';
        }
      },
      open(options) {
        // 复制options, 防止引用问题
        this.options = { ...options };
        this.setTypeIcon();
        this.openModal = true;
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      },
      confirm() {
        this.openModal = false;
        this.resolve();
      },
      close() {
        this.openModal = false;
        this.reject();
      }
    },
    components: {
      ZkModal: () => import('../../../components/ZkModal.vue')
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../../styles/color";
  .zk-confirm-icon{
    padding-right: 10px;
    margin-top: -2px;
    &.warning{
      color: $c-yellow;
    }
    &.success{
      color: $c-green;
    }
    &.danger{
      color: $c-red;
    }
  }
</style>
