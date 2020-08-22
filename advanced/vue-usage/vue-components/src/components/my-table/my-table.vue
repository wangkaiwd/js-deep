<template>
  <div class="my-table">
    <table>
      <thead>
      <tr>
        <th v-if="enableCheck">
          <input type="checkbox">
        </th>
        <th v-for="col in cloneColumns" :key="col.key">
          {{ col.title }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row,i) in cloneData" :key="row[rowId]">
        <td v-if="enableCheck" @click="onClickCheck(i)">
          <input type="checkbox">
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
  methods: {
    getColumnsType () {
      for (let i = 0; i < this.columns.length; i++) {
        const col = this.columns[i];
        console.log(col);
        if (col.type) {
          return col.type;
        }
      }
    },
    onClickCheck () {

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
