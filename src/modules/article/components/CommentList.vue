<template>
  <div>
    <comment
      :avatar-url="'http://f2.topitme.com/2/6a/bc/113109954583dbc6a2o.jpg'"
      :loading="loading"
      @success="saveComment"
      @cancel="close()"
    ></comment>
    <ul class="comment-list">
      <li v-for="item in list" :key="item.id">
        <div class="flex-row row-left">
          <div class="user-avatar">
            <img src="http://f2.topitme.com/2/6a/bc/113109954583dbc6a2o.jpg"/>
          </div>
          <div class="flex-col row-left pl-10">
            <span class="user-name fs-14 pb-4" v-text="item.name">畅呼呼</span>
            <span class="text-gray" v-text="item.createDate"></span>
          </div>
        </div>
        <pre class="comment-content" v-text="item.content">什么公司丫 正在找坑位</pre>
        <div class="flex-row row-left">
          <span class="mr-20 text-gray-hover flex-row row-left"> <icon name="thumbs-up" class="mr-4"/> 赞({{item.votes}})</span>
          <span class="text-gray-hover flex-row row-left" @click="replayComment(item)"><icon name="reply" class="mr-4"></icon> 回复</span>
        </div>
        <ul class="replay-list">
          <li>
            <div class="flex-row row-left">
              <span class="text-blue">回复者</span> ：
              <div class="flex-row row-left"><span class="text-blue pr-8">@被回复者</span> <pre>什么公司丫 正在找坑位什么公司丫 正在找坑位什么公司丫 正在找坑位什么公司丫 正在找坑位</pre></div>
            </div>
            <div class="flex-row row-left pt-8">
              <span class="text-gray pr-20">2017.08.01 11:48</span>
              <span class="text-gray-hover flex-row row-left" @click="replayComment(item)"><icon name="reply" class="mr-4"></icon> 回复</span>
            </div>
          </li>
        </ul>
        <comment
          class="pt-15 pl-20"
          v-if="item.replay"
          :avatar-url="'http://f2.topitme.com/2/6a/bc/113109954583dbc6a2o.jpg'"
          @success="saveComment($event, item)"
          @cancel="close(item)"
        ></comment>
      </li>
    </ul>
  </div>

</template>
<script>
  import { comment, commentList } from '../services/apiService';
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
        loading: false,
      };
    },
    created() {
      this.getCommentList();
    },
    methods: {
      async getCommentList() {
        const list = await commentList.getAwait({ articleId: this.articleId });
        this.list = this.$zkDate.formatDateList(list, 'createDate');
      },
      replayComment(item) {
        this.$set(item, 'replay', true);
      },
      async saveComment(val, item) {
        if (isBlank(this.userId)) {
          this.$zkMessage.warning('请先登录');
          return;
        }
        this.loading = true;
        // 添加文章评论
        if (!item) {
          const newComment = await comment.postAwait({
            userId: this.userId,
            articleId: this.articleId,
            content: val,
          });
          this.loading = false;
          // 格式化时间
          newComment.createDate = this.$zkDate.formatDate(newComment.createDate);
          this.list.unshift(newComment);
        } else { // 回复评论

        }
      },
      close(item) {
        item.replay = false;
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
  .replay-list{
    border-left: 2px solid $c-border;
    & > li{
      margin: 15px 20px 0;
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
  .comment-content{
    padding: 15px 0;
    font-size: 14px;
  }
</style>
