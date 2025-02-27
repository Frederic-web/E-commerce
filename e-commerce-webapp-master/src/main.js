import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import MainPage from './components/MainPage'
import HelpPage from './components/HelpPage'
import CategoryPage from './components/CategoryPage'
import ProductPage from './components/ProductPage'
import ShoppingCartPage from './components/ShoppingCartPage'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios"


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: MainPage },
    { path: '/help', component: HelpPage },
    { path: '/categories/:categoryAlias', component: CategoryPage },
    { path: '/products/:productId', component: ProductPage },
    { path: '/cart', component: ShoppingCartPage }
  ],
  mode: 'history'
});

axios.defaults.headers.common['Authorization'] = 'Bearer vadim.lositski@gmail.com'

if(localStorage.shoppingCartId) {
  //get existing shopping cart
  axios
  .get("https://euas.person.ee/user/carts/" + localStorage.shoppingCartId)
  .then(response => {
    new Vue({
      render: h => h(App),
      router: router,
      cart: response.data
    }).$mount('#app')
  });
} else {
  //create new shopping cart
  axios
  .post("https://euas.person.ee/user/carts/")
  .then(response =>{
      localStorage.shoppingCartId = response.data.id;
      new Vue({
        render: h => h(App),
        router: router,
        cart: response.data
      }).$mount('#app')
  });
}

  

