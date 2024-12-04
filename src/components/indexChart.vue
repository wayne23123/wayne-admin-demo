<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import * as echarts from 'echarts';

import { getStatistics3 } from '@/api/index.js';

// https://vueuse.org/core/useResizeObserver/
import { useResizeObserver } from '@vueuse/core';

const current = ref('week');

var myChart = null;

const options = [
  {
    text: '近一個月',
    value: 'month',
  },

  {
    text: '近一周',
    value: 'week',
  },

  {
    text: '近 24 小時',
    value: 'hour',
  },
];

const handleChoose = (type) => {
  current.value = type;

  getData();
};

const getData = () => {
  let option = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'bar',
      },
    ],
  };

  myChart.showLoading();

  getStatistics3(current.value)
    .then((response) => {
      // console.log('response', response);

      option.xAxis.data = response.data.data.x;

      option.series[0].data = response.data.data.y;

      myChart.setOption(option);
    })
    .finally(() => {
      myChart.hideLoading();
    });

  // var option;
  // option = {
  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       data: [120, 200, 150, 80, 70, 110, 130],
  //       type: 'bar',
  //     },
  //   ],
  // };
  // option && myChart.setOption(option);
};

const el = ref(null);
useResizeObserver(el, (entries) => {
  // console.log('entries', entries);

  myChart.resize();
});

onMounted(() => {
  var chartDom = document.getElementById('chart');
  if (chartDom) {
    myChart = echarts.init(chartDom);

    getData();
  }
});

// 銷毀組件，解決白屏問題
onBeforeUnmount(() => {
  if (myChart) echarts.dispose(myChart);
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">訂單統計</span>

        <!-- https://element-plus.org/zh-CN/component/tag.html#%E5%8F%AF%E9%80%89%E4%B8%AD%E7%9A%84%E6%A0%87%E7%AD%BE -->
        <el-check-tag
          @click="handleChoose(item.value)"
          v-for="(item, index) in options"
          :key="index"
          :checked="current == item.value"
          >{{ item.text }}</el-check-tag
        >
      </div>
    </template>

    <!-- https://echarts.apache.org/examples/zh/editor.html?c=bar-simple -->
    <div ref="el" id="chart" style="width: 100%; height: 300px"></div>
  </el-card>
</template>
