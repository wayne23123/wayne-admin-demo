<script setup>
import { ref } from 'vue';

import { getStatistics1, getStatistics2 } from '@/api/index.js';

import CountTo from '@/components/CountTo.vue';

import IndexNavs from '@/components/IndexNavs.vue';

import IndexChart from '@/components/indexChart.vue';

import IndexCard from '../components/IndexCard.vue';

const panels = ref([]);

getStatistics1().then((response) => {
  // console.log("response", response);

  panels.value = response.data.data.panels;
});

const goods = ref([]);
const order = ref([]);
getStatistics2().then((response) => {
  // console.log('response', response);

  goods.value = response.data.data.goods;

  order.value = response.data.data.order;
});

//https://vueuse.org/integrations/useCookies/#usecookies
// import { useCookies } from '@vueuse/integrations/useCookies';

// import { showModal } from '@/composables/util';

// import { logout } from '@/api/manager';

// import { toast } from '../composables/util';

// import { useRouter } from 'vue-router';

// import { useStore } from 'vuex';

// const cookie = useCookies();

// const router = useRouter();

// const store = useStore();

// console.log('cookie', cookie);

// const setCookie = () => {
//   cookie.set('admin-token', '123456');
// };

// const getCookie = () => {
//   console.log(cookie.get('admin-token'));
// };

// const removeCookie = () => {
//   cookie.remove('admin-token');
// };

// const handleLogout = () => {
//   showModal('是否要退出登入').then((res) => {
//     // console.log('退出登入')
//     logout().finally((res) => {
//       // 移除 cookie 裡的 token
//       // 清除當前用戶狀態 vuex
//       store.dispatch('logout');

//       // 跳轉到登入頁面
//       router.push('/login');

//       // 提示退出登入
//       toast('退出登入成功');
//     });
//   });
// };
</script>

<template>
  <!-- https://element-plus.org/zh-CN/component/layout.html#layout-%E5%B8%83%E5%B1%80 -->
  <div>
    <el-row :gutter="20" v-permission="['getStatistics1,GET']">
      <template v-if="panels.length == 0">
        <el-col :span="6" v-for="i in 4" :key="i">
          <el-skeleton animated loading style="width: 100%">
            <template #template>
              <el-card shadow="hover" class="border-0">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />

                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>

                <el-skeleton-item variant="h3" style="width: 80%" />

                <el-divider />

                <div class="flex justify-between text-sm text-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%" />

                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <!-- https://element-plus.org/zh-CN/component/skeleton.html#skeleton-%E9%AA%A8%E6%9E%B6%E5%B1%8F -->

      <el-col
        :span="6"
        :offset="0"
        v-for="(item, index) in panels"
        :key="index"
      >
        <!-- https://element-plus.org/zh-CN/component/card.html#card-%E5%8D%A1%E7%89%87 -->
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>

              <!-- https://element-plus.org/zh-CN/component/tag.html#tag-%E6%A0%87%E7%AD%BE -->
              <el-tag :type="item.unitColor" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>

          <span class="text-3xl font-bold text-gray-500">
            <!-- {{ item.value }} -->

            <CountTo :value="item.value" />
          </span>

          <!-- https://element-plus.org/zh-CN/component/divider.html#divider-%E5%88%86%E5%89%B2%E7%BA%BF -->
          <el-divider />

          <div class="flex justify-between text-sm text-gray-500">
            <span>{{ item.subTitle }}</span>

            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <IndexNavs />

    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :offset="0">
        <IndexChart v-permission="['getStatistics3,GET']" />
      </el-col>
      <el-col :span="12" :offset="0" v-permission="['getStatistics2,GET']">
        <IndexCard
          title="商店和商品提示"
          tip="商店和商品提示"
          :btns="goods"
          class="mb-3"
        />
        <IndexCard
          title="交易提示"
          tip="需要立即除裡的交易訂單"
          :btns="order"
        />
      </el-col>
    </el-row>
  </div>

  <!-- <div>
    home
    <el-button @click="setCookie">設定 cookie</el-button>
    <el-button @click="getCookie">讀取 cookie</el-button>
    <el-button @click="removeCookie">刪除 cookie</el-button>

    {{ $store.state.user }}
    {{ $store.state.user.data.data.username }}
    {{ $store.state.user.data.data.menus }}
    {{ $store.state.user.data.data.ruleNames }}

    <el-button @click="handleLogout">退出登入</el-button>
  </div> -->
</template>
