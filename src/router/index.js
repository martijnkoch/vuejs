import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Gerechten from '@/components/Gerecht/Gerechten'
import Creategerecht from '@/components/Gerecht/Creategerecht'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Gerecht from '@/components/Gerecht/Gerecht'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/gerechten',
      name: 'Gerechten',
      component: Gerechten
    },
    {
      path: '/gerecht/new',
      name: 'Creategerecht',
      component: Creategerecht,
      beforeEnter: AuthGuard
    },
    {
      path: '/gerechten/:id',
      name: 'Gerecht',
      props: true,
      component: Gerecht
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
