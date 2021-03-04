import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../components/index.vue'
import search from '../components/search.vue'
import user_manage from '../components/user_manage.vue'
import role_manage from '../components/role_manage.vue'
import sys_monitor from '../components/sys_monitor.vue'
import sys_manage from '../components/sys_manage.vue'
import copy_message from '../components/copy_message.vue'
const routes = [
  {
    path: '/',
    redirect: '/index' 
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/user_manage',
    name: 'user_manage',
    component: user_manage
  },
  {
    path: '/role_manage',
    name: 'role_manage',
    component: role_manage
  },
  {
    path: '/sys_monitor',
    name: 'sys_monitor',
    component: sys_monitor
  },
  {
    path: '/sys_manage',
    name: 'sys_manage',
    component: sys_manage
  },
  {
    path: '/copy_message',
    name: 'copy_message',
    component: copy_message
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
