<script setup>
import { ref, computed } from 'vue';

import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';

import { useStore } from 'vuex';

const router = useRouter();

const store = useStore();

const route = useRoute();

// 預設選中
const defaultActive = ref(route.path);

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%8F%AF%E7%94%A8%E7%9A%84%E9%85%8D%E7%BD%AE-API
// 監聽路由變化
onBeforeRouteUpdate((to, from) => {
  // console.log('to', to);

  defaultActive.value = to.path;
});

const isCollapse = computed(() => {
  return !(store.state.asideWidth == '250px');
});

// const asideMenu = [
//   {
//     name: '後臺面板',
//     icon: 'help',
//     child: [
//       {
//         name: '控制檯',
//         icon: 'home-filled',
//         frontpath: '/',
//       },
//     ],
//   },
//   {
//     name: '商城管理',
//     icon: 'shopping-bag',
//     child: [
//       {
//         name: '商品管理',
//         icon: 'shopping-cart-full',
//         frontpath: '/goods/list',
//       },
//     ],
//   },
// ];
const asideMenu = computed(() => {
  return store.state.menus;
});

const handleSelect = (e) => {
  // console.log('e', e);
  router.push(e);
};
</script>

<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <!-- https://element-plus.org/zh-CN/component/menu.html -->
    <el-menu
      :default-active="defaultActive"
      :unique-opened="true"
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
          class="bg-slate-200"
        >
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span class="select-none">{{ item.name }}</span>
          </template>

          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
            class="bg-zinc-50"
          >
            <el-icon><component :is="item2.icon" /></el-icon>

            <span class="select-none">{{ item2.name }}</span>
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

  @apply shadow-md fixed bg-gray-50 bg-slate-200;
}

.f-menu::-webkit-scrollbar {
  width: 0px;
}
</style>
