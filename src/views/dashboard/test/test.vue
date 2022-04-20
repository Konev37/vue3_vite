<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <el-card class="card">
          <div class="card-block">
            <el-row>
              <el-col :span="24" class="card-box">
                <!-- 这个写在card下才能有效果 -->
                <template #header><span>命令统计</span></template>
                <div
                  class="el-table el-table--enable-row-hover el-table--medium"
                >
                  <div ref="allInfo" style="height: 600px" />
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <div class="slider-demo-block">
                    <span class="slide-text">任务完成<br />时间</span>
                    <el-slider
                      class="el-slider"
                      v-model="value4"
                      :format-tooltip="formatTooltip"
                      :marks="marks"
                      @change="onChange"
                    />
                    <span class="slide-text">任务完成<br />比例</span>
                  </div>
                  <!-- <el-button type="primary" @click="onSubmit">优化</el-button> -->
                </div>
              </el-col>
              <el-col :span="12">
                <template v-slot:header>
                  <div class="clearfix">
                    <span>全部集群总状态</span>
                  </div>
                </template>
                <el-table :data="allClusterInfo" border style="width: 100%">
                  <el-table-column
                    prop="allRatio"
                    label="任务完成率"
                    width="180"
                  />
                  <el-table-column
                    prop="allCost"
                    label="当前总成本"
                    width="180"
                  />
                  <el-table-column prop="allLoss" label="Agent损失率" />
                </el-table>
                <el-button
                  type="primary"
                  style="margin-left: 16px; margin-top: 10px"
                  @click="drawer = true"
                >
                  各集群详细信息
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-drawer
          v-model="drawer"
          title="各集群详细信息"
          direction="rtl"
          size="30%"
        >
          <el-table :data="clusterInfo" stripe border>
            <el-table-column prop="clusterId" label="集群编号" />
            <el-table-column prop="eachRatio" label="任务完成率" />
            <el-table-column prop="eachCost" label="当前总成本" />
            <el-table-column prop="eachLoss" label="Agent损失率" />
          </el-table>
        </el-drawer>
      </el-main>
      <el-footer>
        <!-- <el-row>
          <el-card class="card">
            <template v-slot:header>
            <div class="clearfix">
              <span>Agent集群属性</span>
            </div>
          </template>
          <div class="body">
            <el-table :data="propData" stripe border>
              <el-table-column prop="clusterId" label="集群编号" width="210" />
              <el-table-column prop="agentProp" label="属性" width="210"/>
            </el-table>
          </div>
          </el-card>
        </el-row> -->
      </el-footer>
    </el-container>
  </div>
</template>

<script setup name="All">
import { reactive, ref } from "vue";
import { getCache } from "@/api/monitor/cache";
import * as echarts from "echarts";
import graph from "@/assets/data/all_cluster.json";

function goTarget(url) {
  window.open(url, "__blank");
}
const drawer = ref(false);
const table = ref(false);

const allInfo = ref(null);
const { proxy } = getCurrentInstance();
const value4 = ref(50);

var allInfoIntance;

proxy.$modal.loading("正在加载Agent数据，请稍候！");

getCache().then(() => {
  allInfoIntance = echarts.init(allInfo.value, "macarons");
  proxy.$modal.closeLoading();
  var option = {
    tooltip: {
      show: true,
      formatter: "{b}的能力，执行任务数量<br />{c}",
    },
    legend: [
      {
        data: graph.categories.map(function (a) {
          return a.name;
        }),
      },
    ],
    series: [
      {
        name: "Les Miserables",
        type: "graph",
        layout: "none",
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        edgeSymbol: ["circle", "arrow"],
        label: {
          show: true,
          position: "right",
          formatter: "{b}",
        },
        labelLayout: {
          hideOverlap: true,
        },
        scaleLimit: {
          min: 0.5,
          max: 3,
        },
        lineStyle: {
          color: "source",
          curveness: 0.3,
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 10,
          },
        },
      },
    ],
  };
  allInfoIntance.setOption(option);
});

// getList();
const formatTooltip = (val) => {
  return val / 100;
};
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

const allClusterInfo = [
  {
    allRatio: "80%",
    allCost: "80%",
    allLoss: "80%",
  },
];

const clusterInfo = [
  {
    clusterId: "集群1",
    eachRatio: "80%",
    eachCost: "80%",
    eachLoss: "80%",
  },
  {
    clusterId: "集群2",
    eachRatio: "80%",
    eachCost: "80%",
    eachLoss: "80%",
  },
  {
    clusterId: "集群3",
    eachRatio: "80%",
    eachCost: "80%",
    eachLoss: "80%",
  },
  {
    clusterId: "集群4",
    eachRatio: "80%",
    eachCost: "80%",
    eachLoss: "80%",
  },
  {
    clusterId: "集群5",
    eachRatio: "80%",
    eachCost: "80%",
    eachLoss: "80%",
  },
  {
    clusterId: "集群6",
    eachRatio: "80%",
    eachCost: "80%",
    eachLoss: "80%",
  },
  {
    clusterId: "集群7",
    eachRatio: "80%",
    eachCost: "80%",
    eachLoss: "80%",
  },
  {
    clusterId: "集群8",
    eachRatio: "80%",
    eachCost: "80%",
    eachLoss: "80%",
  },
];
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
.slider-demo-block .slide-text + .el-slider {
  flex: 0 0 70%;
}
</style>
