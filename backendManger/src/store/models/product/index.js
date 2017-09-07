/**
 *
 */
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

import State from './data/index'


let localData = JSON.parse(localStorage.getItem('state_vehicle'))
let state
if(localData){
  // state = localData
  state = new State(localData)
}else{
  state = new State({})
}



export default{
  state,
  actions,
  getters,
  mutations
}
