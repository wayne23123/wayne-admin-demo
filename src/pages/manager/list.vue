<script setup>
import { ref, reactive, computed } from 'vue';

import {
  getNoticeList,
  createNotice,
  updateNotice,
  deleteNotice,
} from '@/api/notice';

import { getManagerList } from '@/api/manager';

import FormDrawer from '@/components/FormDrawer.vue';

import { toast } from '@/composables/util';

const isLoading = ref(false);

// 分頁
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

const searchForm = reactive({
  keyword: '',
});
const resetSearchForm = () => {
  searchForm.keyword = '';
  getData();
};

const tableData = ref([]);

const getData = (page = null) => {
  // console.log('page', page);
  if (typeof page == 'number') {
    currentPage.value = page;
  }

  isLoading.value = true;

  // getManagerList(currentPage.value)
  getManagerList(currentPage.value, searchForm)
    .then((response) => {
      // console.log('response', response);

      tableData.value = response?.data?.data?.list;

      total.value = response?.data?.data?.totalCount;
    })
    .finally(() => {
      isLoading.value = false;
    });
};
getData();

// const getData = () => {
//   tableData.value = [
//     {
//       id: 1,
//       title: '通知1',
//       content: '通知1',
//       order: 0,
//       created_time: '2022-01-01 00:00:00',
//       updated_at: '2022-01-01 00:00:00',
//     },
//   ];
// };

// getData();

const handleDelete = (id) => {
  // console.log('id', id);

  isLoading.value = true;

  deleteNotice(id)
    .then((response) => {
      // console.log('response', response);

      toast('刪除成功');

      getData(1);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

// 表單
const formDrawerRef = ref(null);

const formRef = ref(null);

const form = reactive({
  title: '',
  content: '',
});

const rules = {
  title: [
    {
      required: true,
      message: '公告標題不能為空',
      trigger: 'blur',
    },
  ],
  content: [
    {
      required: true,
      message: '公告內容不能為空',
      trigger: 'blur',
    },
  ],
};

const editId = ref(0);
const drawerTitle = computed(() => {
  return editId.value ? '修改' : '新增';
});

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;

    formDrawerRef.value.showLoadingButton();

    const operation = editId.value ? updateNotice : createNotice;

    // createNotice(form)
    operation(editId.value || form, form)
      .then((res) => {
        console.log('res', res);

        // toast('新增成功');
        toast(drawerTitle.value + '成功');

        // getData(1);
        // 修改刷新當前頁，新增刷新第一頁
        getData(editId.value ? false : 1);

        formDrawerRef.value.close();
      })
      .finally(() => {
        formDrawerRef.value.hideLoadingButton();
      });
  });
};

// 重置表單
const resetForm = (row = false) => {
  if (formRef.value) {
    formRef.value.clearValidate();
  }

  if (row) {
    for (const key in form) {
      form[key] = row[key];
    }
  }
};

// 新增
const handleCreate = () => {
  editId.value = 0;

  resetForm({
    title: '',
    content: '',
  });

  formDrawerRef.value.open();
};

// 編輯
const handleEdit = (row) => {
  // console.log('row', row);

  editId.value = row.id;

  resetForm(row);

  formDrawerRef.value.open();
};
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

    <div class="flex items-center justify-between mb-4">
      <el-button @click="handleCreate" type="primary" size="small"
        >新增</el-button
      >
      <el-toolttip effect="dark" content="重新整理" placement="top">
        <el-button @click="getData" text>
          <el-icon :size="20"> <Refresh /> </el-icon
        ></el-button>
      </el-toolttip>
    </div>

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
            :modelValue="row.statue"
            :active-value="1"
            :inactive-value="0"
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
        <el-form-item label="公告標題" prop="title">
          <el-input v-model="form.title" placeholder="公告標題"></el-input>
        </el-form-item>

        <el-form-item label="公告內容" prop="content">
          <el-input
            v-model="form.content"
            placeholder="公告內容"
            type="textarea"
            :row="5"
          ></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>
