<template>
  <div class="sys_content">
    <el-tabs type="border-card">
      <el-tab-pane label="接口IP设置">
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="100" :index="indexMethod">
          </el-table-column>
          <el-table-column property="ip_name" label="接口名称">
          </el-table-column>
          <el-table-column property="ip_type" label="接口状态">
          </el-table-column>
          <el-table-column property="address_type" label="地址状态">
          </el-table-column>
          <el-table-column property="ip_address" label="IP地址">
          </el-table-column>
          <el-table-column property="ip_code" label="子网掩码">
          </el-table-column>
          <el-table-column property="ip_net" label="网关"> </el-table-column>
          <el-table-column property="dns1" label="DNS1"> </el-table-column>
          <el-table-column property="dns2" label="DNS2"> </el-table-column>
          <el-table-column label="生效配置">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
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
      </el-tab-pane>
      <!-- <el-tab-pane label="静态路由设置">配置管理</el-tab-pane>
      <el-tab-pane label="网络测试工具">角色管理</el-tab-pane>
      <el-tab-pane label="时间及NTP设置">定时任务补偿</el-tab-pane>
      <el-tab-pane label="可信主机设置">用户管理</el-tab-pane>
      <el-tab-pane label="密码策略设置">配置管理</el-tab-pane>
      <el-tab-pane label="登录锁定设置">角色管理</el-tab-pane>
      <el-tab-pane label="自动超时设置">定时任务补偿</el-tab-pane>
      <el-tab-pane label="HTTPS管理设置">用户管理</el-tab-pane>
      <el-tab-pane label="SYSLOG设置">配置管理</el-tab-pane>
      <el-tab-pane label="Debug日志">角色管理</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          ip_name: "ens32",
          ip_type: "正常",
          address_type: "静态IP",
          ip_address: "10.8.8.67",
          ip_code: "255.255.255.0",
          ip_net: "10.8.8.254",
          dns1: "",
          dns2: "",
          status: true,
        },
      ],
      totalSize: 1,
      currentPage: 1,
      total: 20,
      pageSize: 3,
    };
  },

  components: {},

  computed: {},

  mounted() {},

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
    }
  },
};
</script>

<style >

</style>