import request from '@/utils/request'

// 详情
export const purchaseDetail = (data) => {
    // return request({
    //     url: 'car/purchase/' + data.id,
    //     method: 'get',
    //     params: data
    // })

    // 模拟返回
    return new Promise((resolve) => {
        let response = {
            data: {
                data:{
                    branch_id: 1,
                    car_cost: "3642.00",
                    chassis_cost: "104.00",
                    company_code: "510100084",
                    created_at: "2018-12-10 11:52:03",
                    created_person: 2,
                    freight_cost: "1005.00",
                    id: 1,
                    number: 3,
                    order_status: 1,
                    other_optional: "sadf",
                    purchase_date: "2018-12-10 00:00:00",
                    purchase_reason: "",
                    purchase_type: 1,
                    supplier_id: 1,
                    system_number: "KCCG201812100001",
                    top_optional: "test",
                    updated_at: "2019-01-06 22:13:39",
                    updated_person: 2,
                    uprefit_cost: "105.00"
                },
                message: "success"
            }
        }
        resolve(response)
    })
}

// 新增/编辑
export const purchaseSave = (data) => {
    // let url = 'car/purchase'
    // let method = 'post'
    // if (data.id) {
    //     url = 'car/purchase/' + data.id
    //     method = 'patch'
    // }
    // return request({
    //     url: url,
    //     method: method,
    //     data: data,
    // })
    

    // 模拟返回
    return new Promise((resolve) => {
        let response = {
            data: {
                data:'',
                message: "success"
            }
        }
        resolve(response)
    })
}


// 删除
export const purchaseDel = (data) => {
    return request({
        url: 'carPurchase/' + data.id,
        method: 'delete',
        params: data,
    })
}