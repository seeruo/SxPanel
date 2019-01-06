/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/index.vue'
import Childview from '@/views/layout/components/childview.vue'
const tableRouter = {
    path: '/table',
    name: 'table',
    component: Layout,
    meta: {title: 'Table', icon: 'fa-table'},
    redirect: '/table/map/',
    children: [
        {
            path: 'map',
            name: 'tableMap',
            component: Childview,
            redirect: '/table/map/',
            children: [
                {
                    path: '/',
                    name: 'tableMapIndex',
                    component: () => import('@/views/table/map.vue'),
                    meta: { title: 'Table', cache:true, icon: 'fa-table',hidden:true},
                }
            ]
        },
        {
            path: 'purchase',
            name: 'tablePurchase',
            component: Childview,
            meta: { title: 'Table List', icon: 'fa-list'},
            redirect: '/table/purchase/list',
            children:[
                {
                    path: 'list',
                    component: () => import('@/views/table/purchase/list.vue'),
                    name: 'tablePurchaseList',
                    meta: { title: 'Table List', cache: true, hidden:true, icon: 'fa-list'}
                },
                {
                    path: 'detail',
                    component: () => import('@/views/table/purchase/detail.vue'),
                    name: 'tablePurchaseDetail',
                    meta: { title: 'Detail', cache: true , icon: 'fa-edit'}
                }
            ]
        }
    ]
}

export default tableRouter