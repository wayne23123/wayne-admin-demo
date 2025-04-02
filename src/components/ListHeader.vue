<script setup>
import { computed } from 'vue';

const props = defineProps({
  layout: {
    type: String,
    default: 'create,refresh',
  },
});

defineEmits(['create', 'refresh', 'delete']);

const buttons = computed(() => {
  return props.layout.split(',');
});
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <!-- buttons @@ {{ buttons }} -->

    <!-- layout@@ {{ layout }} -->

    <div>
      <el-button
        v-if="buttons.includes('create')"
        @click="$emit('create')"
        type="primary"
        size="small"
        >新增</el-button
      >

      <el-popconfirm
        v-if="buttons.includes('delete')"
        title="是否要刪除選中記錄?"
        confirmButtonText="確定"
        cancelButtonText="取消"
        @confirm="$emit('delete')"
      >
        <template #reference>
          <el-button type="danger" size="small">批量刪除</el-button>
        </template>
      </el-popconfirm>

      <slot></slot>
    </div>

    <el-tooltip
      v-if="buttons.includes('refresh')"
      effect="dark"
      content="重新整理"
      placement="top"
    >
      <el-button @click="$emit('refresh')" :text="true">
        <el-icon :size="20"> <Refresh /> </el-icon
      ></el-button>
    </el-tooltip>
  </div>
</template>
