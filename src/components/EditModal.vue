<template>
  <div id="edit">
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Brand name">
            <el-input v-model="form.brand"></el-input>
        </el-form-item>
        <el-form-item label="Product name">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
            <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Price">
            <el-input type="number" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="Items in stock">
            <el-input type="number" v-model="form.stock"></el-input>
        </el-form-item>
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
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="onCancel">Cancel</el-button>
        </el-form-item>
    </el-form>
    <success-modal :process="'Edited'" v-if="showModal"></success-modal>
  </div>
</template>

<script>
import axios from 'axios';
import SuccessModal from './SuccessModal.vue';

export default {
    components: {
        SuccessModal
    },
    props: ['id'],
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
        }
    },
    methods: {
        onSubmit() {
            this.showModal = true;
            axios.patch(`https://dummyjson.com/products/${this.id}`, this.form).then((response) => {
                console.log(response);
                this.$emit('submit-click');
                this.showModal = false;
                this.$router.push('/');
            }).catch(err => console.log(err));
        },
        onCancel() {
            this.$emit('cancel-click')
        }
    }
}
</script>

<style scoped>
#edit {
    width: 700px;
    background: #fff;
    box-shadow: 2px 3px 6px rgb(0,0,0,0.3);
    padding: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -350px;
    margin-top: -200px;
    border-radius: 6px;
}

</style>