<template>
    <div class="login">
        <el-row>
            <el-col :span="24">
                <div class="header">
                    <h1 class="logo">SxPanel</h1>
                    <span><i class="fa fa-phone-squaretx-400"></i>552850955</span>
                </div>
            </el-col>
        </el-row>
        <el-row class="login-area">
            <el-col :span="24">
                <el-card class="login-module" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>账户登录</span>
                    </div>
                    <el-container>
                        <el-form ref="loginFormRule" :model="loginFormRule" status-icon :rules="rules" label-width="0px" class="demo-ruleForm">
                            <el-form-item inline="true" prop="company_code">
                                <el-input size="medium" v-model="loginFormRule.company_code" placeholder="公司码" auto-complete="on" @keydown.enter.native="submitForm">
                                    <template slot="prepend"><i class="fa fa-home"></i></template>
                                </el-input>
                            </el-form-item>
                            <el-form-item inline="true" prop="user">
                                <el-input size="medium" v-model="loginFormRule.user" placeholder="账户" auto-complete="off" @keydown.enter.native="submitForm">
                                    <template slot="prepend"><i class="fa fa-user"></i></template>
                                </el-input>
                            </el-form-item>
                            <el-form-item inline="true" prop="password">
                                <el-input size="medium" v-model="loginFormRule.password" type="password" placeholder="密码" @keydown.enter.native="submitForm">
                                    <template slot="prepend"><i class="fa fa-key"></i></template>
                                </el-input>
                            </el-form-item>
                            <el-button style="width:100%;" type="primary" @click="submitForm">登陆</el-button>
                        </el-form>
                    </el-container>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="footer">
                    CopyRight 2018-2019 sxcode.com All Rights Reserved
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { login } from '@/api/user'
export default {
    name: 'login',
    data() {
        var validateCompanyCode = (rule, value, callback) => {
            var intPattern = /^[0-9]*$/; //数字
            if (!value) {
                callback(new Error('公司码不能为空！'));
            } else if (!intPattern.test(value)) {
                callback(new Error('公司码必须是数字！'));
            } else if (value.toString().length !== 9) {
                callback(new Error('公司码的长度为8位！'));
            } else {
                callback();
            }
        };
        var validateUser = (rule, value, callback) => {
            var charPattern = new RegExp("[`~!@#$%^&*()_+=|{}':;'‘,\\[\\].<>/?~！@#￥……&*（）——|{}《》【】‘；：“”'。，、？-]"); //特殊字符
            if (!value) {
                callback(new Error('账号不能为空！'));
            } else if (charPattern.test(value)) {
                callback(new Error('账号不能包含特殊字符！'));
            } else {
                callback();
            }
        };
        var validatePassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error('密码不能为空！'));
            } else {
                callback();
            }
        };
        return {
            loginFormRule: {
                company_code: '',
                user: '',
                password: ''
            },
            rules: {
                company_code: [
                    { validator: validateCompanyCode, trigger: 'blur' }
                ],
                user: [
                    { validator: validateUser, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ]
            },
        };
    },
    mounted() {
        this.$store.dispatch("app/initDevice");
    },
    methods: {
        submitForm() {
            this.$refs['loginFormRule'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("app/login", this.loginFormRule).then((data) => {
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        });
                        // 页面跳转
                        const _this = this;
                        setTimeout(function() {
                            _this.$router.push({ path: '/dashboard/' }) //页面跳转
                        }, 500)
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style scoped lang="less">
@import './index.css';
@import './index.less';
</style>