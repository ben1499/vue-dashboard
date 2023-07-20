<template>
    <div id="products">
        <p>All products</p>
        <template>
            <el-table
            :data="pagedProductsData"
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
            :filters="[{ text: 'Smartphones', value: 'smartphones' }, { text: 'Laptops', value: 'laptops' }]"
            :filter-method="filterCategory"
            filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                :type="scope.row.category === 'smartphones' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.category}}</el-tag>
            </template>
            </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="this.productsData.length" @current-change="setPage">
            </el-pagination>
  </template>
    </div>
  </template>
  
<script>
import axios from 'axios';
  export default {
    name: 'SideBar',
    data() {
        return {
            productsData: [],
            page: 1,
            pageSize: 6
        }
    },
    props: {

    },
    mounted() {
        axios.get('https://dummyjson.com/products').then((response) => {
                    console.log(response.data.products);
                    this.productsData = response.data.products;
                    // this.productsData = this.productsData.splice(0, 6);
                }).catch((err) => {
                    console.log(err);
                })
    },
    methods: {
        filterCategory(value, row) {
            return row.category === value;
        },
        setPage (val) {
            this.page = val
        }
    },
    computed: {
        pagedProductsData() {
            return this.productsData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        }
    }
  }
</script>
  

<style scoped>
#products {
    grid-column: 2 / 3;
    margin-left: 50px;
}

p {
    margin-bottom: 10px;
    margin-left: 5px;
    color: rgb(79, 88, 88);
}

.el-pagination {
    margin-top: 10px;
}
</style>
  