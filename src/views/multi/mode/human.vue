<template>
  <div class="app-container">
    <el-card>
      <h1 class="header">协同agent调度</h1>
      <br />
      <el-row justify="center" class="content">
        <el-col :span="18">
          <el-table
              :data="collaborativeData"
              border
              max-height="400"
              v-fit-columns
              style="width: 100%"
            >
              <el-table-column prop="task" label="协同任务" />
              <el-table-column prop="mode" label="协同方式"> </el-table-column>
              <el-table-column prop="range" label="范围（半径/m）"> </el-table-column>
              <el-table-column prop="ctrl" label="协同agent控制">
              </el-table-column>
            </el-table>
        </el-col>
      </el-row>
      <el-row justify="space-evenly">
        <el-col :span="12">
          <el-switch
            v-model="value1"
            class="mb-2"
            inactive-text="被动模式"
            active-text="主动模式"
            @change="change1"
          />
        </el-col>
        <el-col :span="12">
          <el-switch
            v-model="value2"
            class="mb-2"
            inactive-text="机器模式"
            active-text="人机协作模式"
            @change="change2"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup name="Human">
import { ref } from "vue";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";

const value1 = ref(false);
const value2 = ref(true);

const router = useRouter();

const mode = ref(["方式1", "方式2", "方式3", "方式4", "方式5", "方式1", "方式2", "方式3", "方式4", "方式5"]);
const range = ref(["129", "321", "672", "47", "297", "129", "321", "672", "47", "297"]);
const ctrl = ref(["控制1", "控制2", "控制3", "控制4", "控制5" ,"控制1", "控制2", "控制3", "控制4", "控制5"]);

const collaborativeData = [

  {
    task: "任务1",
    mode: "协作完成",
    range: "21",
    ctrl: "自适应任务迁移",
  },
  {
    task: "任务2",
    mode: "协作完成",
    range: "92",
    ctrl: "自适应任务迁移",
  },
  {
    task: "任务3",
    mode: "协作完成",
    range: "46",
    ctrl: "自适应任务迁移",
  },
  {
    task: "任务4",
    mode: "独立完成",
    range: "103",
    ctrl: "任务分配",
  },
  {
    task: "任务5",
    mode: "协作完成",
    range: "64",
    ctrl: "自适应任务迁移",
  },
  {
    task: "任务6",
    mode: "协作完成",
    range: "21",
    ctrl: "自适应任务迁移",
  },
  {
    task: "任务7",
    mode: "协作完成",
    range: "92",
    ctrl: "自适应任务迁移",
  },
  {
    task: "任务8",
    mode: "协作完成",
    range: "46",
    ctrl: "自适应任务迁移",
  },
  {
    task: "任务9",
    mode: "独立完成",
    range: "103",
    ctrl: "任务分配",
  },
  {
    task: "任务10",
    mode: "协作完成",
    range: "64",
    ctrl: "自适应任务迁移",
  },

];

const change1 = (val) => {
  if (val == true) {
    ElNotification({
      // title: 'Custom Position',
      message: "已切换至主动模式",
      position: "bottom-left",
      duration: 2000, // 2s 后自动关闭
    });
  } else {
    ElNotification({
      // title: 'Custom Position',
      message: "已切换至被动模式",
      position: "bottom-left",
      duration: 2000,
    });
  }
};
const change2 = (val) => {
  if (val == false) {
    router.push("/multi/mode");
  }
};
</script>

<style scoped lang="scss">
.header {
  text-align: center;
}
.content {
  margin-top: 20px;
}
.mb-2 {
  // --el-switch-off-color: #13ce66;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
