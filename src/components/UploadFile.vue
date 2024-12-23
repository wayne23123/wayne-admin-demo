<script setup>
import { uploadImageAction } from '@/api/image';

import { getToken } from '@/composables/auth';

import { toast } from '@/composables/util.js';

const token = getToken();

defineProps({
  data: Object,
});

const emit = defineEmits(['uploadSuccess', 'uploadError']);

const uploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log('response', response);

  emit('success', response, uploadFile, uploadFiles);
};

const uploadError = (error, uploadFile, uploadFiles) => {
  console.log('error', error);

  // let msg = JSON.parse(error.message).msg || '上傳失敗';

  let msg = '上傳失敗';

  try {
    const errorData = JSON.parse(error.message);
    msg = errorData.msg || msg;
  } catch (e) {
    console.warn('非 JSON 格式的錯誤訊息：', error.message);
    msg = error.message || msg;
  }

  toast(msg, 'error');
};
</script>

<template>
  <!-- https://element-plus.org/zh-CN/component/upload.html#%E6%8B%96%E6%8B%BD%E4%B8%8A%E4%BC%A0 -->
  <el-upload
    class="upload-demo"
    drag
    action="uploadImageAction"
    multiple
    :headers="{ token }"
    name="img"
    :data="data"
    :on-success="uploadSuccess"
    :on-error="uploadError"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>
