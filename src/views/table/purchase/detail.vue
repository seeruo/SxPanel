<template>
    <div class="cars-detail">
        <forms-index :form="form" :menuId="1018" :operate="operate" ref="formIndex" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
            <template slot="form">
                <el-row class="form">
                    <el-col :xs="24" :lg="6">
                        <el-form-item label="类型" prop="purchase_type">
                            <el-select v-model="form.purchase_type" placeholder="请选择类型">
                                <el-option label="option1" :value="1" :key="1"></el-option>
                                <el-option label="option2" :value="2" :key="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :lg="6">
                        <el-form-item label="类别" prop="supplier_id">
                            <el-select v-model="form.supplier_id" placeholder="请选择类别">
                                <el-option label="类别1" :value="1"></el-option>
                                <el-option label="类别2" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :lg="6">
                        <el-form-item label="日期" prop="purchase_date">
                            <el-col :span="24">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.purchase_date" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" clearable></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24"  :lg="6" :xl="5">
                        <el-form-item label="数量"  prop="number">
                            <el-input-number v-model="form.number"  :min="1" :max="50"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :lg="6" :xl="15">
                        <el-form-item label="价格(元)" prop="chassis_cost">
                            <el-input type="text" v-model="form.chassis_cost"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :lg="6" :xl="4">
                        <el-form-item label="运费(元/辆)" prop="freight_cost">
                            <el-input type="text" v-model="form.freight_cost"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :lg="6" :xl="10">
                        <el-form-item label="成本(元)" label-width="130px" prop="uprefit_cost">
                            <el-input type="text" v-model="form.uprefit_cost"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="说明" prop="chassis_optional">
                    <el-input type="textarea" v-model="form.chassis_optional" :rows="4"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="top_optional">
                    <el-input type="textarea" v-model="form.top_optional" :rows="4"></el-input>
                </el-form-item>
            </template>
            <template slot="button">
                <el-form-item>
                    <el-button size="mini" icon="el-icon-document" @click="doSave">保存</el-button>
                    <el-popover
                            placement="top"
                            width="260"
                            v-model="submit_visible">
                        <pover-submit :_visible.sync="submit_visible" @doConfirm="doSubmit" title="提交给他人" :users="users"></pover-submit>
                        <el-button slot="reference" icon="el-icon-circle-check" type="primary" size="mini" style="margin: 10px">提交</el-button>
                    </el-popover>
                    <el-popover
                            placement="top"
                            width="260"
                            v-model="transfer_visible">
                        <pover-submit :_visible.sync="transfer_visible" @doConfirm="doTransfer" title="转审给他人" :users="users"></pover-submit>
                        <el-button slot="reference" icon="el-icon-share" type="primary" size="mini" style="margin: 10px">转审</el-button>
                    </el-popover>
                    <el-popover
                            placement="top"
                            width="260"
                            v-model="reject_visible">
                        <pover-index :_visible.sync="reject_visible" @doConfirm="doReject" title="驳回"></pover-index>
                        <el-button slot="reference" icon="el-icon-circle-close" type="danger" size="mini" style="margin: 10px">驳回</el-button>
                    </el-popover>
                    <el-popover
                            placement="top"
                            width="260"
                            v-model="approve_visible">
                        <pover-index :_visible.sync="approve_visible" @doConfirm="doApprove" title="批准"></pover-index>
                        <el-button slot="reference" icon="el-icon-success" type="success" size="mini" style="margin: 10px">批准</el-button>
                    </el-popover>
                    <el-button class="more-button" icon="el-icon-more-outline" size="mini">更多</el-button>
                </el-form-item>
            </template>
        </forms-index>
    </div>
</template>
<script>
import FormsIndex from '@/components/forms'
import PoverSubmit from '@/components/popovers/Submit'
import PoverIndex from '@/components/popovers/Index'
import cacheData from '@/plugins/cacheData';
import {purchaseSave,purchaseDetail} from '@/api/car'

export default {
    name: 'carsDetail',
    mixins: [cacheData],
    data() {
        return {
            form: {
                id:'',
                purchase_type:1,
                supplier_id: 1,
                purchase_date:'',
                number:1,
                chassis_cost:'',
                freight_cost:'',
                uprefit_cost:'',
                car_cost:'',
                chassis_optional:'',
                top_optional:'',
                purchase_reason:'',
            },//表单数据
            logs:[
                    {id:1,type:'add',option:'数据新增',person:'503450599@qq.com',column:5,time:'9月8日 15:33'},
                    {id:2,type:'update',option:'数据更新',person:'Apple',column:1,time:'9月8日 15:33'},
                    {id:3,type:'update',option:'数据更新',person:'Lanravel',column:2,time:'9月9日 15:33'},
                    {id:4,type:'return',option:'数据驳回',person:'Dural',column:3,time:'9月10日 15:33'},
                    {id:5,type:'update',option:'数据更新',person:'Jddpe',column:3,time:'9月10日 15:33'},
                    {id:6,type:'status',option:'审批中',person:'Jack',column:0,time:'9月11日 15:33'},
                ],//日志数据
            operate:{
                type:'edit',//操作类型
                status:'draft'//流程
            },
            users: [
                {id: 1, name: 'Jack'},
                {id: 2, name: 'Linwen'},
                {id: 3, name: 'Yanghao'},
                {id: 4, name: 'zhangcao'},
                {id: 5, name: 'zhangcao2'},
            ],
            submit_visible: false,
            approve_visible: false,
            reject_visible: false,
            transfer_visible: false,
            loading: true,
            first: true
        }
    },
    watch:{
        form:{
            handler: function (val) {
                if (!this.first) {
                    this.$cacheData(val);
                }
            },
            deep: true
        }
    },
    // 页面激活的时候
    activated() {
        this.first = false;
        this.init();
        this.getData();
    },
    methods: {
        // 初始参数
        init(){
            this.loading = true;
        },
        getData(){
            let data = this.$getCacheData();
            if(typeof data === 'object') {
                this.form = data;
                this.loading = false;
            }else{
                if (!this.$route.meta['create']) {
                    this.getRemoteData();
                }else{
                    this.$data.form = this.$options.data().form
                    this.loading = false;
                }
            }
        },
        getRemoteData(){
            purchaseDetail(this.$route.query).then(response => {
                const data = response.data
                this.form = data.data
                this.loading = false;
            }).catch(error => {
                reject(error)
            })
        },
        doSave(){
            purchaseSave(this.form).then(response => {
                const data = response.data
                this.form = data.data
                this.$message({
                    message: data.message,
                    type: 'success'
                })
                
                this.$store.dispatch('app/removeTab', this.$route).then((views) => {
                    this.$router.push('list');
                })
                this.$router.push({name: 'tablePurchaseList'});
            })
        },
        doSubmit(){
        },
        doTransfer(){
        },
        doApprove(){
        },
        doReject(){
        },
        SetForm(){
            this.$store.dispatch('app/removeTab', this.$route).then((views) => {
                this.$router.push('list');
            })
        }
    },
    components:{
        FormsIndex,
        PoverSubmit,
        PoverIndex
    }
}
</script>
<style scoped lang="less">
.form{
    font-size: 12px;
}
</style>