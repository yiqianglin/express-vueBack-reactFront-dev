//空数据模型
import State from './data/product'

const mutations = {
  //changeStock 修改库存
  ['CHANGE_STOCK'] (state, data){
    console.log('修改库存mutation', state)
  },

}

export default mutations
