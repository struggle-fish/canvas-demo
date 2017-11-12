import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello';
import Index from '@/views/index';
import HelloWorld from '@/views/helloworld';
import Clock from '@/views/clock';
import Coordinate from '@/views/coordinate';
import Htmlele from '@/views/htmlele';
import Htmlele2 from '@/views/htmlele2';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
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
    // 页面元素 随机生成圆圈
    {
      path: '/htmlele',
      name: 'Htmlele',
      component: Htmlele
    },
    // 页面元素 放大图片
    {
      path: '/htmlele2',
      name: 'Htmlele2',
      component: Htmlele2
    }
  ]
});
