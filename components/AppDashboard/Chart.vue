<template>
  <div ref="chart" style="width: 100%; height: 450px" class="my-12"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { array, string } from 'vue-types'
import { GraphSeries } from '@/core'

import * as echarts from 'echarts'

export default Vue.extend({
  props: {
    series: array<GraphSeries>().def([]),
    xaxis: array<string>().def([]),
    title: string(),
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const el = this.$refs.chart as HTMLElement
      const myChart = echarts.init(el)

      const option = {
        title: {
          text: this.title,
          textStyle: {
            color: 'white',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          textStyle: {
            color: 'white',
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: [
          {
            // boundaryGap: false,
            data: this.xaxis,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: this.series,
      }

      option && myChart.setOption(option)
    },
  },
})
</script>
