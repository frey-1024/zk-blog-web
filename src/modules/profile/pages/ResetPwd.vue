<template>
  <div class="basic-wrapper">
    <div class="flex-row row-left pb-30">
      <div class="user-avatar">
        <img class="w-100 h-100" src="http://f2.topitme.com/2/6a/bc/113109954583dbc6a2o.jpg"/>
        <div class="upload-file flex-row row-center fs-14">
          上传头像
          <input type="file" placeholder="上传头像"/>
        </div>
      </div>
      <div class="fs-14 pl-20 text-gray">
        <p class="pb-10">支持 jpg/jpeg/png 格式，大小不要超过 4MB</p>
        <p>该头像将会覆盖以前的头像</p>
      </div>
    </div>
    <zk-jitter :start.sync="error.nameJitter" class="form-group" :class="{'error': error.name}">
      <label class="form-label">账号</label>
      <input class="form-control " v-model="user.name" type="text" placeholder="账号"/>
      <p class="tip" v-text="error.nameTip"></p>
    </zk-jitter>
    <zk-jitter :start.sync="error.pwdJitter" class="form-group" :class="{'error': error.pwd}">
      <label class="form-label">旧密码</label>
      <input class="form-control" v-model="user.pwd" type="password" placeholder="旧密码"/>
      <p class="tip" v-text="error.pwdTip"></p>
    </zk-jitter>
    <zk-jitter :start.sync="error.pwdJitter" class="form-group" :class="{'error': error.pwd}">
      <label class="form-label">新密码</label>
      <input class="form-control" v-model="user.pwd" type="password" placeholder="新密码"/>
      <p class="tip" v-text="error.pwdTip"></p>
    </zk-jitter>
    <div class="text-center">
      <zk-button @click="login" class="btn btn-blue btn-md">保存</zk-button>
    </div>
  </div>
</template>

<script>
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
    components: {
      ZkJitter: () => import('../../core/components/ZkJitter.vue'),
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
