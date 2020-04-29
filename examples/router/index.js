import Vue from 'vue'
import Layout from '@/views/layout'
import commonpenConfig from '@/commonpens.json'
import Router from 'vue-router'

Vue.use(Router)
 const constantRoutes = [
  {
    path: '/',
    component: Layout,
    name: 'layout',
    redirect: '/index',
    children: commonpenConfig.map(item => {
      return {
        path: '/' + item.com,
        name: item.com,
        component: () => import(`@/docs/${item.com}.md`)
      }
    })
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
console.log(constantRoutes)
export default router

