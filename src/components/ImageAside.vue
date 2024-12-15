<script setup>
import { computed, reactive, ref } from 'vue';

import FormDrawer from './FormDrawer.vue';

import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass,
} from '@/api/image_class';

import AsideList from './AsideList.vue';

import { toast } from '@/composables/util';

const isLoading = ref(false);

const list = ref([]);

const activeId = ref(0);

// 分頁
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

const getData = (page) => {
  // console.log('value', value);
  if (typeof page == 'number') {
    currentPage.value = page;
  }

  isLoading.value = true;

  // getImageClassList(1)
  getImageClassList(currentPage.value)
    .then((response) => {
      // console.log('response', response);

      total.value = response.data.data.totalCount;

      list.value = response.data.data.list;

      let item = list.value[0];

      if (item) {
        activeId.value = item.id;
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
};
getData();

const editId = ref(0);
const drawerTitle = computed(() => {
  return editId.value ? '修改' : '新增';
});

const formDrawerRef = ref(null);

const form = reactive({
  name: '',
  order: 50,
});

const rules = {
  name: [
    {
      required: true,
      message: '圖庫分類名稱不能為空',
      trigger: 'blur',
    },
  ],
};

const formRef = ref(null);

const handelSubmit = () => {
  console.log('提交表單');

  formRef.value.validate((valid) => {
    if (!valid) return;

    // console.log('表單驗證成功');

    formDrawerRef.value.showLoadingButton();

    const fun = editId.value
      ? updateImageClass(editId.value, form)
      : createImageClass(form);

    fun
      .then((res) => {
        toast(drawerTitle.value + '成功');

        getData(editId.value ? currentPage.value : 1);

        formDrawerRef.value.close();
      })
      .finally(() => {
        formDrawerRef.value.hideLoadingButton();
      });
    // createImageClass(form)
    //   .then((res) => {
    //     toast('新增成功');

    //     getData(1);

    //     formDrawerRef.value.close();
    //   })
    //   .finally(() => {
    //     formDrawerRef.value.hideLoadingButton();
    //   });
  });
};

const handleCreate = () => {
  editId.value = 0;

  form.name = '';
  form.order = 50;

  formDrawerRef.value.open();
};

const handleEdit = (row) => {
  // console.log('row', row);

  editId.value = row.id;

  form.name = row.name;
  form.order = row.order;

  formDrawerRef.value.open();
};

const handleDelete = (id) => {
  console.log(111);
  isLoading.value = true;

  deleteImageClass(id)
    .then((response) => {
      toast('刪除成功');

      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};

defineExpose({
  handleCreate,
});
</script>

<template>
  <el-aside width="220px" class="image-aside" v-loading="isLoading">
    <div class="top">
      <AsideList
        :active="activeId == item.id"
        v-for="(item, index) in list"
        :key="index"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
        >{{ item.name }}</AsideList
      >

      <!-- <AsideList active>分類標題</AsideList> -->

      <!-- <div class="aside-list active">
        <span class="truncate">分類標題:</span>
        <el-button
          text="true"
          type="primary"
          size="small"
          @click=""
          class="ml-auto px-1"
        >
          <el-icon :size="12"><Edit /></el-icon>
        </el-button>
        <el-button
          text="true"
          type="primary"
          size="small"
          @click=""
          class="px-1"
        >
          <el-icon :size="12"><Close /></el-icon>
        </el-button>
      </div> -->
    </div>

    <!-- https://element-plus.org/zh-CN/component/pagination.html#pagination-%E5%88%86%E9%A1%B5 -->
    <div class="bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="getData"
        :total="total"
        v-model:current-page="currentPage"
        v-model:page-size="limit"
      />
    </div>
  </el-aside>

  <!-- <FormDrawer ref="formDrawerRef" title="新增" @submit="handelSubmit"> -->
  <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handelSubmit">
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      label-width="80px"
      :inline="false"
    >
      <el-form-item label="分類名稱" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" name="order">
        <el-input-number
          v-model="form.order"
          :min="0"
          :max="1000"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<style scoped>
.image-aside {
  border-right: 1px solid #eee;
  position: relative;
}

.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}

.aside-list {
  border-bottom: 1px solid #f4f4f4;
  @apply flex items-center p-3 text-sm text-gray-600 cursor-pointer;
}

.aside-list:hover,
.active {
  @apply bg-blue-50;
}
</style>
