/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/index.vue'
import Childview from '@/views/layout/components/childview.vue'
const messageRouter = {
    path: '/message',
    component: Layout,
    redirect: '/message/',
    name: 'message',
    meta: {
        title: '消息中心',
        icon: 'tx-truck'
    },
    children: [
        {
            path: '/',
            component: () => import('@/views/message/index.vue'),
            name: 'messageList',
            meta: { title: '消息列表', cache: true }
        },
        {
            path: 'detail',
            component: () => import('@/views/message/detail.vue'),
            name: 'messageDetail',
            meta: { title: '消息详情', cache: true }
        }
    ]
}

export default messageRouter