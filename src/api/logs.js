import request from '@/utils/request'

// 消息列表
export const logsList = (data) => {
    return request({
        url: 'logs',
        method: 'get',
        params: data,
    })
}