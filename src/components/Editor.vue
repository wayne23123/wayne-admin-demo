<template>
  <editor v-model="content" tag-name="div" :init="init" />
  <ChooseImage :preview="false" ref="ChooseImageRef" :limit="9" />
</template>
<script setup>
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';

// 新增額外的圖片添加組件
import ChooseImage from '@/components/ChooseImage.vue';
import { ref, watch } from 'vue';
// 引用主題文件
import 'tinymce/themes/silver/theme';
// 引用圖標文件
import 'tinymce/icons/default';
import 'tinymce/models/dom';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
// 特殊字符
import 'tinymce/plugins/charmap';
// 查看源碼
import 'tinymce/plugins/code';
// 插入代碼
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
//全屏
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
// 插入上傳圖片插件
import 'tinymce/plugins/image';
//圖片工具
import 'tinymce/plugins/importcss';
//時間插入
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
// 列表插件
import 'tinymce/plugins/lists';
// 插入視頻插件
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
//分頁
import 'tinymce/plugins/pagebreak';
// 預覽
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
// 保存
import 'tinymce/plugins/save';
//查詢替換
import 'tinymce/plugins/searchreplace';
// 插入表格插件
import 'tinymce/plugins/table';
// 插入模板
// import "tinymce/plugins/template";
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
// 字數統計插件
import 'tinymce/plugins/wordcount';
// v-model
const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);

const ChooseImageRef = ref(null);

// 配置
const init = {
  // 中文語言包路徑
  language_url: '/tinymce/langs/zh_CN.js',
  language: 'zh-CN',
  // 編輯器皮膚樣式
  skin_url: '/tinymce/skins/ui/oxide',
  content_css: '/tinymce/skins/content/default/content.min.css',
  // 隱藏菜單欄
  menubar: false,
  autoresize_bottom_margin: 50,
  max_height: 500,
  min_height: 400,
  // height: 320,
  toolbar_mode: 'none',
  plugins:
    'wordcount visualchars visualblocks template searchreplace save quickbars preview pagebreak nonbreaking media insertdatetime importcss image help fullscreen directionality codesample code charmap link code table lists advlist anchor autolink autoresize autosave',
  toolbar:
    'formats undo redo fontsizeselect fontselect ltr rtl searchreplace media imageUpload | outdent indent aligncenter alignleft alignright alignjustify lineheight underline quicklink h2 h3 blockquote numlist bullist table removeformat forecolor backcolor bold italic strikethrough hr link preview fullscreen help ',
  content_style: 'p {margin: 5px 0; font-size: 14px}',
  fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
  font_formats:
    '微軟雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;蘋果蘋方= PingFang SC, Microsoft YaHei, sans- serif; 宋體 = simsun, serif; 仿宋體 = FangSong, serif; 黑體 = SimHei, sans - serif; Arial = arial, helvetica, sans - serif;Arial Black = arial black, avant garde;Book Antiqua = book antiqua, palatino; ',
  branding: false,
  elementpath: false,
  // 禁止改變大小
  resize: false,
  // 隱藏底部狀態欄
  statusbar: false,
  // 新增的插入圖片方法
  setup: (editor) => {
    editor.ui.registry.addButton('imageUpload', {
      tooltip: '插入圖片',
      icon: 'image',
      onAction() {
        console.log('插入圖片');
        ChooseImageRef.value.open((data) => {
          // console.log('data', data);

          data.forEach((url) => {
            editor.insertContent(`<img src="${url}" style="width:100%">`);
          });
        });
        // editor.insertContent;
      },
    });
  },
};
tinymce.init;
const content = ref(props.modelValue);
watch(props, (newVal) => (content.value = newVal.modelValue));
watch(content, (newVal) => emit('update:modelValue', newVal));
</script>
<style>
.tox-tinymce-aux {
  z-index: 9999 !important;
}
</style>
