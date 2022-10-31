<template>
  <div class="app-container">
    <el-card>
      <div ref="graph" class="content" />
    </el-card>
  </div>
</template>

<script setup name="Graph">
import { ref } from "vue";
import * as echarts from "echarts";
import { getAgent } from "@/api/dashboard/agent";

const { proxy } = getCurrentInstance();
const graph = ref(null);

var graphInst;
proxy.$modal.loading("正在加载Agent数据，请稍候！");

getAgent().then(() => {
  graphInst = echarts.init(graph.value, "macarons");
  proxy.$modal.closeLoading();
  var graphOpt = {
  // title: {
  //   text: 'Basic Graph'
  // },
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'none',
      roam: true,
      label: {
        show: true
      },
      data: [
        {
          id: 0,
          name: '兵力要素',
          symbolSize: 100,
          x: 200,
          y: 100
        },
        {
          id: 1,
          name: '天气要素',
          symbolSize: 100,
          x: 100,
          y: 200
        },
        {
          id: 2,
          name: '地理环境',
          symbolSize: 100,
          x: 200,
          y: 300
        },
        {
          id: 3,
          name: '电磁环境',
          symbolSize: 100,
          x: 400,
          y: 400
        },
        {
          id: 4,
          name: '协同资源',
          symbolSize: 150,
          x: 300,
          y: 200
        },
        {
          id: 5,
          name: '威胁要素',
          symbolSize: 200,
          x: 500,
          y: 200
        }
      ],
      links: [
        {
          source: 4,
          target: 0
        },
        {
          source: 4,
          target: 1
        },
        {
          source: 4,
          target: 2
        },
        {
          source: 4,
          target: 3
        },
        {
          source: 4,
          target: 5
        }
      ],
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0
      }
    }
  ]
};

  graphInst.setOption(graphOpt);
});
</script>

<style scoped lang="scss">
.header {
  text-align: center;
}
.content {
  height: 800px;
}
</style>
