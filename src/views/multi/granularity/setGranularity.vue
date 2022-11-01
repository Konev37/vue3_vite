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
      <el-input
        v-model="input"
        style="width: 300px; margin-left: 38%"
        placeholder="请输入任务名称 / 编号"
      />
      <el-tab-pane label="空间粒度" name="first">
        <el-table :data="spaceData" class="table" border v-fit-columns>
          <el-table-column prop="task" label="协同任务" />
          <el-table-column prop="coord" label="坐标" />
          <el-table-column prop="address" label="范围" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="时间粒度" name="second">
        <el-table :data="timeData" class="table" border v-fit-columns>
          <el-table-column prop="task" label="协同任务" />
          <el-table-column prop="time" label="持续时间" />
          <el-table-column prop="rate" label="误判率" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="资源粒度" class="table" name="third">
        <el-table :data="srcData" border v-fit-columns>
          <el-table-column prop="task" label="协同任务" />
          <el-table-column prop="source" label="有源/无源" />
          <el-table-column prop="recycle" label="可回收/不可回收" />
        </el-table>
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
];
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
