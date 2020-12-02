<template>
  <div class="home">
    <a-list :loading="loading" bordered :data-source="data">
      <template #renderItem="{item}">
        <a-list-item>
          {{ item.desc }}
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script>
import http from '@/http/request';
import { onMounted, reactive, toRefs } from 'vue';

export default {
  name: 'Home',
  setup () {
    const state = reactive({ data: [], loading: false });
    const getX = () => {
      state.loading = true;
      http.post('/home')
        .then(res => {
          state.data = res.data.iconList;
        }).finally(() => state.loading = false);
    };
    onMounted(() => {
      getX();
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>
<style lang="less">
.home {
  background-color: #fff;
}
</style>
