<template>
  <div class="app-container">
    <el-card>
      <div ref="uav" class="content" />
      <el-row>
        <el-col :span="12">
          <el-button
            type="primary"
            style="margin-left: 50px; margin-bottom: 2px"
            @click="execTask"
          >
            开始执行任务
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            style="margin-left: 50px; margin-bottom: 2px"
            @click="reset"
          >
            重置
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup name="SC1">
import { ref } from "vue";
import * as echarts from "echarts";
import { getEntity } from "@/api/scenario/entity";
import { getUav } from "@/api/scenario/uav";
import taiwan from "@/assets/images/1669800505208.png"


const { proxy } = getCurrentInstance();
const entity = ref(null);
const uav = ref(null);
var uavInst, uavs, originUavs;
var entityInst, ets, originEts;
proxy.$modal.loading("正在加载数据，请稍候！");

// getEntity().then((res) => {
//   console.log(res);
//   ets = deepClone(res);
//   originEts = deepClone(res);
//   entityInst = echarts.init(entity.value, "macarons");
//   proxy.$modal.closeLoading();
//   var option = {
//     // title: {
//     //   text: "Basic Graph",
//     // },
//     tooltip: {},
//     animationDurationUpdate: 1500,
//     animationEasingUpdate: "linear",
//     series: [
//       {
//         type: "graph",
//         layout: "none",
//         roam: true, //是否开启鼠标缩放和平移漫游
//         nodeScaleRatio: 1, //鼠标漫游缩放时节点的相应缩放比例
//         label: {
//           show: true,
//         },
//         data: ets,
//       },
//     ],
//     graphic: {
//           elements: [
//             {
//               type: "image",
//               style: {
//                 image: taiwan,
//                 width: 1100,
//                 height: 620,
//               },
//               left: "center",
//               top: "5%",
//             },
//           ],
//         },
//   };

//   entityInst.setOption(option);
// });

getUav().then((res) => {
  console.log(res);
  uavs = deepClone(res);
  uavs[9].symbolSize = 0;
  uavs[8].symbolSize = 0;
  // console.log(uavs[0].itemStyle);
  // console.log(uavs[1].itemStyle);
  
  // console.log(uavs[8].itemStyle);
  // console.log(uavs[9].itemStyle);
  // uavs[9].itemStyle= {borderColor: null, color: 'rgb(255, 153, 18)'}
  originUavs = deepClone(res);
  originUavs[9].symbolSize = 0;
  originUavs[8].symbolSize = 0;
  uavInst = echarts.init(uav.value, "macarons");
  proxy.$modal.closeLoading();
  var option = {
    // title: {
    //   text: "Basic Graph",
    // },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: "linear",
    series: [
      {
        type: "graph",
        layout: "none",
        roam: true, //是否开启鼠标缩放和平移漫游
        nodeScaleRatio: 1, //鼠标漫游缩放时节点的相应缩放比例
        label: {
          show: true,
        },
        data: uavs,
      },
    ],
    graphic: {
          elements: [
            {
              type: "image",
              style: {
                image: taiwan,
                width: 1260,
                height: 780,
              },
              left: "center",
              top: "0%",
            },
          ],
        },
  }; 

  uavInst.setOption(option);
});
// const execTask = async () => {
//   ets = deepClone(originEts);
//   // 因为延时函数，所以这里要加async
//   ets[0].x = ets[9].x - 50;
//   ets[0].y = ets[9].y;
//   ets[1].x = ets[4].x - 50;
//   ets[1].y = ets[4].y;
//   ets[2].x = 700 - 50;
//   ets[2].y = 800;
//   entityInst.setOption({
//     animationDurationUpdate: 1500,
//     series: [{ data: ets }],
//   });

//   await sleep(1500);
//   ets[9].symbolSize -= 25;
//   ets[4].symbolSize = 0;
//   ets[2].x = ets[7].x - 50;
//   ets[2].y = ets[7].y;
//   entityInst.setOption({
//     animationDurationUpdate: 1000,
//     series: [{ data: ets }],
//   });

//   await sleep(1000);
//   ets[9].symbolSize -= 25;
//   ets[7].symbolSize -= 50;
//   ets[1].x = ets[6].x - 50;
//   ets[1].y = ets[6].y;
//   entityInst.setOption({
//     animationDurationUpdate: 1000,
//     series: [{ data: ets }],
//   });

//   await sleep(1000);
//   ets[8].itemStyle.borderColor = "rgba(255, 153, 18, 0)"
//   ets[0].x = ets[5].x - 50;
//   ets[0].y = ets[5].y;
//   ets[6].symbolSize -= 50;
//   // ets[2].x = 800;
//   // ets[2].y = 650;
//   entityInst.setOption({
//     animationDurationUpdate: 1000,
//     series: [{ data: ets }],
//   });

//   await sleep(1000);
//   ets[1].x = ets[3].x + 50;
//   ets[1].y = ets[3].y;
//   ets[5].symbolSize -= 30;
//   entityInst.setOption({
//     animationDurationUpdate: 600,
//     series: [{ data: ets }],
//   });

//   await sleep(600);
//   ets[5].symbolSize -= 20;
//   ets[3].symbolSize -= 20;
//   entityInst.setOption({
//     animationDurationUpdate: 400,
//     series: [{ data: ets }],
//   });

//   await sleep(400);
//   ets[3].symbolSize -= 30;
//   entityInst.setOption({
//     animationDurationUpdate: 600,
//     series: [{ data: ets }],
//   });
// };
const execTask = async () => {
  uavs = deepClone(originUavs);
  // 因为延时函数，所以这里要加async
  uavs[1].x = uavs[1].x + 110;
  uavs[1].y = uavs[1].y + 50;
  uavs[2].x = uavs[2].x + 290;
  uavs[2].y = uavs[2].y + 60;
  uavs[11].x = uavs[11].x + 260;
  uavs[11].y = uavs[11].y + 70;
  uavs[16].x = uavs[16].x + 100;  
  uavs[16].y = uavs[16].y - 40;
  uavs[17].x = uavs[17].x + 90;
  uavs[17].y = uavs[17].y - 60;
  uavs[18].x = uavs[18].x + 70;
  uavs[15].x = uavs[15].x + 50;
  uavs[15].y = uavs[15].y + 60;
  uavs[10].x = uavs[10].x + 50;
  uavs[10].y = uavs[10].y + 50;
  uavs[3].x = uavs[3].x - 40;
  uavs[3].y = uavs[3].y - 150;
  uavs[4].x = uavs[4].x - 50;
  uavs[4].y = uavs[4].y - 180;
  uavs[12].x = uavs[12].x + 90;
  uavs[12].y = uavs[12].y - 60;
  uavs[13].x = uavs[13].x + 70;
  uavs[13].y = uavs[13].y - 60;
  uavs[14].x = uavs[14].x + 50;
  uavs[14].y = uavs[14].y - 50;
  uavs[5].x = uavs[5].x - 70;
  uavs[5].y = uavs[5].y - 60;
  uavs[6].x = uavs[6].x - 50;
  uavs[6].y = uavs[6].y + 50;
  
  // ets[0].x = ets[9].x - 50;
  // ets[0].y = ets[9].y;
  // ets[1].x = ets[4].x - 50;
  // ets[1].y = ets[4].y;
  // ets[2].x = 700 - 50;
  // ets[2].y = 800;
  uavInst.setOption({
    animationDurationUpdate: 1500,
    series: [{ data: uavs }],
  });

  await sleep(1500);
  uavs[9].symbolSize += 50;
  uavs[8].symbolSize += 50;
  
  uavInst.setOption({
    animationDurationUpdate: 1000,
    series: [{ data: uavs }],
  });

  await sleep(1500);
  uavs[2].x = uavs[2].x + 60;
  uavs[2].y = uavs[2].y - 40;
  uavs[16].x = uavs[16].x + 100;
  uavs[16].y = uavs[16].y + 175;
  uavs[4].x = uavs[4].x - 70;
  uavs[4].y = uavs[4].y + 145;
  uavs[14].x = uavs[14].x - 215;
  uavs[14].y = uavs[14].y + 85;
  uavs[11].itemStyle= {borderColor: null, color: 'rgb(0, 0, 0)'};
  uavs[2].itemStyle= {borderColor: null, color: 'rgb(0, 0, 0)'};
  uavs[16].itemStyle= {borderColor: null, color: 'rgb(0, 0, 0)'};
  uavs[4].itemStyle= {borderColor: null, color: 'rgb(0, 0, 0)'};
  uavs[14].itemStyle= {borderColor: null, color: 'rgb(0, 0, 0)'};
  uavInst.setOption({
    animationDurationUpdate: 1000,
    series: [{ data: uavs }],
  });

  await sleep(1000);
  uavs[9].symbolSize -= 50;
  uavs[8].symbolSize -= 50;
  
  uavInst.setOption({
    animationDurationUpdate: 1000,
    series: [{ data: uavs }],
  });

  await sleep(1000);
  ets[8].itemStyle.borderColor = "rgba(255, 153, 18, 0)"
  ets[0].x = ets[5].x - 50;
  ets[0].y = ets[5].y;
  ets[6].symbolSize -= 50;
  // ets[2].x = 800;
  // ets[2].y = 650;
  entityInst.setOption({
    animationDurationUpdate: 1000,
    series: [{ data: ets }],
  });

  await sleep(1000);
  ets[1].x = ets[3].x + 50;
  ets[1].y = ets[3].y;
  ets[5].symbolSize -= 30;
  entityInst.setOption({
    animationDurationUpdate: 600,
    series: [{ data: ets }],
  });

  await sleep(600);
  ets[5].symbolSize -= 20;
  ets[3].symbolSize -= 20;
  entityInst.setOption({
    animationDurationUpdate: 400,
    series: [{ data: ets }],
  });

  await sleep(400);
  ets[3].symbolSize -= 30;
  entityInst.setOption({
    animationDurationUpdate: 600,
    series: [{ data: ets }],
  });
};
const reset = () => {
  uavInst.setOption({
    animationDurationUpdate: 0,
    series: [{ data: originUavs }],
  });
};

function deepClone(obj) {
  var _obj = JSON.stringify(obj); //  对象转成字符串
  var objClone = JSON.parse(_obj); //  字符串转成对象
  return objClone;
}
const sleep = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};
</script>

<style scoped lang="scss">
.header {
  text-align: center;
}
.content {
  height: 800px;
}
</style>
