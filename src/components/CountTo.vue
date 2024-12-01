<script setup>
import { reactive, watch } from "vue";

import gsap from "gsap";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
});

const d = reactive({
  number: 0,
});

function AnimateToValue() {
  gsap.to(d, { duration: 0.5, number: props.value });
}

AnimateToValue();

watch(() => props.value, AnimateToValue());
</script>

<template>
  {{ d.number.toFixed(0) }}
</template>