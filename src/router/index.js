import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ShoppingList.vue'
import Shopping from '../views/ShoppingList.vue';
import ShoppingCar from '../views/ShoppingCar.vue';
import ShoppingCheckout from '../views/ShoppingCheckout.vue';
import ShoppingBuySuccess from '../views/ShoppingBuySuccess.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
     // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/shopping',
      name: 'shopping',
      //  自訂義要使用到的元件
      component: Shopping,
    },
    {
      path: '/Shoppingcar',
      name: 'Shoppingcar',
      //  自訂義要使用到的元件
      component:ShoppingCar,
    },
    {
      path: '/Shoppingcheck',
      name: 'ShoppingCheckout',
      //  自訂義要使用到的元件
      component:ShoppingCheckout,
    },
    {
      path: '/buysuccess',
      name: 'ShoppingBuySuccess',
      //  自訂義要使用到的元件
      component:ShoppingBuySuccess,
    },
  ]
})

export default router
