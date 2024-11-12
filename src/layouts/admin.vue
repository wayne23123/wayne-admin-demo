<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FTagList from './components/FTagList.vue';
</script>

<template>
  <!-- https://element-plus.org/zh-CN/component/container.html -->
  <el-container>
    <el-header>
      <f-header></f-header>
    </el-header>
    <el-container>
      <el-aside>
        <f-menu></f-menu>
      </el-aside>
      <el-main>
        <f-tag-list></f-tag-list>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
