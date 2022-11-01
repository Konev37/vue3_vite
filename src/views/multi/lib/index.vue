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
            height="600"
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
    sit: "态势1",
    strategy: "策略1",
  },
  {
    sit: "态势2",
    strategy: "策略2",
  },
  {
    sit: "态势3",
    strategy: "策略3",
  },
  {
    sit: "态势4",
    strategy: "策略4",
  },
  {
    sit: "态势5",
    strategy: "策略5",
  },
];
</script>

<style scoped lang="scss">
.header {
  text-align: center;
}
.content {
  margin-top: 0px;
}
</style>
