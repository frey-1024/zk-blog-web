<template>
  <div class="container pt-15 home-wrapper">
    <news-list :data-list="dataList"></news-list>
  </div>
</template>

<script>
  import { article } from '../../article/services/apiService';
  export default {
    data() {
      return {
        dataList: []
      };
    },
    mounted() {
      this.getArticleList();
    },
    methods: {
      async getArticleList() {
        this.dataList = await article.getAwait();
      }
    },
    components: {
      NewsList: () => import('../components/NewsList.vue')
    },
  };
</script>

<style lang="scss">
  .home-wrapper{
    position: relative;
  }
</style>
