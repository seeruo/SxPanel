/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/index.vue'
const dashboardRouter = {
    path: '/dashboard',
    component: Layout,
    name: 'dashboard',
    meta: {
        title: 'Dashboard',
        icon: 'fa-home'
    },
    children: [
        {
            path: '/',
            name: 'dashboardIndex',
            component: () => import('@/views/dashboard/index.vue'),
            meta: { title: 'Dashboard', cache: false , icon: 'fa-home', hidden:true}
        }
    ]
}

export default dashboardRouter