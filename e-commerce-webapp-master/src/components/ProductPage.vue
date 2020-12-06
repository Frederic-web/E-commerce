<template>
  <div>
    <b-row>
      <b-col cols="12"><h4>{{ product.title }}</h4></b-col>
    </b-row>
    <b-row>
      <b-col cols="5">
        <b-img :src="selectedOption.image" class="preview-image"/>
      </b-col>
      <b-col cols="7">
        <p>{{ product.description }}</p>

        <p>Select your product option:</p>
         <div>
          <b-button-group>
            <b-button v-for="option in product.options" 
            :key="option.code" 
            :pressed="option.code == selectedOption.code"
            @click="changeOption(option)"
            >{{ option.title }}
            </b-button>
          </b-button-group>
        </div>

        <p>Number of items:</p>
        <b-alert :show="numberOfItems > selectedOption.qty" variant="warning">
          You have selected {{ numberOfItems }} which is greater than {{ selectedOption.qty }} we have in stock.
        </b-alert> 
          <b-input-group class="items-picker">
            <b-input-group-prepend>
              <b-button variant="outline-info" @click="decrease">-</b-button>
              
            </b-input-group-prepend>
            
            <b-form-input v-model.number="numberOfItems"
            type="number" min="0"></b-form-input>

            <b-input-group-append>
              <b-button variant="outline-info" @click="increase">+</b-button>
            </b-input-group-append>
          </b-input-group>
     
        <b-button size="lg" variant="info" class="product-button" @click="addToCart">Add to cart</b-button>
        <b-button size="lg" variant="success" class="product-button" @click="buyNow">Buy now</b-button>
    
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'ProductPage',
  components: {
  },
  data() {
    return {
      product: {},
      numberOfItems: 1,
      selectedOptionCode: {} 
    };
  },
  mounted() {
    axios
      .get("https://euas.person.ee/products/" + this.$route.params.productId) //hier moet nog iets komen ?? 
      .then(response => {
        this.product = response.data;
        this.selectedOption = this.product.options[0]
      });
  },
// define methods under the `methods` object
methods: {
    decrease: function () {
      if(this.numberOfItems >1){
         this.numberOfItems -= 1;
      }
    },
    increase: function () {
      if(!this.numberOfItems){
        this.numberOfItems = 0;
      }
      this.numberOfItems += 1;
    },
    changeOption: function (option) {
      this.selectedOption = option;
    },
    addToCart: function (event, callback) {
      let cart = this.$root.$options.cart
      cart.items.push({
          productId: this.product.id,
          qty: this.numberOfItems,
          optionCode: this.selectedOption.code,
          optionImage: this.selectedOption.image,
          price: this.selectedOption.price,
          total: this.selectedOption.price * this.numberOfItems
      });

      axios
      .put("https://euas.person.ee/user/carts/" + cart.id, cart ) //hier moet nog iets komen ?? 
      .then(() => {
        if(callback) {
          callback()
        }
      });
    },
    buyNow: function (event) {
      this.addToCart(event, () => {
        this.$router.push('/cart');
      })
    }
  }
}


</script>

<style scoped>
.preview-image {
 width: 300px;
}
.items-picker{
  text-align: center;
  width: 200px;
}
.product-button {
  margin: 15px 15px 15px 0;
}
</style>
