<template>
  <div class="set_content">
    <el-row style="padding: 10px">
      <el-button type="primary" @click="dialogFormVisible = true"
        >新增扫描任务</el-button
      >
    </el-row>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50" :index="indexMethod"> </el-table-column>
      <el-table-column label="任务名称" property="name"> </el-table-column>
      <el-table-column label="任务ID" property="id"> </el-table-column>
      <el-table-column label="扫描目标" property="target"> </el-table-column>
      <el-table-column label="扫描端口" property="root"> </el-table-column>
      <el-table-column label="扫描参数" property="param"> </el-table-column>
      <el-table-column label="扫描计划" property="plan"> </el-table-column>
      <el-table-column label="任务状态" property="status"> </el-table-column>
      <el-table-column label="添加扫描时间" property="time"> </el-table-column>
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

    <el-dialog title="新增扫描任务" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="任务名称" :label-width="formLabelWidth">
         <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="计划方式" :label-width="formLabelWidth">
          <el-select
            v-model="form.option"
            placeholder="请选择"
            style="width: 100%"
            @change="bclxChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item
          label="计划任务"
          :label-width="formLabelWidth"
          v-show="two"
        >
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="分组网段数"
          :label-width="formLabelWidth"
          v-show="two"
        >
          <el-select
            v-model="form.open"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in open_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="扫描端口"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.modal"
            placeholder="请选择"
            style="width: 100%"
            multiple
          >
            <el-option
              v-for="item in modal_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item label="扫描速度" :label-width="formLabelWidth">
          <el-select
            v-model="form.file"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in file_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="扫描目标（IP网段）">
        <el-transfer
          v-model="value"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入"
          :data="data"
          @click="change"
        />
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
          name: "每日",
          id: "servicescan_once_20210206010441",
          target: "网段：10.8.8.0/24等1个",
          root:'内置：全端口(1-65535)',
          param:'扫描速度：非常快',
          plan:'一次性',
          status:'已结束',
          time:'2021-07-09 18:09:58'
        },
       
      ],
      dialogFormVisible: false,
      form: {
        option: "",
        region: "",
        name: "",
        name1: "",
      },
      formLabelWidth: "120px",
      options: [
        {
          value: "1",
          label: "一次性任务",
        },
        {
          value: "2",
          label: "计划性任务",
        },
      ],
      value: "",
      first: false,
      two: false,
      date: false,
      modal_options: [
        {
          value: "1",
          label: "全端口(1-65535)",
        },
        {
          value: "2",
          label: "常见10000端口",
        },
        {
          value: "3",
          label: "常见1000端口",
        },
       
      ],
      radio: "",
      radioPay: [
        {
          label: "全部时间",
          value: "1",
        },
        {
          label: "指定时间",
          value: "2",
        },
      ],
      value1: "",
      radio1: "",
      value2: "",
      open_options: [
        {
          value: "1",
          label: "不分组",
        },
        {
          value: "2",
          label: "1",
        },
      
      ],
      file_options: [
        {
          value: "1",
          label: "非常快(1024)",
        },
        {
          value: "2",
          label: "较快(512)",
        },
      ],
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
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
    bclxChange(selectValue) {
      if (selectValue == 1) {
        this.first = true;
        this.two = false;
      }
      if (selectValue == 2) {
        this.first = false;
        this.two = true;
        this.date = false;
      }
    },
    changeMax(value) {
      console.log(value);
      if (value == "一次性任务") {
        this.date = false;
      }
      if (value == "计划性任务") {
        this.date = true;
      }
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
  },
};
</script>

<style >

</style>