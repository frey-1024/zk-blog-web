<template>
  <div class="container pt-15 home-wrapper">
    <news-list :data-list="dataList.rows"></news-list>
    <pagination
      v-if="dataList.total && dataList.total > pageSize"
      :total="dataList.total"
      :current-page.sync="currentPage"
      prev-text="上一页"
      next-text="下一页"
      :pager-count="pageSize"
      @current-change="currentPageChange"
    ></pagination>
  </div>
</template>

<script>
  import { articleList } from '../../article/services/apiService';
  export default {
    data() {
      return {
        pageSize: 5,
        currentPage: 1,
        dataList: {
          rows: [],
        }
      };
    },
    mounted() {
      this.getArticleList();
    },
    methods: {
      currentPageChange() {
        this.getArticleList();
      },
      async getArticleList() {
        this.dataList = await articleList.postAwait({
          currentPage: this.currentPage,
          pageSize: this.pageSize
        });
      }
    },
    components: {
      NewsList: () => import('../components/NewsList.vue'),
      Pagination: () => import('../components/Pagination.vue')
    },
  };
</script>

<style lang="scss">
  .home-wrapper{
    position: relative;
  }
</style>
