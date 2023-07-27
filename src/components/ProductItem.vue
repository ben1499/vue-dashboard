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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  props: ['id'],
  data() {
    return {
      productData: {},
    }
  },
  mounted() {
    this.showProductDetails();
  },
  methods: {
    showProductDetails() {
      axios.get(`https://dummyjson.com/products/${this.id}`).then((response) => {
        this.productData = response.data;
      })
    }
  }
}
</script>

<style scoped>
#item {
  margin-left: 50px;
  margin-top: 30px;
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
</style>