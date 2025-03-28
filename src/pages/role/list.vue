<script setup>
import { ref } from 'vue';

import {
  getRoleList,
  createRole,
  updateRole,
  deleteRole,
  updateRoleStatus,
  setRoleRules,
} from '@/api/role';

import { getRuleList } from '@/api/rule';

import FormDrawer from '@/components/FormDrawer.vue';

import ListHeader from '@/components/ListHeader.vue';

import { useInitTable, useInitForm } from '@/composables/useCommon';

import { toast } from '@/composables/util';
import { get } from '@vueuse/core';

const {
  tableData,
  currentPage,
  total,
  limit,
  isLoading,
  getData,
  handleDelete,
  handleStatusChange,
} = useInitTable({
  getList: getRoleList,
  delete: deleteRole,
  updateStatus: updateRoleStatus,
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
    name: '',
    desc: '',
    status: 1,
  },
  rules: {
    name: [
      {
        required: true,
        message: '角色名稱不能為空',
        trigger: 'blur',
      },
    ],
  },
  //getData 從上面 useInitTable 獲取
  getData,
  update: updateRole,
  create: createRole,
});

const setRuleFormDrawerRef = ref(null);

const ruleList = ref([]);

const treeHeight = ref(0);

const roleId = ref(0);

const defaultExpandedKeys = ref([]);

const elTreeTef = ref(null);

// 當前角色擁有的權限 ID
const ruleIds = ref([]);

const checkStrictly = ref(false);

const openSetrule = (row) => {
  roleId.value = row.id;

  // treeHeight.value = window.innerHeight - 170;
  treeHeight.value = window.innerHeight - 180;

  checkStrictly.value = true;

  getRuleList(1).then((res) => {
    // console.log('res', res);

    ruleList.value = res.data.data.list;

    defaultExpandedKeys.value = res.data.data.list.map((item) => item.id);

    setRuleFormDrawerRef.value.open();

    // 當前角色擁有的權限 ID
    // console.log(row);
    // console.log(row.rules.map((item) => item.id));

    ruleIds.value = row.rules.map((item) => item.id);

    setTimeout(() => {
      elTreeTef.value.setCheckedKeys(ruleIds.value);

      // 不設定關聯會選中後不選取子元素
      checkStrictly.value = false;
    }, 150);
  });
};

const handleSetRuleSubmit = () => {
  setRuleFormDrawerRef.value.showLoading();

  setRuleRules(roleId.value, ruleIds.value)
    .then((response) => {
      toast('設置成功');

      getData();

      setRuleFormDrawerRef.value.close();
    })
    .finally(() => {
      setRuleFormDrawerRef.value.hideLoading();
    });
};

const handleTreeCheck = (...e) => {
  // console.log(e);

  const { checkedKeys, halfCheckedKeys } = e[1];

  ruleIds.value = [...checkedKeys, ...halfCheckedKeys];
};
</script>

<template>
  <!-- rpcard -->
  <el-card shadow="never" class="border-0">
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      v-loading="isLoading"
    >
      <el-table-column prop="name" label="角色名稱" />
      <el-table-column prop="desc" label="角色描述" width="300" />
      <el-table-column label="狀態" width="120">
        <template #default="{ row }">
          <el-switch
            @change="handleStatusChange($event, row)"
            :modelValue="row.statue"
            :active-value="1"
            :inactive-value="0"
            :loading="row.statusLoading"
            :disabled="row.super == 1"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template #default="scope">
          <el-button
            @click="openSetrule(scope.row)"
            type="primary"
            text
            size="small"
            >配置權限</el-button
          >

          <el-button
            @click="handleEdit(scope.row)"
            type="primary"
            text
            size="small"
            >修改</el-button
          >

          <el-popconfirm
            title="是否要刪除該公告?"
            confirmButtonText="確定"
            cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button text="true" type="primary" size="small" class="px-1">
                刪除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex items-center justify-center mt-5">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="getData"
        :total="total"
        v-model:current-page="currentPage"
        v-model:page-size="limit"
      />
    </div>

    <!-- <FormDrawer ref="formDrawerRef" title="新增公告" @submit="handleSubmit"> -->
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <!-- epf -->
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="角色名稱" prop="name">
          <el-input v-model="form.name" placeholder="角色名稱"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" prop="desc">
          <el-input
            v-model="form.desc"
            placeholder="角色描述"
            type="textarea"
            :row="5"
          ></el-input>
        </el-form-item>

        <el-form-item label="狀態" prop="status">
          <!-- epsw -->
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>

    <!-- 權限配置 -->
    <FormDrawer
      ref="setRuleFormDrawerRef"
      title="權限配置"
      @submit="handleSetRuleSubmit"
    >
      <!-- {{ ruleList }} -->

      <!-- https://element-plus.org/zh-CN/component/tree-v2.html -->
      <!-- 不論你的數據量多大，虛擬樹都能毫無壓力地處理。 -->

      <el-tree-v2
        ref="elTreeTef"
        node-key="id"
        :check-strictly="checkStrictly"
        :default-expanded-keys="defaultExpandedKeys"
        :data="ruleList"
        :props="{ label: 'name', children: 'child' }"
        show-checkbox
        :height="treeHeight"
        @check="handleTreeCheck"
      >
        <template #default="{ node, data }">
          <div class="flex items-center">
            <!-- epta -->

            <el-tag :type="data.menu ? '' : 'info'" size="small">
              {{ data.menu ? '菜單' : '權限' }}
            </el-tag>

            <span class="ml-2 text-sm">{{ data.name }}</span>
          </div>
        </template>
      </el-tree-v2>
    </FormDrawer>
  </el-card>
</template>
