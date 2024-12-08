<script setup>
import { ref } from 'vue';

import { getImageClassList } from '@/api/image_class';

import AsideList from './AsideList.vue';

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
</script>

<template>
  <el-aside width="220px" class="image-aside" v-loading="isLoading">
    <div class="top">
      <AsideList
        :active="activeId == item.id"
        v-for="(item, index) in list"
        :key="index"
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
