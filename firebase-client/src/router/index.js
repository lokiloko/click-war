import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexFront from '@/components/IndexFront'
import CreateRoom from '@/components/CreateRoom'
import Room from '@/components/Room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: CreateRoom
    },
    {
      path: '/login',
      name: 'Login',
      component: HelloWorld
    },
    {
      path: '/create_room',
      name: 'CreateRoom',
      component: CreateRoom
    },
    {
      path: '/room/:room_name',
      name: 'Room',
      component: Room,
      props: true
    }
  ]
})
