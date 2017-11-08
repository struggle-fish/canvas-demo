import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello';
import Index from '@/views/index';
import Clock from '@/views/clock';
import Coordinate from '@/views/coordinate';
import Htmlele from '@/views/htmlele';
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    // 表
    {
      path: '/clock',
      name: 'Clock',
      component: Clock
    },
    // 坐标转化
    {
      path: '/coordinate',
      name: 'Coordinate',
      component: Coordinate
    },
    {
      path: '/htmlele',
      name: 'Htmlele',
      component: Htmlele
    }
  ]
});
