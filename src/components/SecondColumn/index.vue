<template>
    <div>
        <ul class="column-main">
            <span style="display: none" v-model="mapMenus"></span>
            <li class="column" v-for="(item,index) in columns" :key="index" @click="gotoPath(item)">
                <div class="icon-content" :style="{backgroundColor: item.bgColor ? item.bgColor: bgColor}">
                    <i class="fa" :class="item.icon"></i>
                </div>
                <span class="column-title">{{item.title}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'SecondColumn',
    data() {
        return {
            bgColor: '#409eff',
            hvColor: 'white',
            columns: []
        }
    },
    props: { settings: Array },
    computed: {
        mapMenus() {
            const storeApp = this.$store.state.app;
            // 这里只是一个触发控制器，主要是为了使用异步给columns赋值
            this.getMapMenus(storeApp);
            return true;
        }
    },
    methods: {
        gotoPath(item) {
            this.$router.push({ path: item.path })
        },
        getMapMenus(storeApp) {
            if (storeApp.menus.length !== 0) {
                // 获取权限
                this.$store.dispatch('app/getMapMenus', this.$route.path).then((menus) => {
                    this.columns = [];
                    let columns = []
                    if (this.settings) {
                        for (let i in menus) {
                            if (this.settings.includes(menus[i].path)) {
                                columns.push(menus[i])
                            }
                        }
                    } else {
                        columns = menus;
                    }
                    this.columns = this.$deepCopy(columns)
                    for (let k in this.columns) {
                        this.columns[k].bgColor = this.$randomColor();
                    }
                });
            }
        }
    }
}
</script>
<style scoped lang="less">
ul,
li {
    margin: 0px;
    padding: 0px;
}

li {
    list-style: none;
}

.column-main {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
}

.column-main>.column {
    width: 120px;
    height: 120px;
    margin: 11px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #666;
    transition: color .2s;
}

.column:hover {
    color: blue;
    transition: color .2s;
}

.icon-content {
    width: 80px;
    height: 80px;
    border-radius: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff6600;
    -moz-box-shadow: 3px 3px 6px @tabsbar-border-color - 60;
    -webkit-box-shadow: 3px 3px 6px @tabsbar-border-color - 60;
    box-shadow: 3px 3px 6px @tabsbar-border-color - 60;
}

.fa {
    font-size: 40px;
    color: white;
}

.column-title {
    width: 100px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
}
</style>