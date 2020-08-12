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
        <div v-for="i in 6" class="month-row" :key="`row_${i}`">
          <div v-for="j in 7" class="month-col" :key="`col_${j}`">
            1
          </div>
        </div>
      </div>
      <button @click="visible=false">close</button>
    </div>
  </div>
</template>

<script>
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
      tempTime: { ...time }
    };
  },
  computed: {
    formatDate () {
      if (this.value) {
        const { year, month, day } = this.tempTime;
        return `${year}-${month}-${day}`;
      }
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
    min-width: 2em;
    text-align: center;
  }
  .month-row {
    display: flex;
  }
  .month-col {
    padding: 2px 8px;
    min-width: 2em;
    text-align: center;
    border: 1px solid blue;
  }
}
</style>
