
<template>
    <div class="layout">
        <el-container>
            <el-aside :class="collapseClass">
                <!-- 菜单栏 START -->
                <sidebar></sidebar>
                <!-- 菜单栏 END -->
            </el-aside>
            <el-container>

                <el-header>
                    <!-- 页面头部 START -->
                    <headbar></headbar>
                    <!-- 页面头部 END -->

                    <!-- 页面切换标签 START -->
                    <tabsbar></tabsbar>
                    <!-- 页面切换标签 END -->
                </el-header>

                <!-- 内容区域 START -->
                <el-main>
                    <!-- 二级目录不需要做缓存，全部根据状态去操作 -->
                    <transition name="fade-transform" mode="out-in">
                        <router-view/>
                    </transition>
                </el-main>
                <!-- 内容区域 END -->

            </el-container>
        </el-container>
    </div>
</template>
<script>
import headbar from "./components/headbar";
import sidebar from "./components/sidebar/sidebar";
import tabsbar from "./components/tabsbar";
export default {
    name: 'layout',
    computed: {
        appStatus() {
            return this.$store.state.app
        },
        collapseClass(){
            const appStatus = this.$store.state.app;
            let css = '';
            if (appStatus.sidebar.collapse) {
                if (appStatus.device === 'mobile') {
                    css ='el-aside-hide';
                }else{
                    css ='el-aside-half';
                }
            }
            return css;
        }
    },
    mounted(){
        this.$store.dispatch("app/initDevice");
        const _this = this;
        window.addEventListener("resize",function(){
            _this.$store.dispatch("app/initDevice");
        })
        this.$deepCopy('2');
    },
    methods: {
    },
    components: {
        headbar,
        sidebar,
        tabsbar
    }
}
// 颜色变量
</script>
<style scoped lang="less">
@import "~@/assets/css/transition.less";
.layout {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
}

/*layout css*/
body>.el-container {
    margin-bottom: 0px;
}

.el-header {
    background-color: @header-bg-color;
    text-align: center;
    padding: 0;
    height: 87px!important;
}
.el-main {
    padding: 10px 10px 0 10px;
    background-color: @main-bg-color;
    overflow-x: hidden;
}

.el-aside {
    background-color: @sidebar-bg-color;
    text-align: center;
    height: 100vh;
    width: 175px!important;
    transition: width .2s;
}

.el-aside-half {
    width: 55px!important;
}
.el-aside-hide {
    width: 0px!important;
}

.el-main {
    background-color: @main-bg-color;
    color: @main-font-color;
    text-align: left;
    height: calc(100vh - 90px);
}

/* 头部-下拉菜单 END */
</style>