<template>
  <div class="app-container">
    <el-card class="card">
      <template #header>
        <span style="color:#409EFF;">环境态势&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style="color:#FFFFFF;">资源态势&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style="color:#FFFFFF;">红方态势评估&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style="color:#FFFFFF;">蓝方态势评估</span>
      </template>
      <el-row :gutter="8">
        <el-col :span="12">
          <h1 class="header">地理环境</h1>
          <div ref="geoEnv" class="content" />
        </el-col>
        <el-col :span="12">
          <h1 class="header">大气环境</h1>
          <div ref="atmosphereEnv" class="content" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <h1 class="header">目标环境</h1>
          <div ref="targetEnv" class="content" />
        </el-col>
        <el-col :span="12">
          <h1 class="header">区域环境</h1>
          <div ref="regionalEnv" class="content" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup name="Env">
import { ref } from "vue";
import * as echarts from "echarts";
import { getAgent } from "@/api/dashboard/agent";

const { proxy } = getCurrentInstance();
const geoEnv = ref(null);
const atmosphereEnv = ref(null);
const targetEnv = ref(null);
const regionalEnv = ref(null);

window.addEventListener('Start', Start, false)
window.addEventListener('taskAssignment', taskAssignment, false)
window.addEventListener('Bombing', Bombing, false)
window.addEventListener('destroyedTank', destroyedTank, false)
window.addEventListener('tankNum', tankNum, false)
window.addEventListener('launchingSurfaceToAirMissile', launchingSurfaceToAirMissile, false)
window.addEventListener('onH20Destroy', onH20Destroy, false)
window.addEventListener('redJetCounterAttack', redJetCounterAttack, false)
window.addEventListener('redJetReturn', redJetReturn, false)
window.addEventListener('onMissileLauncherDestroy', onMissileLauncherDestroy, false)
window.addEventListener('H20Return', H20Return, false)
window.addEventListener('blueFighterStrike', blueFighterStrike, false)
window.addEventListener('redAircraftTakeoff', redAircraftTakeoff, false)
window.addEventListener('redAircraftReturn', redAircraftReturn, false)
window.addEventListener('onFighterDestroy', onFighterDestroy, false)
window.addEventListener('collaboration', collaboration, false)
window.addEventListener('carrierMissile', carrierMissile, false)
window.addEventListener('cruiserDestroy', cruiserDestroy, false)
window.addEventListener('battleshipInterception', battleshipInterception, false)

const iframe = ref(null);
// onMounted(()=>{
//   const iframeValue = iframe.value;
//   iframeValue.onload = () => {
//     const contentWindow = iframeValue.contentWindow
//     // console.log(contentWindow);
//     contentWindow.message('Sphere', 'SetToken', 'vue to unity');
//   }
//   // console.log(iframe.value);
// })



function unityEvent(res) {
  //打印返回值的具体信息
  console.log(res.detail.arr);
}
function Start(res) {   //"场景加载成功"（这个函数可能会被调用多次）

  console.log(res.detail.arr);

}
function taskAssignment(res) {  // "任务分配完毕"

  console.log(res.detail.arr);
}
function Bombing(res) {

  console.log("轰炸机 " + res.detail.arr + " 投弹并返航");
}
function destroyedTank(res) {

  console.log("坦克 " + res.detail.arr + " 已被摧毁");
}
function tankNum(res) {

  console.log("剩余 " + res.detail.arr + " 辆坦克");
}
function launchingSurfaceToAirMissile(res) {  // "导弹塔发射导弹"

  console.log(res.detail.arr);
}
function onH20Destroy(res) {

  console.log("红方轰炸机 " + res.detail.arr + " 已被摧毁");
}
function redJetCounterAttack(res) {   // "红方战斗机出动"

  console.log(res.detail.arr);
}
function redJetReturn(res) {    // "红方战斗机返航"

  console.log(res.detail.arr);
}
function onMissileLauncherDestroy(res) {  // "地对空导弹 xxx 已被摧毁"

  console.log(res.detail.arr);
}
function H20Return(res) {
  // console.log("红方轰炸机 " + res.detail.arr + " 返航");
}
function blueFighterStrike(res) {

  console.log("蓝方战斗机 " + res.detail.arr + " 出击");
}
function redAircraftTakeoff(res) {

  console.log("红方舰载机 " + res.detail.arr + " 出动");
}
function redAircraftReturn(res) {

  console.log("红方舰载机 " + res.detail.arr + " 发射2枚导弹并返航");
}
function onFighterDestroy(res) {

  console.log("蓝方战斗机 " + res.detail.arr + " 被摧毁");
}
function collaboration(res) {   // "启动人机协作模式"

  console.log(res.detail.arr);
}
function carrierMissile(res) {  // "航母发射导弹"

  console.log(res.detail.arr);
}
function cruiserDestroy(res) {

  console.log("蓝方战列舰 " + res.detail.arr + " 被摧毁");
}
function battleshipInterception(res) {  // "战列舰拦截导弹"

  console.log(res.detail.arr);
}

var geoEnvInst, atmosphereEnvInst, targetEnvInst, regionalEnvInst;

proxy.$modal.loading("正在加载态势数据，请稍候！");

getAgent().then(() => {
  geoEnvInst = echarts.init(geoEnv.value, "macarons");
  atmosphereEnvInst = echarts.init(atmosphereEnv.value, "macarons");
  targetEnvInst = echarts.init(targetEnv.value, "macarons");
  regionalEnvInst = echarts.init(regionalEnv.value, "macarons");
  proxy.$modal.closeLoading();

  var geoEnvOpt = {
    // legend: {
    //             y:'55%',
    //             textStyle:{
    //                         fontSize: 18,//字体大小
    //                         color: '#ffffff'//字体颜色
    //                     },
                
    //         },

    tooltip: {},
    dataset: {
      dimensions: ["value", "因素1", "因素2", "因素3"],
      source: [
        {
          value: "地理1",
          因素1: 43.3,
          因素2: 85.8,
          因素3: 93.7,
        },
        {
          value: "地理2",
          因素1: 83.1,
          因素2: 73.4,
          因素3: 55.1,
        },
        {
          value: "地理3",
          因素1: 86.4,
          因素2: 65.2,
          因素3: 82.5,
        },
        {
          value: "地理4",
          因素1: 72.4,
          因素2: 53.9,
          因素3: 39.1,
        },
      ],
    },
    xAxis: {
      name: "影响度",
      axisLabel: {
        textStyle: {
          fontSize: 17,
          color:'#ffffff'
        },
      },
    },
    yAxis: {
      type: "category",
      axisLabel: {
        textStyle: {
          fontSize: 17,
          color:'#ffffff'
        },
      },
    },
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  };
  var atmosphereEnvOpt = {
    // title: {
    //   text: "Stacked Line",
    // },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      textStyle:{
                            fontSize: 18,//字体大小
                            color: '#ffffff'//字体颜色
                        },
      data: ["大气1", "大气2", "大气3", "大气4"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        textStyle: {
          fontSize: 17,
          color:'#ffffff'
        },
      },
      data: ["因素1", "因素2", "因素3", "因素4", "因素5", "因素6", "因素7"],
    },
    yAxis: {
      name: "影响度",
      type: "value",
      axisLabel: {
        textStyle: {
          fontSize: 17,
          color:'#ffffff'
        },
      },
    },
    series: [
      {
        name: "大气1",
        type: "line",
        // stack: "Total",
        data: [12.0, 13.2, 10.1, 13.4, 9.0, 23.0, 21.0],
      },
      {
        name: "大气2",
        type: "line",
        // stack: "Total",
        data: [22.0, 18.2, 19.1, 23.4, 29.0, 33.0, 31.0],
      },
      {
        name: "大气3",
        type: "line",
        // stack: "Total",
        data: [15.0, 23.2, 20.1, 15.4, 19.0, 33.0, 41.0],
      },
      {
        name: "大气4",
        type: "line",
        // stack: "Total",
        data: [32.0, 33.2, 30.1, 33.4, 39.0, 33.0, 32.0],
      },
    ],
  };
  var targetEnvOpt = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      textStyle:{
                            fontSize: 18,//字体大小
                            color: '#ffffff'//字体颜色
                        },
      data: ["目标1", "目标2", "目标3", "目标4"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        textStyle: {
          fontSize: 17,
          color:'#ffffff'
        },
      },
      data: ["因素1", "因素2", "因素3", "因素4", "因素5", "因素6", "因素7"],
    },
    yAxis: {
      name: "影响度",
      type: "value",
      axisLabel: {
        textStyle: {
          fontSize: 17,
          color:'#ffffff'
        },
      },
    },
    series: [
      {
        name: "目标1",
        type: "line",
        smooth: true,
        data: [22.0, 18.2, 19.1, 23.4, 29.0, 33.0, 31.0],
      },
      {
        name: "目标2",
        type: "line",
        smooth: true,
        data: [32.0, 33.2, 30.1, 33.4, 39.0, 33.0, 32.0],
      },
      {
        name: "目标3",
        type: "line",
        smooth: true,
        data: [12.0, 13.2, 10.1, 13.4, 9.0, 23.0, 21.0],
      },
      {
        name: "目标4",
        type: "line",
        smooth: true,
        data: [15.0, 23.2, 20.1, 15.4, 19.0, 33.0, 41.0],
      },
    ],
  };
  var regionalEnvOpt = {
    // legend: {},
    tooltip: {},
    dataset: {
      dimensions: ["value", "因素1", "因素2", "因素3"],
      source: [
        {
          value: "区域1",
          因素1: 85.8,
          因素2: 43.3,
          因素3: 93.7,
        },
        {
          value: "区域2",
          因素1: 55.1,
          因素2: 83.1,
          因素3: 73.4,
        },
        {
          value: "区域3",
          因素1: 86.4,
          因素2: 82.5,
          因素3: 65.2,
        },
        {
          value: "区域4",
          因素1: 53.9,
          因素2: 39.1,
          因素3: 72.4,
        },
      ],
    },
    xAxis: {
      name: "影响度",
      axisLabel: {
        textStyle: {
          fontSize: 17,
          color:'#ffffff'
        },
      },
    },
    yAxis: {
      type: "category",
      axisLabel: {
        textStyle: {
          fontSize: 17,
          color:'#ffffff'
        },
      },
    },
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  };
  setTimeout(() => {
    geoEnvInst.setOption(geoEnvOpt);
    atmosphereEnvInst.setOption(atmosphereEnvOpt);
    targetEnvInst.setOption(targetEnvOpt);
    regionalEnvInst.setOption(regionalEnvOpt);
  }, 50);

});
</script>

<style scoped lang="scss">
.card{
  background-color: rgba(255, 255, 255, 0 );
}

.header {
  text-align: center;
  color: aliceblue;
}

.content {
  height: 220px;
}
</style>
