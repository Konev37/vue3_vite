<template>
  <div class="app-container">
    <el-card>
      <div ref="entity" class="content" />
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

<script setup name="SC2">
import { ref } from "vue";
import * as echarts from "echarts";
import { getEntity } from "@/api/scenario/entity";
import { targetAssignment, targetExecution, getEntityTables } from "@/api/scenario/robot";
import png from "@/assets/images/taihai.png";

const { proxy } = getCurrentInstance();
const entity = ref(null);

var entityInst, ets, originEts;
var timeTables;
proxy.$modal.loading("正在加载数据，请稍候！");

getEntity().then((entities) => {
  getEntityTables().then((tables) => {
    // console.log(entities);
    // targetAssignment().then((res) => {
    //   console.log(res);
    // })
    targetExecution().then((res) => {
      console.log(res);
    })
    // console.log(tables[0]);
    timeTables = tables;
    ets = deepClone(entities);
    originEts = deepClone(entities);
    entityInst = echarts.init(entity.value, "macarons");
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
          // data: ets,
          data: tables[0],
        },
      ],
      graphic: [
        {
          type: "image",
          right: "center",
          bottom: "0%",
          z: 0,
          bounding: "all",
          style: {
            image: png,
            width: 1800,
            height: 800,
          },
        },
      ],
    };

    entityInst.setOption(option);
  });
});
const execTask = async () => {
  // 因为延时函数，所以这里要加async
  var dt = 300;
  for (let i = 1; i < timeTables.length; i++) {
    await sleep(dt);
    // console.log(i * 4)
    entityInst.setOption({
      animationDurationUpdate: dt,
      series: [{ data: timeTables[i] }],
    });
  }
  // ets = deepClone(originEts);
  // entityInst.setOption({
  //   animationDurationUpdate: 0,
  //   series: [{ data: ets }],
  // });
  // /**时间戳版本 */
  // ets[0].x = ets[9].x - 50;
  // ets[0].y = ets[9].y;
  // ets[1].x = ets[4].x - 50;
  // ets[1].y = ets[4].y;
  // ets[2].x = 800 - 50;
  // ets[2].y = 750;
  // entityInst.setOption({
  //   animationDurationUpdate: 2000,
  //   series: [{ data: ets }],
  // });

  // await sleep(2000);
  // ets[9].symbolSize -= 25;
  // ets[4].symbolSize = 0;
  // ets[2].x = ets[7].x - 50;
  // ets[2].y = ets[7].y;
  // entityInst.setOption({
  //   animationDurationUpdate: 1000,
  //   series: [{ data: ets }],
  // });

  // await sleep(1000);
  // ets[9].symbolSize -= 25;
  // ets[7].symbolSize -= 50;
  // ets[1].x = ets[6].x - 50;
  // ets[1].y = ets[6].y;
  // entityInst.setOption({
  //   animationDurationUpdate: 1000,
  //   series: [{ data: ets }],
  // });

  // await sleep(1000);
  // ets[8].itemStyle.borderColor = "rgba(255, 153, 18, 0)";
  // ets[0].x = ets[5].x - 50;
  // ets[0].y = ets[5].y;
  // ets[6].symbolSize -= 50;
  // // ets[2].x = 800;
  // // ets[2].y = 650;
  // entityInst.setOption({
  //   animationDurationUpdate: 1000,
  //   series: [{ data: ets }],
  // });

  // await sleep(1000);
  // ets[8].symbolSize = 0; // 擦屁股
  // ets[1].x = ets[3].x + 50;
  // ets[1].y = ets[3].y;
  // ets[5].symbolSize -= 30;
  // entityInst.setOption({
  //   animationDurationUpdate: 600,
  //   series: [{ data: ets }],
  // });

  // await sleep(600);
  // ets[5].symbolSize -= 20;
  // ets[3].symbolSize -= 20;
  // entityInst.setOption({
  //   animationDurationUpdate: 400,
  //   series: [{ data: ets }],
  // });

  // await sleep(400);
  // ets[3].symbolSize -= 30;
  // entityInst.setOption({
  //   animationDurationUpdate: 600,
  //   series: [{ data: ets }],
  // });
};
const reset = () => {
  entityInst.setOption({
    animationDurationUpdate: 0,
    series: [{ data: originEts }],
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
