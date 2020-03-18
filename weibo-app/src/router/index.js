import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GagaDetails from '../views/GagaDetails.vue'
import Notice from '../views/Notice.vue'
import MyCommsAndLikes from '../views/MyCommsAndLikes.vue'
import MyFavorites from '../views/MyFavorites.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home, meta:{keepAlive:true}},
  { path: '/GagaDetails', name: 'GagaDetails', component: GagaDetails, meta:{keepAlive:false}},
  { path: '/Notice', name: 'Notice', component: Notice, meta:{keepAlive:false}},
  { path: '/MyCommsAndLikes', name: 'MyCommsAndLikes', component: MyCommsAndLikes, meta:{keepAlive:false}},
  { path: '/MyFavorites', name: 'MyFavorites', component: MyFavorites, meta:{keepAlive:false}},
  { path: '/Login', name: 'Login', component: Login, meta:{keepAlive:false}},
]

const router = new VueRouter({
  routes
})

export default router
