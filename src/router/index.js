import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import Home from '@/pages/Index';

Vue.use(Router)

export default new Router({
	routes: [
		{path: '/home',name: 'Home',component: Home},
		{path: '/login',name: 'Login',component: Login}
	]
})