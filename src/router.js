import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router)

const routes = [
	{
		path: '/',
    component: (resolve) => require(['./views/index.vue'], resolve),
	},
	{
		path: '/test',
    component: (resolve) => require(['./views/test.vue'], resolve),
	}
]

export default new Router({
  routes,
})
