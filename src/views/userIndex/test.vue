<template>
  <div class="app-front">
    <el-row :gutter="8">
      <el-col :span="13">
        <el-row>
          <el-card class="card-1">
            
              <div>
                <red></red>
              </div>
            

          </el-card>
        </el-row>
      </el-col>
      <el-col :span="11">
        <el-card class="card-1">
          <!-- <template #header><span>战场场景演示</span></template> -->
          <div ref="fullScreenDiv">
            <iframe id="iframe" src="../../../../WebGL/index.html" ref="iframe" frameborder="10" scrolling="yes"
              width="960px" height="604.27px" style="border: 0" webkitallowfullscreen="true" mozallowfullscreen="true"
              allowfullscreen="true"></iframe>
            <!-- <iframe id="iframe" src="D:/WebGL/index.html" ref="iframe" frameborder="10" scrolling="yes"
              width="960px" height="604.27px" style="border: 0" webkitallowfullscreen="true" mozallowfullscreen="true"
              allowfullscreen="true"></iframe> -->
          </div>

          <!-- <el-divider /> -->
          <div class="show-button">
            <el-button @click="play" type="primary">开始/暂停演示</el-button>
            <el-button @click="taskAction" type="primary">开始分配任务</el-button>
            <!-- <el-button @click="replay" type="primary">重置场景</el-button> -->
            <el-button @click="toggleFullScreen" type="primary" :key="Math.random()">全屏</el-button>
            <el-button type="primary">人机协作模式</el-button>
            <el-button @click="logout" type="primary">退出登陆</el-button>
          </div>
          <!-- <el-button @click="ClickBeginning" type="success" :loading="loading" class="me-button">开始演示</el-button>
                <el-button @click="ClickPause" type="info" class="me-button">暂停演示</el-button>
                <el-button @click="ClickStop" type="danger" class="me-button">停止演示</el-button>
                <el-button @click="SelectConfig" type="warning" class="me-button">配置按钮</el-button> -->
        </el-card>
      </el-col>
    </el-row>
    <!-- 第二行 -->
    <el-row :gutter="8">
      <el-col :span="17">
        <el-row>
          <el-card class="card-2">
            
              <div demo-bg>
                <dv-border-box1 ref="borderRef">
                  <div>
                    <rsc></rsc>
                  </div>
                </dv-border-box1>
              </div>
            
          </el-card>
        </el-row>
      </el-col>

      <el-col :span="7">  
        <el-card class="card-2">
          <template #header>
            <span style="color: #ffffff">战场信息</span>
          </template>

          <div demo-bg>
            <dv-scroll-board ref="scrollBoard" :loop="false" :config="config" style="width: 100%; height: 550px" />
          </div>

        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref, onMounted } from "vue";
import useUserStore from '@/store/modules/user'
import type {
  TabsPaneContext,
  FormInstance,
  FormRules,
  Action,
} from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import type { ScrollBoard } from '@kjgl77/datav-vue3/index'
import rsc from "@/views/userIndex/rsc.vue";
import env from "@/views/userIndex/env.vue";
import handled from "@/views/userIndex/handled.vue";
import red from "@/views/userIndex/red.vue";
import blue from "@/views/userIndex/blue.vue";
import deduce from "@/views/userIndex/deduce.vue";

const Env = env;
const activeName1 = ref("first");
const activeName2 = ref("first");
const drawerTask = ref(false);
const drawerRsc = ref(false);
const drawerEnv = ref(false);
const drawerHandled = ref(false);
const drawerRed = ref(false);
const drawerBlue = ref(false);
const drawerDeduce = ref(false);

const userStore = useUserStore();

const config = reactive({
  header: ["时间", "事件"],
  data: [[], [], [], [], []],
  waitTime: 1000,
  index: true,
  columnWidth: [50],
  align: ["center"],
  hoverPause: true,

  // headerBGC: '#B3C0D1', //表头
  // oddRowBGC: '#F7F7F7', //奇数行
  // evenRowBGC: '#FFFFFF', //偶数行
});

const mouseoverHandler = (e: any) => {
  // console.log(e);
};

const clickHandler = (e: any) => {
  console.log(e);
};

const currentTime = ref(new Date().toLocaleTimeString());
const configdata = [[currentTime.value, "启动仿真系统"]];

const scrollBoard = ref<InstanceType<typeof ScrollBoard>>(null);

window.addEventListener('Start', Start, false)
window.addEventListener('taskAssignment', taskAssignment, false)
window.addEventListener('Bombing', Bombing, false)
window.addEventListener('destroyedTank', destroyedTank, false)
window.addEventListener('tankNum', tankNum, false)
window.addEventListener('launchingSurfaceToAirMissile', launchingSurfaceToAirMissile, false)
window.addEventListener('onH20Destroy', onH20Destroy, false)
window.addEventListener('redJetCounterAttack', redJetCounterAttack, false)
window.addEventListener('redJetReturn', redJetReturn, false)
window.addEventListener('onMissileLauncherDestroy', onMissileLauncherDestroy, false)
window.addEventListener('H20Return', H20Return, false)
window.addEventListener('blueFighterStrike', blueFighterStrike, false)
window.addEventListener('redAircraftTakeoff', redAircraftTakeoff, false)
window.addEventListener('redAircraftReturn', redAircraftReturn, false)
window.addEventListener('onFighterDestroy', onFighterDestroy, false)
window.addEventListener('collaboration', collaboration, false)
window.addEventListener('carrierMissile', carrierMissile, false)
window.addEventListener('cruiserDestroy', cruiserDestroy, false)
window.addEventListener('battleshipInterception', battleshipInterception, false)

const iframe = ref(null);
// onMounted(()=>{
//   const iframeValue = iframe.value;
//   iframeValue.onload = () => {
//     const contentWindow = iframeValue.contentWindow
//     // console.log(contentWindow);
//     contentWindow.message('Sphere', 'SetToken', 'vue to unity');
//   }
//   // console.log(iframe.value);
// })



function unityEvent(res) {
  //打印返回值的具体信息
  console.log(res.detail.arr);
}
function Start(res) {   //"场景加载成功"（这个函数可能会被调用多次）
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, res.detail.arr]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  // console.log(res.detail.arr);

}
function taskAssignment(res) {  // "任务分配完毕"
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, res.detail.arr]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log(res.detail.arr);
}
function Bombing(res) {
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, "轰炸机 " + res.detail.arr + " 投弹并返航"]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log("轰炸机 " + res.detail.arr + " 投弹并返航");
}
function destroyedTank(res) {
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, "坦克 " + res.detail.arr + " 已被摧毁"]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log("坦克 " + res.detail.arr + " 已被摧毁");
}
function tankNum(res) {

  console.log("剩余 " + res.detail.arr + " 辆坦克");
}
function launchingSurfaceToAirMissile(res) {  // "导弹塔发射导弹"
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, res.detail.arr]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log(res.detail.arr);
}
function onH20Destroy(res) {
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, "红方轰炸机 " + res.detail.arr + " 已被摧毁"]);

  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log("红方轰炸机 " + res.detail.arr + " 已被摧毁");
}
function redJetCounterAttack(res) {   // "红方战斗机出动"
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, res.detail.arr]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log(res.detail.arr);
}
function redJetReturn(res) {    // "红方战斗机返航"
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, res.detail.arr]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log(res.detail.arr);
}
function onMissileLauncherDestroy(res) {  // "地对空导弹 xxx 已被摧毁"
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, res.detail.arr]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log(res.detail.arr);
}
function H20Return(res) {
  // console.log("红方轰炸机 " + res.detail.arr + " 返航");
}
function blueFighterStrike(res) {
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, "蓝方战斗机 " + res.detail.arr + " 出击"]);

  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log("蓝方战斗机 " + res.detail.arr + " 出击");
}
function redAircraftTakeoff(res) {
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, "红方舰载机 " + res.detail.arr + " 出动"]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log("红方舰载机 " + res.detail.arr + " 出动");
}
function redAircraftReturn(res) {
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, "红方舰载机 " + res.detail.arr + " 发射2枚导弹并返航"]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log("红方舰载机 " + res.detail.arr + " 发射2枚导弹并返航");
}
function onFighterDestroy(res) {
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, "蓝方战斗机 " + res.detail.arr + " 被摧毁"]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log("蓝方战斗机 " + res.detail.arr + " 被摧毁");
}
function collaboration(res) {   // "启动人机协作模式"
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, res.detail.arr]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log(res.detail.arr);
}
function carrierMissile(res) {  // "航母发射导弹"
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, res.detail.arr]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log(res.detail.arr);
}
function cruiserDestroy(res) {
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, "蓝方战列舰 " + res.detail.arr + " 被摧毁"]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log("蓝方战列舰 " + res.detail.arr + " 被摧毁");
}
function battleshipInterception(res) {  // "战列舰拦截导弹"
  const currentTime = ref(new Date().toLocaleTimeString());
  configdata.push([currentTime.value, res.detail.arr]);
  if (scrollBoard.value)
    // 此处可以传第二个参数 index，指定下次滚动的起始行
    scrollBoard.value.updateRows(configdata);
  console.log(res.detail.arr);
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  setTimeout(() => {
    console.log(activeName1, activeName2);
  }, 500);
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

const videoPlayer = ref(null);
const autoplay = false;
const volume = ref(0.5);
var playProp = "0";

const play = () => {
  // videoPlayer.value.play();
  // const contentWindow = iframe.value.contentWindow
  // contentWindow.message('Sphere', 'SetToken', 'vue to unity');
  if (playProp == "0") {
    playProp = "1";   // 开始
  } else if (playProp == "1") {
    playProp = "2";   // 暂停
  }
  else if (playProp == "2") {
    playProp = "1";   // 开始
  }
  iframe.value.contentWindow.message('Camera', 'setPlayProp', playProp);
};
const taskAction = () => {
  // videoPlayer.value.pause();
  let name = '';
  for (let i = 0; i <= 23; i++) {   //依次给24个agent发消息
    name = i.toString();
    iframe.value.contentWindow.message(name, 'taskAction', '1');  //红方agent开始计时
  }
  for (let i = 0; i <= 7; i++) {
    name = i.toString().padStart(3, '0'); // 使用 padStart() 方法在数字前补零，确保为三位数
    iframe.value.contentWindow.message(name, 'taskAction', '1');  //蓝方战斗机开始计时
  }
};
const replay = () => {
  // videoPlayer.value.currentTime = 0;
  // videoPlayer.value.play();
  iframe.value.contentWindow.message('Camera', 'setPlayProp', '0');  //重置
};

//unity全屏
const fullScreenDiv = ref<HTMLElement | null>();
const toggleFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    fullScreenDiv.value?.requestFullscreen();
  }
};

const onFullScreenChange = () => {
  if (document.fullscreenElement === fullScreenDiv.value) {
    console.log('全屏');
  } else {
    console.log('退出全屏');
  }
};

onMounted(() => {
  fullScreenDiv.value = document.querySelector('[ref="fullScreenDiv"]');
  console.log(fullScreenDiv.value);
  document.addEventListener('fullscreenchange', onFullScreenChange);
});
onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', onFullScreenChange);
});

const onPlay = () => {
  // 视频播放时触发
};
const onPause = () => {
  // 视频暂停时触发
};
const onEnded = () => {
  // 视频播放结束时触发
};

const granularityData = [
  {
    task: "任务1",
    coord: "(10,21)",
    range: "129",
    time: "1h 4min",
    rate: "3 %",
    src: "有源",
    recycle: "可回收",
  },
  {
    task: "任务2",
    coord: "(3,98)",
    range: "321",
    time: "56min",
    rate: "17 %",
    src: "有源",
    recycle: "不可回收",
  },
  {
    task: "任务3",
    coord: "(52,34)",
    range: "672",
    time: "36min",
    rate: "5 %",
    src: "无源",
    recycle: "不可回收",
  },
  {
    task: "任务4",
    coord: "(74,69)",
    range: "47",
    time: "2h 49min",
    rate: "2 %",
    src: "有源",
    recycle: "可回收",
  },
  {
    task: "任务5",
    coord: "(23,83)",
    range: "297",
    time: "43min",
    rate: "9 %",
    src: "无源",
    recycle: "不可回收",
  },
];
const collaborativeData = [
  {
    task: "任务1",
    mode: "方式1",
    range: "21",
    ctrl: "控制1",
  },
  {
    task: "任务2",
    mode: "方式2",
    range: "92",
    ctrl: "控制2",
  },
  {
    task: "任务3",
    mode: "方式3",
    range: "46",
    ctrl: "控制3",
  },
  {
    task: "任务4",
    mode: "方式4",
    range: "103",
    ctrl: "控制4",
  },
  {
    task: "任务5",
    mode: "方式5",
    range: "64",
    ctrl: "控制5",
  },
];
const rewardData = [
  {
    task: "任务1",
    time: "19s",
    success: "82 %",
    cost: "45",
  },
  {
    task: "任务2",
    time: "5s",
    success: "94 %",
    cost: "31",
  },
  {
    task: "任务3",
    time: "17s",
    success: "88 %",
    cost: "29",
  },
  {
    task: "任务4",
    time: "21s",
    success: "80 %",
    cost: "73",
  },
  {
    task: "任务5",
    time: "3s",
    success: "98 %",
    cost: "56",
  },
];
// return{
//   activeName,
//   drawerTask,
// }
function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logOut().then(() => {
      location.href = '/';
    })
  }).catch(() => { });
}
</script>

<style>
.app-front {
  background: url("@/assets/images/pageBg.png");

  width:2560px;
  height: 1440px;
}

.Simulation-div {
  margin: 10px;
}

.show-button {
  text-align: left;
  padding-left: 250px;
}

.me-button-1 {
  width: 150px;
  height: 55px;
  font-size: 25px;
}

.me-button-2 {
  width: 300px;
  height: 55px;
  font-size: 25px;
}

.el-col {
  border-radius: 4px;
}

.card-1 {
  margin: 0px;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 100%;
  height: 740px;
  box-sizing: border-box;
  vertical-align: top;
  background-color: rgba(255, 255, 255, 0);
}

.card-2 {
  margin: 0px;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 100%;
  height: 750px;
  box-sizing: border-box;
  vertical-align: top;
  background-color: rgba(255, 255, 255, 0);
}

.dv-scr-board {
  width: 2400px;
  height: 650px;
}

.tabs {
  background-color: rgba(255, 255, 255, 0);
}

.my-video {
  width: 100%;
  height: 94%;
  object-fit: cover;
}

/* .card{
    background-color: #3f5c6d2c;
  } */
</style>
