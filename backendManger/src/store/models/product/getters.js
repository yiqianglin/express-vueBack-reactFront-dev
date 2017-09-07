export const getBaseInfoData = state => state.dataFromUser
export const getCarOwnerInfo = state => state.dataFromUser.carOwner
export const getQueriedCarInfo = state => state.dataFromServer.queryCarInfo
export const getSessionId = state => state.dataFromServer.sessionId
export const getCarInfo = state => state.dataFromUser.carInfo
export const getSupportedCompany = state => state.dataFromServer.companyList
export const getQuotedResult = state => state.dataFromServer.quotedResult
export const getInsurantInfo = state => state.dataFromUser.orderConfirm.insurant
export const getOrderConfirmDate = state => state.dataFromUser.orderConfirm
export const getSelectPlan = state => state.dataFromUser.selectPlan
export const getOrderDetails = state => state.dataFromServer.orderDetails
export const getAdjustQuotePlanList = state => state.dataFromUser.adjustQuotePlanList
export const getLoginFormControl = state => state.dataFromServer.loginFormControl

export const getPlanBusinessSetting = state => {
  let setting = state.dataFromServer.insurePlan

  if (setting) {
    let result = {}
    for (let type in setting.packageList) {
      let typeItem = {}
      for (let option of setting.packageList[type].bizInsuranceList) {
        typeItem[option.type] = option
      }
      result[type] = typeItem
    }

    return result
  }

  return null
}

//获取调整方案后的合并数据
export const getAdjustQuotePlan = state => {

  let currentPlan = state.dataFromUser.adjustQuotePlan

  let settings = getPlanBusinessSetting(state)

  if (settings && currentPlan && currentPlan.business) {

    let currentSetting = getPlanBusinessSetting(state)[currentPlan.basePlan]

    let biz = getBusinessMerge(currentSetting, currentPlan.business)

    let result = {
      "force": {
        "chosen": Number(currentPlan.force)
      },
      "biz": biz
    }
    return result
  }
  return null

}


function getBusinessMerge(businessSetting,businessSelected) {

  let biz = []

  for (let type in businessSelected) {
    let option = businessSelected[type]
    let setting = businessSetting[type]
    let resultObj = {type: type}

    if(option.selected != null) {
      if(!option.selected) {
        continue
      }
    } else {
      if(!Boolean(setting.selected)) {
        continue
      }
    }

    if(setting.hasDeductible) {
      if(option.deductible != null) {
        resultObj['deductible'] = Number(option.deductible)
      } else {
        resultObj['deductible'] = Number(setting.default.deductible)
      }
    }

    if(setting.targetAmount) {
      if(option.amount != null) {
        resultObj['amount'] = Number(option.amount)
      } else {
        resultObj['amount'] = Number(setting.default.targetAmount)
      }
    }

    biz.push(resultObj)
  }
  return biz
}



export const getQuotePlan = state => {

  // let setting =state.dataFromServer.insurePlan
  let plan = state.dataFromUser.selectPlan
  let currentPlan = plan[plan.selected]

  let settings = getPlanBusinessSetting(state)

  if (settings) {
    let currentSetting = getPlanBusinessSetting(state)[plan.selected]

    if (settings && currentPlan && currentPlan.business && currentSetting) {

      let biz = getBusinessMerge(currentSetting, currentPlan.business)

      let result = {
        "force": {
          "chosen": Number(currentPlan.force)
        },
        "biz": biz
      }
      return result
    }
  }
  return null
}



//生成一个报价方案
export const getQuotePackage = state => {
  let plan = getQuotePlan(state)
  let info = state.dataFromUser.carInfo
  let owner = state.dataFromUser.carOwner
  let _info = state.dataFromServer.queryCarInfo

  let temp =
  {
    "sessionId": state.dataFromServer.sessionId,
    "modelId": info.modelId,
    "cityCode": info.cityCode,
    "providers": [],
    "hasPlateNo": Number(info.hasPlateNo),
    //"plateNo": info.plateNo,
    //"vin": info.vin,
    //"engineNo": info.engineNo,
    //"registerDate": info.registerDate,
    //"transferredDate": info.transferredDate,
    /*"owner": {
      "name": owner.name,
      "idcard": owner.idcard,
      "mobile": owner.mobile,
    },*/
    "quotePlan": plan
  }
  //有车牌则传入palteNo
  if(temp.hasPlateNo){
    temp.plateNo = info.plateNo
  }
  //判断用户是否修改车库信息
  //如果有车牌，则有state.dataFromServer.queryCarInfo，则需要判断_info和info是否相等，从而判断用户是否修改车库信息
  //如果无车牌，则直接将info写入
  if(temp.hasPlateNo && _info){
    if(info.vin != _info.vin) temp.vin = info.vin
    if(info.engineNo != _info.engineNo) temp.engineNo = info.engineNo
    if(info.registerDate != _info.registerDate) temp.registerDate = info.registerDate
    if(info.isTransferred == true && info.transferredDate != _info.transferredDate) temp.transferredDate = info.transferredDate
    if(owner.idcard != _info.idcard || owner.name != _info.owner || (owner.mobile && owner.mobile != _info.mobile)){
      temp.owner = {};
      if(owner.idcard && owner.idcard != _info.idcard) temp.owner.idcard = owner.idcard
      if(owner.name && owner.name != _info.owner) temp.owner.name = owner.name
      if(owner.mobile && owner.mobile != _info.mobile) temp.owner.mobile = owner.mobile
    }
  }else{
    temp.vin = info.vin
    temp.engineNo = info.engineNo
    temp.registerDate = info.registerDate
     if(info.isTransferred == true) temp.transferredDate = info.transferredDate
    temp.owner = {
      idcard : owner.idcard,
      name : owner.name,
      mobile : owner.mobile,
    };
  }

  let companyList = state.dataFromServer.companyList
  for(let i in companyList){
    if(companyList.hasOwnProperty(i)){
      temp.providers[i] = {provider: companyList[i].providerId, platforms: companyList[i].platforms.join()}
    }
  }

  return temp

}












//报价数据
/*

 {"ret":"0","data":{"status":0,"list":[{"providerId":2021,"platform":"fanhua2","status":1,"message":"\u6682\u65e0\u62a5\u4ef7","notice":""},{"providerId":2043,"platform":"fanhua2","status":1,"message":"\u6682\u65e0\u62a5\u4ef7","notice":""},{"providerId":2019,"platform":"fanhua2","status":3,"message":"[\u8fc7\u6237\u8f66\u7981\u6b62\u627f\u4fdd\u8f66\u635f]","notice":""},{"providerId":2011,"platform":"fanhua2","status":3,"message":"[\u65b0\u4fdd\u6216\u8fc7\u6237\u8f66\u592a\u4fdd\u65e0\u4f63\u91d1\uff0c\u8bf7\u9009\u62e9\u5176\u4ed6\u516c\u53f8]","notice":""},{"providerId":2007,"platform":"fanhua2","status":1,"message":"\u7cfb\u7edf\u7f51\u8def\u5f00\u5c0f\u5dee\u4e86","notice":""},{"providerId":2026,"platform":"fanhua2","status":0,"message":"","notice":"","totalPremium":827621,"bonus":100000,"recommend":0,"force":{"premium":95000,"tax":28000,"totalPremium":123000,"beginDate":"2016-12-29","endDate":"2017-12-28"},"biz":{"deductiblePremium":92295,"totalPremium":704621,"beginDate":"2016-12-29","endDate":"2017-12-28","quoteResult":[{"type":"damage","premium":231723,"amount":"15.97\u4e07\u4fdd\u989d"},{"type":"thirdParty","premium":122360,"amount":"30\u4e07\u4fdd\u989d"},{"type":"theft","premium":85784,"amount":"15.97\u4e07\u4fdd\u989d"},{"type":"driver","premium":19950,"amount":"5\u4e07\u4fdd\u989d"},{"type":"passenger","premium":102600,"amount":"10\u4e07\u4fdd\u989d"},{"type":"glass","premium":31692,"amount":"\u56fd\u4ea7\u73bb\u7483"},{"type":"combustion","premium":18217,"amount":"15.97\u4e07\u4fdd\u989d"}]}},{"providerId":2016,"platform":"fanhua2","status":0,"message":"","notice":"","totalPremium":827621,"bonus":100000,"recommend":0,"force":{"premium":95000,"tax":28000,"totalPremium":123000,"beginDate":"2016-12-29","endDate":"2017-12-28"},"biz":{"deductiblePremium":92296,"totalPremium":704621,"beginDate":"2016-12-29","endDate":"2017-12-28","quoteResult":[{"type":"damage","premium":231722,"amount":"15.97\u4e07\u4fdd\u989d"},{"type":"thirdParty","premium":122360,"amount":"30\u4e07\u4fdd\u989d"},{"type":"theft","premium":85785,"amount":"15.97\u4e07\u4fdd\u989d"},{"type":"driver","premium":19950,"amount":"5\u4e07\u4fdd\u989d"},{"type":"passenger","premium":102600,"amount":"10\u4e07\u4fdd\u989d"},{"type":"glass","premium":31692,"amount":"\u56fd\u4ea7\u73bb\u7483"},{"type":"combustion","premium":18216,"amount":"15.97\u4e07\u4fdd\u989d"}]}},{"providerId":2005,"platform":"fanhua2","status":0,"message":"","notice":"","totalPremium":658884,"bonus":80000,"recommend":1,"force":{"premium":95000,"tax":28000,"totalPremium":123000,"beginDate":"2016-12-29","endDate":"2017-12-28"},"biz":{"deductiblePremium":70194,"totalPremium":535884,"beginDate":"2016-12-29","endDate":"2017-12-28","quoteResult":[{"type":"damage","premium":176231,"amount":"15.97\u4e07\u4fdd\u989d"},{"type":"thirdParty","premium":93058,"amount":"30\u4e07\u4fdd\u989d"},{"type":"theft","premium":65241,"amount":"15.97\u4e07\u4fdd\u989d"},{"type":"driver","premium":15173,"amount":"5\u4e07\u4fdd\u989d"},{"type":"passenger","premium":78030,"amount":"10\u4e07\u4fdd\u989d"},{"type":"glass","premium":24103,"amount":"\u56fd\u4ea7\u73bb\u7483"},{"type":"combustion","premium":13854,"amount":"15.97\u4e07\u4fdd\u989d"}]}}]}}

 */


/*export const getOrderDetails = state =>{
  let temp = {"orderId":"170108198428821008","sessionId":"16c20751-d832-465e-b072-5d8e453ba8d6","insuranceType":1,"insuranceTypeName":"\u8f66\u9669","orderAmount":401833,"paidAmount":0,"actualAmount":0,"refundAmount":0,"status":267,"canBeCancel":0,"createdDatetime":"2017-01-08 10:34:42","insurance":{"company":{"providerId":"2026","name":"\u5b89\u76db\u5929\u5e73\u8d22\u9669","fullName":"\u5b89\u76db\u5929\u5e73\u8d22\u4ea7\u4fdd\u9669\u80a1\u4efd\u6709\u9650\u516c\u53f8","phone":"10106969","logo":{"small":"resource\/image\/company_logo\/anshengtianping_small.png","big":"resource\/image\/company_logo\/anshengtianping_big.png"},"desc":"\u63d0\u4f9b\u4eba\u4f24\u6848\u4ef6\u8c03\u89e3\u7b491\u9879\u7279\u670d","freeService":["\u4eba\u4f24\u6848\u4ef6\u5168\u7a0b\u8c03\u89e3"]},"insurant":{"name":"\u6d4b\u8bd5","idCard":"110101199308011688","mobile":"13688844787"},"vehicleInfo":{"owner":{"name":"\u6d4b\u8bd5","idcard":"110101199308011688","mobile":"13688844787"},"cityCode":"441900","cityName":"\u5e7f\u4e1c\u7701\u4e1c\u839e\u5e02","plateNo":"\u7ca4S90213","vin":"LVBSH51K7EG341632","engineNo":"341632","registerDate":"2013-09-28","modelName":"\u5317\u4eacBJ1021PHD44\u666e\u901a\u8d27\u8f66","modelDetail":{"modelId":"402880882f2a43c3012f4215326d07aa","title":"\u5317\u6c7d \u5317\u6c7d\u8f7b\u578b\u8d27\u8f66 2.2L \u53d1\u52a8\u673a\u578b\u53f7:\u6c88\u9633\u534e\u66684G22D4;\u5e95\u76d8\u578b\u53f7:\u5317\u4eacBJ1021PHD44D 0000\u6b3e","newCarPrice":5500000}},"totalPremium":401833,"force":{"startDate":"2017-01-09","endDate":"2018-01-08","totalPremium":133824,"premium":120000,"tax":13824},"biz":{"startDate":"2017-01-09","endDate":"2018-01-08","totalPremium":268009,"deductiblePremium":34959,"list":[{"typeName":"\u8f66\u635f\u9669","hasDeductible":1,"amount":"3.56\u4e07\u4fdd\u989d","premium":61420},{"typeName":"\u4e09\u8005\u9669","hasDeductible":1,"amount":"50\u4e07\u4fdd\u989d","premium":164790},{"typeName":"\u53f8\u673a\u5ea7\u4f4d\u9669","hasDeductible":1,"amount":"1\u4e07\u4fdd\u989d","premium":4230},{"typeName":"\u4e58\u5ba2\u5ea7\u4f4d\u9669","hasDeductible":1,"amount":"1\u4e07\u4fdd\u989d","premium":2610}]}},"bonus":50000,"isSetAddress":0,"message":"\u8bf7\u5148\u4e0a\u4f20\u8eab\u4efd\u8bc1\u3001\u884c\u9a76\u8bc1\u518d\u63d0\u6838\uff0c\u8c22\u8c22\u3002","lackedImage":[{"imageType":"8","imageName":"\u8f66\u8f86\u524d\u53f345\u5ea6\u7167\u7247"},{"imageType":"4","imageName":"\u884c\u9a76\u8bc1\u526f\u9875\u7167"},{"imageType":"5","imageName":"\u8f66\u8f86\u6b63\u9762\u7167\u7247"},{"imageType":"6","imageName":"\u8f66\u8f86\u6b63\u540e\u7167\u7247"},{"imageType":"9","imageName":"\u8f66\u8f86\u540e\u5de645\u5ea6\u7167\u7247"},{"imageType":"7","imageName":"\u8f66\u8f86\u524d\u5de645\u5ea6\u7167\u7247"},{"imageType":"10","imageName":"\u8f66\u8f86\u540e\u53f345\u5ea6\u7167\u7247"},{"imageType":"3","imageName":"\u884c\u9a76\u8bc1\u6b63\u9875\u7167"},{"imageType":"11","imageName":"\u5e26\u8f66\u67b6\u53f7\u7167\u7247"},{"imageType":"1","imageName":"\u88ab\u4fdd\u4eba\u8eab\u4efd\u8bc1\u53cd\u9762\u7167"},{"imageType":"0","imageName":"\u88ab\u4fdd\u4eba\u8eab\u4efd\u8bc1\u6b63\u9762\u7167"}]}
  return temp
}
*/
