<template>
    <div class="red">

        <el-card class="card">
           
            <el-row :gutter="24">
                <el-col :span="12">
                    <h1 class="header">敌方部署威胁等级</h1>
                    <div ref="danger1" class="content" />
                </el-col>
                <el-col :span="12">
                    <h1 class="header">我方协同资源使用率</h1>
                    <div ref="agent1" class="content" />
                </el-col>

            </el-row>
            <el-row :gutter="24">

                <el-col :span="7">
                    <h1 class="header">我方资源被打击概率</h1>
                    <div ref="dangerRate1" class="content" />
                </el-col>
                <el-col :span="10">
                    <h1 class="header">协同任务完成度</h1>
                    <div ref="taskRate1" class="content" />
                </el-col>
                <el-col :span="7">
                    <h1 class="header">全区域威胁系数</h1>
                    <div ref="safeRate1" class="content" />
                </el-col>
                <!-- <el-col :span="6">
                    <h1 class="header">实时态势安全评价</h1>
                    <div ref="safe1" class="content" />
                </el-col> -->
            </el-row>

        </el-card>
    </div>
</template>

<script script setup name="Red">
import * as echarts from "echarts";
import graph from "@/assets/data/all_cluster.json";
import { getCache } from "@/api/monitor/cache";
// import _rawData from "@/assets/data/life-expectancy-table.json";
import { ElNotification } from "element-plus";
// import { getAgent } from "@/api/dashboard/agent";
import { useRouter } from "vue-router";
import _ from "lodash";

import { reactive } from 'vue'
import { ref } from 'vue'
// import type { TabsPaneContext } from 'element-plus'
// import type { TabsPaneContext } from "element-plus";


const { proxy } = getCurrentInstance();

//红方
// const { proxy } = getCurrentInstance();
const danger1 = ref(null);
const agent1 = ref(null);
const dangerRate1 = ref(null);
const taskRate1 = ref(null);
const safeRate1 = ref(null);
// const safe1 = ref(null);
var danger1Inst, agent1Inst;
var dangerRate1Inst, taskRate1Inst, safeRate1Inst;

var danAgentsInst, colAgentInst;
var TankDanger = 0;
var RadarDanger = 0;
var MissileTowerDanger = 0;
var AirCraftDanger = 0;
var BattleshipDanger = 0;
var BomberCollaborate = 0;
var CarrierAircraftCollaborate = 0;
var CarrierMissileCollaborate = 0;
var TankAttackWeight = [0.4, 0.3, 0.1, 0.2];
var MissileTowerAttackWeight = [0.7, 0.1, 0.1, 0.1];
var AircraftAttackWeight = [0.1, 0.7, 0.1, 0.1];
var TankSafeWeight = [0.2, 0.4, 0.3, 0.1];
var MissileTowerSafeWeight = [0.3, 0.1, 0.4, 0.4];
var AircraftSafeWeight = [0.5, 0.1, 0.1, 0.3];
var TankTaskProcess = 0;
var MissileTowerTaskProcess = 0;
var AircraftTaskProcess = 0;
var BattleShipTaskProcess = 0;

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

var danger1data = [];
for (let i = 0; i < 5; i++) {
    danger1data.push(0);
}

var agent1data = [];
for (let i = 0; i < 3; i++) {
    agent1data.push(0);
}

var dangerRatedata = [];

var taskRate1data = [];
for (let i = 0; i < 4; i++) {
    agent1data.push(0);
}

var agent1data = [];
for (let i = 0; i < 4; i++) {
    agent1data.push(0);
}

var safeRatedata = [];

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



    loadData();
}
function taskAssignment(res) {  // "任务分配完毕"
    Bomberdata = [78, 69, 67, 80, 63, 75, 61, 78, 63, 66, 71, 66, 66, 73, 83, 68, 71, 63, 74, 69, 79, 70, 66, 65];
    RedAircraftdata = [0];
    RedCarrierAircraftdata = [0, 0, 0, 0];
    RedCarrierMissiledata = [0, 0, 0];

    loadData();
}
function Bombing(res) {

    // console.log("轰炸机 " + res.detail.arr + " 投弹并返航");
}
function destroyedTank(res) {//坦克被摧毁
    Tankdata[parseInt(res.detail.arr)] = 0;
    TankTaskProcess += 1;
    taskRate1data[0] = Math.round(100 * (TankTaskProcess / Tankdata.length));
    loadData();
}
function tankNum(res) {
    if (parseInt(res.detail.arr) == 0) {
        for (let i = 0; i < 24; i++) {
            Bomberdata[i] = Bomberdata[i] - 50 - i % 5;
            if (Bomberdata[i] < 0)
                Bomberdata[i] = 0
        }
        loadData();
    }
    // console.log("剩余 " + res.detail.arr + " 辆坦克");
}
function launchingSurfaceToAirMissile(res) {  // "导弹塔发射导弹"
    Radardata[0] = 100;
    MissileTowerdata = [100];
    loadData();
}
function onH20Destroy(res) {
    Bomberdata[parseInt(res.detail.arr)] = 0;
    loadData();
    // console.log("红方轰炸机 " + res.detail.arr + " 已被摧毁");
}
function redJetCounterAttack(res) {   // "红方战斗机出动"
    RedAircraftdata = [100];
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
    MissileTowerTaskProcess += 1;
    taskRate1data[1] = Math.round(100 * (MissileTowerTaskProcess / MissileTowerdata.length));
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
    loadData();
    // console.log("蓝方战斗机 " + res.detail.arr + " 出击");
}
function redAircraftTakeoff(res) {
    for (let i = 0; i < 4; i++) {
        RedCarrierAircraftdata[i] = 100;
    }
    loadData();
    // console.log("红方舰载机 " + res.detail.arr + " 出动");
}
function redAircraftReturn(res) {
    for (let i = 0; i < 4; i++) {
        RedCarrierAircraftdata[i] = 5;
    }
    loadData();
    // console.log("红方舰载机 " + res.detail.arr + " 发射2枚导弹并返航");
}
function onFighterDestroy(res) {
    BlueAircraftdata[parseInt(res.detail.arr)] = 0;
    AircraftTaskProcess+= 1;
    taskRate1data[2] = Math.round(100 * (AircraftTaskProcess / BlueAircraftdata.length));
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
    loadData();
    // console.log(res.detail.arr);
}
function cruiserDestroy(res) {
    BlueBattleShipdata[parseInt(res.detail.arr)] = 0;
    BattleShipTaskProcess+= 1;
    taskRate1data[3] = Math.round(100 * (BattleShipTaskProcess / BlueBattleShipdata.length));
    loadData();
    // console.log("蓝方战列舰 " + res.detail.arr + " 被摧毁");
}
function battleshipInterception(res) {  // "战列舰拦截导弹"
    for (let i = 0; i < 3; i++) {
        RedCarrierMissiledata[i] = 0;
    }
    loadData();
    // console.log(res.detail.arr);
}



const loadData = () => {
    // proxy.$modal.loading("正在加载模式数据，请稍候！");
    getCache().then(() => {
        //更新数据
        TankDanger=0;
        RadarDanger=0;
        MissileTowerDanger=0;
        AirCraftDanger=0;
        BattleshipDanger=0;
        for (let i = 0; i < Tankdata.length; i++) {
            TankDanger += Tankdata[i];
        }
        TankDanger = TankDanger / Tankdata.length;
        for (let i = 0; i < Radardata.length; i++) {
            RadarDanger += Radardata[i];
        }
        RadarDanger = RadarDanger / Radardata.length;
        for (let i = 0; i < MissileTowerdata.length; i++) {
            MissileTowerDanger += MissileTowerdata[i];
        }
        MissileTowerDanger = MissileTowerDanger / MissileTowerdata.length;
        for (let i = 0; i < BlueAircraftdata.length; i++) {
            AirCraftDanger += BlueAircraftdata[i];
        }
        AirCraftDanger = AirCraftDanger / BlueAircraftdata.length;
        for (let i = 0; i < BlueBattleShipdata.length; i++) {
            BattleshipDanger += BlueBattleShipdata[i];
        }
        BattleshipDanger = BattleshipDanger / BlueBattleShipdata.length;

        danger1data[0] = Math.round(TankDanger);
        danger1data[1] = Math.round(RadarDanger);
        danger1data[2] = MissileTowerDanger;
        danger1data[3] = Math.round(AirCraftDanger);
        danger1data[4] = Math.round(BattleshipDanger);

        dangerRatedata = [
            {
                value: "轰炸机",
                坦克: TankAttackWeight[0] * danger1data[0],
                导弹塔: MissileTowerAttackWeight[0] * danger1data[2],
                战斗机: AircraftAttackWeight[0] * danger1data[3],
            },
            {
                value: "舰载机",
                坦克: TankAttackWeight[1] * danger1data[0],
                导弹塔: MissileTowerAttackWeight[1] * danger1data[2],
                战斗机: AircraftAttackWeight[1] * danger1data[3],
            },
            {
                value: "导弹",
                坦克: TankAttackWeight[2] * danger1data[0],
                导弹塔: MissileTowerAttackWeight[2] * danger1data[2],
                战斗机: AircraftAttackWeight[2] * danger1data[3],
            },
            {
                value: "航母",
                坦克: TankAttackWeight[3] * danger1data[0],
                导弹塔: MissileTowerAttackWeight[3] * danger1data[2],
                战斗机: AircraftAttackWeight[3] * danger1data[3],
            },
        ];

        safeRatedata = [
            {
                name: "坦克",
                type: "line",
                // stack: "Total",
                data: [TankSafeWeight[0] * danger1data[0], TankSafeWeight[1] * danger1data[0], TankSafeWeight[2] * danger1data[0], TankSafeWeight[3] * danger1data[0]],
            },
            {
                name: "导弹塔",
                type: "line",
                // stack: "Total",
                data: [MissileTowerSafeWeight[0] * danger1data[2], MissileTowerSafeWeight[1] * danger1data[2], MissileTowerSafeWeight[2] * danger1data[2], MissileTowerSafeWeight[3] * danger1data[2]],
            },
            {
                name: "战斗机",
                type: "line",
                // stack: "Total",
                data: [AircraftSafeWeight[0] * danger1data[3], AircraftSafeWeight[1] * danger1data[3], AircraftSafeWeight[2] * danger1data[3], AircraftSafeWeight[3] * danger1data[3]],
            },
        ];
        for (let i = 0; i < Bomberdata.length; i++) {
            BomberCollaborate += Bomberdata[i];
        }
        BomberCollaborate = BomberCollaborate / Bomberdata.length;
        for (let i = 0; i < RedAircraftdata.length; i++) {
            CarrierAircraftCollaborate += RedAircraftdata[i];
        }
        for (let i = 0; i < RedCarrierAircraftdata.length; i++) {
            CarrierAircraftCollaborate += RedCarrierAircraftdata[i];
        }
        CarrierAircraftCollaborate = CarrierAircraftCollaborate / (RedAircraftdata.length + RedCarrierAircraftdata.length);
        for (let i = 0; i < RedCarrierMissiledata.length; i++) {
            CarrierMissileCollaborate += RedCarrierMissiledata[i];
        }
        CarrierMissileCollaborate = CarrierMissileCollaborate / RedCarrierMissiledata.length;
        agent1data[0] = Math.round(BomberCollaborate);
        agent1data[1] = Math.round(CarrierAircraftCollaborate);
        agent1data[2] = Math.round(CarrierMissileCollaborate);


        //echarts图表
        danger1Inst = echarts.init(danger1.value, "macarons");
        agent1Inst = echarts.init(agent1.value, "macarons");
        dangerRate1Inst = echarts.init(dangerRate1.value, "macarons");
        taskRate1Inst = echarts.init(taskRate1.value, "macarons");
        safeRate1Inst = echarts.init(safeRate1.value, "macarons");
        // safe1Inst = echarts.init(safe1.value, "macarons");
        proxy.$modal.closeLoading();
        var dangerOpt = {
            xAxis: {
                type: 'category',
                axisLabel: {
                    textStyle: {
                        color: '#ffffff'
                    },
                },
                data: ['坦克', '雷达', '导弹塔', '战斗机', '驱逐舰']
            },
            yAxis: {
                type: 'value',
                max: 100,
                axisLabel: {
                    textStyle: {
                        color: '#ffffff'
                    },
                },
            },
            series: [
                {
                    data: danger1data,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        };

        var agentOpt = {

            polar: {
                radius: [30, '80%']
            },
            angleAxis: {
                max: 100,
                startAngle: 75,
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value} %',
                    color: '#ffffff'
                },

            },
            radiusAxis: {
                type: 'category',
                data: ['轰炸机', '舰载机', '舰载导弹']
            },
            tooltip: {},
            series: {
                type: 'bar',
                data: agent1data,
                coordinateSystem: 'polar',
                label: {
                    show: true,
                    position: 'middle',
                    formatter: '{b}: {c}'
                }
            }
        };

        var dangerRateOpt = {
            // legend: {},
            tooltip: {},
            dataset: {
                dimensions: ["value", "坦克", "导弹塔", "战斗机"],
                source: dangerRatedata,

            },
            xAxis: {
                type: "category",
                axisLabel: {
                    textStyle: {
                        color: '#ffffff'
                    },
                },
            },
            yAxis: {
                name: "  被打击概率",
                axisLabel: {
                    textStyle: {
                        color: '#ffffff'
                    },
                },
            },
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
        };

        // var year = [];
        // for (let i = 39; i > 0; i--) {
        //     year.push(i);
        // }
        // var data = [
        //     [431, 550, 878, 989, 351, 391, 508, 1000],
        //     [428, 521, 868, 950, 335, 377, 506, 996],
        //     [422, 512, 867, 936, 316, 367, 502, 986],
        //     [423, 502, 867, 936, 299, 354, 478, 965],
        //     [411, 486, 850, 915, 300, 355, 461, 931],
        //     [409, 478, 837, 889, 285, 370, 458, 909],
        //     [405, 462, 828, 879, 271, 380, 443, 805],
        //     [407, 452, 801, 872, 261, 376, 430, 802],
        //     [400, 462, 790, 868, 253, 356, 430, 783],
        //     [384, 454, 790, 839, 254, 346, 420, 770],
        //     [372, 452, 770, 823, 259, 347, 394, 732],
        //     [359, 448, 770, 802, 240, 349, 394, 653],
        //     [357, 460, 751, 761, 230, 364, 365, 656],
        //     [343, 444, 735, 733, 226, 353, 363, 510],
        //     [331, 453, 722, 718, 225, 364, 339, 556],
        //     [312, 424, 717, 702, 226, 339, 325, 537],
        //     [307, 407, 713, 674, 220, 336, 314, 450],
        //     [300, 409, 686, 661, 211, 308, 312, 474],
        //     [298, 380, 664, 633, 192, 298, 309, 360],
        //     [282, 377, 657, 621, 181, 280, 289, 381],
        //     [279, 367, 646, 578, 178, 264, 285, 382],
        //     [280, 361, 645, 572, 172, 278, 278, 282],
        //     [276, 359, 641, 545, 171, 274, 278, 293],
        //     [261, 348, 629, 527, 168, 256, 263, 210],
        //     [258, 332, 601, 512, 156, 244, 243, 197],
        //     [238, 313, 601, 467, 151, 225, 237, 191],
        //     [227, 286, 594, 424, 137, 201, 237, 188],
        //     [226, 287, 571, 411, 127, 200, 210, 186],
        //     [230, 274, 548, 381, 120, 178, 201, 166],
        //     [218, 262, 541, 334, 103, 188, 187, 121],
        //     [205, 260, 525, 330, 93, 162, 187, 100],
        //     [190, 264, 502, 295, 86, 161, 186, 90],
        //     [173, 236, 473, 292, 76, 140, 159, 88],
        //     [162, 215, 453, 251, 68, 113, 140, 80],
        //     [159, 192, 444, 210, 71, 89, 134, 60],
        //     [140, 198, 434, 206, 64, 99, 123, 40],
        //     [120, 213, 420, 206, 52, 83, 108, 20],
        //     [119, 192, 413, 193, 47, 90, 82, 11],
        //     [120, 206, 392, 150, 45, 60, 80, 4],
        // ];
        // 指定图表的配置项和数据
        var taskRateOpt = {

            tooltip: { formatter: "{c}%" },
            // legend: {
            //     data: ["Agent"],
            // },
            yAxis: {
                axisLabel: {
                    textStyle: {
                        color: '#ffffff'
                    },
                },
                data: [
                    "坦克",
                    "导弹塔",
                    "战斗机",
                    "驱逐舰",
                ],
                inverse: true,
                // max: 5,
            },
            xAxis: {
                axisLabel: {
                    formatter: "{value}%",
                    textStyle: {
                        color: '#ffffff'
                    },
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
                    data: taskRate1data,
                },
            ],

        };

        var safeRateOpt = {
            tooltip: {
                trigger: "axis",
            },
            legend: {

                data: ["坦克", "导弹塔", "战斗机"],
                textStyle: {
                    fontSize: 17,
                    color: "#ffffff"
                },
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
                axisLabel: {
                    textStyle: {
                        color: '#ffffff'
                    },
                },
                boundaryGap: false,
                data: ["海域", "城市", "山地", "空域"],
            },
            yAxis: {
                name: "威胁度",
                type: "value",
                axisLabel: {
                    textStyle: {
                        color: '#ffffff'
                    },
                },
            },
            series: safeRatedata,
        };

        danger1Inst.setOption(dangerOpt);
        agent1Inst.setOption(agentOpt);
        dangerRate1Inst.setOption(dangerRateOpt);
        taskRate1Inst.setOption(taskRateOpt);

        safeRate1Inst.setOption(safeRateOpt);
        // safe1Inst.setOption(safeOpt);

    });
};



</script>

<style scoped lang="scss">
.header {
    text-align: center;
    color: aliceblue;
}

.content {
    height: 250px;
}

.mb-2 {
    // --el-switch-off-color: #13ce66;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    background-color: rgba(255, 255, 255, 0);
}
</style>