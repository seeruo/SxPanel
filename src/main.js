import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset-element.css';
import App from '@/App.vue';
import router from '@/router/index';
import store from '@/store/index';
import CommonPlugin from '@/plugins/common';

// 全局公共样式
import '@/assets/css/common.less';

Vue.config.productionTip = false

Vue.use(ElementUI);

// 常用公共插件一次性注入
Vue.use(CommonPlugin);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
