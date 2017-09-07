/*

此数据结构为报价接口所需参数，包含用户的报价前的所有输入

*/

let inputData = {         //最终获取报价需要的数据结构
    //carDbSessionId: null,   //可选, 智能车库数据SessionId，车辆信息从智能车库查询出来时必传
    cityCode: null,         //行使城市代码
    //engineNo: null,         //可选, 发动机号
    hasPlateNo: null,       //是否有车牌号
    //transferredDate: null,  //过户日期
    modelId: null,          //车型Id
    owner: {                //
        idcard: null,       //车主身份证号
        mobile: null,       //车主手机号
        name: null          //车主姓名
    },
    plateNo: null,          //车牌号
    providerIdList: [],     //公司代码列表，以英文逗号分隔
    quotePlan: {            //方案
        biz: [],            //
        force:{             //
            chosen: null    //是否选择交强险
        }
    }
    //registerDate: null,     //可选, 注册日期，格式：2016-05-11
    //vin: null               //可选, 车架号
};

let _biz = {                 //
    chosenDeductible: null, //可选, 是否选择不计免赔险
    targetAmount: null,     //可选, 目标保额，单位为分
    type: null              //可选, 险种类型
}

export default inputData