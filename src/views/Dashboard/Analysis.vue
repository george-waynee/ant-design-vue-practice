<!--
 * @Description: 分析页
 * @Author: 志洪
 * @Date: 2020-03-16 17:26:17
 * @LastEditors: 志洪
 * @LastEditTime: 2020-03-21 16:51:17
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
// import random from "lodash/random";
// 请求插件
import axios from "axios";
export default {
  data() {
    return {
      chartOption: {}
    };
  },
  components: {
    MyChart
  },
  mounted() {
    this.getChartData();
    this.interval = window.setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    getChartData() {
      axios
        .get("/api/dashboard/chart", { params: { ID: 12345 } })
        .then(response => {
          this.chartOption = {
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
                data: response.data
              }
            ]
          };
        });
    }
  }
};
</script>
<style lang="less" scoped></style>
