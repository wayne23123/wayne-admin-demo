<template>
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
