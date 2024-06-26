import { createRouter, createWebHistory } from 'vue-router';
import MainComponent from '@/views/CategoryPage.vue';
import MainProduct from '@/views/ProductPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/cards'
  },
  {
    path: '/cards',
    name: 'Cards',
    component: MainComponent
  },
  {
    path: '/products',
    name: 'Products',
    component: MainProduct
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
