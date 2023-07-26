<template>
    <div id="product-category">
        <p>Choose a category</p>
        <div class="btn-group">
            <el-button type="primary" plain @click="showResults('smartphones')">Smartphones</el-button>
            <el-button type="primary" plain @click="showResults('laptops')">Laptops</el-button>
            <el-button type="primary" plain @click="showResults('fragrances')">Fragrances</el-button>
            <el-button type="primary" plain @click="showResults('skincare')">Skincare</el-button>
            <el-button type="primary" plain @click="showResults('home-decoration')">Home Decoration</el-button>
        </div>
        <template>
            <el-table
            :data="productsData"
            style="width: 100%">
            <el-table-column
                prop="title"
                label="Name"
                width="180">
            </el-table-column>
            <el-table-column label="Image" width="160">
                <template slot-scope="scope">
                    <img :src="scope.row.images[0]" alt="Image" width="100" height="80">
                </template>
            </el-table-column>
            <el-table-column
                prop="description"
                label="Description">
            </el-table-column>
            <el-table-column
                prop="price"
                label="Price ($)"
                width="100">
            </el-table-column>
            <el-table-column
            prop="category"
            label="Category"
            width="180"
            filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                :type="scope.row.category === 'smartphones' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.category}}</el-tag>
            </template>
            </el-table-column>
            </el-table>
        </template>
    </div>
  </template>
  
<script>
import axios from 'axios';
  export default {
    props: {

    },
    data() {
        return {
            productsData: []
        }  
    },
    methods: {
        showResults(categoryName) {
            axios.get(`https://dummyjson.com/products/category/${categoryName}`).then((response) => {
            this.productsData = response.data.products;
            // this.productsData = this.productsData.splice(0, 6);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
  }
</script>
  

<style scoped>
#product-category {
    margin-left: 50px;
}

.btn-group {
    margin-top: 10px;
    margin-bottom: 8px;
}

</style>
  