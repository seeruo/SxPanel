import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	user:{
		name: sessionStorage.getItem('userName')
	},
	token: 'fucktoken'
}

const mutations = {
	storeToken (state,payload) {
		state.token 	= payload.token;
		state.user.name = payload.user;
	}
}

export default new Vuex.Store({
	state,
	mutations
})