<!--
 * @Description: 
 * @Author: 志洪
 * @Date: 2020-03-20 20:24:36
 * @LastEditors: 志洪
 * @LastEditTime: 2020-03-21 01:51:45
 -->
<template>
  <div ref="chartDom"></div>
</template>
<script>
// 图表
import echarts from "echarts";
// 防抖
import debounce from "lodash/debounce";
// 监听识图的变化
import { addListener, removeListener } from "resize-detector";
// 请求插件
import axios from "axios";

export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    }
    // 相比上面的方法,该方法非常消耗性能
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  created() {
    // 防抖300毫秒之后才执行一次
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    // 渲染图表
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例,不是响应式
      this.chart = echarts.init(this.$refs.chartDom);
      // 父组件传进来的对象配置
      this.chart.setOption(this.option);
    }
  }
};
</script>
<style lang="less"></style>
