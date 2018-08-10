<template>
  <div>
    <div class="flex-row row-left">
      <div class="user-avatar">
        <img src="http://f2.topitme.com/2/6a/bc/113109954583dbc6a2o.jpg"/>
      </div>
      <div class="flex-col row-left pl-10">
        <span class="user-name fs-14 pb-4">畅呼呼</span>
        <span class="text-gray">2018.07.30 21:39</span>
      </div>
    </div>
    <pre class="comment-content">什么公司丫 正在找坑位</pre>
    <div class="flex-row row-left">
      <span class="mr-20"> <icon name="thumbs-up" class="mr-4"/> 赞</span>
      <span><icon name="reply"></icon> 回复</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../core/styles/color";
  .user-avatar{
    width: 36px;
    height: 36px;
    & > img{
      border: 1px solid $c-light-border;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .comment-content{
    padding: 15px 0;
  }
</style>
