<script setup>
import { computed } from 'vue';

import {
  getCouponList,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from '@/api/coupon';

import FormDrawer from '@/components/FormDrawer.vue';

import ListHeader from '@/components/ListHeader.vue';

import { useInitTable, useInitForm } from '@/composables/useCommon';

const {
  tableData,
  currentPage,
  total,
  limit,
  isLoading,
  getData,
  handleDelete,
} = useInitTable({
  getList: getCouponList,
  onGetListSuccess: (response) => {
    // console.log('response', response);

    tableData.value = response?.data?.data?.list.map((object) => {
      // 轉換優惠券狀態
      object.statusText = formatStatus(object);

      return object;
    });

    total.value = response?.data?.data?.totalCount;
  },
  delete: deleteCoupon,
});

const formatStatus = (row) => {
  let status = '領取中';
  let startTime = new Date(row.start_time).getTime();
  let now = new Date().getTime();
  let endTime = new Date(row.end_time).getTime();
  if (startTime > now) {
    status = '尚未開始';
  } else if (endTime < now) {
    status = '已結束';
  } else if (row.status == 0) {
    status = '已失效';
  }
  return status;
};

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit,
} = useInitForm({
  form: {
    name: '',
    type: 0,
    value: 0,
    total: 100,
    min_price: 0,
    start_time: null,
    end_time: null,
    order: 50,
    desc: '',
  },
  //getData 從上面 useInitTable 獲取
  getData,
  update: updateCoupon,
  create: createCoupon,

  beforeSubmit: (form) => {
    if (typeof form.start_time != 'number') {
      form.start_time = new Date(form.start_time).getTime();
    }
    if (typeof form.end_time != 'number') {
      form.end_time = new Date(form.end_time).getTime();
    }
    return form;
  },
});

const timerange = computed({
  get() {
    return form.start_time && form.end_time
      ? [form.start_time, form.end_time]
      : [];
  },
  set(value) {
    form.start_time = value[0];
    form.end_time = value[1];
  },
});
</script>

<template>
  <!-- rpcard -->
  <el-card shadow="never" class="border-0">
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      v-loading="isLoading"
    >
      <el-table-column label="優惠券名稱" width="350">
        <template #default="{ row }">
          <div
            class="border border-dashed py-2 px-2 rounded"
            :class="row.statusText == '領取中' ? 'active' : 'inactive'"
          >
            <div class="text-xl font-bold">{{ row.name }}</div>
            <div class="text-xs">{{ row.start_time }} ~ {{ row.end_time }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="statusText" label="狀態" />
      <el-table-column label="優惠">
        <template #default="{ row }">
          {{ row.type == 0 ? '滿減' : '折扣' }}
          {{ row.type == 0 ? 'NT' + row.value : row.value + '折' }}
        </template>
      </el-table-column>
      <el-table-column prop="total" label="發佈數量" />
      <el-table-column prop="used" label="已使用" />
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button
            @click="handleEdit(scope.row)"
            type="primary"
            text
            size="small"
            >修改</el-button
          >

          <el-popconfirm
            title="是否要刪除該公告?"
            confirmButtonText="確定"
            cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button text="true" type="primary" size="small" class="px-1">
                刪除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex items-center justify-center mt-5">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="getData"
        :total="total"
        v-model:current-page="currentPage"
        v-model:page-size="limit"
      />
    </div>

    <!-- <FormDrawer ref="formDrawerRef" title="新增公告" @submit="handleSubmit"> -->
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <!-- epf -->
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="優惠券名稱" prop="name">
          <el-input
            v-model="form.name"
            placeholder="優惠券名稱"
            style="width: 50%"
          ></el-input>
        </el-form-item>

        <el-form-item label="類型" prop="type">
          <!-- eprg -->
          <el-radio-group v-model="form.type">
            <el-radio :label="0">滿減</el-radio>
            <el-radio :label="1">折扣</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="面額" prop="value">
          <el-input v-model="form.value" placeholder="面額" style="width: 50%">
            <template #append>{{ form.type ? '折' : '元' }}</template>
          </el-input>
        </el-form-item>

        <el-form-item label="發行量" prop="total">
          <!-- epin -->
          <el-input-number v-model="form.total" :min="0" :max="10000">
          </el-input-number>
        </el-form-item>

        <el-form-item label="最低使用價格" prop="min_price">
          <el-input
            v-model="form.min_price"
            placeholder="最低使用價格"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="order">
          <!-- epin -->
          <el-input-number v-model="form.order" :min="0" :max="1000">
          </el-input-number>
        </el-form-item>

        <el-form-item label="活動時間">
          <el-date-picker
            :editable="false"
            v-model="timerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetimerange"
            range-separator="To"
            start-placeholder="開始日期"
            end-placeholder="結束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="描述" prop="desc">
          <el-input
            v-model="form.desc"
            placeholder="描述"
            type="textarea"
            :row="5"
          ></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<style scoped>
.active {
  @apply border-rose-200 bg-rose-50 text-red-400;
}

.inactive {
  @apply border-gray-200 bg-gray-50 text-gray-400;
}
</style>
