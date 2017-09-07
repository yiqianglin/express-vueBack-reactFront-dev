
export class Person {
  constructor({
      idcard = '',
      mobile = '',
      name = '',
      isSimilar = true
    })
  {
    this.idcard = idcard
    this.mobile = mobile
    this.name = name
    this.isSimilar = isSimilar
  }
}

export class OrderConfirm {
  constructor({
    applicant = {},
    insurant = {}
  })
  {
    this.applicant = new Person(applicant)
    this.insurant = new Person(insurant)
  }
}
