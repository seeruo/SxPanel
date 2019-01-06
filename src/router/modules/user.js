/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/index.vue'
const userRouter = {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: 'noredirect',
    meta: {
        title: '用户',
        icon: 'user'
    },
    children: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/user/index.vue'),
            meta: { title: '用户详情', noCache: true }
        },
        {
            path: 'edit',
            name: 'detail',
            component: () => import('@/views/user/edit.vue'),
            meta: { title: '资料修改', noCache: true }
        },
        {
            path: 'password',
            name: 'password',
            component: () => import('@/views/user/password.vue'),
            meta: { title: '修改密码', noCache: true }
        }
    ]
}

export default userRouter