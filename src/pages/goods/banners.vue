<script setup>
import { ref, reactive } from 'vue';

import ChooseImage from '@/components/ChooseImage.vue';

import { readGoods, setGoodsBanner } from '@/api/goods';

const dialogVisible = ref(false);

const form = reactive({
  banner: [],
});

const goodsId = ref(0);

const open = (row) => {
  // console.log('row', row);

  goodsId.value = row.id;

  readGoods(goodsId.value).then((response) => {
    // console.log('response', reponse);

    response.data.data.goodsBanner.map((object) => {
      return object.url;
    });

    dialogVisible.value = true;
  });
};

const submit = () => {};

defineExpose({
  open,
});
</script>

<template>
  <el-drawer
    title="設置輪播圖"
    v-model="dialogVisible"
    size="50%"
    destroy-on-close
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="輪播圖">
        <ChooseImage v-model="form.banner"></ChooseImage>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
