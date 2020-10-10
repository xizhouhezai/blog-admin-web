import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const commonRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: () => import('../components/404.vue'),
  },
]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = {
  home: {
    path: '/home',
    name: 'home',
    meta: { title: '主页' },
    component: () => import('../views/Home.vue'),
  },
}

const createRouter = () => new Router({
  routes: commonRoutes,
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router