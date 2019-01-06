import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/index.vue'

import dashboardRouter from '@/router/modules/dashboard.js'
import userRouter from '@/router/modules/user.js'
import messageRouter from '@/router/modules/message.js'
import tableRouter from '@/router/modules/table.js'

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/',name: 'login',component: Login},
        dashboardRouter,
        userRouter,
        messageRouter,
        tableRouter,
    ]
})

router.beforeEach((to, from, next) => {
    const toQuery = Object.keys(to.query);
    const toLen = toQuery.length;

    // 页面是否为新增页面::新增页面不带任何参数
    to.meta['create'] = true;
    if (toLen > 0 ) {
        to.meta['create'] = false;
    }

    // 相同路由组件页面切换
    if (to.path === from.path && to.fullPath !== from.fullPath) {
        to.meta['refreshable'] = true;
    }

    // 标识可以刷新状态
    to.meta['refreshable'] = true;
    if (typeof window.vue_tabs_click === 'boolean' && window.vue_tabs_click === true) {
        to.meta['refreshable'] = false;
        window.vue_tabs_click = false
    }

    // 页面跳转来源:: 特殊情况，某些需要检测页面跳转来源的情况
    to.meta['from'] = from.path;

    // 继续跳转
    next();
})

export default router;