<template>
  <div class="product-panel">
    <h3 v-if="categoryAlias">Listing for category: {{ categoryAlias }}</h3>
    <h3 v-if="!categoryAlias">{{ title }}</h3>

    <b-card-group deck>
      <ProductItem v-for="productItem in products"
        :product="productItem" :key="productItem" />
    </b-card-group>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue'
import axios from "axios"
export default {
  name: 'ProductPanel',
  components: {
    ProductItem
  },
  props: {
    title: String,
    categoryAlias: String
  },
  data() {
    return {
       products: []
    };
  },
  mounted() {
    axios 
      .get("https://euas.person.ee/products/")
      .then(response => {
        this.products = response.data;
      });
  }
}
</script>

<style scoped>
h3 {
  font-size: 20px;
}
</style>