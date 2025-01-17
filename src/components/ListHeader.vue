<script setup>
defineEmits(['create', 'refresh']);
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <el-button @click="$emit('create')" type="primary" size="small"
      >新增</el-button
    >
    <el-tooltip effect="dark" content="重新整理" placement="top">
      <el-button @click="$emit('refresh')" :text="true">
        <el-icon :size="20"> <Refresh /> </el-icon
      ></el-button>
    </el-tooltip>
  </div>
</template>
