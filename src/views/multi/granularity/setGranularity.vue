<template>
  <div class="app-container">
    <el-tabs
      v-model="activeName"
      class="tabs"
      stretch="True"
      @tab-click="handleClick"
    >
      <router-link to="/multi/granularity">
        <el-button :icon="ArrowLeft" type="primary">返回</el-button>
      </router-link>
      <!-- <el-input
        v-model="input"
        style="width: 300px; margin-left: 38%"
        placeholder="请输入任务名称 / 编号"
        @change="onChange"
      /> -->
      <el-tab-pane label="空间粒度" name="first">
        <el-row justify="center">
          <el-col :span="18">
            <el-table
              :data="space"
              class="table"
              max-height="450"
              border
              v-fit-columns
            >
              <el-table-column prop="task" label="协同任务" />
              <el-table-column prop="coord" label="坐标">
                <template #default="scope">
                  <!-- <el-tag
                    :type="scope.row.tag === 'Home' ? '' : 'success'"
                    disable-transitions
                    >{{ scope.row.tag }}</el-tag
                  > -->
                  <el-input v-model="s_coord[scope.$index]" />
                </template>
              </el-table-column>
              <el-table-column prop="range" label="范围（半径/m）">
                <template #default="scope">
                  <el-input v-model="s_range[scope.$index]" />
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="时间粒度" name="second">
        <el-row justify="center">
          <el-col :span="18">
            <el-table
              :data="time"
              class="table"
              max-height="450"
              border
              v-fit-columns
            >
              <el-table-column prop="task" label="协同任务" />
              <el-table-column prop="time" label="持续时间">
                <template #default="scope">
                  <el-input v-model="t_time[scope.$index]" />
                </template>
              </el-table-column>
              <el-table-column prop="rate" label="误判率">
                <template #default="scope">
                  <el-input v-model="t_rate[scope.$index]" />
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="资源粒度" name="third">
        <el-row justify="center">
          <el-col :span="18">
            <el-table
              :data="src"
              class="table"
              max-height="450"
              border
              v-fit-columns
            >
              <el-table-column prop="task" label="协同任务" />
              <el-table-column prop="source" label="有源/无源">
                <template #default="scope">
                  <el-input v-model="s_source[scope.$index]" />
                </template>
              </el-table-column>
              <el-table-column prop="recycle" label="可回收/不可回收">
                <template #default="scope">
                  <el-input v-model="s_recycle[scope.$index]" />
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup name="setGranularity">
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import { ArrowLeft } from "@element-plus/icons-vue";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const input = ref("");
const space_coord = ref(["(10,21)", "(3,98)", "(52,34)", "(74,69)", "(23,83)"]);
const space_range = ref(["129", "321", "672", "47", "297"]);
const time_time = ref(["1h 4min", "56min", "36min", "2h 49min", "43min"]);
const time_rate = ref(["3 %", "17 %", "5 %", "2 %", "9 %"]);
const src_source = ref(["有源", "有源", "无源", "有源", "无源"]);
const src_recycle = ref(["可回收", "不可回收", "不可回收", "可回收", "不可回收"]);

const spaceData = [
  {
    task: "任务1",
  },
  {
    task: "任务2",
  },
  {
    task: "任务3",
  },
  {
    task: "任务4",
  },
  {
    task: "任务5",
  },
  {
    task: "任务6",
  },
  {
    task: "任务7",
  },
  {
    task: "任务8",
  },
  {
    task: "任务9",
  },
  {
    task: "任务10",
  },
];
const timeData = [
  {
    task: "任务1",
  },
  {
    task: "任务2",
  },
  {
    task: "任务3",
  },
  {
    task: "任务4",
  },
  {
    task: "任务5",
  },
  {
    task: "任务6",
  },
  {
    task: "任务7",
  },
  {
    task: "任务8",
  },
  {
    task: "任务9",
  },
  {
    task: "任务10",
  },
];
const srcData = [
  {
    task: "任务1",
  },
  {
    task: "任务2",
  },
  {
    task: "任务3",
  },
  {
    task: "任务4",
  },
  {
    task: "任务5",
  },
  {
    task: "任务6",
  },
  {
    task: "任务7",
  },
  {
    task: "任务8",
  },
  {
    task: "任务9",
  },
  {
    task: "任务10",
  },
];

function deepClone(obj) {
  var _obj = JSON.stringify(obj) //  对象转成字符串
  var objClone = JSON.parse(_obj) //  字符串转成对象
  return objClone
}
var space = deepClone(spaceData);
var s_coord = ref(["(10,21)", "(3,98)", "(52,34)", "(74,69)", "(23,83)","(10,21)", "(3,98)", "(52,34)", "(74,69)", "(23,83)"]);
var s_range = ref(["129", "321", "672", "47", "297","129", "321", "672", "47", "297"]);
var time = deepClone(timeData);
var t_time = ref(["1h 4min", "56min", "36min", "2h 49min", "43min","1h 4min", "56min", "36min", "2h 49min", "43min"]);
var t_rate = ref(["3 %", "17 %", "5 %", "2 %", "9 %","3 %", "17 %", "5 %", "2 %", "9 %"]);
var src = deepClone(srcData);
var s_source = ref(["有源", "有源", "无源", "有源", "无源","有源", "有源", "无源", "有源", "无源"]);
var s_recycle = ref(["可回收", "不可回收", "不可回收", "可回收", "不可回收","可回收", "不可回收", "不可回收", "可回收", "不可回收"]);

const onChange = (val) => {
  var index = parseInt(val.slice(-1)) - 1;
  // space = [spaceData[index]];
  // s_coord = ref(["1"]);
  // s_range = ref(["1"]);
  // time = [timeData[index]];
  // t_time = ref(["1"]);
  // t_rate = ref(["1"]);
  // src = [srcData[index]];
  // s_source = ref(["1"]);
  // s_recycle = ref(["1"]);
  // space.value.length = 0;
  // var s = {task:'ss'};
  // space.value.push(s);
  // console.log(spaceData);
  // console.log(space);
  // console.log(s_coord)
}
</script>

<style scoped lang="scss">
// .tabs > .el-tabs__content {
//   padding: 32px;
//   color: #6b778c;
//   font-size: 32px;
//   font-weight: 600;
// }
.table {
  width: 100%;
  margin-top: 20px;
}
</style>
