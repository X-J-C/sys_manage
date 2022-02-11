<template>
  <div class="monitor_content">
    <div>
      <span class="divider_title">系统资源监控</span>
      <el-divider></el-divider>
    </div>
    <el-row>
      <el-col :span="8" v-for="(item, index) in list" :key="index">
        <div class="myChart" :style="{ height: '300px' }"></div>
      </el-col>
    </el-row>
     <!-- <el-row>
        <el-col :span="10"></el-col>
      <el-col :span="8" >
        <el-tag type="danger">内存总量：3.85 GB</el-tag>
        <el-tag type="success">内存空闲：3.06 GB</el-tag>
      </el-col>
      <el-col :span="6" >
        <el-tag type="danger">硬盘总量：3.85 GB</el-tag>
        <el-tag type="success">硬盘空闲：3.06 GB</el-tag>
      </el-col>
    </el-row> -->
    <el-row>
        <el-col :span="10"></el-col>
      <el-col :span="6" v-for="(item, index) in tags" :key="index">
        <el-tag type="danger">{{item.name1}}：{{item.number1}}GB</el-tag>
        <el-tag type="success">{{item.name2}}：{{item.number2}}GB</el-tag>
      </el-col>
    </el-row>
    <div>
      <span class="divider_title">系统操作</span>
      <el-divider></el-divider>
        <el-row v-for="(item, index) in btn" :key="index" style="line-height:40px;margin-bottom:10px">
            <el-col :span="4" style="text-align:right;font-size:16px">
              <span>{{item.title}}:</span>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="19">
               <el-button :type="item.type" :icon="item.icon">{{item.name}}</el-button>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      list: [
        {
          id: 1,
          value: 70,
          name: "CPU利用率",
        },
        {
          id: 2,
          value: 50,
          name: "内存利用率",
        },
        {
          id: 3,
          value: 60,
          name: "硬盘利用率",
        },
      ],
      tags:[
          {
              name1:'内存总量',
              name2:'内存空闲',
              number1:3.85,
              number2:3.6
          },
          {
              name1:'硬盘总量',
              name2:'硬盘空闲',
              number1:3.85,
              number2:3.6
          }
      ],
      btn:[
        {
          title:'系统重启',
          type:'warning',
          name:'点击重启',
          icon:'el-icon-open'
        },
        {
          title:'系统关机',
          type:'primary',
          name:'点击关机',
          icon:'el-icon-turn-off'
        },
        {
          title:'恢复出厂设置',
          type:'info',
          name:'点击恢复出厂设置',
          icon:'el-icon-refresh'
        },
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.drawLine();
  },

  methods: {
    drawLine() {
      var echarts = require("echarts");
      var roseCharts = document.getElementsByClassName("myChart"); // 对应地使用ByClassName
      for (var i = 0; i < roseCharts.length; i++) {
        // 通过for循环，在相同class的dom内绘制元素
        var myChart = echarts.init(roseCharts[i]);
        window.onresize = function () {
            myChart.resize()
        }
        myChart.setOption({
          series: [
            {
              type: "gauge",
              axisLine: {
                lineStyle: {
                  width: 30,
                  color: [
                    [0.3, "#67e0e3"],
                    [0.7, "#37a2da"],
                    [1, "#fd666d"],
                  ],
                },
              },
              pointer: {
                itemStyle: {
                  color: "auto",
                },
              },
              axisTick: {
                distance: -30,
                length: 8,
                lineStyle: {
                  color: "#fff",
                  width: 2,
                },
              },
              splitLine: {
                distance: -30,
                length: 30,
                lineStyle: {
                  color: "#fff",
                  width: 4,
                },
              },
              axisLabel: {
                color: "auto",
                distance: 40,
                fontSize: 14,
              },
              detail: {
                valueAnimation: true,
                formatter: "{value}%",
                color: "auto",
                fontSize: 16,
              },
              data: [
                {
                  value: this.list[i].value,
                  name: this.list[i].name,
                },
              ],
            },
          ],
        });
      }
    },
  },
};
</script>

<style >

</style>