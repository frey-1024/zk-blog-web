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
      <!--<zk-editor :default-value="defaultContent" @refresh="resetContent"></zk-editor>-->
      <div class="pb-20">
        <mavon-editor
          :value="article.markdown"
          :boxShadow="false"
          :navigation="true"
          style="height: 100%"
          @change="editorChange"
        ></mavon-editor>
      </div>
      <div class="text-right">
        <zk-button class="btn btn-default mr-20" @click="cancel">取消</zk-button>
        <zk-button class="btn btn-blue" @click="save">保存</zk-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { isBlank } from '../../core/utils/string';
//  import ZkEditor from '../../core/components/ZkEditor.vue';
  import { mavonEditor } from 'mavon-editor';
  import { article, articleById } from '../services/apiService';
  import 'mavon-editor/dist/css/index.css';
  export default {
    data() {
      return {
        article: {
          title: '',
          excerpt: '',
          html: '',
          markdown: ''
        },
        articleId: this.$route.params && this.$route.params.id,
      };
    },
    created() {
      if (isBlank(this.articleId)) {
        return;
      }
      this.getArticle();
    },
    methods: {
      editorChange(markdown, html) {
        this.article.markdown = markdown;
        this.article.html = html;
      },
      async getArticle() {
        this.article = await articleById.getAwait({id: this.articleId, type: 'detail'});
      },
      async save() {
        let msg;
        // 编辑
        if (!isBlank(this.articleId)) {
          msg = '编辑成功。';
          await article.putAwait(this.article);
        } else { // 添加
          msg = '添加成功。';
          await article.postAwait(this.article);
        }
        this.$router.replace({ name: 'view', params: { id: this.articleId } });
        this.$zkMessage.success(msg);
      },
      cancel() {
        this.$zkConfirm.warning('你确定取消吗？', '提示').then(() => {
          this.$router.back();
        }).catch(() => {});
      }
    },
    components: {
      mavonEditor
    }
  };
</script>
