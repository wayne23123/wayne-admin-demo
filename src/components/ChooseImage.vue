<script setup>
import { ref } from 'vue';
import ImageAside from '@/components/ImageAside.vue';
import ImageMain from '@/components/ImageMain.vue';
import { remove } from 'nprogress';

const dialogVisible = ref(false);

const open = () => {
  dialogVisible.value = true;
};

const close = () => {
  dialogVisible.value = false;
};

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

// v-model 功能
const props = defineProps({
  modelValue: [String, Array],
});

const emit = defineEmits(['update:modelValue']);

let urls = [];

const handleChoose = (event) => {
  //   console.log('event', event);

  urls = event.map((object) => {
    return object.url;
  });

  //   console.log('urls', urls);
};

const submit = () => {
  if (urls.length) {
    emit('update:modelValue', urls[0]);
  }

  close();
};

const removeImage = (url) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((u) => {
      u != url;
    })
  );
};
</script>

<template>
  <div v-if="modelValue">
    <!-- epim -->
    <el-image
      v-if="typeof modelValue === 'string'"
      :src="modelValue"
      fit="cover"
      class="w-[100px] h-[100px] rounded border mr-2"
    ></el-image>
    <div v-else class="flex flex-wrap">
      <div
        class="relative mx-1 mb-2 w-[100px] h-[100px]"
        v-for="(url, index) in modelValue"
        :key="index"
      >
        <el-icon
          @click="removeImage(url)"
          class="absolute top-[5px] right-[5px] cursor-pointer bg-white rounded-full"
          style="z-index: 11"
        >
          <CircleClose></CircleClose
        ></el-icon>

        <el-image
          :src="url"
          fit="cover"
          class="w-[100px] h-[100px] rounded border mr-2"
        ></el-image>
      </div>
    </div>
  </div>

  <div class="choose-image-button" @click="open">
    <el-icon :size="25" class="text-gray-500"><Plus /></el-icon>
  </div>
  <!-- epdi -->
  <el-dialog title="選擇圖片" v-model="dialogVisible" width="80%" top="5vh">
    <el-container class="bg-white rounded" style="height: 70vh">
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

        <ImageMain ref="ImageMainRef" openChoose @choose="handleChoose" />
      </el-container>
    </el-container>

    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">確定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.choose-image-button {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center
    cursor-pointer hover:bg-gray-100;
}

.image-header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
</style>
