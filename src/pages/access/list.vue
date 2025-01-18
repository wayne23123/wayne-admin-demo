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
    ></el-tree>
  </el-card>
</template>
