'use strict'
import State from './data/index'

Object.deepExtend = _extend;
function _extend(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
      source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      _extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
}

class LocalDataServers {
  constructor(state, stateList){	//state为用户输入的基础车辆数据{object}; stateList为历史数据[{object}]
    this.state = state
    this.stateList = stateList ? stateList : []
  }

  saveStateData(){
    if(!this.stateList || this.stateList.length == 0){
      this.stateList.unshift(this.state)
    }else if(this.stateList.length > 0 && this.stateList.length < 3){
      let temp = this.toFindIndex()
      let temp_matchList = temp.matchList
      let temp_index = temp._index
      if(temp_matchList){
        this.toFirst(this.stateList, temp_index, this.state)
      }else{
        this.stateList.unshift(this.state)
      }
    }else{
      let temp = this.toFindIndex()
      let temp_matchList = temp.matchList
      let temp_index = temp._index
      if(temp_matchList){
        this.toFirst(this.stateList, temp_index, this.state)
      }else{
        this.stateList.unshift(this.state)
        this.stateList.pop()
      }
    }

    return this.stateList
  }

  toFindIndex(){	//查找，传入的state的车牌是否在stateList里，返回命中项和索引
    let _index;
    let matchList = this.stateList.filter((item, index) => {
      if(item.carInfo.plateNo == this.state.carInfo.plateNo){
        _index = index
      };
      return item.carInfo.plateNo == this.state.carInfo.plateNo
    })[0];
    return {matchList, _index};
  }

  toFirst(arr ,index, state){	//命中项前置，并且与state合并
    var temp = arr[index];
    for (var i = 0; i < arr.length; i++) {
      if (i == index) {
        arr.splice(i, 1);
        break;
      }
    }

    temp.carInfo.cityCode = state.carInfo.cityCode
    temp.carInfo.cityName = state.carInfo.cityName
    temp.carInfo.hasPlateNo = state.carInfo.hasPlateNo
    if(state.carOwner.mobile != ''){
      temp.carOwner.mobile = state.carOwner.mobile
    }

    //历史数据与当前数据组合,紧使用车辆信息和车主
    let newState = new State({
      dataFromUser:{carInfo:temp.carInfo, carOwner:temp.carOwner}
    })

    arr.unshift(newState.dataFromUser);
  }
}

/*
 let a = new LocalDataServers(state, stateList)
 console.log(a.saveStateData());*/

export default LocalDataServers


