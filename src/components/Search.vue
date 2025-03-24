<script setup>
import { ref } from 'vue';

defineEmits(['search', 'reset']);

const isShowSearch = ref(false);
</script>

<template>
  <div>
    <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
      <el-row :gutter="20">
        <slot></slot>

        <template v-if="isShowSearch">
          <slot name="show"></slot>
        </template>

        <!-- <el-col :span="8" :offset="0">
          <el-form-item label="關鍵字">
            <el-input
              v-model="searchForm.title"
              placeholder="商品名稱"
              clearable
            ></el-input>
          </el-form-item>
        </el-col> -->
        <!-- <el-col :span="8" :offset="0" v-if="isShowSearch">
          <el-form-item label="商品分類" prop="category_id">
            <el-select
              v-model="searchForm.category_id"
              placeholder="請選擇商品分類"
              clearable
            >
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="8" :offset="isShowSearch ? 0 : 8">
          <div class="flex justify-end items-center">
            <el-button type="primary" @click="$emit('search')">搜尋</el-button>
            <el-button @click="$emit('reset')">重置</el-button>
            <el-button
              type="primary"
              text
              @click="isShowSearch = !isShowSearch"
            >
              {{ isShowSearch ? '收起' : '展開' }}

              <el-icon>
                <ArrowUp v-if="isShowSearch" />
                <ArrowDown v-else />
              </el-icon>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
