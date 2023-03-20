<template>
  <div :id="id" class="chart-bar"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TransformComponent,
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
import { ref, reactive, onMounted } from 'vue';
import { genId } from '@/utils/common';
export default {
  setup() {
    let id = ref();
    let chart = '';
    let option = reactive({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    });
    id = genId();

    onMounted(() => {
      chart = echarts.init(document.getElementById(id));
      console.log(document.getElementById(id));
      chart && chart.setOption(option);
      window.addEventListener('resize', () => {
        chart && chart.resize();
      });
    });

    return { id };
  },
};
</script>

<style lang="scss">
.chart-bar {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
}
</style>
