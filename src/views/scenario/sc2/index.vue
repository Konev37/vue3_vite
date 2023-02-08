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
import {
  getEntity,
  getGeoEntity,
  insertEntity,
  deleteEntity,
} from "@/api/scenario/entity";
import {
  targetAssignment,
  targetExecution,
  getGeoEntityTables,
  getMaxTime,
} from "@/api/scenario/robot";
import svgUrl from "@/assets/images/san14.svg";

const { proxy } = getCurrentInstance();
const entity = ref(null);
const addFormDialogVisible = ref(false);
const deleteFormDialogVisible = ref(false);
const dataDrawer = ref(false);
const formLabelWidth = "140px";

var entityInst;
var size = 50;
var symbol = [
  "path://M93.499,302.682c-1.376-0.072-2.833-0.144-4.218-0.216c-4.371-1.025-9.273-1.178-13.222-2.213    c-1.106-0.125-2.212-0.279-3.318-0.413c-1.809-0.684-3.742-2.348-5.469-2.905c-7.42,0-14.822,0-22.297,0    c-0.414-0.352-0.836-0.765-1.313-1.106c0-6.368,0-12.736,0-19.176c0-2.771-0.341-6.584,0.702-8.383c7.537,0,15.074,0,22.692,0    c2.977-0.684,6.377-0.756,9.695-1.52c2.078-0.477,4.569-1.034,7.052-1.106c-0.891-0.558-3.318-0.216-4.632-0.216    c-4.084,0-8.581-0.055-12.395,0.216c-0.558-0.558-1.447-1.313-2.141-1.735c0-3.877,0-7.691,0-11.487    c-1.106-3.391-3.679-6.854-5.055-10.109c-3.732-8.438-8.104-16.478-11.701-24.716c-2.563-5.738-5.459-11.136-7.96-16.748    c-1.313-2.968-2.284-6.494-4.155-8.994c0-0.072,0-0.135,0-0.216c12.115,0,24.239,0,36.346,0c0.765,0.288,1.394,1.395,2.006,1.943    c1.529,1.511,3.318,3.327,5.055,4.641c4.982,3.796,9.075,8.508,14.058,12.322c1.448,1.106,2.555,2.896,4.003,4.011    c10.667,8.023,19.319,18.547,29.978,26.659c3.184,2.42,5.747,5.666,9.003,8.086c0.558,0.621,1.034,1.179,1.583,1.808    c1.529,1.035,3.813,0.9,5.685,1.529c4.362,1.448,8.932,2.482,13.5,3.939c9.21,3.113,19.032,6.017,28.377,8.653    c56.835,1.727,143.912-25.543,187.805,1.521c2.77,1.735,5.539,3.534,8.363,5.262c0.9,0.629,2.033,1.87,3.059,2.212    c2.627,0.288,5.271,0.63,7.951,0.899c6.529,1.602,12.951,1.809,19.193,3.526c4.838,1.313,9.678,2.635,14.535,3.948    c2.338,0.701,4.496,0.701,6.836,1.601c4.154,1.521,8.58,3.185,12.754,5.055c1.852,0.765,4.01,2.213,5.936,2.833l24.445,2.906    l-142.107,1.033c0.971,0.766,5.18,1.673,6.637,1.809c-0.143,0.351-0.072,0.206-0.27,0.422c-0.846,0.747-5.199,2.069-6.584,2.213    c0,0.054,0,0.126,0,0.207c-0.053,0-0.125,0-0.215,0c0,2.42,0,4.974-0.414,7.061c-0.27,1.241,0.287,2.896-0.27,3.732    c-0.072,1.106-0.289,1.241-0.631,2.006c-1.51,0-2.967,0-4.424,0c-0.072,0.485-0.072,0.63-0.199,0.899    c0,0.702-0.07,1.106-0.215,1.528c-2.627,0.127-3.238-0.558-3.525-2.635c-1.799,0-3.525,0-5.326,0v6.305h-45.617v-5.891    c0.27-0.342,1.24-0.765,1.582-1.106c0.072,0,0.145,0,0.217,0c0-0.072,0-0.135,0-0.207c-88.274-0.278-51.848-1.79-111.731-3.948    c-2.212,2.356-5.333,4.021-7.969,5.954c-2.482,1.871-4.767,4.497-7.681,5.954c-0.558,0.279-5.189-1.241-6.161-1.592    c-6.359-1.583-12.664-3.184-18.96-4.848c0-2.914,0-5.882,0-8.788C111.435,305.029,102.287,304.679,93.499,302.682L93.499,302.682z",
  "path://M25,286c0-1.4,22.7-3,25.6-3c-53.8-18,36.3-37.4,46.8-41.3c28.8-14.4,57.1-4.4,86.7,1.2 c40.2,8.1,115.2,5.8,164.9,6.3c4.2-1.3,29.6-8.4,30.9-9.3c5.3-6.1,65.6-61,68.9-62.4c3.4,0,38.1-0.2,38.1,0.2 c-2.5,3.3-28.9,59.3-30.2,63.5v8.1h3.1l-0.2,8.6H478l-0.7,30H454l-57.8,8.6v9.3l-26.3,6.6c-4.2-3.2-13.4-9.1-16.4-12.5 c-13.1,0.5-26.2,1-39.3,1.4v8.8c6,0.1,10.9,5,10.9,10.9c0,6.1-4.9,11-11,11c-6,0-10.9-4.9-10.9-11c0-2.6,1-5.1,2.6-7l-6.3-5.8 l-34.6-1.8v-3l-28.2,0.5l1.6,1.6c0,3.3,0,6.5,0,9.8l-3,3.9l-30.1,0.3v1.4c1.9,1.3,3.1,3.5,3.1,6c0,4.1-3.3,7.5-7.4,7.5 s-7.4-3.4-7.4-7.5c0-2.8,1.5-5.3,3.9-6.5c0.2-0.3,0.2-0.6,0.2-1c-1.6,0-3.1,0.3-4.2,0.2c-1-1.6-0.7-5-0.7-7.6c-0.8,0-1.5,0-2.3,0 c0-2.4,0-4.6,0-6.9c-1.9,0-3.7,0-5.5,0c-0.3,2.2-1,2.9-3.7,2.8c-0.1-0.4-0.2-0.9-0.2-1.7c-0.2-0.3-0.2-0.3-0.2-0.9 c-1.6,0-3.1,0-4.7,0l-1.4-10.6L25,286z M309.1,308.4c-1.4,0-2.8,0-4.2,0l3.4,3.5l0.8-0.4V308.4z",
  "path://M299.447,442.711h-24.995v-75.823    c0-17.948-5.313-35.492-15.255-50.462l-3.318-5.043l-3.382,5.043c-9.95,14.97-15.254,32.514-15.254,50.462v75.823h-24.995    c-8.155,0-14.705-6.628-14.705-14.787V187.308l3.441-1.727c34.527-17.325,75.199-17.325,109.719,0l3.523,1.727v-4.622    c0-1.39-0.071-2.768-0.071-4.08l-3.452-1.724c-34.52-17.327-75.192-17.327-109.719,0l-3.512,1.724v-4.622    c0-44.396,14.087-87.691,40.246-123.59l1.174-1.59c8.361-11.535,25.542-11.535,33.98,0l1.097,1.59    c26.166,35.899,40.257,79.194,40.257,123.59v4.622h-0.071c0,1.312,0.071,2.69,0.071,4.08v130.145l34.587,27.756    c5.809,4.556,9.112,11.6,9.112,18.991v29.626c0.07,13.385-10.833,24.296-24.296,24.296h-19.403v14.424    C314.227,436.083,307.587,442.711,299.447,442.711L299.447,442.711z M197.472,413.5h-19.407c-13.47,0-24.296-10.911-24.296-24.296    v-29.626c0-7.392,3.303-14.436,9.105-18.991l34.598-27.756V413.5L197.472,413.5z M255.879,318.7L255.879,318.7    c-9.528,14.293-14.637,30.999-14.637,48.188v95.769c0,5.11,4.141,9.188,9.19,9.188h10.833c5.039,0,9.18-4.077,9.18-9.188v-95.769    C270.445,349.699,265.343,332.993,255.879,318.7L255.879,318.7z",
];
var color = ["rgb(255, 0, 0)", "rgb(64, 224, 208)", "rgb(0, 255, 0)"];
var circleColor = ["rgba(0, 255, 0, 0)", "rgb(0, 255, 0)"];

proxy.$modal.loading("正在加载数据，请稍候！");
getGeoEntity().then((gEt) => {
  console.log(gEt);
  getEntity().then((ets) => {
    console.log(ets);
  });
  entityInst = echarts.init(entity.value, "macarons");
  fetch(svgUrl)
    .then((response) => response.text())
    .then((svgText) => {
      echarts.registerMap("san14", { svg: svgText });
      proxy.$modal.closeLoading();
      var option = {
        tooltip: {},
        // animationDurationUpdate: 1500,
        animationEasingUpdate: "linear",
        geo: {
          tooltip: {
            show: true, //是否显示提示框
            formatter: (params) => {
              if (params.value[2] == 0) {
                return (
                  "id: " +
                  params.value[4].toString() +
                  "<br>坐标: (" +
                  params.value[0].toString() +
                  ", " +
                  params.value[1].toString() +
                  ")" + 
                  "<br>agent能力: " + 
                  params.value[3].toString()
                );
              } else if (params.value[2] == 1 || params.value[2] == 2) {
                return (
                  "id: " +
                  params.value[4].toString() +
                  "<br>坐标：(" +
                  params.value[0].toString() +
                  ", " +
                  params.value[1].toString() +
                  ")" + 
                  "<br>任务大小: " + 
                  params.value[3].toString()
                );
              }
            },
          },
          map: "san14",
          roam: "move",
          // nodeScaleRatio: 1, //鼠标漫游缩放时节点的相应缩放比例
          zoom: 1.4,
          lable: {},
        },
        series: {
          type: "effectScatter",
          // type: "graph",
          roam: true,
          // nodeScaleRatio: 1, //鼠标漫游缩放时节点的相应缩放比例
          coordinateSystem: "geo",
          geoIndex: 0,
          rippleEffect: {
            number: 0, //涟漪波纹数量
          },
          symbol: function (params) {
            if (params[2] != 4) {
              return symbol[params[2]];
            }
          },
          symbolSize: function (params) {
            if (params[2] == 0 || params[2] == 1) {
              return [(params[3] / size) * 80, (params[3] / size) * 30];
            } else if (params[2] == 2) {
              return [(params[3] / size) * 30, (params[3] / size) * 60];
            } else if (params[2] == 4) {
              return params[3];
            }
          },
          // symbol: png,
          itemStyle: {
            color: function (params) {
              // console.log(params);
              if (params.data[2] != 4) {
                return color[params.data[2]];
              } else if (params.data[2] == 4) {
                return circleColor[0];
              }
            },
            borderColor: circleColor[1],
          },
          // encode: {
          //   // tooltip: 3, //显示 data 中数据项的索引
          //   // tooltip: {
          //   //   trigger: "item",
          //   //   formatter: (params) => {
          //   //     return params[3];
          //   //   },
          //   // },
          // },
          data: gEt,
          // [x, y, symbol(type), size, id(辅助任务边界没有id)]
          // [
          //   [488.2358421078053, 459.70913833075736, 0, 50],
          //   [770.3415644319939, 757.9672194986475, 1, 50],
          //   [1180.0329284196291, 743.6141808346214, 1, 50],
          //   [894.03790632245, 1188.1985153835008, 0, 50],
          //   [1372.98925630313, 477.3839988649537, 2, 50],
          //   [1372.98925630313, 477.3839988649537, 4, 500],
          //   [1378.62251255796, 935.6708486282843, 0, 50],
          // ],
        },
      };
      entityInst.setOption(option);
    });
});

const execTask = async () => {
  // 因为用到了 await 延时函数，所以这里要加async
  proxy.$modal.loading("正在执行算法，请稍候！");
  getGeoEntityTables().then((timeTables) => {
    console.log(timeTables[0]);
    proxy.$modal.closeLoading();
    var dt = 300;
    for (let i = 1; i < timeTables.length; i++) {
      // await sleep(dt);
      // console.log(i * 6)
      setTimeout(() => {
        entityInst.setOption({
          animationDurationUpdate: dt,
          series: [{ data: timeTables[i] }],
        });
      }, dt * i);
    }
  });
};
const reset = () => {
  proxy.$modal.loading("正在重置数据，请稍候！");
  getGeoEntity().then((gEt) => {
    console.log(gEt);
    proxy.$modal.closeLoading();
    entityInst.setOption({
      animationDurationUpdate: 0,
      series: [{ data: gEt }],
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
const maxTimeTable = ref([]);
function loadData() {
  getMaxTime().then((res) => {
    maxTimeTable.value.length = 0;
    var value = { maxTime: res };
    maxTimeTable.value.push(value);
  });
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
</style>
