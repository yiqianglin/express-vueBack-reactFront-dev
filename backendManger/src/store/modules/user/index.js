import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

import Product from './data/product'

export default{
  state: new Product({}),
  actions,
  getters,
  mutations
}
