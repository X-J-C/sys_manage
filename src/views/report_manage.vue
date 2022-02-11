<template>
   <div class="report_content">
       <el-table :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      " style="width: 100%">
      <el-table-column type="index" label="序号" width="50" :index="indexMethod"> </el-table-column>
      <el-table-column label="报表名称" property="name"> </el-table-column>
      <el-table-column label="生成日期">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
        <el-table-column label="报表创建人" property="user"> </el-table-column>
        <el-table-column label="文件类型" property="type"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >下载</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 10px; text-align: end"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="total,sizes,prev, pager, next,jumper"
      :page-sizes="[3, 5, 7, 9]"
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
      pageSize: 3, // 每页的数据条数
             tableData: [
        {
          date: "2021-03-26",
          name: "报表1",
          user: "admin",
          type:'PDF'
        },
        {
          date: "2021-03-26",
          name: "报表2",
          user: "user",
          type:'PDF'
        },
        {
          date: "2021-03-26",
          name: "报表3",
          user: "user",
          type:'HTML'
        },
        {
          date: "2021-03-26",
          name: "报表4",
          user: "admin",
          type:'PDF'
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