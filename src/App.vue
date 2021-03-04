<template>
  <el-container>
    <el-header>资产管理系统</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          :unique-opened="true"
          active-text-color="#ffd04b"
          router
        >
          <div v-for="(item, index) in list2" :key="index">
            <el-submenu
              v-if="item.children && item.children.length"
              :index="index"
              :key="index"
            >
              <template #title>
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>

              <template
                v-for="itemChild in item.children"
                :key="itemChild.path"
              >
                <el-menu-item :index="itemChild.path">
                  <!-- <i :class="item.icon"></i> -->
                  <span>{{ itemChild.name }}</span>
                </el-menu-item>
              </template>
            </el-submenu>

            <el-menu-item v-else :index="item.path" :key="item.path">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main><router-view></router-view></el-main>
        <el-footer>Copy©版权所有</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// import NavMenu from "./views/aside.vue";
export default {
  components: {
    // NavMenu: NavMenu,
  },
  data() {
    return {
      list2: [
        {
          path: "index",
          name: "首页",
          icon: "el-icon-house",
        },
        {
          path: "search",
          name: "搜索",
          icon: "el-icon-search",
        },
        {
          name: "自动资产管控",
          icon: "el-icon-monitor",
          children: [
            {
              path: "means_manage",
              name: "资产台账管理",
            },
            {
              path: "means_scan",
              name: "资产扫描",
            },
          ],
        },
        {
          path: "address_manage",
          name: "IP地址部管理",
          icon: "el-icon-map-location",
        },
        {
          name: "自动化运维",
          icon: "el-icon-copy-document",
          children: [
            {
              path: "object_manage",
              name: "运维对象管理",
            },
            {
              path: "back_policy",
              name: "配置备份策略",
            },
            {
              path: "modal_allocation",
              name: "配置模板配置",
            },
          ],
        },
        {
          name: "报表统计",
          icon: "el-icon-document",
          children: [
            {
              path: "report_set",
              name: "报表预设设置",
            },
            {
              path: "report_manage",
              name: "报表文件管理",
            },
          ],
        },
        {
          name: "系统管理",
          icon: "el-icon-document-copy",
          children: [
            {
              path: "user_manage",
              name: "用户管理",
            },
            {
              path: "role_manage",
              name: "角色管理",
            },
            {
              path: "sys_manage",
              name: "系统管理",
            },
            {
              path: "sys_monitor",
              name: "系统监控",
            },
            {
              path: "copy_message",
              name: "授权信息",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.el-container {
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu {
  height: 100%;
}
</style>
