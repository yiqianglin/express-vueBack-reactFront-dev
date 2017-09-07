
export class BusinessPlanOption {
  constructor({
    deductible = null,
    selected = null
  }){
    this.deductible = deductible
    this.selected = selected
  }

  // *[Symbol.iterator]() {
  //   yield {key:'deductible',value:this.deductible, format:String(Number(this.deductible))}
  //   yield {key:'selected',value:this.selected, format:String(Number(this.selected))}
  // }
  
}

export class BusinessPlanaAmountOption extends BusinessPlanOption {
  constructor({
    deductible = null,
    selected = null,
    amount = null
  }) {
    super({deductible,selected})
    this.amount = amount
  }

  // *[Symbol.iterator]() {
  //   yield *super[Symbol.iterator]()
  //   yield {key:'amount',value:this.amount, format:String(this.amount)}
  // }

}

export class BusinessPlan {

  constructor(
    {
      damage = {},
      glass = {},
      combustion = {},
      thirdParty = {},
      theft = {},
      driver = {},
      passenger = {}
    }
  ) {
    // console.log(damage)
    this.damage = new BusinessPlanOption(damage)
    this.glass = new BusinessPlanOption(glass)
    this.combustion = new BusinessPlanOption(combustion)
    this.thirdParty = new BusinessPlanaAmountOption(thirdParty)
    this.theft = new BusinessPlanOption(theft)
    this.driver = new BusinessPlanaAmountOption(driver)
    this.passenger = new BusinessPlanaAmountOption(passenger)
  }

}

export class VehiclePlan {

  constructor({
    force = true,
    business = {}
  }) {
    this.business = new BusinessPlan(business)
    this.force = force
  }

}

export class AdjustQuotePlan extends VehiclePlan {

  constructor({
    force = true,
    business = {},
    companyId = '',
    basePlan = 'popular',
    message = null,
    isChange = false
  }) {
    super({force, business})
    this.companyId = companyId
    this.basePlan = basePlan
    this.isChange = isChange
    this.message = message
  }
}


export class SelectPlan {

  constructor({
    popular = {},
    comprehensive = {},
    cheap = {},
    selected = 'popular'
  }) {
    this.popular = new VehiclePlan(popular)
    this.comprehensive = new VehiclePlan(comprehensive)
    this.cheap = new VehiclePlan(cheap)
    this.selected = selected
  }

}

