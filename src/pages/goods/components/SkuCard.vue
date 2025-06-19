<script setup>
import SkuCardItem from './SkuCardItem.vue';

import { sku_card_list } from '@/composables/useSku.js';
</script>

<template>
  <el-form-item label="規格">
    <el-card
      shadow="never"
      class="w-full mb-3"
      v-for="(item, index) in sku_card_list"
      :key="index"
    >
      <template #header>
        <div class="flex items-center">
          <el-input
            v-model="item.text"
            placeholder="規格名稱"
            style="width: 200px"
          >
            <template #append>
              <el-icon><more /></el-icon>
            </template>
          </el-input>
          <el-button class="ml-auto" size="small"
            ><el-icon><Top /></el-icon
          ></el-button>
          <el-button class="ml-auto" size="small"
            ><el-icon><Bottom /></el-icon
          ></el-button>
          <el-button class="ml-auto" size="small"
            ><el-icon><Delete /></el-icon
          ></el-button>
        </div>
      </template>

      <SkuCardItem></SkuCardItem>

      <el-button type="success" size="small">新增規格</el-button>
    </el-card>
  </el-form-item>
</template>

<style scoped>
.el-card__header {
  @apply !p-2 bg-gray-50;
}
</style>
