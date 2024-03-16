<template>
    <div class="app-container">
      <el-tabs
        v-model="activeName"
        class="tabs"
        stretch="True"
        @tab-click="handleClick"
      >
        <router-link to="/allocate/model/setTask">
          <el-button :icon="ArrowLeft" type="primary">返回</el-button>
        </router-link>
        <!-- <el-input
          v-model="input"
          style="width: 300px; margin-left: 38%"
          placeholder="请输入任务名称 / 编号"
          @change="onChange"
        /> -->
        <el-tab-pane label="协同效果约束" name="first">
          <el-row justify="center">
            <el-col :span="18">
              <el-table
                :data="effect"
                class="table"
                max-height="450"
                border
                v-fit-columns
              >
                <el-table-column prop="task" label="协同任务" />
                <el-table-column prop="minEffect" label="最小协同效果">
                  <template #default="scope">
                    <!-- <el-tag
                      :type="scope.row.tag === 'Home' ? '' : 'success'"
                      disable-transitions
                      >{{ scope.row.tag }}</el-tag
                    > -->
                    <el-input v-model="e_minEffect[scope.$index]" />
                  </template>
                </el-table-column>
                <el-table-column prop="avgEffect" label="平均协同效果">
                  <template #default="scope">
                    <el-input v-model="e_avgEffect[scope.$index]" />
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="协同资源约束" name="second">
          <el-row justify="center">
            <el-col :span="18">
              <el-table
                :data="agent"
                class="table"
                max-height="450"
                border
                v-fit-columns
              >
                <el-table-column prop="task" label="协同任务" />
                <el-table-column prop="maxAgent" label="最大协同资源数量">
                  <template #default="scope">
                    <el-input v-model="a_maxAgent[scope.$index]" />
                  </template>
                </el-table-column>
                <el-table-column prop="maxCost" label="执行协同任务的最大成本">
                  <template #default="scope">
                    <el-input v-model="a_maxCost[scope.$index]" />
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="时间约束" name="third">
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
                <el-table-column prop="deadline" label="协同任务截止时间">
                  <template #default="scope">
                    <el-input v-model="t_deadline[scope.$index]" />
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
  const effect_minEffect = ref(["(10,21)", "(3,98)", "(52,34)", "(74,69)", "(23,83)"]);
  const effect_avgEffect = ref(["129", "321", "672", "47", "297"]);
  const time_deadline = ref(["1h 4min", "56min", "36min", "2h 49min", "43min"]);
  const agent_maxAgent = ref(["有源", "有源", "无源", "有源", "无源"]);
  const agent_maxCost = ref(["可回收", "不可回收", "不可回收", "可回收", "不可回收"]);
  
  const effectData = [
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
  const AgentData = [
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
  var effect = deepClone(effectData);
  var e_minEffect = ref(["120%", "130%", "130%", "140%", "150%","150%", "160%", "130%", "140%", "150%"]);
  var e_avgEffect = ref(["180%", "190%", "180%", "160%", "200%","200%", "120%", "180%", "160%", "200%"]);
  var time = deepClone(timeData);
  var t_deadline = ref(["1h 30min", "2h", "1h", "2h 30min", "3h","2h 30min", "2h", "1h", "2h 30min", "3h"]);
  
  var agent = deepClone(AgentData);
  var a_maxAgent = ref(["10", "15", "8", "12", "20","20", "30", "8", "12", "20"]);
  var a_maxCost = ref(["40", "30", "50", "20", "60","60", "60", "50", "20", "60"]);
  
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
  