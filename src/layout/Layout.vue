<template>
  <el-container class="container" direction="vertical">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="4">
          <div style="color: #fff">IP资产自动探测分析系统</div>
        </el-col>
        <el-col :span="1">
          <div class="header-collapse" @click="onCollapse">
            <i :class="[isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']" />
          </div>
        </el-col>
        <el-col :span="14">
          <div class="header-breadcrumb">
            <el-breadcrumb
              class="breadcrumb-container"
              separator-class="el-icon-arrow-right"
            >
              <el-breadcrumb-item
                v-for="item in this.$route.matched"
                :key="item.path"
                
                class="bread_item"
                >{{ item.meta.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col class="header-menu" :span="5">
          <HeadMenu></HeadMenu>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside :style="defaultHeight" :width="asideWidth">
        <el-menu
          class="aside-menu"
          router
          :default-active="$route.path"
          :collapse="isCollapse"
          :unique-opened="true"
          background-color="#163468"
          text-color="#fff"
          active-text-color="#fff"
        >
          <div v-for="menu in routers" :key="menu">
            <el-menu-item
              v-if="menu.children && menu.children.length === 1"
              :index="menu.children[0].path"
            >
              <i :class="menu.children[0].icon"></i>
              <template #title>
                {{ menu.children[0].name }}
              </template>
            </el-menu-item>
            <el-submenu v-else-if="menu.children" :index="menu.path">
              <template #title>
                <i :class="menu.icon"></i>
                <span :class="[isCollapse ? 'is-collapse' : '']">{{
                  menu.name
                }}</span>
              </template>
              <el-menu-item
                v-for="child in menu.children"
                :key="child"
                :index="child.path"
              >
                <i :class="child.icon"></i>
                <template #title>
                  {{ child.name }}
                </template>
              </el-menu-item>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container direction="vertical">
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { onBeforeMount, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import HeadMenu from "@/components/HeadMenu";

export default {
  components: {
    HeadMenu,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      isCollapse: false,
      asideWidth: "220px",
      // defaultHeight: {
      //   height: "",
      // },
      routers: [],
    });

    onBeforeMount(() => {
      state.routers = router.options.routes;
      // state.defaultHeight.height = document.body.clientHeight + "px";
    });

    const onCollapse = () => {
      if (state.isCollapse) {
        state.asideWidth = "220px";
        state.isCollapse = false;
      } else {
        state.isCollapse = true;
        state.asideWidth = "64px";
      }
    };

    const onRefresh = () => {
      router.push({ path: "main" });
    };

    return {
      ...toRefs(state),
      onCollapse,
      onRefresh,
    };
  },
};
</script>
<style lang="less">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #fff;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: #fff;
}
.el-breadcrumb__inner{
  color: #fff;
}
.container {
  background: #fff;
  height: 100%;

  .el-aside {
    height: 100%;
    transition: all 0.5s;
    background-color: #163468;
    overflow-y: auto;
    overflow-x: hidden;

    .aside-menu:not(.el-menu--collapse) {
      width: 220px;
      .el-menu-item.is-active {
        background-color: rgb(18, 42, 83) !important;
      }
    }
    .is-collapse {
      display: none;
    }
  }

  .el-aside::-webkit-scrollbar {
    width: 0px;
  }

  .el-header {
    background: #163468;
    line-height: 60px;
    font-size: 24px;
    border-bottom: 1px #000 solid;
    .header-collapse {
      cursor: pointer;
    }
    .header-breadcrumb {
      padding-top: 0.9em;
    }
    .header-menu {
      text-align: right;
    }
  }
  .el-main {
    padding: 0.6em;
    overflow-x: auto;
    overflow-y: auto;
  }
  .el-main::-webkit-scrollbar {
    width: 0px;
  }
  .el-footer {
    text-align: center;
  }
}
</style>