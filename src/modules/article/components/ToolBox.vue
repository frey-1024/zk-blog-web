<template>
  <ul class="tool-list">
    <li v-for="item in fontList" class="text-gray-hover flex-col row-center" @click="triggerTool(item)">
      <span class="pb-4 text-center" v-text="votes" v-if="item.isShowNumber"></span>
      <icon :name="item.name" scale="1.5"/>
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      votes: {
        type: Number,
        required: true,
      }
    },
    data() {
      return {
        fontList: [{
          type: 'votes',
          name: 'thumbs-up',
          isShowNumber: true,
        }, {
          type: 'comment',
          name: 'comment-alt',
        }, {
          type: 'menu',
          name: 'list-ul',
        }],
      };
    },
    methods: {
      triggerTool(item) {
        this.$emit('tool', item.type);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../core/styles/color";
  .tool-list{
    position: fixed;
    margin-left: -70px;
    margin-top: 150px;
    & > li{
      padding: 12px 2px;
      width: 46px;
      border: 1px solid $c-border;
      border-bottom: none;
      &:last-child{
        border-bottom: 1px solid $c-border;
      }
      &:hover{
        box-shadow: inset 0 0 5px 0 $c-light-border;
      }
    }
  }
</style>
