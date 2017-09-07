import {QueryCarInfo} from './server'
import {CarInfo, CarOwner, SelectPlan, AdjustQuotePlan, OrderConfirm} from './user/index'

/*const state = {
 dataFromUser: {		//以用户的输入作为模块写入
 carInfo: new CarInfo({}),
 carOwner: new CarOwner({}),
 },
 dataFromServer: {		//以接口返回作为模块写入
 sessionId: null,
 queryCarInfo: new QueryCarInfo({}),
 },
 }

 export default state*/

class State {
  constructor(
    {
      dataFromServer:{
        queryCarInfo = null,
        insurePlan = null,
        queryCarModelInfo = null,
        companyList = null,
        quotedResult = null,
        sessionId = null,
        orderDetails = null,
        loginFormControl = null,
      } = {},
      dataFromUser:{
        carInfo:userCarInfo = {},
        carOwner:userCarOwner = {},
        selectPlan:userSelectPlan = {},
        adjustQuotePlan:userAdjustQuotePlan = {},
        companySelected:userCompanySelected = null,
        orderConfirm:userOrderConfirm = {},
        adjustQuotePlanList:userAdjustQuotePlanList = []
      } = {},
      globalConfig:{
        login_postpositon = false
      } = {},
      history = []
    }
  ){

    this.dataFromUser = {

      carInfo: new CarInfo(userCarInfo),
      carOwner: new CarOwner(userCarOwner),
      selectPlan: new SelectPlan(userSelectPlan),
      adjustQuotePlan: new AdjustQuotePlan(userAdjustQuotePlan),
      companySelected: userCompanySelected,
      orderConfirm: new OrderConfirm(userOrderConfirm),
      adjustQuotePlanList: userAdjustQuotePlanList
    }

    this.dataFromServer = {
      queryCarInfo: queryCarInfo,
      insurePlan: insurePlan,
      queryCarModelInfo: queryCarModelInfo,
      companyList: companyList,
      quotedResult: quotedResult,
      sessionId: sessionId,
      orderDetails: orderDetails,
      loginFormControl: loginFormControl
    }


    this.history = history //new Array(3)  //用来存储三套用户输入数据
    this.globalConfig = {
      login_postpositon: login_postpositon,
    }
  }
}

export default State

