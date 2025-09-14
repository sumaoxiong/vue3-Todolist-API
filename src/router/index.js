import { createRouter, createWebHashHistory } from 'vue-router'
import TodoListView from '@/views/TodoListView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: TodoListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    /* {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    }, */
  ],
})

//路由守衛
/* router.beforeEach((to, from, next) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)vue3-todolist-token\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )

  if (to.meta.requiresAuth && !token) {
    next('/login') // 未登入導向 login
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    //在login和register的路由中如果驗證到token就轉跳到todolist頁面
    next('/todolist') // 已登入直接到至 todoList
  } else {
    next() // 通過驗證
  }
}) */

export default router
