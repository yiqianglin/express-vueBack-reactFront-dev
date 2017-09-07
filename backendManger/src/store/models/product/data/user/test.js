'use strict'
//import carInfo from './car-info'
//
//
import CarInfo from './car-info'
import CarOwner from './car-owner'
import QueryCarInfo from '../server/query-car-info'

let data = {
            hasPlateNo:'', 
            transferredDate:'', 
            plateNo:'粤B212121',
        }
let myCar = new CarInfo(data)
console.log('****************************')
console.log(myCar)

let carOwner = new CarOwner({name:'林小强'})
console.log(carOwner)

let queryCarInfo = new QueryCarInfo({})
console.log(queryCarInfo)

