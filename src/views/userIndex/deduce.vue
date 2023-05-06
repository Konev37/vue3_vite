<template>
  <div class="app-container">
    <el-card class="card">
      <template #header>
        <span style="color:#FFFFFF;">处理后态势&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style="color:#409EFF;">态势推演</span>
      </template>
      <el-row :gutter="30">
        <el-col :span="12">
          <h1 class="header">态势1</h1>
          <div ref="sit1Env" class="content" />
        </el-col>
        <el-col :span="12">
          <h1 class="header">态势2</h1>
          <div ref="sit2Env" class="content" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup name="Deduce">
import { ref } from "vue";
import * as echarts from "echarts";
import { getAgent } from "@/api/dashboard/agent";

const { proxy } = getCurrentInstance();
const sit1Env = ref(null);
const sit2Env = ref(null);

var sit1EnvInst, sit2EnvInst;

proxy.$modal.loading("正在加载态势数据，请稍候！");

getAgent().then(() => {
  sit1EnvInst = echarts.init(sit1Env.value, "macarons");
  sit2EnvInst = echarts.init(sit2Env.value, "macarons");
  proxy.$modal.closeLoading();

  var sit1EnvOpt = {
    // title: {
    //   text: 'Stacked Area Chart'
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["因素1", "因素2", "因素3", "因素4", "因素5"],
      textStyle: {
        fontSize: 17,
        color: "#ffffff",
      },
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        name: "时间",
        type: "category",
        boundaryGap: false,
        data: ["1", "2", "3", "4", "5", "6", "7"],
        axisLabel: {
          textStyle: {
            fontSize: 17,
            color: "#ffffff",
          },
        },
      },
    ],
    yAxis: [
      {
        name: "影响度",
        type: "value",
        axisLabel: {
          textStyle: {
            fontSize: 17,
            color: "#ffffff",
          },
        },
      },
    ],
    series: [
      {
        name: "因素1",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "因素2",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "因素3",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "因素4",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "因素5",
        type: "line",
        stack: "Total",
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
  var sit2EnvOpt = {
    // title: {
    //   text: 'Stacked Area Chart'
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["因素1", "因素2", "因素3", "因素4", "因素5"],
      textStyle: {
        fontSize: 17,
        color: "#ffffff",
      },
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        name: "时间",
        type: "category",
        boundaryGap: false,
        data: ["1", "2", "3", "4", "5", "6", "7"],
        axisLabel: {
          textStyle: {
            fontSize: 17,
            color: "#ffffff",
          },
        },
      },
    ],
    yAxis: [
      {
        name: "影响度",
        type: "value",
        axisLabel: {
          textStyle: {
            fontSize: 17,
            color: "#ffffff",
          },
        },
      },
    ],
    series: [
      {
        name: "因素1",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [440, 91, 382, 167, 580, 165, 620],
      },
      {
        name: "因素2",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [160, 166, 150, 668, 185, 660, 160],
      },
      {
        name: "因素3",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [240, 166, 202, 167, 180, 115, 420],
      },
      {
        name: "因素4",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [75, 464, 100, 308, 95, 660, 205],
      },
      {
        name: "因素5",
        type: "line",
        stack: "Total",
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
  sit1EnvInst.setOption(sit1EnvOpt);
  sit2EnvInst.setOption(sit2EnvOpt);
});
</script>

<style scoped lang="scss">
.header {
  text-align: center;
  color: aliceblue;
}

.content {
  height: 290px;
}

.card {
  background-color: rgba(255, 255, 255, 0);
}
</style>
