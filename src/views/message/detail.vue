<template>
    <div class="messageDetail">
        there is messageDetail
    </div>
</template>
<script>
export default {
    name: 'messageDetail',
    // 页面激活的时候
    activated() {
        //不是你期望的数据 则销毁组件 或者直接调用销毁也行
        if (this.id !== this.$route.query.id) {
            this.init();
        }
    },
}
</script>