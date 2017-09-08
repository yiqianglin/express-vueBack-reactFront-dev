import Vue from 'vue'
import Vuex from 'vuex'
import productModule from './modules/product/index'

Vue.use(Vuex)

const module_product = {
	state: productModule.state,
	mutations: productModule.mutations,
	actions: productModule.actions,
	getters: productModule.getters
}

const store = new Vuex.Store({
	modules: {
		product: module_product
	}
});

export default store;