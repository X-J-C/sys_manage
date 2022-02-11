<template>
  <div class="address_content">
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      height="300"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="100"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column property="ip_name" label="IP名称"> </el-table-column>
      <el-table-column property="ip_address" label="IP地址"> </el-table-column>
      <el-table-column property="rate" label="使用率">
        <template #default="scope">
          <el-progress
            type="line"
            :text-inside="true"
            :percentage="scope.row.progress"
            :color="scope.row.color"
            :stroke-width="24"
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column property="used" label="已使用"> </el-table-column>
      <el-table-column property="brand" label="未使用"> </el-table-column>
      <!-- <el-table-column label="操作">
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
      </el-table-column> -->
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

    <el-card class="address-card">
      <template #header>
        <div class="card-header">
          <span>IP地址分布</span>
        </div>
      </template>
      <!-- <div class="ip_search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="Ping包字节数">
                <el-input v-model="formInline.num" placeholder="1024"></el-input>
            </el-form-item>
            <el-form-item label="超时等待">
                <el-input v-model="formInline.time" placeholder="1000"></el-input>
            </el-form-item>
            <el-form-item label="重试次数">
                <el-input v-model="formInline.reset" placeholder="1"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            </el-form>
      </div> -->
      <div class="ip_spread">
        <div v-for="(item, index) in rowData" :key="index" class="row">
          <div class="label">{{ item[0] }}</div>
          <div class="content">
            <div
              v-for="(sitem, sindex) in item"
              :key="sindex"
              :class="[
                'number',
                green.indexOf(sitem) > -1 ? 'green' : '', 
                
              ]"
            >
              {{ sitem.split(".")[3] }}
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "../utils/axios";
export default {
  data() {
    return {
      tableData: [
        
      ],
      totalSize: 1,
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 3, // 每页的数据条数
      colCount: 31,
      row: [],
      ipStart: [30, 0, 11, 0],
      ipEnd: [30, 0, 11, 255],
      green: ["30.0.11.1", "30.0.11.200","30.0.11.15", "30.0.11.23","30.0.11.50", "30.0.11.60","30.0.11.100", "30.0.11.60",
      "30.0.11.156", "30.0.11.230","30.0.11.75", "30.0.11.63","30.0.11.130", "30.0.11.120","30.0.11.99", "30.0.11.123"],
      // formInline: {
      //     num:'',
      //     time:'',
      //     reset:''
      //   }
    };
  },

  components: {},

  created() {
    let i0 = 1,
      i1 = 1,
      i2 = 1,
      i3 = 1;
    if (this.ipEnd[0] - this.ipStart[0] > 0) {
      i0 = this.ipEnd[0] - this.ipStart[0] + 1;
    }
    if (this.ipEnd[1] - this.ipStart[0] > 1) {
      i1 = this.ipEnd[1] - this.ipStart[1] + 1;
    }
    if (this.ipEnd[2] - this.ipStart[2] > 0) {
      i2 = this.ipEnd[2] - this.ipStart[2] + 1;
    }
    if (this.ipEnd[3] - this.ipStart[3] > 0) {
      i3 = this.ipEnd[3] - this.ipStart[3] + 1;
    }
    let row = (i0 * i1 * i2 * i3) / (this.colCount + 1);
    for (let j = 0; j < row; j = j + 256 / (this.colCount + 1)) {
      for (let k = 0; k <= 255; k++) {
        let label = [this.ipStart[0], this.ipStart[1], this.ipStart[2], k];
        if (label.join(".") == this.ipEnd.join(".")) {
          this.row.push(label.join("."));
          break;
        }
        this.row.push(label.join("."));
      }
      if (this.ipStart[2] > 255) {
        this.ipStart[1] = this.ipStart[1] + 1;
        this.ipStart[2] = 0;
        if (this.ipStart[1] > 255) {
          this.ipStart[0] = this.ipStart[0] + 1;
          this.ipStart[1] = 0;
          this.ipStart[2] = 0;
        } else {
          this.ipStart[1] = this.ipStart[1] + 1;
        }
      } else {
        this.ipStart[2] = this.ipStart[2] + 1;
      }
    }
    let data = [];
    for (let i = 0; i < this.row.length; i = i + (this.colCount + 1)) {
      let data1 = [];
      for (let j = i; j < i + (this.colCount + 1); j++) {
        if (j < this.row.length) data1.push(this.row[j]);
      }
      data.push(data1);
    }
    this.row = data;
  },
  computed: {
    rowData() {
      return this.row;
    },
  },

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
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize;
    },
    getTabelInfo(){
           axios
        .get("/address/list")
        .then((res) => {
          this.tableData= res.data.address.result;
          console.log(res.data.address.result)
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