<template>
  <a-layout id="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo"/>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <user-outlined/>
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined/>
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined/>
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <h2>{{ count }}</h2>
        <h2>{{ person.name }}</h2>
        <h3>{{ a }}</h3>
        <h4>{{ b }}</h4>
        <h2>{{ decimal }}</h2>
        <a-button @click="onPlus">add 1</a-button>
        <a-button @click="onPlus1">add 2</a-button>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { reactive, toRefs, ref, computed } from 'vue';

export default {
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup () {
    const person = ref({ name: 1 });
    const state = reactive({ count: 1, a: [1, 2, 3], b: 10 });
    const onPlus = function () {
      state.count++;
      state.a[0]++;
      state.b++;
    };
    const onPlus1 = function () {
      person.value.name++;
    };
    const decimal = computed(() => {
      return state.b + 10;
    });
    console.log('decimal', decimal.value);
    return {
      onPlus,
      onPlus1,
      ...toRefs(state),
      person,
      decimal
    };
  },
  data () {
    return {
      selectedKeys: ['1'],
      collapsed: false,
    };
  },
};
</script>
<style>
#app {
  height: 100vh;
}
</style>
<style scoped lang="less">
#layout {
  height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>
