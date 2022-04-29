<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <el-card class="card">
          <div class="card-block">
            <el-row>
              <el-col :span="24" class="topo">
                <!-- 这个写在card下才能有效果 -->
                <template #header><span>集群拓扑图</span></template>
                <div
                  class="el-table el-table--enable-row-hover el-table--medium"
                >
                  <div ref="allInfo" style="height: 400px; margin-bottom: 20px" />
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <div class="slider-demo-block">
                    <span class="slide-text">任务完成<br />成本</span>
                    <el-slider
                      class="el-slider"
                      v-model="value4"
                      :format-tooltip="formatTooltip"
                      :marks="marks"
                      @change="onChange"
                    />
                    <span class="slide-text">任务完成<br />比例</span>
                  </div>
                  <!-- <el-button type="primary">优化</el-button> -->
                </div>
              </el-col>
              <el-col :span="12">
                <template v-slot:header>
                  <div class="clearfix">
                    <span>全部集群总状态</span>
                  </div>
                </template>
                <el-table :data="tableData" border>
                  <el-table-column prop="date" label="任务完成率" width="180" />
                  <el-table-column prop="name" label="当前总成本" width="180" />
                  <el-table-column prop="address" label="Agent损失率" />
                </el-table>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-main>
      <el-footer>
        <!-- <el-row>
          <el-card class="update-log">
            <template v-slot:header>
            <div class="clearfix">
              <span>Agent集群属性</span>
            </div>
          </template>
          <div class="body">
            <el-table :data="propData" stripe border>
              <el-table-column prop="agentId" label="集群编号" width="210" />
              <el-table-column prop="agentProp" label="属性" width="210"/>
            </el-table>
          </div>
          </el-card>
        </el-row> -->
      </el-footer>
    </el-container>
  </div>
</template>

<script setup name="Single">

import { reactive, ref } from "vue";
import { getCache } from "@/api/monitor/cache";
import * as echarts from "echarts";
// import graph from "@/assets/data/all_cluster.json";


import _ from 'lodash'
// import type { CSSProperties } from 'vue'

function goTarget(url) {
  window.open(url, "__blank");
}

const allInfo = ref(null);
const { proxy } = getCurrentInstance();
const value4 = ref(50);

var year =[2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982]
    var data = [
    [431, 550, 878, 989, 351, 391, 508, 1189],
    [428, 521, 868, 950, 335, 377, 506, 1167],
    [422, 512, 867, 936, 316, 367, 502, 1163],
    [423, 502, 867, 936, 299, 354, 478, 1159],
    [411, 486, 850, 915, 300, 355, 461, 1112],
    [409, 478, 837, 889, 285, 370, 458, 1096],
    [405, 462, 828, 879, 271, 380, 443, 1053],
    [407, 452, 801, 872, 261, 376, 430, 1029],
    [400, 462, 790, 868, 253, 356, 430, 983],
    [384, 454, 790, 839, 254, 346, 420, 970],
    [372, 452, 770, 823, 259, 347, 394, 932],
    [359, 448, 770, 802, 240, 349, 394, 923],
    [357, 460, 751, 761, 230, 364, 365, 901],
    [343, 444, 735, 733, 226, 353, 363, 871],
    [331, 453, 722, 718, 225, 364, 339, 856],
    [312, 424, 717, 702, 226, 339, 325, 837],
    [307, 407, 713, 674, 220, 336, 314, 809],
    [300, 409, 686, 661, 211, 308, 312, 774],
    [298, 380, 664, 633, 192, 298, 309, 760],
    [282, 377, 657, 621, 181, 280, 289, 721],
    [279, 367, 646, 578, 178, 264, 285, 682],
    [280, 361, 645, 572, 172, 278, 278, 682],
    [276, 359, 641, 545, 171, 274, 278, 633],
    [261, 348, 629, 527, 168, 256, 263, 590],
    [258, 332, 601, 512, 156, 244, 243, 567],
    [238, 313, 601, 467, 151, 225, 237, 521],
    [227, 286, 594, 424, 137, 201, 237, 488],
    [226, 287, 571, 411, 127, 200, 210, 486],
    [230, 274, 548, 381, 120, 178, 201, 466],
    [218, 262, 541, 334, 103, 188, 187, 421],
    [205, 260, 525, 330, 93, 162, 187, 375],
    [190, 264, 502, 295, 86, 161, 186, 330],
    [173, 236, 473, 292, 76, 140, 159, 282],
    [162, 215, 453, 251, 68, 113, 140, 253],
    [159, 192, 444, 210, 71, 89, 134, 243],
    [140, 198, 434, 206, 64, 99, 123, 196],
    [120, 213, 420, 206, 52, 83, 108, 186],
    [119, 192, 413, 193, 47, 90, 82, 142],
    [120, 206, 392, 150, 45, 60, 80, 120]
]
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例',
        },
        tooltip: {formatter:'{c}%'},
        legend: {
            data: ['Agent']
        },
        yAxis: {
            data: ['agent1负载', 'agent2负载', 'agent3负载', 'agent4负载',
            'agent5负载', 'agent6负载', 'agent7负载', 'agent8负载'
            ],
            inverse: true,
            // max: 5,
        },
        xAxis: {
            axisLabel:{
              formatter:'{value}%'
            }
          },
        series: [{
            realtimeSort: true,
            name: 'Agent',
            showBackground: true,
            label: {
                show: true,
                position: 'right',
                valueAnimation: true,
                formatter: '{c}%',
            },
            stack: {},
            type: 'bar',
            data: [12, 20.6, 39.2, 15]
        }],
        animationDuration: 0,
        animationDurationUpdate: 500,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    };

    // 使用刚指定的配置项和数据显示图表。
    
// function run() {
//   for (var i = 0; i < data.length; ++i) {
//     if (Math.random() > 0.9) {
//       data[i] += Math.round(Math.random() * 2000);
//     } else {
//       data[i] += Math.round(Math.random() * 200);
//     }
//   }
//   allInfoIntance.setOption({
//     series: [
//       {
//         type: 'bar',
//         data: data,
//       }
//     ]
//   });
// }


getCache().then(() => {

  // proxy.$modal.closeLoading();
  
  // for(var i=0 ; i< links.length ;i++){
  //   allInfoIntance.setOption(options[i]);
  //   sleep(3000);
  // }
  const allInfoIntance = echarts.init(allInfo.value, "macarons");
 



  allInfoIntance.setOption(option);

    for (let i = 0; i < data.length; i++) {
        for(let j=0 ;j< data[data.length - i - 1].length ; j++)
        {
          data[data.length - i - 1][j] = data[data.length - i - 1][j]/10;
        }
        setTimeout(function() {
            var option1 = {
                title: {
                    text: year[data.length - i - 1].toString()+'时刻agent负载状况'
                },
                series: [{
                    data: data[data.length - i - 1]
                }]
            }
            console.log(option1)
            allInfoIntance.setOption(option1)
        }, 500 * i)
    }

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
.slider-demo-block .slide-text + .el-slider {
  flex: 0 0 70%;
}
</style>
