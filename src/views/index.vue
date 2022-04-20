<template>
  <div class="app-container home">
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
    <el-tab-pane label="任务" name="task">任务</el-tab-pane>
    <el-tab-pane label="集群" name="cluster">
      <el-container>
        <el-aside width="60%">
          <div class="demo-image">
            <div class="block">
              <span class="demonstration">示意图</span>
              <el-image style="width: 500px; height: 500px" :src="src" fit="scale-down"/>
            </div>
          </div>
        </el-aside>
        <el-main>
          <el-row>
            <el-card class="update-log">
              <template v-slot:header>
                <div class="clearfix">
                  <span>全部集群总状态</span>
                </div>
              </template>
              <div class="body">
                <el-table :data="statusData" stripe border style="width: 100%">
                  <el-table-column prop="completion" label="任务完成率" width="140" />
                  <el-table-column prop="cost" label="当前总成本" width="140" />
                  <el-table-column prop="loss" label="Agent损失率" width="140"/>
                </el-table>
              </div>
            </el-card>
          </el-row>
          <el-row>
            <el-card class="update-log">
              <template v-slot:header>
              <div class="clearfix">
                <span>Agent集群属性</span>
              </div>
              </template>
              <div class="body">
              <el-table :data="propData" stripe border style="width: 100%">
                <el-table-column prop="agentId" label="集群编号" width="210" />
                <el-table-column prop="agentProp" label="属性" width="210"/>
              </el-table>
            </div>
            </el-card>
          </el-row>
        </el-main>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="Agent" name="agent">Agent</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup name="Home">
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'

  function goTarget(url) {
    window.open(url, '__blank')
  }
  const activeName = ref('first')

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }
  const src = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  const statusData = [
    {
      completion: '80%',
      cost: '80%',
      loss: '80%',
    },
  ]
  const propData = [
  {
    agentId: '集群1',
    agentProp: '集群1的属性',
  },
  {
    agentId: '集群2',
    agentProp: '集群2的属性',
  },
  {
    agentId: '集群3',
    agentProp: '集群3的属性',
  },
]
</script>

<style scoped lang="scss">
.home {
  .update-log {
    margin: 10px;
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  // color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>