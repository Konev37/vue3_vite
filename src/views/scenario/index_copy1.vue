<template>
  <div class="app-container">
    <el-card>
      <div ref="entity" class="content" />
      <el-row style="margin-top: 10px">
        <el-col :span="8">
          <el-button
            type="primary"
            style="margin-left: 100px"
            @click="execTask"
          >
            开始执行任务
          </el-button>
          <el-button type="primary" style="margin-left: 100px" @click="reset">
            重置
          </el-button>
        </el-col>
        <el-col :span="8">
          <el-button
            type="success"
            icon="Plus"
            style="margin-left: 100px"
            @click="addFormDialogVisible = true"
          >
            新增实体
          </el-button>
          <el-button
            type="danger"
            icon="Delete"
            style="margin-left: 100px"
            @click="deleteFormDialogVisible = true"
          >
            删除实体
          </el-button>
        </el-col>
        <el-col :span="8">
          <el-button
            type="info"
            icon="Search"
            style="margin-left: 100px"
            @click="dataDrawer = true"
          >
            数据面板
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog v-model="addFormDialogVisible" title="新增实体">
      <el-form :model="addForm">
        <el-form-item label="实体类型" :label-width="formLabelWidth">
          <el-select v-model="addForm.type" placeholder="请选择实体类型">
            <el-option label="agent" value="agent" />
            <el-option label="普通任务" value="task" />
            <el-option label="辅助任务" value="auxiliaryTask" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="坐标" :label-width="formLabelWidth">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input v-model="addForm.xCoord" placeholder="x坐标" />
            </el-col>
            <el-col :span="12">
              <el-input v-model="addForm.yCoord" placeholder="y坐标" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addFormDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAdd"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="deleteFormDialogVisible" title="删除实体">
      <el-form :model="deleteForm">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="deleteForm.id" placeholder="请输入实体 id" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteFormDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDelete"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-drawer
      v-model="dataDrawer"
      title="数据面板"
      :direction="rtl"
      size="10%"
      @open="loadData"
    >
      <el-table :data="maxTimeTable" stripe border>
        <el-table-column prop="maxTime" label="任务完成时间" />
      </el-table>
    </el-drawer>
  </div>
</template>

<script setup name="SC2">
import { reactive, ref } from "vue";
import * as echarts from "echarts";
import { getEntity, insertEntity, deleteEntity } from "@/api/scenario/entity";
import {
  targetAssignment,
  targetExecution,
  getEntityTables,
  getMaxTime,
} from "@/api/scenario/robot";
// import png from "@/assets/images/taihai.png";
import png from "@/assets/images/san14_copy.png";

const { proxy } = getCurrentInstance();
const entity = ref(null);
const addFormDialogVisible = ref(false);
const deleteFormDialogVisible = ref(false);
const dataDrawer = ref(false);
const formLabelWidth = "140px";

var entityInst, ets, originEts;
var timeTables;
proxy.$modal.loading("正在加载数据，请稍候！");

getEntity().then((entities) => {
  // getEntityTables().then((tables) => {
  console.log(entities);
  // targetAssignment().then((res) => {
  //   console.log(res);
  // })
  // console.log(tables[0]);
  // targetExecution().then((res) => {
  //   console.log(res);
  // })
  // timeTables = tables;
  ets = deepClone(entities);
  // originEts = deepClone(entities);
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
        data: ets,
        // data: tables[0],
      },
    ],
    graphic: [
      {
        type: "image",
        right: "center",
        bottom: "0%",
        z: 0,
        bounding: "all",
        // draggable: true,
        style: {
          image: png,
          width: 1800,
          height: 800,
        },
      },
    ],
  };

  entityInst.setOption(option);
  // });
});
const execTask = async () => {
  // 因为用到了 await 延时函数，所以这里要加async
  proxy.$modal.loading("正在执行算法，请稍候！");
  getEntityTables().then((timeTables) => {
    console.log(timeTables[0]);
    proxy.$modal.closeLoading();
    var dt = 300;
    for (let i = 1; i < timeTables.length; i++) {
      // await sleep(dt);
      // console.log(i * 4)
      setTimeout(() => {
        entityInst.setOption({
          animationDurationUpdate: dt,
          series: [{ data: timeTables[i] }],
        });
      }, dt * i);
    }
  });
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
  proxy.$modal.loading("正在重置数据，请稍候！");
  getEntity().then((ets) => {
    console.log(ets);
    proxy.$modal.closeLoading();
    entityInst.setOption({
      animationDurationUpdate: 0,
      series: [{ data: ets }],
    });
  });
};
const handleAdd = () => {
  // console.log(addForm);
  insertEntity(addForm);
  addFormDialogVisible.value = false;
};
const handleDelete = () => {
  deleteEntity(deleteForm.id);
  deleteFormDialogVisible.value = false;
};

const addForm = reactive({
  type: "",
  xCoord: "",
  yCoord: "",
});
const deleteForm = reactive({
  id: "",
});
const maxTimeTable = ref([])
function loadData() {
  getMaxTime().then((res) => {
    maxTimeTable.value.length = 0;
    var value = {maxTime: res};
    maxTimeTable.value.push(value);
  })
}

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
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
