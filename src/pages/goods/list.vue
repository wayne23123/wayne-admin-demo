<script setup>
import { ref } from 'vue';

import {
  getGoodsList,
  updateGoodsStatus,
  createGoods,
  updateGoods,
  deleteGoods,
} from '@/api/goods';

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
    title: '',
    tab: 'all',
    category_id: null,
  },
  getList: getGoodsList,
  onGetListSuccess: (response) => {
    // console.log('response', response);

    tableData.value = response?.data?.data?.list.map((object) => {
      object.statusLoading = false;
      return object;
    });

    total.value = response?.data?.data?.totalCount;

    roles.value = response?.data?.data?.roles;
  },
  delete: deleteGoods,
  updateStatus: updateGoodsStatus,
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
  update: updateGoods,
  create: createGoods,
});

const tabBars = [
  {
    key: 'all',
    name: '全部',
  },
  {
    key: 'checking',
    name: '審核中',
  },
  {
    key: 'saling',
    name: '出售中',
  },
  {
    key: 'off',
    name: '已下架',
  },
  {
    key: 'delete',
    name: '垃圾桶',
  },
];
</script>

<template>
  <div>
    <!-- https://element-plus.org/zh-CN/component/tabs.html -->
    <el-tabs v-model="searchForm.tab" @tab-change="getData">
      <el-tab-pane
        v-for="(item, index) in tabBars"
        :key="index"
        :label="item.name"
        :name="item.key"
      ></el-tab-pane>
    </el-tabs>

    <!-- rpcard -->
    <el-card shadow="never" class="border-0">
      <!-- epf -->
      <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
        <!-- eprow -->
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <el-form-item label="關鍵字">
              <el-input
                v-model="searchForm.title"
                placeholder="商品名稱"
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
        <el-table-column label="商品" width="300">
          <template #default="{ row }">
            <div class="flex">
              <!-- epim -->
              <el-image
                class="mr-3 rounded"
                :src="row.cover"
                fit="cover"
                :lazy="true"
                style="width: 50px; height: 50px"
              ></el-image>
              <div class="flex-1">
                <p>{{ row.title }}</p>
                <div>
                  <span class="text-rose-500">NT$ {{ row.min_price }}</span>

                  <el-divider direction="vertical"></el-divider>

                  <span class="text-gray-500 text-xs"
                    >NT$ {{ row.min_oprice }}</span
                  >
                </div>

                <p class="text-gray-400 text-xs mb-1">
                  分類: {{ row.category ? row.category.name : '未分類' }}
                </p>
                <p class="text-gray-400 text-xs mb-1">
                  建立時間: {{ row.created_at }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="實際銷量"
          width="70"
          prop="sale_count"
          align="center"
        >
        </el-table-column>
        <el-table-column label="商品狀態" width="100">
          <template #default="{ row }">
            <!-- https://element-plus.org/zh-CN/component/tag.html#tag-%E6%A0%87%E7%AD%BE -->

            <el-tag :type="row.status ? 'success' : 'danger'" size="small">{{
              row.status ? '上架' : '倉庫'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="審核狀態" width="120" align="center">
          <template #default="{ row }">
            <div v-if="row.status == 0">
              <div>
                <el-button type="success" size="small" plain
                  >審核通過</el-button
                >
              </div>
              <div>
                <el-button class="mt-2" type="danger" size="small" plain
                  >審核拒絕</el-button
                >
              </div>
            </div>
            <div v-else>{{ row.ischeck == 1 ? '審核通過' : '審核拒絕' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="總庫存" width="90" prop="stock" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <div>
              <el-button
                @click="handleEdit(scope.row)"
                class="px-1"
                type="primary"
                text
                size="small"
                >修改</el-button
              >

              <el-button class="px-1" type="primary" text size="small"
                >商品規格</el-button
              >

              <el-button class="px-1" type="primary" text size="small"
                >設置輪播圖</el-button
              >

              <el-button class="px-1" type="primary" text size="small"
                >商品詳情
              </el-button>

              <el-popconfirm
                title="是否要刪除該商品"
                confirmButtonText="確定"
                cancelButtonText="取消"
                @confirm="handleDelete(scope.row.id)"
              >
                <template #reference>
                  <el-button
                    text="true"
                    type="primary"
                    size="small"
                    class="px-1"
                  >
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
      <FormDrawer
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
  </div>
</template>
