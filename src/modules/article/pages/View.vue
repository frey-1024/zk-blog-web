<template>
  <div class="flex-row col-top flex-left">
    <tool-box
      :votes="article.votes"
      @tool="handleToolByType"
    ></tool-box>
    <div class="nav-menu-wrapper" v-if="showNavigation">
      <div class="nav-menu">
        <h2>目录</h2>
        <ul class="menu-list">
          <li></li>
          <li v-for="item in navigation">
            <a :class="`nav-item-${item.tagName}`" v-text="item.content" @click="scrollToCommentList(item.id)"></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-1">
      <h1 class="article-title fs-30" v-text="article.title"></h1>
      <ul class="flex-row row-left text-gray mt-10 fs-14">
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
      <p class="fs-14 pt-30" v-text="article.excerpt"></p>
      <div class="pt-15 markdown-body" v-html="article.html" ref="content"></div>
      <div class="flex-row row-center pt-20 pb-20">
        <zk-button class="btn btn-green btn-md flex-row row-center" :loading="loading" @click="saveVotes"><icon name="thumbs-up" class="mr-4"/> 点赞 | {{article.votes}}</zk-button>
      </div>
      <comment-list
        id="comment"
        :article-id="articleId"
        :user-id="userId"
      ></comment-list>
    </div>
  </div>
</template>

<script>
  import { getElementPointWithId } from '../../core/utils/get';
  import { isBlank } from '../../core/utils/string';
  import { articleById, votes } from '../services/apiService';
  import { mapState } from 'vuex';
  import 'highlight.js/styles/github.css';
  export default {
    data() {
      return {
        loading: false,
        articleId: this.$route.params.id,
        article: {
          votes: 0,
        },
        navigation: [],
        showNavigation: false,
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
    mounted() {
    },
    methods: {
      handleToolByType(type) {
        switch (type) {
          case 'votes':
            this.saveVotes();
            break;
          case 'comment':
            this.scrollToCommentList('comment');
            break;
          case 'menu':
            this.showNavigation = !this.showNavigation;
            break;
        }
      },
      scrollToCommentList(id) {
        const { y } = getElementPointWithId(id);
        window.scrollTo(0, y);
      },
      async saveVotes() {
        if (this.loading) {
          return;
        }
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
          this.$router.replace({name: 'home'});
          return;
        }
        this.article = await articleById.getAwait({id: this.articleId, type: 'content'});
        // 获取文章导航列表
        this.getArticleNavigation();
      },
      getArticleNavigation() {
        this.$nextTick(() => {
          const contentEl = this.$refs.content;
          let nodes = contentEl.children;
          if (!nodes || !nodes.length) {
            return;
          }
          let reg = /^H[1-6]{1}$/;
          Array.from(nodes).forEach((node) => {
            if (reg.test(node.tagName)) {
              this.navigation.push({
                tagName: node.tagName,
                id: node.children[0].getAttribute('id'),
                content: node.childNodes[1].nodeValue
              });
            }
          });
        });
      },
      goEdit() {
        this.$router.push({ name: 'edit', params: { id: this.articleId } });
      }
    },
    components: {
      CommentList: () => import('../components/CommentList.vue'),
      ToolBox: () => import('../components/ToolBox.vue'),
    }
  };
</script>

<style lang="scss">
  @import "../../core/styles/color";
  @import "../../core/styles/theme/github-markdown";
  .edit{
    color: $c-green;
    cursor: pointer;
    &:hover{
      color: #348FEE;
    }
  }

  @mixin generateH(){
    $values: 1 2 3 4 5 6;
    @each $val in $values{
      .nav-item-H#{$val}{
        margin-left: 18px * ($val - 2);
      }
    }
  }
  .nav-menu-wrapper{
    width: 300px;
    .nav-menu{
      width: 300px;
      position: fixed;
      padding-right: 15px;
      top: 0;
      bottom: 0;
    }
    .menu-list{
      border-right: 1px solid $c-border;
      position: sticky;
      top: 150px;
      font-size: 14px;
      width: 100%;
      & > li {
        width: 100%;
        padding: 6px 15px 6px 0;
        @include generateH();
      }
    }
  }
</style>
