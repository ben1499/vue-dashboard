<template>
    <div id="products">
        <div class="top-menu">
            <p>All products</p>
            <el-input @input="sendInputEvent" v-model="searchInput"></el-input>
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
        <!-- <search-table :searchInput="searchInput"></search-table> -->
    </div>
  </template>
  
<script>
import axios from 'axios';
// import SearchTable from './SearchTable.vue';
  export default {
    components: {
        // 'search-table': SearchTable,
    },
    data() {
        return {
            productsData: [],
            page: 1,
            pageSize: 6,
            loading: true,
            searchInput: '',
            isMainSeen: true
        }
    },
    props: {

    },
    mounted() {
        this.fetchData(0);
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
            this.fetchData(skipValue);
        },
        sendInputEvent() {
            this.$emit('input-change');
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
  