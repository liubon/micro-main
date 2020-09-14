import Vue from 'vue';
import VueRouter from 'vue-router';
export const Routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/appStore',
    name: 'appStore',
    component: () => import('@/views/appStore/index.vue'),
  },
];
const router = new VueRouter({
  mode: 'hash',
  routes: Routes,
});
Vue.use(VueRouter);
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

export default router;
