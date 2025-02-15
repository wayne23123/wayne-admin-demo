<script setup>
import { ref } from 'vue';

import {
  getSkusList,
  createSkus,
  updateSkus,
  deleteSkus,
  updateSkusStatus,
} from '@/api/skus';

import FormDrawer from '@/components/FormDrawer.vue';

import ListHeader from '@/components/ListHeader.vue';

import { useInitTable, useInitForm } from '@/composables/useCommon';

import { toast } from '@/composables/util';

import TagInput from '@/components/TagInput.vue';

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
  getList: getSkusList,
  delete: deleteSkus,
  updateStatus: updateSkusStatus,
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
    status: 1,
    default: '',
    order: 50,
  },
  rules: {
    name: [
      {
        required: true,
        message: '規格名稱不能為空',
        trigger: 'blur',
      },
    ],
    default: [
      {
        required: true,
        message: '規格值不能為空',
        trigger: 'blur',
      },
    ],
  },
  //getData 從上面 useInitTable 獲取
  getData,
  update: updateSkus,
  create: createSkus,
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
      <el-table-column prop="name" label="規格名稱" />
      <el-table-column prop="default" label="規格值" width="380" />
      <el-table-column prop="order" label="排序" />
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
            @click="handleEdit(scope.row)"
            type="primary"
            text
            size="small"
            >修改</el-button
          >

          <el-popconfirm
            title="是否要刪除該規格?"
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
    <FormDrawer
      destroyOnClose
      ref="formDrawerRef"
      :title="drawerTitle"
      @submit="handleSubmit"
    >
      <!-- epf -->
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="規格名稱" prop="name">
          <el-input v-model="form.name" placeholder="角色名稱"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="order">
          <!-- epin -->
          <el-input-number v-model="form.order" :min="0" :max="1000">
          </el-input-number>
        </el-form-item>

        <el-form-item label="狀態" prop="status">
          <!-- epsw -->
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>

        <el-form-item label="規格值" prop="default">
          <TagInput v-model="form.default"></TagInput>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>
