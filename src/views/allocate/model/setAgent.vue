<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="tabs" stretch="True" @tab-click="handleClick">
      <router-link to="/allocate/model">
                <el-button :icon="ArrowLeft" type="primary">返回</el-button>
            </router-link>
      <!-- <el-tab-pane label="协同资源输入" name="first">
        <el-row justify="center" class="tab-row">
          <el-col :span="12" :offset="6">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
              :size="formSize" status-icon>
              <el-form-item class="form-label" label="协同资源名称" prop="name">
                <el-input minlength="4" maxlength="8" style="width: 220px" show-word-limit v-model="ruleForm.name" />
              </el-form-item>
              <el-form-item class="form-label" label="协同资源种类" prop="types">
                <el-select v-model="ruleForm.types" placeholder="下拉选择协同资源种类">
                  <el-option label="种类1" value="one" />
                  <el-option label="种类2" value="two" />
                  <el-option label="种类3" value="three" />
                </el-select>
              </el-form-item>
              <el-form-item class="form-label" label="协同资源能力" prop="ability">
                <el-input style="width: 220px" show-word-limit v-model="ruleForm.ability" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane> -->
      <el-tab-pane label="协同资源信息" name="first">
        <el-row justify="center" class="tab-row">
          <el-col :span="18">
            <el-table :data="decisionData" border max-height="400" v-fit-columns style="width: 100%">
              <el-table-column prop="agent" label="协同资源" />
              <el-table-column label="决策变量">
                <el-table-column prop="target" label="协同目标" />
                <el-table-column prop="start" label="开始时间" />
                <el-table-column prop="reward" label="完成协同任务的收益" ></el-table-column>
              </el-table-column>



            </el-table>
          </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 20px">
          <router-link to="/allocate/model/setDecision">
            <el-button type="primary" size="large">设置决策变量</el-button>
          </router-link>
        </el-row>
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>
  
<script lang="ts" setup name="setAgent">
import { reactive, ref } from "vue";
import type {
  TabsPaneContext,
  FormInstance,
  FormRules,
  Action,
} from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { ArrowLeft } from "@element-plus/icons-vue";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  types: "",
  ability: "",
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入协同资源名称", trigger: "blur" },
    { min: 3, max: 8, message: "名称长度应该在 3 到 8 之间", trigger: "blur" },
  ],
  types: [
    {
      required: true,
      message: "请选择协同资源种类",
      trigger: "change",
    },
  ],
  ability: [
    {
      required: true,
      message: "请输入协同资源能力",
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

const decisionData = [
  {
    agent: "agent1",
    target: "2",
    start: "2022-8-2-11-28",
    reward: "50",
  },
  {
    agent: "agent2",
    target: "5",
    start: "2022-8-2-12-14",
    reward: "80",
  },
  {
    agent: "agent3",
    target: "1",
    start: "2022-8-2-10-11",
    reward: "100",
  },
  {
    agent: "agent4",
    target: "9",
    start: "2022-8-2-16-34",
    reward: "30",
  },
  {
    agent: "agent5",
    target: "7",
    start: "2022-8-2-16-33",
    reward: "60",
  },
];

</script>
  
<style scoped lang="scss">
.tabs>.el-tabs__content {
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
  