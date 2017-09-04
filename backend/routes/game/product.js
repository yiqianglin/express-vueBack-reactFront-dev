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
  productAction.addProductUnique3({ productName: '名字很奇怪4', needScore: 10000, stock: 20 }, res, null, next);
});

export default router;
