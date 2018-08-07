<template>
  <ul class="zk-pagination-list flex-row row-center">
    <li v-text="prevText" :class="{'disabled': disabledType === 1}" @click="prev"></li>
    <li v-show="showPrevExpand" @click="expand(1)">&hellip;</li>
    <li v-for="item in currentList" v-text="item" :class="{'active': currentPage === item}" @click="selectPage(item)"></li>
    <li v-show="showNextExpand" @click="expand(2)">&hellip;</li>
    <li v-text="nextText" :class="{'disabled': disabledType === 2}" @click="next"></li>
  </ul>
</template>

<script>
  import { numberToArray } from '../../core/utils/string';
  export default {
    props: {
      total: {
        type: Number,
        required: true,
      },
      currentPage: {
        type: Number,
        default: 1,
      },
      prevText: {
        type: String,
        default: '<'
      },
      nextText: {
        type: String,
        default: '>'
      },
      pagerCount: {
        type: Number,
        default: 7
      }
    },
    data() {
      return {
        currentList: [],
        disabledType: 0, // 1 : prev, 2: next, 0 : 没有
        showPrevExpand: false,
        showNextExpand: false,
        startAndEnd: null,
      };
    },
    created() {
      this.resetPaginationList();
    },
    computed: {
      allPages() {
        return Math.ceil(this.total / this.pagerCount);
      },
      arrAllPages() {
        return numberToArray(1, this.allPages);
      }
    },
    methods: {
      prev() {
        if (this.disabledType === 1) {
          return;
        }
        this.emitParent(this.currentPage - 1);
      },
      next() {
        if (this.disabledType === 2) {
          return;
        }
        this.emitParent(this.currentPage + 1);
      },
      selectPage(num) {
        if (num === this.currentPage) {
          return;
        }
        this.emitParent(num);
      },
      expand(type) {
        let num;
        if (type === 1) {
          num = this.startAndEnd.start - 1;
        } else if (type === 2) {
          num = this.startAndEnd.end + 1;
        }
        this.emitParent(num);
      },
      emitParent(num) {
        this.$emit('update:currentPage', num);
        this.$emit('current-change', num);
      },
      /**
       * 设置临界值状态
       */
      setCriticalType() {
        if (this.currentPage <= 1) {
          this.disabledType = 1;
        } else if (this.currentPage >= this.allPages) {
          this.disabledType = 2;
        } else {
          this.disabledType = 0;
        }
      },
      /**
       * 获取当前选择的页，左右开始和结束位置的临界值
       */
      getStartAndEnd() {
        const ceilValue = Math.ceil(this.currentPage / this.pagerCount);
        let start = (ceilValue - 1) * this.pagerCount + 1;
        let end = ceilValue * this.pagerCount;
        // start临界值判断
        if (start < 1) {
          start = 1;
        }
        // end临界值判断
        if (end > this.allPages) {
          end = this.allPages;
        }
        this.startAndEnd = {
          start,
          end
        };
        return this.startAndEnd;
      },
      resetPaginationList() {
        // 设置临界值状态
        this.setCriticalType();
        // 总数小于等于需要显示的列表时
        if (this.pagerCount >= this.allPages) {
          this.currentList = this.arrAllPages;
        } else { // 总数大于需要显示的列表
          const {start, end} = this.getStartAndEnd();
          this.showPrevExpand = start > this.pagerCount;
          this.showNextExpand = end < this.allPages;
          this.currentList = numberToArray(start, end);
        }
      }
    },
    watch: {
      currentPage() {
        this.resetPaginationList();
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../core/styles/color";
  .zk-pagination-list{
    padding: 20px 0;
    li{
      border: 1px solid $c-light-border;
      padding: 4px;
      margin: 0 4px;
      min-width: 26px;
      text-align: center;
      color: $c-light-text;
      font-size: 14px;
      cursor: pointer;
      &.active, &.active:hover{
        color: $c-white;
        background-color: $c-blue;
      }
      &:hover{
        color: $c-blue;
      }
      &.disabled{
        background-color: $c-bg-gray;
        color: $c-gray;
        cursor: not-allowed;
      }
    }
  }
</style>
