<!--
 * @Description: 
 * @Author: 志洪
 * @Date: 2020-03-16 17:26:17
 * @LastEditors: 志洪
 * @LastEditTime: 2020-03-21 01:40:31
 -->
<template>
  <div>
    <my-chart :option="chartOption" style="height:400px" />
  </div>
</template>
<script>
// 图表组件
import MyChart from "../../components/MyChart.vue";
// 随机数
import random from "lodash/random";
export default {
  data() {
    return {
      chartOption: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  components: {
    MyChart
  },
  mounted() {
    this.interval = window.setInterval(() => {
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => {
          return random(100);
        }
      );
      this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
<style lang="less" scoped></style>
