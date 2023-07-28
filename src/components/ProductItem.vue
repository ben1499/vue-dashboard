<template>
  <div id="item">
    <router-link to="/">
      <el-button>Go back</el-button>
    </router-link>
    <div>
      <div>
          <img :src="productData.images[0]" alt="">
      </div>
      <div class="details">
          <p>{{ productData.brand }}</p>
          <h1>{{ productData.title }} </h1>
          <p>{{ productData.description }}</p>
          <h2>$ {{ productData.price }}</h2>
          <p>Items in stock: {{ productData.stock }}</p>
          <p>Rating: {{ productData.rating }} out of 5</p>
          <p>Category: {{ productData.category }}</p>
          <div class="buttons">
            <el-button @click="handleEdit" type="primary">Edit</el-button>
            <el-button @click="handleDelete" :loading="isDelete" type="danger">Delete</el-button>
          </div>
      </div>
    </div>
    <success-modal :process="'Deleted'" v-if="showModal" class="success"></success-modal>
    <edit-modal @submit-click="showEditModal = !showEditModal" @cancel-click="showEditModal = !showEditModal" v-if="showEditModal" :id="id"></edit-modal>
  </div>
</template>

<script>
import axios from 'axios'
import SuccessModal from './SuccessModal.vue';
import EditModal from './EditModal.vue';

export default {
  props: ['id'],
  data() {
    return {
      productData: {},
      isDelete: false,
      showModal: false,
      showEditModal: false,
    }
  },
  components: {
    SuccessModal,
    EditModal
  },
  mounted() {
    this.showProductDetails();
  },
  methods: {
    showProductDetails() {
      axios.get(`https://dummyjson.com/products/${this.id}`).then((response) => {
        this.productData = response.data;
      })
    },
    handleDelete() {
      this.isDelete = true;
      this.showModal = true;
      axios.delete(`https://dummyjson.com/products/${this.id}`).then((response) => {
         this.showModal = false;
         console.log(response);
         this.isDelete = false;
         this.$router.push('/');
      })
    },
    handleEdit() {
      this.showEditModal = true;
    }
  }
}
</script>

<style scoped>
#item {
  margin-left: 50px;
  margin-top: 30px;
}

#item::not(.success) {
  -webkit-filter: blur(8px);
    -ms-filter: blur(8px);
    -moz-filter: blur(8px);
    -o-filter: blur(8px);
    filter: blur(8px);
}

#item > div:first-of-type {
  display: flex;
  gap: 80px;
  margin-top: 20px;
}

img {
  width: 450px;
  height: auto;
}

.details > p:nth-of-type(2) {
  width: 500px;
  margin-bottom: 30px;
  color: #585555;
}

.details > p:nth-of-type(3) {
  margin-top: 20px;
}

.buttons {
  margin-top: 20px;
}
</style>