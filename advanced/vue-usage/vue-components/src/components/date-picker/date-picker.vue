<template>
  <div class="date-picker">
    <input type="text" @focus="visible=true">
    <div class="content" v-if="visible">
      <div class="header">
        << < 2020 年 8 月 > >>
      </div>
      <div class="week">
        日 一 二 三 四 五 六
      </div>
      <div class="day">
        12345678
      </div>
      <button @click="visible=false">close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDate',
  data () {
    return {
      visible: false
    };
  },
};
</script>

<style scoped>
.date-picker {

}
</style>
