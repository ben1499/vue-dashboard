<template>
    <div id="products">
        <div class="top-menu">
            <p>All products</p>
            <el-input @input="sendInputEvent" v-model="searchInput"></el-input>
            <el-dropdown>
                <el-button type="primary">
                    Filter<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item v-for="(category, index) in categories" :key="index">{{ category }}</el-dropdown-item> -->
                    <el-dropdown-item v-for="(category, index) in categories" :key="index">
                        <el-checkbox-group v-model="checkList" @change="sendCheckList">
                            <el-checkbox :label="category"></el-checkbox>
                        </el-checkbox-group>
                    </el-dropdown-item>
                    <el-dropdown-item><li @click="handleReset">Reset</li></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <template v-if="isMainSeen">
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
            <div class="page-row">
                <el-pagination background layout="prev, pager, next" :total="30" @current-change="setPage">
                </el-pagination>
                <p class="small-text">Showing {{ page }} of 3</p>
            </div>
        </template>
        <search-table v-if="isSearchTableSeen" :searchInput="searchInput"></search-table>
        <category-table v-if="isCategoryTableSeen" :isCategoryTableSeen="isCategoryTableSeen"></category-table>
        {{ checkList }}
    </div>
  </template>
  
<script>
import axios from 'axios';
import { bus } from '../main'
import SearchTable from './SearchTable.vue';
import CategoryTable from './CategoryTable.vue';


  export default {
    components: {
        'search-table': SearchTable,
        'category-table': CategoryTable,
    },
    data() {
        return {
            productsData: [],
            page: 1,
            pageSize: 6,
            loading: true,
            searchInput: '',
            isMainSeen: true,
            categories: [],
            checkList: [],
            isSearchTableSeen: false,
            isCategoryTableSeen: false,
        }
    },
    props: {

    },
    mounted() {
        this.fetchData(0);
        this.getCategories();
    },
    methods: {
        fetchData(skipNumber) {
            axios.get(`https://dummyjson.com/products?limit=6&skip=${skipNumber}`).then((response) => {
                    // console.log(response.data.products);
                    this.loading = false;
                    this.productsData = response.data.products;
                    // this.productsData = this.productsData.splice(0, 6);
                }).catch((err) => {
                    console.log(err);
                })
        },
        filterCategory(value, row) {
            return row.category === value;
        },
        setPage(val) {
            this.page = val
            const skipValue = this.page * this.pageSize - this.pageSize;
            this.loading = true;
            this.fetchData(skipValue);
        },
        sendInputEvent() {
            // this.$emit('input-change');
            this.isMainSeen = false;
            this.isSearchTableSeen = true;
            bus.$emit('input-change', this.searchInput);
        },
        getCategories() {
            axios.get(`https://dummyjson.com/products/categories`).then((response) => {
                this.categories = response.data.slice(0, 6);
            })
        }, 
        sendCheckList() {
            this.isMainSeen = false;
            this.isSearchTableSeen = false;
            this.isCategoryTableSeen = true;
            bus.$emit('filter-change', this.checkList);
        },
        handleReset() {
            this.checkList = [];
            bus.$emit('filter-change', this.checkList);
            this.isMainSeen = true;
            this.isCategoryTableSeen = false;
            this.isSearchTableSeen = false;
        }
    },
    computed: {
        // pagedProductsData() {
        //     return this.productsData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        // }
    }
  }
</script>
  

<style scoped>
#products {
    grid-column: 2 / 3;
    margin-left: 50px;
}

.top-menu {
    display: flex;
    justify-content: space-around;
}

p {
    margin-bottom: 10px;
    margin-left: 5px;
    color: rgb(79, 88, 88);
}

.el-pagination {
    margin-top: 10px;
}

.page-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px; 
}

.small-text {
    font-size: 15px;
    margin-top: 20px;
}

.el-input {
    width: 50%;
}
</style>
  