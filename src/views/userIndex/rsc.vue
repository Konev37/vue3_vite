<template>
  <div class="app-container">
    <el-card class="card">
      
      <el-row>
        <el-col :span="12">
          <h1 class="header">协同agent</h1>
          <div ref="colAgent" class="content" />
        </el-col>
        <el-col :span="12">
          <h1 class="header">危险agent</h1>
          <div ref="danAgents" class="content" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup name="Rsc">
import { ref } from "vue";
import * as echarts from "echarts";
import { getAgent } from "@/api/dashboard/agent";
// import { getRandomInt } from "element-plus/es/utils"

const { proxy } = getCurrentInstance();
const danAgents = ref(null);
const colAgent = ref(null);




var danAgentsInst, colAgentInst;
var Bomberdata = [];
for (let i = 0; i < 24; i++) {
  Bomberdata.push(0);
}
var Tankdata = [];
for (let i = 0; i < 24; i++) {
  Tankdata.push(0);
}
var Radardata = [0, 0];
var MissileTowerdata = [0];
var RedAircraftdata = [0];
var BlueAircraftdata = [0, 0, 0, 0, 0, 0, 0, 0];
var RedCarrierAircraftdata = [0, 0, 0, 0];
var RedCarrierMissiledata = [0, 0, 0];
var BlueBattleShipdata = [0, 0, 0];

var CdataAxis = [];//协作agent坐标轴 红方
//轰炸机
for (let i = 1; i < 25; i++) {
  CdataAxis.push("轰炸机" + i.toString());
}
//战斗机与舰载机
CdataAxis.push("战斗机")
for (let i = 1; i < 5; i++) {
  CdataAxis.push("舰载机" + i.toString());
}
//舰载导弹
for (let i = 1; i < 4; i++) {
  CdataAxis.push("舰载导弹" + i.toString());
}



var DdataAxis = [];//危险agent坐标轴  蓝方
//坦克
for (let i = 1; i < 25; i++) {
  DdataAxis.push("坦克" + i.toString());
}
//雷达与导弹塔
for (let i = 1; i < 3; i++) {
  DdataAxis.push("雷达" + i.toString());
}
DdataAxis.push("导弹塔");
//战斗机
for (let i = 1; i < 9; i++) {
  DdataAxis.push("战斗机" + i.toString());
}
//战列舰
for (let i = 1; i < 4; i++) {
  DdataAxis.push("战列舰" + i.toString());
}
// console.log(DdataAxis);

//prettier-ignore
var Cdata = [];
//prettier-ignore
var Ddata = [];
const concatCdata = (Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata) => {
  Cdata = Bomberdata.concat(RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
}
const concatDdata = (Tankdata, Radardata, MissileTowerdata, BlueAircraftdata, BlueBattleShipdata) => {
  Ddata = Tankdata.concat(Radardata, MissileTowerdata, BlueAircraftdata, BlueBattleShipdata);
}

concatCdata(Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
concatDdata(Tankdata, Radardata, MissileTowerdata, BlueAircraftdata, BlueBattleShipdata);


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

  Tankdata = [91, 87, 66, 71, 90, 66, 92, 83, 60, 81, 68, 95, 97, 67, 84, 62, 95, 83, 70, 62, 67, 82, 73, 68];
  Radardata = [30, 40];
  MissileTowerdata = [50];
  RedAircraftdata = [0];
  BlueAircraftdata = [0, 0, 0, 0, 0, 0, 0, 0];
  RedCarrierAircraftdata = [0, 0, 0, 0];
  RedCarrierMissiledata = [0, 0, 0];
  BlueBattleShipdata = [20, 30, 20];
  concatCdata(Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
  concatDdata(Tankdata, Radardata, MissileTowerdata, BlueAircraftdata, BlueBattleShipdata);

  loadData();
}
function taskAssignment(res) {  // "任务分配完毕"
  Bomberdata = [78, 69, 67, 80, 63, 75, 61, 78, 63, 66, 71, 66, 66, 73, 83, 68, 71, 63, 74, 69, 79, 70, 66, 65];
  RedAircraftdata = [0];
  RedCarrierAircraftdata = [0, 0, 0, 0];
  RedCarrierMissiledata = [0, 0, 0];
  concatCdata(Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
  loadData();
}
function Bombing(res) {

  // console.log("轰炸机 " + res.detail.arr + " 投弹并返航");
}
function destroyedTank(res) {
  Tankdata[parseInt(res.detail.arr)] = 0;
  concatDdata(Tankdata, Radardata, MissileTowerdata, BlueAircraftdata, BlueBattleShipdata);
  loadData();
}
function tankNum(res) {
  if (parseInt(res.detail.arr) == 0) {
    for (let i = 0; i < 24; i++) {
      Bomberdata[i] = Bomberdata[i] - 50 - i % 5;
      if (Bomberdata[i] < 0)
        Bomberdata[i] = 0
    }
    concatCdata(Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
    loadData();
  }
  // console.log("剩余 " + res.detail.arr + " 辆坦克");
}
function launchingSurfaceToAirMissile(res) {  // "导弹塔发射导弹"
  Radardata[0] = 100;
  MissileTowerdata = [100];
  concatDdata(Tankdata, Radardata, MissileTowerdata, BlueAircraftdata, BlueBattleShipdata);
  loadData();
}
function onH20Destroy(res) {
  Bomberdata[parseInt(res.detail.arr)] = 0;
  concatCdata(Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
  loadData();
  // console.log("红方轰炸机 " + res.detail.arr + " 已被摧毁");
}
function redJetCounterAttack(res) {   // "红方战斗机出动"
  RedAircraftdata = [100];
  concatCdata(Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
  loadData();
  // console.log(res.detail.arr);
}
function redJetReturn(res) {    // "红方战斗机返航"

  // console.log(res.detail.arr);
}
function onMissileLauncherDestroy(res) {  // "地对空导弹 xxx 已被摧毁"
  RedAircraftdata = [0];
  Radardata[0] = 20;
  MissileTowerdata = [0];
  concatCdata(Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
  concatDdata(Tankdata, Radardata, MissileTowerdata, BlueAircraftdata, BlueBattleShipdata);
  loadData();
  // console.log(res.detail.arr);
}
function H20Return(res) {
  // console.log("红方轰炸机 " + res.detail.arr + " 返航");
}
function blueFighterStrike(res) {
  for (let i = 0; i < 8; i++) {
    BlueAircraftdata[i] = 100;
  }
  for (let i = 0; i < 3; i++) {
    BlueBattleShipdata[i] = 80;
  }
  concatDdata(Tankdata, Radardata, MissileTowerdata, BlueAircraftdata, BlueBattleShipdata);
  loadData();
  // console.log("蓝方战斗机 " + res.detail.arr + " 出击");
}
function redAircraftTakeoff(res) {
  for (let i = 0; i < 4; i++) {
    RedCarrierAircraftdata[i] = 100;
  }
  concatCdata(Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
  loadData();
  // console.log("红方舰载机 " + res.detail.arr + " 出动");
}
function redAircraftReturn(res) {
  for (let i = 0; i < 4; i++) {
    RedCarrierAircraftdata[i] = 5;
  }
  concatCdata(Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
  loadData();
  // console.log("红方舰载机 " + res.detail.arr + " 发射2枚导弹并返航");
}
function onFighterDestroy(res) {
  BlueAircraftdata[parseInt(res.detail.arr)] = 0;
  concatDdata(Tankdata, Radardata, MissileTowerdata, BlueAircraftdata, BlueBattleShipdata);
  loadData();
  // console.log("蓝方战斗机 " + res.detail.arr + " 被摧毁");
}
function collaboration(res) {   // "启动人机协作模式"

  // console.log(res.detail.arr);
}
function carrierMissile(res) {  // "航母发射导弹"
  for (let i = 0; i < 3; i++) {
    RedCarrierMissiledata[i] = 100;
  }
  concatCdata(Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
  loadData();
  // console.log(res.detail.arr);
}
function cruiserDestroy(res) {
  BlueBattleShipdata[parseInt(res.detail.arr)] = 0;
  concatDdata(Tankdata, Radardata, MissileTowerdata, BlueAircraftdata, BlueBattleShipdata);
  loadData();
  // console.log("蓝方战列舰 " + res.detail.arr + " 被摧毁");
}
function battleshipInterception(res) {  // "战列舰拦截导弹"
  for (let i = 0; i < 3; i++) {
    RedCarrierMissiledata[i] = 0;
  }
  concatCdata(Bomberdata, RedAircraftdata, RedCarrierAircraftdata, RedCarrierMissiledata);
  loadData();
  // console.log(res.detail.arr);
}
// var Tankdata=[91, 87, 66, 71,90,66,92,83,60,81,68,95,97,67,84,62,95,83,70,62,67,82,73,68];
// var Radardata=[100, 90];
// var MissileTowerdata=[50];
// var RedAircraftdata=[0];
// var BlueAircraftdata=[0,0,0,0,0,0,0,0];
// var RedCarrierAircraftdata=[0,0,0,0];
// var RedCarrierMissiledata=[0,0,0];
// var BlueBattleShipdata=[20,30,20];






const loadData = () => {
  proxy.$modal.loading("正在加载态势数据，请稍候！");

  getAgent().then((res) => {
    danAgentsInst = echarts.init(danAgents.value, "macarons");
    colAgentInst = echarts.init(colAgent.value, "macarons");
    proxy.$modal.closeLoading();
    var DAoption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        name: "agent",
        axisLabel: {
          textStyle: {
            color: '#ffffff'
          },
        },
        data: DdataAxis,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        name: "危险度",
        max: 100,
        
        axisLabel: {
          textStyle: {
            color: '#ffffff'
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },

      },
      dataZoom: [{}],
      series: [
        {
          type: "bar",
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#FFCCAA" },
              { offset: 0.5, color: "#FFCC00" },
              { offset: 1, color: "#FF9900" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FF6600" },
                { offset: 0.7, color: "#FFCC00" },
                { offset: 1, color: "#FFCCAA" },
              ]),
            },
          },
          data: Ddata,
        },
      ],
    };

    var CAoption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        name: "agent",
        axisLabel: {
          textStyle: {

            color: '#ffffff'
          },
        },
        data: CdataAxis,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,

      },
      yAxis: {
        name: "协同度",
        max: 100,
        axisLabel: {
          textStyle: {

            color: '#ffffff'
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      dataZoom: [{}],
      series: [
        {
          type: "bar",
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" },
              ]),
            },
          },
          data: Cdata,
        },
      ],
    };

    danAgentsInst.setOption(DAoption);
    colAgentInst.setOption(CAoption);
  });
};

</script>

<style scoped lang="scss">
.header {
  text-align: center;
  color: aliceblue;
}

.content {
  height: 500px;
}

.card {
  background-color: rgba(255, 255, 255, 0);
}
</style>
