<template>
    <div class="app-container">
        <el-tabs v-model="activeName" class="tabs" stretch="True" @tab-click="handleClick">
            <router-link to="/allocate/model">
                <el-button :icon="ArrowLeft" type="primary">返回</el-button>
            </router-link>
            <!-- <el-tab-pane label="任务输入" name="first">
                <el-row justify="center" class="tab-row">
                    <el-col :span="12" :offset="6">
                        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
                            class="demo-ruleForm" :size="formSize" status-icon>
                            <el-form-item class="form-label" label="任务名称" prop="name">
                                <el-input minlength="4" maxlength="8" style="width: 250px" show-word-limit
                                    v-model="ruleForm.name" />
                            </el-form-item>
                            <el-form-item class="form-label" label="任务目标位置" prop="location">
                                <el-input style="width: 250px" show-word-limit v-model="ruleForm.location" />
                            </el-form-item>
                            <el-form-item class="form-label" label="协同任务总大小" prop="Tsize">
                                <el-input style="width: 250px" show-word-limit v-model="ruleForm.Tsize" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
                                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-tab-pane> -->
            <el-tab-pane label="协同任务信息" name="first">
                <el-row justify="center" class="tab-row">
                    <el-col :span="18">
                        <el-table :data="constraintData" border max-height="400" v-fit-columns style="width: 100%">
                            <el-table-column prop="task" label="协同任务" />
                            <el-table-column label="协同效果约束">
                                <el-table-column prop="minEffect" label="最小协同效果" />
                                <el-table-column prop="avgEffect" label="平均协同效果"> </el-table-column>
                            </el-table-column>
                            <el-table-column label="协同资源约束">
                                <el-table-column prop="maxAgent" label="最大协同资源数量" />
                                <el-table-column prop="maxCost" label="执行协同任务的最大成本"> </el-table-column>
                            </el-table-column>
                            <el-table-column prop="deadline" label="协同任务截止时间" />
                        </el-table>
                    </el-col>
                </el-row>
                <el-row justify="center" style="margin-top: 20px">
                    <router-link to="/allocate/model/setConstraint">
                        <el-button type="primary" size="large">设置约束条件</el-button>
                    </router-link>
                </el-row>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>
  
<script lang="ts" setup name="setTask">
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

    location: "",
    Tsize: "",
});

const rules = reactive<FormRules>({
    name: [
        { required: true, message: "请输入任务名称", trigger: "blur" },
        { min: 3, max: 8, message: "名称长度应该在 3 到 8 之间", trigger: "blur" },
    ],

    location: [

        { required: true, message: "请输入任务目标位置", trigger: "blur" },


    ],
    size: [

        { required: true, message: "请输入协同任务总大小", trigger: "blur" },


    ]
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

const constraintData = [
    {
        task: "任务1",
        minEffect: "120%",
        avgEffect: "180%",
        maxAgent: "10",
        maxCost: "40",
        deadline: "1h 30min",
    },
    {
        task: "任务2",
        minEffect: "130%",
        avgEffect: "190%",
        maxAgent: "15",
        maxCost: "30",
        deadline: "2h",
    },
    {
        task: "任务3",
        minEffect: "130%",
        avgEffect: "180%",
        maxAgent: "8",
        maxCost: "50",
        deadline: "1h",
    },
    {
        task: "任务4",
        minEffect: "140%",
        avgEffect: "160%",
        maxAgent: "12",
        maxCost: "20",
        deadline: "2h 30min",
    },
    {
        task: "任务5",
        minEffect: "150%",
        avgEffect: "200%",
        maxAgent: "20",
        maxCost: "60",
        deadline: "3h",
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
  