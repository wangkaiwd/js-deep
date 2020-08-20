<template>
  <div class="my-pagination">
    分页
  </div>
</template>

<script>
export default {
  name: 'MyPagination',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      required: true
    },
    pagerCount: {
      type: Number,
      default: 7
    }
  },
  data () {
    return {};
  },
};
</script>

<style scoped>
.my-pagination {

}
</style>
