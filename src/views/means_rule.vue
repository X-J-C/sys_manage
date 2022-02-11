<template>
  <div class="rule_content">
    <div class="user_add">
      <el-button type="primary" @click="dialogFormVisible = true"
        >新增扫描规则</el-button
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
      <el-table-column property="number" label="任务ID"> </el-table-column>
      <el-table-column property="target" label="扫描目标"> </el-table-column>
      <el-table-column property="prot" label="扫描端口"> </el-table-column>
      <el-table-column property="param" label="扫描参数"> </el-table-column>
      <el-table-column property="plan" label="扫描计划"> </el-table-column>
      <el-table-column property="state" label="任务状态"> </el-table-column>
      <el-table-column property="date" label="扫描时间"> </el-table-column>
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

  <el-dialog title="新增IP类型" v-model="dialogFormVisible" width="50%">
    <el-form :model="form">
      <el-form-item label="任务名称" :label-width="formLabelWidth">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="计划方式" :label-width="formLabelWidth">
        <el-select v-model="form.plan" placeholder="请选择" style="width: 100%" @change="bclxChange">
          <el-option
            v-for="item in plan_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计划任务" :label-width="formLabelWidth"  v-show="hidden">
        <el-date-picker
      v-model="date"
      type="datetime"
      placeholder="选择日期时间"
      style="width: 100%"
     >
    </el-date-picker>
      </el-form-item>
      <el-form-item label="分组网段数" :label-width="formLabelWidth" v-show="hidden">
        <el-select v-model="form.group" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in group_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分组错时时间" :label-width="formLabelWidth" v-show="hidden">
        <el-select v-model="form.time" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in time_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="扫描端口" :label-width="formLabelWidth">
        <el-select v-model="form.port" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in port_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="扫描速度" :label-width="formLabelWidth">
        <el-select v-model="form.rate" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in rate_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否进行主机识别" :label-width="formLabelWidth">
        <el-select v-model="form.host" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in host_options"
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
      <el-form-item label="扫描目标（IP地址）" :label-width="formLabelWidth" v-show="show">
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
      tableData: [
        {
          name: "每日",
          number: "servicescan_once_20210206010441",
          target: "网段：10.8.8.0/24等1个",
          port: "内置：全端口（1-65535）",
          param: "扫描速度：优先(1024) 主机识别：是",
          plan: "一次性",
          state: "已结束",
          date: "2020-03-26",
        },
        {
          name: "每日",
          number: "servicescan_once_20210206010441",
          target: "网段：10.8.8.0/24等1个",
          port: "内置：全端口（1-65535）",
          param: "扫描速度：优先(1024) 主机识别：是",
          plan: "一次性",
          state: "已结束",
          date: "2020-03-26",
        },
        {
          name: "每日",
          number: "servicescan_once_20210206010441",
          target: "网段：10.8.8.0/24等1个",
          port: "内置：全端口（1-65535）",
          param: "扫描速度：优先(1024) 主机识别：是",
          plan: "一次性",
          state: "已结束",
          date: "2020-03-26",
        },
        {
          name: "每日",
          number: "servicescan_once_20210206010441",
          target: "网段：10.8.8.0/24等1个",
          port: "内置：全端口（1-65535）",
          param: "扫描速度：优先(1024) 主机识别：是",
          plan: "一次性",
          state: "已结束",
          date: "2020-03-26",
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
        desc:''
      },
      plan_options: [
        {
          value: "1",
          label: "一次性任务",
        },
        {
          value: "2",
          label: "计划性任务",
        },
      ],
      port_options: [
        {
          value: "1",
          label: "全端口",
        },
        {
          value: "2",
          label: "常见10000端口",
        },
      ],
      rate_options: [
        {
          value: "1",
          label: "优先",
        },
      ],
      host_options: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "2",
          label: "否",
        },
      ],
      group_options:[
        {
          value:'1',
          label:'不分组'
        },
        {
          value:'2',
          label:'1'
        },
        {
          value:'3',
          label:'2'
        },
        {
          value:'4',
          label:'3'
        },
        {
          value:'5',
          label:'4'
        },
        {
          value:'6',
          label:'5'
        }
      ],
      time_options:[
        {
          value:'1',
          label:'不错时'
        },
        {
          value:'2',
          label:'30分钟'
        },
        {
          value:'3',
          label:'1小时'
        },
        {
          value:'4',
          label:'2小时'
        },
        {
          value:'5',
          label:'3小时'
        }
      ],
       data: generateData(),
        value: [],
        filterMethod(query, item) {
          return item.spell.indexOf(query) > -1;
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