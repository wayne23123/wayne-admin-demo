<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: '45%',
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: '提交',
  },
});

const showDrawer = ref(false);

const isButtonLoading = ref(false);
const showLoadingButton = () => {
  isButtonLoading.value = true;
};

const hideLoadingButton = () => {
  isButtonLoading.value = false;
};

const open = () => {
  showDrawer.value = true;
};

const close = () => {
  showDrawer.value = false;
};

const emit = defineEmits(['submit']);
const submit = () => {
  emit('submit');
};

// https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose
// 向父組件暴露方法
defineExpose({
  open,
  close,
  showLoadingButton,
  hideLoadingButton,
});
</script>

<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>

      <div class="actions">
        <el-button
          @click="submit"
          :isButtonLoading="isButtonLoading"
          type="primary"
          >{{ confirmText }}</el-button
        >

        <el-button @click="close" type="default">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}

.formDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
