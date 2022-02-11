<template>
   <div class="report_content">
       <el-table :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      " style="width: 100%">
      <el-table-column type="index" label="序号" width="50" :index="indexMethod"> </el-table-column>
      <el-table-column label="漏洞名称" property="name"> </el-table-column>
        <el-table-column label="披露时间" property="time"> </el-table-column>
        <el-table-column label="级别" property="lever"> </el-table-column>
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
          name:'端口扫描',
          time:'2001-01-01',
          lever:'低危',
        },
        {
          name:'智能端口服务识别',
          time:'2001-01-01',
          lever:'低危',
        },
         {
          name:'猜测出远程FTP服务存在可登录的用户名口令',
          time:'2001-01-01',
          lever:'高危',
        },
        {
          name:'猜测出远程主机存在SMB/Samba用户名口令',
          time:'2001-01-01',
          lever:'中危',
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