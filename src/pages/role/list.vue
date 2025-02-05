<script setup>
import {
  getRoleList,
  createRole,
  updateRole,
  deleteRole,
  updateRoleStatus,
} from '@/api/role';

import FormDrawer from '@/components/FormDrawer.vue';

import ListHeader from '@/components/ListHeader.vue';

import { useInitTable, useInitForm } from '@/composables/useCommon';

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
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
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
  </el-card>
</template>
