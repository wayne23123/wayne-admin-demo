<script setup>
import { ref } from 'vue';

import * as iconList from '@element-plus/icons-vue';

defineProps({
  modelValue: String,
});

// console.log(Object.keys(iconList));
const icons = ref(Object.keys(iconList));

const emit = defineEmits(['update:modelValue']);

const handleChange = (icon) => {
  //   console.log('icon', icon);、

  emit('update:modelValue', icon);
};
</script>

<template>
  <div class="flex items-center">
    <el-icon v-if="modelValue" class="mr-2">
      <component :is="modelValue" />
    </el-icon>

    <el-select
      filterable
      :modelValue="modelValue"
      class="mt-2 min-w-48"
      placeholder="請選擇圖標"
      @change="handleChange"
    >
      <el-option v-for="item in icons" :key="item" :label="item" :value="item">
        <div class="flex justify-between items-center">
          <el-icon>
            <component :is="item" />
          </el-icon>
          <span class="text-gray-500">{{ item }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>
