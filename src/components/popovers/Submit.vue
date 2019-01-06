<template>
    <div submit-container>
        <div class="top">
            <span class="title">{{title}}</span>
            <span class="add el-icon-circle-plus" @click="showAddDialog"></span>
        </div>
        <div class="search">
            <el-select v-model="search" filterable placeholder="输入用户名搜索" style="width: 100%;">
                <el-option
                        v-for="item in users"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="remark">
            <el-input type="textarea" rows="5" maxlength="200" v-model="remark" resize="none" placeholder="在这里输入提交反馈"></el-input>
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
                search: '',
                remark: '',
                visible: true,
            }
        },
        props: {
            _visible: Boolean,
            title: String,
            users: Array
        },
        watch: {
            _visible(val) {
                this.visible = val
            },
            visible(val) {
                this.$emit('update:_visible', val)
            }
        },
        methods: {
            showAddDialog() {
                alert('待开发中！！！')
            },
            onSubmit() {
                this.visible = false
                this.$emit('doConfirm', {person: this.search, remark: this.remark})
            }
        },
    }
</script>
<style scoped lang="less">
    .submit-container {
        display: flex;
        flex-flow: column;
    }

    .top {
        height: 50px;
        width: 100%;
        padding: 0 5px;
        border-bottom: 2px solid #FBFBFC;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        .title {
            color: #9CA3A7
        }
        .add {
            font-size: 20px;
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