<template>
  <div class="my-pagination">
    <div class="pagers">
      <div class="pager" v-for="pager in pagers" :key="pager">
        {{ pager }}
      </div>
    </div>
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
    return {
      pagers: []
    };
  },
  mounted () {
    const { current } = this;
    const totalPage = Math.ceil(this.total / this.pageSize);
    if (totalPage <= 7) {
      // https://stackoverflow.com/a/33352604
      this.pagers = [...Array(totalPage).keys()];
    } else {
      const array = [1, current - 2, current - 1, current, current + 1, current + 2, totalPage];
      this.pagers = array
        .filter(pager => pager > 0 && pager <= totalPage)
        .filter((pager, i) => i === array.indexOf(pager))
        .reduce((accumulator, next) => {
          const lastItem = accumulator[accumulator.length - 1];
          if (lastItem && (lastItem + 1) !== next) {
            accumulator.push('...', next);
          } else {
            accumulator.push(next);
          }
          return accumulator;
        }, []);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-pagination {
  .pagers {
    display: flex;
  }
  .pager {
    border: 1px solid black;
    margin: 0 2px;
    padding: 4px 12px;
  }
}
</style>
