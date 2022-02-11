<template>
  <div class="user_content">
    <div class="user_add">
      <el-button type="primary" plain @click="dialogFormVisible = true"
        >新增用户</el-button
      >
    </div>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="100" :index="indexMethod"> </el-table-column>
      <el-table-column property="username" label="用户名"> </el-table-column>
      <el-table-column property="name" label="昵称"> </el-table-column>
      <el-table-column property="date" label="日期"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
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

  <el-dialog title="新增用户" v-model="dialogFormVisible" width="30%">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog title="编辑用户" v-model="dialogeditVisible" width="30%">
    <el-form :model="editform">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="editform.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="editform.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogeditVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogeditVisible = false"
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
          username: "xx",
          name: "xuxu",
          date: "2021-3-2 10:30:00",
        },
        {
          username: "xx",
          name: "xuxu",
          date: "2021-3-2 10:30:00",
        },
        {
          username: "xx",
          name: "xuxu",
          date: "2021-3-2 10:30:00",
        },
        {
          username: "xx",
          name: "xuxu",
          date: "2021-3-2 10:30:00",
        },
      ],
      totalSize: 1,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 3, // 每页的数据条数
      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {
        name: "",
        username: "",
      },
      dialogeditVisible:false,
      editform:{
        username:'',
        name:'',
      }
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    handleEdit(index, row) {
      this.dialogeditVisible=true;
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
     indexMethod(index){
        return (index+1) +(this.currentPage -1 ) *this.pageSize
    },
    update(){
      this.tableData.push(this.form);
      this.dialogFormVisible = false
    }
  },
};
</script>

