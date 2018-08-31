<template>
  <div class="basic-wrapper">
    <div class="flex-col col-center pb-30">
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
      <input class="form-control" v-model="user.name" type="text" placeholder="账号"/>
      <p class="tip" v-text="error.nameTip"></p>
    </zk-jitter>
    <zk-jitter :start.sync="error.sexJitter">
      <zk-select
        placeholder="请选择性别"
        width="100%"
        label="性别"
        sup="*"
        :error="error.sex"
        :error-tip="error.sexTip"
        v-model="user.sex"
        :options="options">
      </zk-select>
    </zk-jitter>
    <div class="text-center">
      <zk-button @click="save" class="btn btn-blue btn-md">保存</zk-button>
    </div>
  </div>
</template>

<script>
  import { isBlank } from '../../core/utils/string';
  export default {
    data() {
      return {
        error: {
          name: false,
          nameJitter: false,
          nameTip: '',
          sex: false,
          sexJitter: false,
          sexTip: '',
        },
        user: {
          name: '',
          sex: {}
        },
        options: [{
          value: 1,
          label: '男性',
        }, {
          value: 2,
          label: '女性',
        }],
      };
    },
    methods: {
      setErrorStatus(key, status = false, text = '') {
        this.error[key] = status;
        this.error[`${key}Jitter`] = status;
        this.error[`${key}Tip`] = text;
      },
      validate() {
        // 清除上次检测的状态
        this.setErrorStatus('name');
        this.setErrorStatus('sex');
        const { name, sex } = this.user;
        // 判断账号
        if (isBlank(name)) {
          this.setErrorStatus('name', true, '请输入账号');
          return false;
        }
        // 判断性别
        if (isBlank(sex) || isBlank(sex.value)) {
          this.setErrorStatus('sex', true, '请选择性别');
          return false;
        }
        return true;
      },
      save() {
        if (!this.validate()) {
          return;
        }
        console.log('success');
      }
    },
    components: {
      ZkJitter: () => import('../../core/components/ZkJitter.vue'),
      ZkSelect: () => import('../../core/components/ZkSelect.vue'),
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
  .form-group{
    margin-bottom: 20px;
  }
</style>
