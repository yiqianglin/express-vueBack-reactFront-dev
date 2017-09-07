'use strict'
/*

车辆信息查询数据模型

*/

/*const queryCarInfo = {
	plateNo: '',		//车牌号
	model: '',			//车型名称(别克LSGJR52U85S110284) 注：若model, vin,engineNo,carRegDate有一项为空，则modelList返回空数组
	vin: '', 			//车架号(*************0284)
	engineNo: '',		//发动机号(****667K)
	registerDate: '',	//注册日期(*******)
	owner: '',
	idcard:	'',
	
}

export default queryCarInfo*/


class QueryCarInfo {
    constructor(
        {
            plateNo = '', 
            model = '', 
            vin = '', 
            engineNo = '', 
            registerDate = '', 
            owner = '', 
            idcard = '', 
        }
    ){
        this.plateNo = plateNo
        this.model = model
        this.vin = vin
        this.engineNo = engineNo
        this.registerDate = registerDate
        this.owner = owner
        this.idcard = idcard
    }
}

export default QueryCarInfo