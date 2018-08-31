<template>
  <zk-modal size="xs" :visible.sync="openModal">
    <span slot="title">登录</span>
    <slot slot="body">
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
    </slot>
    <slot slot="footer">
      <zk-button class="btn btn-default" @click="close">取消</zk-button>
      <zk-button @click="login" class="btn btn-blue">登录</zk-button>
    </slot>
  </zk-modal>
</template>

<script>
  import md5 from 'blueimp-md5';
  import { isBlank } from '../../../utils/string';
  import { login } from '../../../../profile/services/apiService';
  export default {
    data() {
      return {
        openModal: false,
        resolve: null,
        reject: null,
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
    methods: {
      open() {
        this.openModal = true;
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
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
      async login() {
        if (!this.validate()) {
          return;
        }
        const { name, pwd } = this.user;
        const data = await login.postAwait({
          name,
          password: md5(pwd)
        });
        if (data) {
          this.$zkMessage.success('登录成功。');
          this.resolve(data);
          this.close();
        }
      },
      close() {
        this.openModal = false;
      }
    },
    components: {
      ZkJitter: () => import('../../../components/ZkJitter.vue'),
    }
  };
</script>

<style lang="scss">
</style>
