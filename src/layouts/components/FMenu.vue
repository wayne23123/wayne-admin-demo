<script setup>
import { computed } from 'vue';

import { useRouter } from 'vue-router';

import { useStore } from 'vuex';

const router = useRouter();

const store = useStore();

const isCollapse = computed(() => {
  return !(store.state.asideWidth == '250px');
});

const asideMenu = [
  {
    name: '後臺面板',
    icon: 'help',
    child: [
      {
        name: '控制台',
        icon: 'home-filled',
        frontpath: '/',
      },
    ],
  },
  {
    name: '商城管理',
    icon: 'hopping-bag',
    child: [
      {
        name: '商品管理',
        icon: 'shopping-cart-full',
        frontpath: '/goods/list',
      },
    ],
  },
];

const handleSelect = (e) => {
  // console.log('e', e);
  router.push(e);
};
</script>

<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <!-- https://element-plus.org/zh-CN/component/menu.html -->
    <el-menu
      unique-opened="true"
      @select="handleSelect"
      :collapse="isCollapse"
      :collapse-transition="false"
      default-active="2"
      class="border-0"
    >
      <template v-for="(item, index) in asideMenu" :key="index">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.name }}</span>
          </template>

          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon><component :is="item2.icon" /></el-icon>

            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon><component :is="item.icon" /></el-icon>

          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.f-menu {
  /* width: 250px; */
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.2s ease-in-out;

  @apply shadow-md fixed bg-gray-50;
}
</style>
