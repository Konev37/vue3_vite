<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card class="card">
          <template #header><span>集群信息及任务迁移动态示意图</span></template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="allInfo" style="height: 600px" />
          </div>
          <el-divider />
          <el-row>
            <el-col :span="12">
              <el-button
                type="primary"
                style="margin-left: 50px; margin-bottom: 10px"
                @click="showMigrate"
              >
                展示任务迁移过程
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
            <!-- <span class="slide-text">任务完成<br />成本</span> -->
            <el-tag class="tag-text" size="large" effect="plain"
              >任务完成<br />成本</el-tag
            >
            <el-slider
              class="el-slider"
              v-model="valueOptimize"
              :format-tooltip="formatTooltip"
              :marks="marks"
              @change="onChange"
            />
            <!-- <span class="slide-text">任务完成<br />比例</span> -->
            <el-tag class="tag-text" size="large" effect="plain"
              >任务完成<br />比例</el-tag
            >
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
            <el-table-column prop="allRatio" label="任务完成率" width="140" />
            <el-table-column label="总成本" width="260">
              <el-table-column
                prop="allMigrationCost"
                label="迁移成本"
                width="130"
              />
              <el-table-column
                prop="allTaskExecCost"
                label="任务执行成本（时间）"
                width="130"
              />
            </el-table-column>
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
      <el-table :data="eachClusterInfo" stripe border>
        <el-table-column prop="clusterId" label="集群编号" />
        <el-table-column prop="eachRatio" label="任务完成率" />
        <el-table-column label="总成本">
          <el-table-column prop="eachMigCost" label="集群内迁移成本" />
          <el-table-column prop="eachExecCost" label="任务执行成本（时间）" />
        </el-table-column>
        <el-table-column prop="eachLoss" label="Agent损失率" />
        <el-table-column label="详细信息" width="100">
          <template #default="scope">
            <el-button
              type="text"
              @click.prevent="
                getRow(scope.$index);
                innerDrawer = true;
              "
              >进入</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-drawer
        v-model="innerDrawer"
        title="集群详细信息"
        direction="rtl"
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

<script setup name="Cluster">
import { reactive, ref } from "vue";
import { getCluster } from "@/api/dashboard/cluster";
import {
  getAgent,
  getLossRatio,
  getClusterLossRatio,
  allTaskExecCost,
  eachTaskExecCost,
  eachExecCost,
} from "@/api/dashboard/agent";
import {
  getTask,
  allTaskRatio,
  eachAgentProgress,
  eachClusterRatio,
  eachClusterTaskInfo,
} from "@/api/dashboard/task";
import {
  getMigration,
  allMigrationCost,
  eachMigrationCost,
  postSliderVal,
} from "@/api/dashboard/migration";
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
const valueOptimize = ref(0);
// var newLinks = JSON.parse(JSON.stringify(graph.links));
var newLinks;

var allInfoIntance, singleInfoIntance;
var singleClusterIndex;

proxy.$modal.loading("正在加载Agent数据，请稍候！");

getAgent().then((agents) => {
  getMigration().then((migrations) => {
    getCluster().then((clusters) => {
      allInfoIntance = echarts.init(allInfo.value, "macarons");
      proxy.$modal.closeLoading();
      newLinks = JSON.parse(JSON.stringify(migrations));
      // console.log(agents);
      // console.log(migrations);
      // console.log(clusters);
      getTask().then((tasks) => {
        // console.log(tasks);
      });
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
                params.value[3] +
                "<br>执行任务总大小: " +
                params.value[2] +
                "<br>最大负载: " +
                params.value[1]
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
            // data: graph.categories.map(function (a) {
            data: clusters.map(function (a) {
              return a.name;
            }),
          },
        ],
        series: [
          {
            name: "Les Miserables",
            type: "graph",
            // layout: "force",
            data: agents,
            // links: migrations,
            categories: clusters,
            // data: graph.nodes,
            // links: graph.links,
            // categories: graph.categories,
            roam: true,
            edgeSymbol: ["circle", "arrow"],
            label: {
              show: true,
              position: "right",
              formatter: function (params) {
                return params.data.id + ", " + params.name;
              },
            },
            labelLayout: {
              hideOverlap: true,
            },
            scaleLimit: {
              min: 0.005,
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
            // force: {
            //   repulsion: 0.000000000001,
            // },
          },
        ],
      };
      allInfoIntance.setOption(option);
    });
  });
});
const showMigrate = () => {
  let v = 5; // 每一帧连线数的上限
  let t = 500; // 动画间隔
  allInfoIntance.setOption({
    // 清空连线
    series: [{ links: null }],
  });
  for (let i = 1; i < v; i++) {
    // 0 ~ v
    setTimeout(() => {
      allInfoIntance.setOption({
        series: [{ links: newLinks.slice(0, i) }],
      });
    }, i * t);
  }
  for (let i = 0; i <= newLinks.length - v; i++) {
    // v ~ (length-v)
    setTimeout(() => {
      allInfoIntance.setOption({
        series: [{ links: newLinks.slice(i, i + v) }],
      });
    }, i * t + v * t);
  }
  for (let i = newLinks.length - v + 1; i < newLinks.length; i++) {
    // (length-v) - length
    setTimeout(() => {
      allInfoIntance.setOption({
        series: [{ links: newLinks.slice(i, newLinks.length) }],
      });
    }, i * t + v * t);
  }
  setTimeout(() => {
    // 清空连线（但不知道为什么不起作用）
    allInfoIntance.setOption({ links: null });
  }, newLinks.length * t + v * t);
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
const formatTooltip = (val) => {
  return val / 100;
};
const onChange = (val) => {
  // // console.log(Math.floor(Math.random() * 10)); // 可均衡获取 0 到 9 的随机整数
  // newLinks = JSON.parse(JSON.stringify(migrations));
  postSliderVal(val).then((resmigration) => {
    // console.log(res + "，传值成功");
    allInfoIntance.setOption({ series: [{ links: resmigration }] });
    newLinks = JSON.parse(JSON.stringify(resmigration));
    const showMigrate = () => {
  let v = 1; // 每一帧连线数的上限
  let t = 500; // 动画间隔
  allInfoIntance.setOption({
    // 清空连线
    series: [{ links: null }],
  });
  for (let i = 1; i < v; i++) {
    // 0 ~ v
    setTimeout(() => {
      allInfoIntance.setOption({
        series: [{ links: newLinks.slice(0, i) }],
      });
    }, i * t);
  }
  for (let i = 0; i <= newLinks.length - v; i++) {
    // v ~ (length-v)
    setTimeout(() => {
      allInfoIntance.setOption({
        series: [{ links: newLinks.slice(i, i + v) }],
      });
    }, i * t + v * t);
  }
  for (let i = newLinks.length - v + 1; i < newLinks.length; i++) {
    // (length-v) - length
    setTimeout(() => {
      allInfoIntance.setOption({
        series: [{ links: newLinks.slice(i, newLinks.length) }],
      });
    }, i * t + v * t);
  }
  setTimeout(() => {
    // 清空连线（但不知道为什么不起作用）
    allInfoIntance.setOption({ links: null });
  }, newLinks.length * t + v * t);
};
  });
  // getMigration().then((migrations) => {
  //   changeMigrate(val, migrations);
  // });
  //changeAllClusterInfo(val);
  // changeMigrateRecord();
  // changeEachClusterInfo(val);
};

function changeMigrate(val, migrations) {
  newLinks = JSON.parse(JSON.stringify(migrations));
  // console.log(migrations);
  var Len = Math.floor((1.0 / 250) * Math.pow(val - 50, 2) + 1); // 新的任务迁移数
  console.log(Len);
  newLinks = newLinks.slice(0, Len);
  // console.log(newLinks);
  // for (let i = 0; i < newLinks.length; i++) {
  //   let source = parseInt(newLinks[i].source);
  //   let target = parseInt(newLinks[i].target);
  //   source += val;
  //   target += val;
  //   newLinks[i].source = source % 77;
  //   newLinks[i].target = target % 77;
  // }
  allInfoIntance.setOption({ series: [{ links: newLinks }] });
}

function changeAllClusterInfo(val) {
  let ACInfo = allClusterInfo.value[0];
  let allRatio = parseInt(ACInfo.allRatio.slice(0, ACInfo.allRatio.length - 1)); // 去除百分号，并转为整型
  // let allCost = parseInt(ACInfo.allCost.slice(0, ACInfo.allCost.length - 1));
  let allCost = parseInt(ACInfo.allCost); // 成本没有百分号
  let allLoss = parseInt(ACInfo.allLoss.slice(0, ACInfo.allLoss.length - 1));
  allRatio = (10 + val * 0.6).toFixed(3);
  allCost = (20 + val * 0.6).toFixed(3);
  allLoss = (30 + val * 0.6).toFixed(3);
  ACInfo.allRatio = allRatio + "%";
  ACInfo.allCost = allCost + "";
  ACInfo.allLoss = allLoss + "%";
}
function changeMigrateRecord() {
  migrateRecord.value.splice(0, migrateRecord.value.length); // 删除数组中所有元素
  for (let i = 0; i < newLinks.length; i++) {
    // newLinks[i].value.splice(0, newLinks[i].value.length);
    newLinks[i].value = []; // 因为有些value是没定义的，所以这里清空的同时顺便定义
    var len = Math.floor(Math.random() * 6);
    while (newLinks[i].value.length < len) {
      var dat = Math.floor(Math.random() * 200) + 1;
      if (newLinks[i].value.indexOf(dat) == -1) {
        newLinks[i].value.push(dat);
      }
    }
    var record = {
      order: i + 1,
      source: newLinks[i].source,
      target: newLinks[i].target,
      task: newLinks[i].value,
    };
    migrateRecord.value.push(record);
  }
}
function changeEachClusterInfo(val) {
  var ECInfo = eachClusterInfo.value;
  var eachRatio, eachCost, eachLoss;
  for (let i = 0; i < ECInfo.length; i++) {
    eachRatio = parseInt(
      ECInfo[i].eachRatio.slice(0, ECInfo[i].eachRatio.length - 1)
    ); // 去除百分号，并转为整型
    eachCost = parseInt(
      // ECInfo[i].eachCost.slice(0, ECInfo[i].eachCost.length - 1)
      ECInfo[i].eachCost
    );
    eachLoss = parseInt(
      ECInfo[i].eachLoss.slice(0, ECInfo[i].eachLoss.length - 1)
    );
    eachRatio = (10 + val * 0.6 - 10 + Math.random() * 19 + 1).toFixed(3); // 保留 2 位小数
    eachCost = (20 + val * 0.6 - 10 + Math.random() * 19 + 1).toFixed(3);
    eachLoss = (30 + val * 0.6 - 10 + Math.random() * 19 + 1).toFixed(3);
    ECInfo[i].eachRatio = eachRatio + "%";
    ECInfo[i].eachCost = eachCost + "";
    ECInfo[i].eachLoss = eachLoss + "%";
  }
  // console.log(ECInfo);
}
var innerDrawerData = [
  [
    "任务1",
    "任务2",
    "任务3",
    "任务4",
    "任务5",
    "任务6",
    "任务7",
    "任务8",
    "任务9",
    "任务10",
    "任务11",
    "任务12",
  ],
  [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 100.0, 100.0, 32.6, 20.0, 6.4, 3.3],
  [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
];
const getRow = (index) => {
  singleClusterIndex = index;
};
const handleInnerOpen = (SCIndex) => {
  SCIndex = SCIndex || singleClusterIndex;
  const colors = ["#5470C6", "#91CC75", "#EE6666"];
  eachClusterTaskInfo().then((clstTskInfo) => {
    eachExecCost().then((execCost) => {
      singleInfoIntance = echarts.init(singleInfo.value, "macarons");

      // 把字符串类型的最大值为 1 的任务完成进度
      // 转换成浮点数类型，且最大值为100
      for (var i = 1; i <= Object.keys(clstTskInfo).length; i++) {
        for (var j = 0; j < clstTskInfo[i][1].length; j++) {
          clstTskInfo[i][1][j] = +clstTskInfo[i][1][j] * 100;
        }
      }

      var singleOption = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          // right: '20%'
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["任务进度", "成本"],
        },
        xAxis: [
          {
            type: "value",
            name: "任务进度",
            position: "top",
            alignTicks: true, // 是否开启自动对齐刻度
            min: 0,
            max: 100,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0],
              },
            },
            axisLabel: {
              formatter: "{value}%",
            },
          },
          {
            type: "value",
            name: "成本",
            position: "bottom",
            alignTicks: true,
            // offset: 80,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: "{value}c",
            },
          },
        ],
        yAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            // prettier-ignore
            // data: innerDrawerData[0].slice(SCIndex, SCIndex+4),
            data: clstTskInfo[SCIndex + 1][0],
          },
        ],
        series: [
          {
            name: "任务进度",
            type: "bar",
            // data: innerDrawerData[1].slice(SCIndex, SCIndex + 4),
            data: clstTskInfo[SCIndex + 1][1],
          },
          {
            name: "成本",
            type: "bar",
            xAxisIndex: 1,
            // data: innerDrawerData[2].slice(SCIndex, SCIndex + 4),
            data: execCost,
          },
        ],
      };
      singleInfoIntance.setOption(singleOption);
    });
  });
};

const allClusterInfo = ref([
  {
    // allRatio: "10%",
    // allCost: 20,
    // allLoss: "30%",
  },
]);
allTaskRatio().then((ratio) => {
  allMigrationCost().then((migCost) => {
    allTaskExecCost().then((execCost) => {
      getLossRatio().then((lossratio) => {
        let ACInfo = allClusterInfo.value[0];
        ratio = (100 * ratio).toFixed(3);
        ACInfo.allRatio = ratio + "%";
        ACInfo.allMigrationCost = migCost;
        ACInfo.allTaskExecCost = execCost.toFixed(3);
        ACInfo.allLoss = lossratio * 100 + "%";
      });
    });
  });
});

const migrateRecord = ref([]);
getMigration().then((migrations) => {
  // console.log(migrations.length);
  // console.log(migrations[1].source);

  for (let i = 0; i < migrations.length; i++) {
    var record = {
      order: i + 1,
      source: migrations[i].source,
      target: migrations[i].target,
      task: migrations[i].taskId,
    };
    migrateRecord.value.push(record);
  }
  // console.log(migrateRecord.value);
});
const eachClusterInfo = ref([
  // {
  //   clusterId: "集群1",
  //   // eachRatio: "10%",
  //   // eachCost: "20",
  //   // eachLoss: "30%",
  // },
  // {
  //   clusterId: "集群2",
  //   eachRatio: "10%",
  //   eachCost: "20",
  //   eachLoss: "30%",
  // },
  // {
  //   clusterId: "集群3",
  //   eachRatio: "10%",
  //   eachCost: "20",
  //   eachLoss: "30%",
  // },
  // {
  //   clusterId: "集群4",
  //   eachRatio: "10%",
  //   eachCost: "20",
  //   eachLoss: "30%",
  // },
  // {
  //   clusterId: "集群5",
  //   eachRatio: "10%",
  //   eachCost: "20",
  //   eachLoss: "30%",
  // },
  // {
  //   clusterId: "集群6",
  //   eachRatio: "10%",
  //   eachCost: "20",
  //   eachLoss: "30%",
  // },
  // {
  //   clusterId: "集群7",
  //   eachRatio: "10%",
  //   eachCost: "20",
  //   eachLoss: "30%",
  // },
  // {
  //   clusterId: "集群8",
  //   eachRatio: "10%",
  //   eachCost: "20",
  //   eachLoss: "30%",
  // },
  // {
  //   clusterId: "集群9",
  //   eachRatio: "10%",
  //   eachCost: "20",
  //   eachLoss: "30%",
  // },
]);
getCluster().then((clusters) => {
  eachClusterRatio().then((eachRatio) => {
    eachMigrationCost().then((eachMigCost) => {
      eachTaskExecCost().then((eachExecCost) => {
        getClusterLossRatio().then((eachLossRatio) => {
          for (let i = 0; i < clusters.length; i++) {
            if (eachMigCost[i + 1] == null) {
              eachMigCost[i + 1] = 0;
            }
            var cluster = {
              clusterId: clusters[i].name,
              eachRatio: (eachRatio[i] * 100).toFixed(3) + "%",
              eachMigCost: eachMigCost[i + 1],
              eachExecCost: eachExecCost[i].toFixed(3),
              eachLoss: eachLossRatio[i + 1] * 100 + "%",
            };
            eachClusterInfo.value.push(cluster);
          }
        });
      });
    });
  });
});
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
  margin-left: 13px;
  margin-right: 13px;
}
.tag-text {
  font-size: 13px;
  text-align: center;
  // color: var(--el-text-color-secondary);
  line-height: 17px;
  // flex: 1;
  // overflow: visible;
  // text-overflow: ellipsis;
  // white-space: normal; //文本换行属性
  // margin-bottom: 0;
}
.slider-demo-block {
  font-size: 14px;
  text-align: center;
  color: var(--el-text-color-secondary);
  line-height: 33px;
  flex: 1;
  overflow: visible;
  text-overflow: ellipsis;
  white-space: normal; //文本换行属性
  margin-bottom: 10px;
}
.slider-demo-block .slide-text + .el-slider {
  flex: 0 0 70%;
}
</style>
