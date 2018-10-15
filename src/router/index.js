import Vue from 'vue'
import Router from 'vue-router'
import lx from '@/components/lx'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/parallax',
  routes: [
    {
      path: '',
      name: 'parallax',
      component: lx
    }
  ]
})
