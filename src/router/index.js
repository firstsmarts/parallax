import Vue from 'vue'
import Router from 'vue-router'
import lx from '@/components/lx'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/lx',
  routes: [
    {
      path: '',
      name: 'lx',
      component: lx
    }
  ]
})
