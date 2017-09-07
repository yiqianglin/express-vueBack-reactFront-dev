/*

此数据结构为后台返回的订单数据

*/
let orderDeatils = {
    orderId:null,           //订单Id
    sessionId:null,			//sessionId
    platform:null,			//平台(qubao/fanhua/fanhua2)
	insuranceType:null,		//险种类型
	insuranceTypeName:null,	//险种名称
	orderAmount:null, 		//订单价格
	paidAmount:null,		//支付金额
	actualAmount:null,		//实际扣款金额
	refundAmount:null,		//退款金额
	bonus:null,				//奖励红包金额
	status:null,			//状态 ０:创建中,１:未支付,２:支付确认中,３:已支付,４:已取消,５:待修改,６:创建失败,７:已过期,８:已完成。车险新流程：0x0100:创建中,0x0101:未支付-未核保,0x0102:支付确认中-未核保,0x0103:已支付-待核保,0x0104:已支付-核保失败待退款,0x0105:已支付-已申请退款,0x0106:已支付-待修改,0x0107:已支付-需要人工介入,0x0108:已完成-无退款,0x0109:已完成-有退款。0x010a:已过期
	canBeCancel:null,		//是否可以取消订单，0/1
	createdDatetime:null,	//订单创建时间（yyyy-mm-dd hh:ii:ss）
	insurance: {
		company:{
			providerId:null,	//providerId
			name:null,			//公司名称
			fullName:null,		//公司全称
			phone:null,			//公司服务电话
			logo:{				//公司Logo地址
				big:null,
				small:null
			},
			desc:null,			//公司简介
			freeService:null,	//公司免费服务，类型为Array
		},
		insurant:{
			name:null,			//被保人姓名
			idCard:null,		//身份证
			mobile:null,		//手机号
		},
		vehicleInfo:{
			owner:{
				name:null,		//车主姓名
				idcard:null,	//车主身份证
				mobile:null,	//车主手机								
			},
			cityCode:null,		//城市代码
			cityName:null,		//城市名称
			plateNo:null,		//车牌号
			vin:null,			//车架号，（加星，只供展示）
			engineNo:null,		//发动机号，（加星，只供展示）
			registerDate:null,	//注册日期
			modelName:null,		//用户输入的车型名称
			modelDetail:{
				modelId:null,	//车型ID
				title:null,		//具体的车型名称
				newCarPrice:null,	//新车价格
			},
			transferredDate:null,	//过户日期
		},
		totalPremium:null,		//总保费，
		force:{					//有交强险的时候有此字段
			startDate:null,		//交强险起保日期(YYYY-mm-dd)
			endDate:null,		//交强险终保日期(YYYY-mm-dd)
			totalPremium:null,	//交强总保费（分）
			premium:null,		//交强险保费（分）
			tax:null,			//车船税（分）
		},
		biz:{					//有商业险的时候有此字段
			startDate:null,		//商业险起保日期(YYYY-mm-dd)
			endDate:null,		//商业险终保日期(YYYY-mm-dd)
			totalPremium:null,	//商业险总保费（分）
			deductiblePremium:null,		//不计免赔总保费
			list:null,			
		}
	},
	isSetAddress:null,			//是否已填写保单邮寄地址。为1时有addressInfo字段
	addressInfo:{
		cityName:null,			//城市名称
		cityCode:null,			//城市代码
		receiverName:null,		//接收人姓名
		receiverPhoneNo:null,	//接收人电话
		street:null,			//具体地址，不带城市信息
	},
	humanInvokeExplain:null,		//需要人工介入时的提示信息，类型为array（状态0x0005, 0x0107）
	message:null,				//提示信息，类型为string
	notice:null,				//提示信息类型为string
	noticeExplain:{
		title:null,				//提示信息说明的链接文案
		url:null,				//提示信息解释页面地址
	},
	paymentUrl:null,			//支付链接，订单状态为未支付、支付确认中时有此字段
}