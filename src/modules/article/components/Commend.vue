<template>
  <div>
    <div class="flex-row col-top">
      <div class="user-avatar mr-10">
        <img :src="avatarUrl"/>
      </div>
      <div class="flex-1 form-group" :class="{'error': error}">
        <textarea class="form-control" style="height: 80px;" placeholder="请输入内容" v-model="content"></textarea>
        <p class="tip" v-text="tip"></p>
      </div>
    </div>
    <div class="text-right">
      <zk-button class="btn btn-default mr-20" @click="cancel">取消</zk-button>
      <zk-button class="btn btn-blue" @click="save">保存</zk-button>
    </div>
  </div>
</template>
<script>
  import { isBlank } from '../../core/utils/string';
  export default {
    props: {
      avatarUrl: {
        type: String,
        required: true
      },
      userId: {
        type: Number,
        required: true
      },
      articleId: {
        type: Number,
        required: true
      },
    },
    data() {
      return {
        content: '',
        error: false,
        tip: ''
      };
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
        this.$emit('success', this.content);
        this.content = '';
      },
      /**
       * 取消评论，并清空评论内容
       */
      cancel() {
        if (!isBlank(this.content)) {
          this.$zkConfirm.warning('你确定取消吗？', '提示').then(() => {
            this.clearAndEmit();
          }).catch(() => {});
        } else {
          this.clearAndEmit();
        }
      },
      clearAndEmit() {
        this.content = '';
        this.$emit('cancel');
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
</style>
