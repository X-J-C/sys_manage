<template>
  <div class="manage_content">
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="100" :index="indexMethod"> </el-table-column>
      <el-table-column property="state" label="状态" > 
        <template #default="scope">
      <i class="el-icon-circle-check" :style="{'color':scope.row.color,fontSize:'20px'}"></i>
    </template>
      </el-table-column>
      <el-table-column property="ip_address" label="IP地址" > </el-table-column>
      <el-table-column property="make" label="品牌" > </el-table-column>
      
      <el-table-column property="mac_address" label="MAC地址" > </el-table-column>
      <el-table-column property="operate_sysytem" label="操作系统" > </el-table-column>
      <el-table-column property="ip_type" label="IP类型" > </el-table-column>
      <el-table-column property="time" label="时长" > </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handledownload(scope.$index, scope.row)"
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
import axios from "../utils/axios";
export default {
  data() {
    return {
      tableData: [],
      totalSize: 1,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 3, // 每页的数据条数
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.getTabelInfo()
  },

  methods: {
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    indexMethod(index){
        return (index+1) +(this.currentPage -1 ) *this.pageSize
    },
     getTabelInfo(){
           axios
        .get("/sum/list")
        .then((res) => {
         
          this.tableData= res.data.manage_table.result;
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