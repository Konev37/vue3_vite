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
            max-height="600"
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
const collaborativeData = [];
for (let i = 1; i <= 10; i++) {
  var sit = "态势" + i;
  var strategy = '策略' + i;
  var data = {sit: sit, strategy: strategy};
  collaborativeData.push(data);
}
</script>

<style scoped lang="scss">
.header {
  text-align: center;
}
.content {
  margin-top: 0px;
}
</style>
