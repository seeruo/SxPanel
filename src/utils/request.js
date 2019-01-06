import axios from 'axios';
import store from '@/store';
import router from '../router';
import qs from 'qs';
import { Message } from 'element-ui';


const vConfig = window.global;

/**
 * create an axios instance
 * 创建一个axios实例
 * @type {[type]}
 */
const service = axios.create({
    baseURL: vConfig.base_api, // api 的 base_url
    timeout: 5000 // request timeout
})

/**
 * request interceptor
 * 请求拦截器
 * @DateTime 2018-10-26
 * @param    {[type]}   config [配置]
 * @return   {[type]}          [description]
 */
service.interceptors.request.use(
    config => {
        config.data = qs.stringify(config.data);
        // config.headers['Content-Type'] = "text/plain;charset=UTF-8";
        config.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8";
        config.headers['Version'] = vConfig.api_version;
        // Do something before request is sent
        let token = localStorage.getItem('saas_token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config
    },
    error => {
        Message({
            message: '网络错误',
            type: 'error',
        })
        Promise.reject(error)
    }
)

/**
 * response interceptor
 * 返回拦截器
 * @DateTime 2018-10-26
 * @param    {[type]}   response [返回内容]
 * @return   {[type]}            [description]
 */
service.interceptors.response.use(
    response => {
        const res = response.data;
        // 获取刷新的token
        if (typeof response.headers.authorization === 'string') {
            localStorage.setItem('saas_token', response.headers.authorization);
        }
        return response;
    },
    error => {
        const res = error.response;
        if(res.status === 400){
            Message({type: 'error', message: res.data.message});
        }else if (res.status === 401) {
            Message({type: 'error', message: res.data.message});
            router.push({path: '/'});
        }else if(res.status === 403){
            Message({type: 'error', message: '您没有操作权限！'});
        }else{
            Message({type: 'error', message: res.data.message})
        }
        return Promise.reject(error)
    }
)

export default service