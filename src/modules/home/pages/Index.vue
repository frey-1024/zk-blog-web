<template>
  <div class="container pt-15 home-wrapper">
    <news-list :data-list="dataList.rows"></news-list>
  </div>
</template>

<script>
  import { articleBySearch } from '../../article/services/apiService';
  export default {
    data() {
      return {
        dataList: {
          rows: [],
        }
      };
    },
    mounted() {
      this.getArticleList();
    },
    methods: {
      async getArticleList() {
        this.dataList = await articleBySearch.postAwait({
          pageNumber: 1,
          pageSize: 8
        });
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
