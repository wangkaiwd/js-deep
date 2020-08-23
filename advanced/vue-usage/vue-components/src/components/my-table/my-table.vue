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
          <div class="sorter" v-if="col.sort">
            <span
              :class="sorterCls('ascend',col)"
              @click="onSort('ascend', col)"
            >
              升序
            </span>
            <span
              :class="sorterCls('descend',col)"
              @click="onSort('descend',col)"
            >
              降序
            </span>
          </div>
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
    sorterCls (type, col) {
      return ['text', { [type]: col.sort === type }];
    },
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
    },
    onSort (type, col) {
      const { key } = col;
      if (type === col.sort) {
        this.cloneColumns = JSON.parse(JSON.stringify(this.columns));
        this.cloneData = JSON.parse(JSON.stringify(this.dataSource));
        return;
      }
      // 需要注意：这里的col与cloneColumns中对应项指向的是同一片内存空间，并不用重新查找对应项
      // 图解： https://excalidraw.com/#json=5942638729494528,c_ao5xZrIQxXPOTMu4af3Q
      col.sort = type;
      this.cloneData.sort((a, b) => {
        if (a[key] < b[key]) {
          return type === 'ascend' ? -1 : 1;
        } else if (a[key] > b[key]) {
          return type === 'descend' ? -1 : 1;
        }
        return 0;
      });
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
  .text {
    font-size: 12px;
    color: gray;
  }
  .ascend, .descend {
    color: red;
  }
}
</style>
