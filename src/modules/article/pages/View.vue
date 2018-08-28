<template>
  <div class="flex-row col-top flex-left">
    <tool-box
      :votes="article.votes"
      @tool="handleToolByType"
    ></tool-box>
    <div class="nav-menu-wrapper" ref="navMenuWrapper" v-if="showNavigation">
      <div class="nav-menu">
        <h2>目录</h2>
        <ul class="menu-list">
          <li v-for="item in navigation" :class="[{ active: item.active }, `nav-item-${item.tagName}`]" @click="scrollToElement(item.id)">
            <ul>
              <li v-text="item.content" style="list-style: outside;"></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-1" ref="contentWrapper">
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
  import { getElementPointWithId, getStyle } from '../../core/utils/get';
  import { isBlank } from '../../core/utils/string';
  import Resize from '../../core/utils/Resize';
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
        resizeTimer: null,
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
      /**
       * 获取文章内容
       */
      async getArticle() {
        // 当没有文章id时，跳到首页
        if (isBlank(this.articleId)) {
          this.$router.replace({name: 'home'});
          return;
        }
        this.article = await articleById.getAwait({id: this.articleId, type: 'content'});
        // 获取文章导航列表
        this.getArticleNavigation();
      },
      /**
       * 当容器大小改变时，重新计算元素位置。
       */
      refreshNavigation() {
        // 显示导航
        if (this.showNavigation && this.navigation.length) {
          this.navigation = this.navigation.map((item) => {
            item.point = getElementPointWithId(item.id);
            return item;
          });
          this.listenerScroll();
        }
      },
      /**
       * 监听窗口滚动事件回调函数。
       * 设置导航选中状态
       */
      listenerScroll() {
        const scrollT = document.body.scrollTop || document.documentElement.scrollTop;
        this.navigation.forEach((item) => {
          item.active = false;
        });
        for (let i = 0, l = this.navigation.length, item, maxT; i < l; i++) {
          item = this.navigation[i];
          maxT = item.point.y + item.point.h;
          // 按照数组顺序，当遇到满足的就break。
          if (scrollT <= maxT) {
            item.active = true;
            break;
          }
        }
      },
      /**
       * 处理工具栏点击事件
       */
      handleToolByType(type) {
        switch (type) {
          case 'votes':
            this.saveVotes();
            break;
          case 'comment':
            this.scrollToElement('comment');
            break;
          case 'menu':
            this.showNavigation = !this.showNavigation;
            // 获取文章导航列表
            this.getArticleNavigation();
            break;
        }
      },
      /**
       * 滚动到指定元素的位置
       */
      scrollToElement(id) {
        const { y } = getElementPointWithId(id);
        window.scrollTo(0, y);
      },
      /**
       * 保存/取消 点赞
       */
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
        // 更新点赞数值
        this.article.votes = votesInfo.total;
        // 根据不同状态，弹出不同提示信息
        this.$zkMessage.success(`已成功${votesInfo.status === 1 ? '点' : '取消'}赞`);
      },
      /**
       *  获取文章导航列表
       */
      getArticleNavigation() {
        // 当没有展示目录列表，或者已经有列表，阻止再次拼装
        if (!this.showNavigation || this.navigation.length) {
          return;
        }
        this.$nextTick(() => {
          // 添加监听内容容器大小变化
          this.addResizeListener();
          const contentEl = this.$refs.content;
          let nodes = contentEl.children;
          if (!nodes || !nodes.length) {
            return;
          }
          let reg = /^H[1-6]{1}$/;
          let id;
          Array.from(nodes).forEach((node) => {
            if (reg.test(node.tagName)) {
              id = node.children[0].getAttribute('id');
              this.navigation.push({
                tagName: node.tagName,
                id,
                content: node.childNodes[1].nodeValue,
                point: getElementPointWithId(id),
                active: false,
              });
            }
          });
          // 评论
          this.navigation.push({
            tagName: 'H2',
            id: 'comment',
            content: '评论',
            point: getElementPointWithId('comment'),
            active: false,
          });
          this.listenerScroll();
          window.addEventListener('scroll', this.listenerScroll.bind(this), false);
        });
      },
      /**
       * 添加监听内容容器大小变化, 重新设置导航列表高度
       */
      addResizeListener() {
        // 设置导航列表高度，先执行一次，保证确定设置了。
        const contentEl = this.$refs.contentWrapper;
        this.setMenuHeight(contentEl);
        this.resizeTimer = Resize.on(contentEl, (el) => {
          this.setMenuHeight(el);
          this.refreshNavigation();
        }, this);
      },
      /**
       * 设置导航列表高度
       * @param el
       */
      setMenuHeight(el) {
        const navMenu = this.$refs.navMenuWrapper;
        if (navMenu) {
          navMenu.style.height = getStyle(el, 'height');
        }
      },
      goEdit() {
        this.$router.push({ name: 'edit', params: { id: this.articleId } });
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.listenerScroll.bind(this), false);
      if (this.resizeTimer) {
        this.resizeTimer();
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
        padding-left: 18px * ($val - 1);
      }
    }
  }
  .nav-menu-wrapper{
    width: 300px;
    padding-top: 60px;
    padding-right: 20px;
    .nav-menu{
      position: sticky;
      top: 15px;
      border-right: 1px solid $c-border;
    }
    .menu-list{
      font-size: 14px;
      width: 100%;
      line-height: 1.5;
      @include generateH();
      & > li {
        width: 100%;
        cursor: pointer;
        padding-right: 10px;
        padding-top: 3px;
        padding-bottom: 3px;
        .nav-circle{
          width: 8px;
          height: 8px;
        }
        &:hover{
          text-decoration: underline;
        }
        &.active{
          background-color: $c-light-border;
          color: $c-green;
        }
      }
    }
  }
</style>
