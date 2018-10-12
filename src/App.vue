<template>
  <div id="app" class="flex-col row-between">
    <zk-header></zk-header>
    <div class="flex-1 app-content">
      <router-view />
      <div class="blog-footer-info text-center">
        <div class="pb-4">技术博客 <a href="https://github.com/zhangKunUserGit" target="_blank">GitHub</a></div>
        <p>邮箱: 1766597067@qq.com</p>
      </div>
    </div>
    <zk-footer></zk-footer>
  </div>
</template>

<script>
import ZkHeader from '@/components/ZkHeader.vue';
import ZkFooter from '@/components/ZkFooter.vue';

export default {
  components: { ZkHeader, ZkFooter },
  name: 'App',
  data () {
    return {
    };
  },
  methods: {
  }
};
</script>

<style lang="scss">
@import "./modules/core/styles/basic.scss";
  #app{
    height: 100%;
  }
.blog-footer-info{
  border-top: 1px solid $c-light-border;
  color: $c-gray;
  margin-top: 30px;
  padding-top: 10px;
}
</style>
