<script setup>
import { ref } from 'vue';

import ListHeader from '../../components/ListHeader.vue';

import { getRuleList, createRule, updateRule } from '@/api/rule';

import { useInitTable, useInitForm } from '@/composables/useCommon';

import FormDrawer from '@/components/FormDrawer.vue';

// import ListHeader from '@/components/ListHeader.vue';

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

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit,
} = useInitForm({
  form: {
    rule_id: 0,
    menu: 0,
    name: '',
    condition: '',
    method: 'GET',
    status: 1,
    order: 50,
    icon: '',
    frontpath: '',
  },
  rules: {},
  getData,
  update: updateRule,
  create: createRule,
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
              :modelValue="data.status"
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

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <!-- epf -->
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="上級菜單" prop="rule_id">
          <el-input v-model="form.rule_id"></el-input>
        </el-form-item>

        <el-form-item label="菜單/規則" prop="menu">
          <el-input v-model="form.menu"></el-input>
        </el-form-item>

        <el-form-item label="菜單/權限名稱" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="菜單圖標" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>

        <el-form-item label="前端路由" prop="frontpath">
          <el-input v-model="form.frontpath"></el-input>
        </el-form-item>

        <el-form-item label="後端規則" prop="condition">
          <el-input v-model="form.condition"></el-input>
        </el-form-item>

        <el-form-item label="請求方式" prop="method">
          <el-input v-model="form.method"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="order">
          <el-input v-model="form.order"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>

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
