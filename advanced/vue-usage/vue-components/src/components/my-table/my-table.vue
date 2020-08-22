<template>
  <div class="my-table">
    <table>
      <thead>
      <tr>
        <th v-for="col in columns" :key="col.dataIndex">
          {{ col.title }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in dataSource" :key="row[rowId]">
        <td v-for="col in columns" :key="col.dataIndex">
          {{ row[col.dataIndex] }}
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
    return {};
  },
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
