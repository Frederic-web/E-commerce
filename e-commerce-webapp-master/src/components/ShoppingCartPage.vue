<template>
  <div class="shopping-cart-page">
    <h2>Shopping Cart</h2>
  <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col" colspan="2">Product</th>
      <th scope="col">Option</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr  v-for="(item, index) in cart.items" :key="index + '-' + item.productId + '-' + item.optionCode">
      <th scope="row"><img :src="item.optionImage" class="shopping-cart-image"></th>
      <td>Mark</td>
      <td>{{ item.optionCode}}</td>
      <td>{{ item.price}}</td>
      <td>
         <b-input-group class="items-picker">
            <b-input-group-prepend>
              <b-button variant="outline-info" @click="decrease(index)">-</b-button>
              
            </b-input-group-prepend>
            
            <b-form-input v-model.number="item.qty"
            type="number"></b-form-input>

            <b-input-group-append>
              <b-button variant="outline-info" @click="increase(index)">+</b-button>
            </b-input-group-append>
          </b-input-group>
      </td>
      <td>{{ item.total}}</td>
      <td>
        <b-button variant="outline-danger" @click="remove(index)">Remove</b-button>
      </td>
    </tr>
    <tr class="total-row">
      <td colspan="5">TOTAL</td>
      <td>{{ totalAmount}} </td>
      <td></td>
    </tr>
  </tbody>
</table> 
  </div>
  
</template>

<script>
import axios from "axios"
export default {
  name: 'ShoppingCart',
  components: {
  },
  computed: {
    cart: function () {
     return this.$root.$options.cart
    },
    totalAmount: function() {
      let total = 0
      for(let item of this.cart.items) {
        total += item.total
      }
      return total
    }
  },
  methods: {
    remove: function (index) {
      this.$root.$options.cart.items.splice(index, index + 1)
      this.save()
    },
    save: function () {
      axios.put("https://euas.person.ee/user/carts/" + this.cart.id, this.cart ) //hier moet nog iets komen ?? 
    },
    decrease: function (index) {
      this.cart.items[index].qty -= 1;
      this.save()
    },
    increase: function (index) {
      this.cart.items[index].qty += 1;
      this.save()
    }
  }
}
</script>

<style scoped>
.shopping-cart-image {
  max-height: 100px;
}
.total-row {
  font-weight: bold;
}
.items-picker {
  width: 130px;
}
</style>
