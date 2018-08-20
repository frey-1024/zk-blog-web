<template>
  <div>
    <comment
      :avatar-url="'http://f2.topitme.com/2/6a/bc/113109954583dbc6a2o.jpg'"
      :loading="loading"
      :remove.sync="remove"
      @success="saveComment"
      @cancel="close"
    ></comment>
    <ul class="comment-list">
      <li v-for="item in list" :key="item.id">
        <div class="flex-row row-left">
          <div class="user-avatar">
            <img src="http://f2.topitme.com/2/6a/bc/113109954583dbc6a2o.jpg"/>
          </div>
          <div class="flex-col row-left pl-10">
            <span class="user-name fs-14 pb-4" v-text="item.name"></span>
            <span class="text-gray" v-text="item.createDate"></span>
          </div>
        </div>
        <pre class="content comment-content" v-text="item.content"></pre>
        <div class="flex-row row-left">
          <span class="mr-20 text-gray-hover flex-row row-left"> <icon name="thumbs-up" class="mr-4"/> 赞({{item.votes}})</span>
          <span class="text-gray-hover flex-row row-left" @click="openReplyComment(item)"><icon name="reply" class="mr-4"></icon> 回复</span>
        </div>
        <ul class="reply-list">
          <li v-for="reply in item.replyList">
            <div class="reply fs-14">
              <span class="text-blue" v-text="reply.userName">回复者</span>
              <span class="pl-4 pr-4">:</span>
              <span class="text-blue pr-4">
                  @{{reply.fromUserName}}
              </span>
              <pre v-text="reply.content" class="content dis-i"></pre>
            </div>
            <div class="flex-row row-left pt-8">
              <span class="text-gray pr-20" v-text="reply.createDate"></span>
              <span class="text-gray-hover flex-row row-left" @click="openReplyComment(item, reply)"><icon name="reply" class="mr-4"></icon> 回复</span>
            </div>
          </li>
        </ul>
        <comment
          v-if="item.reply"
          :remove.sync="remove"
          :default-content="defaultContent"
          @success="saveComment($event, item)"
          @cancel="close(item)"
        ></comment>
      </li>
    </ul>
  </div>

</template>
<script>
  import { comment, commentList, reply } from '../services/apiService';
  import { isBlank } from '../../core/utils/string';
  export default {
    props: {
      articleId: {
        required: true,
      },
      userId: {
      }
    },
    data() {
      return {
        list: [],
        remove: false,
        replyAgainInfo: null,
        defaultContent: '',
        loading: false,
        num: 1,
      };
    },
    created() {
      this.getCommentList();
    },
    methods: {
      /**
       * 获取已评论列表
       */
      async getCommentList() {
        this.list = await commentList.getAwait({ articleId: this.articleId });
      },
      /**
       * 打开回复评论
       */
      openReplyComment(item, prevReply) {
        if (!item.reply || (this.replyAgainInfo && this.replyAgainInfo.id !== prevReply.id)) {
          this.$set(item, 'reply', true);
          this.replyAgainInfo = prevReply;
          this.defaultContent = prevReply ? prevReply.userName : item.name;
        } else {
          item.reply = false;
          this.replyAgainInfo = null;
        }
      },
      /**
       * 添加回复
       */
      async addReply(content, item) {
        const params = {
          commentId: item.id,
          userId: this.userId,
          content,
        };
        // 判断是回复评论，还是回复已经回复的评论
        const prevReplayInfo = this.replyAgainInfo;
        if (this.replyAgainInfo) {
          params.fromId = prevReplayInfo.id;
          params.fromUserId = prevReplayInfo.userId;
        } else {
          params.fromId = item.id;
          params.fromUserId = item.userId;
        }
        const newReply = await reply.postAwait(params);
        this.loading = false;
        this.remove = true;
        item.replyList.push(newReply);
        this.$zkMessage.success('添加回复成功');
      },
      /**
       * 添加评论
       * @param content 评论内容
       * @returns {Promise.<void>}
       */
      async addComment(content) {
        const newComment = await comment.postAwait({
          userId: this.userId,
          articleId: this.articleId,
          content,
        });
        this.loading = false;
        this.remove = true;
        this.list.unshift(newComment);
        this.$zkMessage.success('添加评论成功');
      },
      /**
       * 保存评论内容
       */
      async saveComment(val, item) {
        if (isBlank(this.userId)) {
          this.$zkMessage.warning('请先登录');
          return;
        }
        this.loading = true;
        // 添加文章评论
        if (!item) {
          this.addComment(val);
        } else { // 回复评论
          this.addReply(val, item);
        }
      },
      /**
       * 关闭评论
       * @param item
       */
      close(item) {
        this.remove = true;
        if (item) {
          item.reply = false;
        }
      },
    },
    components: {
      Comment: () => import('../components/Comment.vue'),
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../core/styles/color";
  .comment-list{
    & > li{
      padding: 15px 0;
      border-bottom: 1px solid $c-border;
      &:last-child{
        border-bottom: none;
      }
    }
  }
  .reply-list{
    border-left: 2px solid $c-border;
    & > li{
      margin: 8px 20px 0;
      padding-bottom: 8px;
      padding-top: 8px;
      border-bottom: 1px solid $c-light-border;
      &:last-child{
        border-bottom: none;
      }
    }
  }
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
  .reply{
    line-height: 1.5;
  }
  .content{
    white-space: normal;
  }
  .comment-content{
    padding: 15px 0;
    font-size: 14px;
  }
</style>
