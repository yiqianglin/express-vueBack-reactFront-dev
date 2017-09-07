//空数据模型
import State from './data/index'
//存储、命中数据js
import LocalDataServers from './save-local-data'

import {
  FETCH_INSURE_PLAN,
  CHANGE_PLAN_FORCE,
  CHANGE_SELECTED_PLAN,
  CHANGE_SELECTED_PLAN_OPTION,
  FETCH_ORDER_INSURANT,
  FETCH_ORDER_APPLICANT
} from './mutation-type'

import {AdjustQuotePlan} from './data/user/plan'
import {Person} from './data/user/orderConfirm'



//深度合并，替代Object.assign
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


const mutations = {

  ['SAVE_PLATENO'] (state, data){
    //测试数据
    let _state = new State({
      dataFromServer: {
        loginFormControl: state.dataFromServer.loginFormControl
      }
    })
    Object.deepExtend(_state.dataFromUser, data)
    let dataSaver = new LocalDataServers( JSON.parse(JSON.stringify(_state.dataFromUser)), JSON.parse(JSON.stringify(state.history)) ) //对象的引用会导致store在js类中被修改。。。有空写deepCopy
    state.dataFromUser = _state.dataFromUser    //验证，如果需要重新定义新属性，则需要使用vue.set(obj,newName,value)，或者使用对象展开运算符state.obj = { ...state.obj, newName: value }
    state.dataFromServer = _state.dataFromServer
    let temp = dataSaver.saveStateData()
    state.dataFromUser = temp[0]
    state.history = temp
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  //储存用户输入的完整数据
  ['SAVE_STATELIST'] (state, data){
    console.log('SAVE_STATELIST', state)
  },


  //存储登录框显示位置信息
  ['GET_LOGIN_FORM_CONTROL_SUCCESS'] (state, data){
    console.log('存储登录框显示位置信息',data)
    state.dataFromServer.loginFormControl = data
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },



  //存储用户开始填写的手机号为车主手机号
  ['SAVE_FAST_LOGIN_MOBILE_AS_CAROWNER_MOBILE'] (state, data) {
    state.dataFromUser.carOwner.mobile = data.mobile
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },


  // 启动一个新Session
  ['GET_START_SESSION_SUCCESS'] (state, data) {
    state.dataFromServer.sessionId = data.sessionId
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  ['GET_START_SESSION_FAIL'] (state, data) {
    console.log('获取Session失败')
  },

  //获取车辆信息
  ['QUERY_CAR_INFO_SUCCESS'] (state, data) {
    console.log('获取车辆信息成功', data)
    state.dataFromServer.queryCarInfo = data
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  ['QUERY_CAR_INFO_FAIL'] (state, data) {
    console.log('获取车辆信息失败')
  },

  //获取车型信息
  ['QUERY_CAR_MODEL_SUCCESS'] (state, data) {
    console.log('获取车型信息成功')
    state.dataFromServer.queryCarModelInfo = data
    //当新车未上牌，没有state.dataFromServer.queryCarInfo
    if(!state.dataFromServer.queryCarInfo)
      state.dataFromServer.queryCarInfo = {modelList: data.modelList}
    else
      state.dataFromServer.queryCarInfo.modelList = data.modelList
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  ['QUERY_CAR_MODEL_FAIL'] (state, data) {
    console.log('获取车型信息失败')
  },

  //储存车主信息页面
  ['SAVE_CAROWNERINFO'] (state, data){
    let carOwner = state.dataFromUser.carOwner
    let carInfo = state.dataFromUser.carInfo
    console.log('储存车主信息', data)
    carOwner.idcard = data.idcard
    carOwner.name = data.name
    carInfo.isTransferred = data.isTransferred
    carInfo.transferredDate = data.transferredDate
    state.history[0] = state.dataFromUser
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  //储存车辆信息页面
  ['SAVE_CARINFO'] (state, data){
    let carInfo = state.dataFromUser.carInfo
    console.log('储存车辆信息页面', data)
    carInfo.model = data.model
    carInfo.vin = data.vin
    carInfo.engineNo = data.engineNo
    carInfo.registerDate = data.registerDate
    state.history[0] = state.dataFromUser
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  //根据行政区域编码获取可支持的公司列表++
  ['QUERY_SUPPORTED_COMPANY_SUCCESS'] (state, data){
    console.log('保存信息+++')
    state.dataFromServer.companyList = data.list
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  ['QUERY_SUPPORTED_COMPANY_FAIL'] (state, data){
    state.dataFromServer.companyList = data.list
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  //用户选择车型数据
  ['SAVE_CAR_MODEL'] (state, data){
    console.log('储存carModel数据', data)
    let carInfo = state.dataFromUser.carInfo
    carInfo.modelId = data.modelId
    carInfo.newCarPrice = data.newCarPrice
    state.history[0] = state.dataFromUser
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },


  //创建一个车险默认配置
  ['createPackage'] (state, data){
    console.log('车险默认配置', data)
    console.log('车险默认配置',  state.dataFromUser.carInfo.modelId)
    console.log('车险默认配置',  state)
    let temp =
    {
      "sessionId": state.dataFromServer.sessionId,
      "modelId": '4028b288355c5ba101355f9bab510014', //state.dataFromUser.carInfo.modelId,
      "cityCode": '441900', //state.dataFromUser.carInfo.cityCode,
      "providers": [],
      "hasPlateNo": "1",
      "plateNo": "粤S12345",
      "vin": "LVSFBXAC242812228",
      "engineNo": "6182013",
      "registerDate": "2016-05-11",
      "transferredDate": "2016-05-12",
      /*                  "owner": {
       "name": state.dataFromUser.carOwner.name,
       "idcard": state.dataFromUser.carOwner.idcard,
       "mobile": state.dataFromUser.carOwner.mobile
       },*/

      "owner": {
        "name": "林小明",
        "idcard": "152321197912190017",
        "mobile": "13205556789"
      },
      "quotePlan": {
        "force": {
          "chosen": "1"
        },
        "biz": [
          {
            "type": "thirdParty",
            "deductible": "1",
            "amount": "30000000"
          },
          {
            "type": "damage",
            "deductible": "1"
          },
          {
            "type": "theft",
            "deductible": "1"
          },
          {
            "type": "driver",
            "deductible": "1",
            "amount": "5000000"
          },
          {
            "type": "passenger",
            "deductible": "1",
            "amount": "10000000"
          },
          {
            "type": "glass"
          },
          {
            "type": "combustion",
            "deductible": "1"
          }
        ]
      }
    }
    let companyList = state.dataFromServer.companyList
    for(let i in companyList){
      if(companyList.hasOwnProperty(i)){
        temp.providers[i] = {provider: companyList[i].providerId, platforms:''}
        for(let j in companyList[i].platforms){
          if(companyList[i].platforms.hasOwnProperty(j)){
            temp.providers[i].platforms += companyList[i].platforms[j]
          }
        }
      }
    }
    console.log(temp.providers)
    state.dataFromUser.quotePackge = temp
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },


  //提交报价方案成功
  ['SUBMIT_QUOTE_PLAN_SUCCESS'] (state, data){
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  //提交报价方案失败
  ['SUBMIT_QUOTE_PLAN_FAIL'] (state, data){
    console.log('提交报价方案 失败', data)
  },

  //客户端查询报价成功
  ['QUERY_QUOTE_RESULT_SUCCESS'] (state, data){
    state.dataFromServer.quotedResult = data
  },

  //客户端查询报价失败
  ['QUERY_QUOTE_RESULT_FAIL'] (state, data){
    console.log('客户端查询报价 失败', data)
  },
  //存储被保人的信息和投保人信息
  [FETCH_ORDER_APPLICANT] (state,data){
    state.dataFromUser.orderConfirm.applicant = new Person(data)
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },
  [FETCH_ORDER_INSURANT] (state,data){
    state.dataFromUser.orderConfirm.insurant = new Person(data)
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  //方案选择
  [FETCH_INSURE_PLAN] (state, data) {
    state.dataFromServer.insurePlan = data
  },
  [CHANGE_PLAN_FORCE] (state, data) {
    state.dataFromUser.selectPlan[data.plan].force = data.value
  },
  [CHANGE_SELECTED_PLAN] (state, data) {
    state.dataFromUser.selectPlan.selected = data
  },
  [CHANGE_SELECTED_PLAN_OPTION] (state, data) {
    let plan = data.plan
    let cate = data.cate
    let value = data.value

    // state.dataFromUser.selectPlan['popular']['force'] = value

    if (plan && cate) {
      let selectPlan = state.dataFromUser.selectPlan[plan]
      if (selectPlan) {
        if (cate == 'force') {
          selectPlan[cate] = value
        } else {
          let selectPlanCate = selectPlan[cate]
          if (selectPlanCate) {
            for (let type in value) {
              let subOption = selectPlanCate[type]
              if (subOption) {
                for (let key in value[type]) {
                  if (key in subOption) {
                    subOption[key] = value[type][key]
                  }
                  else {
                    subOption[key] = value[type][key]
                  }
                }
              }
            }
          }
        }
      }
    }
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },
  ['CHANGE_ADJUST_QUOTE_PLAN_OPTION'] (state, data) {
    let cate = data.cate
    let value = data.value

    let selectPlan = state.dataFromUser.adjustQuotePlan
    if (selectPlan && cate) {
      if (cate == 'force') {
        selectPlan[cate] = value
      } else {
        let selectPlanCate = selectPlan[cate]
        if (selectPlanCate) {
          for (let type in value) {
            let subOption = selectPlanCate[type]
            if (subOption) {
              for (let key in value[type]) {
                if (key in subOption) {
                  subOption[key] = value[type][key]
                }
                else {
                  subOption[key] = value[type][key]
                }
              }
            }
          }
        }
      }
      selectPlan.isChange = true
    }
    localStorage.setItem('state_vehicle', JSON.stringify(state))

  },
  ['SET_ADJUST_QUOTE_PLAN'] (state, data) {
    console.log('========================', data)
    if(data.userSelected){
      state.dataFromUser.adjustQuotePlan = new AdjustQuotePlan({
        business: data.userSelected['business'],
        force: data.userSelected['force'],
        basePlan: data.basePlan,
        companyId: data.companyId,
        message: data.message
      })
    } else {
      console.log('清空调整方案')
      let obj = new AdjustQuotePlan({})
      state.dataFromUser.adjustQuotePlan = obj

/*      state.dataFromUser.adjustQuotePlan.isChange = false
      state.dataFromUser.adjustQuotePlan.companyId = ''*/
    }
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  //客户端查询报价前，清除本地之前的报价数据
  ['CLEAN_QUOTE_RESULT'] (state, data){
    console.log('清除报价数据')
    state.dataFromServer.quotedResult = {}
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  //报价后，记录用户选择已报价成功的公司
  ['SAVE_CHOSED_COMPANY'] (state, data){
    console.log('记录用户选择已报价成功的公司：', data)
    state.dataFromUser.companySelected = data.providerId
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  //修改adjustQuotePlanList
  ['UPDATE_ADJUST_QUOTE_PLAN_LIST'] (state, data){
    state.dataFromUser.adjustQuotePlanList = data
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },

  

  //初始化保单确认页，判断投保人、被保人信息是否同投保人
  ['INIT_ORDER_CONFRIM_DATA'] (state, data){
    let insurant =  state.dataFromUser.orderConfirm.insurant
    let applicant = state.dataFromUser.orderConfirm.applicant
    let carOwner = state.dataFromUser.carOwner
    if(insurant.isSimilar){
      insurant.name = carOwner.name
      insurant.mobile = carOwner.mobile
      insurant.idcard = carOwner.idcard
    }
    if(applicant.isSimilar){
      applicant.name = carOwner.name
      applicant.mobile = carOwner.mobile
      applicant.idcard = carOwner.idcard
    }

    //state.dataFromUser.orderConfirm = new OrderConfirm()
  },


  //订单创建成功，保存返回的订单结果
  ['SUBMIT_ORDER_SUCCESS'] (state, data){
    state.dataFromServer.orderDetails = data
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },
  ['SUBMIT_ORDER_FAIL'] (state, data){
  },


  //订单创建成功，保存返回的订单结果
  ['GET_ORDER_DETAILS_SUCCESS'] (state, data){
    state.dataFromServer.orderDetails = data
    localStorage.setItem('state_vehicle', JSON.stringify(state))
  },
  ['GET_ORDER_DETAILS_FAIL'] (state, data){
  },


}

export default mutations
