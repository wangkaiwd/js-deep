<template>
  <div class="my-table">
    <table>
      <thead>
      <tr>
        <th v-if="enableCheck" @click="checkAll">
          <input ref="checkAll" type="checkbox" :checked="rowSelection.length === dataSource.length">
        </th>
        <th v-for="col in cloneColumns" :key="col.key">
          {{ col.title }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row,i) in cloneData" :key="row[rowId]">
        <td v-if="enableCheck" @click="onClickCheck(i)">
          <input type="checkbox" :checked="rowSelection.indexOf(i) !== -1">
        </td>
        <td v-for="col in cloneColumns" :key="col.key">
          {{ row[col.key] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    rowId: {
      type: String,
      default: 'key'
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    rowSelection: { type: Array }
  },
  data () {
    const enableCheck = this.getColumnsType() === 'selection';
    return {
      enableCheck,
      cloneColumns: JSON.parse(JSON.stringify(this.columns)),
      cloneData: JSON.parse(JSON.stringify(this.dataSource))
    };
  },
  watch: {
    rowSelection: {
      handler (val) {
        this.$nextTick(() => {
          this.$refs.checkAll.indeterminate = val.length > 0 && val.length < this.dataSource.length;
        });
      },
      immediate: true
    }
  },
  methods: {
    getColumnsType () {
      for (let i = 0; i < this.columns.length; i++) {
        const col = this.columns[i];
        if (col.type) {
          return col.type;
        }
      }
    },
    onClickCheck (i) {
      const rowSelection = JSON.parse(JSON.stringify(this.rowSelection));
      const index = rowSelection.indexOf(i);
      if (index !== -1) {
        rowSelection.splice(index, 1);
      } else {
        rowSelection.push(i);
      }
      this.$emit('update:rowSelection', rowSelection);
    },
    checkAll () {
      let rowSelection = [];
      if (this.rowSelection.length !== this.dataSource.length) {
        rowSelection = this.dataSource.map((item, i) => i);
      }
      this.$emit('update:rowSelection', rowSelection);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-table {
  table {
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #000;
  }
}
</style>
