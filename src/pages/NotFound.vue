<template>
  <!-- https://element-plus.org/zh-CN/component/result.html#result-%E7%BB%93%E6%9E%9C -->
  <div>
    <el-result icon="warning" title="404 提示" sub-title="找不到頁面">
      <template #extra>
        <el-button @click="$router.push('/')" type="primary"
          >回到首頁</el-button
        >
      </template>
    </el-result>
  </div>
</template>
