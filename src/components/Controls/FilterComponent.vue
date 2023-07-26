<template>
    <div>
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

</template>

<script>
import axios from 'axios';

export default {
    name: 'FilterComponent',
    data() {
        return {
            categories: [],
            checkList: []
        }
    },
    mounted() {
        this.getCategories();
    },
    methods: {
        getCategories() {
            axios.get(`https://dummyjson.com/products/categories`).then((response) => {
                this.categories = response.data.slice(0, 6);
            }).catch(err => console.log(err))
        }, 
        sendCheckList() {
            this.$emit('filter-change', this.checkList);
        },
        handleReset() {
            this.checkList = [];
            this.$emit('filter-change', this.checkList)
        }
    }
}
</script>

<style scoped>
#filter {
    margin-left: 50px;
}
</style>