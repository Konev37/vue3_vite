<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-row>
          <el-card class="card">
            <template #header><span>Agent资源调配任务库及任务进度</span></template>
            <div class="el-table el-table--enable-row-hover el-table--medium">
              <div ref="taskInfo" style="width:700px; height: 350px" />
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="card">
            <template #header><span>任务调配目标设置</span></template>
            <el-form :model="form" label-width="260px">
              <el-form-item label="任务调配模式">
                <el-select v-model="form.region" placeholder="请选择模式">
                  <el-option label="主被动切换模式" value="1" />
                  <el-option label="人机协作模式" value="2" />
                  <el-option label="混合模式" value="3" />
                </el-select>

              </el-form-item>
              
              
              
              <el-row justify="center" style="margin-top: 20px">
                <router-link to="/allocate/model/setTask">
                  <el-button type="primary" size="large">设置协同任务</el-button>
                </router-link>
              </el-row>

            </el-form>

            <div class="el-table el-table--enable-row-hover el-table--medium">
              <div ref="Info" style="width:700px; height: 350p" />
            </div>

          </el-card>
        </el-row>
      </el-col>

      <el-col :span="10">
        <el-row>
          <el-card class="card">
            <template #header><span>Agent资源调配任务关系图</span></template>
            <div class="el-table el-table--enable-row-hover el-table--medium">
              <div ref="taskLinkageInfo" style="width:700px; height: 350px" />
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="card">
            <template #header><span>Agent协同资源库设置</span></template>
            <div class="el-table el-table--enable-row-hover el-table--medium">
              <div ref="Info" style="width:700px; height: 350p" />
            </div>
            <div class="slider-demo-block">
              <span class="demonstration">参与协同最大范围</span>
              <el-slider v-model="value1" :format-tooltip="formatTooltip" show-input />
            </div>
            <div class="slider-demo-block">
              <span class="demonstration">协同成本</span>
              <el-slider v-model="value2" :format-tooltip="formatTooltip" show-input />
            </div>
            <div class="slider-demo-block">
              <span class="demonstration">投入协同的最大资源</span>
              <el-slider v-model="value3" :format-tooltip="formatTooltip" show-input />
            </div>
            
            <el-row justify="center" style="margin-top: 20px">
                <router-link to="/allocate/model/setAgent">
                  <el-button type="primary" size="large">设置协同资源</el-button>
                </router-link>
              </el-row>
          </el-card>
        </el-row>
      </el-col>
    </el-row>


  </div>
</template>

<script setup name="Model">
import * as echarts from "echarts";
import graph from "@/assets/data/all_cluster.json";
import { getCache } from "@/api/monitor/cache";
// import _rawData from "@/assets/data/life-expectancy-table.json";

import _ from "lodash";

import { reactive } from 'vue'
import { ref } from 'vue'

const value1 = ref(100)
const value2 = ref(100)
const value3 = ref(50)


const formatTooltip = (val) => {
  return val + '%'
}
// do not use same name with ref
const form = reactive({
  name: '',
  region: '1',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  parameter1: '200',
  parameter2: '50',
  parameter3: '40',
  parameter4: '120'
})

const onSubmit = () => {
  console.log('submit!')
}
const taskInfo = ref(null);
const taskLinkageInfo = ref(null);
var taskInfoIntance;
var taskLinkageInfoIntance;


var year = [
  2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008,
  2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995,
  1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982,
];
var data = [
  [431, 550, 878, 989, 351, 391, 508, 118],
  [428, 521, 868, 950, 335, 377, 506, 116],
  [422, 512, 867, 936, 316, 367, 502, 116],
  [423, 502, 867, 936, 299, 354, 478, 115],
  [411, 486, 850, 915, 300, 355, 461, 111],
  [409, 478, 837, 889, 285, 370, 458, 109],
  [405, 462, 828, 879, 271, 380, 443, 105],
  [407, 452, 801, 872, 261, 376, 430, 102],
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
  [120, 206, 392, 150, 45, 60, 80, 120],
];
// 指定图表的配置项和数据
var option1 = {
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: { formatter: "{c}%" },
  legend: {
    data: ["Agent"],
  },
  yAxis: {
    data: [
      "任务1",
      "任务2",
      "任务3",
      "任务4",
      "任务5",
      "任务6",
      "任务7",
      "任务8",
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
      data: [12, 20.6, 39.2, 15],
    },
  ],
  animationDuration: 0,
  animationDurationUpdate: 500,
  animationEasing: "linear",
  animationEasingUpdate: "linear",
};

var option2 = {
  title: {
    text: '展示当前执行的任务之间的关系'
  },
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'none',
      symbolSize: 43,
      roam: true,
      label: {
        show: true
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
        fontSize: 20
      },
      data: [
        {
          name: '任务 1',
          x: 200,
          y: 200
        },
        {
          name: '任务 2',
          x: 350,
          y: 200
        },
        {
          name: '任务 3',
          x: 450,
          y: 100
        },
        {
          name: '任务 4',
          x: 350,
          y: 300
        },
        {
          name: '任务 5',
          x: 450,
          y: 350
        },
        {
          name: '任务 6',
          x: 500,
          y: 200
        },
        {
          name: '任务 7',
          x: 200,
          y: 300
        },
        {
          name: '任务 8',
          x: 600,
          y: 100
        },
        {
          name: '任务 9',
          x: 600,
          y: 300
        },
        {
          name: '任务 10',
          x: 600,
          y: 450
        },
        {
          name: '任务 11',
          x: 350,
          y: 400
        },
        {
          name: '任务 12',
          x: 700,
          y: 200
        },
        {
          name: '任务 13',
          x: 700,
          y: 60
        },
        {
          name: '任务 14',
          x: 700,
          y: 350
        },
        {
          name: '任务 15',
          x: 500,
          y: 500
        },
        {
          name: '任务 16',
          x: 200,
          y: 450
        },
        {
          name: '任务 17',
          x: 800,
          y: 400
        },
        {
          name: '任务 18',
          x: 800,
          y: 100
        },
        {
          name: '任务 19',
          x: 900,
          y: 300
        },

      ],
      // links: [],
      links: [

        {
          source: '任务 2',
          target: '任务 1',

          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 3',
          target: '任务 4',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 1',
          target: '任务 3',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 2',
          target: '任务 3',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 2',
          target: '任务 4',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 1',
          target: '任务 4',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 3',
          target: '任务 5',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 6',
          target: '任务 4',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 5',
          target: '任务 10',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 8',
          target: '任务 10',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 12',
          target: '任务 14',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 11',
          target: '任务 15',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 13',
          target: '任务 17',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 18',
          target: '任务 16',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 16',
          target: '任务 19',
          lineStyle: {
            curveness: 0.2
          }
        },
        {
          source: '任务 7',
          target: '任务 16',
          lineStyle: {
            curveness: 0.2
          }
        },
      ],
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0
      }
    }
  ]
};

getCache().then(() => {
  taskInfoIntance = echarts.init(taskInfo.value, "macarons");
  taskLinkageInfoIntance = echarts.init(taskLinkageInfo.value, "macarons");
  taskInfoIntance.setOption(option1);
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[data.length - i - 1].length; j++) {
      data[data.length - i - 1][j] = data[data.length - i - 1][j] / 10;
    }
    setTimeout(function () {
      var smalloption = {
        title: {
          text: "任务完成率",
        },
        series: [
          {
            data: data[data.length - i - 1],
          },
        ],
      };
      // console.log(option1);
      taskInfoIntance.setOption(smalloption);
    }, 500 * i);
  }
  taskLinkageInfoIntance.setOption(option2);
});

</script>

<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}

.slider-demo-block .demonstration+.el-slider {
  flex: 0 0 70%;
}
</style>