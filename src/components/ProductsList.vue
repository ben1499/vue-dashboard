<template>
    <div>
        <div id="controls">
            <search-comp @searchedText="handleSearchedProduct"></search-comp>
            <filter-comp @filter-change="handleSelectedCategory"></filter-comp>
            <router-link to="/add">
                <el-button type="info" class="add-btn el-icon-plus">Add New Product</el-button>
            </router-link>
        </div>
        <div class="products">
            <el-table
                v-loading="loading"
                :data="pagedProductsData"
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="Name"
                    width="180">
                </el-table-column>
                <el-table-column label="Image" width="160">
                    <template slot-scope="scope">
                        <router-link :to="{name: 'product', params: { id: scope.row.id }}">
                            <img :src="scope.row.images[0]" alt="Image" width="100" height="80">
                            {{scope.row.name}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="Description"
                    width="500">
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
                <el-table-column label="Actions">
                    <template slot-scope="scope">
                        <el-button-group>
                            <router-link :to="{name: 'product', params: { id: scope.row.id }}">
                                <el-button>View</el-button>
                            </router-link>
                            <router-link :to="{name: 'edit', params: { id: scope.row.id }}">
                                <el-button>Edit</el-button>
                            </router-link>
                            <el-button @click="handleDelete(scope.row.id)">Delete</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-row">
                <el-pagination background layout="prev, pager, next" :total="30" @current-change="setPage" :current-page="currentPage">
                </el-pagination>
                <p class="small-text">Showing {{ page }} of 3</p>
            </div>
        </div>
    </div>
</template>

<script>
import SearchComponent from './Controls/SearchComponent.vue'
import FilterComponent from './Controls/FilterComponent.vue'
import axios from 'axios';

export default {
    name:"ProductsList",
    components:{
        'search-comp': SearchComponent,
        'filter-comp': FilterComponent
    },
    data() {
        return {
            loading: true,
            productsData: [],
            page: 1,
            pageSize: 6,
            nowShowing: '',
            searchInput: '',
            currentPage: null,
        }
    },
    mounted(){
        this.showAllProducts(0);
    },
    methods:{
        handleSearchedProduct(data, skipNumber){
            this.nowShowing = 'search';
            this.searchInput = data;
            this.page = 1;
            this.currentPage = 1;
            axios.get(`https://dummyjson.com/products/search?q=${data}&limit=6&skip=${skipNumber}`).then((response) => {
                this.loading = false;   
                this.productsData = response.data.products;
            }).catch((err) => {
                console.log(err);
            })
        },
        handleSelectedCategory(categoryList){
            if (categoryList.length === 0) {
                this.showAllProducts(0);
            }
            else if (categoryList.length >= 2) {
                const category = categoryList[categoryList.length - 1];
                axios.get(`https://dummyjson.com/products/category/${category}`).then((response) => {
                    const categoryData = response.data.products;
                    categoryData.forEach((item) => {
                        this.productsData.push(item);
                    })
                    this.filteredArray = this.productsData.filter(obj => categoryList.includes(obj.category));
                    this.productsData = this.filteredArray;
                }).catch(err => console.log(err));
            } else {
                this.page = 1;
                this.currentPage = 1;
                this.nowShowing = 'category';
                this.productsData = [];
                this.loading = true;
                const category = categoryList[categoryList.length - 1];
                axios.get(`https://dummyjson.com/products/category/${category}`).then((response) => {
                    this.loading = false;
                    this.productsData = response.data.products;
                }).catch(err => console.log(err))
            }
        },
        showAllProducts(skipNumber){
            this.nowShowing = 'products';
            axios.get(`https://dummyjson.com/products?limit=6&skip=${skipNumber}`).then((response) => {
                this.loading = false;
                this.productsData = response.data.products
                // this.productsData.forEach((product) => {
                //     product.isDisabled = false;
                //     product.isDeleteDisabled = false;
                // })
            }).catch(err => console.log(err));
        },
        setPage(val) {
            if (this.nowShowing === 'products') {
                this.page = val;
                const skipValue = this.page * this.pageSize - this.pageSize;
                this.loading = true;
                this.showAllProducts(skipValue);
            } else if (this.nowShowing === 'search') {
                this.page = val;
                const skipValue = this.page * this.pageSize - this.pageSize;
                this.loading = true;
                this.handleSearchedProduct(this.searchInput, skipValue);
            } else {
                this.page = val;
            }
        },
        handleDelete(index) {
            this.$confirm('This will permanently delete the item. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                // this.productsData.forEach((product) => {
                //         product.isDisabled = true;
                //         product.isDeleteDisabled = true;
                // })
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });                    
                axios.delete(`https://dummyjson.com/products/${index}`).then(() => {
                    loading.close()
                    this.productsData.forEach((product, proIndex) => {

                            if (product.id === index) {
                                this.productsData.splice(proIndex, 1);
                            }
                    })
                    this.$message({
                            type: 'success',
                            message: 'Delete completed'
                    });
                }).catch(err => {
                    loading.close()
                    console.log(err)
                });
            }).catch(() => {
                
                this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });          
            });
        },
    },
    computed: {
            pagedProductsData() {
                if (this.nowShowing === 'category') {
                    return this.productsData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
                } else {
                    return this.productsData;
                }
                
            },
    }
}
</script>

<style scoped>
.products {
    margin-left: 50px;
}

#controls {
    display: flex;
    margin-left: 50px;
}

.page-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px; 
}

.add-btn {
    margin-left: 30px;
}

</style>