import vue from 'vue'
import Bridge from '../../../common/bridge/bridge'
import {FETCH_INSURE_PLAN} from './mutation-type'
import {post, ApiError} from '../base/api'

/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
// const _get = ({ url, params }, commit, loadingStatus = true) => {
//   console.log(commit && loadingStatus)
//   if (commit && loadingStatus) commit('START_LOADING_FROM_SERVER')
//   url = 'http://test.insurance.oa.com/' + url;
//
//   let _params = {data: JSON.stringify(params)}
//   Bridge.Application.getLogin(function(responseData){
//       if(responseData.status == 0){
//         _params['auth'] = responseData.data.user.auth;
//       }else{
//         return
//       }
//   })
//
//   var promise = vue.http.get(url, {
//     params: _params,
//     emulateJSON: true,
//     timeout:15000
//   });
//
//   return promise.then((response) => {
//     commit('FINISH_LOADING_FROM_SERVER')
//     if(response.status >= 200 && response.status < 300){
//       return JSON.parse(response.data)
//     }else{
//       return Promise.reject((new Error(response)))
//     }
//   }, (response) => {
//     console.log('there is an error');
//     commit('FAIL_LOADING_FROM_SERVER')
//     return Promise.reject((new Error(response)))
//   });
// }

/**
 * 启动一个新Session
 * @param auth
 * @return {Promise}
 */
export const getCarDBSession = ({ commit }, params) => {
  const url = 'mobile/v4/insurance/vehicle/start_session.sgi'
  const sucCommit = 'GET_START_SESSION_SUCCESS'
  const failCommit = 'GET_START_SESSION_FAIL'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          }))
      }
    })
    .catch((error) => {
      throw error
    })
}

/**
 * 获取登录框显示位置信息
 * @param {}
 * @return {Promise}
 */
export const getLoginFormControl = ({ commit }, params) => {
  const url = 'mobile/v4/insurance/vehicle/login_form_control.sgi'
  const sucCommit = 'GET_LOGIN_FORM_CONTROL_SUCCESS'
  const failCommit = 'GET_LOGIN_FORM_CONTROL_FAIL'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}

/**
 * 查询车辆信息
 * @param {sessionId, plateNo, [plateNo]}
 * @return {Promise}
 */
export const queryCarInfo = ({ commit }, params) => {
  const url = 'mobile/v4/insurance/vehicle/query_car_info.sgi'
  const sucCommit = 'QUERY_CAR_INFO_SUCCESS'
  const failCommit = 'QUERY_CAR_INFO_FAIL'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}

/**
 * 查询车型信息
 * @param {}
 * @return {Promise}
 */
export const queryCarModel = ({ commit }, params) => {
  const url = 'mobile/v4/insurance/vehicle/query_car_model.sgi'
  const sucCommit = 'QUERY_CAR_MODEL_SUCCESS'
  const failCommit = 'QUERY_CAR_MODEL_FAIL'

  return post({url, params}, commit)
    .then((data) => {
      console.log('data:', data)
      if (data.ret == 0) {
        commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}

/**
 * 根据品牌，列出车系
 * @param {}
 * @return {Promise}
 */
export const listFamilies = ({ commit }, params) => {
  const url = 'mobile/v1/car_insurance/list_families.sgi'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}

/**
 * 根据品牌和车系，列出车系特性信息
 * @param {}
 * @return {Promise}
 */
export const listEngineAndGearboxes = ({ commit }, params) => {
  const url = 'mobile/v1/car_insurance/list_engine_and_gearboxes.sgi'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}

/**
 * 根据品牌、车系、车系特性信息 获取车型列表
 * @param {}
 * @return {Promise}
 */
export const listModelsWithAllHumanOptions = ({ commit }, params) => {
  const url = 'mobile/v1/car_insurance/list_models.sgi'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}


/**
 * 根据行政区域编码获取可支持的公司列表
 * @param {cityCode}
 * @return {Promise}
 */
export const querySupportedCompany = ({ commit }, params) => {
  const url = 'mobile/v1/car_insurance/list_engine_and_gearboxes.sgi'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}

/**
 * 用户提交报价
 * @param {见http://test.insurance.oa.com/mobile/v4/insurance/vehicle/submit_quote_plan.sgi?p=1}
 * @return {Promise}
 */
export const submitQuotePlan = ({ commit }, params) => {
  const url = 'mobile/v4/insurance/vehicle/submit_quote_plan.sgi'
  const sucCommit = 'SUBMIT_QUOTE_PLAN_SUCCESS'
  const failCommit = 'SUBMIT_QUOTE_PLAN_FAIL'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}

/**
 * 客户端查询报价结果
 * @param {sessionId}
 * @return {Promise}
 */
export const queryQuoteResult= ({ commit }, params) => {
  const url = 'mobile/v4/insurance/vehicle/query_quote_result.sgi'
  const sucCommit = 'QUERY_QUOTE_RESULT_SUCCESS'
  const failCommit = 'QUERY_QUOTE_RESULT_FAIL'
/*let temp ={"status":0,"list":[{"providerId":2019,"platform":"fanhua2","status":1,"message":"\u8be5\u8f66\u6682\u65f6\u65e0\u6cd5\u81ea\u52a8\u62a5\u4ef7","notice":""},{"providerId":2043,"platform":"fanhua2","status":1,"message":"\u8be5\u8f66\u6682\u65f6\u65e0\u6cd5\u81ea\u52a8\u62a5\u4ef7","notice":""},{"providerId":2007,"platform":"fanhua2","status":1,"message":"\u7cfb\u7edf\u7f51\u8def\u5f00\u5c0f\u5dee\u4e86","notice":""},{"providerId":2011,"platform":"fanhua2","status":0,"message":"","notice":"","totalPremium":2673500,"bonus":100000,"recommend":1,"force":{"premium":66500,"tax":450000,"totalPremium":516500,"beginDate":"2017-03-28","endDate":"2018-03-27"},"biz":{"deductiblePremium":281348,"totalPremium":2157000,"beginDate":"2017-01-11","endDate":"2018-01-10","quoteResult":[{"type":"damage","premium":1730644,"amount":"57.99\u4e07\u4fdd\u989d"},{"type":"thirdParty","premium":132183,"amount":"50\u4e07\u4fdd\u989d"},{"type":"driver","premium":3591,"amount":"1\u4e07\u4fdd\u989d"},{"type":"passenger","premium":9234,"amount":"1\u4e07\u4fdd\u989d"}]}},{"providerId":2021,"platform":"fanhua2","status":3,"message":"[\u4ea4\u5f3a\u5546\u4e1a\u8d77\u4fdd\u65f6\u95f4\u4e0d\u4e00\u81f4\u65f6\uff0c\u8bf7\u5206\u5f00\u63d0\u4ea4,\u65e7\u8f66\u9996\u6b21\u6295\u4fdd\u7981\u6b62\u627f\u4fdd\u8f66\u635f]","notice":""},{"providerId":2026,"platform":"fanhua2","status":0,"message":"","notice":"","totalPremium":3039307,"bonus":100000,"recommend":0,"force":{"premium":66500,"tax":450000,"totalPremium":516500,"beginDate":"2017-03-28","endDate":"2018-03-27"},"biz":{"deductiblePremium":329062,"totalPremium":2522807,"beginDate":"2017-01-11","endDate":"2018-01-10","quoteResult":[{"type":"damage","premium":2024145,"amount":"57.99\u4e07\u4fdd\u989d"},{"type":"thirdParty","premium":154600,"amount":"50\u4e07\u4fdd\u989d"},{"type":"driver","premium":4200,"amount":"1\u4e07\u4fdd\u989d"},{"type":"passenger","premium":10800,"amount":"1\u4e07\u4fdd\u989d"}]}},{"providerId":2005,"platform":"fanhua2","status":0,"message":"","notice":"","totalPremium":3325898,"bonus":100000,"recommend":0,"force":{"premium":66500,"tax":450000,"totalPremium":516500,"beginDate":"2017-03-28","endDate":"2018-03-27"},"biz":{"deductiblePremium":366443,"totalPremium":2809398,"beginDate":"2017-01-11","endDate":"2018-01-10","quoteResult":[{"type":"damage","premium":2254088,"amount":"57.99\u4e07\u4fdd\u989d"},{"type":"thirdParty","premium":172163,"amount":"50\u4e07\u4fdd\u989d"},{"type":"driver","premium":4677,"amount":"1\u4e07\u4fdd\u989d"},{"type":"passenger","premium":12027,"amount":"1\u4e07\u4fdd\u989d"}]}}]}
commit(sucCommit, temp)
return temp;*/
  return post({url, params}, commit, false)
    .then((data) => {
      if (data.ret == 0) {
        commit(sucCommit, data.data)
        return data.data
 /*       commit(sucCommit, temp)
        return temp;*/
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}


/**
 * 对指定的公司进行重新报价
 * @param {见http://test.insurance.oa.com/mobile/v4/insurance/vehicle/submit_human_quote.sgi?p=1}
 * @return {Promise}
 */
export const submitHumanQuote = ({ commit }, params) => {
  console.log(params)
  const url = 'mobile/v4/insurance/vehicle/submit_human_quote.sgi'
  //const sucCommit = 'SUBMIT_HUMAN_QUOTE_SUCCESS'
  const failCommit = 'SUBMIT_HUMAN_QUOTE_FAIL'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        //commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}


//获取保险计划数据
export const getPlanData = ({ commit }, params) => {
  const url = 'mobile/v3/insurance/vehicle/get_package.sgi'
  return post({url, params}, commit)
      .then((data) => {
      console.log(data)
      if (data.ret == 0) {
        commit(FETCH_INSURE_PLAN, data.data)
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}

/**
 * 提交订单信息
 * @param {}
 * @return {Promise}
 */
export const submitOrder= ({ commit }, params) => {
  const url = 'mobile/v4/insurance/vehicle/submit_order.sgi'
  const sucCommit = 'SUBMIT_ORDER_SUCCESS'
  const failCommit = 'SUBMIT_ORDER_FAIL'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}


/**
 * 提交订单信息
 * @param {}
 * @return {Promise}
 */
let count =1
export const getOrderDeatils= ({ commit }, params) => {
  const url = 'mobile/v4/my/order/detail.sgi'
  const sucCommit = 'GET_ORDER_DETAILS_SUCCESS'
  const failCommit = 'GET_ORDER_DETAILS_FAIL'

/*let temp = {
    "orderId": "170111151130121018",
    "sessionId": "eac3882c-4e37-4d65-831b-5ec987fc99b9",
    "insuranceType": 1,
    "insuranceTypeName": "车险",
    "orderAmount": 2673500,
    "paidAmount": 3,
    "actualAmount": 3,
    "refundAmount": 3,
    "status": 1,
    "canBeCancel": 0,
    "createdDatetime": "2017-01-11 13:36:52",
    "insurance": {
        "company": {
            "providerId": "2011",
            "name": "太保财险",
            "fullName": "中国太平洋财产保险股份有限公司",
            "phone": "95511",
            "logo": {
                "small": "resource/image/company_logo/taibao_small.png",
                "big": "resource/image/company_logo/taibao_big.png"
            },
            "desc": "提供免费道路救援等1项特服",
            "freeService": [
                "免费道路救援、随叫随到"
            ]
        },
        "insurant": {
            "name": "卢树安",
            "idCard": "44190019810321617X",
            "mobile": "13570464444"
        },
        "vehicleInfo": {
            "owner": {
                "name": "卢树安",
                "idcard": "44190019810321617X",
                "mobile": "13570464444"
            },
            "cityCode": "441900",
            "cityName": "广东省东莞市",
            "plateNo": "粤S12345",
            "vin": "WDD2211761A158045",
            "engineNo": "WDD2211761A158045",
            "registerDate": "2008-01-25",
            "modelName": "奔驰BENZ S600轿车",
            "modelDetail": {
                "modelId": "I0000000000000000220000000000257",
                "title": "梅赛德斯-奔驰 S级 5.5L 手自一体 2004款",
                "newCarPrice": 162000000
            }
        },
        "totalPremium": 2673500,
        "force": {
            "startDate": "2017-03-28",
            "endDate": "2018-03-27",
            "totalPremium": 516500,
            "premium": 66500,
            "tax": 450000
        },
        "biz": {
            "startDate": "2017-01-12",
            "endDate": "2018-01-11",
            "totalPremium": 2157000,
            "deductiblePremium": 281348,
            "list": [
                {
                    "typeName": "车损险",
                    "hasDeductible": 1,
                    "amount": "57.99万保额",
                    "premium": 1730644
                },
                {
                    "typeName": "三者险",
                    "hasDeductible": 1,
                    "amount": "50万保额",
                    "premium": 132183
                },
                {
                    "typeName": "司机座位险",
                    "hasDeductible": 1,
                    "amount": "1万保额",
                    "premium": 3591
                },
                {
                    "typeName": "乘客座位险",
                    "hasDeductible": 1,
                    "amount": "1万保额",
                    "premium": 9234
                }
            ]
        }
    },
    "bonus": 100000,
    "isSetAddress": 0,
    "paymentUrl": "https://itoubao.uat.52zzb.com/PayCenter/#/pay/sFaFI7G9BX8V0hGQzdsOJu5XyVz9IpGn"
}
console.log('count', count)
if(count>=5 && count<=800){
  temp.status = 1
}
if (count>800){
  temp.status = 1
}
count ++;
console.log('server', temp.status)
commit(sucCommit, temp)
return temp*/
  return post({url, params}, commit, false)
    .then((data) => {
      if (data.ret == 0) {
        commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}

/**
 * 用户支付完成之后确认支付
 * @param {orderId}
 * @return {Promise}
 */
export const confirmPayment= ({ commit }, params) => {
  const url = 'mobile/v3/my/order/confirm_payment.sgi'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}



/**
 * 根据需补充信息，上传图片
 * @param {}
 * @return {Promise}
 */
export const uploadImg= ({ commit }, params) => {
  const url = 'mobile/v1/resource/image/put.sgi'
  const sucCommit = 'UPLOAD_IMG_SUCCESS'
  const failCommit = 'UPLOAD_IMG_FAIL'

  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        //commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}

/**
 * 上传图片到保险公司
 * @param {}
 * @return {Promise}
 */
export const uploadVerifyImage= ({ commit }, params) => {
  console.log('uploadVerifyImage actions')
  const url = 'mobile/v5/my/order/upload_verify_image.sgi'
  const sucCommit = 'UPLOAD_VERIFY_IMAGE_SUCCESS'
  const failCommit = 'UPLOAD_VERIFY_IMAGE_FAIL'
  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        //commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}


/**
 * 确认认证信息，上传完所有认证图片之后调用该接口确认
 * @param {orderId}
 * @return {Promise}
 */
export const confirmVerifyInfo= ({ commit }, params) => {
  const url = 'mobile/v5/my/order/confirm_verify_info.sgi'
  const sucCommit = 'CONFIRM_VERIFY_INFO_SUCCESS'
  const failCommit = 'CONFIRM_VERIFY_INFO_FAIL'
  return post({url, params}, commit)
    .then((data) => {
      if (data.ret == 0) {
        //commit(sucCommit, data.data)
        return data.data;
      }else{
        return Promise.reject(
          new ApiError({
            ret: data.ret,
            data: data.tips,
            message: 'RET_REJECTED'
          })
        )
      }
    })
    .catch((error) => {
      throw error
    })
}



/*
export const getCarDBSession = ({ commit }, params) => {
  const url = 'mobile/v4/insurance/vehicle/start_session.sgi'
  const sucCommit = 'GET_START_SESSION_SUCCESS'
  const failCommit = 'GET_START_SESSION_FAIL'
    console.log('访问后台：getCarDBSession')
    var res = {ret:0, data:{sessionId: 'carDBSession1231231231'}}
    let promise = new Promise((resolve, reject)=>{
      if(res.ret == 0){
        resolve(res.data)
      }else{
        let temp = {errorCode: res.ret, tips: res.tips}
        reject(temp)
      }
    })
    return promise.then((data)=>{
      console.log('成功：',data)
      commit(sucCommit, data)
      return data
    }, (error)=>{
      console.log('失败:', error.errorCode, error.tips)
      commit(failCommit, data)
      return data
    })
}

export const queryCarInfo = ({ commit }, params) => {
  const url = 'mobile/v4/insurance/vehicle/query_car_info.sgi'
  const sucCommit = 'QUERY_CAR_INFO_SUCCESS'
  const failCommit = 'QUERY_CAR_INFO_FAIL'
  console.log('访问后台：queryCarInfo')
  let res = {
    ret: 0,
    data: {
        "plateNo": "粤B096EC",
        "model": "丰田GTM6480ASL",
        "vin": "*************2951",
        "engineNo": "***6414",
        "registerDate": "2010-06-01",
        "owner": "*轶群",
        "idcard": "429006************43",
        "modelList": [
            {
                "modelId": "402880882158e5fc01217776130f0f5d",
                "title": "广汽丰田 汉兰达 2.7L 手自一体 豪华版 两驱 国Ⅳ 2009款",
                "newCarPrice": 27880000
            },
            {
                "modelId": "402880882158e5fc0121777b7ba40f69",
                "title": "广汽丰田 汉兰达 2.7L 手自一体 豪华导航版 两驱 国Ⅳ 2009款",
                "newCarPrice": 29880000
            }
        ]
    }
  }
    let promise = new Promise((resolve, reject)=>{
      if(res.ret == 0){
        resolve(res.data)
      }else{
        let temp = {errorCode: res.ret, tips: res.tips}
        reject(temp)
      }
    })
    return promise.then((data)=>{
      console.log('成功：',data)
      commit(sucCommit, data)
      return data
    }, (error)=>{
      console.log('失败:', error.errorCode, error.tips)
      commit(failCommit, data)
      return data
    })
}
*/
