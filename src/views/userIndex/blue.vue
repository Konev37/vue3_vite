<template>
    <div class="blue">

        <el-card class="card">
            <template #header>
                <!-- <span style="color:#FFFFFF;">环境态势&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> -->
                <span style="color:#FFFFFF;">资源态势&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span style="color:#FFFFFF;">红方态势评估&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span style="color:#409EFF;">蓝方态势评估</span>
            </template>
            <el-row :gutter="24">
                <el-col :span="12">
                    <h1 class="header">敌方部署威胁等级</h1>
                    <div ref="danger2" class="content" />
                </el-col>
                <el-col :span="12">
                    <h1 class="header">我方协同资源使用率</h1>
                    <div ref="agent2" class="content" />
                </el-col>

            </el-row>
            <el-row :gutter="24">

                <el-col :span="8">
                    <h1 class="header">我方资源被打击概率</h1>
                    <div ref="dangerRate2" class="content" />
                </el-col>
                <el-col :span="8">
                    <h1 class="header">协同任务完成度</h1>
                    <div ref="taskRate2" class="content" />
                </el-col>
                <el-col :span="8">
                    <h1 class="header">全区域安全系数</h1>
                    <div ref="safeRate2" class="content" />
                </el-col>
                <!-- <el-col :span="6">
                    <h1 class="header">实时态势安全评价</h1>
                    <div ref="safe2" class="content" />
                </el-col> -->
            </el-row>

        </el-card>
    </div>
</template>

<script script setup name="Blue">
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





//蓝方
// const { proxy } = getCurrentInstance();
const danger2 = ref(null);
const agent2 = ref(null);
const dangerRate2 = ref(null);
const taskRate2 = ref(null);
const safeRate2 = ref(null);
const safe2 = ref(null);
var danger2Inst, agent2Inst;
var dangerRate2Inst, taskRate2Inst, safeRate2Inst, safe2Inst;


var dangerOpt = {
    xAxis: {
        type: 'category',
        axisLabel: {
            textStyle: {
                color: '#ffffff'
            },
        },
        data: ['轰炸机', '舰载机', '航母', '舰载导弹']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            textStyle: {
                color: '#ffffff'
            },
        },
    },
    series: [
        {
            data: [3, 1, 5, 2],
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
            textStyle: {
                color: '#ffffff'
            },
        },

    },
    radiusAxis: {
        type: 'category',
        data: ['坦克', '雷达', '导弹塔', '战斗机', '驱逐舰']
    },
    tooltip: {},
    series: {
        type: 'bar',
        data: [66, 39, 10, 80, 44],
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
                source: [
                    [
                        ["轰炸机",43.3, 85.8, 93.7],
                        ["舰载机", 83.1, 73.4, 55.1],
                        ["导弹", 86.4, 65.2, 82.5],
                        ["航母", 72.4, 53.9, 39.1],
                    ],
                ],
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

var year = [];
for(let i = 39; i>0; i--){
    year.push(i);
}
var data = [
    [431, 550, 878, 989, 351, 391, 508, 1000],
    [428, 521, 868, 950, 335, 377, 506, 996],
    [422, 512, 867, 936, 316, 367, 502, 986],
    [423, 502, 867, 936, 299, 354, 478, 965],
    [411, 486, 850, 915, 300, 355, 461, 931],
    [409, 478, 837, 889, 285, 370, 458, 909],
    [405, 462, 828, 879, 271, 380, 443, 805],
    [407, 452, 801, 872, 261, 376, 430, 802],
    [400, 462, 790, 868, 253, 356, 430, 783],
    [384, 454, 790, 839, 254, 346, 420, 770],
    [372, 452, 770, 823, 259, 347, 394, 732],
    [359, 448, 770, 802, 240, 349, 394, 653],
    [357, 460, 751, 761, 230, 364, 365, 656],
    [343, 444, 735, 733, 226, 353, 363, 510],
    [331, 453, 722, 718, 225, 364, 339, 556],
    [312, 424, 717, 702, 226, 339, 325, 537],
    [307, 407, 713, 674, 220, 336, 314, 450],
    [300, 409, 686, 661, 211, 308, 312, 474],
    [298, 380, 664, 633, 192, 298, 309, 360],
    [282, 377, 657, 621, 181, 280, 289, 381],
    [279, 367, 646, 578, 178, 264, 285, 382],
    [280, 361, 645, 572, 172, 278, 278, 282],
    [276, 359, 641, 545, 171, 274, 278, 293],
    [261, 348, 629, 527, 168, 256, 263, 210],
    [258, 332, 601, 512, 156, 244, 243, 197],
    [238, 313, 601, 467, 151, 225, 237, 191],
    [227, 286, 594, 424, 137, 201, 237, 188],
    [226, 287, 571, 411, 127, 200, 210, 186],
    [230, 274, 548, 381, 120, 178, 201, 166],
    [218, 262, 541, 334, 103, 188, 187, 121],
    [205, 260, 525, 330, 93, 162, 187, 100],
    [190, 264, 502, 295, 86, 161, 186, 90],
    [173, 236, 473, 292, 76, 140, 159, 88],
    [162, 215, 453, 251, 68, 113, 140, 80],
    [159, 192, 444, 210, 71, 89, 134, 60],
    [140, 198, 434, 206, 64, 99, 123, 40],
    [120, 213, 420, 206, 52, 83, 108, 20],
    [119, 192, 413, 193, 47, 90, 82, 11],
    [120, 206, 392, 150, 45, 60, 80, 4],
];
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
            "轰炸机",
            "舰载机",
            "t3",
            "t4",
            "t5",
            "t6",
            "t7",
            "t8",
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
            data: [12, 20.6, 39.2, 15],
        },
    ],
    animationDuration: 0,
    animationDurationUpdate: 500,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
};

var safeRateOpt = {
    tooltip: {
        trigger: "axis",
    },
    legend: {
        data: ["轰炸机", "舰载机", "舰载导弹"],
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
        name: "安全度",
        type: "value",
        axisLabel: {
            textStyle: {
                color: '#ffffff'
            },
        },
    },
    series: [
        {
            name: "轰炸机",
            type: "line",
            // stack: "Total",
            data: [32.0, 23.2, 16.1, 18.4, 4.0],
        },
        {
            name: "舰载机",
            type: "line",
            // stack: "Total",
            data: [12.0, 28.2, 29.1, 13.4, 19.0, 23.0],
        },
        {
            name: "舰载导弹",
            type: "line",
            // stack: "Total",
            data: [25.0, 13.2, 10.1, 25.4, 9.0, 23.0],
        },
    ],
};

var safeOpt = {
    // title: {
    //   text: 'Basic Radar Chart'
    // },
    legend: {
        data: ["因素1", "因素2"],
    },
    tooltip: {
        trigger: "item",
    },
    radar: {
        // shape: 'circle',
        indicator: [
            { name: "资源协同", max: 65 },
            { name: "攻击", max: 160 },
            { name: "通讯", max: 300 },
            { name: "防御", max: 380 },
            { name: "地理", max: 520 },
            { name: "电磁", max: 250 },
        ],
    },
    series: [
        {
            name: "Budget vs spending",
            type: "radar",
            data: [
                {
                    value: [22, 80, 100, 380, 340, 200],
                    // name: "因素1",
                },
                // {
                //   value: [50, 140, 280, 260, 420, 210],
                //   name: "因素2",
                // },
            ],
        },
    ],
};
getCache().then(() => {

    proxy.$modal.loading("正在加载模式数据，请稍候！");
    danger2Inst = echarts.init(danger2.value, "macarons");
    agent2Inst = echarts.init(agent2.value, "macarons");
    dangerRate2Inst = echarts.init(dangerRate2.value, "macarons");
    taskRate2Inst = echarts.init(taskRate2.value, "macarons");
    safeRate2Inst = echarts.init(safeRate2.value, "macarons");
    // safe2Inst = echarts.init(safe2.value, "macarons");
    proxy.$modal.closeLoading();





    danger2Inst.setOption(dangerOpt);
    agent2Inst.setOption(agentOpt);
    dangerRate2Inst.setOption(dangerRateOpt);
    taskRate2Inst.setOption(taskRateOpt);
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[data.length - i - 1].length; j++) {
            data[data.length - i - 1][j] = data[data.length - i - 1][j] / 10;
        }
        setTimeout(function () {
            var smalloption = {
                title:{
                    text:year[data.length - i - 1].toString()+"时刻任务完成率"
                },
                series: [
                    {
                        data: data[data.length - i - 1],
                    },
                ],
            };
            // console.log(option1);
            taskRate2Inst.setOption(smalloption);
        }, 500 * i);
    }
    safeRate2Inst.setOption(safeRateOpt);
    // safe2Inst.setOption(safeOpt);

});


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

.card{
  background-color: rgba(255, 255, 255, 0 );
}
</style>