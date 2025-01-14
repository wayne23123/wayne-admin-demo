<script setup>
import { ref, reactive, computed } from 'vue';

import {
  getManagerList,
  updateManagerStatus,
  createManager,
  updateManager,
  deleteManager,
} from '@/api/manager';

import FormDrawer from '@/components/FormDrawer.vue';

import ChooseImage from '@/components/ChooseImage.vue';

import { toast } from '@/composables/util';

import { useInitTable } from '@/composables/useCommon';

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
});

const handleDelete = (id) => {
  // console.log('id', id);

  isLoading.value = true;

  deleteManager(id)
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
  username: '',
  password: '',
  role_id: null,
  status: 1,
  avatar: '',
});

const rules = {
  // title: [
  //   {
  //     required: true,
  //     message: '公告标题不能为空',
  //     trigger: 'blur',
  //   },
  // ],
  // content: [
  //   {
  //     required: true,
  //     message: '公告内容不能为空',
  //     trigger: 'blur',
  //   },
  // ],
};

const editId = ref(0);
const drawerTitle = computed(() => {
  return editId.value ? '修改' : '新增';
});

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;

    formDrawerRef.value.showLoadingButton();

    const operation = editId.value ? updateManager : createManager;

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
    username: '',
    password: '',
    role_id: null,
    status: 1,
    avatar: '',
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

// 修改状态
const handleStatusChange = (status, row) => {
  // console.log('status', status, 'row', row);

  row.statusLoading = true;

  updateManagerStatus(row.id, status)
    .then((response) => {
      // console.log('response', response);

      toast('修改状态成功');

      row.statue = status;
    })
    .finally(() => {
      row.statusLoading = false;
    });
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
          <el-form-item label="关键字">
            <el-input
              v-model="searchForm.keyword"
              placeholder="管理员暱称"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="flex justify-end items-center">
            <el-button type="primary" @click="getData">搜寻</el-button>
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
      <el-table-column label="管理员" width="200">
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
      <el-table-column label="所属管理员" align="center">
        <template #default="{ row }">
          {{ row.role?.name || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
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
            >暂无操作</small
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
              title="是否要删除该管理员?"
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
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username" placeholder="用户名称"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>

        <!-- form.avatar@@ {{ form.avatar }} -->
        <el-form-item label="头像" prop="avatar">
          <ChooseImage v-model="form.avatar"></ChooseImage>
        </el-form-item>

        <el-form-item label="所属角色" prop="role_id">
          <!-- eps -->
          <el-select v-model="form.role_id" placeholder="选择所属角色">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="content">
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
