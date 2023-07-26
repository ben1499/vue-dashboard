<template>
    <el-input v-model="searchQuery" @change="handleSearch"></el-input>
</template>

<script>
export default {
    name:"SearchComponent",
    data(){
        return {
            searchQuery:""
        }
    },
    methods:{
        handleSearch(){
            this.$emit('searchedText',this.searchQuery, 0)
        }
    }
}
</script>

<style scoped>
.el-input {
    width: 50%;
}
</style>