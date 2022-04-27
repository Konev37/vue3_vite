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

<script setup name="Single" lang="ts">
declare module '*.json' {
    const value: any;
    export default value;
}
import { reactive, ref } from "vue";
import { getCache } from "@/api/monitor/cache";
import * as echarts from "echarts";

import res0 from "@/assets/data/data.json";
import res1 from "@/assets/data/life-expectancy-table.json";

import _ from 'lodash'
// import type { CSSProperties } from 'vue'

function goTarget(url) {
  window.open(url, "__blank");
}

const allInfo = ref(null);
const { proxy } = getCurrentInstance();
const value4 = ref(50);
var option;

const updateFrequency = 2000;
const dimension = 0;
const countryColors = {
  Australia: '#00008b',
  Canada: '#f00',
  China: '#ffde00',
  Cuba: '#002a8f',
  Finland: '#003580',
  France: '#ed2939',
  Germany: '#000',
  Iceland: '#003897',
  India: '#f93',
  Japan: '#bc002d',
  'North Korea': '#024fa2',
  'South Korea': '#000',
  'New Zealand': '#00247d',
  Norway: '#ef2b2d',
  Poland: '#dc143c',
  Russia: '#d52b1e',
  Turkey: '#e30a17',
  'United Kingdom': '#00247d',
  'United States': '#b22234'
};
  const flags = res0[0];
  const data = res1[0];
  const years = [];
  for (let i = 0; i < data.length; ++i) {
    if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
      years.push(data[i][4]);
    }
  }
  function getFlag(countryName) {
    if (!countryName) {
      return '';
    }
    return (
      flags.find(function (item) {
        return item.name === countryName;
      }) || {}
    ).emoji;
  }
  let startIndex = 10;
  let startYear = years[startIndex];
  option = {
    grid: {
      top: 10,
      bottom: 30,
      left: 150,
      right: 80
    },
    xAxis: {
      max: 'dataMax',
      axisLabel: {
        formatter: function (n) {
          return Math.round(n) + '';
        }
      }
    },
    dataset: {
      source: data.slice(1).filter(function (d) {
        return d[4] === startYear;
      })
    },
    yAxis: {
      type: 'category',
      inverse: true,
      max: 10,
      axisLabel: {
        show: true,
        fontSize: 14,
        formatter: function (value) {
          return value + '{flag|' + getFlag(value) + '}';
        },
        rich: {
          flag: {
            fontSize: 25,
            padding: 5
          }
        }
      },
      animationDuration: 300,
      animationDurationUpdate: 300
    },
    series: [
      {
        realtimeSort: true,
        seriesLayoutBy: 'column',
        type: 'bar',
        itemStyle: {
          color: function (param) {
            return countryColors[param.value[3]] || '#5470c6';
          }
        },
        encode: {
          x: dimension,
          y: 3
        },
        label: {
          show: true,
          precision: 1,
          position: 'right',
          valueAnimation: true,
          fontFamily: 'monospace'
        }
      }
    ],
    // Disable init animation.
    animationDuration: 0,
    animationDurationUpdate: updateFrequency,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
    graphic: {
      elements: [
        {
          type: 'text',
          right: 160,
          bottom: 60,
          style: {
            text: startYear,
            font: 'bolder 80px monospace',
            fill: 'rgba(100, 100, 100, 0.25)'
          },
          z: 100
        }
      ]
    }
  };

getCache().then(() => {
  // proxy.$modal.closeLoading();
  
  // for(var i=0 ; i< links.length ;i++){
  //   allInfoIntance.setOption(options[i]);
  //   sleep(3000);
  // }
  
  const allInfoIntance = echarts.init(allInfo.value, "macarons");
	allInfoIntance.setOption(option);
  for (let i = startIndex; i < years.length - 1; ++i) {
    (function (i) {
      setTimeout(function () {
        updateYear(years[i + 1]);
      }, (i - startIndex) * updateFrequency);
    })(i);
  }
  function updateYear(year) {
    let source = data.slice(1).filter(function (d) {
      return d[4] === year;
    });
    option.series[0].data = source;
    option.graphic.elements[0].style.text = year;
    allInfoIntance.setOption(option);
  }
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
});
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
