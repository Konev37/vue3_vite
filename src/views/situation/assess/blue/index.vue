<template>
    <div class="blue">

        <el-card>
            <el-row :gutter="20">
                <el-col :span="10">
                    <h1 class="header">敌方部署威胁等级</h1>
                    <div ref="danger2" class="content" />
                </el-col>
                <el-col :span="10">
                    <h1 class="header">我方协同资源使用率</h1>
                    <div ref="agent2" class="content" />
                </el-col>

            </el-row>
            <el-row :gutter="24">

                <el-col :span="6">
                    <h1 class="header">设施被打击概率</h1>
                    <div ref="dangerRate2" class="content" />
                </el-col>
                <el-col :span="6">
                    <h1 class="header">协同任务完成度</h1>
                    <div ref="taskRate2" class="content" />
                </el-col>
                <el-col :span="6">
                    <h1 class="header">全区域安全系数</h1>
                    <div ref="safeRate2" class="content" />
                </el-col>
                <el-col :span="6">
                    <h1 class="header">实时态势安全评价</h1>
                    <div ref="safe2" class="content" />
                </el-col>
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
        data: ['威胁源1', '威胁源2', '威胁源3', '威胁源4', '威胁源5', '威胁源6', '威胁源7']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [3, 1, 5, 2, 1, 2, 4],
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
            formatter: '{value} %'
        },

    },
    radiusAxis: {
        type: 'category',
        data: ['a', 'b', 'c', 'd']
    },
    tooltip: {},
    series: {
        type: 'bar',
        data: [66, 39, 10, 80],
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
        dimensions: ["value", "危险类别1", "危险类别2", "危险类别3"],
        source: [
            {
                value: "设施1",
                危险类别1: 53.3,
                危险类别2: 25.8,
                危险类别3: 63.7,
            },
            {
                value: "设施2",
                危险类别1: 33.1,
                危险类别2: 63.4,
                危险类别3: 85.1,
            },
            {
                value: "设施3",
                危险类别1: 36.4,
                危险类别2: 55.2,
                危险类别3: 62.5,
            },
            {
                value: "设施4",
                危险类别1: 22.4,
                危险类别2: 53.9,
                危险类别3: 79.1,
            },
        ],
    },
    xAxis: { type: "category" },
    yAxis: {
        name: "被打击概率",
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
};

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
var taskRateOpt = {
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

var safeRateOpt = {
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
        data: ["区域1", "区域2", "区域3", "区域4", "区域5"],
    },
    yAxis: {
        name: "安全度",
        type: "value",
    },
    series: [
        {
            name: "因素1",
            type: "line",
            // stack: "Total",
            data: [32.0, 23.2, 16.1, 18.4, 4.0, 13.0, 14.0],
        },
        {
            name: "因素2",
            type: "line",
            // stack: "Total",
            data: [12.0, 28.2, 29.1, 13.4, 19.0, 23.0, 11.0],
        },
        {
            name: "因素3",
            type: "line",
            // stack: "Total",
            data: [25.0, 13.2, 10.1, 25.4, 9.0, 23.0, 17.0],
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
            { name: "地理环境", max: 520 },
            { name: "电磁环境", max: 250 },
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
    safe2Inst = echarts.init(safe2.value, "macarons");
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
                title: {
                    text: year[data.length - i - 1].toString() + "时刻任务完成率",
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
    safe2Inst.setOption(safeOpt);

});


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