<template>
  <div class="app-container">
    <el-tabs
      v-model="activeName"
      class="tabs"
      stretch="True"
      @tab-click="handleClick"
    >
      <el-tab-pane label="任务输入" name="first">
        <el-row justify="center" class="tab-row">
          <el-col :span="12" :offset="6">
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="rules"
              label-width="120px"
              class="demo-ruleForm"
              :size="formSize"
              status-icon
            >
              <el-form-item class="form-label" label="任务名称" prop="name">
                <el-input
                  minlength="4"
                  maxlength="8"
                  style="width: 250px"
                  show-word-limit
                  v-model="ruleForm.name"
                />
              </el-form-item>
              <el-form-item class="form-label" label="任务种类" prop="types">
                <el-select
                  v-model="ruleForm.types"
                  placeholder="下拉选择任务种类"
                >
                  <el-option label="种类1" value="one" />
                  <el-option label="种类2" value="two" />
                  <el-option label="种类3" value="three" />
                </el-select>
              </el-form-item>
              <el-form-item class="form-label" label="任务属性" prop="attr">
                <el-select-v2
                  v-model="ruleForm.attr"
                  placeholder="任务属性"
                  :options="options"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                  >创建</el-button
                >
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="粒度信息" name="second">
        <el-row justify="center" class="tab-row">
          <el-col :span="18">
            <el-table
              :data="granularityData"
              border
              max-height="400"
              v-fit-columns
              style="width: 100%"
            >
              <el-table-column prop="task" label="协同任务" />
              <el-table-column label="空间粒度">
                <el-table-column prop="coord" label="坐标" />
                <el-table-column prop="range" label="范围"> </el-table-column>
              </el-table-column>
              <el-table-column label="时间粒度">
                <el-table-column prop="time" label="持续时间" />
                <el-table-column prop="rate" label="误判率"> </el-table-column>
              </el-table-column>
              <el-table-column label="资源粒度">
                <el-table-column prop="src" label="有源/无源" />
                <el-table-column prop="recycle" label="可回收/不可回收">
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 20px">
          <router-link to="/multi/granularity/setGranularity">
            <el-button type="primary" size="large">设置粒度</el-button>
          </router-link>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="协同策略" name="third">
        <el-row justify="center" class="tab-row">
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
              <el-table-column prop="range" label="协同范围"> </el-table-column>
              <el-table-column prop="ctrl" label="协同agent控制">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="奖励信息" name="fourth">
        <el-row justify="center" class="tab-row">
          <el-col :span="18">
            <el-table
              :data="rewardData"
              border
              max-height="400"
              v-fit-columns
              style="width: 100%"
            >
              <el-table-column prop="task" label="协同任务" />
              <el-table-column prop="time" label="响应时间"> </el-table-column>
              <el-table-column prop="success" label="协同成功率">
              </el-table-column>
              <el-table-column prop="cost" label="协同成本"> </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup name="Granularity">
import { reactive, ref } from "vue";
import type {
  TabsPaneContext,
  FormInstance,
  FormRules,
  Action,
} from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  types: "",
  attr: "",
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入任务名称", trigger: "blur" },
    { min: 4, max: 8, message: "名称长度应该在 4 到 8 之间", trigger: "blur" },
  ],
  types: [
    {
      required: true,
      message: "请选择任务种类",
      trigger: "change",
    },
  ],
  attr: [
    {
      required: true,
      message: "请选择任务属性",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      ElMessageBox.alert("任务创建成功", "消息", {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: "完成",
        // callback: (action: Action) => {
        //   ElMessage({
        //     type: "info",
        //     message: `action: ${action}`,
        //   });
        // },
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `属性${idx + 1}`,
}));

const granularityData = [
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
const collaborativeData = [
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
const rewardData = [
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
.tabs > .el-tabs__content {
  padding: 32px;
  // color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.tab-row {
  margin-top: 20px;
}
.form-label {
  font-weight: bold;
}
</style>
