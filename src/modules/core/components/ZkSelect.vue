<template>
  <section class="zk-select" :style="{ width: width }">
    <div class="form-control flex-row" @click.stop="changeShow">
      <input type="text" v-model="value.label" readonly="readonly" :placeholder="placeholder" autocomplete="off"/>
      <icon name="chevron-down" class="text-gray zk-dropdown-icon" :class="{'active': showOptions}"></icon>
    </div>
    <transition name="dropdown">
      <div class="zk-select-dropdown" v-show="showOptions">
        <div class="zk-options-wrapper">
          <ul class="zk-options fs-14 text-eps">
            <li
              v-for="item in options"
              :key="item.value"
              :class="{'active': item.value === value.value}"
              @click.stop="selectItem(item)">
              {{item.label}}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </section>
</template>
<script>
  export default {
    name: 'ZkSelect',
    props: {
      placeholder: {
        type: String,
        default: '请选择'
      },
      options: {
        type: Array,
        required: true,
      },
      width: {
        type: String,
        default: '240px'
      },
      value: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        showOptions: false,
      };
    },
    mounted() {
      window.addEventListener('click', this.hideOptions, false);
    },
    methods: {
      changeShow() {
        this.showOptions = !this.showOptions;
      },
      selectItem(item) {
        this.hideOptions();
        this.$emit('input', item);
      },
      hideOptions() {
        this.showOptions = false;
      }
    },
    destroyed() {
      window.removeEventListener('click', this.hideOptions, false);
    }
  };
</script>
<style lang="scss">
  @import "../styles/color";
  .zk-select{
    width: 240px;
    position: relative;
  }
  .zk-select-dropdown{
    max-height: 247px;
    overflow: hidden;
    min-width: calc(100% + 20px);
    position: absolute;
    top: 100%;
    left: 0;
    background-color: transparent;
    padding: 10px;
    margin-left: -10px;
    &:before, &:after{
      content: '';
      width:0;
      height:0;
      border-top:6px solid transparent;
      border-right:6px solid transparent;
      border-left:6px solid transparent;
      position: absolute;
      left: 50%;
      margin-left: -6px;
    }
    &:before{
      border-bottom:6px solid $c-border;
      top: -1px;
      filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
    }
    &:after{
      border-bottom:6px solid $c-white;
      top: 0;
    }
  }
  .zk-options-wrapper{
    overflow: hidden;
    border: 1px solid $c-border;
    border-radius: 4px;
    background-color: $c-white;
    box-shadow: 0 2px 12px 0 rgba($c-black,.1);
  }
  .zk-options{
    height: 100%;
    overflow: scroll;
    margin-bottom: -17px;
    margin-right: -17px;
    padding: 8px 0;
    & > li{
      padding: 0 20px;
      position: relative;
      color: $c-light-text;
      height: 34px;
      line-height: 34px;
      cursor: pointer;
      &:hover{
        background-color: $c-light-gray;
      }
    }
  }
  .zk-dropdown-icon{
    transition: all 0.6s;
    &.active{
      transform: rotate(-180deg);
    }
  }
  // 动画过渡
  .dropdown-enter-active, .dropdown-leave-active {
    transition: all 0.3s;
    transform-origin: center top;
  }
  .dropdown-enter, .dropdown-leave-to {
    max-height: 0;
    opacity: 0.6;
  }
</style>
