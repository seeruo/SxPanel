<template>
    <div class="childview">
        <transition name="fade-transform" mode="out-in">
            <keep-alive v-if="$route.meta.cache">
                <router-view v-if="routerAlive" />
            </keep-alive>
            <router-view v-else></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'childview',
    data(){
        return{
            routerAlive: true
        }
    },
    watch:{
        $route(to, from){
            // 是否进入的是同一个组件页面::
            if (to.path === from.path && to.fullPath !== from.fullPath) {
                this.reload()
            }
        }
    },
    methods:{
        reload(){
            this.routerAlive = false;
            this.$nextTick(function () {
                this.routerAlive = true;
            })
        }
    }
}
</script>