<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="card">
          <template #header><span>集群信息及任务迁移动态示意图</span></template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="allInfo" style="height: 570px" />
          </div>
          <el-divider />
          <el-row>
            <el-col :span="12">
              <el-button
                type="primary"
                style="margin-left: 50px; margin-bottom: 10px"
                @click="showMigrate"
              >
                展示所有迁移路径
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                type="primary"
                style="margin-left: 50px; margin-bottom: 10px"
                @click="drawerTask = true"
              >
                任务迁移记录
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-optimize-header">
              <span>优化目标倾向</span>
            </div>
          </template>
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
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-cluster-header">
              <span>全部集群总状态</span>
              <el-button
                type="text"
                style="margin-left: 32px"
                @click="drawerCluster = true"
                >各集群详细信息</el-button
              >
            </div>
          </template>
          <el-table :data="allClusterInfo" border style="width: 100%">
            <el-table-column prop="allRatio" label="任务完成率" width="180" />
            <el-table-column prop="allCost" label="当前总成本" width="180" />
            <el-table-column prop="allLoss" label="Agent损失率" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-drawer
      v-model="drawerTask"
      title="任务迁移记录"
      direction="rtl"
      size="40%"
    >
      <el-table :data="migrateRecord" stripe border>
        <el-table-column prop="order" label="迁移顺序" />
        <el-table-column label="迁移方向">
          <el-table-column prop="source" label="起始Agent编号" />
          <el-table-column prop="target" label="目标Agent编号" />
        </el-table-column>
        <el-table-column prop="task" label="迁移任务编号" />
      </el-table>
    </el-drawer>
    <el-drawer
      v-model="drawerCluster"
      title="各集群详细信息"
      direction="rtl"
      size="40%"
    >
      <el-table :data="clusterInfo" stripe border>
        <el-table-column prop="clusterId" label="集群编号" />
        <el-table-column prop="eachRatio" label="任务完成率" />
        <el-table-column prop="eachCost" label="当前总成本" />
        <el-table-column prop="eachLoss" label="Agent损失率" />
        <el-table-column label="详细信息" width="120">
          <template #default>
            <el-button type="text" @click="innerDrawer = true">进入</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer
        v-model="innerDrawer"
        title="集群详细信息"
        size="50%"
        :append-to-body="true"
        @open="handleInnerOpen"
      >
        <!-- <p>_(:зゝ∠)_</p> -->
        <div ref="singleInfo" style="height: 600px" />
      </el-drawer>
    </el-drawer>
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
const drawerTask = ref(false);
const drawerCluster = ref(false);
const innerDrawer = ref(false);

const allInfo = ref(null);
const singleInfo = ref(null);
const { proxy } = getCurrentInstance();
const value4 = ref(50);

var allInfoIntance, singleInfoIntance;

proxy.$modal.loading("正在加载Agent数据，请稍候！");

getCache().then(() => {
  allInfoIntance = echarts.init(allInfo.value, "macarons");
  proxy.$modal.closeLoading();
  var option = {
    tooltip: {
      show: true,
      trigger: "item",
      formatter: (params) => {
        if (params.name.indexOf(">") == -1) {
          return (
            params.name +
            "<br>能力: " +
            params.value[0] +
            "<br>执行任务数量: " +
            params.value[1] +
            "<br>执行任务总大小: " +
            params.value[2]
          );
        } else {
          return (
            "迁移方向：" +
            params.name +
            // "<br>这是第 " +
            // params.name +
            // " 个执行的迁移" +
            "<br>所迁移的任务编号：" +
            params.value
          );
        }
      },
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
        // links: graph.links,
        categories: graph.categories,
        roam: true,
        edgeSymbol: ["circle", "arrow"],
        label: {
          show: true,
          position: "right",
          formatter: function (params) {
            return params.dataIndex + ", " + params.name;
          },
        },
        labelLayout: {
          hideOverlap: true,
        },
        scaleLimit: {
          min: 0.5,
          max: 4,
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

  let v = 20; // 每一帧连线数的上限
  let t = 500; // 动画间隔
  for (let i = 1; i < v; i++) {
    setTimeout(() => {
      allInfoIntance.setOption({
        series: [{ links: graph.links.slice(0, i) }],
      });
    }, i * t);
  }
  for (let i = 0; i <= graph.links.length - v; i++) {
    setTimeout(() => {
      allInfoIntance.setOption({
        series: [{ links: graph.links.slice(i, i + v) }],
      });
    }, i * t + v * t);
  }
  for (let i = graph.links.length - v + 1; i < graph.links.length; i++) {
    setTimeout(() => {
      allInfoIntance.setOption({
        series: [{ links: graph.links.slice(i, graph.links.length) }],
      });
    }, i * t + v * t);
  }
  setTimeout(() => {
    // 这里还没能实现功能
    allInfoIntance.setOption(option);
  }, graph.links.length * t + v * t + t);
});
const showMigrate = () => {
  allInfoIntance.setOption({
    series: [{ links: graph.links }],
  });
};
const handleInnerOpen = () => {
  getCache().then(() => {
    singleInfoIntance = echarts.init(singleInfo.value, "macarons");
    var singleOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: "category",
        data: ["任务1", "任务2", "任务3", "任务4", "任务5", "任务6"],
      },
      series: [
        {
          name: "任务进度",
          type: "bar",
          data: [18203, 23489, 29034, 104970, 131744, 630230],
        },
        {
          name: "成本",
          type: "bar",
          data: [19325, 23438, 31000, 121594, 134141, 681807],
        },
      ],
    };
    singleInfoIntance.setOption(singleOption);
  });
};
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
const migrateRecord = [];
for (var i = 0; i < graph.links.length; i++) {
  var record = {
    order: i + 1,
    source: graph.links[i].source,
    target: graph.links[i].target,
    task: graph.links[i].value,
  };
  migrateRecord.push(record);
}
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
  {
    clusterId: "集群9",
    eachRatio: "80%",
    eachCost: "80%",
    eachLoss: "80%",
  },
];
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 0px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 22px;
}
.card {
  margin: 0px;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  vertical-align: top;
}
.card:last-child {
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
  text-align: center;
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
