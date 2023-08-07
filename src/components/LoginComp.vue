<template>
  <div id="login">
    <el-form id="add" ref="form" :model="login" label-width="120px">
        <h3>Login</h3>
          <el-form-item label="Username">
              <el-input v-model="login.username"></el-input>
          </el-form-item>
          <el-form-item label="Password">
              <el-input v-model="login.password"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="btnLoading">Login</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import { setAuthHeader } from '@/utils/setAuthHeader';
import { bus } from '../main';

export default {
    data() {
        return {
            login: {
                username: 'kminchelle',
                password: '0lelplR',
            },
            btnLoading: false,
        }
    },
    methods: {
        onSubmit() {
            this.btnLoading = true
            axios.post(`https://dummyjson.com/auth/login`, this.login).then((response) => {
                this.btnLoading = false;
                console.log(response);
                console.log(localStorage);

                localStorage.setItem('token', response.data.token)
                setAuthHeader(response.data.token);
                bus.$emit('login', true);
                this.$router.push('/');
                this.$message({
                    message: 'Logged in successfully',
                    type: 'success'
                });
            }).catch((err) =>  {
                console.log(err)
                this.btnLoading = false;
                this.$message.error('Invalid username or password');
            })
        },
    }
}
</script>

<style scoped>
#login {
    width: 50%;
    margin-left: 50px;
}
</style>