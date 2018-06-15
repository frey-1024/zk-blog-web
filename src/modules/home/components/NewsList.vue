<template>
  <ul class="news-list">
    <li v-for="item in dataList" :key="item.id">
      <h3 v-text="item.title" class="news-item-title pb-15"></h3>
      <p class="article-excerpt" v-text="item.excerpt"></p>
      <ul class="operations flex-row row-left text-gray mt-10">
        <li class="flex-row row-left mr-15">
          <icon name="thumbs-up" class="mr-4"/>
          赞（<span v-text="item.votes"></span>）
        </li>
        <li class="flex-row row-left mr-15">
          <icon name="eye" class="mr-4"/>
          阅读（<span v-text="item.read"></span>）
        </li>
        <li class="flex-row row-left mr-15">
          <icon name="calendar-alt" class="mr-4"/>
          发布于（<span v-text="item.release"></span>）
        </li>
      </ul>
    </li>
  </ul>
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
  };
</script>

<style lang="scss" scoped>
  @import "../../core/styles/color";
  .news-list{
    & > li {
      border-bottom: 1px solid $c-light-border;
      padding: 15px 0;
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
</style>
