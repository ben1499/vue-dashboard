<template>
  <div id="item" >
    <router-link to="/">
      <el-button>Go back</el-button>
    </router-link>
    <div v-if="productData">
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
            <router-link :to="{name: 'edit', params: {id: id}}">
              <el-button type="primary">Edit</el-button>
            </router-link>
            <el-button @click="handleDelete" :loading="isDelete" type="danger">Delete</el-button>
          </div>
      </div>
    </div>
    <!-- <success-modal :process="'Deleted'" v-if="showModal" class="success"></success-modal> -->
    <!-- <edit-modal @submit-click="showEditModal = !showEditModal" @cancel-click="showEditModal = !showEditModal" v-if="showEditModal" :id="id"></edit-modal> -->
  </div>
</template>

<script>
import axios from 'axios'
// import SuccessModal from './SuccessModal.vue';


export default {
  props: {
    id: null
  },
  data() {
    return {
      productData: null,
      isDelete: false,
      fullScreenLoading: false,
    }
  },
  mounted() {
    this.showProductDetails();
  },
  methods: {
    showProductDetails() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      axios.get(`https://dummyjson.com/products/${this.id}`)
      .then((response) => {
        loading.close()
        this.productData = response.data;
      })
      .catch(err => console.log(err))
    },
    handleDelete() {
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.isDelete = true;
          axios.delete(`https://dummyjson.com/products/${this.id}`).then((response) => {
            console.log(response);
            this.isDelete = false;
            this.$router.push('/');
          })
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
    },

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

a {
  margin-right: 20px;
}
</style>