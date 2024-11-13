<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><eleme-filled /></el-icon>
      <span class="ml-2">Wayne 後台</span>
    </span>
    <el-icon class="icon-btn"><fold /></el-icon>
    <el-icon class="icon-btn"><refresh /></el-icon>
    <div class="ml-auto flex items-center">
      <el-icon class="icon-btn"><full-screen /></el-icon>
      <!-- https://element-plus.org/zh-CN/component/dropdown.html#dropdown-%E4%B8%8B%E6%8B%89%E8%8F%9C%E5%8D%95 -->
      <el-dropdown class="dropdown">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :icon="UserFilled" />
          <!-- <el-avatar :size="25" :src="$store.state.user.data.data.avatar" /> -->
          {{ $store.state.user.data.data.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密碼</el-dropdown-item>
            <el-dropdown-item>退出登入</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- {{ $store.state.user }} -->
  </div>
</template>

<style scoped>
.f-header {
  height: 64px;
  @apply flex items-center bg-indigo-700 text-slate-50 fixed top-0 left-0 right-0;
}

.logo {
  width: 250px;
  @apply flex items-center justify-center text-xl font-thin;
}

.icon-btn {
  width: 42px;
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>
