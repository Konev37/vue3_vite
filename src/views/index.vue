<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-row>
          <el-card class="card">
            <template #header><span>Agent负载</span></template>
                <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="agentInfo" style="height: 300px" />
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="card"> 
            <template #header><span>任务完成率</span></template>
                <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="taskInfo" style="height: 300px" />
            </div>
            
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="12">
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
                style="margin-left: 50px; margin-bottom: 2px"
                @click="showMigrate"
              >
                展示任务迁移过程
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                type="primary"
                style="margin-left: 50px; margin-bottom: 2px"
                @click="drawerTask = true"
              >
                任务迁移记录
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-card class="card">
            <template #header>
              <div>
                <span>迁出任务总大小TOP5</span>
              </div>
            </template>
            <el-table
              :data="EMigrationTop"
              border
              style="width: 100%; height: 300px"
              v-fit-columns
            >
              <el-table-column prop="agentId" label="agent编号" />
              <el-table-column prop="allTaskSize" label="任务总大小" />
            </el-table>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="card">
            <template #header>
              <div>
                <span>迁入任务总大小TOP5</span>
              </div>
            </template>
            <el-table
              :data="imMigrationTop"
              border
              style="width: 100%; height: 300px"
              v-fit-columns
            >
              <el-table-column prop="agentId" label="agent编号" />
              <el-table-column prop="allTaskSize" label="任务总大小" />
            </el-table>
          </el-card>
        </el-row>
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
          <el-table
            :data="allClusterInfo"
            border
            style="width: 100%"
            v-fit-columns
          >
            <el-table-column prop="allRatio" label="任务完成率" />
            <el-table-column label="总成本">
              <el-table-column prop="allMigrationCost" label="迁移成本" />
              <el-table-column
                prop="allTaskExecCost"
                label="任务执行成本（时间）"
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

<script setup name="index">
import { reactive, ref } from "vue";
import { getCluster, clusterSurvivability } from "@/api/dashboard/cluster";
import {
  getAgent,
  getLossRatio,
  getClusterLossRatio,
  allTaskExecCost,
  eachTaskExecCost,
  eachExecCost,
  eachAgentSurvivability,
  allAgentSurvivability,
  agentTaskExecutionTime,
  getAgentName,
  agentLoadRate,
  agentLoadRates,
} from "@/api/dashboard/agent";
import {
  getTask,
  getTimeTask,
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
  getMinCost,
  TasksCanBeMigrated,
  migrateTask,
  getAllMinCost,
  getEmigrationTop,
  getImmigrationTop,
} from "@/api/dashboard/migration";
import * as echarts from "echarts";
import graph from "@/assets/data/all_cluster.json";
import { getCache } from "@/api/monitor/cache";
import _rawData from "@/assets/data/life-expectancy-table.json";

import _ from "lodash";

function goTarget(url) {
  window.open(url, "__blank");
}
const drawerTask = ref(false);
const drawerCluster = ref(false);
const innerDrawer = ref(false);
const taskInfo = ref(null);
const agentInfo = ref(null);
const allInfo = ref(null);
const singleInfo = ref(null);
const { proxy } = getCurrentInstance();
const valueOptimize = ref(0);
// var newLinks = JSON.parse(JSON.stringify(graph.links));
var newLinks;

var allInfoIntance, singleInfoIntance, taskInfoIntance, agentInfoIntance;
var singleClusterIndex;


//动态任务完成率（之后要改）
const countries = [
  "任务2",
  "任务3",
  "任务4",
  "任务5",
  "任务1",
  "任务6",
  "任务7",
  "任务8",
];
const datasetWithFilters = [];
const seriesList = [];
echarts.util.each(countries, function (country) {
  var datasetId = "dataset_" + country;
  datasetWithFilters.push({
    id: datasetId,
    fromDatasetId: "dataset_raw",
    transform: {
      type: "filter",
      config: {
        and: [
          { dimension: "Year", gte: 1950 },
          { dimension: "Country", "=": country },
        ],
      },
    },
  });
  seriesList.push({
    type: "line",
    datasetId: datasetId,
    showSymbol: false,
    name: country,
    endLabel: {
      show: true,
      formatter: function (params) {
        return params.value[3] + ": " + params.value[0] / 1000 + "%";
      },
    },
    labelLayout: {
      moveOverlap: "shiftY",
    },
    emphasis: {
      focus: "series",
    },
    encode: {
      x: "Year",
      y: "Income",
      label: ["Country", "Income"],
      itemName: "Year",
      tooltip: ["Income"],
    },
  });
});

var option2 = {
  animationDuration: 10000,
  dataset: [
    {
      id: "dataset_raw",
      source: _rawData,
    },
    ...datasetWithFilters,
  ],
  title: {
    text: "任务完成率动态展示",
  },
  tooltip: {
    order: "valueDesc",
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    nameLocation: "middle",
  },
  yAxis: {
    name: "Income",
  },
  grid: {
    right: 80,
  },
  series: seriesList,
};

var chushi
//动态agent负载（之后要改）

      
 
var year = [
  2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008,
  2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995,
  1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982,
];
var data = [
  [43.1, 55.0, 87.8, 98.9, 35.1, 39.1, 50.8, 11.8],
  [42.8, 52.1, 86.8, 95.0, 33.5, 37.7, 50.6, 11.6],
  [42.2, 512, 867, 936, 316, 367, 502, 116],
  [42.3, 502, 867, 936, 299, 354, 478, 115],
  [41.1, 486, 850, 915, 300, 355, 461, 111],
  [40.9, 478, 837, 889, 285, 370, 458, 109],
  [40.5, 462, 828, 879, 271, 380, 443, 105],
  [40.7, 452, 801, 872, 261, 376, 430, 102],
  [40.0, 462, 790, 868, 253, 356, 430, 983],
  [38.4, 454, 790, 839, 254, 346, 420, 970],
  [37.2, 452, 770, 823, 259, 347, 394, 932],
  [35.9, 448, 770, 802, 240, 349, 394, 923],
  [35.7, 460, 751, 761, 230, 364, 365, 901],
  [34.3, 444, 735, 733, 226, 353, 363, 871],
  [33.1, 453, 722, 718, 225, 364, 339, 856],
  [31.2, 424, 717, 702, 226, 339, 325, 837],
  [30.7, 407, 713, 674, 220, 336, 314, 809],
  [30.0, 409, 686, 661, 211, 308, 312, 774],
  [29.8, 380, 664, 633, 192, 298, 309, 760],
  [28.2, 377, 657, 621, 181, 280, 289, 721],
  [27.9, 367, 646, 578, 178, 264, 285, 682],
  [28.0, 361, 645, 572, 172, 278, 278, 682],
  [27.6, 359, 641, 545, 171, 274, 278, 633],
  [26.1, 348, 629, 527, 168, 256, 263, 590],
  [25.8, 332, 601, 512, 156, 244, 243, 567],
  [23.8, 313, 601, 467, 151, 225, 237, 521],
  [22.7, 286, 594, 424, 137, 201, 237, 488],
  [22.6, 287, 571, 411, 127, 200, 210, 486],
  [23.0, 274, 548, 381, 120, 178, 201, 466],
  [21.8, 262, 541, 334, 103, 188, 187, 421],
  [20.5, 260, 525, 330, 93, 162, 187, 375],
  [19.0, 264, 502, 295, 86, 161, 186, 330],
  [17.3, 236, 473, 292, 76, 140, 159, 282],
  [16.2, 215, 453, 251, 68, 113, 140, 253],
  [15.9, 192, 444, 210, 71, 89, 134, 243],
  [14.0, 198, 434, 206, 64, 99, 123, 196],
  [12.0, 213, 420, 206, 52, 83, 108, 186],
  [11.9, 192, 413, 193, 47, 90, 82, 142],
  [12.0, 206, 392, 150, 45, 60, 80, 120],
];

var option3 = {
  title: {
    text: "agent负载",
  },
  tooltip: { formatter: "{c}%" },
  legend: {
    data: ["Agent"],
  },
  yAxis: {
    data: [
      "agent1负载",
      "agent2负载",
      "agent3负载",
      "agent4负载",
      "agent5负载",
      "agent6负载",
      "agent7负载",
      "agent8负载",
    ],
    inverse: true,
    // max: 5,
  },
  xAxis: {
    axisLabel: {
      formatter: "{value}%",
    },
  },
  series: [
    {
      realtimeSort: true,
      name: "Agent",
      showBackground: true,
      label: {
        show: true,
        position: "right",
        valueAnimation: true,
        formatter: "{c}%",
      },
      stack: {},
      type: "bar",
      data: chushi,
    },
  ],
  animationDuration: 0,
  animationDurationUpdate: 500,
  animationEasing: "linear",
  animationEasingUpdate: "linear",
};



proxy.$modal.loading("正在加载Agent数据，请稍候！");

getAgent().then((agents) => {
  // console.log(agents);
  getMigration().then((migrations) => {
    getCluster().then((clusters) => {
      allInfoIntance = echarts.init(allInfo.value, "macarons");
      getAgentName().then((agentname) => {
      agentLoadRate().then((agentLoadRate) => {
      //首页直接显示agent负载和任务完成率
      // getCache().then(() => {
        const agentInfoIntance = echarts.init(agentInfo.value, "macarons");
        
        
        // console.log("clusterSur");
        
      
  

        const taskInfoIntance = echarts.init(taskInfo.value, "macarons");
        taskInfoIntance.setOption(option2);

      //   const agentInfoIntance = echarts.init(agentInfo.value, "macarons");

      //   agentInfoIntance.setOption(option3);

      //   for (let i = 0; i < data.length; i++) {
      //     for (let j = 0; j < data[data.length - i - 1].length; j++) {
      //     data[data.length - i - 1][j] = data[data.length - i - 1][j] / 10;
      //     }
      //     setTimeout(function () {
      //     var smalloption = {
      //       title: {
      //         text: year[data.length - i - 1].toString() + "时刻agent负载状况",
      //       },
      //       series: [
      //         {
      //           data: data[data.length - i - 1],
      //         },
      //       ],
      //     };
      //     console.log(smalloption);
      //     agentInfoIntance.setOption(smalloption);
      //     }, 500 * i);
      //   }
  
      // });
      const formatTooltip = (val) => {
        return val / 100;
      };
      proxy.$modal.closeLoading();
      newLinks = JSON.parse(JSON.stringify(migrations));
      // console.log(agents);
      // console.log(migrations);
      // console.log(clusters);
      clusterSurvivability().then((res) => {
        // console.log("clusterSur");
        // console.log(res);
      });
      // eachAgentSurvivability().then((res) => {
      //   console.log("eachAgentSur");
      //   console.log(res);
      // })
      getTask().then((tasks) => {
        // console.log(tasks);
      });
      // TasksCanBeMigrated().then((res) => {
      //   console.log(res);
      // });
      getTimeTask(2).then((res) => {
        // console.log("timeTask");
        // console.log(res);
      });
      // allAgentSurvivability().then((res) => {
      //   console.log("allAgentSur");
      //   console.log(res);
      // });
      // agentTaskExecutionTime().then((res) => {
      //   console.log("executionTime");
      //   console.log(res);
      // });
      // for (let i = 0; i < agents.length; i++) {
      //   // 第一次加载的时候大小都是 10
      //   agents[i].symbolSize = 10;
      // }
      var option1 = {
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
      allInfoIntance.setOption(option1);
      

      var option3 = {
        title: {
        text: "agent负载",
        },
        tooltip: { formatter: "{c}%" },
        legend: {
        data: ["Agent"],
        },
        yAxis: {
        data: agentname,
        inverse: true,
        max: 8,
        },
        xAxis: {
          axisLabel: {
          formatter: "{value}%",
          },
        },
        series: [
        {
          realtimeSort: true,
          name: "Agent",
          showBackground: true,
          label: {
            show: true,
            position: "right",
            valueAnimation: true,
            formatter: "{c}%",
          },
          stack: {},
          type: "bar",
          data: agentLoadRate,
        },
        ],
        animationDuration: 0,
        animationDurationUpdate: 500,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };
      agentInfoIntance.setOption(option3);
    });
    });
    });
  });
});
const showMigrate = () => {
  let v = 3; // 每一帧连线数的上限
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
var test;

const AgentLoadRate = ref([]);
function getAgentLoad(agents) {
  loadRate = JSON.parse(JSON.stringify(agents));
  AgentLoadRate.value.length = 0;
  for (let i = 0; i < agents.length; i++) {
    var loadrate = loadRate[i].value[2];
    // /loadRate[i].value[1]
    AgentLoadRat.value.push(loadrate);
  }
}

// 修改滑块值带来的变化
const onChange = (val) => {
  // // console.log(Math.floor(Math.random() * 10)); // 可均衡获取 0 到 9 的随机整数
  // newLinks = JSON.parse(JSON.stringify(migrations));
  // postSliderVal(val).then((resMigration) => {
    // console.log('1:', val)
  migrateTask(++val).then((resMigration) => {
    // console.log('2:', val)
    getAgent().then((agents) => {
      getCluster().then((clusters) => {
        getTask().then((tasks) => {
          
          allInfoIntance.setOption({
            series: [
              { data: agents, links: resMigration, categories: clusters },
            ],
          });
          
          changeMigrateRecord(resMigration);
          getEMigrationTopInfo();
          getImMigrationTopInfo();
          getAllClusterInfo();
          agentLoadRates().then((loadrates) => {
              console.log(loadrates)
          });
          // getMinCost().then((mincost) => {
          //   // console.log(mincost);
          // });
          // getAllMinCost().then((mincost) => {
          //   // console.log(mincost);
          // });
          // getAgentLoad(agents);
          // console.log(AgentLoadRat);

//动态agent负载和任务完成率（之后改）
          getCache().then(() => {
  
            
  const taskInfoIntance = echarts.init(taskInfo.value, "macarons");

  taskInfoIntance.setOption(option2);

  const agentInfoIntance = echarts.init(agentInfo.value, "macarons");

  agentInfoIntance.setOption(option3);
  
  for (let i = 0; i < data.length; i++) {
    // for (let j = 0; j < data[data.length - i - 1].length; j++) {
    // data[data.length - i - 1][j] = data[data.length - i - 1][j] ;
    // }
    setTimeout(function () {
    var smalloption = {
      title: {
        text: "第"+year[data.length - i - 1].toString() + "次迁移agent负载",
      },
      series: [
        {
          data: data[data.length - i - 1],
        },
      ],
    };
    // console.log(smalloption);
    agentInfoIntance.setOption(smalloption);
    }, 500 * i);
  }

});
//

        });


      });
    });
  });
  // getMigration().then((migrations) => {
  //   changeMigrate(val, migrations);
  // });
  //changeAllClusterInfo(val);
  // changeEachClusterInfo(val);
};

function changeMigrate(val, migrations) {
  newLinks = JSON.parse(JSON.stringify(migrations));
  // console.log(migrations);
  var Len = Math.floor((1.0 / 250) * Math.pow(val - 50, 2) + 1); // 新的任务迁移数
  // console.log(Len);
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

const migrateRecord = ref([]);
function changeMigrateRecord(resMigration) {
  newLinks = JSON.parse(JSON.stringify(resMigration));
  migrateRecord.value.length = 0;
  for (let i = 0; i < newLinks.length; i++) {
    var record = {
      order: i + 1,
      source: newLinks[i].source,
      target: newLinks[i].target,
      task: newLinks[i].taskId,
    };
    migrateRecord.value.push(record);
  }
  // migrateRecord.value.splice(0, migrateRecord.value.length); // 删除数组中所有元素
  // for (let i = 0; i < newLinks.length; i++) {
  //   // newLinks[i].value.splice(0, newLinks[i].value.length);
  //   newLinks[i].value = []; // 因为有些value是没定义的，所以这里清空的同时顺便定义
  //   var len = Math.floor(Math.random() * 6);
  //   while (newLinks[i].value.length < len) {
  //     var dat = Math.floor(Math.random() * 200) + 1;
  //     if (newLinks[i].value.indexOf(dat) == -1) {
  //       newLinks[i].value.push(dat);
  //     }
  //   }
  //   var record = {
  //     order: i + 1,
  //     source: newLinks[i].source,
  //     target: newLinks[i].target,
  //     task: newLinks[i].value,
  //   };
  //   migrateRecord.value.push(record);
  // }
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

// 迁出top5
const EMigrationTop = ref([]);
function getEMigrationTopInfo() {
  getEmigrationTop().then((res) => {
    EMigrationTop.value.length = 0;
    for (let i = 0; i < 5; i++) {
      var em = {
        agentId: res[i].sourceAgentId,
        allTaskSize: res[i].allTaskSize,
      };
      EMigrationTop.value.push(em);
    }
  });
}

// 迁入top5
const imMigrationTop = ref([]);
function getImMigrationTopInfo() {
  getImmigrationTop().then((res) => {
    imMigrationTop.value.length = 0;
    for (let i = 0; i < 5; i++) {
      var im = {
        agentId: res[i].targetAgentId,
        allTaskSize: res[i].allTaskSize,
      };
      imMigrationTop.value.push(im);
    }
  });
}

const allClusterInfo = ref([
  {
    // allRatio: "10%",
    // allCost: 20,
    // allLoss: "30%",
  },
]);
function getAllClusterInfo() {
  allTaskRatio().then((ratio) => {
    allMigrationCost().then((migCost) => {
      allTaskExecCost().then((execCost) => {
        getLossRatio().then((lossratio) => {
          let ACInfo = allClusterInfo.value[0];
          ratio = (ratio * 100).toFixed(3);
          ACInfo.allRatio = ratio + "%";
          ACInfo.allMigrationCost = migCost;
          ACInfo.allTaskExecCost = execCost.toFixed(3);
          lossratio = (lossratio * 100).toFixed(3);
          ACInfo.allLoss = lossratio + "%";
        });
      });
    });
  });
}
getAllClusterInfo();

// console.log(migrations.length);
// console.log(migrations[1].source);
// console.log(newLinks)
// for (let i = 0; i < newLinks.length; i++) {
//   var record = {
//     order: i + 1,
//     source: newLinks[i].source,
//     target: newLinks[i].target,
//     task: newLinks[i].taskId,
//   };
//   migrateRecord.value.push(record);
// }
// console.log(migrateRecord.value);

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
  margin-bottom: 5px;
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
