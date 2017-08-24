/**
 * Created by cc on 2017/8/24.
 */
import merge from 'merge';
import pool from './index';
import Product from '../models/product';
import { jsonWrite, pageWrite } from '../utils/returnGenerator';

const productSQLMapping = {
  queryAll: 'SELECT * FROM `product`',
  queryById: 'SELECT * FROM `product` WHERE `productId` = ?',
  addProduct: 'INSERT INTO `game`.`product` (`productName`, `needScore`, `stock`) VALUES (?, ?, ?);'
}

export default {
  showProduct(req, res, callback, next) {
    pool.getConnection((error, connection) => {
      connection.query(productSQLMapping.queryAll, (err, dbResult) => {
        const result = [];
        if (dbResult) {
          dbResult.forEach((item, index, arr) => {
            result.push(new Product(item));
          });
        }

        const resResult = merge({
          code: '200',
          msg: '查询成功'
        }, { result: JSON.stringify(result) });

        callback && callback(err, resResult);
        jsonWrite(res, resResult);
        connection.release();
      });
    });
  },
  showProductById(req, res, callback, next) {
    const productId = +req.productId;
    pool.getConnection((error, connection) => {
      connection.query(productSQLMapping.queryById, productId, (err, dbResult) => {
        const resResult = {
          code: '200',
          msg: dbResult.length ? '查询成功' : '查无此商品ID',
          result: dbResult.length ? JSON.stringify(dbResult[0]) : ''
        };
        callback && callback(err, resResult);
        jsonWrite(res, resResult);
        connection.release();
      });
    });
  },
  addProduct(req, res, callback, next) {
    const { productName, needScore, stock } = req;
    pool.getConnection((error, connection) => {
      connection.query(productSQLMapping.addProduct, [productName, needScore, stock], (err, dbResult) => {
        /*
        * 增加成功后返回dbResult为{"fieldCount":0,"affectedRows":1,"insertId":8,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
        * affectedRows表示数据表中受影响的行数，数据插入成功则为1，失败则为0；在主键自增的情况下，insertId是数据插入成功后对应的主键id，如果主键不自增，则insertId为0。
        * 执行sql语句后，有3种结果：
          成功修改数据： affectedRows：1, changedRows:1
          要修改的数据与原数据相同： affectedRows：1, changedRows:0
          未找到需要修改的数据： affectedRows：0, changedRows:0
        * */
        jsonWrite(res, dbResult);
        connection.release();
      });
    });
  }
};
