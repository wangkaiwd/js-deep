<template>
  <div class="my-menu">
    <el-menu>
      <reuse-menu
        v-for="data in dataSource"
        :data="data"
        :key="data.key">
      </reuse-menu>
    </el-menu>
    <!--    <el-menu>
          <el-submenu title="0">
            <el-menu-item>
              0-1
            </el-menu-item>
            <el-menu-item>
              0-2
            </el-menu-item>
            <el-submenu title="0-3">
              <el-menu-item>
                0-3-1
              </el-menu-item>
              <el-menu-item>
                0-3-2
              </el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu title="1">
            <el-menu-item>
              1-1
            </el-menu-item>
            <el-menu-item>
              1-2
            </el-menu-item>
            <el-submenu title="1-3">
              <el-menu-item>
                1-3-1
              </el-menu-item>
              <el-menu-item>
                1-3-2
              </el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item>
            3
          </el-menu-item>
        </el-menu>-->
  </div>
</template>

<script>
  import ElMenu from '@/components/el-menu/el-menu';
  import ElMenuItem from '@/components/el-menu/el-menu-item';
  import ElSubmenu from '@/components/el-menu/el-submenu';
  import ReuseMenu from '@/view/reuse-menu';

  export default {
    name: 'MyMenu',
    components: {
      ElMenu,
      ElMenuItem,
      ElSubmenu,
      ReuseMenu
    },
    data () {
      return {
        dataSource: [
          {
            title: '0',
            key: '0',
            children: [
              {
                key: '0-1',
                title: '0-1'
              },
              {
                key: '0-2',
                title: '0-2'
              },
              {
                key: '0-3',
                title: '0-3',
                children: [
                  {
                    key: '0-3-1',
                    title: '0-3-2'
                  }

                ]
              }
            ]
          },
          {
            title: '1',
            key: '1',
            children: [
              {
                key: '1-1',
                title: '1-1'
              },
              {
                key: '1-2',
                title: '1-2'
              },
              {
                key: '1-3',
                title: '1-3',
                children: [
                  {
                    key: '1-3-1',
                    title: '1-3-2'
                  }
                ]
              }
            ]
          },
          { key: '3', title: '3' }
        ]
      };
    }
  };
</script>

<style scoped>
  .my-menu {

  }
</style>
