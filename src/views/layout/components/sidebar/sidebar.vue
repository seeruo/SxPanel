<template>
    <div class="sidebar">
        <div class="sidebar-logo">
            <img :src="system.app_logo">
            <span v-show="!appStatus.sidebar.collapse">{{system.app_name}} {{system.app_version}}</span>
        </div>
        <el-scrollbar style="height: 100%;">
            <el-menu router @select="handleSelect" :default-active="this.$route.path" :show-timeout="200" mode="vertical" :collapse="collapse_status">
                <el-menu-item v-for="(item,i) in appStatus.menus" :key="i" :index="item.path">
                    <i class="fa fa-fw" :class="item.icon"></i>
                    <span class="spantext" slot="title"> {{item.title}}</span>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
export default {
    name: 'sidebar',
    data() {
        return {
            system: {}
        }
    },
    computed: {
        appStatus() {
            return this.$store.state.app
        },
        collapse_status() {
            const appStatus = this.$store.state.app;
            let status = '';
            if (appStatus.device === 'mobile') {
                status = false;
            } else {
                status = appStatus.sidebar.collapse;
            }
            return status;
        }
    },
    mounted() {
        this.$store.dispatch("app/setMenu");
        this.system = window.global;
    },
    methods: {
        handleSelect(key, keyPath) {
            if (this.appStatus.device === 'mobile') {
                this.$store.dispatch('app/toggleSideBar');
            }
        }
    }
}
</script>
<style scoped lang="less">
@import './sidebar.css';
@import './sidebar.less';
</style>