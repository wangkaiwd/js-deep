<template>
  <div class="date-picker">
    <input type="text" :value="formatDate" @focus="visible=true">
    <div class="content" v-if="visible">
      <div class="header">
        << < {{ time.year }} 年 {{ time.month }} 月 > >>
      </div>
      <div class="weeks">
        <div class="week" v-for="week in weeks" :key="week">
          {{ week }}
        </div>
      </div>
      <div class="month">
        <div v-for="row in 6" class="month-row" :key="`row_${row}`">
          <div v-for="col in 7" class="month-col" :key="`col_${col}`">
            {{ getDate(row, col).getDate() }}
          </div>
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
const getYearMonthDate = (date = new Date()) => {
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return { year, day, month };
};

export default {
  name: 'MyDate',
  props: {
    value: { type: Date }
  },
  data () {
    const time = getYearMonthDate(this.value);
    return {
      visible: false,
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      mode: 'date', // year month week
      time,
      tempTime: { ...time },
    };
  },
  computed: {
    formatDate () {
      if (this.value) {
        const { year, month, day } = this.tempTime;
        return `${year}-${month}-${day}`;
      }
    },
    currentDays () {
      return this.getAllDays();
    }
  },
  mounted () {
  },
  methods: {
    getAllDays () {
      let { year, month } = this.tempTime;
      month = month - 1;
      let startWeek = new Date(year, month, 1).getDay();
      startWeek = startWeek === 0 ? 7 : startWeek;
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      const currentMonthDays = new Date(year, month + 1, 0).getDate();
      const restDays = 42 - startWeek - currentMonthDays;
      const days1 = [];
      const days2 = [];
      const days3 = [];
      for (let i = prevMonthLastDay - startWeek + 1; i <= prevMonthLastDay; i++) {
        days1.push(new Date(year, month - 1, i));
      }
      for (let i = 1; i <= currentMonthDays; i++) {
        days2.push(new Date(year, month, i));
      }
      for (let i = 1; i <= restDays; i++) {
        days3.push(new Date(year, month + 1, i));
      }
      return [...days1, ...days2, ...days3];
    },
    getDate (row, col) {
      return this.currentDays[row * 7 + col - 8];
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
  .weeks {
    display: flex;
    border-bottom: 1px solid #ccc;
  }
  .week {
    padding: 2px 8px;
    width: 42px;
    text-align: center;
  }
  .month-row {
    display: flex;
  }
  .month-col {
    padding: 2px 8px;
    width: 42px;
    text-align: center;
  }
}
</style>
