<script setup>
import { ref } from 'vue';

let tabIndex = 2;
const editableTabsValue = ref('2');
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
]);

const addTab = (targetName) => {
  const newTabName = `${++tabIndex}`;
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  });
  editableTabsValue.value = newTabName;
};
const removeTab = (targetName) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
</script>

<template>
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <!-- https://element-plus.org/zh-CN/component/tabs.html#%E5%A2%9E%E5%8A%A0%E6%A0%87%E7%AD%BE%E9%A1%B5%E8%A7%A6%E5%8F%91%E5%99%A8%E8%87%AA%E5%AE%9A%E4%B9%89 -->
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      style="min-width: 100px"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>

    <span class="tag-btn">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
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
  @apply mb-0;
}
:deep(.el-tabs__header) {
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
