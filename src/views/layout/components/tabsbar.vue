<template>
    <div class="scroll-container">
        <i class="opt-btn fa fa-angle-left" @click="scrollLeft"></i>
        <div class="tabs-area" ref="tabs_area">
            <div class="tabs-area-module">
                <span
                    v-for="tab in Array.from(tabsList)"
                    ref="tab"
                    class="router-tab"
                    :class="isActive(tab)?'active':''"
                    @click="handSelect(tab)">
                    <i class="fa fa-circle tab-active-btn"></i>
                    <span class="tab-text">{{ tab.title }}</span>
                <i class="fa fa-close tab-close-btn" v-show="!(tab.path == '/dashboard/')" @click.prevent.stop="removeTab(tab)"></i>
                </span>
            </div>
        </div>
        <i class="opt-btn fa fa-angle-right" @click="scrollRight"></i>
        <i class="opt-btn fa fa-close" @click="closeAll"></i>
    </div>
</template>
<script>
export default {
    name: 'tabsbar',
    data() {
        return {
            selectedTabs: 'dashboard',
        }
    },
    computed: {
        tabsList() {
            return this.$store.state.app.tabs;
        }
    },
    mounted() {
        this.$store.dispatch("app/initTabs");
    },
    watch: { //监听路由变化
        $route(to, from) {
            this.addViewTab();
        }
    },
    methods: {
        handSelect(route) {
            window.vue_tabs_click = true;
            this.$router.push(route);
        },
        isActive(route) {
            //@TODO::激活状态确认
            let nobj = this.getTabObj(this.$route);
            return route.fullPath === nobj.fullPath;
        },
        getTabObj(nowRoute) {
            let newObj = {
                title: nowRoute.meta.title || 'no-name',
                path: nowRoute.path,
                query: nowRoute.query,
                fullPath: nowRoute.fullPath
            };
            if (newObj.path == '/dashboard/') {
                newObj.noClose = true;
            }
            return newObj;
        },
        generateRoute() {
            if (this.$route.name) {
                return this.$route;
            }
            return false;
        },
        addViewTab() {
            const route = this.generateRoute()
            if (!route) {
                return false;
            }
            let addObj = this.getTabObj(route);
            this.$store.dispatch('app/addOneTab', addObj);
            this.moveToTab(addObj);
        },
        removeTab(route) {
            this.$store.dispatch('app/removeTab', route).then((views) => {
                if (this.isActive(route)) {
                    const latestView = views.slice(-1)[0];
                    if (latestView) {
                        this.$router.push(latestView);
                    } else {
                        this.$router.push('/dashboard/');
                    }
                }
            })
        },
        scrollLeft(e) {
            const dom = this.$refs.tabs_area;
            dom.scrollBy(-100, 0);
        },
        scrollRight() {
            const dom = this.$refs.tabs_area;
            dom.scrollBy(100, 0);
        },
        closeAll() {
            this.$store.dispatch('app/removeAllTabs').then(() => {
                this.$router.push('/dashboard/')
            })
        },
        moveToTab(route) {
            const tabs = this.$refs.tab
            // 需要等待渲染完成之后进行
            this.$nextTick(() => {
                let activeIndex = null;
                this.tabsList.forEach((tab, index) => {
                    if (tab.path === route.path) {
                        activeIndex = index;
                        return true;
                    }
                });
                if (typeof tabs !== 'object') return;
                const padding = 2;
                const $target = tabs[activeIndex];
                const $container = this.$refs.tabs_area
                const $containerLeft = $container.offsetLeft;
                const $containerWidth = $container.offsetWidth;
                const $targetLeft = $target.offsetLeft - $containerLeft;
                const $targetWidth = $target.offsetWidth;
                $container.scrollTo($targetLeft - $targetWidth - padding, 0);
            })
        }
    }
}
</script>
<style lang="less" scoped>
.scroll-container {
    background-color: @tabsbar-bg-color;
    height: 35px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px solid @tabsbar-border-color;
    border-bottom: 1px solid @tabsbar-border-color;
}

.scroll-container>i {
    height: 35px;
    width: 35px;
    line-height: 35px;
    font-size: 14px;
    border-right: 1px solid @tabsbar-border-color;
    border-left: 1px solid @tabsbar-border-color;
    cursor: pointer;
}

.scroll-container>i:hover {
    background-color: @tabsbar-bg-color - 10;
}

.tabs-area {
    flex: 1;
    height: 37px;
    line-height: 37px;
    overflow: hidden;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: @tabsbar-bg-color - 25;
    display: flex;
    align-items: center;
}

.tabs-area::-webkit-scrollbar {
    height: 0px;
}

.tabs-area::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 0px;
}

.tabs-area::-webkit-scrollbar-thumb:vertical {
    height: 0px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 0px;
}

.tabs-area-module {
    width: auto;
    height: 30px;
    line-height: 30px;
    text-align: left;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
}

.fa-angle-left,
.fa-angle-right {
    font-size: 20px !important;
}

.router-tab {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: @tabsbar-bg-color;
    border: 1px solid @tabsbar-border-color;
    color: @tabsbar-font-color;
    text-decoration: none;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    position: relative;
    margin: 0 3px;
    border-radius: 3px;

    .fa-circle {
        font-size: 12px;
    }

    .tab-text {
        flex: 1;
        padding: 0 10px 0 5px;
        white-space: nowrap;
    }


    .tab-active-btn {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        line-height: 16px;
        color: @tabsbar-bg-color - 25;
        margin-left: 5px;
    }

    .tab-close-btn {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        line-height: 16px;
        margin-right: 5px;
        font-size: 12px;
        color: @tabsbar-bg-color - 25;
    }

    .tab-close-btn:hover {
        color: @tabsbar-font-color;
        background-color: @tabsbar-bg-color - 20 !important;
    }
}


.active {
    color: @tabsbar-font-color-active;
    background-color: @tabsbar-bg-color-active  !important;

    /*-moz-box-shadow:2px 2px 1px @tabsbar-border-color - 40; 
    -webkit-box-shadow:2px 2px 1px @tabsbar-border-color - 40; 
    box-shadow:2px 2px 1px @tabsbar-border-color - 40;*/

    /*.tab-close-btn:hover {
        background-color: @tabsbar-bg-color!important;
        color: @tabsbar-font-color;
    }*/

    .tab-text {
        font-weight: bold;
    }

    .tab-active-btn {
        color: @tabsbar-font-color-active;
    }
}
</style>