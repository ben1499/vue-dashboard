<template>
    <div id="sidebar">
        <el-button class="toggle-btn" v-model="isCollapse" @click="collapseMenu">
            <i class="el-icon-s-unfold"></i>
        </el-button>
        <el-menu
        default-active="/"
        :router="true"
        class="el-menu-vertical-demo"
        :collapse="isCollapse">
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span>Show all Products</span>
            </el-menu-item>
            <el-menu-item index="/category">
                <i class="el-icon-setting"></i>
                <span>Product Category</span>
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
            isCollapse: JSON.parse(localStorage.getItem('collapseState')),
        }
    },
    methods: {
        collapseMenu() {
            this.isCollapse = !this.isCollapse
            localStorage.collapseState = JSON.stringify(this.isCollapse);
        }
    },
    beforeCreate() {
        if (!localStorage.collapseState) {
            console.log("Top block called");
            localStorage.setItem('collapseState', JSON.stringify(true));
            this.isCollapse = JSON.parse(localStorage.getItem('collapseState'));
        } else {
            this.isCollapse = JSON.parse(localStorage.getItem('collapseItem'));
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
  