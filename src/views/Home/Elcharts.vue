<template>
  <div id="pop">
    <div id="main" style="width: 600px; height: 400px; margin-top:50px"></div>
  </div>
</template>

<script>
export default {
  name: "pop",
  methods: {
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
        title: {
          text: "ECharts",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.drawChart();
  },
};
</script>