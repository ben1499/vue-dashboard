<template>
    <div class="search-table">
        <template @input-change="fetchSearchData(searchInput)">
            <el-table
            v-loading="loading"
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
            <div class="page-row">
                <el-pagination background layout="prev, pager, next" :total="30" @current-change="setPage">
                </el-pagination>
                <p class="small-text">Showing {{ page }} of 3</p>
            </div>
        </template>
    </div>
</template>

<script>
import axios from 'axios';

  export default {
    data() {
        return {
            loading: false,
        }
    },
    props: {
        searchInput: String
    },
    methods: {
        fetchSearchData(searchInput) {
            axios.get(`https://dummyjson.com/products/search?q=${searchInput}`).then((response) => {
                console.log(response)
            })
        }
    }
  }
</script>
  

<style scoped>



</style>
  