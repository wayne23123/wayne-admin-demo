<script setup>
import { ref } from 'vue';

import {
  getManagerList,
  updateManagerStatus,
  createManager,
  updateManager,
  deleteManager,
} from '@/api/manager';

import FormDrawer from '@/components/FormDrawer.vue';

import ChooseImage from '@/components/ChooseImage.vue';

import ListHeader from '@/components/ListHeader.vue';

import { useInitTable, useInitForm } from '@/composables/useCommon';

const roles = ref([]);

const {
  searchForm,
  resetSearchForm,
  tableData,
  currentPage,
  total,
  limit,
  isLoading,
  getData,
  handleDelete,
  handleStatusChange,
} = useInitTable({
  searchForm: {
    keyword: '',
  },
  getList: getManagerList,
  onGetListSuccess: (response) => {
    // console.log('response', response);

    tableData.value = response?.data?.data?.list.map((object) => {
      object.statusLoading = false;
      return object;
    });

    total.value = response?.data?.data?.totalCount;

    roles.value = response?.data?.data?.roles;
  },
  delete: deleteManager,
  updateStatus: updateManagerStatus,
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
    username: '',
    password: '',
    role_id: null,
    status: 1,
    avatar: '',
  },
  //getData 從上面 useInitTable 獲取
  getData,
  update: updateManager,
  create: createManager,
});
</script>

<template>
  <!-- rpcard -->
  <el-card shadow="never" class="border-0">
    <!-- epf -->
    <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
      <!-- eprow -->
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="關鍵字">
            <el-input
              v-model="searchForm.keyword"
              placeholder="管理員暱稱"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="flex justify-end items-center">
            <el-button type="primary" @click="getData">搜尋</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      v-loading="isLoading"
    >
      <el-table-column label="管理員" width="200">
        <template #default="{ row }">
          <div class="flex items-center">
            <el-avatar :size="40" :src="row.avatar">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <div class="ml-3">
              <h6>{{ row.username }}</h6>
              <small>ID: {{ row.id }}</small>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所屬管理員" align="center">
        <template #default="{ row }">
          {{ row.role?.name || '-' }}
        </template>
      </el-table-column>
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
          <small v-if="scope.row.super == 1" class="text-sm text-gray-500"
            >暫無操作</small
          >
          <div v-else>
            <el-button
              @click="handleEdit(scope.row)"
              type="primary"
              text
              size="small"
              >修改</el-button
            >

            <el-popconfirm
              title="是否要刪除該管理員?"
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
          </div>
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
        <el-form-item label="用戶名稱" prop="username">
          <el-input v-model="form.username" placeholder="用戶名稱"></el-input>
        </el-form-item>

        <el-form-item label="密碼" prop="password">
          <el-input v-model="form.password" placeholder="密碼"></el-input>
        </el-form-item>

        <!-- form.avatar@@ {{ form.avatar }} -->
        <el-form-item label="頭像" prop="avatar">
          <ChooseImage v-model="form.avatar"></ChooseImage>
        </el-form-item>

        <el-form-item label="所屬角色" prop="role_id">
          <!-- eps -->
          <el-select v-model="form.role_id" placeholder="選擇所屬角色">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="狀態" prop="content">
          <!-- epsw -->
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>
