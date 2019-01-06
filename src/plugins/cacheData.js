import store from '@/store';

export default {
    methods:{
        $cacheData(form){
            const key = this.$getFormStoreKey();
            const newform = this.$deepCopy(form);
            const data = {key: key, form: newform}
            this.$store.dispatch('app/cachePage', data);
        },
        $getCacheData(){
            const key = this.$getFormStoreKey();
            const forms = this.$store.state.app.pages;
            let formData = '';
            if (forms.length === 0) {
                return '';
            }
            forms.forEach((item) => {
                if (item.key === key) {
                    formData = this.$deepCopy(item.form);
                    return true;
                }
            });
            return formData;
        },
        $getFormStoreKey(){
            // 获取key的第一字符串
            let storeKey = this.$route.path.replace(/\/[a-z]/g, (v) => {
                return v.replace(/\//, "").toUpperCase();
            });
            // 获取key的第二字符串
            let storeKey2 = '';
            const query = this.$route.query;
            const queryKeys = Object.keys(this.$route.query);
            if (queryKeys.length > 0) {
                queryKeys.forEach(function (key, i) {
                    storeKey2 += '_'+ key +'_'+ query[key];
                });
            }
            return storeKey = storeKey + storeKey2;
        }
    }
}