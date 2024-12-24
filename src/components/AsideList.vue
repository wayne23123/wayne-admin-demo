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

    <span @click.stop="() => {}">
      <!-- https://element-plus.org/zh-CN/component/popconfirm.html#popconfirm-%E6%B0%94%E6%B3%A1%E7%A1%AE%E8%AE%A4%E6%A1%86 -->
      <!-- <el-popconfirm
      title="是否要刪除該分類"
      confirmButtonText="確定"
      cancelButtonText="取消"
      @confirm.stop="$emit('delete')"
    > -->
      <el-popconfirm
        title="是否要刪除該分類"
        confirmButtonText="確定"
        cancelButtonText="取消"
        @confirm="$emit('delete')"
      >
        <template #reference>
          <el-button text="true" type="primary" size="small" class="px-1">
            <el-icon :size="12"><Close /></el-icon>
          </el-button>
        </template>
      </el-popconfirm>
    </span>

    <!-- <el-button
      text="true"
      type="primary"
      size="small"
      @click="$emit('delete')"
      class="px-1"
    >
      <el-icon :size="12"><Close /></el-icon>
    </el-button> -->
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
