/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/index.vue'
import Childview from '@/views/layout/components/childview.vue'
const settingRouter = {
    path: '/setting',
    component: Layout,
    redirect: '/setting/map',
    name: 'setting',
    meta: {
        title: '系统设置',
        icon: 'tx-setting'
    },
    children: [
        {
            path: 'map',
            component: Childview,
            redirect: '/setting/map/',
            children: [
                {
                    path: '/',
                    name: 'settingMap',
                    component: () => import('@/views/setting/map.vue'),
                    meta: { title: '系统设置',cache:true, icon: 'tx-setting',hidden:true},
                }
            ]
        },
        {
        // /setting/role/list
            path: 'role',
            name: 'settingRoleIndex',
            component: Childview,
            meta: { title: '角色管理', cache:false,  icon: 'tx-custom-data'},
            redirect: '/setting/role/list',
            children:[
                {
                    path: 'list',
                    component: () => import('@/views/setting/role/list.vue'),
                    name: 'settingRoleList',
                    meta: { title: '角色管理', cache: true, hidden:true }
                },
                {
                    path: 'detail',
                    component: () => import('@/views/setting/role/detail.vue'),
                    name: 'carsPurchaseDetail',
                    meta: { title: '权限设置', cache: true }
                }
            ]
        }
    ]
}

export default settingRouter