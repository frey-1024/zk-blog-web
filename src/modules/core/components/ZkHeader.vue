<template>
  <header class="zk-header fs-16">
    <div class="container pc-show pc-nav">
      <div class="flex-row nav">
        <ul class="nav-list flex-row row-left">
          <li @click="goView(navs[0])">
            <img class="logo" src="../../../assets/logo.png"/>
          </li>
          <li v-for="item in navs">
            <a href="javascript:;" @click="goView(item)" :class="{'active': pathName === item.pathName}">{{item.text}}</a>
          </li>
        </ul>
        <ul class="flex-row row-right nav-user" v-if="!isLogin">
          <li><zk-button class="btn btn-default" @click="openRegister">注册</zk-button></li>
          <li><zk-button class="btn btn-blue" @click="openLogin">登录</zk-button></li>
        </ul>
        <ul class="flex-row row-right nav-user" v-if="isLogin">
          <li class="flex-row">
           <zk-button class="btn btn-blue" @click="go('edit')">新随笔</zk-button>
          </li>
          <li class="text-gray pointer fs-20 pos-re bell flex-row">
            <sup class="badge is-fixed">10</sup>
            <icon name="bell" class="dis-b"/>
          </li>
          <li class="pointer">
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
          <icon name="search"></icon>
        </li>
        <li class="flex-2 flex-row row-center">
          <img class="logo" src="../../../assets/logo.png"/>
        </li>
        <li class="flex-1 flex-row row-right text-gray">
          <icon name="cog"></icon>
        </li>
      </ul>
      <ul class="nav-list flex-row row-left">
        <li v-for="item in navs" class="flex-1">
          <a href="javascript:;" @click="goView(item)" class="flex-col col-center" :class="{'active': pathName === item.pathName}">
            <icon :name="item.appIcon"></icon>
            <span v-text="item.text" class="pt-4 fs-12"></span>
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex';
  import { SET_STATE } from '../../core/stores/mutationTypes';
  export default {
    data() {
      return {
        navs: [{
          text: '首页',
          appIcon: 'home',
          pathName: 'home',
        }, {
          text: '随笔',
          appIcon: 'pen-square',
          pathName: 'notes',
        }, {
          text: '问答',
          appIcon: 'comments',
          pathName: 'comments',
        }, {
          text: '学习',
          appIcon: 'battery-three-quarters',
          pathName: 'charge',
        }, {
          text: '关于',
          appIcon: 'user',
          pathName: 'user',
        }]
      };
    },
    computed: {
      pathName() {
        return this.$route.name;
      },
      ...mapState('user', {
        isLogin: state => state.isLogin,
      })
    },
    methods: {
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
        .bell:hover{
          color: $c-blue;
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
    & > .nav-list{
      position: fixed;
      bottom: 0;
      left: 0;
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
