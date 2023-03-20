import Vue from 'vue';
import VueRouter from 'vue-router';

import user from './modules/user';
import home from './modules/home';
import form from './modules/form';
import chart from './modules/chart';

Vue.use(VueRouter);

const routes = [...user, ...home, ...form, ...chart];

const router = new VueRouter({
  // mode: 'history',
  // base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

export function resetRouter() {
  const WHITE_NAME_LIST = ['Login'];
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
