<template>
  <div class="set_content">
    <el-row style="padding: 10px">
      <el-button type="primary" @click="dialogFormVisible = true"
        >新增检测任务</el-button
      >
    </el-row>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50" :index="indexMethod"> </el-table-column>
      <el-table-column label="任务ID" property="name"> </el-table-column>
      <el-table-column label="任务类型" property="type"> </el-table-column>
      <el-table-column label="相关参数" property="param"> </el-table-column>
      <el-table-column label="任务目标" property="target"> </el-table-column>
      <el-table-column label="任务计划" property="plan"> </el-table-column>
      <el-table-column label="任务状态" property="status"> </el-table-column>
      <el-table-column label="上次运行时间" property="last_time"> </el-table-column>
      <el-table-column label="下次运行时间" property="next_time"> </el-table-column>
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

    <el-dialog title="新增检测任务" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="任务类型" :label-width="formLabelWidth">
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
          label="检测类型"
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
          label="弱口令插件"
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
        <el-form-item label="计划方式" :label-width="formLabelWidth">
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
        <el-form-item label="检测目标（IP网段）">
        <el-transfer
          v-model="value"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入"
          :data="data"
          @click="change"
        />
      </el-form-item>
      <el-form-item label="检测目标（IP地址）" :label-width="formLabelWidth" v-show="show">
         <el-input type="textarea" v-model="form.desc" ></el-input>
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
      const generateData = _ => {
        const data = [];
        const cities = ['10.8.8.88'];
        const spell = ['88'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            spell: spell[index]
          });
        });
        return data;
      };
    return {
      totalSize: 1,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 3, // 每页的数据条数
      tableData: [
        {
          name: "vnlcheck_once_20210107015128",
          type: "漏洞检测",
          param:'精准POC检测',
          target:'网段：10.8.8.0/24',
          plan:'一次性',
          status:'已结束',
          last_time:'2021-01-07 01:50:28',
          next_time:''
          
        }
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
          label: "漏洞检测",
        },
        {
          value: "2",
          label: "弱口令检测",
        },
      ],
      value: "",
      first: false,
      two: false,
      date: false,
      modal_options: [
        {
          value: "1",
          label: "精准POC",
        },
        {
          value: "2",
          label: "全量漏洞",
        },
     
      ],
      radio: "",
      radioPay: [
        {
          label: "一次性任务",
          value: "1",
        },
        {
          label: "计划性任务",
          value: "2",
        },
      ],
      value1: "",
      radio1: "",
      value2: "",
      open_options: [
        {
          value: "1",
          label: "Axis2后台弱口令",
        },
        {
          value: "2",
          label: "FTP后台弱口令",
        },
        {
          value: "3",
          label: "MYSQL后台弱口令",
        },
        {
          value: "4",
          label: "Redis后台弱口令",
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
       data: generateData(),
        filterMethod(query, item) {
          return item.spell.indexOf(query) > -1;
        },
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
      if (value == "漏洞检测") {
        this.date = false;
      }
      if (value == "弱口令检测") {
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