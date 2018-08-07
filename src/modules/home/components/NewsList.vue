<template>
  <transition-group tag="ul" name="list" class="news-list" mode="out-in">
    <li v-for="item in dataList" :key="item.id">
      <h3 v-text="item.title" @click="goArticleView(item.id)" class="news-item-title pb-15"></h3>
      <p class="article-excerpt" v-text="item.excerpt"></p>
      <ul class="operations flex-row row-left text-gray mt-10">
        <li class="flex-row row-left mr-15">
          <icon name="thumbs-up" class="mr-4"/>
          赞（<span v-text="item.votes"></span>）
        </li>
        <li class="flex-row row-left mr-15">
          <icon name="eye" class="mr-4"/>
          阅读（<span v-text="item.previewCount"></span>）
        </li>
        <li class="flex-row row-left mr-15">
          <icon name="calendar-alt" class="mr-4"/>
          发布于（<span v-text="item.updateDate"></span>）
        </li>
      </ul>
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
      }
    },
    data() {
      return {
      };
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
