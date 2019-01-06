<template>
    <div class="userpanel">
        <el-dropdown trigger="click" @command="handleSelect">
            <span class="el-dropdown-link">
                <img class="user-header-icon" v-if="data.header" :src="data.header">
                <i v-else class="fa fa-user-circle user-header-icon"></i>
            </span>
            <el-dropdown-menu slot="dropdown" mini>
                <el-dropdown-item class="user-header" disabled>
                    <span>{{data.depart_name}}</span>
                    <span>&nbsp;&nbsp;{{data.name}}</span>
                </el-dropdown-item>
                <el-dropdown-item divided command="/user/">
                    <i class="fa fa-user fa-fw list-icon"></i>
                    <span class="list-title"> 我的资料</span>
                </el-dropdown-item>
                <el-dropdown-item command="/user/edit">
                    <i class="fa fa-edit fa-fw list-icon"></i>
                    <span class="list-title"> 资料修改</span>
                </el-dropdown-item>
                <el-dropdown-item command="/user/password">
                    <i class="fa fa-key fa-fw list-icon"></i>
                    <span class="list-title"> 密码修改</span>
                </el-dropdown-item>
                <el-dropdown-item command="logout" divided>
                    <i class="fa fa-power-off fa-fw list-icon"></i>
                    <span class="list-title"> 退出系统</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
export default {
    name: 'userpanel',
    props: {
        data: { type: Object },
    },
    computed: {
        appStatus() {
            return this.$store.state.app;
        }
    },
    mounted() {},
    methods: {
        handleSelect(command) {
            if (command === 'logout') {
                this.$store.dispatch("app/logout").then((data) => {
                    this.$message({
                        message: '退出成功',
                        type: 'success'
                    });
                    this.$router.push({ path: '/' })
                })
            } else {
                this.$router.push({ path: command })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.userpanel {}

.list-title {
    font-size: 13px !important;
    display: inline-block !important;
    padding-left: 5px;
}

.list-icon {
    display: inline-block !important;
}

.user-header-icon {
    height: 30px;
    width: 30px;
    line-height: 30px;
    border-radius: 50%;
    font-size: 25px !important;
}

.el-dropdown-menu {
    width: 200px;
}


.el-dropdown-link {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    color: @header-font-color;
    cursor: pointer;
}

.el-dropdown-link>i {
    font-size: 16px;
}

.el-icon-arrow-down {
    font-size: 14px;
}

.user-header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.user-header-img-bg {
    height: 50px;
    width: 50px;
    border-radius: 50%;
}

.fa {
    font-size: 14px;
    display: flex;
    height: 30px;
    line-height: 30px;
}
</style>