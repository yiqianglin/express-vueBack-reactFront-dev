import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const productList = r => require.ensure([], () => r(require('@/page/productList')), 'productList');
const home = (resolve, reject) => {
	require.ensure([], () => {
		resolve(require('@/page/home'))
	}, 'home');
};

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		}, {
			path: '/productList',
			component: productList,
			meta: ['商品列表'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
