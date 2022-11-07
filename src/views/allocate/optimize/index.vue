<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="card">
          <!-- 这个写在card下才能有效果 -->
          <template #header><span>优化侧重点与效果</span></template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="optimize" style="height: 600px" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15">
        <el-card>
          <template #header>
            <div class="card-optimize-header">
              <span>优化目标倾向</span>
            </div>
          </template>
          <div class="slider-demo-block">
            <!-- <span class="slide-text">任务完成<br />成本</span> -->
            <el-tag class="tag-text" size="large" effect="plain">任务完成<br />成本</el-tag>
            <el-slider class="el-slider" v-model="valueOptimize" :format-tooltip="formatTooltip" :marks="marks"
              @change="onChange" />
            <!-- <span class="slide-text">任务完成<br />比例</span> -->
            <el-tag class="tag-text" size="large" effect="plain">任务完成<br />比例</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card>
          <template #header>
            <div class="card-cluster-header">
              <span>优化模型设置</span>

            </div>
          </template>
          <el-row justify="center" style="margin-top: 20px">
            <el-col :span="8">
            <router-link to="/allocate/model/setConstraint">
              <el-button type="primary" size="large">约束条件设置</el-button>
            </router-link>
          </el-col>
          <el-col :span="8">
            <router-link to="/allocate/model/setDecision">
              <el-button type="primary" size="large">决策变量设置</el-button>
            </router-link>
          </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Optimize">
import { reactive, ref } from "vue";
import { getCache } from "@/api/monitor/cache";
import * as echarts from "echarts";
// import graph from "@/assets/data/all_cluster.json";

import _ from "lodash";
// import type { CSSProperties } from 'vue'

function goTarget(url) {
  window.open(url, "__blank");
}

const allInfo = ref(null);
const { proxy } = getCurrentInstance();
const value4 = ref(50);
const optimize = ref(null);

var optimizeInst;



getCache().then(() => {
  // proxy.$modal.closeLoading();

  // for(var i=0 ; i< links.length ;i++){
  //   allInfoIntance.setOption(options[i]);
  //   sleep(3000);
  // }
  optimizeInst = echarts.init(optimize.value, "macarons");
  var optimizeOpt = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["优化算法1", "优化算法2", "优化算法3"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      name: "侧重点",
      type: "category",
      boundaryGap: false,
      data: ["优化目标1", "优化目标2", "优化目标3", "优化目标4", "优化目标5"],
    },
    yAxis: {
      name: "效果",
      type: "value",
    },
    series: [
      {
        name: "优化算法1",
        type: "line",
        // stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "优化算法2",
        type: "line",
        // stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "优化算法3",
        type: "line",
        // stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
    ],
  }
  optimizeInst.setOption(optimizeOpt);


});

// for (var i = 1; i < 13; i++) {

// window.addEventListener("resize", function () {
//   allInfoIntance.resize();
//   allInfoIntance.setOption({
//     series: [
//       {
//         id: "a",
//         data: charts.nodes,
//       },
//     ],
//   });
// });

// function getList() {
// proxy.$modal.loading("正在加载Agent数据，请稍候！");

const formatTooltip = (val) => {
  return val / 100;
};

// interface Mark {
//   style: CSSProperties
//   label: string
// }

// type Marks = Record<number, Mark | string>

const marks = {
  0: "0",
  20: "0.2",
  50: {
    style: {
      color: "#1989FA",
    },
    label: "0.5",
  },
  80: "0.8",
  100: "1",
};

const onChange = (val) => {
  console.log(val / 100);
};

const tableData = [
  {
    date: "80%",
    name: "80%",
    address: "80%",
  },
];

// const propData = [
//   {
//     agentId: '集群1',
//     agentProp: '集群1的属性',
//   },
//   {
//     agentId: '集群2',
//     agentProp: '集群2的属性',
//   },
//   {
//     agentId: '集群3',
//     agentProp: '集群3的属性',
//   },
// ]
</script>

<style scoped lang="scss">
.card {
  margin: 0px;
}

.card-block {
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  vertical-align: top;
}

.card-block:last-child {
  border-right: none;
}

.slider-demo-block {
  display: flex;
  align-items: center;
}

.el-slider {
  margin-left: 5px;
  margin-right: 5px;
}

.slider-demo-block .slide-text {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: visible;
  text-overflow: ellipsis;
  white-space: normal; //文本换行属性
  margin-bottom: 0;
}

.slider-demo-block .slide-text+.el-slider {
  flex: 0 0 70%;
}
</style>
