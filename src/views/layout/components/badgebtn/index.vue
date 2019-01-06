<template>
    <div class="badgebtn">
        <el-badge :value="total" :max="99" @click.native="handleSelect('/message/')">
            <i class="fa fa-comments icon-style "></i>
        </el-badge>
    </div>
</template>
<script>
export default {
    props: {
        total: { type: Number },
    },
    methods: {
        handleSelect(command) {
            this.$router.push({ path: command }) //页面跳转
        }
    }
}
</script>
<style lang="less" scoped>
.icon-style {
    font-size: 25px !important;
    cursor: pointer;
}
</style>