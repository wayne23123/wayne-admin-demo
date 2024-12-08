<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['edit', 'delete']);
</script>

<template>
  <div class="aside-list" :class="{ active: active }">
    <span class="truncate"><slot></slot></span>
    <el-button
      text="true"
      type="primary"
      size="small"
      @click="$emit('edit')"
      class="ml-auto px-1"
    >
      <el-icon :size="12"><Edit /></el-icon>
    </el-button>
    <el-button
      text="true"
      type="primary"
      size="small"
      @click="$emit('delete')"
      class="px-1"
    >
      <el-icon :size="12"><Close /></el-icon>
    </el-button>
  </div>
</template>

<style scoped>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  @apply flex items-center p-3 text-sm text-gray-600 cursor-pointer;
}

.aside-list:hover,
.active {
  @apply bg-blue-50;
}
</style>
