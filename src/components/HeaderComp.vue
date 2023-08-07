<template>
    <div id="header">
      <h1>Dashboard</h1>
      <el-button v-if="!loggedIn" @click="openLogin">Login</el-button>
      <el-button v-else @click="logOut">Log Out</el-button>
    </div>
  </template>
  
<script>
// import axios from 'axios';
// import { setAuthHeader } from '../utils/setAuthHeader';
import { bus } from '../main';

  export default {
    props: {
      
    },
    data() {
      return {
        loggedIn: false
      }
    },
    methods: {
      openLogin() {
        this.$router.push('/login')
            // axios.post(`https://dummyjson.com/auth/login`, {
            //     username: 'kminchelle',
            //     password: '0lelplR',
            // }).then((response) => {
            //     console.log(response);
            //     console.log(localStorage);
            //     // let AUTH_TOKEN = response.data.token;
            //     // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
            //     localStorage.setItem('token', response.data.token)
            //     setAuthHeader(response.data.token);
            //   //   axios.interceptors.request.use(function (config) {
            //   //     const token = response.data.token
            //   //     config.headers.Authorization =  token;
                  
            //   //     return config;
            //   // });

            // }).catch(err => console.log(err))
        },
        logOut() {
          localStorage.removeItem("token");
          this.loggedIn = false;
          this.$message({
              message: 'You have logged out',
              type: 'success'
          });
        },
        checkLogin() {
          if (localStorage.token) {
            this.loggedIn = true;
          } else {
            this.loggedIn = false;
          }
        }
    },
    computed: {

    },
    mounted() {
      bus.$on('login', (data) => {
        this.loggedIn = data;
      })
      this.checkLogin();
    }
  }
</script>
  

<style scoped>
#header {
  box-shadow: 1px 5px 5px rgb(0,0,0, 0.2);
  padding: 20px 25px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}


</style>
  