<template>
  <div class="date-picker">
    <input type="text" :value="formatDate" @focus="visible=true">
    <div class="content" v-if="visible">
      <div class="header">
        <span class="super-prev" @click="changeYear(-1)"><<</span>
        <span class="prev" @click="changeMonth(-1)"><</span>
        <span @click="mode='year'">{{ tempTime.year }}</span> 年 <span @click="mode = 'month'">{{
          tempTime.month + 1
        }}</span> 月
        <span class="next" @click="changeMonth(1)">></span>
        <span class="super-next" @click="changeYear(1)">>></span>
      </div>
      <template v-if="mode === 'date'">
        <div class="weeks">
          <div class="week" v-for="week in weeks" :key="week">
            {{ week }}
          </div>
        </div>
        <div class="days">
          <div v-for="row in 6" class="day-row" :key="`row_${row}`">
            <div
              v-for="col in 7"
              :class="getColClasses(row,col)"
              :key="`col_${col}`"
              @click="onSelect(row,col)"
            >
            <span class="text">
              {{ getCurrent(row, col).date.getDate() }}
            </span>
            </div>
          </div>
        </div>
      </template>
      <div class="year" v-if="mode === 'year'">
        year
      </div>
      <div class="month" v-if="mode === 'month'">
        <div class="month-item" v-for="item in months" :key="item">
          {{ item }}
        </div>
      </div>
      <button @click="visible=false">close</button>
    </div>
  </div>
</template>

<script>
// 计算日期：
//    1. 算出当月1号是周几，往前移
//    2. 计算出当月天数
//    3. 总天数42减去开始的天数，再减去当月天数，得到剩余天数
const getYearMonthDay = (date = new Date()) => {
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth();
  return { year, day, month };
};

export default {
  name: 'MyDate',
  props: {
    value: { type: [String, Date] } // '' empty string represent non select date
  },
  data () {
    const time = getYearMonthDay(this.value);
    return {
      visible: false,
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      mode: 'date', // year month week
      tempTime: { ...time },
    };
  },
  watch: {
    value (newVal) {
      this.tempTime = { ...getYearMonthDay(newVal) };
    }
  },
  computed: {
    formatDate () {
      if (this.value) {
        const { year, month, day } = getYearMonthDay(this.value);
        return `${year}-${month + 1}-${day}`;
      }
    },
    currentDays () {
      return this.getAllDays();
    },
    curMonthDays () {
      const { year, month } = this.tempTime;
      return new Date(year, month + 1, 0).getDate();
    }
  },
  mounted () {
  },
  methods: {
    // 计算当前面板展示的天的逻辑：要保证向前和向后分别空一行
    //    1. 计算当月第一天是星期几，根据星期数会向前偏移 0 -> 7 , 1->1 ,2 -> 2...
    //    2. 计算出前一个月的最后一天是第几天，然后根据向前偏移的星期数，遍历出前一个月展示的天
    //    3. 计算出当前月的总天数，并遍历出当月展示的天
    //    4. 总天数42 - 前一个月的天数 - 当前月天数 计算出下一个月的天数，之后遍历出展示的天
    getAllDays () {
      const { year, month } = this.tempTime;
      let firstWeek = new Date(year, month, 1).getDay();
      firstWeek = firstWeek === 0 ? 7 : firstWeek;
      const prevMonthCols = this.getPrevMonthCols(firstWeek);
      const curMonthCols = this.getCurMonthCols();
      const nextMonthCols = this.getNextMonthCols(firstWeek);
      return [...prevMonthCols, ...curMonthCols, ...nextMonthCols];
    },
    getPrevMonthCols (firstWeek) {
      const { year, month } = this.tempTime;
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      const cols = [];
      for (let i = prevMonthLastDay - firstWeek + 1; i <= prevMonthLastDay; i++) {
        const date = new Date(year, month - 1, i);
        cols.push({ type: 'prevMonth', date, today: false });
      }
      return cols;
    },
    getCurMonthCols () {
      const { year, month } = this.tempTime;
      const cols = [];
      for (let i = 1; i <= this.curMonthDays; i++) {
        const date = new Date(year, month, i);
        const today = this.isSameDay(new Date(), date);
        cols.push({ type: 'curMonth', date, today });
      }
      return cols;
    },
    getNextMonthCols (firstWeek) {
      const { year, month } = this.tempTime;
      const nextMonthDays = 42 - firstWeek - this.curMonthDays;
      const cols = [];
      for (let i = 1; i <= nextMonthDays; i++) {
        const date = new Date(year, month + 1, i);
        cols.push({ type: 'nextMonth', date, today: false });
      }
      return cols;
    },
    getCurrent (row, col) {
      return this.currentDays[row * 7 + col - 8];
    },
    changeMonth (n) {
      const { year, month, day } = this.tempTime;
      const date = new Date(year, month, day);
      date.setMonth(month + n);
      this.tempTime = getYearMonthDay(date);
    },
    changeYear (n) {
      const { year, month, day } = this.tempTime;
      const date = new Date(year, month, day);
      date.setFullYear(year + n);
      this.tempTime = getYearMonthDay(date);
    },
    getColClasses (row, col) {
      const { type, today, date } = this.getCurrent(row, col);
      const selected = this.isSameDay(this.value, date);
      return ['day-col', type, { today, selected }];
    },
    onSelect (row, col) {
      const { date } = this.getCurrent(row, col);
      this.tempTime = getYearMonthDay(date);
      this.$emit('input', date);
      this.visible = false;
    },
    isSameDay (date1, date2) {
      const { year, month, day } = getYearMonthDay(date1);
      const { year: year2, month: month2, day: day2 } = getYearMonthDay(date2);
      return year === year2 && month === month2 && day === day2;
    }
  }
};
</script>

<style lang="scss" scoped>
.date-picker {
  display: inline-block;
  .content {
    padding: 6px;
    border: 1px solid red;
  }
  .header {
    text-align: center;
  }
  .prev, .next {
    margin: 0 8px;
  }
  .weeks {
    display: flex;
    border-bottom: 1px solid #ccc;
  }
  .week {
    padding: 2px 8px;
    width: 42px;
    text-align: center;
  }
  .day-row {
    display: flex;
  }
  .day-col {
    width: 42px;
    height: 42px;
    padding: 8px;
    cursor: pointer;
    &.prevMonth, &.nextMonth {
      color: #c0c4cc;
    }
    &.today {
      color: red;
    }
    &:hover {
      color: red;
    }
    &.selected {
      .text {
        border-radius: 50%;
        background-color: red;
        color: #fff;
      }
    }
    .text {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
    }
  }
}
</style>