'use strict'
/*

投保人数据模型
isSimilar = true	默认同车主
*/


class applicant {
    constructor(
        {
            idcard = '', 
            mobile = '', 
            name = '',
            isSimilar = true
        }
    ){
        this.idcard = idcard
        this.mobile = mobile
        this.name = name
        this.isSimilar = isSimilar
    }
}

export default applicant