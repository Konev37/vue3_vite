<template>
    <div class="app-container">
        <el-tabs v-model="activeName" class="tabs" stretch="True" @tab-click="handleClick">
            <router-link to="/allocate/optimize">
                <el-button :icon="ArrowLeft" type="primary">返回</el-button>
            </router-link>
            <!-- <el-input
          v-model="input"
          style="width: 300px; margin-left: 38%"
          placeholder="请输入任务名称 / 编号"
        /> -->
            <el-tab-pane label="约束条件设置" name="first">
                <el-form :model="form" label-width="750px">
                    <el-form-item label="约束条件1">
                        <el-input v-model="form.condition1" style="width:220px;"/>


                    </el-form-item>
                    <el-form-item label="约束条件2">
                        <el-input v-model="form.condition2" style="width:220px;"/>


                    </el-form-item>
                    <el-form-item label="约束条件3">
                        <el-input v-model="form.condition3" style="width:220px;"/>


                    </el-form-item>
                    <el-form-item label="约束条件4">
                        <el-input v-model="form.condition4" style="width:220px;"/>


                    </el-form-item>
                    <el-form-item label="约束条件5">
                        <el-input v-model="form.condition5" style="width:220px;"/>


                    </el-form-item>
                </el-form>
                <!-- <el-table :data="spaceData" class="table" border v-fit-columns>
                    <el-table-column prop="task" label="协同任务" />
                    <el-table-column prop="coord" label="坐标" />
                    <el-table-column prop="address" label="范围" />
                </el-table> -->
            </el-tab-pane>

            <el-tab-pane label="决策变量设置" name="second">
                <el-form :model="form" label-width="750px">
                    <el-form-item label="决策变量1">
                        <el-input v-model="form.variable1" style="width:220px;"/>

                    </el-form-item>
                    <el-form-item label="决策变量2">
                        <el-input v-model="form.variable2" style="width:220px;"/>
                    </el-form-item>
                    <el-form-item label="决策变量3">
                        <el-input v-model="form.variable3" style="width:220px;"/>

                    </el-form-item>
                    <el-form-item label="决策变量4">
                        <el-input v-model="form.variable4" style="width:220px;"/>

                    </el-form-item>
                    <el-form-item label="决策变量5">
                        <el-input v-model="form.variable5" style="width:220px;"/>

                    </el-form-item>
                </el-form>

                

            </el-tab-pane>

        </el-tabs>
    </div>
</template>
  
<script lang="ts" setup name="setOptimize">
import { ref, reactive } from "vue";
import type { TabsPaneContext } from "element-plus";
import { ArrowLeft } from "@element-plus/icons-vue";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};
const form = reactive({
  name: '',
  region: '1',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  condition1: '200',
  condition2: '50',
  condition3: '40',
  condition4: '120',
  condition5: '1',
  variable1: '200',
  variable2: '50',
  variable3: '40',
  variable4: '120',
  variable5: '1',
})




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
  