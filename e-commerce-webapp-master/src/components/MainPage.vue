<template>
  <div class="main-page">
    <Carousel/>
    <ProductPanel title="Top Selling"/>
    <ProductPanel title="Buy Now"/>
    <ProductPanel title="New Arrivals"/>
  </div>
</template>

<script>
import ProductPanel from './ProductPanel.vue'
import Carousel from './Carousel.vue'
export default {
  name: 'MainPage',
  components: {
    ProductPanel,
    Carousel
  }
}
</script>

<style scoped>
</style>
