import Vue from 'vue';
import VueRouter from 'vue-router';

import user from './modules/user';
import home from './modules/home';
import form from './modules/form';
import chart from './modules/chart';

Vue.use(VueRouter);

const constantroutes = [...user, ...home, ...form, ...chart];

const createRouter = () =>
  new VueRouter({
    // mode: "hash", // require service support
    routes: constantroutes,
    scrollBehavior() {
      return {
        x: 0,
        y: 0,
      };
    },
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
