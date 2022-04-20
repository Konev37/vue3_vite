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
// import type { CSSProperties } from 'vue'

function goTarget(url) {
  window.open(url, "__blank");
}

const allInfo = ref(null);
const { proxy } = getCurrentInstance();
const value4 = ref(50);

var nodes = [
  {
    x: "1",
    y: "12",
    name: "Agent_1_1",
    task: "1",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
  {
    x: "1",
    y: "3",
    name: "Agent_1_2",
    task: "2",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
  {
    x: "3",
    y: "12",
    name: "Agent_2_1",
    task: "3",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
  {
    x: "3",
    y: "9",
    name: "Agent_2_2",
    task: "4",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
  {
    x: "3",
    y: "3",
    name: "Agent_2_3",
    task: "5",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
  {
    x: "5",
    y: "7",
    name: "Agent_3_2",
    task: "6",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
  {
    x: "5",
    y: "12",
    name: "Agent_3_1",
    task: "7",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
  {
    x: "7",
    y: "12",
    name: "Agent_4_1",
    task: "8",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
  {
    x: "7",
    y: "8",
    name: "Agent_4_2",
    task: "9",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
  {
    x: "9",
    y: "10",
    name: "Agent_5_1",
    task: "10",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
  {
    x: "9",
    y: "6",
    name: "Agent_5_2",
    task: "11",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
  {
    x: "7",
    y: "3",
    name: "Agent_4_3",
    task: "12",
    img: "data-1547632686885-o5Rfi3tyk.png",
  },
];
var links = [
  {
    source: "Agent_1_1",
    target: "Agent_2_1",
    name: "迁移",
    task: "任务1",
  },
  {
    source: "Agent_1_2",
    target: "Agent_2_3",
    name: "迁移",
  },
  {
    source: "Agent_1_2",
    target: "Agent_3_2",
    name: "迁移",
  },
  {
    source: "Agent_2_1",
    target: "Agent_3_1",
    name: "迁移",
  },
  {
    source: "Agent_2_2",
    target: "Agent_3_1",
    name: "迁移",
  },
  {
    source: "Agent_2_3",
    target: "Agent_3_2",
    name: "迁移",
  },
  {
    source: "Agent_3_2",
    target: "Agent_3_1",
    name: "迁移",
  },
  {
    source: "Agent_3_1",
    target: "Agent_4_1",
    name: "迁移",
  },
  {
    source: "Agent_3_1",
    target: "Agent_4_2",
    name: "迁移",
  },
  {
    source: "Agent_4_1",
    target: "Agent_5_1",
    name: "迁移",
  },
  {
    source: "Agent_4_2",
    target: "Agent_5_1",
    name: "迁移",
  },
  {
    source: "Agent_4_3",
    target: "Agent_5_1",
    name: "迁移",
  },
  {
    source: "Agent_4_3",
    target: "Agent_5_2",
    name: "迁移",
  },
];
var charts = {
  nodes: [],
  links: [],
  linesData: [],
};
var dataMap = new Map();
for (var j = 0; j < nodes.length; j++) {
  var x = parseInt(nodes[j].x);
  var y = parseInt(nodes[j].y);
  var task = parseInt(nodes[j].task);
  var node = {
    name: nodes[j].name,
    value: [x, y , task],
    
    symbolSize: 20,
    alarm: nodes[j].alarm,
    // symbol: 'image:///asset/get/s/' + nodes[j].img,
    itemStyle: {
      normal: {
        color: "#12b5d0",
      },
    },
  };
  dataMap.set(nodes[j].name, [x, y]);
  charts.nodes.push(node);
}
for (var i = 0; i < links.length; i++) {
  var link = {
    source: links[i].source,
    target: links[i].target,
    label: {
      normal: {
        show: true,
        formatter: links[i].name + ": " + links[i].task,
      },
    },
    lineStyle: {
      normal: {
        color: "#12b5d0",
      },
    },
  };

  charts.links.push(link);
  // 组装动态移动的效果数据
  var lines = [
    {
      coord: dataMap.get(links[i].source),
    },
    {
      coord: dataMap.get(links[i].target),
    },
  ];
  charts.linesData.push(lines);
}
var option = {
  title: {
    text: "任务迁移动态展示",
  },
  tooltip: {
    trigger: "item",
    axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					},
		//formatter: '{a} <br/>{b} : {c} <br/>百分比 : {d}%' //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
    formatter: function (params, ticket, callback) {
        // console.log(params);
        if(params.seriesIndex == 0)//agent的seriesIndex为0，任务迁移的为1
        {
          var tip = "集群" + ' : ' + ((params.value[0]-1)/2+1) + "<br/>";
          tip += "Agent编号：" + params.name + "<br/>";
          tip += "Agent任务：任务" + params.value[2] + "<br/>";
        }
        else
        {
          var tip = "任务迁移" + ' : ' + params.task + "<br/>";
          // tip += "Agent编号：" + params.name + "<br/>";
        }
        // for (var i = 0, l = params.length; i < l; i++) {
        //     if(params[i].seriesName=='温度'){
        //         tip += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c23531;"></span>' + params[i].seriesName + ' : ' + params[i].value +'℃';//鼠标悬浮显示的字符串内容
        //     }else if(params[i].seriesName=='湿度'){
        //         tip += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1bf55f;"></span>' + params[i].seriesName + ' : ' + params[i].value +'RH%' ;//鼠标悬浮显示的字符串内容
        //     }else {
        //         tip += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value ;//鼠标悬浮显示的字符串内容
        //     }
        // }
        //同步加载
        return tip;
        //异步加载
        // setTimeout(function () {
        //     // 仅为了模拟异步回调
        //     callback(ticket, tip);
        // }, 10);//延时时间ms
        // return 'loading...';
    }

    // formatter: "{b}",
  },
  backgroundColor: "#ffffff",
  xAxis: {
    min: 0,
    max: 12,
    show: false,
    type: "value",
  },
  yAxis: {
    min: 0,
    max: 12,
    show: false,
    type: "value",
  },
  series: [
    {
      name: "agent",
      type: "graph",
      layout: "none",
      id: "a",
      coordinateSystem: "cartesian2d",
      edgeSymbol: ["", "arrow"],
      // symbolSize: 50,
      label: {
        normal: {
          show: true,
          position: "bottom",
          color: "#12b5d0",
        },
      },
      lineStyle: {
        normal: {
          width: 2,
          shadowColor: "none",
        },
      },
      xAxis: {
        min: 1,
        max: 1,
        show: false,
        type: "value",
      },
      yAxis: {
        min: 0,
        max: 12,
        show: false,
        type: "value",
      },
      // edgeSymbolSize: 8,
      //draggable: true,
      data: charts.nodes,
      links: charts.links,
      z: 4,
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: function (item) {
              return item.data.name;
            },
          },
        },
      },
    },
    // {
    //   name: "集群2",
    //   type: "graph2",
    //   layout: "none",
    //   id: "b",
    //   coordinateSystem: "cartesian2d",
    //   edgeSymbol: ["", "arrow"],
    //   // symbolSize: 50,
    //   label: {
    //     normal: {
    //       show: true,
    //       position: "bottom",
    //       color: "#12b5d0",
    //     },
    //   },
    //   lineStyle: {
    //     normal: {
    //       width: 2,
    //       shadowColor: "none",
    //     },
    //   },
    //   xAxis: {
    //     min: 3,
    //     max: 3,
    //     show: false,
    //     type: "value",
    //   },
    //   yAxis: {
    //     min: 0,
    //     max: 12,
    //     show: false,
    //     type: "value",
    //   },
    //   // edgeSymbolSize: 8,
    //   //draggable: true,
    //   data: charts.nodes,
    //   links: charts.links,
    //   z: 4,
    //   itemStyle: {
    //     normal: {
    //       label: {
    //         show: true,
    //         formatter: function (item) {
    //           return item.data.name;
    //         },
    //       },
    //     },
    //   },
    // },
    {
      name: "迁移",
      type: "lines",
      coordinateSystem: "cartesian2d",
      z: 4,
      effect: {
        show: true,
        trailLength: 0,
        symbol: "arrow",
        color: "#12b5d0",
        symbolSize: 8,
      },
      lineStyle: {
        normal: {
          curveness: 0,
        },
      },
      data: charts.linesData,
    },
  ],
};

// function getList() {
proxy.$modal.loading("正在加载Agent数据，请稍候！");

getCache().then(() => {
  proxy.$modal.closeLoading();

  const allInfoIntance = echarts.init(allInfo.value, "macarons");
  allInfoIntance.setOption(option);

  // 点击后界面
  allInfoIntance.on("click", function (param) {
    var nodeses = [
      {
        x: "1",
        y: "12",
        name: "DNS",
        img: "data-1547632686885-o5Rfi3tyk.png",
      },
      {
        x: "1",
        y: "3",
        name: "爬虫数据",
        img: "data-1547632686885-o5Rfi3tyk.png",
      },
    ];
    var linkses = [
      {
        source: "DNS",
        target: "爬虫数据",
        name: "访问",
      },
    ];
    console.info(1);
    var chartses = {
      nodeses: [],
      linkses: [],
      linesDataes: [],
    };
    var dataMapes = new Map();
    for (var j = 0; j < nodeses.length; j++) {
      var x = parseInt(nodeses[j].x);
      var y = parseInt(nodeses[j].y);
      var node = {
        name: nodeses[j].name,
        value: [x, y],
        symbolSize: 20,
        alarm: nodeses[j].alarm,
        // symbol: 'image:///asset/get/s/' + nodeses[j].img,
        itemStyle: {
          normal: {
            color: "#12b5d0",
          },
        },
      };
      dataMapes.set(nodeses[j].name, [x, y]);
      chartses.nodeses.push(node);
    }
    for (var i = 0; i < linkses.length; i++) {
      var link = {
        source: linkses[i].source,
        target: linkses[i].target,
        label: {
          normal: {
            show: true,
            formatter: linkses[i].name,
          },
        },
        lineStyle: {
          normal: {
            color: "#12b5d0",
          },
        },
      };

      chartses.linkses.push(link);
      // 组装动态移动的效果数据
      var linesess = [
        {
          coord: dataMapes.get(linkses[i].source),
        },
        {
          coord: dataMapes.get(linkses[i].target),
        },
      ];
      chartses.linesDataes.push(linesess);
    }
    allInfoIntance.setOption({
      notMerge: true,
      series: [
        {
          data: chartses.nodeses,
          links: chartses.linkses,
        },
        {
          data: chartses.linesDataes,
        },
      ],
    });
  });

  // 这一段不知道为什么会让鼠标悬停显示信息变的很奇怪
  /*allInfoIntance.setOption({
    graphic: echarts.util.map(charts.nodes, function (item, dataIndex) {
      return {
        type: "circle",
        position: allInfoIntance.convertToPixel("grid", item.value),
        shape: {
          cx: 5,
          cy: 5,
          r: 20,
        },
        invisible: true,
        //draggable: true,
        //ondrag: echarts.util.curry(onPointDragging, dataIndex),
        onmousemove: echarts.util.curry(showTooltip, dataIndex),
        onmouseout: echarts.util.curry(hideTooltip, dataIndex),
        z: 100,
      };
    }),
  });

  function onPointDragging(dataIndex, dx, dy) {
    console.log("tempV-----");
    var tempV = allInfoIntance.convertFromPixel('grid', this.position);
    console.log("tempV", tempV);
    charts.nodes[dataIndex].value = [tempV[0], tempV[1]];
    // Update data
    allInfoIntance.setOption({
        series: [{
            id: 'a',
            data: charts.nodes
        }]
    });
}

  function showTooltip(dataIndex) {
    allInfoIntance.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: dataIndex,
    });
  }

  function hideTooltip(dataIndex) {
    allInfoIntance.dispatchAction({
      type: "hideTip",
    });
  }*/

  window.addEventListener("resize", function () {
    allInfoIntance.resize();
    allInfoIntance.setOption({
      series: [
        {
          id: "a",
          data: charts.nodes,
        },
      ],
    });
  });
});
// }

// getList();
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
