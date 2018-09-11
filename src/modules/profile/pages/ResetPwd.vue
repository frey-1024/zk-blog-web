<template>
  <div class="basic-wrapper">
    <zk-jitter :start.sync="error.oldPwdJitter" class="form-group" :class="{'error': error.oldPwd}">
      <label class="form-label">旧密码</label>
      <input class="form-control" v-model="user.oldPwd" type="password" placeholder="旧密码"/>
      <p class="tip" v-text="error.oldPwdTip"></p>
    </zk-jitter>
    <zk-jitter :start.sync="error.newPwdJitter" class="form-group" :class="{'error': error.newPwd}">
      <label class="form-label">新密码</label>
      <input class="form-control" v-model="user.newPwd" type="password" placeholder="新密码"/>
      <p class="tip" v-text="error.newPwdTip"></p>
    </zk-jitter>
    <div class="text-center">
      <zk-button @click="save" class="btn btn-blue btn-md" :loading="loading">重置密码</zk-button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import md5 from 'blueimp-md5';
  import { resetPwd } from '../services/apiService';
  import { isBlank } from '../../core/utils/string';
  export default {
    data() {
      return {
        error: {
          oldPwd: false,
          oldPwdJitter: false,
          oldPwdTip: '',
          newPwd: false,
          newPwdJitter: false,
          newPwdTip: '',
        },
        user: {
          oldPwd: '',
          newPwd: ''
        },
        loading: false,
      };
    },
    computed: {
      ...mapState('user', {
        userId: state => state.id,
      })
    },
    methods: {
      setErrorStatus(key, status = false, text = '') {
        this.error[key] = status;
        this.error[`${key}Jitter`] = status;
        this.error[`${key}Tip`] = text;
      },
      validate() {
        // 清除上次检测的状态
        this.setErrorStatus('oldPwd');
        this.setErrorStatus('newPwd');
        const { oldPwd, newPwd } = this.user;
        // 判断账号
        if (isBlank(oldPwd)) {
          this.setErrorStatus('oldPwd', true, '请输入旧密码');
          return false;
        }
        // 判断性别
        if (isBlank(newPwd)) {
          this.setErrorStatus('newPwd', true, '请输入新密码');
          return false;
        }
        return true;
      },
      async save() {
        if (!this.validate()) {
          return;
        }
        this.loading = true;
        const result = await resetPwd.putAwait({ id: this.userId, newPassword: md5(this.user.newPwd), password: md5(this.user.oldPwd) });
        this.loading = false;
        if (result !== 'e') {
          this.$zkMessage.success('密码重置成功');
          this.user = {
            oldPwd: '',
            newPwd: ''
          };
        }
      }
    },
    components: {
      ZkJitter: () => import('../../core/components/ZkJitter.vue'),
    }
  };
</script>
<style lang="scss">
  @import "../../core/styles/color";
  .form-group{
    margin-bottom: 20px;
  }
</style>
