import Router from 'vue-router'

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
  routes
})

