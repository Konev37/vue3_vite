<template>
  <div class="app-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <h1 class="header">地理环境</h1>
          <div ref="geoEnv" class="content" />
        </el-col>
        <el-col :span="12">
          <h1 class="header">大气环境</h1>
          <div ref="atmosphereEnv" class="content" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <h1 class="header">目标环境</h1>
          <div ref="targetEnv" class="content" />
        </el-col>
        <el-col :span="12">
          <h1 class="header">区域环境</h1>
          <div ref="regionalEnv" class="content" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup name="Env">
import { ref } from "vue";
import * as echarts from "echarts";
import { getAgent } from "@/api/dashboard/agent";

const { proxy } = getCurrentInstance();
const geoEnv = ref(null);
const atmosphereEnv = ref(null);
const targetEnv = ref(null);
const regionalEnv = ref(null);

var geoEnvInst, atmosphereEnvInst, targetEnvInst, regionalEnvInst;

proxy.$modal.loading("正在加载态势数据，请稍候！");

getAgent().then(() => {
  geoEnvInst = echarts.init(geoEnv.value, "macarons");
  atmosphereEnvInst = echarts.init(atmosphereEnv.value, "macarons");
  targetEnvInst = echarts.init(targetEnv.value, "macarons");
  regionalEnvInst = echarts.init(regionalEnv.value, "macarons");
  proxy.$modal.closeLoading();

  var geoEnvOpt = {
    // legend: {},
    tooltip: {},
    dataset: {
      dimensions: ["value", "因素1", "因素2", "因素3"],
      source: [
        {
          value: "地理1",
          因素1: 43.3,
          因素2: 85.8,
          因素3: 93.7,
        },
        {
          value: "地理2",
          因素1: 83.1,
          因素2: 73.4,
          因素3: 55.1,
        },
        {
          value: "地理3",
          因素1: 86.4,
          因素2: 65.2,
          因素3: 82.5,
        },
        {
          value: "地理4",
          因素1: 72.4,
          因素2: 53.9,
          因素3: 39.1,
        },
      ],
    },
    xAxis: {
      name: "影响度",
      axisLabel: {
        textStyle: {
          fontSize: 18,
        },
      },
    },
    yAxis: {
      type: "category",
      axisLabel: {
        textStyle: {
          fontSize: 18,
        },
      },
    },
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  };
  var atmosphereEnvOpt = {
    // title: {
    //   text: "Stacked Line",
    // },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["大气1", "大气2", "大气3", "大气4"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        textStyle: {
          fontSize: 18,
        },
      },
      data: ["因素1", "因素2", "因素3", "因素4", "因素5", "因素6", "因素7"],
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
        name: "大气1",
        type: "line",
        // stack: "Total",
        data: [12.0, 13.2, 10.1, 13.4, 9.0, 23.0, 21.0],
      },
      {
        name: "大气2",
        type: "line",
        // stack: "Total",
        data: [22.0, 18.2, 19.1, 23.4, 29.0, 33.0, 31.0],
      },
      {
        name: "大气3",
        type: "line",
        // stack: "Total",
        data: [15.0, 23.2, 20.1, 15.4, 19.0, 33.0, 41.0],
      },
      {
        name: "大气4",
        type: "line",
        // stack: "Total",
        data: [32.0, 33.2, 30.1, 33.4, 39.0, 33.0, 32.0],
      },
    ],
  };
  var targetEnvOpt = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["目标1", "目标2", "目标3", "目标4"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        textStyle: {
          fontSize: 18,
        },
      },
      data: ["因素1", "因素2", "因素3", "因素4", "因素5", "因素6", "因素7"],
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
        name: "目标1",
        type: "line",
        smooth: true,
        data: [22.0, 18.2, 19.1, 23.4, 29.0, 33.0, 31.0],
      },
      {
        name: "目标2",
        type: "line",
        smooth: true,
        data: [32.0, 33.2, 30.1, 33.4, 39.0, 33.0, 32.0],
      },
      {
        name: "目标3",
        type: "line",
        smooth: true,
        data: [12.0, 13.2, 10.1, 13.4, 9.0, 23.0, 21.0],
      },
      {
        name: "目标4",
        type: "line",
        smooth: true,
        data: [15.0, 23.2, 20.1, 15.4, 19.0, 33.0, 41.0],
      },
    ],
  };
  var regionalEnvOpt = {
    // legend: {},
    tooltip: {},
    dataset: {
      dimensions: ["value", "因素1", "因素2", "因素3"],
      source: [
        {
          value: "区域1",
          因素1: 85.8,
          因素2: 43.3,
          因素3: 93.7,
        },
        {
          value: "区域2",
          因素1: 55.1,
          因素2: 83.1,
          因素3: 73.4,
        },
        {
          value: "区域3",
          因素1: 86.4,
          因素2: 82.5,
          因素3: 65.2,
        },
        {
          value: "区域4",
          因素1: 53.9,
          因素2: 39.1,
          因素3: 72.4,
        },
      ],
    },
    xAxis: {
      name: "影响度",
      axisLabel: {
        textStyle: {
          fontSize: 18,
        },
      },
    },
    yAxis: {
      type: "category",
      axisLabel: {
        textStyle: {
          fontSize: 18,
        },
      },
    },
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  };
  geoEnvInst.setOption(geoEnvOpt);
  atmosphereEnvInst.setOption(atmosphereEnvOpt);
  targetEnvInst.setOption(targetEnvOpt);
  regionalEnvInst.setOption(regionalEnvOpt);
});
</script>

<style scoped lang="scss">
.header {
  text-align: center;
}
.content {
  height: 350px;
}
</style>
