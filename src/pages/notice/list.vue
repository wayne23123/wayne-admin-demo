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

const isLoading = ref(false);

// 分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

const tableData = ref([]);

const getData = (page = null) => {
  // console.log('page', page);
  if (typeof page == 'number') {
    currentPage.value = page;
  }

  isLoading.value = true;

  getNoticeList(currentPage.value)
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

      toast('删除成功');

      getData(1);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

// 表单
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
      message: '公告标题不能为空',
      trigger: 'blur',
    },
  ],
  content: [
    {
      required: true,
      message: '公告内容不能为空',
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
        // 修改刷新当前页，新增刷新第一页
        getData(editId.value ? false : 1);

        formDrawerRef.value.close();
      })
      .finally(() => {
        formDrawerRef.value.hideLoadingButton();
      });
  });
};

// 重置表单
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

// 编辑
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
      <el-table-column prop="title" label="公告标题" />
      <el-table-column prop="create_time" label="发布时间" width="300" />
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
            title="是否要删除该公告?"
            confirmButtonText="确定"
            cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button text="true" type="primary" size="small" class="px-1">
                删除
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
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"></el-input>
        </el-form-item>

        <el-form-item label="公告内容" prop="content">
          <el-input
            v-model="form.content"
            placeholder="公告内容"
            type="textarea"
            :row="5"
          ></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>
