<template>
  <div class="copy_content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="title">资产管理系统</span>
        </div>
      </template>
      <div class="text item">{{status}}</div>
      <div v-for="(item, index) in message" :key="index" class="text item">
        <p>{{ item.name }}:{{ item.text }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status:'您的授权正常',
      message: [
        {
          name: "系统版本",
          text: "V2.0",
        },
        {
          name: "单位信息",
          text: "广州网服信息技术有限公司",
        },
        {
          name: "授权类型",
          text: "临时测试版",
        },
        {
          name: "功能模块",
          text: "全功能(不受限)",
        },
        {
          name: "服务到期时间",
          text: "2022-01-01",
        },
      ],
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>

<style >


</style>