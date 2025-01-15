<script setup>
import { ref, reactive, computed } from 'vue';

import {
  getNoticeList,
  createNotice,
  updateNotice,
  deleteNotice,
} from '@/api/notice';

import FormDrawer from '@/components/FormDrawer.vue';

import { toast } from '@/composables/util';

import { useInitTable } from '@/composables/useCommon';

const { tableData, currentPage, total, limit, isLoading, getData } =
  useInitTable({
    getList: getNoticeList,
  });

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

// 刪除
const handleDelete = (id) => {
  // console.log('id', id);

  isLoading.value = true;

  deleteNotice(id)
    .then((response) => {
      // console.log('response', response);

      toast('刪除成功');

      getData();
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<template>
  <!-- rpcard -->
  <el-card shadow="never" class="border-0">
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
      <el-table-column prop="title" label="公告標題" />
      <el-table-column prop="create_time" label="發佈時間" width="300" />
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
