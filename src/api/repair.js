import request from '@/utils/request'

/**
 * ===========================================
 * 维修登记
 * ===========================================
 */
// 详情
export const repairDetail = (data) => {
    return request({
        url: 'repair/repair/'+ data.id,
        method: 'get',
    })
}
// 新增/更新
export const repairSave = (data) => {
    let url = 'repair/repair';
    let method = 'post';
    // 更新
    if (data.id) {
        url = url + '/' + data.id;
        method = 'patch';
    }
    return request({
        url: url,
        method: method,
        data: data
    })
}
// 作废
export const repairDelete = (data) => {
    return request({
        url: 'repair/repair/'+data.id,
        method: 'delete',
    })
}