import Vue from 'vue';
import Router from 'vue-router';
import main from '@/pages/main/main.vue';
import My from '../../src/components/My.vue';
import login from '@/pages/login/login.vue';
import ThirdPartAI from '@/pages/3rdPartAI/3rdPartAI.vue';
import ai from '@/pages/ai/ai.vue';
import canvas from '@/pages/graph/graph.vue';
import VueRouter from 'vue-router';

Vue.use(Router);
const routes = [
    { path: '/login', component: login },
    { path: '/my', component: My },
    { path: '/main', component: () => import('@/pages/main/main.vue') },
    { path: '/3rdPartAI', name: '3rdPartAI', component: ThirdPartAI, },
    { path: '/ai', name: 'ai', component: ai, 
      // children: [
      //   {path: '/canvas',component: canvas}
      // ]
    },
    { path: '/screener', name: 'screener', component: () => import('../pages/screener/screener.vue') },
    {
      path: '/graph-canvas',
      name: 'graph-canvas',
      component: canvas,
    },
    {
      path: '/display',
      name: 'display',
      component: () => import('../pages/display/display.vue'),
    }
  ]
  
export default new Router({ routes });
