import {createRouter, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from "@/layout/Layout"

const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/screen',
        meta: {title: "大屏"},
        component: () => import('@/views/screen.vue')
    },
    {
        path: '/main',
        component: Layout,
        icon: "el-icon-s-home",
        meta: {title: "首页", requireAuth: true},
        redirect: '/home',
        children: [
            {
                path: "/home",
                name: "首页",
                icon: "el-icon-s-home",
                meta: {title: "首页", requireAuth: true},
                component: () => import('@/views/Home.vue')
            }
        ]
    },
    {
        path: '/search',
        component: Layout,
        icon: "el-icon-search",
        meta: {title: "搜索", requireAuth: true},
        children: [
            {
                path: "/search",
                name: "搜索",
                icon: "el-icon-search",
                meta: {title: "搜索", requireAuth: true},
                component: () => import('@/views/search.vue')
            }
        ]
    },
    {
        path: '/sea',
        component: Layout,
        name: "IP资产管理",
        icon: "el-icon-date",
        meta: {title: "IP资产管理", requireAuth: true},
        children: [
            
            {
                path: "/means_scan",
                name: "资产网段设置",
                meta: {title: "扫描网段设置", requireAuth: true},
                component: () => import("@/views/means_scan.vue")
            },
            {
                path: "/means_manage",
                name: "资产台账管理",
                meta: {title: "资产台账管理", requireAuth: true},
                component: () => import("@/views/means_manage.vue")
            },
           
        ]
    },
    {
        path: '/means',
        name: "资产自动发现",
        component: Layout,
        icon: "el-icon-monitor",
        meta: {title: "资产自动发现", requireAuth: true},
        children: [
            
            // {
            //     path: "/search",
            //     name: "资产搜索",
            //     meta: {title: "资产搜索", requireAuth: true},
            //     component: () => import('@/views/search.vue')
            // },
           
            // {
            //     path: "/means_manage",
            //     name: "资产台账管理",
            //     meta: {title: "资产台账管理", requireAuth: true},
            //     component: () => import("@/views/means_manage.vue")
            // },
            // {
            //     path: "/means_type",
            //     name: "资产类型管理",
            //     meta: {title: "资产类型管理", requireAuth: true},
            //     component: () => import("@/views/means_type.vue")
            // },
            {
                path: "/means_rule",
                name: "自动发现策略",
                meta: {title: "自动发现策略", requireAuth: true},
                component: () => import("@/views/means_rule.vue")
            },
            {
                path: "/train_manage",
                name: "资产状态策略",
                meta: {title: "资产状态策略", requireAuth: true},
                component: () => import('@/views/train_manage.vue')
            },
           
            {
                path: "/con_manage",
                name: "全局分析设置",
                meta: {title: "全局分析设置", requireAuth: true},
                component: () => import("@/views/con_manage.vue")
            }
        ]
    },
    {
        path: '/address',
        name: "IP地址簿管理",
        component: Layout,
        icon: "el-icon-location-information",
        meta: {title: "IP地址部管理", requireAuth: true},
        children: [
            {
                path: "/address_manage",
                name: "IP地址池",
                icon: "el-icon-location-information",
                meta: {title: "IP地址池", requireAuth: true},
                component: () => import("@/views/address_manage.vue")
            },
            
            // {
            //     path: "/address_menu",
            //     name: "白名单管理",
            //     meta: {title: "白名单管理", requireAuth: true},
            //     component: () => import("@/views/address_menu.vue")
            // },
            // {
            //     path: "/",
            //     name: "白名单管理",
            //     meta: {title: "白名单管", requireAuth: true},
            //     component: () => import("")
            // },
        ]
    },
    // {
    //     path: '/leak',
    //     name: "主机风险漏洞",
    //     component: Layout,
    //     icon: "el-icon-s-grid",
    //     meta: {title: "风险漏洞", requireAuth: true},
    //     children: [
            
    //         {
    //             path: "/monitor",
    //             name: "检测任务管理",
    //             meta: {title: "检测任务管理", requireAuth: true},
    //             component: () => import('@/views/monitor.vue')
    //         },
           
    //         {
    //             path: "/danger_leak",
    //             name: "风险漏洞管理",
    //             meta: {title: "风险漏洞管理", requireAuth: true},
    //             component: () => import("@/views/danger_leak.vue")
    //         },
    //         {
    //             path: "/leak_manage",
    //             name: "漏洞库管理",
    //             meta: {title: "漏洞库管理", requireAuth: true},
    //             component: () => import("@/views/leak_manage.vue")
    //         },
    //     ]
    // },
    {
        path: '/train',
        name: "资产智能巡检",
        component: Layout,
        icon: "el-icon-s-marketing",
        meta: {title: "资产智能巡检", requireAuth: true},
        children: [
            
            {
                path: "/monitor_rule",
                name: "巡检任务",
                meta: {title: "巡检任务", requireAuth: true},
                component: () => import('@/views/monitor_rule.vue')
            },
           
            {
                path: "/monitor_report",
                name: "巡检报告",
                meta: {title: "巡检报告", requireAuth: true},
                component: () => import("@/views/monitor_report.vue")
            }
        ]
    },
    // {
    //     path: '/report',
    //     name: "报表统计",
    //     component: Layout,
    //     icon: "el-icon-document",
    //     meta: {title: "报表统计", requireAuth: true},
    //     children: [
    //         {
    //             path: "/report_set",
    //             name: "报表预设设置",
    //             meta: {title: "报表预设设置", requireAuth: true},
    //             component: () => import("@/views/report_set.vue")
    //         },
    //         {
    //             path: "/report_manage",
    //             name: "报表文件管理",
    //             meta: {title: "报表文件管理", requireAuth: true},
    //             component: () => import("@/views/report_manage.vue")
    //         }
    //     ]
    // },
    {
        path: '/manage',
        name: "系统管理",
        component: Layout,
        icon: "el-icon-document-copy",
        meta: {title: "报表统计", requireAuth: true},
        children: [
            {
                path: "/user_manage",
                name: "用户管理",
                meta: {title: "用户管理", requireAuth: true},
                component: () => import("@/views/user_manage.vue")
            },
            {
                path: "/role_manage",
                name: "角色管理",
                meta: {title: "角色管理", requireAuth: true},
                component: () => import("@/views/role_manage.vue")
            },
            {
                path: "/sys_manage",
                name: "系统管理",
                meta: {title: "系统管理", requireAuth: true},
                component: () => import("@/views/sys_manage.vue")
            },
            {
                path: "/sys_monitor",
                name: "系统监控",
                meta: {title: "系统监控", requireAuth: true},
                component: () => import("@/views/sys_monitor.vue")
            },
            {
                path: "/copy_message",
                name: "授权信息",
                meta: {title: "授权信息", requireAuth: true},
                component: () => import("@/views/copy_message.vue")
            }
        ]
    },
]

// createRouter 创建路由实例
const router = createRouter({
    /**
     * hash模式：createWebHashHistory，
     * history模式：createWebHistory
     */
    history: createWebHashHistory(),
    bash:'/',
    routes
})

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 600, showSpinner: false })

// 设置title
router.beforeEach((to, from, next) => {
    // 启动进度条
    NProgress.start()

    // 设置头部
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = "默存"
    }
    next()
})

router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
})

// 抛出路由实例, 在 main.js 中引用
export default router