<template>
    <div class="headbar">
        <!-- <progressBar></progressBar> -->
        <!-- 收缩按钮 START -->
        <div class="collapse-bars" @click="toggleSideBar">
            <i class="fa fa-navicon" :class="{'fa-rotate-90': appStatus.sidebar.collapse }"></i>
        </div>
        <!-- 收缩按钮 END -->
        <!-- 面包屑导航 START -->
        <breadcrumb v-if="appStatus.device==='computer'"></breadcrumb>
        <!-- 面包屑导航 END -->
        <!-- 用户信息 START -->
        <div class="opt-menu">
            <companypanel v-if="appStatus.device==='computer'" :data="appStatus.user" style="margin-right: 40px;"></companypanel>
            <badgebtn :total="appStatus.user.message_total" style="margin-right: 40px;"></badgebtn>
            <userpanel :data="appStatus.user"></userpanel>
        </div>
        <!-- 用户信息 END -->
    </div>
</template>
<script>
import progressBar from '@/components/progressBar';
import breadcrumb from "./breadcrumb";
import companypanel from "./companypanel";
import badgebtn from "./badgebtn";
import userpanel from "./userpanel";
export default {
    name: 'headbar',
    computed: {
        appStatus() {
            return this.$store.state.app;
        }
    },
    mounted() {
        // 获取用户信息
        this.$store.dispatch("app/setUser");
    },
    methods: {
        handleSelect(command) {
            this.$router.push({ path: command }) //页面跳转
        },
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        }
    },
    components: {
        breadcrumb,
        badgebtn,
        companypanel,
        userpanel,
        progressBar
    }
}
</script>
<style scoped lang="less">
/* 下拉菜单 */
.headbar {
    height: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    color: @header-font-color;
    margin-right: 10px;
}

.headbar>.collapse-bars {
    color: @header-font-color;
    font-size: 22px !important;
    cursor: pointer;
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    margin-left: 20px;
}

.headbar>.breadcrumb {
    flex: 1;
}

.opt-menu {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
}
</style>