import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from '../views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path:'/regist',
    name:'Regist',
    component:()=>import('../views/regist/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../main.vue'),
    children: [
      {
        path:"/",
        redirect: "/main/home"
      },
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/Home/About.vue')
      },
      {
        path: 'candler',
        name: 'candler',
        component: () => import('../views/Home/Candler.vue')
      },
      {
        path: 'message',
        name: 'message',
        component: () => import('../views/Home/Message.vue')
      },
      {
        path:"echarts",
        name:"Echarts",
        component:() => import('../views/Home/Elcharts.vue')
      }
]
  },
]

const router = new VueRouter({
  /*mode: 'history',*/
  /* 在 electron的路由中应该使用的是 hash 模式  如果后台支持的话可以采用历史模式*/
  mode:'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
