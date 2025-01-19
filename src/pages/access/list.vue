<script setup>
import { ref } from 'vue';

import ListHeader from '../../components/ListHeader.vue';

import { getRuleList } from '@/api/rule';

import { useInitTable } from '@/composables/useCommon';

const defaultExpandedKeys = ref([]);

const { isLoading, tableData, getData } = useInitTable({
  getList: getRuleList,
  onGetListSuccess: (response) => {
    tableData.value = response?.data?.data?.list;

    defaultExpandedKeys.value = tableData.value.map((item) => {
      return item.id;
    });
  },
});
</script>

<template>
  <!-- epcard -->
  <el-card shadow="never" class="border-0">
    <ListHeader @refresh="getData"></ListHeader>

    <!-- https://element-plus.org/zh-CN/component/tree.html#tree-%E6%A0%91%E5%BD%A2%E6%8E%A7%E4%BB%B6 -->

    <el-tree
      v-loading="isLoading"
      :data="tableData"
      :props="{ label: 'name', children: 'child' }"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <!-- epta -->
          <el-tag size="small" :type="data.menu ? '' : 'info'">{{
            data.menu ? '菜單' : '權限'
          }}</el-tag>

          <el-icon v-if="data.icon" :size="16" class="ml-2"
            ><component :is="data.icon"
          /></el-icon>

          <span>{{ data.name }}</span>

          <div class="ml-auto">
            <!-- epsw -->
            <el-switch
              :modelValue="status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>

            <!-- epb -->
            <el-button text type="primary" size="small">修改</el-button>

            <el-button text type="primary" size="small">增加</el-button>

            <el-button text type="primary" size="small">刪除</el-button>
          </div>
        </div>
        <!-- <span class="flex justify-between w-full">
          <span class="flex items-center">
            <el-icon>
              <component :is="data.icon" />
            </el-icon>
            <span class="ml-2">{{ node.label }}</span>
          </span>
          <span class="flex items-center">
            <el-button size="small" text type="primary" @click="() => {}">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button size="small" text type="primary" @click="() => {}">
              <el-icon><Delete /></el-icon>
            </el-button>
          </span>
        </span> -->
      </template>
    </el-tree>

    <!-- <el-tree
      v-loading="isLoading"
      :data="tableData"
      :props="{ label: 'name', children: 'child' }"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
    ></el-tree> -->
  </el-card>
</template>

<style scoped>
.custom-tree-node {
  flex: 1;
  font-size: 14px;
  padding-right: 8px;
  @apply flex items-center;
}

:deep(.el-tree-node__content) {
  padding: 20px 0;
}
</style>
