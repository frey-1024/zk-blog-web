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
    <div class="pt-15" v-html="article.content"></div>
  </div>
</template>

<script>
  import { isBlank } from '../../core/utils/string';
  import { articleById } from '../services/apiService';
  import { mapState } from 'vuex';
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
        this.article = await articleById.getAwait({id: this.articleId});
      },
      goEdit() {
        this.$router.push({ name: 'edit', params: { id: this.articleId } });
      }
    },
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
</style>
