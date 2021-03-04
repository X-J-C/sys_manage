<template>
   <div class="main-content">
       <el-row style="padding:10px">
        <el-col :span="4" v-for="(item, index) in main_title" :key="index" class="main_title">
            <img :src="item.img" class="img">
            <div>
                <p class="title">{{item.title}}</p>
                <p class="text">{{item.text}}</p>
            </div>
        </el-col>
        </el-row>
        <el-row style="margin-top:10px">
            <el-col :span="4">
                <div v-for="(item, index) in main_content" :key="index" class="main_content">
                    <p class="text">{{item.title}}</p>
                    <p class="num">{{item.num}}</p>
                </div>
                
            </el-col>
            <el-col :span="20">
                <div id="mychart" :style="{width:'100%', height: '400px' }"></div>
            </el-col>
        </el-row>
        <p class="title">全网入网资产统计</p>
        <el-row style="padding:10px">
        <el-col :span="4" v-for="(item, index) in main_foot" :key="index" class="main_foot">
            <img :src="item.img" class="img">
            <div>
                <p class="title">{{item.title}}</p>
                <p class="text">{{item.num1}}已审核<el-divider direction="vertical"></el-divider>{{item.num2}}未审核</p>
            </div>
        </el-col>
        </el-row>
   </div>
</template>

<script>
export default {
    data() {
        return {
            main_title:[
                {
                  img:require('../assets/icon.png'),
                  title:'总览',
                  text:10  
                },
                {
                  img:require('../assets/icon.png'),
                  title:'业务系统',
                  text:5    
                },
                {
                  img:require('../assets/icon.png'),
                  title:'网络设备',
                  text:20    
                },
                {
                  img:require('../assets/icon.png'),
                  title:'在线资产',
                  text:5    
                },
                {
                  img:require('../assets/icon.png'),
                  title:'离线资产',
                  text:6    
                },
                {
                  img:require('../assets/icon.png'),
                  title:'总资产',
                  text:11    
                }
            ],
            main_content:[
                {
                    title:'在线资产',
                    num:10,
                },
                {
                    title:'离线资产',
                    num:6,
                }
            ],
            main_foot:[
                {
                    img:require('../assets/icon.png'),
                    title:'业务系统',
                    num1:9,
                    num2:8
                },
                {
                    img:require('../assets/icon.png'),
                    title:'网络设备',
                    num1:9,
                    num2:8
                },
                {
                    img:require('../assets/icon.png'),
                    title:'终端设备',
                    num1:9,
                    num2:8
                },
                {
                    img:require('../assets/icon.png'),
                    title:'哑终端',
                    num1:9,
                    num2:8
                },
                {
                    img:require('../assets/icon.png'),
                    title:'其他',
                    num1:9,
                    num2:8
                }
            ]
        };
    },

    components: {},

    computed:{},

    mounted () {
         this.drawLine();
    },

    methods: {
         drawLine(){
             var echarts = require("echarts");
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('mychart'))
            // 绘制图表
            myChart.setOption({
                 title: {
                    left: 'center',
                    text: '本日网络状况',
                },
                 xAxis: {
                    type: 'category',
                    data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
                    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
                    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
                    '21:00', '22:00', '22:00']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [0,0,0,0,0,0,0,0,3,8,4,1,3,0,0,0,0,0,0,0,0,0,0,0],
                    type: 'line',
                    smooth: true,
                    itemStyle : { normal: {label : {show:  true }}},
                }]
            });
        }
    },
}
</script>

<style >
.main-content{
  height: 100%;
  background-color: #fff;
}
.img{
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 10px;
}
.title{
    font-size: 20px;
    font-weight: bold;
}
.main_content{
    background-color: #f7f8fc;
    border: 1px solid #fff;
    width: 100%;
    height: 130px;
    padding: 30px;
}
.text{
    font-size: 16px;
    margin:0px;
    padding:0px
}
.num{
    font-size: 30px;
    font-weight: bold;
    margin:5px;
    padding:5px
}
.main_foot{
    margin-right: 10px;
}
</style>