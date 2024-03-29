<template>
    <div class="login-box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Login" name="first">
                <!-- <h3 class="login-title">Welcome</h3> -->
                <el-form :model="form" :rules="rules" ref="ruleForm">
                    <el-form-item label="Name" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input v-model="form.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 124px;">
                        <el-button type="primary" @click="login('ruleForm')" style="float:right;">Login</el-button>
                    </el-form-item>
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
                    <el-form-item>
                        <el-button type="primary" @click="register('ruleRegForm')" style="float:right;">Register</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import axios from 'axios';
import conf from '../../../vue.config'
export default {
    name: "Login",
    data() {
        return {
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
                if (valid) {
                    // axios.post(this.url + '/api/login', {
                    //     "username": this.form.name,
                    //     "password": this.form.password
                    // }).then(
                    //     res => {
                    //         console.log(res['data'])
                    //         if (res['data']['accessToken'] != null) {
                    //             localStorage.setItem('token', res['data']['accessToken'])
                    //             this.$message({
                    //                 message: 'Login success!',
                    //                 type: 'success'
                    //             });
                                this.$router.push({
                                    name: "main",
                                    params: {
                                        username: this.form.name
                                    }
                                });
                    //         }
                    //         else {
                    //             this.$message({
                    //                 message: 'Login fail! Please check info!',
                    //                 type: 'warning'
                    //             });
                    //         }
                    //     }
                    // )
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
                    // if (this.reg_form.reg_password !== this.reg_form.confirm_password) {
                    //     this.$message({
                    //         message: "password not same!",
                    //         type: 'warning'
                    //     })
                    // } else {
                    //     axios.post(this.url + '/api/register', {
                    //         "username": this.reg_form.reg_name,
                    //         "password": this.reg_form.reg_password
                    //     }).then(res => {
                            this.$message({
                                message: 'Register success!',
                                type: 'success'
                            });
                    //     }).catch(error => {
                    //         this.$message({
                    //             message: error['response']['data']['msg'],
                    //             type: 'warning'
                    //         });
                    //     })
                    // }
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
    border-radius: 5px;
    box-shadow: 0 0 30px #DCDFE6;
}

.login-title {
    text-align: center;
}
</style>
