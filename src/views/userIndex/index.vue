<template>
  <div class="app-front">
    <el-row :gutter="8">
      <el-col :span="13">
        <el-row>
          <el-card class="card-1">
            <el-carousel height="720px" interval="5000" pause-on-hover="false">
              <el-carousel-item>
                <div demo-bg>
                  <dv-border-box1 ref="borderRef">
                    <div>
                      <rsc></rsc>
                    </div>
                  </dv-border-box1>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div>
                  <red></red>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div>
                  <blue></blue>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="11">
        <el-card class="card-1">
          <!-- <template #header><span>战场场景演示</span></template> -->
          <div ref="fullScreenDiv" >
            <iframe id="iframe" src="../../../../WebGL/index.html" ref="iframe" frameborder="10" scrolling="yes"
              width="960px" height="604.27px" style="border: 0" webkitallowfullscreen="true" mozallowfullscreen="true"
              allowfullscreen="true"></iframe>
          </div>

          <!-- <el-divider /> -->
          <div class="show-button">
            <el-button @click="play" type="primary">开始演示</el-button>
            <el-button @click="pause" type="primary">暂停演示</el-button>
            <el-button @click="replay" type="primary">重置场景</el-button>
            <button @click="toggleFullScreen" :key="Math.random()">全屏</button>
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
            <el-carousel height="450px" interval="8000" pause-on-hover="false">
              <el-carousel-item>
                <div>
                  <handled></handled>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div>
                  <deduce></deduce>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </el-row>
      </el-col>

      <el-col :span="7">
        <el-card class="card-2">
          <template #header>
            <span style="color: #ffffff">战场信息</span>
          </template>
          <dv-border-box11 ref="borderRef">
            <div demo-bg>
              <dv-scroll-board :config="config" style="width: 100%; height: 330px" @mouseover="mouseoverHandler"
                @click="clickHandler" />
            </div>
          </dv-border-box11>
        </el-card>
      </el-col>
    </el-row>

    <el-drawer v-model="drawerRsc" title="资源" direction="rtl" size="80%">
      <div>
        <rsc></rsc>
      </div>
    </el-drawer>
    <el-drawer v-model="drawerEnv" title="环境" direction="rtl" size="80%">
      <div>
        <env></env>
      </div>
    </el-drawer>
    <el-drawer v-model="drawerHandled" title="处理后态势" direction="rtl" size="80%">
      <div>
        <handled></handled>
      </div>
    </el-drawer>
    <el-drawer v-model="drawerRed" title="红方态势评估" direction="rtl" size="80%">
      <div>
        <red></red>
      </div>
    </el-drawer>
    <el-drawer v-model="drawerBlue" title="蓝方态势评估" direction="rtl" size="80%">
      <div>
        <blue></blue>
      </div>
    </el-drawer>
    <el-drawer v-model="drawerDeduce" title="态势推演" direction="rtl" size="80%">
      <div>
        <deduce></deduce>
      </div>
    </el-drawer>
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

  window.addEventListener('event1', mouseEvent, false)
  window.addEventListener('taskAssignment', unityEvent, false)
  window.addEventListener('onTankDestroy', tankEvent, false)
  window.addEventListener('onH20Destroy', unityEvent, false)
  window.addEventListener('onMissileLauncherDestroy', unityEvent, false)
  window.addEventListener('onFighterDestroy', unityEvent, false)
  window.addEventListener('onShipDestroy', unityEvent, false)

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

  function mouseEvent(res) {
    console.log(res.detail.arr);
  }
  function tankEvent(res) {
    console.log(res.detail.arr);
  }
  function unityEvent(res) {
    console.log('unityEvent');
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

  const config = reactive({
    header: ["时间", "资源", "目标"],
    data: [
      ["14：08", "无人轰炸机1舱内炸弹A</span>", "敌方坦克1</span>"],
      ["14：08", "无人轰炸机1舱内炸弹B</span>", "敌方坦克4</span>"],
      ["14：08", "无人轰炸机3舱内炸弹A</span>", "敌方坦克2</span>"],
      ["14：08", "无人轰炸机2舱内炸弹B</span>", "敌方坦克6</span>"],
      ["14：08", "无人轰炸机1舱内炸弹D</span>", "敌方坦克28</span>"],
      ["14：08", "无人轰炸机2舱内炸弹A</span>", "敌方坦克3</span>"],
      ["14：08", "无人轰炸机3舱内炸弹B</span>", "敌方坦克8</span>"],
      ["14：08", "无人轰炸机1舱内炸弹C</span>", "敌方坦克5</span>"],
      ["14：08", "无人轰炸机6舱内炸弹A</span>", "敌方坦克9</span>"],
      ["14：08", "无人轰炸机8舱内炸弹B</span>", "敌方坦克12</span>"],
      ["14：08", "无人轰炸机6舱内炸弹B</span>", "敌方坦克11</span>"],
      ["14：08", "无人轰炸机7舱内炸弹A</span>", "敌方坦克15</span>"],
      ["14：08", "无人轰炸机9舱内炸弹A</span>", "敌方坦克14</span>"],
      ["14：08", "无人轰炸机2舱内炸弹D</span>", "敌方坦克34</span>"],
      ["14：08", "无人轰炸机15舱内炸弹B</span>", "敌方坦克19</span>"],
      ["14：08", "无人轰炸机10舱内炸弹A</span>", "敌方坦克14</span>"],
      ["14：08", "无人轰炸机13舱内炸弹A</span>", "敌方坦克18</span>"],
      ["14：08", "无人轰炸机2舱内炸弹C</span>", "敌方坦克21</span>"],
      [
        '<span style="color:#ff0000;">14：08</span>',
        '<span style="color:#ff0000;">敌方导弹发射台1导弹A</span>',
        '<span style="color:#ff0000;">无人轰炸机2</span>',
      ],
      ["14：08", "无人轰炸机16舱内炸弹B</span>", "敌方坦克16</span>"],
      ["14：08", "无人轰炸机11舱内炸弹A</span>", "敌方坦克21</span>"],
      ["14：08", "无人轰炸机20舱内炸弹A</span>", "敌方坦克25</span>"],
      ["14：08", "无人轰炸机19舱内炸弹A</span>", "敌方坦克17</span>"],
      ["14：08", "无人轰炸机13舱内炸弹B</span>", "敌方坦克13</span>"],
      ["14：08", "无人轰炸机18舱内炸弹A</span>", "敌方坦克20</span>"],
      ["14：08", "无人轰炸机17舱内炸弹A</span>", "敌方坦克24</span>"],
      ["14：08", "无人轰炸机24舱内炸弹A</span>", "敌方坦克29</span>"],
      ["14：08", "无人轰炸机22舱内炸弹B</span>", "敌方坦克27</span>"],
      ["14：08", "无人轰炸机26舱内炸弹A</span>", "敌方坦克30</span>"],
      ["14：08", "无人轰炸机19舱内炸弹B</span>", "敌方坦克22</span>"],
      ["14：08", "无人轰炸机23舱内炸弹A</span>", "敌方坦克33</span>"],
    ],
    waitTime: 3000,
    // columnWidth: [50],
    align: ["center"],
    hoverPause: false,
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

  const play = () => {
    // videoPlayer.value.play();
    // const contentWindow = iframe.value.contentWindow
    // contentWindow.message('Sphere', 'SetToken', 'vue to unity');
    iframe.value.contentWindow.message('Camera', 'setPlayProp', '1');  //开始
  };
  const pause = () => {
    // videoPlayer.value.pause();
    iframe.value.contentWindow.message('Camera', 'setPlayProp', '2');  //暂停
  };
  const replay = () => {
    // videoPlayer.value.currentTime = 0;
    // videoPlayer.value.play();
    iframe.value.contentWindow.message('Camera', 'setPlayProp', '0');  //重置
  };

  //unity全屏
  const fullScreenDiv = ref<HTMLElement | null>();
  const toggleFullScreen  = () => {
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

    background-size: 100% 100%;
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
    height: 450px;
    box-sizing: border-box;
    vertical-align: top;
    background-color: rgba(255, 255, 255, 0);
  }

  .dv-scr-board {
    width: 2400px;
    height: 440px;
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
