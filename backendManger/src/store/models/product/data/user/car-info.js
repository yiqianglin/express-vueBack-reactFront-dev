/*

 车辆数据模型

 */
'use strict'
/*const carInfo = {
 cityCode: '',         //行使城市代码
 cityName: '',			//行驶城市名称（省，市）
 engineNo: '',         //可选, 发动机号
 hasPlateNo: false,       //是否有车牌号
 transferredDate: '',  //可选，过户日期
 modelId: '',          //车型Id
 plateNo: '',          //车牌号
 registerDate: '',     //可选, 注册日期，格式：2016-05-11
 vin: '',              //可选, 车架号,
 isTransferred: false,   //是否过户车辆，默认为否
 }*/

class CarInfo {
  constructor(
    {
      cityCode = '330100',
      cityName = '浙江省杭州市',
      engineNo = '',
      hasPlateNo = true,
      transferredDate = '',
      modelId = '',
      model = '',
      plateNo = '浙A',
      registerDate = '',
      vin = '',
      isTransferred = false,
      newCarPrice = 0
    }
  ){
    this.cityCode = cityCode
    this.cityName = cityName
    this.engineNo = engineNo
    this.hasPlateNo = hasPlateNo
    this.transferredDate = transferredDate
    this.modelId = modelId
    this.model = model
    this.plateNo = plateNo
    this.registerDate = registerDate
    this.vin = vin
    this.isTransferred = isTransferred
    this.newCarPrice = newCarPrice
  }
}

export default CarInfo
