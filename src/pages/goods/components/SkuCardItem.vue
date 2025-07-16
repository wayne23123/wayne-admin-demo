<script setup>
import { initSkusCardItem } from '@/composables/useSku.js';

const props = defineProps({
  skuCardId: [Number, String],
});

const { item } = initSkusCardItem(props.skuCardId);
</script>

<template>
  <div v-for="(item, index) in item.goodsSkusCardValue" :key="index">
    {{ item.text }}
  </div>
</template>
