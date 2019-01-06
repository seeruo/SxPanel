import request from '@/utils/request'

// 登陆接口
export const login = (data) => {
    return request({
        url: 'login',
        method: 'post',
        data,
    })
    
    // 模拟返回
    return new Promise((resolve, reject) => {
        let response = {
            data: {
                token: 'sdfasdfsdfasdfasdfsdf1123122222'
            }
        }
        resolve(response)
    })
}
// 登陆接口
export const logout = ()=>{
    // return request({
    //     url: 'logout',
    //     method: 'post',
    // })
    // 模拟返回
    return new Promise((resolve, reject) => {
        let response = {
            data: {
                token: ''
            }
        }
        resolve(response)
    })
}
// 用户身份信息
export const user = (data) => {
    // return request({
    //     url: 'user',
    //     method: 'get',
    // })

    // 模拟返回
    return new Promise((resolve) => {
        let response = {
            data: {
                data: {
                    uid: 1,
                    company_address: "成都市天府街",
                    company_code: "510100084",
                    company_logo: "",
                    company_name: "思行代码科技有限公司",
                    depart_id: 1,
                    depart_name: "总裁办",
                    email: "example@admin.com",
                    header: "https://lccdn.phphub.org/uploads/avatars/1_1530614766.png?imageView2/1/w/200/h/200",
                    message_total: 3,
                    name: "左浪",
                    phone: "18628951290",
                    rules: [
                        "index/index", 
                        "table/list", 
                        "table/create", 
                        "table/update", 
                        "table/delete"]
                },
                message: "操作成功"
            }
        }
        resolve(response)
    })
}
// 菜单
export const menu = (data) => {
    // return request({
    //     url: 'menu',
    //     method: 'get',
    // })
    // 模拟返回
    return new Promise((resolve) => {
        let response = {
            data: {
                data: [
                    {title:"Dashboard", path:"/dashboard/",icon:"fa-home", sort:1, rules:["index/index"]},
                    {title:"Table",path:"/table/map/",icon:"fa-table",sort:2,
                        children:[{
                                title:"Order List",
                                path:"/table/purchase/list",
                                icon:"fa-list",
                                sort:1,
                                rules:["table/list","table/create",
                                    "table/update","table/delete"]
                            }]}
                ],
                message: "操作成功"
            }
        }
        resolve(response)
    })
}
// 角色
export const rule = (code) => {
    return request({
        url: 'menu/'+code,
        method: 'get',
    })
}
