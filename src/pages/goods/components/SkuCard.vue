<script setup>
import SkuCardItem from './SkuCardItem.vue';
</script>

<template>
  <el-form-item label="規格">
    <el-card shadow="never" class="w-full mb-3">
      <template #header>
        <div class="flex items-center">
          <el-input placeholder="規格名稱" style="width: 200px">
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
    </el-card>
  </el-form-item>
</template>
