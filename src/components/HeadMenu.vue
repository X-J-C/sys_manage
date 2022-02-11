<template>
    <div class="head-menu">
        <el-space wrap size="large">
            <span  >
                <router-link :to="{path:'/screen'}" target="_blank">
                <!--<i class="el-icon-full-screen"></i>-->
                <span style="color:#fff;font-size:16px">大屏</span>
                </router-link>
                
            </span>
            <!-- 个人设置  -->
            <el-dropdown>
                    <span class="el-dropdown-link">
                        <span style="color:#fff">admin</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="el-icon-switch-button" @click="logout">退出</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-unlock" @click="onPassword">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-space>
    </div>
</template>

<script>

    export default {
       methods: {
        //    screen() {
        //         this.$router.push({
        //             path: "/screen"//要跳转的页面的路由
        //         });
        //         },          
        },
    }
</script>

<style lang="less">
    .head-menu {
        text-align: right;
        cursor: pointer;
        margin-right: -24px;
        .el-badge__content.is-fixed.is-dot {
            top: 15px;
        }
    }
</style>