<template>
  <div class="basic-wrapper">
    <div class="flex-col col-center pb-20">
      <div class="user-avatar">
        <img class="w-100 h-100" src="http://f2.topitme.com/2/6a/bc/113109954583dbc6a2o.jpg"/>
        <div class="upload-file flex-row row-center fs-14">
          上传头像
          <input type="file" placeholder="上传头像"/>
        </div>
      </div>
      <div class="fs-14 pt-20 text-gray text-center">
        <p>该头像将会覆盖以前的头像</p>
        <p class="pt-10">支持 jpg/jpeg/png 格式，大小不要超过 4MB</p>
      </div>
    </div>
    <zk-jitter :start.sync="error.nameJitter" class="form-group" :class="{'error': error.name}">
      <label class="form-label">账号 <sup>*</sup></label>
      <input class="form-control" v-model="user.name" readonly="readonly" disabled="disabled" type="text" placeholder="请填写账号"/>
      <p class="tip" v-text="error.nameTip"></p>
    </zk-jitter>
    <zk-jitter :start.sync="error.nicknameJitter" class="form-group" :class="{'error': error.nickname}">
      <label class="form-label">昵称 <sup>*</sup></label>
      <input class="form-control" v-model="user.nickname" type="text" placeholder="请填写昵称"/>
      <p class="tip" v-text="error.nicknameTip"></p>
    </zk-jitter>
    <div class="flex-row">
      <zk-jitter :start.sync="error.emailJitter" class="form-group flex-1 pr-10" :class="{'error': error.email}">
        <label class="form-label">邮箱 <sup>*</sup></label>
        <input class="form-control" v-model="user.email" type="text" placeholder="请填写邮箱"/>
        <p class="tip" v-text="error.emailTip"></p>
      </zk-jitter>
      <zk-jitter :start.sync="error.mobileJitter" class="form-group flex-1 pl-10" :class="{'error': error.mobile}">
        <label class="form-label">手机号码 <sup>*</sup></label>
        <input class="form-control" v-model="user.mobile" type="text" placeholder="请填写手机号码"/>
        <p class="tip" v-text="error.mobileTip"></p>
      </zk-jitter>
    </div>
    <div class="flex-row">
      <zk-jitter :start.sync="error.genderJitter" class="flex-1 pr-10">
        <zk-select
          placeholder="请选择性别"
          width="100%"
          label="性别"
          sup="*"
          :error="error.gender"
          :error-tip="error.genderTip"
          v-model="user.gender"
          :options="options">
        </zk-select>
      </zk-jitter>
      <zk-jitter :start.sync="error.birthJitter" class="form-group flex-1 pl-10" :class="{'error': error.birth}">
        <label class="form-label">出生日期 <sup>*</sup></label>
        <input class="form-control pointer" v-model="user.birth" @click="openDatePicker" type="text" placeholder="请选择出生日期" readonly="readonly" autocomplete="off"/>
        <p class="tip" v-text="error.birthTip"></p>
      </zk-jitter>
    </div>
    <div class="text-center">
      <zk-button @click="save" class="btn btn-blue btn-md" :loading="loading">保存</zk-button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapState } from 'vuex';
  import { isBlank } from '../../core/utils/string';
  import { userInfo } from '../services/apiService';
  export default {
    data() {
      return {
        loading: false,
        error: {
          name: false,
          nameJitter: false,
          nameTip: '',
          nickname: false,
          nicknameJitter: false,
          nicknameTip: '',
          email: false,
          emailJitter: false,
          emailTip: '',
          mobile: false,
          mobileJitter: false,
          mobileTip: '',
          gender: false,
          genderJitter: false,
          genderTip: '',
          birth: false,
          birthJitter: false,
          birthTip: '',
        },
        user: {
          name: '',
          nickname: '',
          email: '',
          mobile: '',
          gender: '',
          birth: '',
        },
        options: [{
          value: 0,
          label: '男性',
        }, {
          value: 1,
          label: '女性',
        }],
      };
    },
    computed: {
      ...mapState('user', {
        userId: state => state.id,
      })
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      async getUserInfo() {
        const info = await userInfo.getAwait({ id: this.userId });
        this.user = {
          name: info.name,
          nickname: info.nickname,
          email: info.email,
          mobile: info.mobile,
          gender: info.gender,
          birth: info.birth,
        };
      },
      openDatePicker() {
        const opts = {
          maxDate: moment().format('YYYY-MM-DD')
        };
        if (this.user.birth) {
          opts.date = this.user.birth;
        }
        this.$zkDatePicker(opts).then((result) => {
          this.user.birth = result.date;
        }).catch((e) => {
          console.log(e);
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
        this.setErrorStatus('nickname');
        this.setErrorStatus('email');
        this.setErrorStatus('mobile');
        this.setErrorStatus('gender');
        this.setErrorStatus('birth');
        const { name, nickname, email, mobile, gender, birth } = this.user;
        // 判断账号
        if (isBlank(name)) {
          this.setErrorStatus('name', true, '请输入账号');
          return false;
        }
        // 判断昵称
        if (isBlank(nickname)) {
          this.setErrorStatus('nickname', true, '请输入昵称');
          return false;
        }
        // 判断邮箱
        if (isBlank(email)) {
          this.setErrorStatus('email', true, '请输入邮箱');
          return false;
        }
        // 判断号码
        if (isBlank(mobile)) {
          this.setErrorStatus('mobile', true, '请输入手机号码');
          return false;
        }
        // 判断性别
        if (isBlank(gender)) {
          this.setErrorStatus('gender', true, '请选择性别');
          return false;
        }
        // 判断出生日期
        if (isBlank(birth)) {
          this.setErrorStatus('birth', true, '请选择出生日期');
          return false;
        }
        return true;
      },
      async save() {
        if (!this.validate()) {
          return;
        }
        this.loading = true;
        const result = await userInfo.putAwait({
          name: this.user.name,
          nickname: this.user.nickname,
          email: this.user.email,
          mobile: this.user.mobile,
          gender: this.user.gender,
          birth: this.user.birth,
          id: this.userId
        }, { id: this.userId });
        this.loading = false;
        if (result !== 'e') {
          this.$zkMessage.success('个人信息修改成功');
        }
      }
    },
    components: {
      ZkJitter: () => import('../../core/components/ZkJitter.vue'),
      ZkSelect: () => import('../../core/components/ZkSelect.vue'),
      ZkDatePicker: () => import('../../core/components/ZkDatePicker.vue'),
    }
  };
</script>
<style lang="scss">
  @import "../../core/styles/color";
  .user-avatar{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 2px 18px rgba($c-black,.2);
    transition: box-shadow .5s;
    &:hover{
      .upload-file{
        transform: translateY(-100%);
      }
      box-shadow: 0 2px 18px rgba($c-green,.5);
    }
  }
  .upload-file{
    background-color: rgba($c-text, 0.5);
    transform: translateY(0);
    transition: transform 0.5s;
    height: 40px;
    width: 100%;
    color: $c-white;
  }
</style>
