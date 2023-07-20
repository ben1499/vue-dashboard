<template>
    <div id="sidebar">
        <el-row class="tac">
            <el-col :span="12">
                
                <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <i class="el-icon-s-unfold"></i>
                    <router-link to="/" exact>
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span>Show all Products</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/search" exact>
                        <el-menu-item index="2">
                            <i class="el-icon-document"></i>
                            <span>Search Product</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/category" exact>
                        <el-menu-item index="3">
                            <i class="el-icon-setting"></i>
                            <span>Product Category</span>
                        </el-menu-item>
                    </router-link>
                </el-menu>
            </el-col>
        </el-row>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SideBar',
    props: {
      msg: String
    },
    methods: {
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    #sidebar {
        grid-row: 1 / 3;
        grid-column: 1 / 2;
        
    }

    .el-menu {
        background-color: #eee;
        height: 100vh;
        padding-left: 20px;
        padding-top: 30px;
    }

    .el-col-12 {
        width: 100%;
    }

    ul {
        width: 100%;
    }

  </style>
  