<template>
    <div class="dashboard">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="card-icon" style="background-color: #ff6600">
                        <i class="fa fa-car"></i>
                    </div>
                    <div class="card-text">
                        <p>车辆销售</p>
                        <h2>1789<small>/辆</small></h2>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="card-icon" style="background-color: green">
                        <i class="fa fa-list"></i>
                    </div>
                    <div class="card-text">
                        <p>待办事项</p>
                        <h2>5<small>/件</small></h2>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="card-icon" style="background-color: #003399">
                        <i class="fa fa-user"></i>
                    </div>
                    <div class="card-text">
                        <p>客户数量</p>
                        <h2>168<small>/人</small></h2>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="card-icon" style="background-color: black">
                        <i class="fa fa-shopping-cart"></i>
                    </div>
                    <div class="card-text">
                        <p>库存数量</p>
                        <h2>17<small>/辆</small></h2>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 10px;">
            <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="6">
                <EchartLint :data="this.option1"></EchartLint>
            </el-col>
            <el-col :xs="24" :sm="12" :md="14" :lg="14" :xl="6">
                <EchartLint :data="this.option2"></EchartLint>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import EchartLint from '@/components/echarts/EchartLine';
export default {
    name: 'dashboard',
    data() {
        return {
            option1: {
                backgroundColor: '#fff',
                title: {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1548, name: '搜索引擎' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            },
            option2: {
                backgroundColor: '#fff',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                legend: {
                    data: ['蒸发量', '降水量', '平均温度']
                },
                xAxis: [{
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }],
                yAxis: [{
                        type: 'value',
                        name: '水量',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} ml'
                        }
                    },
                    {
                        type: 'value',
                        name: '温度',
                        min: 0,
                        max: 25,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    }
                ],
                series: [{
                        name: '蒸发量',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                    },
                    {
                        name: '降水量',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    },
                    {
                        name: '平均温度',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            }
        }
    },
    mounted() {},
    components: {
        EchartLint
    }
}
</script>
<style scoped>
@import '~./style.less';

.dashboard {
    padding: 0px;
}

.fenbutu {
    border-radius: 6px;
    background-color: #d5e8f9;
}
</style>