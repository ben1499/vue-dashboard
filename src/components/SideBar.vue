<template>
    <div id="sidebar">
        <el-button class="toggle-btn" v-model="isCollapse" @click="isCollapse = !isCollapse">
            <i class="el-icon-s-unfold"></i>
        </el-button>
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse">
                <!-- <template slot="title">
                    <i class="el-icon-s-unfold"></i>
                </template> -->
                    <el-menu-item index="1">
                        <router-link to="/" exact>
                            <i class="el-icon-menu"></i>
                            <span>Show all Products</span>
                        </router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <router-link to="/category" exact>
                            <i class="el-icon-setting"></i>
                            <span>Product Category</span>
                        </router-link>
                    </el-menu-item>
            </el-menu>

    </div>
  </template>
  
  <script>
  export default {
    name: 'SideBar',
    props: {
      msg: String
    },
    data() {
        return {
            isCollapse: true
        }
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
        padding-top: 20px;
        background-color: #eee;
        margin-right: -10px;
    }

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
    background: #eee;
}

.el-menu--collapse {
    background: #eee;
}
    .el-collapse-item__header {
        background: transparent !important;
    }

    .toggle-btn {
        border: none;
        background: none;
    }
   

  </style>
  