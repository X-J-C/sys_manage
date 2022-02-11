<template>
  <div class="search-content">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
      <el-tab-pane label="搜索--资产信息" name="first">
        <el-form
          :inline="true"
          :model="message_form"
          ref="formInline"
          class="demo-form-inline"
          label-width="170px"
          id="searchBox"
         
        >
          <el-form-item label="IP地址">
            <el-input
              v-model="message_form.ip"
              placeholder="例：10.1"
              suffix-icon="xxxx"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属网段">
            <el-input
              v-model="message_form.net"
              placeholder="例：10.1.0.0/24"
              suffix-icon="xxxx"
            ></el-input>
          </el-form-item>
          <el-form-item label="Mac地址">
            <el-input
              v-model="message_form.address"
              placeholder="例：0000-0000-0000"
              suffix-icon="xxxx"
            ></el-input>
          </el-form-item>
          <el-form-item label="MAC厂商">
            <el-input
              v-model="message_form.frim"
              placeholder="例：Cisco Systems"
              suffix-icon="xxxx"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-select v-model="message_form.region" placeholder="请选择">
              <el-option
                v-for="item in region_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作系统类型">
            <el-select v-model="message_form.operate" placeholder="请选择">
              <el-option
                v-for="item in operate_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="search_btn">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>重置</el-button>
          <el-button
            type="text"
            style="margin-left: 10px"
            id="closeSearchBtn"
            @click="closeSearch"
          >
            {{ word }}
            <i
              :class="showAll ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"
            ></i>
          </el-button>
        </div>
      </el-tab-pane>
      <!--<el-tab-pane label="搜索--开放服务" name="second">
        <el-form
          :inline="true"
          :model="open_form"
          ref="open_form"
          class="demo-form-inline"
          label-width="100px"
        >
          <el-form-item label="IP地址">
            <el-input
              v-model="open_form.ip"
              placeholder="例：10.151"
            ></el-input>
          </el-form-item>
          <el-form-item label="端口号">
            <el-input v-model="open_form.port" placeholder="例：22"></el-input>
          </el-form-item>
          <el-form-item label="服务名">
            <el-input
              v-model="open_form.name"
              placeholder="例：weblogic"
            ></el-input>
          </el-form-item>
          <el-form-item label="WEB标题">
            <el-input
              v-model="open_form.title"
              placeholder="例：信息系统"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="搜索--风险漏洞" name="third">
        <el-form
          :inline="true"
          :model="danger_form"
          ref="danger_form"
          class="demo-form-inline"
          label-width="100px"
        >
          <el-form-item label="IP地址">
            <el-input
              v-model="danger_form.ip"
              placeholder="例：10.151"
            ></el-input>
          </el-form-item>
          <el-form-item label="端口号">
            <el-input
              v-model="danger_form.port"
              placeholder="例：22"
            ></el-input>
          </el-form-item>
          <el-form-item label="漏洞信息">
            <el-input
              v-model="danger_form.name"
              placeholder="例：weblogic"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
       showAll:true,
      message_form: {
        ip: "",
        net: "",
        address: "",
        frim: "",
        region: "",
        operate_type: "",
      },
      open_form: {
        ip: "",
        port: "",
        name: "",
        title: "",
      },
      danger_form: {
        ip: "",
        port: "",
        name: "",
      },
      region_options: [
        {
          value: "选项1",
          label: "服务器",
        },
        {
          value: "选项2",
          label: "终端",
        },
        {
          value: "选项3",
          label: "网管",
        },
      ],
      value: "",
      operate_options: [
        {
          value: "选项1",
          label: "windows终端",
        },
        {
          value: "选项2",
          label: "windows服务器",
        },
        {
          value: "选项3",
          label: "Linux终端",
        },
        {
          value: "选项4",
          label: "Linux服务器",
        },
      ],
    };
  },

  components: {},

  computed: {
    word: function() {
   if (this.showAll == false) {
    //对文字进行处理
    return "展开搜索";
   } else {
    return "收起搜索";
   }
  }
  },

  mounted() {
    this.$nextTick(function() {
   this.closeSearch();
  });
  },

  methods: {
    
    closeSearch() {
   this.showAll = !this.showAll;
   var searchBoxHeght = document.getElementById("searchBox");
   if (this.showAll == false) {
    searchBoxHeght.style.height = 60 + "px";
   } else {
    searchBoxHeght.style.height = "auto";
   }
  }
  },
};
</script>

<style >



</style>