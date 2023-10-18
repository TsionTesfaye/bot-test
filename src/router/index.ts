import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/applicantDetail/:id',
    // name: 'detail',
    component: () => import ('../views/ApplicantDetail.vue')
  },

  {
    path: '/ListOfApplicants/:jobId/:userId',
    //name: 'home',
    component: () => import ('../views/ListOfApplicants.vue')
  },

  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
