<template>
    <div popovers-container>
        <div class="top">
            <span class="title">{{title}}</span>
        </div>
        <div class="remark">
            <el-input type="textarea" rows="4" maxlength="200" v-model="remark" resize="none" placeholder="在这里输入反馈信息"></el-input>
        </div>
        <div class="footer">
            <span>0/200</span>
            <div class="buttons">
                <el-button size="mini" @click="visible=false">取消</el-button>
                <el-button type="primary" size="mini" @click="onSubmit()">确认</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                remark:'',
                visible:true,
            }
        },
        props:{
            _visible: Boolean,
            title:String
        },
        watch: {
            _visible(val) {
                this.visible = val
            },
            visible(val) {
                this.$emit('update:_visible',val)
            }
        },
        methods: {
            onSubmit() {
                this.visible = false
                this.$emit('doConfirm',{remark:this.remark})
            }
        },
    }
</script>
<style scoped lang="less">
    .popovers-container {
        display: flex;
        flex-flow: column;
    }
    .top {
        height: 30px;
        width: 100%;
        text-align: center;
        padding: 0 5px;
        border-bottom: 2px solid #FBFBFC;
        box-sizing: border-box;
        .title {
            letter-spacing: 5px;
            color:#9CA3A7
        }
    }
    .remark {
        margin: 20px 0;
    }
    .footer {
        display: flex;
        justify-content: space-between;
    }
</style>