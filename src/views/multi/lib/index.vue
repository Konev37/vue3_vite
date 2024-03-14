<template>
  <div class="app-container">
    <el-card>
      <h1 class="header">态势-协同策略库</h1>
      <br />
      <el-row justify="center">
        <el-col :span="18">
          <el-table
            :data="collaborativeData"
            class="content"
            border
            max-height="450"
            v-fit-columns
            style="width: 100%"
          >
            <el-table-column prop="sit" label="态势" />
            <el-table-column prop="strategy" label="协同策略">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup name="Lib">
const collaborativeData = [
  {
    sit: "电磁干扰态势1",
    strategy: "基于多智能体强化学习的任务迁移策略1"
  },
  {
    sit: "电磁干扰态势2",
    strategy: "基于多智能体强化学习的任务迁移策略2"
  },
  {
    sit: "电磁干扰态势3",
    strategy: "基于多智能体强化学习的任务迁移策略3"
  },
  {
    sit: "高风险态势1",
    strategy: "基于多智能体强化学习的任务迁移策略4"
  },
  {
    sit: "高风险态势2",
    strategy: "基于多智能体强化学习的任务迁移策略5"
  },
  {
    sit: "高风险态势3",
    strategy: "基于多智能体强化学习的任务迁移策略6"
  },
  {
    sit: "高风险态势4",
    strategy: "基于多智能体强化学习的任务迁移策略7"
  },
  {
    sit: "城市作战态势1",
    strategy: "基于多智能体强化学习的任务迁移策略8"
  },
  {
    sit: "城市作战态势2",
    strategy: "基于多智能体强化学习的任务迁移策略9"
  },
  {
    sit: "城市作战态势3",
    strategy: "基于多智能体强化学习的任务迁移策略10"
  },
  {
    sit: "岛群作战态势1",
    strategy: "基于多智能体强化学习的任务迁移策略11"
  },
  {
    sit: "岛群作战态势2",
    strategy: "基于多智能体强化学习的任务迁移策略12"
  },
  {
    sit: "岛群作战态势3",
    strategy: "基于多智能体强化学习的任务迁移策略13"
  },
];
// for (let i = 1; i <= 10; i++) {
//   var sit = "态势" + i;
//   var strategy = '策略' + i;
//   var data = {sit: sit, strategy: strategy};
//   collaborativeData.push(data);
// }
</script>

<style scoped lang="scss">
.header {
  text-align: center;
}
.content {
  margin-top: 0px;
}
</style>
