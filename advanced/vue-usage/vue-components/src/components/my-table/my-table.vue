<template>
  <div class="my-table" :class="{'fixed-header': height}">
    <div class="table-wrapper" ref="tableWrapper" :style="tbodyStyle">
      <table ref="table">
        <thead ref="thead">
        <tr>
          <template v-for="col in cloneColumns">
            <th v-if="col.type === 'selection'" @click="checkAll">
              <input ref="checkAll" type="checkbox" :checked="rowSelection.length === dataSource.length">
            </th>
            <th v-else :key="col.key">
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
          </template>
        </tr>
        </thead>
        <tbody ref="tbody">
        <tr v-for="(row,i) in cloneData" :key="row[rowId]">
          <template v-for="col in cloneColumns">
            <td v-if="col.type === 'selection'" @click="onClickCheck(i,row,col)">
              <input type="checkbox" :checked="rowSelection.indexOf(i) !== -1">
            </td>
            <td v-else-if="col.scopedSlot">
              <slot :name="col.scopedSlot" v-bind="{text:row[col.key],row,i}"></slot>
            </td>
            <td v-else :key="col.key">
              {{ row[col.key] }}
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>
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
    rowSelection: { type: Array },
    height: {
      type: Number,
    }
  },
  computed: {
    tbodyStyle () {
      const { height } = this;
      return { height: height ? height + 'px' : 'auto' };
    }
  },
  data () {
    const enableCheck = this.getColumnsType() === 'selection';
    return {
      enableCheck,
      cloneColumns: JSON.parse(JSON.stringify(this.columns)),
      cloneData: JSON.parse(JSON.stringify(this.dataSource))
    };
  },
  mounted () {
    this.fixedHeader();
  },
  watch: {
    rowSelection: {
      handler (val) {
        this.$nextTick(() => {
          this.$refs.checkAll[0].indeterminate = val.length > 0 && val.length < this.dataSource.length;
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
    onClickCheck (i, col, row) {
      const rowSelection = JSON.parse(JSON.stringify(this.rowSelection));
      const index = rowSelection.indexOf(i);
      if (index !== -1) {
        rowSelection.splice(index, 1);
      } else {
        rowSelection.push(i);
      }
      this.$emit('update:rowSelection', rowSelection);
      this.$emit('select', rowSelection, col, row, i);
    },
    checkAll () {
      let rowSelection = [];
      if (this.rowSelection.length !== this.dataSource.length) {
        rowSelection = this.dataSource.map((item, i) => i);
      }
      this.$emit('update:rowSelection', rowSelection);
      this.$emit('select-all', rowSelection);
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
    },
    fixedHeader () {
      if (this.height) {
        const { thead, tbody, table, tableWrapper } = this.$refs;
        // 新创建的内容没有css scoped对应的随机字符串
        // 克隆的节点会保留vue增加的css scoped随机数
        const cloneTable = table.cloneNode(false);
        cloneTable.appendChild(thead);
        this.$el.insertBefore(cloneTable, tableWrapper);
        const tds = tbody.children[0].children;
        const ths = thead.children[0].children;
        for (let i = 0; i < tds.length; i++) {
          const td = tds[i];
          const th = ths[i];
          th.style.width = td.offsetWidth + 'px';
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my-table {
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }
  &.fixed-header {
    .table-wrapper {
      overflow: auto;
      border-bottom: 1px solid gray;
      tr:first-child {
        td {
          border-top: none;
        }
      }
      tr:last-child {
        td {
          border-bottom: none;
        }
      }
    }
  }
  th, td {
    text-align: left;
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
