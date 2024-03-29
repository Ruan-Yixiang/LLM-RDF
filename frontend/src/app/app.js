import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@styles/base.scss';
import DevicePixelRatio from '../utils/devicePixelRatio'
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios'

Vue.use(ElementUI, { locale })
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login/login.vue'),
    },
    {
      path: '/main',
      name:'main',
      component: () => import('../pages/main/main.vue'),
    },
    {
      path: '/graph-canvas',
      name: 'graph-canvas',
      component: () => import('../pages/graph/graphCanvas.vue'),
    },
    // {
    //   path: '/graph',
    //   name: 'graph',
    //   component: () => import('../pages/graph/graph.vue'),
    // },
    {
      path: '/ai',
      name: 'ai',
      component: () => import('../pages/ai/ai.vue'),
    },
    {
      path: '/screener',
      name: 'screener',
      component: () => import('../pages/screener/screener.vue'),
    },
    {
      path: '/display',
      name: 'display',
      component: () => import('../pages/display/display.vue'),
    },
    {
      path: '/display-screener',
      name: 'display-screener',
      component: () => import('../pages/display/display_screener.vue'),
    },
    // {
    //   path: '/display-general',
    //   name: 'display-general',
    //   component: () => import('../pages/display/display_general.vue'),
    // },
    {
      path: '/cc',
      name: 'cc',
      component: () => import('../pages/cc/cc.vue'),
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../pages/layout/layout.vue'),
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('../pages/library/library.vue'),
    },
    {
      path: '/module',
      name: 'module',
      component: () => import('../pages/module/module.vue'),
    },

    {
      path: '/3rdPartAI',
      name: '3rdPartAI',
      component: () => import('../pages/3rdPartAI/3rdPartAI.vue'),
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: () => import('../pages/test/test2.vue'),
    // },
  ],
});

// router guard
// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token')
//   console.log(token)
//   if (to.name != 'login' && !token) next({
//     name:'login'
//   })
//   else next()
// });
//
// axios.interceptors.request.use(config => {
//   if (localStorage.getItem('token')) {
//       config.headers.token = localStorage.getItem('token');
//   }
//   return config;
//   }, error => {
//       return Promise.reject(error);
//   });
//
// axios.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     console.log("error", Object.keys(error), error.response)
//     if (error.response.status === 401 || error.response.status === 403) {
//       router.push({ name: 'login' })
//     }
//     return Promise.reject(error);
//   })



Vue.use(VueRouter);
Vue.use(ElementUI)
// add eventbus
Vue.prototype.$bus = new Vue();

/**
 * entry
 */
window.$app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  created() {
    // new DevicePixelRatio().init()
  }
});

// avoid bd click enlarged
let lastTouchEnd = 0;

document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
});
document.addEventListener('touchend', function (event) {
  const now = (new Date()).getTime();

  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// avoid db fingers enlarged
document.addEventListener('gesturestart', function (event) {
  event.preventDefault();
});

