<script setup>
import { ref } from 'vue';
import ImageAside from '@/components/ImageAside.vue';
import ImageMain from '@/components/ImageMain.vue';

const windowHeight = window.innerHeight || document.body.clientHeight;

const h = windowHeight - 64 - 44 - 40;

const ImageAsideRef = ref(null);

const handleOpenCreate = () => {
  ImageAsideRef.value.handleCreate();
};

const ImageMainRef = ref(null);

const handleAsideChange = (imageClaseeId) => {
  // console.log('imageClaseeId', imageClaseeId);

  ImageMainRef.value.loadData(imageClaseeId);
};

const handleUpload = () => ImageMainRef.value.openUploadFile();
</script>

<template>
  <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate"
        >新增圖片分類</el-button
      >

      <el-button type="warning" size="small" @click="handleUpload"
        >上傳圖片</el-button
      >
    </el-header>

    <el-container>
      <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
      <!-- <el-aside width="220px" class="image-aside">
        <div class="top">
          <div v-for="i in 100" key="i">{{ i }}</div>
        </div>
        <div class="bottom">分頁</div>
      </el-aside> -->
      <ImageMain ref="ImageMainRef" />
      <!-- <el-main class="image-main">
        <div class="top">
          <div v-for="i in 100" key="i">{{ i }}</div>
        </div>
        <div class="bottom">分頁</div>
      </el-main> -->
    </el-container>
  </el-container>
</template>

<style scoped>
.image-header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}

/* .image-aside {
  border-right: 1px solid #eee;
  position: relative;
} */

/* .image-aside .top,
.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
} */

/* .image-main {
  position: relative;
} */

/* .image-aside .bottom,
.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
} */
</style>
