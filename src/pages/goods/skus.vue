<script setup>
import { ref, reactive } from 'vue';

import FormDrawer from '@/components/FormDrawer.vue';

import { readGoods, updateGoodsSkus } from '@/api/goods';

import { toast } from '@/composables/util';

import SkuCard from './components/SkuCard.vue';

const formDrawerRef = ref(null);

const form = reactive({
  sku_type: 0,
  sku_value: {
    oprice: 0,
    pprice: 0,
    cprice: 0,
    weight: 0,
    value: 0,
  },
});

const goodsId = ref(0);

const open = (row) => {
  // console.log('row', row);

  goodsId.value = row.id;

  row.skusLoading = true;

  readGoods(goodsId.value)
    .then((response) => {
      // console.log('response', reponse);

      form.sku_type = response.data.data.sku_type || 0;
      form.sku_value = response.data.data.sku_value || {
        oprice: 0,
        pprice: 0,
        cprice: 0,
        weight: 0,
        value: 0,
      };

      // response.data.data.goodsBanner.map((object) => {
      //   return object.url;
      // });

      formDrawerRef.value.open();
    })
    .finally(() => {
      row.skusLoading = false;
    });
};

const emit = defineEmits(['reloadData']);

const isLoad = ref(false);
const submit = () => {
  formDrawerRef.value.showLoadingButton();
  updateGoodsSkus(goodsId.value, form)
    .then((response) => {
      toast('設置商品規格成功');
      formDrawerRef.value.close();
      emit('reloadData');
    })
    .finally(() => {
      formDrawerRef.value.hideLoadingButton();
    });
};

defineExpose({
  open,
});
</script>

<template>
  <FormDrawer
    ref="formDrawerRef"
    title="設置商品規格"
    @submit="submit"
    destroy-on-close
    size="70%"
  >
    <el-form :model="form">
      <el-form-item label="商品規格">
        <el-radio-group v-model="form.sku_type" @change="handleChange">
          <el-radio :label="0">單規格</el-radio>
          <el-radio :label="1">多規格</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="form.sku_type === 0">
        <el-form-item label="市場價格">
          <el-input v-model="form.sku_value.oprice" style="width: 35%">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="銷售價格">
          <el-input v-model="form.sku_value.pprice" style="width: 35%">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="成本價格">
          <el-input v-model="form.sku_value.cprice" style="width: 35%">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form.sku_value.weight" style="width: 35%">
            <template #append>公斤</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品體積">
          <el-input v-model="form.sku_value.volume" style="width: 35%">
            <template #append>立方米</template>
          </el-input>
        </el-form-item>
      </template>
      <template v-else>
        <SkuCard></SkuCard>
      </template>
      <el-form-item>
        <el-button type="primary" @click="submit" :loading="isLoad"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>
