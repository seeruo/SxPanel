<template>
    <div class="breadcrumb">
        <el-breadcrumb class="app-breadcrumb" separator="/">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
                    <span v-if="item.redirect===&quot;noredirect&quot;||index==levelList.length-1" >
                        <i class="fa no-redirect" :class="item.meta.icon"> &nbsp;{{ item.meta.title }}</i>
                    </span>
                    <router-link v-else :to="item.redirect||item.path">
                        <i class="fa redirect" :class="item.meta.icon"> &nbsp;{{ item.meta.title }}</i>
                    </router-link>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>
<script>
import "@/assets/css/transition.less";
export default {
    data() {
        return {
            levelList: null
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => {
                return !item.meta.hidden && item.name;
            })
            const first = matched[0]
            if (first && first.name.trim().toLocaleLowerCase() !== 'dashboard'.toLocaleLowerCase()) {
                matched = [{ path: '/dashboard/', meta: { title: 'Dashboard', icon: 'fa-home' } }].concat(matched)
            }
            this.levelList = matched
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/assets/css/transition.less";

.breadcrumb {
    text-align: left;
}

.el-breadcrumb-item {
    line-height: 50px;
}

.app-breadcrumb.el-breadcrumb {
    display: inline-block;
}

.redirect {
    font-size: 14px !important;
    color: @header-font-color;
    cursor: pointer;
    font-weight: 500;
}

.no-redirect {
    font-size: 14px !important;
    color: @header-font-color + 50;
    cursor: text;
}
</style>