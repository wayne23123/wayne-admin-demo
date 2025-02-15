<script setup>
import { nextTick, ref } from 'vue';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref('');
const dynamicTags = ref(props.modelValue ? props.modelValue.split(',') : []);
const inputVisible = ref(false);
const InputRef = ref();

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);

  emit('update:modelValue', dynamicTags.value.join(','));
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.input.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);

    emit('update:modelValue', dynamicTags.value.join(','));
  }
  inputVisible.value = false;
  inputValue.value = '';
};
</script>

<template>
  <!-- https://element-plus.org/zh-CN/component/tag.html#%E5%8A%A8%E6%80%81%E7%BC%96%E8%BE%91%E6%A0%87%E7%AD%BE -->

  <div class="flex gap-2">
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput">
      + 新增值
    </el-button>
  </div>
</template>
