<template>
  <div class="my-progress">
    <div class="inner" :style="{ width: percentage + '%'}"></div>
  </div>
</template>

<script>
export default {
  name: 'MyProgress',
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.my-progress {
  border: 1px solid red;
  height: 6px;
  .inner {
    height: 100%;
    background-color: blue;
    transition: width 0.4s ease;
  }
}
</style>
