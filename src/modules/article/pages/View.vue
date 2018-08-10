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
    <commend
      :avatar-url="'http://f2.topitme.com/2/6a/bc/113109954583dbc6a2o.jpg'"
      :user-id="11"
      :article-id="33"
      @success="saveCommendSuccess"
    ></commend>
    <comment-list></comment-list>
  </div>
</template>

<script>
  import { isBlank } from '../../core/utils/string';
  import { articleById } from '../services/apiService';
  import { mapState } from 'vuex';
  import 'highlight.js/styles/github.css';
  export default {
    data() {
      return {
        articleId: this.$route.params.id,
        article: {},
      };
    },
    computed: {
      ...mapState('user', {
        isLogin: state => state.isLogin,
      })
    },
    created() {
      this.getArticle();
    },
    methods: {
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
      Commend: () => import('../components/Commend.vue'),
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
