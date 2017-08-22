/**
 * Created by Administrator on 2017/4/23 0023.
 */
import React, { Component } from 'react';
import { formatMoney } from 'utils/utilsFunc';

export default class ProductDetailsTop extends Component {
  render() {
    const { productDetailsTopData: renderData } = this.props;
    return (
      <div className="top">
        <div className="u-clearP">
          <div className="left">
            <img className="product-img up" src={renderData.picUrl}></img>
            <span className="shadow"></span>
          </div>
          <div className="right">
            <span className="product-name">{renderData.name}</span>
            {
              renderData.createSource === 1
                ? <span className="product-value">{formatMoney(renderData.spendScore, 0)}欢乐豆兑换</span>
                : renderData.createSource === 2
                    ? <span className="product-value">抽奖获得</span>
                    : renderData.createSource === 3
                        ? <span className="product-value">首充赠送</span>
                        : renderData.createSource === 4
                            ? <span className="product-value">充值赠送</span>
                            : null
            }
          </div>
        </div>
      </div>
    );
  }
}
