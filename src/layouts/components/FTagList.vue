<script setup>
import { ref } from 'vue';

import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

import { useCookies } from '@vueuse/integrations/useCookies';

const route = useRoute();

const router = useRouter();

const cookie = useCookies();

const activeTab = ref(route.path);
const tabList = ref([
  {
    title: '後台首頁',
    path: '/',
  },
]);

const addTab = (tab) => {
  let noTab =
    tabList.value.findIndex((item) => {
      return item.path == tab.path;
    }) == -1;
  if (noTab) {
    tabList.value.push(tab);
  }

  cookie.set('tabList', tabList.value);
};

const changeTab = (tab) => {
  // console.log('tab', tab);
  activeTab.value = tab;
  router.push(tab);
};

const removeTab = (value) => {
  // console.log('value', value);

  let tabs = tabList.value;
  let active = activeTab.value;

  if (active == value) {
    tabs.forEach((item, index) => {
      if (item.path == value) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          active = nextTab.path;
        }
      }
    });
  }

  activeTab.value = active;

  changeTab(active);

  tabList.value = tabList.value.filter((item) => item.path != value);

  cookie.set('tabList', tabList.value);
};

// 初始化 tab 導覽列
const initTabList = () => {
  let tabs = cookie.get('tabList');
  if (tabs) {
    tabList.value = tabs;
  }
};
initTabList();

const handleClose = (value) => {
  // console.log('value', value);

  if (value == 'clearAll') {
    // 切換回首頁
    activeTab.value = '/';

    changeTab(activeTab.value);

    // 過濾只剩下首頁
    tabList.value = [
      {
        title: '後台首頁',
        path: '/',
      },
    ];
  } else if (value == 'clearOther') {
    // 過濾只剩下首頁和當前頁面
    tabList.value = tabList.value.filter((item) => {
      return item.path == '/' || item.path == activeTab.value;
    });
  }

  cookie.set('tabList', tabList.value);
};

onBeforeRouteUpdate((to, from) => {
  // console.log('to', to);
  // console.log({
  //   title: to.meta.title,
  //   path: to.path,
  // });

  activeTab.value = to.path;

  addTab({
    title: to.meta.title,
    path: to.path,
  });
});
</script>

<template>
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <!-- https://element-plus.org/zh-CN/component/tabs.html#%E5%A2%9E%E5%8A%A0%E6%A0%87%E7%AD%BE%E9%A1%B5%E8%A7%A6%E5%8F%91%E5%99%A8%E8%87%AA%E5%AE%9A%E4%B9%89 -->
    <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
      style="min-width: 100px"
      @tab-remove="removeTab"
      @tab-change="changeTab"
    >
      <el-tab-pane
        :closable="item.path !== '/'"
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>

    <span class="tag-btn">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">關閉其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">全部關閉</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px"></div>
</template>

<style scoped>
.f-tag-list {
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
  @apply fixed flex px-2 items-center bg-gray-100;
}

.tag-btn {
  height: 32px;
  width: 32px;
  @apply flex justify-center items-center px-2 ml-auto rounded bg-white;
}

:deep(.el-tabs__header) {
  border: 0 !important;
  @apply mb-0;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}

:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 rounded;
}

:deep(.el-tabs__nav-next),(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}

:deep(.is-disabled) {
  @apply text-gray-300 cursor-not-allowed;
}
</style>
