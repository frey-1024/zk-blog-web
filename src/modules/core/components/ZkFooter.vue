<template>
  <div class="zk-footer container">
    <div class="app-show pt-15">
      <ul class="nav-list flex-row row-left">
        <li v-for="item in navs" class="flex-1">
          <a href="javascript:;" @click="goView(item)" class="flex-col col-center" :class="{'active': pathName === item.pathName}">
            <i :class="`fa fa-${item.appIcon}`"></i>
            <span v-text="item.text" class="pt-4 fs-12"></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import navs from '../resources/navs';

  export default {
    data() {
      return {
        navs,
      };
    },
    computed: {
      pathName() {
        return this.$route.name;
      },
    },
    methods: {
      goView(item) {
        this.$router.push({ name: item.pathName });
      },
    }
  };
</script>
<style lang="scss" scoped>
  @import "../styles/color";
  .zk-footer{
    .nav-list{
      width: 100%;
      height: auto;
      padding: 4px 10px;
      background-color: $c-white;
      box-shadow: 0 -1px rgba($c-black,.1), 0 -2px 10px rgba($c-black,.1);
      & > li{
        & > a{
          color: $c-gray;
          &.active{
            color: $c-green;
          }
        }
      }
    }
  }
</style>
