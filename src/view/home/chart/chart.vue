<template>
  <div id="chart">
    <el-card>
      <ul class="ul">
        <li class="item">
          <div class="itemContent color1">{{info.increment_users}}</div>
          <p>今日新增用户</p>
        </li>
        <li class="item">
          <div class="itemContent color1">{{info.total_users}}</div>
          <p>总用户量</p>
        </li>
        <li class="item">
          <div class="itemContent color2">{{info.increment_questions}}</div>
          <p>新增试题</p>
        </li>
        <li class="item">
          <div class="itemContent color2">{{info.total_questions}}</div>
          <p>总试题量</p>
        </li>
        <li class="item">
          <div class="itemContent color3">{{info.total_done_questions}}</div>
          <p>总刷题量</p>
        </li>
        <li class="item">
          <div class="itemContent color3">{{info.personal_questions}}</div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card class="echarts">
      <div id="main" ref="echarts"></div>
    </el-card>
  </div>
</template>

<script>
import { getChartData, getBusinessTitle, hotCityTitle } from "@/api/chart.js";
import echarts from "echarts";
export default {
  data() {
    return {
      info: "",
      business: [],
      city: []
    };
  },
  created() {
    getChartData().then(res => {
      console.log(res);
      this.info = res.data;
    });

    hotCityTitle().then(res => {
      console.log(res);
    });
  },
  mounted() {
    getBusinessTitle().then(res => {
      let business = res.data.map(item => {
        return item.name;
      });
      var myChart = echarts.init(this.$refs.echarts);
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        title: {
          text: "整体数据",
          left: "400"
        },
        legend: {
          orient: "vertical",
          right: 400,
          data: business
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: res.data
          }
        ]
      };
      myChart.setOption(option);
    });
  }
};
</script>

<style lang='less'>
#chart {
  .ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;

    .item {
      .color1 {
        color: #0086fa;
        border: 2px solid #0086fa;
      }
      .color2 {
        color: #f76238;
        border: 2px solid #f76238;
      }
      .color3 {
        color: #5ed07f;
        border: 2px solid #5ed07f;
      }
      .itemContent {
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 35px;
        border-radius: 50%;
      }
      p {
        color: #9a9a9a;
      }
    }
  }
  .echarts {
    margin-top: 20px;

    #main {
      height: 500px;
    }
  }
}
</style>