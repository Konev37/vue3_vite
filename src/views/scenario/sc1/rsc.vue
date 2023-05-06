<template>
  <div class="app-container">
    <el-card class="card">
      <template #header>
        
        <span style="color:#409EFF;">资源态势&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style="color:#FFFFFF;">红方态势评估&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style="color:#FFFFFF;">蓝方态势评估</span>
      </template>
      <el-row>
        <el-col :span="12">
          <h1 class="header">协同agent</h1>
          <div ref="colAgent" class="content" />
        </el-col>
        <el-col :span="12">
          <h1 class="header">危险agent</h1>
          <div ref="danAgents" class="content" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup name="Rsc">
import { ref } from "vue";
import * as echarts from "echarts";
import { getAgent } from "@/api/dashboard/agent";

const { proxy } = getCurrentInstance();
const danAgents = ref(null);
const colAgent = ref(null);

var danAgentsInst, colAgentInst;

var CdataAxis = [];
for (let i = 0; i < 23; i++) {
  CdataAxis.push(i + 1);
}
var DdataAxis = [];
for (let i = 0; i < 23; i++) {
  DdataAxis.push(i + 1);
}
//prettier-ignore
var Cdata = [72.4, 53.9, 39.1, 83.1, 73.4, 55.1, 43.3, 85.8, 93.7, 86.4, 65.2, 82.5, 73.6, 22.1, 98.5, 37.4, 52.8, 11.0, 64.7, 83.1, 43.6, 13.1, 57.2];
//prettier-ignore
var Ddata = [64.7, 83.1, 43.6, 13.1, 93.7, 86.4, 65.2, 98.5, 37.4, 52.8, 57.2, 72.4, 53.9, 82.5, 73.6, 22.1, 11.0, 39.1, 83.1, 73.4, 55.1, 43.3, 85.8];

proxy.$modal.loading("正在加载态势数据，请稍候！");

getAgent().then((res) => {
  danAgentsInst = echarts.init(danAgents.value, "macarons");
  colAgentInst = echarts.init(colAgent.value, "macarons");
  proxy.$modal.closeLoading();

  // console.log(res);
  var DAoption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      name: "agent",
      axisLabel: {
        textStyle: {
          color:'#ffffff'
        },
      },
      data: DdataAxis,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      name: "危险度",
      axisLabel: {
        textStyle: {
          color:'#ffffff'
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      
    },
    dataZoom: [{}],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#FFCCAA" },
            { offset: 0.5, color: "#FFCC00" },
            { offset: 1, color: "#FF9900" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#FF6600" },
              { offset: 0.7, color: "#FFCC00" },
              { offset: 1, color: "#FFCCAA" },
            ]),
          },
        },
        data: Ddata,
      },
    ],
  };

  var CAoption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      name: "agent",
      axisLabel: {
        textStyle: {
          
          color:'#ffffff'
        },
      },
      data: CdataAxis,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
      
    },
    yAxis: {
      name: "协同度",
      axisLabel: {
        textStyle: {
          
          color:'#ffffff'
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    dataZoom: [{}],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: Cdata,
      },
    ],
  };

  danAgentsInst.setOption(DAoption);
  colAgentInst.setOption(CAoption);
});
</script>

<style scoped lang="scss">
.header {
  text-align: center;
  color: aliceblue;
}
.content {
  height: 480px;
}

.card{
  background-color: rgba(255, 255, 255, 0 );
}
</style>
