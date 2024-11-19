<script setup>
import { ref } from 'vue';
const showDrawer = ref(false);

const open = () => {
  showDrawer.value = true;
};

const close = () => {
  showDrawer.value = false;
};

// https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose
// 向父組件暴露方法
defineExpose({
  open,
  close,
});
</script>

<template>
  <el-drawer
    v-model="showDrawer"
    title="修改密碼"
    size="45%"
    :close-on-click-modal="false"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>

      <div class="actions">
        <el-button type="primary">提交</el-button>

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
