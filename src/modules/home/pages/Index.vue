<template>
  <div class="container pt-15 home-wrapper">
    <news-list :data-list="dataList"></news-list>
    <!--<zk-editor></zk-editor>-->
  </div>
</template>

<script>
  import NewsList from '../components/NewsList.vue';
//  import ZkEditor from '../../core/components/ZkEditor.vue';
  export default {
    data() {
      return {
        dataList: [{
          title: 'webpack初探——js打包',
          excerpt: 'webpack已经成为编译构建前端项目的必备工具。今天就来了解一下webpack的打包机制，先从最简单的js编译打包开始。',
          votes: 6,
          read: 200,
          release: '2018-6-20',
          id: 1,
        }, {
          title: 'webpack初探——js打包',
          excerpt: 'webpack已经成为编译构建前端项目的必备工具。今天就来了解一下webpack的打包机制，先从最简单的js编译打包开始。',
          votes: 6,
          read: 200,
          release: '2018-6-20',
          id: 2,
        }, {
          title: 'webpack初探——js打包',
          excerpt: 'webpack已经成为编译构建前端项目的必备工具。今天就来了解一下webpack的打包机制，先从最简单的js编译打包开始。',
          votes: 6,
          read: 200,
          release: '2018-6-20',
          id: 7,
        }, {
          title: 'webpack初探——js打包',
          excerpt: 'webpack已经成为编译构建前端项目的必备工具。今天就来了解一下webpack的打包机制，先从最简单的js编译打包开始。',
          votes: 6,
          read: 200,
          release: '2018-6-20',
          id: 3,
        }, {
          title: 'webpack初探——js打包',
          excerpt: 'webpack已经成为编译构建前端项目的必备工具。今天就来了解一下webpack的打包机制，先从最简单的js编译打包开始。',
          votes: 6,
          read: 200,
          release: '2018-6-20',
          id: 4,
        }]
      };
    },
    components: { NewsList },
  };
</script>

<style lang="scss">
  .home-wrapper{
    position: relative;
  }
</style>
