import {menu, user, login, logout} from '@/api/user'

// initial state
const state = {
    sidebar: {
        collapse: false,
    },
    menus:[],
    token: localStorage.getItem('saas_token'),
    user: {
        name: '游客',
        header: "",
        email: "example@qq.com",
        phone: "186****1290",
        depart_name: '我的部门',
        company_code: 'XXXXXXXXX',
        company_name: "公司名称",
        company_logo: "",
        company_address: "公司地址",
        message_total: 0,
        rules: []
    },
    device: 'computer',
    tabs:[],
    pages:[]
}

// getters
const getters = {}

// actions
const actions = {
    // 初始设备
    initDevice({ commit }) {
        commit('CHECK_DEVICE');
    },
    initTabs ({ commit }) {
        let localTabs = localStorage.getItem(`localTabs`);
        localTabs = JSON.parse(localTabs);
        if (localTabs !== null && localTabs.length > 0) {
            commit('INIT_TABS', localTabs);
            commit('UPDATE_LOCAL_TABS');
        }
    },
    login({commit}, data){
        return new Promise((resolve, reject) => {
            login(data).then(response => {
                const data = response.data
                commit('SET_TOKEN', data.token);
                localStorage.setItem('saas_token', data.token);
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({commit}){
        return new Promise((resolve, reject) => {
            logout().then(response => {
                const data = response.data
                commit('SET_TOKEN', '');
                localStorage.setItem('saas_token', '');
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 初始APP
    setMenu({ commit }){
        menu().then(response => {
            const data = response.data
            commit('SET_MENUS', data.data);
        })
    },
    setUser({ commit }){
        user().then(response => {
            const data = response.data
            commit('SET_USER', data.data);
        })
    },
    // 获取次级菜单
    getMapMenus({ commit }, path){
        return new Promise((resolve, reject) => {
            // 设置子菜单
            let mapMenus = [];
            let mapRules = [];
            state.menus.forEach((tab, index) => {
                if (tab.path === path) {
                    mapMenus = tab.children;
                    mapRules = tab.rules;
                    return true;
                }
            });
            resolve(mapMenus, mapRules)
        })
    },
    toggleSideBar ({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    addOneTab ({ commit }, route) {
        commit('ADD_TAB', route);
        commit('UPDATE_LOCAL_TABS');
    },
    removeTab({ commit }, route){
        return new Promise(resolve => {
            commit('REMOVE_TAB', route);
            commit('UPDATE_LOCAL_TABS');
            resolve([...state.tabs]);
        })
    },
    removeAllTabs({ commit }){
        return new Promise(resolve => {
            commit('REMOVE_ALL_TABS');
            commit('UPDATE_LOCAL_TABS');
            resolve();
        })
    },
    cachePage ({ commit }, form) {
        commit('SAVE_FORM', form);
    },
}

// mutations
const mutations = {
    // 设置token
    SET_TOKEN: (state, token)=>{
        state.token = token;
    },
    // 初始化菜单
    SET_MENUS: (state, payload) => {
        state.menus = payload;
    },
    // 初始化用户
    SET_USER: (state, payload) => {
        state.user = payload;
    },
    // 折叠菜单
    TOGGLE_SIDEBAR: (state) => {
        state.sidebar.collapse = !state.sidebar.collapse;
    },
    // 检查终端
    CHECK_DEVICE: (state) => {
        const rect = document.body.getBoundingClientRect()
        var isMobile = rect.width < 1024;
        if (isMobile) {
            state.device = 'mobile';
            state.sidebar.collapse = true;
        }else{
            state.device = 'computer';
            state.sidebar.collapse = false;
        }
    },
    // TABS操作相关
    INIT_TABS: (state, payload)=>{
        state.tabs = payload.slice()
    },
    // TODO::这里结构体需要修改
    ADD_TAB: (state, payload) => {
        if (state.tabs.some(v => v.fullPath === payload.fullPath)){
            state.tabs.forEach((tab, index) => {
                if (tab.fullPath === payload.fullPath) {
                    if (JSON.stringify(tab) !== JSON.stringify(payload)) {
                        state.tabs[index] = payload
                    }
                    return true;
                }
            });
        }else{
            state.tabs.push(payload)
        }
    },
    REMOVE_TAB: (state, route) => {
        state.tabs.forEach((tab, index) => {
            if (tab.fullPath === route.fullPath) {
                state.tabs.splice(index, 1);
                return true;
            }
        });

        // 获取key的第一字符串
        let storeKey = route.path.replace(/\/[a-z]/g, (v) => {
            return v.replace(/\//, "").toUpperCase();
        });
        // 获取key的第二字符串
        let storeKey2 = '';
        const query = route.query;
        const queryKeys = Object.keys(route.query);
        if (queryKeys.length > 0) {
            queryKeys.forEach(function (key, i) {
                storeKey2 += '_'+ key +'_'+ query[key];
            });
        }
        storeKey = storeKey + storeKey2;

        state.pages.forEach((page, index) => {
            if (page.key === storeKey) {
                state.pages.splice(index, 1);
                return true;
            }
        });
    },
    REMOVE_ALL_TABS:(state)=>{
        state.tabs.forEach((tab, index) => {
            // 保留页面
            if (tab.noClose) {
                state.tabs = state.tabs.slice(index, index+1);
                return true;
            }
        });
    },
    UPDATE_LOCAL_TABS:(state)=>{
        // 变更标签内容同时更新本地缓存
        let localTabs = JSON.stringify(state.tabs);
        localStorage.setItem(`localTabs`,  localTabs);
    },
    SAVE_FORM: (state, payload) => {
        if (state.pages.some(v => v.key === payload.key)){
            state.pages.forEach((form, index) => {
                if (form.key === payload.key) {
                    state.pages[index] = payload
                    return true;
                }
            });
        }else{
            state.pages.push(payload)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}