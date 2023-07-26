<template>
  <div id="item">
    <div>
        <img :src="productData.images[0]" alt="">
    </div>
    <div class="details">
        <p>{{ productData.brand }}</p>
        <h1>{{ productData.title }} </h1>
        <p>{{ productData.description }}</p>
        <h2>$ {{ productData.price }}</h2>
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
  display: flex;
  gap: 80px;
  margin-top: 30px;
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
</style>