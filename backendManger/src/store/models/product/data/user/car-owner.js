'use strict'
/*

 车主数据模型

 */

/*const carOwner = {
 idcard: null,       //车主身份证号
 mobile: null,       //车主手机号
 name: null          //车主姓名
 }

 export default carOwner*/


class CarOwner {
  constructor(
    {
      idcard = '',
      mobile = '',
      name = ''
    }
  ){
    this.idcard = idcard
    this.mobile = mobile
    this.name = name
  }
}

export default CarOwner
