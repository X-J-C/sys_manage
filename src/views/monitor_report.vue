<template>
  <div class="rule_content">
  
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="100"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column property="name" label="任务名称"> </el-table-column>
      <el-table-column property="number" label="巡检结果"> </el-table-column>
      <el-table-column property="target" label="巡检完成时间"> </el-table-column>
      <el-table-column property="prot" label="巡检项"> </el-table-column>
      <el-table-column property="param" label="告警数"> </el-table-column>
      <el-table-column property="plan" label="严重告警"> </el-table-column>
      <el-table-column property="state" label="一般告警"> </el-table-column>
      <el-table-column property="date" label="轻微告警"> </el-table-column>
      <el-table-column property="result" label="结果确认"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
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
      tableData: [
        {
          name: "test",
          number: "完成",
          target: "2021-08-10",
          prot: "ip：端口",
          param: "0",
          plan: "0",
          state: "0",
          date: "0",
          result:"0"
        },
        
      ],
      totalSize: 1,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 3, // 每页的数据条数
      
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogeditVisible = true;
      this.editform = Object.assign({}, row);
    },
    handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning',
                confirmButtonText: "确定",
          cancelButtonText: "取消",
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {
                  this.$message.error('删除失败');
                });
        },
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
    bclxChange(selectValue) {
      if (selectValue == 1) {
        this.show = true;
        this.hidden= false;
      }
      if (selectValue == 2) {
        this.show = false;
        this.hidden=true;
      }
    },
    change(){
     console.log(this.data)
    }
  },
};
</script>

<style lang="less">




</style>