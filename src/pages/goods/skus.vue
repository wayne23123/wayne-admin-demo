<script setup>
import { ref, reactive } from 'vue';

import FormDrawer from '@/components/FormDrawer.vue';

import Editor from '@/components/Editor.vue';

import { readGoods, updateGoods } from '@/api/goods';

import { toast } from '@/composables/util';

const formDrawerRef = ref(null);

const form = reactive({
  content: '',
});

const goodsId = ref(0);

const open = (row) => {
  // console.log('row', row);

  goodsId.value = row.id;

  row.contentLoading = true;

  readGoods(goodsId.value)
    .then((response) => {
      // console.log('response', reponse);

      form.content = response.data.data.content;

      // response.data.data.goodsBanner.map((object) => {
      //   return object.url;
      // });

      formDrawerRef.value.open();
    })
    .finally(() => {
      row.contentLoading = false;
    });
};

const emit = defineEmits(['reloadData']);

const isLoad = ref(false);
const submit = () => {
  formDrawerRef.value.showLoadingButton();
  updateGoods(goodsId.value, form)
    .then((response) => {
      toast('設置商品詳情成功');
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
    title="設置商品詳情"
    @submit="submit"
    destroy-on-close
  >
    <el-form :model="form">
      <el-form-item>
        <Editor v-model="form.content"></Editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" :loading="isLoad"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>
