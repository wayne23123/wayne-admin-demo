<script setup>
import { ref } from 'vue';
import { getImageList } from '@/api/image.js';

const isLoading = ref(false);

// 分頁
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const list = ref([]);

const imageClassId = ref(0);

const getData = (page) => {
  // console.log('page', page);
  if (typeof page == 'number') {
    currentPage.value = page;
  }

  isLoading.value = true;

  // getImageClassList(1)
  getImageList(imageClassId.value, currentPage.value)
    .then((response) => {
      // console.log('response', response);

      total.value = response.data.data.totalCount;

      list.value = response.data.data.list;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

// 根據分類 id 重新加載圖片列表
const loadData = (id) => {
  currentPage.value = 1;
  imageClassId.value = id;
  getData();
};

defineExpose({
  loadData,
});
</script>

<template>
  <el-main class="image-main" v-loading="isLoading">
    <div class="top p-3">
      <el-row :gutter="10">
        <el-col
          :span="6"
          :offset="0"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-card
            shadow="hover"
            class="relative mb-3"
            :body-style="{ padding: '0' }"
          >
            <!-- https://element-plus.org/zh-CN/component/image.html#image-%E5%9B%BE%E7%89%87 -->
            <el-image
              :src="item.url"
              fit="cover"
              class="w-full h-[150px]"
            ></el-image>
            <div class="image-title">{{ item.name }}</div>
            <div class="flex items-center justify-center p-2">
              <el-button type="primary" size="small" text="true"
                >重新命名</el-button
              >
              <el-button type="primary" size="small" text="true"
                >刪除</el-button
              >
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- <div v-for="(item, index) in list" :key="index">{{ item.url }}</div> -->
    </div>
    <div class="bottom">
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
    </div>
  </el-main>
</template>

<style scoped>
.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-main {
  position: relative;
}

.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}

.image-title {
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>
