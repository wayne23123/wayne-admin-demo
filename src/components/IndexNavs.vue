<script setup>
const iconNavs = [
  {
    icon: "user",
    color: "text-light-blus-500",
    title: "用戶",
    path: "/user/list",
  },
  {
    icon: "shopping-cart",
    color: "text-violet-500",
    title: "商品",
    path: "/goods/list",
  },
  {
    icon: "tickets",
    color: "text-fuchsia-500",
    title: "訂單",
    path: "/order/list",
  },
  {
    icon: "chat-dot-square",
    color: "text-teal-500",
    title: "評價",
    path: "/comment/list",
  },
  {
    icon: "picture",
    color: "text-rose-500",
    title: "圖庫",
    path: "/image/list",
  },
  {
    icon: "bell",
    color: "text-green-500",
    title: "公告",
    path: "/notice/list",
  },
  {
    icon: "set-up",
    color: "text-gray-500",
    title: "設定",
    path: "setting/base",
  },
  {
    icon: "files",
    color: "text-yellow-500",
    title: "優惠券",
    path: "coupon/list",
  },
];
</script>

<template>
  <el-row :gutter="20" class="mt-5">
    <el-col
      :span="3"
      :offset="0"
      v-for="(item, index) in iconNavs"
      :key="index"
    >
      <el-card shadow="hover" @click="$router.push(item.path)">
        <div class="flex flex-col items-center cursor-pointer">
          <el-icon :size="16" :class="item.color">
            <!-- <AddLocation /> -->
            <component :is="item.icon" />
          </el-icon>
          <span class="text-sm mt-2">{{ item.title }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>