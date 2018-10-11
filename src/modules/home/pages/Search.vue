<template>
  <div class="container pt-30 home-wrapper" v-loading.before="loading">
    <article-list :data-list="searchData.rows" :search="search" v-if="searchData.rows"></article-list>
    <pagination
      v-if="searchData.total && searchData.total > pageSize"
      :total="searchData.total"
      :current-page.sync="currentPage"
      prev-text="上一页"
      next-text="下一页"
      :pager-count="pageSize"
      @current-change="currentPageChange"
    ></pagination>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        pageSize: 5,
        currentPage: 1,
      };
    },
    computed: {
      search() {
        return this.$route.query.s;
      },
      ...mapState('search', {
        searchData: state => state.searchData,
        loading: state => state.loading,
      })
    },
    mounted() {
      this.getArticleList();
    },
    methods: {
      currentPageChange() {
        this.getArticleList();
      },
      getArticleList() {
        this.$store.dispatch('search/refreshSearch', {
          search: this.search,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        });
      }
    },
    components: {
      ArticleList: () => import('../components/ArticleList.vue'),
      Pagination: () => import('../components/Pagination.vue')
    },
  };
</script>

<style lang="scss">
  .home-wrapper{
    position: relative;
  }
</style>
