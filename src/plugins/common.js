import store from '@/store';
// 常用公共方法
export default {
    install:function (Vue, options) {
        /**
         * 深度拷贝数组和对象, 浅度拷贝不要使用这个方法，性能消耗严重
         * @DateTime 2018-10-26
         * @param    {[type]}   source [数据源]
         * @return   {[type]}          [description]
         */
        Vue.prototype.$deepCopy = (source)=>{
            var sourceCopy = source instanceof Array ? [] : {};
            sourceCopy = JSON.parse(JSON.stringify(source));
            return sourceCopy;
        }
        /**
         * 检查是否是数字
         * @DateTime 2018-10-26
         * @param    {[type]}   obj [变量值]
         * @return   {Boolean}      [description]
         */
        Vue.prototype.$isNumber = (obj)=>{
            return typeof obj === 'number' && !isNaN(obj)
        }
        /**
         * 检查是否是数字
         * @DateTime 2018-10-26
         * @param    {[type]}   obj [变量值]
         * @return   {Boolean}      [description]
         */
        Vue.prototype.$checkAuth = (checkRules)=>{
            const userRules = store.state.app.user.rules;
            
            checkRules.forEach(function (item, index) {
                checkRules[index] = item.toLowerCase();
            })
            // 检查是否有权限
            const hasPermission = checkRules.some(rule => {
                return userRules.includes(rule)
            })
            return hasPermission;
        }
        /**
         * 生成随机颜色
         * @returns {string}
         */
        Vue.prototype.$randomColor = () => {
            const h = Math.round(Math.random()*359);
            return `hsl(${h}, 70%, 35%)`;
        }
    }
}
