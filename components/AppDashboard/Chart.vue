<template>
  <div class="py-8">
    <div class="mb-4 text-xl">
      {{ title }}
    </div>
    <div ref="chart" class="w-full h-96"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { array, string } from 'vue-types'
import { GraphSeries } from '@/core'
import { macarons } from '@/core/echarts'

import * as echarts from 'echarts'

export default Vue.extend({
  props: {
    series: array<GraphSeries>().def([]),
    xaxis: array<string>().def([]),
    title: string(),
    yaxisUnit: string().def(''),
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const el = this.$refs.chart as HTMLElement
      echarts.registerTheme('macarons', macarons)
      const myChart = echarts.init(el, 'macarons')

      const option = {
        grid: { show: false, containLabel: true },
        title: {
          text: '',
          textStyle: {
            color: 'white',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'cross',
          },
        },
        legend: {
          textStyle: {
            color: 'white',
          },
        },
        toolbox: {
          feature: {
            // saveAsImage: {},
          },
        },
        xAxis: [
          {
            // boundaryGap: false,
            data: this.xaxis,
            showGrid: false,
            splitLine: {
              show: false,
            },
            splitArea: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            // show: false,
            type: 'value',
            splitLine: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              formatter: `{value} ${this.yaxisUnit}`,
            },
            axisLine: {
              show: true,
              // lineStyle: {
              //   color: 'red',
              // },
            },
          },
        ],
        series: this.series,
      }

      option && myChart.setOption(option)
    },
  },
})
</script>
