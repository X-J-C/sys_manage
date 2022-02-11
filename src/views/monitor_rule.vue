<template>
  <div class="rule_content">
    <div class="user_add">
      <el-button type="primary" @click="dialogFormVisible = true"
        >新增巡检任务</el-button
      >
    </div>
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
     <!-- <el-table-column property="number" label="任务类型"> </el-table-column>
      <el-table-column property="target" label="巡检对象"> </el-table-column>
      <el-table-column property="prot" label="巡检类型"> </el-table-column>-->
      <el-table-column property="param" label="巡检方式"> </el-table-column>
      <el-table-column property="plan" label="状态"> </el-table-column>
      <el-table-column property="state" label="执行状态"> </el-table-column>
      <el-table-column property="ondate" label="上次巡检时间"> </el-table-column>
       <el-table-column property="offdate" label="下次巡检时间"> </el-table-column>
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

  <el-dialog title="新增巡检任务" v-model="dialogFormVisible" width="50%"  >
    <el-form :model="form">
      <el-form-item label="任务名称" :label-width="formLabelWidth">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
  <el-form-item label="启用/禁止" :label-width="formLabelWidth">
    <el-radio-group v-model="form.resource">
      <el-radio label="启用"></el-radio>
      <el-radio label="禁止"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="巡检IP" :label-width="formLabelWidth">
     <el-input v-model="form.ip"></el-input>
  </el-form-item>
  <el-form-item label="巡检端口" :label-width="formLabelWidth">
     <el-input v-model="form.root"></el-input>
  </el-form-item>
      <el-form-item label="巡检时间" :label-width="formLabelWidth">
        <el-date-picker
      v-model="date"
      type="datetime"
      placeholder="选择日期时间"
      style="width: 100%"
     >
    </el-date-picker>
      </el-form-item>
    
  
      
    
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    
    return {
      tableData: [
        {
          name: "test",
         
          param: "自动巡检",
          plan: "正常",
          state: "正常",
          ondate: "2020-08-26",
          offdate: "2020-08-26",
        },
        {
          name: "test1",
          
          param: "自动巡检",
          plan: "正常",
          state: "正常",
          ondate: "2020-09-26",
          offdate: "2020-09-26",
        },
      
      ],
      totalSize: 1,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 3, // 每页的数据条数
      dialogFormVisible: false,
      formLabelWidth: "140px",
      form: {
        type: "",
        desc:'',
        resource:'',
        ip:'',
        root:'',
      },
      
        date:'',
        show:false,
        hidden:false
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