<template>
    <div class="companypanel">
        <span class="el-dropdown-link">
            <img class="company-header-icon" v-if="data.company_logo" :src="data.company_logo">
            <span>&nbsp;&nbsp;{{data.company_name}}</span>
        </span>
    </div>
</template>
<script>

export default {
    name: 'companypanel',
    props: {
        data: {type: Object},
    },
    methods: {
        handleSelect(command) {
            // 预留，可能会做跳转
            this.$router.push({path: command}) //页面跳转
        }
    }
}
</script>
<style lang="less" scoped>
.companypanel{
}
.company-header-icon{
    height: 35px;
    line-height: 35px;
    border-radius: 50%;
    font-size: 22px !important;
}
.el-dropdown-menu{
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
    font-size: 14px;
}
.el-dropdown-link > i {
    font-size: 16px;
}
.el-icon-arrow-down {
    font-size: 14px;
}
.company-header{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}
.company-header-img-bg{
    height: 50px;
    border-radius: 50%;
    margin: 0 auto;
}
.font16{
    font-size: 18px;
    display: flex;
}
.font16>span{
    font-size: 14px;
    align-self: center;
    padding-left: 5px;
}
</style>