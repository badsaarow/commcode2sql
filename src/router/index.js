import Vue from 'vue';
import Router from 'vue-router';
import Commcode2sql from '@/components/Commcode2sql';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Commcode2sql',
      component: Commcode2sql,
    },
  ],
});
