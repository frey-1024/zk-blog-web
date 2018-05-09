<template>
  <div>
    <div class="zk-editor-utils flex-row">
      <ul class="zk-editor-menu flex-row row-left">
        <li v-for="item in utils" class="flex-row">
          <a class="flex-row row-center" :class="{ 'active': !item.unselect && item.active }" @click.stop="selectUtil(item)" href="javascript:;">
            <icon :name="item.icon"></icon>
          </a>
          <span class="zk-editor-menu-separator" v-if="item.separator">|</span>
          <!--下拉选择框-->
          <zk-dropdown
            v-if="item.dropMenus && item.dropMenus.length"
            :dropStyle="item.dropStyle"
            :dropList.sync="item.dropMenus"
            v-show="item.show"
            @selected="getSelectAtDropdown(item, $event)"
          ></zk-dropdown>
        </li>
      </ul>
      <ul class="zk-editor-menu flex-row row-right">
        <li v-for="item in editorMode" class="flex-row">
          <a class="flex-row row-center" :class="{ 'active': !item.unselect && item.active }" @click.stop="selectUtil(item)" href="javascript:;">
            <icon :name="item.icon"></icon>
          </a>
          <span class="zk-editor-utils-separator" v-if="item.separator">|</span>
        </li>
      </ul>
    </div>
    <div class="zk-editor-content" contenteditable ref="contenteditable" @mousedown.stop="editorMouseDown" @mouseup.stop="editorMouseUp" @keyup.stop="createEmptyContent">
      <div>&#8203;<br></div>
    </div>
  </div>
</template>

<script>
  import { editorMenu, editorMode } from '../utils/editor/menu';
  import { removeAllRanges } from '../utils/editor/selection';
  import { setUtilsStatusByRange } from '../utils/editor/utilStatus';
  import { setContentByRange } from '../utils/editor/content';

  export default {
    name: 'editor',
    data () {
      return {
        utils: [],
        editorMode: [...editorMode],
      };
    },
    created() {
      this.copyMenuData();
    },
    methods: {
      getSelectAtDropdown(util, selectedItem) {
        util.show = false;
        const el = this.$refs.contenteditable;
        const selection = document.getSelection();
        Array.from(el.childNodes, (child) => {
          // 判断选择的节点是否在选择区域内，如果在，就设置该节点的样式
          if (selection.containsNode(child, true)) {
            setContentByRange(child, util.name, selectedItem.val);
          }
          return child;
        });
      },
      /**
       * 选择工具栏选项，并让选择的高亮/回复正常
       * @param item
       */
      selectUtil(item) {
        if (item.dropMenus && item.dropMenus.length) {
          item.show = !item.show;
          return;
        }
        // 当是活跃的工具（可选中）的元素时，才设置状态
        if (!item.unselect) {
          item.active = !item.active;
        }
        if (!item.dropMenus) {
          document.execCommand(item.name, false, null);
        }
      },
      /**
       * 当editor 内容删除完后，应该添加如下内容
       * @param ev
       */
      createEmptyContent(ev) {
        if (!ev.target.innerHTML) {
          ev.target.innerHTML = '<div>&#8203;<br></div>';
        }
      },
      editorMouseDown() {
        // 将所有的区域都从选区中移除。
        removeAllRanges();
      },
      editorMouseUp() {
        // 修改工具栏状态
        setUtilsStatusByRange(this.utils);
      },
      copyMenuData() {
        // 重新组装工具栏带有menus属性的下拉数据
        this.utils = editorMenu.map((item) => {
          if (item.dropMenus && item.dropMenus.length) {
            item.show = false;
          }
          return item;
        });
      },
    },
    mounted() {},
    components: {
      ZkDropdown: () => import('./ZkDropdown.vue'),
    }
  };
</script>

<style lang="scss" scoped>
  @import "../styles/color";
  .zk-editor-{
    &utils{
      background-color: $c-white;
      border: 1px solid $c-border;
      border-bottom: none;
    }
    &menu{
      padding: 4px 10px;
      & > li{
        position: relative;
        margin-right: 8px;
        & > a{
          padding: 4px;
          width: 26px;
          color: $c-gray;
          &.active, &:hover{
            color: $c-blue;
            background-color: $c-light-gray;
          }
        }
      }
      // 功能分隔线
      &-separator{
        font-size: 0;
        display: inline-block;
        height: 16px;
        width: 0;
        border-left: 1px solid $c-gray;
        margin-left: 8px;
      }
    }
    &content{
      word-wrap:break-word;
      word-break:break-all;
      overflow: auto;
      resize: vertical;
      height: 300px;
      border: 1px solid $c-border;
      width: 100%;
      padding: 10px;
    }
  }
</style>
