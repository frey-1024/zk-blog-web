<template>
  <zk-empty-modal :visible.sync="visible">
    <div class="zk-date">
      <div class="zk-date-header">
        <div class="year">
          <transition name="fadeY">
            <div :key="selectDate.year" class="year-select" @click="openYearList" :class="{'active': showYear}">{{ selectDate.year }}</div>
          </transition>
        </div>
        <div class="month">
          <transition name="fadeY">
            <div :key="selectDate.day" class="month-select" :class="{'active': !showYear}" @click="openCalendarList"><span>{{keepDoubleDigit(selectDate.month)}}-{{keepDoubleDigit(selectDate.day)}}</span> <span>{{selectDate.weekStr}}</span></div>
          </transition>
        </div>
      </div>
      <div class="zk-date-content" v-show="!showYear">
        <div class="toolbar-wrapper">
          <zk-button class="btn btn-default toolbar" @click="prevMonth">
            <svg viewBox="0 0 24 24" class="toolbar-icon"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
          </zk-button>
          <div class="toolbar-select">
            <transition :name="fadeXType">
              <div :key="showDate.monthStr" class="select-content"><strong>{{showDate.year}}</strong> <span>{{ showDate.monthStr }}</span></div>
            </transition>
          </div>
          <zk-button class="btn btn-default toolbar" @click="nextMonth">
            <svg viewBox="0 0 24 24" class="toolbar-icon"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
          </zk-button>
        </div>
        <div class="week-list">
          <span class="week-item">一</span>
          <span class="week-item">二</span>
          <span class="week-item">三</span>
          <span class="week-item">四</span>
          <span class="week-item">五</span>
          <span class="week-item">六</span>
          <span class="week-item">日</span>
        </div>
        <div class="day-wrapper">
          <transition :name="fadeXType">
            <div :key="showDate.monthStr" class="day-list">
              <div class="day-row" v-for="row in rows">
              <span v-for="day in row"  class="day" @click="selectDay(day)" :class="{'active': day.selected, 'disabled': day.disabled}">
                <span v-text="day.value" class="day-value" :class="{'active': day.selected}"></span>
              </span>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <ul class="zk-year-list" v-show="showYear" ref="yearList">
        <li v-for="item in yearList" v-text="item" :class="{'active': item === selectDate.year}" @click="selectYear(item)"></li>
      </ul>
      <div class="zk-date-actions">
        <zk-button class="btn btn-green mr-20" @click="cancel">取消</zk-button>
        <zk-button class="btn btn-green" @click="confirm">确定</zk-button>
      </div>
    </div>
  </zk-empty-modal>
</template>
<script>
  import ZkEmptyModal from '../../../components/ZkEmptyModal.vue';
  // 阿拉伯数字 转 汉字数字的基本库
  const weekJson = {
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
    7: '星期日',
  };
  const monthJson = {
    1: '一月',
    2: '二月',
    3: '三月',
    4: '四月',
    5: '五月',
    6: '六月',
    7: '七月',
    8: '八月',
    9: '九月',
    10: '十月',
    11: '十一月',
    12: '十二月',
  };
  export default {
    name: 'ZkDatePicker',
    computed: {
      yearList() {
        const result = [];
        for (let i = this.copyMinDate.year; i <= this.copyMaxDate.year; i += 1) {
          result.push(i);
        }
        return result;
      },
      title() {
        // calendar 上面的所有 title 信息包括二部分
        return {
          year: '',
          monthday: '',
        };
      },
      rows() {
        const { year, month } = this.showDate;
        const months = (new Date(year, month, 0)).getDate();
        const result = [];
        let row = [];
        let weekValue;
        // 按照星期分组
        for (let i = 1; i <= months; i += 1) {
          // 根据日期获取星期，并让开头是1，而非0
          weekValue = (new Date(year, month, i)).getDay() + 1;
          // 判断月第一天在星期几，并填充前面的空白区域
          if (i === 1 && weekValue !== 1) {
            this.addRowEmptyValue(row, weekValue);
            this.addRowDayValue(row, i);
          } else {
            this.addRowDayValue(row, i);
            // 判断月最后一天在星期几，并填充后面的空白区域
            if (i === months && weekValue !== 7) {
              this.addRowEmptyValue(row, (7 - weekValue) + 1);
            }
          }
          // 按照一周分组
          if (weekValue % 7 === 0 || i === months) {
            result.push(row);
            row = [];
          }
        }
        this.showDate.monthStr = monthJson[this.showDate.month];
        return result;
      },
    },
    data() {
      return {
        selectDate: {
          year: '',
          month: '',
          day: '',
          week: '',
          date: '',
          weekStr: '',
          monthStr: '',
        }, // 选择的时间，默认是用户传的date时间
        showDate: {
          year: '',
          month: '',
          day: '',
          week: '',
          date: '',
          monthStr: '',
          weekStr: '',
        },
        copyMinDate: {
          year: '',
          month: '',
          day: '',
        },
        copyMaxDate: {
          year: '',
          month: '',
          day: '',
        },
        toolbar: '',
        fadeXType: 'fadeX_Prev',
        nextMonthClick: false,
        prevMonthClick: false,
        showYear: false,
        options: {},
        visible: false,
      };
    },
    methods: {
      initDatePicker() {
        this.showDate = { ...this.splitDate(this.options.date, true) };
        this.copyMinDate = { ...this.splitDate(this.options.minDate) };
        this.copyMaxDate = { ...this.splitDate(this.options.maxDate) };
        this.selectDate = { ...this.showDate };
      },
      splitDate(date, addStr) {
        let result = {};
        const splitValue = date.split('-');
        try {
          if (!splitValue || splitValue.length < 3) {
            throw new Error('时间格式不正确');
          }
          result = {
            year: Number(splitValue[0]),
            month: Number(splitValue[1]),
            day: Number(splitValue[2]),
          };
          if (addStr) {
            result.week = (new Date(result.year, result.month, result.day)).getDay() + 1;
            result.monthStr = monthJson[result.month];
            result.weekStr = weekJson[result.week];
          }
        } catch (error) {
          console.error(error);
        }
        return result;
      },
      addRowEmptyValue(row, count) {
        for (let w = 1; w < count; w += 1) {
          row.push({
            value: '',
          });
        }
      },
      addRowDayValue(row, i) {
        const value = { value: i };
        const { day, month, year } = this.selectDate;
        const showDate = this.showDate;
        // 判断已经选择的
        if (year === showDate.year && month === showDate.month && day === i) {
          value.selected = true;
        }
        // 当日期在最小值之外，禁止点击
        if (this.isMinLimitMonth() && i < this.copyMinDate.day) {
          value.disabled = true;
        }
        // 当日期在最大值之外，禁止点击
        if (this.isMaxLimitMonth() && i > this.copyMaxDate.day) {
          value.disabled = true;
        }
        row.push(value);
      },
      /**
       * 切换到上一个月
       */
      prevMonth() {
        if (this.prevMonthClick) {
          return;
        }
        this.prevMonthClick = true;
        setTimeout(() => {
          this.prevMonthClick = false;
        }, 500);
        this.fadeXType = 'fadeX_Prev';
        // 如何当前月份已经小于等于minMonth 就不让其在执行
        if (this.isMinLimitMonth()) {
          return;
        }
        const { year, month } = this.showDate;
        // 判断当前月份，如果已经等于1（1就是一月，而不是二月）
        if (month <= 1) {
          this.showDate.year = year - 1;
          this.showDate.month = 12;
        } else {
          this.showDate.month -= 1;
        }
      },
      /**
       * 切换到下一个月
       */
      nextMonth() {
        if (this.nextMonthClick) {
          return;
        }
        this.nextMonthClick = true;
        setTimeout(() => {
          this.nextMonthClick = false;
        }, 500);
        this.fadeXType = 'fadeX_Next';
        // 如何当前月份已经大于等于maxMonth 就不让其在执行
        if (this.isMaxLimitMonth()) {
          return;
        }
        const { year, month } = this.showDate;
        // 判断当前月份，如果已经等于12（12就是十二月）
        if (month >= 12) {
          this.showDate.year = year + 1;
          this.showDate.month = 1;
        } else {
          this.showDate.month += 1;
        }
      },
      resetSelectDate(dayValue) {
        this.selectDate = { ...this.showDate };
        this.selectDate.day = dayValue;
        this.selectDate.week = (new Date(this.showDate.year, this.showDate.month, dayValue)).getDay() + 1;
        this.selectDate.weekStr = weekJson[this.selectDate.week];
      },
      selectDay(day) {
        if (day.disabled || day.selected) {
          return;
        }
        this.resetSelectDate(day.value);
      },
      selectYear(value) {
        this.showYear = false;
        this.showDate.year = value;
        let type;
        // 当日期在最小值之外，月份换成最小值月份 或者 当日期在最大值之外，月份换成最大值月份
        if (this.isMinLimitMonth()) {
          type = 'copyMinDate';
        } else if (this.isMaxLimitMonth()) { // 当日期在最大值之外，月份换成最大值月份
          type = 'copyMaxDate';
        }
        if (type) {
          this.showDate.month = this[type].month;
          this.showDate.day = this[type].day;
          this.resetSelectDate(this.showDate.day);
          return;
        }
        let dayValue = this.selectDate.day;
        // 判断日是最大值，防止另一个月没有这个日期
        if (this.selectDate.day > 28) {
          const months = (new Date(this.showDate.year, this.showDate.month, 0)).getDate();
          // 当前月份没有这么多天，就把当前月份最大值赋值给day
          dayValue = months < dayValue ? months : dayValue;
        }
        this.resetSelectDate(dayValue);
      },
      isMinLimitMonth() {
        return this.showDate.year <= this.copyMinDate.year && this.showDate.month <= this.copyMinDate.month;
      },
      isMaxLimitMonth() {
        return this.showDate.year >= this.copyMaxDate.year && this.showDate.month >= this.copyMaxDate.month;
      },
      openYearList() {
        if (this.showYear) {
          this.showYear = false;
          return;
        }
        const index = this.yearList.indexOf(this.selectDate.year);
        this.showYear = true;
        setTimeout(() => {
          this.$refs.yearList.scrollTop = (index - 3) * 40;
        });
      },
      openCalendarList() {
        this.showYear = false;
      },
      // 保持两位数
      keepDoubleDigit(number) {
        return number > 9 ? number : `0${number}`;
      },
      open(options) {
        // 复制options, 防止引用问题
        this.options = { ...options };
        this.visible = true;
        this.initDatePicker();
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      },
      confirm() {
        this.visible = false;
        const { year, month, day, week, weekStr, monthStr } = this.selectDate;
        this.resolve({
          date: `${year}-${this.keepDoubleDigit(month)}-${this.keepDoubleDigit(day)}`,
          year,
          month,
          week,
          monthStr,
          weekStr,
          day,
        });
      },
      cancel() {
        this.visible = false;
        this.reject();
      },
    },
    components: {
      ZkEmptyModal
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/color";
  .zk-{
    &date{
      background-color: $c-white;
      width: 310px;
      box-shadow: 0 1px 3px rgba($c-black,.3);
      margin: 15vh auto 0 auto;
    }
    &date-header{
      background-color: $c-green;
      padding: 12px 20px;
      color: $c-white;
      font-weight: 500;
      .year{
        font-size: 18px;
        padding-bottom: 4px;
        position: relative;
        width: 66px;
        height: 25px;
        overflow: hidden;
        &-select{
          position: absolute;
          cursor: pointer;
          opacity: .7;
          &.active, &:hover{
            opacity: 1;
          }
        }
      }
      .month{
        font-size: 26px;
        position: relative;
        width: 100%;
        height: 36px;
        overflow: hidden;
        &-select{
          position: absolute;
          opacity: .7;
          cursor: pointer;
          &.active, &:hover{
            opacity: 1;
          }
        }
      }
    }
    &date-content{
      .toolbar-wrapper{
        margin: 5px 10px 5px 10px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .toolbar-select{
          position: relative;
          width: 108px;
          height: 22px;
          text-align: center;
          .select-content{
            position: absolute;
            width: 100%;
            font-size: 16px;
          }
        }
        .toolbar{
          padding: 8px;
          position: relative;
          height: 40px;
          width: 40px;
          border: none;
          border-radius: 50%;
          &-icon{
            display: block;
            fill: currentColor;
            height: 24px;
            width: 24px;
            user-select: none;
          }
          &-cover{
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            background-color: #E0E0E0;
            border-radius: 50%;
            opacity: 0;
            display: inline-block;
          }
        }
      }
      .week-list{
        width: 100%;
        font-size: 12px;
        color: rgba(0,0,0,.87);
        opacity: .5;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 16px;
        .week-item{
          flex: 1;
          text-align: center;
        }
      }
      .day-wrapper{
        padding-top: 10px;
        font-size: 14px;
        position: relative;
        width: 100%;
        min-height: 210px;
        overflow: hidden;
        .day-list{
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .day-row{
          display: flex;
          justify-content: center;
          align-items: center;
          .day{
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            position: relative;
            cursor: pointer;
            height: 35px;
            &-value{
              width: 25px;
              height: 25px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              &:hover{
                color: $c-green;
              }
              &.active{
                background-color: $c-green;
                color: $c-white;
              }
            }
            &.active{
              color: #ffffff;
            }
            &.disabled{
              opacity: .4;
              cursor: not-allowed;
            }
          }
        }
      }
    }
    &year-list{
      height: 276px;
      overflow: auto;
      li{
        padding: 10px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        &:hover, &.active{
          background-color: $c-bg-gray;
        }
        &.active{
          color: $c-green;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
    &date-actions{
      padding: 0 20px 15px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .fadeX_Prev-enter-active, .fadeX_Prev-leave-active, .fadeX_Next-enter-active, .fadeX_Next-leave-active, .fadeY-enter-active, .fadeY-leave-active{
    transition: all .3s;
  }
  .fadeX_Prev-enter{
    transform: translateX(-100px);
    opacity: 0;
  }
  .fadeX_Prev-leave-active{
    transform: translateX(100px);
    opacity: 0;
  }
  .fadeX_Next-enter{
    transform: translateX(100px);
    opacity: 0;
  }
  .fadeX_Next-leave-active{
    transform: translateX(-100px);
    opacity: 0;
  }
  .fadeY-enter{
    transform: translateY(30px);
    opacity: 0;
  }
  .fadeY-leave-active{
    transform: translateY(-30px);
    opacity: 0;
  }
</style>
