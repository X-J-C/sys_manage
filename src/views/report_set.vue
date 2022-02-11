<template>
  <div class="set_content">
    <el-row style="padding: 10px">
      <el-button type="primary" @click="dialogFormVisible = true"
        >新增报表</el-button
      >
    </el-row>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50" :index="indexMethod"> </el-table-column>
      <el-table-column label="报表名称" property="name"> </el-table-column>
      <el-table-column label="生成日期">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报表创建人" property="user"> </el-table-column>
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

    <el-dialog title="新增报表设置" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="选择组织节点" :label-width="formLabelWidth">
          <el-select
            v-model="form.region"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              label="广州网服信息技术有限公司"
              value="wangfu"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择报表大项" :label-width="formLabelWidth">
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
          label="基本报表模块"
          :label-width="formLabelWidth"
          v-show="first"
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
        <el-form-item
          label="资产统计时间"
          :label-width="formLabelWidth"
          v-show="first"
        >
          <el-radio-group v-model="radio" @change="changeMax">
            <el-radio
              v-model="addCagLabel"
              v-for="item in radioPay"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="资产统计时间"
          :label-width="formLabelWidth"
          v-show="date"
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
          label="基本报表模块"
          :label-width="formLabelWidth"
          v-show="two"
        >
          <el-radio v-model="radio1" label="1">服务开放总览</el-radio>
        </el-form-item>
        <el-form-item
          label="服务开放TOP"
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
        <el-form-item label="定时生成报表" :label-width="formLabelWidth">
          <el-date-picker
            v-model="value2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报表文件类型" :label-width="formLabelWidth">
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
          date: "2021-03-26",
          name: "报表1",
          user: "admin",
        },
        {
          date: "2021-03-26",
          name: "报表2",
          user: "user",
        },
        {
          date: "2021-03-26",
          name: "报表3",
          user: "user",
        },
        {
          date: "2021-03-26",
          name: "报表4",
          user: "admin",
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
          label: "资产统计报表",
        },
        {
          value: "2",
          label: "服务开放报表",
        },
      ],
      value: "",
      first: false,
      two: false,
      date: false,
      modal_options: [
        {
          value: "1",
          label: "资产状态总览",
        },
        {
          value: "2",
          label: "资产在线情况",
        },
        {
          value: "3",
          label: "资产组织排行",
        },
        {
          value: "4",
          label: "资产分类报告",
        },
        {
          value: "5",
          label: "资产识别报告",
        },
        {
          value: "6",
          label: "特殊类资产--网络打印机明细",
        },
        {
          value: "7",
          label: "特殊类资产--网络摄像头明细",
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
          label: "前10",
        },
        {
          value: "2",
          label: "前20",
        },
        {
          value: "3",
          label: "前30",
        },
      ],
      file_options: [
        {
          value: "1",
          label: "PDF",
        },
        {
          value: "2",
          label: "HTML",
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
      if (value == "全部时间") {
        this.date = false;
      }
      if (value == "指定时间") {
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