<template>
  <section class="form login-wrapper">
    <div class="form-title">登录</div>
    <zk-jitter :start.sync="error.nameJitter" class="form-group" :class="{'error': error.name}">
      <label class="form-label">账号</label>
      <input class="form-control" v-model="user.name" type="text" placeholder="账号"/>
      <p class="tip" v-text="error.nameTip"></p>
    </zk-jitter>
    <zk-jitter :start.sync="error.pwdJitter" class="form-group" :class="{'error': error.pwd}">
      <label class="form-label">密码</label>
      <input class="form-control" v-model="user.pwd" type="password" placeholder="密码"/>
      <p class="tip" v-text="error.pwdTip"></p>
    </zk-jitter>
    <zk-button @click="login" class="btn btn-blue btn-md w-100 mt-10">登录</zk-button>
  </section>
</template>

<script>
  import md5 from 'blueimp-md5';
  import { isBlank } from '../../core/utils/string';
  import { login } from '../services/apiService';
  export default {
    data() {
      return {
        error: {
          name: false,
          nameJitter: false,
          nameTip: '',
          pwd: false,
          pwdJitter: false,
          pwdTip: '',
        },
        user: {
          name: '',
          pwd: ''
        },
      };
    },
    mounted() {
//      zkFetch('http://localhost:9090/security/login').post({
//        'name': '在沙发22939777上8的',
//        'password': '3344'
//      }).then((data) => {
//        console.log(data);
//      }).catch((e) => {
//        console.log(e);
//      });
//      login.post().then((data) => {
//        console.log(data.body);
//      }).catch();
      this.fn();
    },
    methods: {
      async fn() {
        await login.postAwait({
          'name': '在沙发22939777上8的',
          'password': '3344'
        }, {
          user: 'aaaa',
          aa: 'ssss',
          ll: '444'
        });
      },
      setErrorStatus(key, status = false, text = '') {
        this.error[key] = status;
        this.error[`${key}Jitter`] = status;
        this.error[`${key}Tip`] = text;
      },
      validate() {
        // 清除上次检测的状态
        this.setErrorStatus('name');
        this.setErrorStatus('pwd');
        const { name, pwd } = this.user;
        // 判断账号
        if (isBlank(name)) {
          this.setErrorStatus('name', true, '请输入账号');
          return false;
        }
        // 判断密码
        if (isBlank(pwd)) {
          this.setErrorStatus('pwd', true, '请输入密码');
          return false;
        }
        return true;
      },
      login() {
        if (!this.validate()) {
          return;
        }
        this.$zkMessage.warning('aaaa');
        // md5加密
        const v = md5('dddddd');
        console.log(v);
      },
    },
    components: {
      ZkJitter: () => import('../../core/components/ZkJitter.vue'),
    }
  };
</script>

<style lang="scss">
  .login-wrapper{
    width: 400px;
    margin-top: 15vh;
  }
</style>
