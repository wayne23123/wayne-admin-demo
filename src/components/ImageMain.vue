<script setup>
import { ref, computed } from 'vue';

import { getImageList, updateImage, deleteImage } from '@/api/image.js';

import { showPrompt, toast } from '@/composables/util.js';

import UploadFile from './UploadFile.vue';

const isLoading = ref(false);

// 上傳圖片
const drawer = ref(false);
const openUploadFile = () => {
  drawer.value = true;
};

// 分頁
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const list = ref([]);

const imageClassId = ref(0);

const getData = (page = null) => {
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

      // list.value = response.data.data.list;

      list.value = response.data.data.list.map((object) => {
        object.checked = false;
        return object;
      });
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

// 重命名圖片
const handleEdit = (item) => {
  showPrompt('重新命名', item.name).then(({ value }) => {
    isLoading.value = true;

    updateImage(item.id, value)
      .then((response) => {
        toast('修改成功');

        getData();
      })
      .finally(() => {
        isLoading.value = false;
      });
  });
};

// 刪除圖片
const handleDelete = (id) => {
  isLoading.value = true;

  deleteImage([id])
    .then((response) => {
      toast('刪除成功');

      getData();
    })
    .finally(() => {
      isLoading.value = false;
    });
};

// 上傳成功
const handleUploadSuccess = () => getData(1);

defineProps({
  openChoose: {
    type: Boolean,
    default: false,
  },
});

// 選中的圖片
// Array.prototype.filter 方法總是返回一個新數組，即使過濾條件未匹配任何元素，返回值也會是空數組 []
const checkedImage = computed(() =>
  list.value.filter((filterItem) => filterItem.checked)
);

// const checkedImage = computed(() => {
//   let rusult = [];
//   if (list.value) {
//     rusult = list.value.filter((filterItem) => {
//       return filterItem.checked;
//     });
//   }
//   return rusult;
// });

const emit = defineEmits(['choose']);
const handleChooseChange = (item) => {
  if (item.checked && checkedImage.value.length > 1) {
    item.checked = false;

    return toast('最多選擇一張圖片', 'error');
  }

  emit('choose', checkedImage.value);
};

defineExpose({
  loadData,
  openUploadFile,
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
            :class="{ 'border-blue-500': item.checked }"
          >
            <!-- https://element-plus.org/zh-CN/component/image.html#image-%E5%9B%BE%E7%89%87 -->
            <el-image
              :src="item.url"
              fit="cover"
              :preview-src-list="[item.url]"
              :initial-index="0"
              class="w-full h-[150px]"
            ></el-image>
            <div class="image-title">{{ item.name }}</div>
            <div class="flex items-center justify-center p-2">
              <!-- epc -->
              <el-checkbox
                v-if="openChoose"
                v-model="item.checked"
                @change="handleChooseChange(item)"
              ></el-checkbox>

              <el-button
                @click="handleEdit(item)"
                type="primary"
                size="small"
                text="true"
                >重新命名</el-button
              >

              <el-popconfirm
                title="是否刪除該圖片"
                confirmButtonText="確定"
                cancelButtonText="取消"
                @confirm="handleDelete(item.id)"
              >
                <template #reference>
                  <el-button
                    class="!m-0"
                    type="primary"
                    size="small"
                    text="true"
                    >刪除</el-button
                  >
                </template>
              </el-popconfirm>
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

  <el-drawer v-model="drawer" title="上傳圖片">
    <UploadFile :data="{ imageClassId }" @success="handleUploadSuccess" />
  </el-drawer>
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
