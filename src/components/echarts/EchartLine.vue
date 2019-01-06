<template>
    <div class="echarts">
        <div ref="myChart" class="myChart"></div>
    </div>
</template>
<script>
import echarts from 'echarts';
export default {
    props:{
        data:{type:Object}
    },
    computed: {
        option() {
            return this.$deepCopy(this.data);
        }
    },
    mounted(){
        const _this = this;
        const myChart = echarts.init(_this.$refs.myChart);
        myChart.setOption(_this.option);
        _this.$refs.myChart.addEventListener("resize",function(){
            const myChart = echarts.init(_this.$refs.myChart);
            myChart.setOption(_this.option);
        })
    }
}
</script>
<style scoped lang="less">
.echarts{
    height: 400px;
    padding: 10px;
    border-radius: 6px;
    background-color: #e5eef7;
}
.myChart{
    height: 100%;
    width: 100%;
}
@media screen and (max-width: 576px) {
    .myChart{
        width: 100%;
    }
}
</style>