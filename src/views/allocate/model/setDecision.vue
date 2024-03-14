<template>
  <div class="app-container">
    <el-tabs
      v-model="activeName"
      class="tabs"
      stretch="True"
      @tab-click="handleClick"
    >
      <router-link to="/allocate/model/setAgent">
        <el-button :icon="ArrowLeft" type="primary">返回</el-button>
      </router-link>
      <!-- <el-input
        v-model="input"
        style="width: 300px; margin-left: 38%"
        placeholder="请输入任务名称 / 编号"
        @change="onChange"
      /> -->
      <el-tab-pane label="设置决策变量" name="first">
        <el-row justify="center">
          <el-col :span="18">
            <el-table
              :data="decision"
              class="table"
              max-height="450"
              border
              v-fit-columns
            >
              <el-table-column prop="agent" label="协同资源" />
              <el-table-column prop="target" label="协同目标">
                <template #default="scope">
                  <!-- <el-tag
                    :type="scope.row.tag === 'Home' ? '' : 'success'"
                    disable-transitions
                    >{{ scope.row.tag }}</el-tag
                  > -->
                  <el-input v-model="d_target[scope.$index]" />
                </template>
              </el-table-column>
              <el-table-column prop="start" label="开始时间">
                <template #default="scope">
                  <el-input v-model="d_start[scope.$index]" />
                </template>
              </el-table-column>
              <el-table-column prop="reward" label="协作任务收益">
                <template #default="scope">
                  <el-input v-model="d_reward[scope.$index]" />
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>

<script lang="ts" setup name="setConstraint">
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import { ArrowLeft } from "@element-plus/icons-vue";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const input = ref("");
const decision_target = ref(["(10,21)", "(3,98)", "(52,34)", "(74,69)", "(23,83)"]);
const decision_start = ref(["(10,21)", "(3,98)", "(52,34)", "(74,69)", "(23,83)"]);
const decision_reward = ref(["(10,21)", "(3,98)", "(52,34)", "(74,69)", "(23,83)"]);
const effect_minEffect = ref(["(10,21)", "(3,98)", "(52,34)", "(74,69)", "(23,83)"]);
const effect_avgEffect = ref(["129", "321", "672", "47", "297"]);
const time_deadline = ref(["1h 4min", "56min", "36min", "2h 49min", "43min"]);
const agent_maxAgent = ref(["有源", "有源", "无源", "有源", "无源"]);
const agent_maxCost = ref(["可回收", "不可回收", "不可回收", "可回收", "不可回收"]);

const decisionData = [
  {
    agent: "agent1",
  },
  {
    agent: "agent2",
  },
  {
    agent: "agent3",
  },
  {
    agent: "agent4",
  },
  {
    agent: "agent5",
  },
  {
    agent: "agent6",
  },
  {
    agent: "agent7",
  },
  {
    agent: "agent8",
  },
  {
    agent: "agent9",
  },
  {
    agent: "agent10",
  },
];


function deepClone(obj) {
  var _obj = JSON.stringify(obj) //  对象转成字符串
  var objClone = JSON.parse(_obj) //  字符串转成对象
  return objClone
}
var decision = deepClone(decisionData);
var d_target = ref(["2", "5", "1", "9", "7","2", "5", "1", "9", "7"]);
var d_start = ref(["2022-8-2-11-28", "2022-8-2-12-14", "2022-8-2-10-11", "2022-8-2-16-34", "2022-8-2-16-33","2022-8-2-11-28", "2022-8-2-12-14", "2022-8-2-10-11", "2022-8-2-16-34", "2022-8-2-16-33"]);
var d_reward = ref(["50", "80", "100", "30", "60","70", "30", "90", "50", "20"]);




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
