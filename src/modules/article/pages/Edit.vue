<template>
  <div>
    <div class="form">
      <div class="form-group">
        <label class="form-label">标题</label>
        <input v-model="article.title" class="form-control" placeholder="请输入标题"/>
      </div>
      <div class="form-group">
        <label class="form-label">简介</label>
        <textarea v-model="article.excerpt" class="form-control" placeholder="请输入简介"></textarea>
      </div>
      <zk-editor :default-value="defaultContent" @refresh="resetContent"></zk-editor>
      <zk-button class="btn btn-blue" @click="save">保存</zk-button>
    </div>
  </div>
</template>
<script>
  import { isBlank } from '../../core/utils/string';
  import ZkEditor from '../../core/components/ZkEditor.vue';
  import { article, articleById } from '../services/apiService';
  export default {
    data() {
      return {
        article: {
          title: '',
          excerpt: '',
          content: ''
        },
        defaultContent: '',
      };
    },
    created() {
      const articleId = this.$route.params.id;
      if (isBlank(articleId)) {
        return;
      }
      this.getArticle();
    },
    methods: {
      resetContent(content) {
        this.article.content = content;
      },
      async getArticle() {
        const articleId = this.$route.params.id;
        if (isBlank(articleId)) {
          this.$router.replace({ name: 'home' });
          return;
        }
        this.article = await articleById.getAwait({id: articleId});
        this.defaultContent = this.article.content;
      },
      async save() {
        const newArticle = await article.postAwait(this.article);
        this.$router.replace({ name: 'view', params: { id: newArticle.id } });
      }
    },
    components: {
      ZkEditor
    }
  };
</script>
