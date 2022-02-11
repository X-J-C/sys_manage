<template>
  <div class="main-content">
    <el-row>
      <el-col :span="12">
        <el-row style="padding: 10px; height: 350px">
          <el-col
            :span="8"
            v-for="(item, index) in main_title"
            :key="index"
            class="main_title"
          >
            <img :src="require('../assets/image/icon/' + item.img + '.png')" class="img" />
            <div>
              <p class="title1">{{ item.text }}</p>
              <p class="text1">{{ item.title }}</p>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div id="piechart" :style="{ width: '100%', height: '350px' }"></div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px" :gutter="20">
      <el-col :span="4" style="height: 400px">
        <div
          v-for="(item, index) in main_content"
          :key="index"
          class="main_content"
        >
          <div style="float: left">
            <p class="num">{{ item.num }}</p>
            <p class="text">{{ item.title }}</p>
          </div>
          <div style="float: right; margin: 0">
            <img
              :src="require('../assets/image/' + item.img + '.png')"
              class="item_img"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div id="Linechart" :style="{ width: '100%', height: '400px' }"></div>
      </el-col>
    </el-row>
    <!-- <p class="title">全网入网资产统计</p>
        <el-row style="padding:10px">
        <el-col :span="4" v-for="(item, index) in main_foot" :key="index" class="main_foot">
            <img :src="item.img" class="img">
            <div>
                <p class="title">{{item.title}}</p>
                <p class="text">{{item.num1}}已审核<el-divider direction="vertical"></el-divider>{{item.num2}}未审核</p>
            </div>
        </el-col>
        </el-row> -->
  </div>
</template>

<script>
import axios from "../utils/axios";
export default {
  data() {
    return {
      main_title: [
        
      ],
      main_content: [],
      // main_foot:[
      //     {
      //         img:require('../assets/image/icon.png'),
      //         title:'业务系统',
      //         num1:9,
      //         num2:8
      //     },
      //     {
      //         img:require('../assets/image/icon.png'),
      //         title:'网络设备',
      //         num1:9,
      //         num2:8
      //     },
      //     {
      //         img:require('../assets/image/icon.png'),
      //         title:'终端设备',
      //         num1:9,
      //         num2:8
      //     },
      //     {
      //         img:require('../assets/image/icon.png'),
      //         title:'哑终端',
      //         num1:9,
      //         num2:8
      //     },
      //     {
      //         img:require('../assets/image/icon.png'),
      //         title:'其他',
      //         num1:9,
      //         num2:8
      //     }
      // ]
     linelist:[
              // { value: 10, name: "摄像头" },
              // { value: 10, name: "网管" },
              // { value: 20, name: "服务器" },
              // { value: 48, name: "终端" },
     ],
      barlist:[]
    };
  },

  components: {},

  computed: {},

  mounted() {
    // this.drawLine();
    this.getList();
  },

  methods: {
    drawLine() {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var LineChart = echarts.init(document.getElementById("Linechart"));
     
      // 绘制图表
      LineChart.setOption({
        title: {
          left: "center",
          text: "本日网络状况",
        },
        grid: {
          left: "10%", //设置canvas图距左的距离
          top: "20%",
          right: "10%",
          bottom: "10%",
        },
        xAxis: {
          type: "category",
          data: [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "22:00",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.linelist,
            type: "line",
            smooth: true,
            itemStyle: { normal: { label: { show: true } } },
          },
        ],
      });
      // 基于准备好的dom，初始化echarts实例
      var Chart = echarts.init(document.getElementById("piechart"));
      window.onresize = function () {
        LineChart.resize();
        Chart.resize();
      };
      // 绘制图表
      Chart.setOption({
        title: {
          text: "资源类型分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: "50%",
            data: this.barlist,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    getList() {
      axios
        .get("/sum/list")
        .then((res) => {
          this.main_content = res.data.goodsList.result;
          this.main_title= res.data.sumList.result;
          this.barlist=res.data.barlist.result;
          this.linelist=res.data.linelist.result;
          this.drawLine();
          this.$message.success("成功")
        })
        .catch((error) => {
          console.log(error);
          this.$message.error('失败')
        });
        
    },
  },
};
</script>

<style >


</style>