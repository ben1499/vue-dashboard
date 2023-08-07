<template>
    <div id="create-product">
        <router-link to="/">
      <el-button>Go back</el-button>
    </router-link>
        
      <el-form id="add" ref="form" :model="form" label-width="120px">
        <h3>Add New Product</h3>
          <el-form-item label="Brand name">
              <el-input v-model="form.brand"></el-input>
          </el-form-item>
          <el-form-item label="Product name">
              <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="Description">
              <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="Price($)">
              <el-input type="number" v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="Items in stock">
              <el-input type="number" v-model="form.stock"></el-input>
          </el-form-item>
          <!-- <el-form-item label="Product Image">
              <el-input type="image" v-model="form.images"></el-input>
          </el-form-item> -->
          <el-form-item label="Category">
              <el-select v-model="form.category" placeholder="please select the category">
              <el-option label="Smartphones" value="smartphones"></el-option>
              <el-option label="Laptops" value="laptops"></el-option>
              <el-option label="Fragrances" value="fragrances"></el-option>
              <el-option label="Skincare" value="skincare"></el-option>
              <el-option label="Groceries" value="groceries"></el-option>
              <el-option label="Home Decoration" value="home-decoration"></el-option>
              </el-select>
          </el-form-item> 
          <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="btnLoading">Create</el-button>
          </el-form-item>
      </el-form>
    </div>
  </template>
  
<script>
import axios from 'axios';

  
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            form: {
                brand: '',
                title: '',
                description: '',
                price: '',
                category: '',
            },
            showModal: false,
            btnLoading: false,
        }
    },
    methods: {
        onSubmit() {
            this.btnLoading = true;
            axios.post(`https://dummyjson.com/products/add`, {
                brand: this.form.brand,
                title: this.form.title,
                description: this.form.description,
                price: this.form.price,
                category: this.form.category
            }).then((response) => {
                console.log(response);
                this.$emit('submit-click');
                this.btnLoading = false
                this.$router.push('/');
                this.$message({
                    message: 'Product added successfully.',
                    type: 'success'
                });
            }).catch(err => console.log(err));
        },
        // onCancel() {
        //     this.$emit('cancel-click')
        // }
    }
}
</script>
  
  <style scoped>
#create-product {
    margin-left: 50px;
}

  #add{
      width: 700px;
      background: #fff;
      box-shadow: 2px 3px 6px rgb(0,0,0,0.3);
      padding: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -350px;
      margin-top: -250px;
      border-radius: 6px;
  }
  
  </style>