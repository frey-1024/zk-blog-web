<template>
  <header class="zk-header fs-16">
    <div class="container pc-show pc-nav">
      <div class="flex-row nav">
        <ul class="nav-list flex-row row-left">
          <li @click="goView(navs[0])">
            <img class="logo" src="../../../assets/logo.jpg"/>
          </li>
          <li v-for="item in navs">
            <a href="javascript:;" @click="goView(item)" :class="{'active': pathName === item.pathName}">{{item.text}}</a>
          </li>
        </ul>
        <ul class="flex-row row-right col-top nav-user">
          <li class="form-group mb-0">
            <div class="has-icon">
              <input class="form-control" v-model="search" @keydown="inputSearch" type="text" placeholder="请输入搜索内容"/>
              <i @click="goSearch" class="fa fa-search right-input-icon text-gray pointer"></i>
            </div>
          </li>
          <li v-if="!isLogin" class="flex-row"><zk-button class="btn btn-default" @click="openRegister">注册</zk-button></li>
          <li v-if="!isLogin" class="flex-row"><zk-button class="btn btn-blue" @click="openLogin">登录</zk-button></li>
          <li class="flex-row" v-if="isLogin">
           <zk-button class="btn btn-blue" @click="go('edit')">新随笔</zk-button>
          </li>
          <li class="pointer" v-if="isLogin">
            <zk-dropdown :position="{x: 'right', y: 'bottom'}">
              <slot slot="title">
                <img src="http://f2.topitme.com/2/6a/bc/113109954583dbc6a2o.jpg" style="width: 30px;height: 30px; border-radius: 50%;"/>
              </slot>
              <slot slot="menu">
                <div class="menu-item active" @click="go('profile')">个人中心</div>
                <div class="menu-item" @click="logout">退出</div>
              </slot>
            </zk-dropdown>
          </li>
        </ul>
      </div>
    </div>
    <div class="container app-show app-nav">
      <ul class="app-header flex-row row-center">
        <li class="flex-1 flex-row row-left text-gray">
          <i class="fa fa-search"></i>
        </li>
        <li class="flex-2 flex-row row-center">
          <img class="logo" src="../../../assets/logo.jpg"/>
        </li>
        <li class="flex-1 flex-row row-right text-gray">
          <i class="fa fa-cog"></i>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex';
  import { SET_STATE } from '../../core/stores/mutationTypes';
  import { isBlank } from '../../core/utils/string';
  import navs from '../resources/navs';
  export default {
    data() {
      return {
        search: '',
        prevSearch: '',
        navs
      };
    },
    computed: {
      pathName() {
        this.initSearchVal();
        return this.$route.name;
      },
      ...mapState('user', {
        isLogin: state => state.isLogin,
      })
    },
    methods: {
      initSearchVal() {
        const search = this.$route.query.s;
        const val = !isBlank(search) ? search : '';
        // 不能直接复制，因为这样会导致computed重复执行。
        this.prevSearch = val;
        this.search = val;
      },
      inputSearch(ev) {
        const keyCode = ev.which;
        // enter 键
        if (keyCode === 13) {
          this.goSearch();
        }
      },
      goSearch() {
        // 没有搜索内容，将返回home页面
        if (isBlank(this.search)) {
          this.$router.push({name: 'home'});
          return;
        }
        // 阻止重复搜索
        if (this.search === this.prevSearch) {
          return;
        }
        this.prevSearch = this.search;
        if (this.pathName === 'search') {
          this.$store.dispatch('search/refreshSearch', {
            search: this.search
          });
        }
        this.$router.push({ name: 'search', query: { s: this.search } });
      },
      goView(item) {
        this.$router.push({ name: item.pathName });
      },
      go(name) {
        this.$router.push({ name });
      },
      openLogin() {
        this.$zkLogin().then((data) => {
          this.$store.commit(`user/${SET_STATE}`, data);
        });
      },
      openRegister() {
        this.$zkRegister().then((data) => {
          this.$store.commit(`user/${SET_STATE}`, data);
        });
      },
      logout() {
        this.$zkConfirm.warning('你确定退出登录吗？', '提示').then(() => {
          this.$store.commit(`user/${SET_STATE}`, {});
        }).catch(() => {});
      },
    },
    components: {
      ZkDropdown: () => import('./ZkDropdown.vue'),
    },
  };
</script>

<style lang="scss">
  @import "../styles/color";
  .zk-{
    &header{
      position: relative;
      z-index: 3;
      box-shadow: 0 2px 10px 0 rgba($c-black,.1), 0 1px rgba($c-black,.1);
      background: $c-bg-gray;
      width: 100%;
    }
  }
  .pc-nav{
    padding: 10px 0;
    .nav{
      & > .nav-list{
        & > li{
          margin-right: 10px;
          & > a{
            display: block;
            padding: 6px 15px;
            color: $c-text;
            &:hover, &.active{
              color: $c-green;
              background-color: $c-light-gray;
            }
          }
          & > .logo{
            height: 33px;
            overflow: hidden;
          }
        }
      }
      & > .nav-user{
        & > li{
          margin-left: 25px;
        }
        .bell:hover, .fa-search:hover{
          color: $c-blue;
        }
        .form-control{
          &:focus{
            transform: scale(1.2, 1) translateX(-18px);
          }
        }
      }
    }
  }
  .app-nav{
    & > .app-header{
      padding: 10px 15px;
      .logo{
        height: 23px;
      }
    }
  }
</style>
