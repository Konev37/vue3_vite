<template>
  <div class="app-container">
    <el-card>
      <el-row>
        <el-col :span="12">
          <h1 class="header">危险agent</h1>
          <div ref="danAgents" class="content" />
        </el-col>
        <el-col :span="12">
          <h1 class="header">协同agent</h1>
          <div ref="colAgent" class="content" />
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

proxy.$modal.loading("正在加载Agent数据，请稍候！");

getAgent().then((res) => {
  danAgentsInst = echarts.init(danAgents.value, "macarons");
  colAgentInst = echarts.init(colAgent.value, "macarons");
  proxy.$modal.closeLoading();
  // console.log(res);
  var DAoption = {
    // legend: {},
    tooltip: {},
    dataset: {
      dimensions: ["value", "危险类别1", "危险类别2", "危险类别3"],
      source: [
        {
          value: "危险agent1",
          危险类别1: 43.3,
          危险类别2: 85.8,
          危险类别3: 93.7,
        },
        {
          value: "危险agent2",
          危险类别1: 83.1,
          危险类别2: 73.4,
          危险类别3: 55.1,
        },
        {
          value: "危险agent3",
          危险类别1: 86.4,
          危险类别2: 65.2,
          危险类别3: 82.5,
        },
        {
          value: "危险agent4",
          危险类别1: 72.4,
          危险类别2: 53.9,
          危险类别3: 39.1,
        },
      ],
    },
    xAxis: { type: "category" },
    yAxis: {
      name: "危险度",
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  };
  var CAoption = {
    // legend: {},
    tooltip: {},
    dataset: {
      dimensions: ["value", "协同类别1", "协同类别2", "协同类别3"],
      source: [
        {
          value: "协同agent1",
          协同类别1: 72.4,
          协同类别2: 53.9,
          协同类别3: 39.1,
        },
        {
          value: "协同agent2",
          协同类别1: 83.1,
          协同类别2: 73.4,
          协同类别3: 55.1,
        },
        {
          value: "协同agent3",
          协同类别1: 43.3,
          协同类别2: 85.8,
          协同类别3: 93.7,
        },
        {
          value: "协同agent4",
          协同类别1: 86.4,
          协同类别2: 65.2,
          协同类别3: 82.5,
        },
      ],
    },
    xAxis: { type: "category" },
    yAxis: {
      name: "协同度",
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  };
  danAgentsInst.setOption(DAoption);
  colAgentInst.setOption(CAoption);
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
