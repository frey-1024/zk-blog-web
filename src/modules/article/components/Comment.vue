<template>
  <transition name="dropdown">
    <div style="overflow: hidden;">
      <div class="flex-row col-top mt-15">
        <div class="user-avatar mr-10" v-if="avatarUrl">
          <img :src="avatarUrl"/>
        </div>
        <div class="flex-1 form-group" :class="{'error': error}">
          <textarea class="form-control" style="height: 80px; resize: none;" ref="content" placeholder="请输入内容" v-model="content"></textarea>
          <p class="tip" v-text="tip"></p>
        </div>
      </div>
      <div class="text-right">
        <zk-button class="btn btn-default mr-20" @click="cancel">取消</zk-button>
        <zk-button class="btn btn-blue" @click="save" :loading="loading">保存</zk-button>
      </div>
    </div>
  </transition>
</template>
<script>
  import { isBlank } from '../../core/utils/string';
  export default {
    props: {
      defaultContent: {
        type: String,
        default: ''
      },
      remove: {
        type: Boolean,
        required: true
      },
      avatarUrl: {
        type: String,
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        error: false,
        tip: '',
        content: this.getAtName(this.defaultContent),
      };
    },
    mounted() {
      this.inputOnFocus();
    },
    methods: {
      /**
       * 保存评论内容
       */
      save() {
        this.error = false;
        if (isBlank(this.content)) {
          this.error = true;
          this.tip = '请输入内容';
          return;
        }
        const content = this.content.replace(/^@(.*) /, '');
        if (isBlank(content)) {
          this.error = true;
          this.tip = '请输入内容';
          return;
        }
        this.$emit('success', content);
        this.updateRemove();
      },
      /**
       * 取消评论，并清空评论内容
       */
      cancel() {
        if (!isBlank(this.content)) {
          this.$zkConfirm.warning('你确定取消吗？', '提示').then(() => {
            this.$emit('cancel');
            this.updateRemove();
          }).catch(() => {});
        } else {
          this.$emit('cancel');
          this.updateRemove();
        }
      },
      updateRemove() {
        this.$emit('update:remove', false);
      },
      getAtName(name) {
        if (!isBlank(name)) {
          return `@${name} `;
        }
        return name;
      },
      inputOnFocus() {
        const contentEl = this.$refs.content;
        if (contentEl) {
          this.$refs.content.focus();
        }
      }
    },
    watch: {
      remove(newVal) {
        if (newVal) {
          this.content = '';
        }
      },
      defaultContent(newVal) {
        if (newVal) {
          this.content = this.getAtName(newVal);
          this.inputOnFocus();
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../core/styles/color";
  .user-avatar{
    width: 36px;
    height: 36px;
    & > img{
      border: 1px solid $c-light-border;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  // 动画过渡
  .dropdown-enter-active, .dropdown-leave-active {
    transition: all 0.4s;
  }
  .dropdown-enter, .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-15px);
  }
</style>
