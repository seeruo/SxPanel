<template>
    <div class="forms-index">
        <!--页面顶部状态 start-->
        <!-- <div class="detail-top">
            <div class="detail-status">未提交䓍稿</div>
            <div class="detail-return el-icon-close" @click="closeForm()"></div>
        </div> -->
        <!--页面顶部状态 end-->

        <div class="detail-content">
            <!--表单 start-->
            <div class="content-left">
                <el-form ref="form" :model="form" label-width="100px" size="mini" status-icon>
                    <div class="form-middle">
                            <slot name="form"></slot>
                    </div>
                    <div class="form-footer" v-if="operate.status!=='end'">
                        <slot name="button"></slot>
                    </div>
                </el-form>
            </div>
            <!--表单 end-->



            <!--日志弹框 start-->
            <side-dialog :visible.sync="isShowLog" width="300px">

                <el-row slot="title">
                    <el-col :span="24">
                        <div class="dialog-title"><i class="el-icon-info"></i> 表单日志</div>
                    </el-col>
                </el-row>

                <!--日志列表 start-->
                <div class="logs-list">

                    <el-scrollbar style="height: 100%">
                        <ul class="logs-list-ul">
                            <li v-for="(log,index) in logs" :key="log.id">
                                <div class="log-block">
                                    <div class="block-top">
                                        <span class="block-status">{{log.operate_name}}</span>
                                        <el-tooltip class="item" effect="dark" content="currentperson" placement="bottom-end">
                                            <div slot="content">操作人<br/>{{log.operate_person}}</div>
                                            <span class="block-person el-icon-view"></span>
                                        </el-tooltip>
                                    </div>
                                    <div class="block-footer">
                                        <div class="block-column"  v-if="judgeOperate(log.operate_type)" >
                                            <span class="mr8 el-icon-star-on"></span>
                                            <span class="mr8">编辑了{{log.total}}个字段</span>
                                            <span class="mr8 block-column-detail" @click="showLogDetail(log.id)">查看详情</span>
                                        </div>
                                        <div class="block-time">
                                            <span class="mr8 el-icon-time"></span>
                                            <span>{{log.operate_time}}</span>
                                        </div>
                                    </div>
                                    <div class="block-circle" :class="circleClass(log.operate_type)"></div>
                                    <div class="block-line" v-if="logs.length!=(index+1)"></div>
                                </div>
                            </li>
                        </ul>
                    </el-scrollbar>


                    <!--日志详情 start-->
                    <transition name="log-transform">
                        <div v-if="isShowDetail" class="log-detail">
                            <div class="detail-header">
                                <div class="detail-header-operate">
                                    <div class="detail-header-operate-left">
                                        <i class=""></i>
                                        <span>{{fields.operate_person}}</span>
                                        <span>更新了{{fields.total}}个字段</span>
                                    </div>
                                    <div class="detail-header-operate-right icon txiconfont tx-return" @click="isShowDetail=false">
                                    </div>
                                </div>
                                <span class="detail-header-time">{{fields.operate_time}}</span>
                            </div>
                            <div class="detail-body">
                                <el-scrollbar style="height: 100%;">
                                    <el-collapse accordion>
                                        <el-collapse-item v-for="item in fields.operate_item" :key="item.name">
                                            <template slot="title">{{item.name}}</template>
                                            <div class="update-before">
                                                <span>修改前</span>
                                                <span v-if="item.before">{{item.before}}</span>
                                                <span v-else>无内容</span>
                                            </div>
                                            <div class="update-after">
                                                <span>修改后</span>
                                                <span v-if="item.after">{{item.after}}</span>
                                                <span v-else>无内容</span>
                                            </div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </el-scrollbar>
                            </div>
                        </div>
                    </transition>
                    <!--日志详情 end-->
                </div>
                <!--日志列表 end-->

            </side-dialog>
            <!--日志弹框 end-->

            <!--日志悬浮球 start-->
            <span draggable="true" @click="showLogs" class="suspension-ball">日 志</span>
            <!--日志悬浮球 end-->
        </div>
    </div>
</template>

<script>
import SideDialog from '@/components/dialogs/SideDialog';
import {logsList} from '@/api/logs'
export default {
    name: 'FormsIndex',
    data() {
        return {
            isShowLog: false,
            isShowDetail: false,
            logs: [],
            fields: {},
            showLogsDetailOperate:['XZ','GX','TJ']
        }
    },
    props: {
        form: Object,
        menuId: Number,
        operate: Object
    },
    components: {
        SideDialog,
    },
    methods: {
        showLogs() {
            // 打开日志弹框
            this.isShowLog = !this.isShowLog;
            this.isShowDetail = false;
            // 读取日志详情
            this.logsList();
        },
        logsList(){
            const params = {menu_id: this.menuId, order_id: this.form.id}
            logsList(params).then(response => {
                const data = response.data
                this.logs= data.data;
            })
        },
        showLogDetail(id) {
            //TODO 通过id 异步获取数据编辑详情日志
            this.isShowDetail = true
            this.logs.forEach(log=>{
                if (log.id === id) {
                    this.fields = log
                }
            });
        },
        judgeOperate(type) {
            for(let i in this.showLogsDetailOperate) {
                if(type==this.showLogsDetailOperate[i]){
                    return true;
                }
            }
        },
        circleClass(type) {
            switch (type) {
                case 'BH':
                case 'ZS':
                case 'JJ':
                case 'PZ':
                    return 'bgcolor-waring'
                case 'ZF':
                case 'SC':
                    return 'bgcolor-danger'
                default:
                    return 'bgcolor-primary'
            }
        },
        closeForm() {
            this.$store.dispatch('app/removeOneTab', this.$route).then((views) => {
                const latestView = views.slice(-1)[0];
                if (latestView) {
                    this.$router.push(latestView);
                } else {
                    this.$router.push('/dashboard/');
                }
            })
        },
        resetForm(){
            this.$refs['form'].resetFields()
        },
    },
}
</script>
<style scoped lang="less">
@import './index.css';
@import './index.less';
</style>