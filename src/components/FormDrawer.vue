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
      <div class="body"></div>

      <div class="actions"></div>
    </div>
  </el-drawer>
</template>

<style scoped>
.formDrawer {
  width: 100%;
  height: 100%;
}
</style>
