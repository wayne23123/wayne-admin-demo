<script setup>
defineProps({
  label: String,
  modelValue: String,
  placeholder: String,
  clearable: Boolean,
});
</script>

<template>
  <el-col :span="8" :offset="0">
    <el-form-item label="關鍵字">
      <slot></slot>
    </el-form-item>
  </el-col>
</template>
