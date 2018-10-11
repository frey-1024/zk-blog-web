<template>
  <transition-group tag="ul" name="list" class="news-list" mode="out-in">
    <li v-for="item in dataList" :key="item.id">
      <h3 v-html="item.title" @click="goArticleView(item.id)" class="news-item-title pb-15"></h3>
      <p class="article-excerpt" v-text="item.excerpt"></p>
      <ul class="operations flex-row row-left text-gray mt-10">
        <li class="flex-row row-left mr-15">
          <i class="fa fa-thumbs-up mr-4"></i>
          赞（<span v-text="item.votes"></span>）
        </li>
        <li class="flex-row row-left mr-15">
          <i class="fa fa-eye mr-4"></i>
          阅读（<span v-text="item.previewCount"></span>）
        </li>
        <li class="flex-row row-left mr-15">
          <i class="fa fa-calendar mr-4"></i>
          发布于（<span v-text="item.updateDate"></span>）
        </li>
      </ul>
    </li>
    <li class="empty" key="empty" v-if="!loading && (!dataList || !dataList.length)">
      <img src="../imgs/null-page-draw.png" alt="没有搜索到内容"/>
      <p class="text-center text-gray fs-16 pt-30">没有搜索到内容</p>
    </li>
  </transition-group>
</template>

<script>
  export default {
    name: 'NewsList',
    props: {
      dataList: {
        type: Array,
        default: []
      },
      search: {
        type: String,
      },
      loading: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {};
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      goArticleView(id) {
        this.$router.push({ name: 'view', params: { id } });
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../core/styles/color";
  .news-list{
    min-height: 600px;
    & > li {
      border-bottom: 1px solid $c-light-border;
      padding: 15px 0;
      transition: all 0.5s linear;
      &:first-child{
        padding-top: 0;
      }
      &:last-child{
        border-bottom: none;
      }
    }
    & > li.empty{
      border: none;
      max-width: 450px;
      width: 100%;
      margin: auto;
      padding-top: 60px;
      img{
        width: 100%;
      }
    }
  }
  .news-item-title{
    font-size: 18px;
    color: $c-black;
    font-weight: normal;
    cursor: pointer;
    display: inline-block;
    &:hover{
      color: $c-green;
    }
  }
  .article-excerpt{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.5;
    color: $c-gray;
    font-size: 14px;
  }

  /*动画过渡*/
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(-300px);
  }
  .list-leave-active {
    position: absolute;
  }
</style>
