import request from '@/utils/request'

// 消息列表
export const msglist = (data) => {
    return request({
        url: 'login',
        method: 'get',
        params: data,
    })
}