/**
 * Created by cc on 2017/8/24.
 */
import merge from 'merge';
import async from 'async';
import pool from './index';
import Product from '../models/product';
import { jsonWrite, pageWrite } from '../utils/returnGenerator';

const productSQLMapping = {
  queryAll: 'SELECT * FROM `product`',
  queryById: 'SELECT * FROM `product` WHERE `productId` = ?',
  queryByName: 'SELECT * FROM `product` WHERE `productName` = ?',
  addProduct: 'INSERT INTO `game`.`product` (`productName`, `needScore`, `stock`) VALUES (?, ?, ?);'
}

export default {
  // 使用async包进行继发操作处理 使用waterfall
  addProductUnique(req, res, callback, next) {
    const { productName, needScore, stock } = req;
    function poolGetConnection(argument) {
	    pool.getConnection((error, connection) => {
        if (err) {
          return {
            
          }
        }
        return resolve({_connection});
	    });
    }
    async.waterfall[

    ]
  }
};
