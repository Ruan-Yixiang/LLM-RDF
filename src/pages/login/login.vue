<template>
    <div class="login-box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Login" name="first">
                <!-- <h3 class="login-title">Welcome</h3> -->
                <el-form :model="form" :rules="rules" ref="ruleForm" >
                    <el-form-item label="Name" prop="name">
                        <el-input v-model="form.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input v-model="form.password" show-password></el-input>
                    </el-form-item>
                    <!-- <el-form-item style="margin-top: 124px;">
                        <el-button type="primary" @click="login('ruleForm')" style="float:right;">Login</el-button>
                    </el-form-item> -->
                    <div class="btn" @click="login('ruleForm')" style="margin-top: 40%;">
                        <a @click="login('ruleForm')">
                            Login
                        </a>
                    </div>
                </el-form>
            </el-tab-pane>

            <el-tab-pane label="Register" name="second">
                <el-form :model="reg_form" :rules="reg_rules" ref="ruleRegForm">
                    <el-form-item label="Name" prop="reg_name">
                        <el-input v-model="reg_form.reg_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="reg_password">
                        <el-input v-model="reg_form.reg_password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm Password" prop="confirm_password">
                        <el-input v-model="reg_form.confirm_password" show-password></el-input>
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-button type="primary" @click="register('ruleRegForm')" style="float:right;">Register</el-button>
                    </el-form-item> -->
                    <div class="btn" @click="register('ruleRegForm')">
                        <a @click="register('ruleRegForm')">
                            Register
                        </a>
                    </div>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import axios from 'axios';
import conf from '../../config';
export default {
    name: "Login",
    data() {
        return {
            db_url: 'http://192.168.1.33:5000',
            url: conf.backend_url,
            activeName: 'first',
            // test  deault user !!!
            form: {
                name: 'abc',
                password: '123'
            },
            reg_form: {
                reg_name: '',
                reg_password: '',
                confirm_password: ''
            },
            rules: {
                name: [
                    { required: true, message: 'Please input name', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Please input password', trigger: 'blur' }
                ],

            },
            reg_rules: {
                reg_name: [
                    { required: true, message: 'Please input name', trigger: 'blur' },
                ],
                reg_password: [
                    { required: true, message: 'Please input password', trigger: 'blur' }
                ],
                confirm_password: [
                    { required: true, message: 'Please input password', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleClick() { },
        login(formName) {
            this.$refs[formName].validate((valid) => {
                console.log(valid)
                // console.log(this.url)
                if (valid) {
                    axios.post(this.url+ '/main-page/login', {
                        "username": this.form.name,
                        "password": this.form.password
                    },
                    // axios.post(this.db_url+ '/api/login', {
                    //     "username": this.form.name,
                    //     "password": this.form.password
                    // },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    ).then(
                        res => {
                            console.log(res, "//////")
                            if (res['data']['accessToken'] != null) {
                                localStorage.setItem('token', res['data']['accessToken'])
                                // set username
                                localStorage.setItem('username', this.form.name)
                                this.$message({
                                    message: 'Login success!',
                                    type: 'success'
                                });
                                this.$router.push({
                                    name: "main",
                                    params: {
                                        username: this.form.name
                                    }
                                });
                            }
                            else {
                                this.$message({
                                    message: 'Login fail! Please check info!',
                                    type: 'warning'
                                });
                            }
                        }
                    )
                }
                else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        register(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.reg_form.reg_password !== this.reg_form.confirm_password) {
                        this.$message({
                            message: "password not same!",
                            type: 'warning'
                        })
                    } else {
                        // axios.post(this.db_url + '/api/register', {
                        //     "username": this.reg_form.reg_name,
                        //     "password": this.reg_form.reg_password
                        // })
                        axios.post(this.db_url + '/api/register', {
                            "username": this.reg_form.reg_name,
                            "password": this.reg_form.reg_password
                        })
                        .then(res => {
                            this.$message({
                                message: 'Register success!',
                                type: 'success'
                            });
                        }).catch(error => {
                            this.$message({
                                message: error['response']['data']['msg'],
                                type: 'warning'
                            });
                        })
                    }
                } else {
                    return false;
                }
            });
        },
    }
}

</script>
 
<style lang="scss"	scoped>
.login-box {
    width: 350px;
    margin: 120px auto;
    border: 1px solid #DCDFE6;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 0 30px #DCDFE6;
}

.login-title {
    text-align: center;
}

::v-deep .el-input__inner{ border-radius:10px ; }

.btn{
        width: 100px;
        height: 40px;
        margin-left: 67%;
        margin-bottom: 20px;
        font-size: 16px;
        color:#525252;
        border-radius: 13px;
        background: #ffffff;
        box-shadow:  2px 2px 3px #e3e7f1,
                    2px 2px 3px #e3e7f1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        }
        .btn:active{
        transform: scale(0.96);
    }

</style>
