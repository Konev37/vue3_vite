<template>
  <div class="app-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <h1 class="header">态势1</h1>
          <div ref="sit1" class="content" />
        </el-col>
        <el-col :span="6">
          <h1 class="header">态势2</h1>
          <div ref="sit2" class="content" />
        </el-col>
        <el-col :span="6">
          <h1 class="header">态势3</h1>
          <div ref="sit3" class="content" />
        </el-col>
        <el-col :span="6">
          <h1 class="header">态势4</h1>
          <div ref="sit4" class="content" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup name="Handled">
import { ref } from "vue";
import * as echarts from "echarts";
import { getAgent } from "@/api/dashboard/agent";

const { proxy } = getCurrentInstance();
const sit1 = ref(null);
const sit2 = ref(null);
const sit3 = ref(null);
const sit4 = ref(null);

var sit1Inst, sit2Inst, sit3Inst, sit4Inst;

proxy.$modal.loading("正在加载态势数据，请稍候！");

getAgent().then(() => {
  sit1Inst = echarts.init(sit1.value, "macarons");
  sit2Inst = echarts.init(sit2.value, "macarons");
  sit3Inst = echarts.init(sit3.value, "macarons");
  sit4Inst = echarts.init(sit4.value, "macarons");
  proxy.$modal.closeLoading();

  var sit1Opt = {
    xAxis: {
      type: "category",
      axisLabel: {
        textStyle: {
          fontSize: 18,
        },
      },
      data: ["因素1", "因素2", "因素3", "因素4", "因素5"],
    },
    yAxis: {
      axisLabel: {
        textStyle: {
          fontSize: 18,
        },
      },
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70],
        type: "bar",
      },
    ],
  };
  var sit2Opt = {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center'
    // },
    tooltip: {
      trigger: "item",
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left'
    // },
    series: [
      {
        // name: 'Access From',
        type: "pie",
        radius: "50%", //半径
        data: [
          { value: 1048, name: "因素1" },
          { value: 735, name: "因素2" },
          { value: 580, name: "因素3" },
          { value: 484, name: "因素4" },
          { value: 300, name: "因素5" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          textStyle: {
            fontSize: 18,
          },
        },
      },
    ],
  };
  var sit3Opt = {
    // title: {
    //   text: 'Basic Radar Chart'
    // },
    legend: {
      data: ["因素1", "因素2"],
    },
    tooltip: {
      trigger: "item",
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "维度1", max: 65 },
        { name: "维度2", max: 160 },
        { name: "维度3", max: 300 },
        { name: "维度4", max: 380 },
        { name: "维度5", max: 520 },
        { name: "维度6", max: 250 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [42, 30, 200, 350, 500, 180],
            name: "因素1",
          },
          {
            value: [50, 140, 280, 260, 420, 210],
            name: "因素2",
          },
        ],
      },
    ],
  };
  var sit4Opt = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["因素1", "因素2", "因素3"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      name: "时间",
      type: "category",
      boundaryGap: false,
      axisLabel: {
        textStyle: {
          fontSize: 18,
        },
      },
      data: ["1", "2", "3", "4", "5"],
    },
    yAxis: {
      name: "影响度",
      type: "value",
      axisLabel: {
        textStyle: {
          fontSize: 18,
        },
      },
    },
    series: [
      {
        name: "因素1",
        type: "line",
        // stack: "Total",
        data: [12.0, 13.2, 10.1, 13.4, 9.0, 23.0, 21.0],
      },
      {
        name: "因素2",
        type: "line",
        // stack: "Total",
        data: [22.0, 18.2, 19.1, 23.4, 29.0, 33.0, 31.0],
      },
      {
        name: "因素3",
        type: "line",
        // stack: "Total",
        data: [15.0, 23.2, 20.1, 15.4, 19.0, 33.0, 41.0],
      },
    ],
  };
  sit1Inst.setOption(sit1Opt);
  sit2Inst.setOption(sit2Opt);
  sit3Inst.setOption(sit3Opt);
  sit4Inst.setOption(sit4Opt);
});
</script>

<style scoped lang="scss">
.header {
  text-align: center;
}
.content {
  height: 600px;
}
</style>
