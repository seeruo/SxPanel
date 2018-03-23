import axios from 'axios';
import store from '../vuex';
import router from '../router';
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://api.codegrids.com/'; // 生产
axios.defaults.baseURL = 'http://local.com/203.AdminPanel/'; // 开发

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
		if (config.method=="post"){
	        config.data = qs.stringify(config.data);
			config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
	    }
	    // 附加TOKEN
	    if (store.state.token) {
			config.headers['Authorization'] = store.state.token;
	    }
		return config;
  	}, function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
  	});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
		// 对响应数据做点什么
		if (response.status == 200 && response.data.status) {
			if (response.data.status) {
				store.commit('storeToken', response.data)
			}
	    	// 存储TOKEN值
		}
		return response;
  	}, function (error) {
		// 对响应错误做点什么
		return Promise.reject(error);
  	});

export default axios;
