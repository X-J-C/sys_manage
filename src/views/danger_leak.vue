<template>
   <div class="report_content">
       <el-table :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      " style="width: 100%">
      <el-table-column type="index" label="序号" width="50" :index="indexMethod"> </el-table-column>
      <el-table-column label="IP地址" property="name"> </el-table-column>
        <el-table-column label="端口号" property="root"> </el-table-column>
        <el-table-column label="计算机名" property="pc_name"> </el-table-column>
     <el-table-column label="操作系统" property="system"> </el-table-column>
     <el-table-column label="漏洞信息" property="leak_message"> </el-table-column>
     <el-table-column label="漏洞等级" property="leak_lever"> </el-table-column>
     <el-table-column label="漏洞来源" property="leak_source"> </el-table-column>
     <el-table-column label="发现时间" property="time"> </el-table-column>
     <el-table-column label="是否处置" property="change"> </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 10px; text-align: end"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="total,sizes,prev, pager, next,jumper"
      :page-sizes="[10, 20, 50]"
      :total="tableData.length"
      :page-size="pageSize"
      :current-page="currentPage"
    >
    </el-pagination>
   </div>
</template>

<script>
export default {
    data() {
        return {
            totalSize: 1,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
             tableData: [
        {
          name:'10.8.8.183',
          root:'139/tcp',
          pc_name:'资产信息',
          system:'VMware',
          leak_message:'目标主机上的SMB服务允许匿名登录',
          leak_lever:'低危',
          leak_source:'',
          time:'2021-07-21',
          change:'未处置'
        },
        {
          name:'10.8.8.99',
          root:'443/tcp',
          pc_name:'资产信息',
          system:'VMware',
          leak_message:'服务器支持 TLS Client-initiated 重协商攻击(CVE-2011-1473)',
          leak_lever:'中危',
          leak_source:'',
          time:'2021-07-21',
          change:'未处置'
        },{
          name:'10.8.8.88',
          root:'139/tcp',
          pc_name:'资产信息',
          system:'VMware',
          leak_message:'目标主机上的SMB服务允许匿名登录',
          leak_lever:'低危',
          leak_source:'',
          time:'2021-07-21',
          change:'未处置'
        }
        ,{
          name:'10.8.8.132',
          root:'443/tcp',
          pc_name:'资产信息',
          system:'VMware',
          leak_message:'检测到目标主机加密通信支持的SSL加密算法',
          leak_lever:'低危',
          leak_source:'',
          time:'2021-07-21',
          change:'未处置'
        }
      ],
        };
    },

    components: {},

    computed:{},

    mounted () {},

    methods: {
         handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize;
    },
    },
}
</script>

<style >

</style>