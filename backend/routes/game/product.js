import express from 'express';
import productAction from '../../actions/product';

const router = express.Router();

router.all('/showAll', (req, res, next) => {
  productAction.showProduct(req, res, (err, resResult) => {
    console.log('结果是：', resResult);
  }, next);
});

// http://localhost:3000/product/showProductById?productId=1&productName='不知道'
router.all('/showProductById', (req, res, next) => {
  productAction.showProductById({ productId: 1 }, res, null, next);
});

router.all('/addProduct', (req, res, next) => {
	console.log('添加商品路由');
  productAction.addProductUnique3({ productName: '名字很奇怪6', needScore: 10000, stock: 20 }, res, null, next);
  
  // var temp = new Promise((resolve, reject) => {
  // 	var a = true;
  // 	var data = {dataFrom: 'one'};
  // 	if(a === true)
  // 		resolve(data)
  // 	else
  // 		reject(data)
  // });
  // temp.then((data)=>{
  // 	console.log('第一个then', data);
  // 	return Promise.reject({dataFrom: 'two'});
  // })
  // .then((data)=>{
  // 	console.log('第二个then', data);
  // })
  // .catch(err => console.log('catch', err))


  // async function as1(){
  // 	console.log('as1');
  // 	return await new Promise((resolve, reject)=>{
  // 		setTimeout(()=>{
  // 			return resolve({step: 'one'})
  // 		}, 1000);
  // 	});
  // 	// return _result;
  // };
  // async function as2({step}){
  // 	console.log('as2', step);
  // 	return await new Promise((resolve, reject)=>{
  // 		setTimeout(()=>{
  // 			return resolve({step: step + " two"})
  // 		}, 2000);
  // 	});
  // 	// return _result;
  // };
  // async function as3({step}){
  // 	console.log('as3', step);
  // 	return await new Promise((resolve, reject)=>{
  // 		return resolve({step: step + " three"})
  // 	});
  // 	// return _result;
  // };

  // as1()
  // .then(data => as2(data))
  // .then(data => as3(data))
  // .then(data => console.log('lastData', data))
  // .catch(err => console.log('catch', err));
});

export default router;
