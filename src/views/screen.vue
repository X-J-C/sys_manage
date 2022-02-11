<template>
  <div class="screen">
    <el-container>
      <el-header style="height: 80px" class="head">
        <h1>资产实时大屏</h1>
        <span class="time">{{ date }}</span>
      </el-header>
      <el-main class="screen_main">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="box">
              <div class="border-title">
                <span class="border-text">资源类型分布</span>
              </div>
              <div id="piechart" style="height: 400px"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="box">
              <div class="sumbox">
                <el-row>
                  <el-col
                    :span="6"
                    v-for="(item, index) in screen_title"
                    :key="index"
                    class="screen_title"
                  >
                    <img :src="item.img" class="img" />
                    <div>
                      <p class="title">{{ item.text }}</p>
                      <p class="text">{{ item.title }}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="border-title">
                <span class="border-text">本日网络状况</span>
              </div>
              <div id="Linechart" class="Linebox"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="box">
              <div class="border-title">
                <span class="border-text">资源识别统计</span>
              </div>
              <div id="diffchart" style="height: 400px"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="box">
              <div class="border-title">
                <span class="border-text">品牌排行榜</span>
              </div>
              <div id="barchart" style="height: 400px"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="box" id="wrapper">
              <div class="border-title">
                <span class="border-text">实时风险漏洞</span>
              </div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" width="50" label="序号">
                </el-table-column>
                <el-table-column prop="ip_name" label="端口"> </el-table-column>
                <el-table-column prop="name" label="漏洞名称" width="500">
                </el-table-column>
                <el-table-column prop="date" label="发现时间">
                </el-table-column>
                <el-table-column prop="state" label="处置状态">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="box">
              <div class="border-title">
                <span class="border-text">服务器开放端口排行榜</span>
              </div>
              <div id="openchart" style="height: 400px"></div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      screen_title: [
        {
          img: require("../assets/image/sum1.png"),
          title: "资产总数",
          text: "20个",
        },
        {
          img: require("../assets/image/net.png"),
          title: "网段总数",
          text: "18个",
        },
        {
          img: require("../assets/image/online.png"),
          title: "在线设备",
          text: "8个",
        },
        {
          img: require("../assets/image/outline.png"),
          title: "离线设备",
          text: "12个",
        },
      ],
      tableData: [
        {
          ip_name: "10.8.8.110:139",
          name: "目标主机上SMB服务允许匿名登陆【精确】",
          date: "2021-3-25",
          state: "未处置",
        },
        {
          ip_name: "10.8.8.110:443",
          name: "检测到目标主机加密通信支持的SSL加密算法【精确】",
          date: "2021-3-25",
          state: "未处置",
        },
        {
          ip_name: "10.8.8.110:8443",
          name:
            "服务器支持 TLS Client-initiated 重协商攻击(CVE-2011-1473)【精确】",
          date: "2021-3-25",
          state: "未处置",
        },
        {
          ip_name: "10.8.8.110:3389",
          name:
            "Microsoft Windows CredSSP 远程执行代码漏洞(CVE-2018-0886)【精确】",
          date: "2021-3-25",
          state: "未处置",
        },
        {
          ip_name: "10.8.8.110:3389",
          name: "SSL/TLS 受诫礼(BAR-MITZVAH)攻击漏洞(CVE-2015-2808)【精确】",
          date: "2021-3-25",
          state: "未处置",
        },
        {
          ip_name: "10.8.8.110:8009",
          name: "Apache Tomcat文件包含漏洞(CVE-2020-1938)【精确】",
          date: "2021-3-25",
          state: "未处置",
        },
      ],
    };
  },
  mounted() {
    this.Timer();
    this.drawLine();
  },
  methods: {
    Timer() {
      var timerID = setInterval(this.updateTime, 1000);
      this.updateTime();
      return timerID;
    },
    updateTime() {
      var cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "/" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "/" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        this.time;
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    drawLine() {
      var echarts = require("echarts");

      // 基于准备好的dom，初始化echarts实例
      var LineChart = echarts.init(document.getElementById("Linechart"));

      // 绘制图表
      LineChart.setOption({
        // title: {
        //   left: "center",
        //   text: "本日网络状况",
        //   textStyle: {
        //     color: "#fff",
        //     fontWeight: "bold",
        //     fontSize: 18,
        //   },
        // },
        grid: {
          bottom: "10%",
          right: "10%",
          left: "10%",
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
          axisLabel: {
            color: "#fff", //刻度线标签颜色
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#fff", //刻度线标签颜色
          },
        },
        series: [
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              3,
              8,
              4,
              1,
              3,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            type: "line",
            // smooth: true,
            itemStyle: { normal: { label: { show: true, color: "#fff" } } },
          },
        ],
      });
      // 基于准备好的dom，初始化echarts实例
      var Chart = echarts.init(document.getElementById("piechart"));

      // 绘制图表
      Chart.setOption({
        // title: {
        //   text: "资源类型分布",
        //   left: "center",
        //   textStyle: {
        //     color: "#fff",
        //     fontWeight: "bold",
        //     fontSize: 18,
        //   },
        // },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: "50%",
            label: {
              fontSize: 14,
              color: "#fff",
            },
            data: [
              { value: 10, name: "摄像头" },
              { value: 10, name: "网管" },
              { value: 20, name: "服务器" },
              { value: 48, name: "终端" },
            ],
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
      // 基于准备好的dom，初始化echarts实例
      var barChart = echarts.init(document.getElementById("barchart"));
      var data = ["华为", "惠普", "IBM", "联想", "思科"];
      var bar = ["110", "100", "70", "50", "20"];
      // 绘制图表
      barChart.setOption({
        grid: {
          left: "10%",
          top: "15%",
          right: "5%",
          bottom: "15%",
        },
        legend: {
          show: true,
          icon: "circle",
          orient: "horizontal",
          top: "90.5%",
          right: "center",
          itemWidth: 16.5,
          itemHeight: 6,
          // itemGap: 30,
          textStyle: {
            // color: '#FFFFFF'
            color: "#C9C8CD",
            fontSize: 14,
          },
        },
        xAxis: [
          {
            data: data,
            axisLabel: {
              textStyle: {
                color: "#aaaaaa",
                fontSize: 14,
              },
              margin: 30, //刻度标签与轴线之间的距离。
            },

            axisLine: {
              show: false, //不显示x轴
            },
            axisTick: {
              show: false, //不显示刻度
            },
            boundaryGap: true,
            splitLine: {
              show: false,
              width: 0.08,
              lineStyle: {
                type: "solid",
                color: "#03202E",
              },
            },
          },
        ],
        yAxis: [
          {
            splitLine: {
              show: false,
              lineStyle: {
                color: "#eee",
                type: "solid",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#888",
              },
            },
          },
        ],
        series: [
          {
            //柱底圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [60, 20],
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(89,211,255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(23,237,194,1)",
                  },
                ]),
              },
            },
            data: bar,
          },

          //柱体
          {
            name: "",
            type: "bar",
            barWidth: 60,
            barGap: "0%",
            label: {
              show: true,
              position: "inside",
            },
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      //第一节下面
                      offset: 0,
                      color: "rgba(0,255,245,0.5)",
                    },
                    {
                      offset: 1,
                      color: "#43bafe",
                    },
                  ],
                },
              },
            },

            data: bar,
          },

          //柱顶圆片
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [60, 20],
            symbolOffset: [0, -10],
            z: 12,
            symbolPosition: "end",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(89,211,255,1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(23,237,194,1)",
                    },
                  ],
                  false
                ),
              },
            },
            data: bar,
          },
        ],
      });
      // 基于准备好的dom，初始化echarts实例
      var diffChart = echarts.init(document.getElementById("diffchart"));

      // 绘制图表
      diffChart.setOption({
        // title: {
        //   text: "资源识别统计",
        //   left: "center",
        //   textStyle: {
        //     color: "#fff",
        //     fontWeight: "bold",
        //     fontSize: 18,
        //   },
        // },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: "50%",
            label: {
              fontSize: 14,
              color: "#fff",
            },
            data: [
              { value: 20, name: "window终端" },
              { value: 20, name: "Linux终端" },
              { value: 30, name: "网络打印机" },
              { value: 48, name: "VMware" },
            ],
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

      // 基于准备好的dom，初始化echarts实例
      var openChart = echarts.init(document.getElementById("openchart"));
      var xData = ["22", "80", "23", "443", "8080"];
      var line = ["130", "80", "50", "30", "20"];
      // 绘制图表
      openChart.setOption({
        // title: {
        //   text: "服务器开发端口排行榜",
        //   left: "center",
        //   textStyle: {
        //     color: "#fff",
        //     fontWeight: "bold",
        //     fontSize: 18,
        //   },
        // },

        grid: {
          left: "10%",
          top: "15%",
          right: "5%",
          bottom: "15%",
        },
        legend: {
          show: true,
          icon: "circle",
          orient: "horizontal",
          top: "90.5%",
          right: "center",
          itemWidth: 16.5,
          itemHeight: 6,
          // itemGap: 30,
          textStyle: {
            // color: '#FFFFFF'
            color: "#C9C8CD",
            fontSize: 14,
          },
        },
        xAxis: [
          {
            data: xData,
            axisLabel: {
              textStyle: {
                color: "#aaaaaa",
                fontSize: 14,
              },
              margin: 30, //刻度标签与轴线之间的距离。
            },

            axisLine: {
              show: false, //不显示x轴
            },
            axisTick: {
              show: false, //不显示刻度
            },
            boundaryGap: true,
            splitLine: {
              show: false,
              width: 0.08,
              lineStyle: {
                type: "solid",
                color: "#03202E",
              },
            },
          },
        ],
        yAxis: [
          {
            splitLine: {
              show: false,
              lineStyle: {
                color: "#eee",
                type: "solid",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#888",
              },
            },
          },
        ],
        series: [
          {
            //柱底圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [60, 20],
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(52, 138, 253, 0.5)",
                  },
                  {
                    offset: 1,
                    color: "rgba(52, 138, 251, 0.5)",
                  },
                ]),
              },
            },
            data: line,
          },

          //柱体
          {
            name: "",
            type: "bar",
            barWidth: 60,
            barGap: "0%",
            label: {
              show: true,
              position: "inside",
            },
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      //第一节下面
                      offset: 0,
                      color: "rgba(52, 138, 253, 0.5)",
                    },
                    {
                      offset: 1,
                      color: "rgba(52, 138, 251, 0.5)",
                    },
                  ],
                },
              },
            },

            data: line,
          },

          //柱顶圆片
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [60, 20],
            symbolOffset: [0, -10],
            z: 12,
            symbolPosition: "end",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(52, 138, 253, 0.5)",
                    },
                    {
                      offset: 1,
                      color: "rgba(52, 138, 251, 0.5)",
                    },
                  ],
                  false
                ),
              },
            },
            data: line,
          },
        ],
      });
      window.onresize = function () {
        LineChart.resize();
        Chart.resize();
        barChart.resize();
        diffChart.resize();
        openChart.resize();
      };
    },
  },
};
</script>

<style lang="less">
.screen {
  background-image: url("../assets/image/pageBg.png");
  height: 100%;
  .head {
  background: url("../assets/image/head_bg.png") no-repeat center center;
  background-size: 100% 100%;
}
.head h1 {
  color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 34px;
}
.time {
  color: #fff;
  font-size: 24px;
  position: relative;
  top: -40px;
  float: right;
  color: rgba(148, 181, 238, 0.8);
}
.box {
  height: 400px;
  /* box-shadow: inset 0 0 34px rgba(52, 138, 253, 0.5);
  border-color: rgba(28, 103, 231, 0.6);
  border-radius: 1px;
  border: 2px solid rgba(28, 103, 231, 0.8); */
  margin-bottom: 10px;
}

.Linebox {
  height: 250px;
  /* box-shadow: inset 0 0 34px rgba(52, 138, 253, 0.5);
  border-color: rgba(28, 103, 231, 0.6);
  border-radius: 1px;
  border: 2px solid rgba(28, 103, 231, 0.8); */
  margin: 10px;
}
.sumbox {
  height: 100px;
  /* box-shadow: inset 0 0 34px rgba(52, 138, 253, 0.5);
  border-color: rgba(28, 103, 231, 0.6);
  border-radius: 1px;
  border: 2px solid rgba(28, 103, 231, 0.8); */
  margin: 10px;
  color: #fff;
}
.img {
  width: 70px;
  height: 70px;
  float: left;
  margin-right: 10px;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.text {
  font-size: 16px;
  margin: 0px;
  padding: 0px;
}
.border-title {
  font: 18px;
  color: #fff;
  text-align: center;
  font-weight: bolder;
  padding: 10px;
}
.border-text {
  padding: 10px;
  border-bottom: 2px solid #ddd;
  border-image: -webkit-linear-gradient(
      rgba(90, 126, 189, 0.8),
      rgba(34, 99, 185, 0.5)
    )
    20 20;
  border-image: -moz-linear-gradient(
       rgba(90, 126, 189, 0.8),
      rgba(34, 99, 185, 0.5)
    )
    20 20;
  border-image: -o-linear-gradient(
        rgba(90, 126, 189, 0.8),
      rgba(34, 99, 185, 0.5)
    )
    20 20;
  border-image: linear-gradient(
       rgba(90, 126, 189, 0.8),
      rgba(34, 99, 185, 0.5)
    )
    20 20;
}
#wrapper {
  .el-table__row > td {
  border: none;
}
.el-table,
.el-table__expanded-cell {
  background-color: transparent !important;
}
.el-table th,
.el-table tr,
.el-table td {
  background-color: transparent !important;
  color: #fff; 
}
.el-table::before {
  height: 0px;
}
}

.screen_main {
  height: 100%;
  overflow: hidden;
}
}


</style>