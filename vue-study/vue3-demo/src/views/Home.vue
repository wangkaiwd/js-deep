<template>
  <div class="home">
    <a-list bordered :data-source="data">
      <template #renderItem="{item}">
        <a-list-item>
          {{ item.name }}
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
    const state = reactive({ data: [] });
    const getX = () => {
      http.get('/articles')
        .then(res => {
          state.data = res;
        });
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
