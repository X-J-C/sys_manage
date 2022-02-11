<template>
   <div class="report_content">
       <el-table :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      " style="width: 100%">
      <el-table-column type="index" label="序号" width="50" :index="indexMethod"> </el-table-column>
      <el-table-column label="任务内容" property="name"> </el-table-column>
        <el-table-column label="编辑策略" property="root"> </el-table-column>
        <el-table-column label="是否启用" property="pc_name"> </el-table-column>
     <el-table-column label="任务状态" property="system"> </el-table-column>
     <el-table-column label="上次执行时间" property="leak_message"> </el-table-column>
     <el-table-column label="上次执行结果" property="leak_lever"> </el-table-column>
     <el-table-column label="下次执行结果" property="leak_source"> </el-table-column>
     <el-table-column label="立即执行一次" property="time"> </el-table-column>
    
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
          name:'定时ICMP策略',
          root:'',
          pc_name:'未启用',
          system:'关闭',
          leak_message:'2021-03-19 00：:1:44',
          leak_lever:'共1个网段，254个地址，在线19个，探测用时2秒',
          leak_source:'',
          time:'',
        },
        {
          name:'定时ICMP策略',
          root:'',
          pc_name:'未启用',
          system:'关闭',
          leak_message:'2021-03-19 00：:1:44',
          leak_lever:'共1个网段，254个地址，在线19个，探测用时2秒',
          leak_source:'',
          time:'',
        },
        {
          name:'定时ICMP策略',
          root:'',
          pc_name:'未启用',
          system:'关闭',
          leak_message:'2021-03-19 00：:1:44',
          leak_lever:'共1个网段，254个地址，在线19个，探测用时2秒',
          leak_source:'',
          time:'',
        },
        {
          name:'定时ICMP策略',
          root:'',
          pc_name:'未启用',
          system:'关闭',
          leak_message:'2021-03-19 00：:1:44',
          leak_lever:'共1个网段，254个地址，在线19个，探测用时2秒',
          leak_source:'',
          time:'',
        },
        {
          name:'定时ICMP策略',
          root:'',
          pc_name:'未启用',
          system:'关闭',
          leak_message:'2021-03-19 00：:1:44',
          leak_lever:'共1个网段，254个地址，在线19个，探测用时2秒',
          leak_source:'',
          time:'',
        },
        
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