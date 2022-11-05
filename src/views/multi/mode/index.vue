<template>
  <div class="app-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <h1 class="header">态势1</h1>
          <div ref="sit1" class="content" />
        </el-col>
        <el-col :span="6">
          <h1 class="header">态势2</h1>
          <div ref="sit2" class="content" />
        </el-col>
        <el-col :span="6">
          <h1 class="header">态势3</h1>
          <div ref="sit3" class="content" />
        </el-col>
        <el-col :span="6">
          <h1 class="header">态势4</h1>
          <div ref="sit4" class="content" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <h1 class="header">策略1</h1>
          <div ref="strategy1" class="content" />
        </el-col>
        <el-col :span="6">
          <h1 class="header">策略2</h1>
          <div ref="strategy2" class="content" />
        </el-col>
        <el-col :span="6">
          <h1 class="header">策略3</h1>
          <div ref="strategy3" class="content" />
        </el-col>
        <el-col :span="6">
          <h1 class="header">策略4</h1>
          <div ref="strategy4" class="content" />
        </el-col>
      </el-row>
      <el-row justify="space-evenly">
        <el-col :span="12">
          <el-switch
            v-model="value1"
            class="mb-2"
            inactive-text="被动模式"
            active-text="主动模式"
            @change="change1"
          />
        </el-col>
        <el-col :span="12">
          <el-switch
            v-model="value2"
            class="mb-2"
            inactive-text="机器模式"
            active-text="人机协作模式"
            @change="change2"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup name="Mode">
import { ref } from "vue";
import * as echarts from "echarts";
import { ElNotification } from "element-plus";
import { getAgent } from "@/api/dashboard/agent";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const sit1 = ref(null);
const sit2 = ref(null);
const sit3 = ref(null);
const sit4 = ref(null);
const strategy1 = ref(null);
const strategy2 = ref(null);
const strategy3 = ref(null);
const strategy4 = ref(null);

const value1 = ref(false);
const value2 = ref(false);

const router = useRouter();

var sit1Inst, sit2Inst, sit3Inst, sit4Inst;
var strategy1Inst, strategy2Inst, strategy3Inst, strategy4Inst;

proxy.$modal.loading("正在加载模式数据，请稍候！");

const sttg1Data = [150, 180, 120, 90, 130, 170, 210, 180, 100, 190];
const sttg2Data = [
  { value: 978, name: "因素1" },
  { value: 865, name: "因素2" },
  { value: 630, name: "因素3" },
  { value: 520, name: "因素4" },
  { value: 200, name: "因素5" },
  { value: 520, name: "因素1" },
  { value: 200, name: "因素2" },
  { value: 630, name: "因素3" },
  { value: 978, name: "因素4" },
  { value: 865, name: "因素5" },
];
const sttg3Data = [
  {
    value: [60, 50, 280, 100, 250, 90],
    name: "因素1",
  },
  {
    value: [30, 100, 220, 210, 480, 240],
    name: "因素2",
  },
  {
    value: [60, 100, 295, 150, 350, 130],
    name: "因素1",
  },
  {
    value: [64, 140, 270, 300, 515, 245],
    name: "因素2",
  },
];
//prettier-ignore
const sttg4Data = [
  [9.0, 23.0, 21.0, 12.0, 13.2, 10.1, 13.4, 12.0, 30.0, 29.0, 18.0, 19.0, 15.0, 21.0],
  [23.4, 29.0, 33.0, 31.0, 22.0, 18.2, 19.1, 30.0, 40.0, 42.0, 43.0, 28.0, 25.0, 29.0],
  [19.0, 33.0, 41.0, 15.0, 23.2, 20.1, 15.4, 25.0, 40.0, 49.0, 18.0, 25.0, 27.0, 21.0],
];

getAgent().then(() => {
  sit1Inst = echarts.init(sit1.value, "macarons");
  sit2Inst = echarts.init(sit2.value, "macarons");
  sit3Inst = echarts.init(sit3.value, "macarons");
  sit4Inst = echarts.init(sit4.value, "macarons");
  strategy1Inst = echarts.init(strategy1.value, "macarons");
  strategy2Inst = echarts.init(strategy2.value, "macarons");
  strategy3Inst = echarts.init(strategy3.value, "macarons");
  strategy4Inst = echarts.init(strategy4.value, "macarons");
  proxy.$modal.closeLoading();

  var sit1Opt = {
    xAxis: {
      type: "category",
      data: ["因素1", "因素2", "因素3", "因素4", "因素5"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70],
        type: "bar",
      },
    ],
  };
  var sit2Opt = {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center'
    // },
    tooltip: {
      trigger: "item",
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left'
    // },
    series: [
      {
        // name: 'Access From',
        type: "pie",
        radius: "50%", //半径
        data: [
          { value: 1048, name: "因素1" },
          { value: 735, name: "因素2" },
          { value: 580, name: "因素3" },
          { value: 484, name: "因素4" },
          { value: 300, name: "因素5" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  var sit3Opt = {
    // title: {
    //   text: 'Basic Radar Chart'
    // },
    // legend: {
    //   data: ["因素1", "因素2"],
    // },
    tooltip: {
      trigger: "item",
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "维度1", max: 65 },
        { name: "维度2", max: 160 },
        { name: "维度3", max: 300 },
        { name: "维度4", max: 380 },
        { name: "维度5", max: 520 },
        { name: "维度6", max: 250 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [42, 30, 200, 350, 500, 180],
            name: "因素1",
          },
          {
            value: [50, 140, 280, 260, 420, 210],
            name: "因素2",
          },
        ],
      },
    ],
  };
  var sit4Opt = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["因素1", "因素2", "因素3"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      name: "时间",
      type: "category",
      boundaryGap: false,
      data: ["1", "2", "3", "4", "5"],
    },
    yAxis: {
      name: "影响度",
      type: "value",
    },
    series: [
      {
        name: "因素1",
        type: "line",
        // stack: "Total",
        data: [12.0, 13.2, 10.1, 13.4, 9.0, 23.0, 21.0],
      },
      {
        name: "因素2",
        type: "line",
        // stack: "Total",
        data: [22.0, 18.2, 19.1, 23.4, 29.0, 33.0, 31.0],
      },
      {
        name: "因素3",
        type: "line",
        // stack: "Total",
        data: [15.0, 23.2, 20.1, 15.4, 19.0, 33.0, 41.0],
      },
    ],
  };

  var strategy1Opt = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["因素1", "因素2", "因素3", "因素4", "因素5"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: sttg1Data.slice(0, 5),
        type: "bar",
      },
    ],
  };
  var strategy2Opt = {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center'
    // },
    tooltip: {
      trigger: "item",
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left'
    // },
    series: [
      {
        // name: 'Access From',
        type: "pie",
        radius: "50%", //半径
        data: sttg2Data.slice(0, 5),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  var strategy3Opt = {
    // title: {
    //   text: 'Basic Radar Chart'
    // },
    // legend: {
    //   data: ["因素1", "因素2"],
    // },
    tooltip: {
      trigger: "item",
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "维度1", max: 65 },
        { name: "维度2", max: 160 },
        { name: "维度3", max: 300 },
        { name: "维度4", max: 380 },
        { name: "维度5", max: 520 },
        { name: "维度6", max: 250 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: sttg3Data.slice(0, 2),
      },
    ],
  };
  var strategy4Opt = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["因素1", "因素2", "因素3"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      name: "时间",
      type: "category",
      boundaryGap: false,
      data: ["1", "2", "3", "4", "5"],
    },
    yAxis: {
      name: "影响度",
      type: "value",
    },
    series: [
      {
        name: "因素1",
        type: "line",
        // stack: "Total",
        data: sttg4Data[0].slice(0, 7),
      },
      {
        name: "因素2",
        type: "line",
        // stack: "Total",
        data: sttg4Data[1].slice(0, 7),
      },
      {
        name: "因素3",
        type: "line",
        // stack: "Total",
        data: sttg4Data[2].slice(0, 7),
      },
    ],
  };

  sit1Inst.setOption(sit1Opt);
  sit2Inst.setOption(sit2Opt);
  sit3Inst.setOption(sit3Opt);
  sit4Inst.setOption(sit4Opt);

  strategy1Inst.setOption(strategy1Opt);
  strategy2Inst.setOption(strategy2Opt);
  strategy3Inst.setOption(strategy3Opt);
  strategy4Inst.setOption(strategy4Opt);
});
const change1 = (val) => {
  if (val == true) {
    strategy1Inst.setOption({ series: [{ data: sttg1Data.slice(5, 10) }] });
    strategy2Inst.setOption({ series: [{ data: sttg2Data.slice(5, 10) }] });
    strategy3Inst.setOption({ series: [{ data: sttg3Data.slice(2, 4) }] });
    strategy4Inst.setOption({
      series: [
        { data: sttg4Data[0].slice(7, 14) },
        { data: sttg4Data[1].slice(7, 14) },
        { data: sttg4Data[2].slice(7, 14) },
      ],
    });
    ElNotification({
      // title: 'Custom Position',
      message: "已切换至主动模式",
      position: "bottom-left",
      duration: 3000, // 3s 后自动关闭
    });
  } else {
    strategy1Inst.setOption({ series: [{ data: sttg1Data.slice(0, 5) }] });
    strategy2Inst.setOption({ series: [{ data: sttg2Data.slice(0, 5) }] });
    strategy3Inst.setOption({ series: [{ data: sttg3Data.slice(0, 2) }] });
    strategy4Inst.setOption({
      series: [
        { data: sttg4Data[0].slice(0, 7) },
        { data: sttg4Data[1].slice(0, 7) },
        { data: sttg4Data[2].slice(0, 7) },
      ],
    });
    ElNotification({
      // title: 'Custom Position',
      message: "已切换至被动模式",
      position: "bottom-left",
      duration: 3000,
    });
  }
};
const change2 = (val) => {
  if (val == true) {
    router.push("/multi/mode/human");
  }
};
</script>

<style scoped lang="scss">
.header {
  text-align: center;
}
.content {
  height: 300px;
}
.mb-2 {
  // --el-switch-off-color: #13ce66;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
