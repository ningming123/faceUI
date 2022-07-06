import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import AppView from './components/app-view'
import faceDetect from './views/admin/faceDetect'
import faceContrast from './views/admin/faceContrast'
import Menu from './views/admin/Menu'
import sysUser from './views/admin/sysUser'
import creditList from './views/credit/creditList'
import consumeList from './views/consume/consumeList'

Vue.use(Router)

const router = new Router({
  mode: 'hash', // hash, history
  routes: [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    {
      path: '/admin',
      component: AppView,
      children: [
        { path: '/faceDetect', component: faceDetect, meta: { icon: 'fa fa-dashboard', label: 'faceDetect' }},
        { path: '/faceContrast', component: faceContrast, meta: { icon: 'fa fa-dashboard', label: 'faceContrast' }},
        { path: '/createMenu', component: Menu, meta: { icon: 'fa fa-dashboard', label: 'faceContrast' }},
        { path: '/createUser', component: sysUser, meta: { icon: 'fa fa-dashboard', label: 'faceContrast' }},
        { path: '/creditList', component: creditList, meta: { icon: 'fa fa-dashboard', label: 'faceContrast' }},
        { path: '/consumeList', component: consumeList, meta: { icon: 'fa fa-dashboard', label: 'faceContrast' }}

        ]
    }
  ]
})

export default router
