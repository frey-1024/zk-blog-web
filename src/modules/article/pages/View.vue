<template>
  <div>
    <h1 class="article-title fs-30" v-text="article.title"></h1>
    <ul class="flex-row row-left text-gray mt-10">
      <li class="flex-row row-left mr-15">
        <icon name="thumbs-up" class="mr-4"/>
        赞（<span v-text="article.votes"></span>）
      </li>
      <li class="flex-row row-left mr-15">
        <icon name="eye" class="mr-4"/>
        阅读（<span v-text="article.previewCount"></span>）
      </li>
      <li class="flex-row row-left mr-15">
        <icon name="calendar-alt" class="mr-4"/>
        发布于（<span v-text="article.updateDate"></span>）
      </li>
      <li class="edit" @click="goEdit" v-if="isLogin">
        编辑
      </li>
    </ul>
    <div class="pt-15 markdown-view" v-html="article.html"></div>
    <div class="flex-row row-center pt-20 pb-20">
      <zk-button class="btn btn-green btn-md flex-row row-center" :loading="loading" @click="saveVotes"><icon name="thumbs-up" class="mr-4"/> 点赞 | {{article.votes}}</zk-button>
    </div>
    <comment-list
      :article-id="articleId"
      :user-id="userId"
    ></comment-list>
  </div>
</template>

<script>
  import { isBlank } from '../../core/utils/string';
  import { articleById, votes } from '../services/apiService';
  import { mapState } from 'vuex';
  import 'highlight.js/styles/github.css';
  export default {
    data() {
      return {
        loading: false,
        articleId: this.$route.params.id,
        article: {},
      };
    },
    computed: {
      ...mapState('user', {
        isLogin: state => state.isLogin,
        userId: state => state.id,
      })
    },
    created() {
      this.getArticle();
    },
    methods: {
      async saveVotes() {
        this.loading = true;
        const votesInfo = await votes.postAwait({
          userId: this.userId,
          articleId: this.articleId,
          status: 1,
        });
        this.loading = false;
        this.article.votes = votesInfo.total;
        this.$zkMessage.success(`已成功${votesInfo.status === 1 ? '点' : '取消'}赞`);
      },
      async getArticle() {
        if (isBlank(this.articleId)) {
          this.$router.replace({ name: 'home' });
          return;
        }
        this.article = await articleById.getAwait({id: this.articleId, type: 'content'});
      },
      goEdit() {
        this.$router.push({ name: 'edit', params: { id: this.articleId } });
      },
      saveCommendSuccess(val) {
        console.log(val);
      }
    },
    components: {
      CommentList: () => import('../components/CommentList.vue')
    }
  };
</script>

<style lang="scss">
  @import "../../core/styles/color";
  .edit{
    color: $c-green;
    cursor: pointer;
    &:hover{
      color: #348FEE;
    }
  }
  .markdown-view{
    h1, h2, h3, h4{
      border-bottom: 1px solid $c-light-border;
    }
    h1{
      font-size: 22px;
      padding-bottom: 10px;
      margin-top: 20px;
      margin-bottom: 16px;
    }
    h2{
      font-size: 20px;
      padding-bottom: 10px;
      margin-top: 20px;
      margin-bottom: 12px;
    }
    h3{
      font-size: 18px;
      padding-bottom: 10px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    p{
      padding-bottom: 15px;
      line-height: 1.6;
      font-size: 14px;
    }
  }
</style>
