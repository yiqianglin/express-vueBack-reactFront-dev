/**
 * Created by cc on 2017/4/14.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { exchangeProduct } from 'stores/market/actionFunc';
import classnames from 'classnames';
import { formatMoney } from 'utils/utilsFunc';

const stockIsOut = (elem) => {
  let stockIsOutTips = null;
  let temp = null;
  // 开始和结束都不为空
  if (
    elem.hourLimitStart !== null &&
    elem.hourLimitStart >= 0 &&
    (elem.hourLimitEnd !== null && elem.hourLimitEnd >= 0)
  ) {
    temp = `每日${elem.hourLimitStart > 9
      ? `${elem.hourLimitStart}:00`
      : `0${elem.hourLimitStart}:00`}-${elem.hourLimitEnd > 9
      ? `${elem.hourLimitEnd}:00`
      : `0${elem.hourLimitEnd}:00`}整点发放`;
  }
  if (temp) {
    stockIsOutTips = (
      <div className="stockIsOutTips">
        <p className="isOut-p1">限量奖品：</p>
        <p className="isOut-p2">
          {temp}
        </p>
      </div>
    );
  }
  return elem.stock === 0
    ? <div className="soldOutMask" onClick={this.soldOutTips}>
      {stockIsOutTips}
      <div className="stamp" />
    </div>
    : null;
};

@inject((stores) => {
  const props = {
    productList: stores.productListStore.productList.toJS(),
    productListStore: stores.productListStore,
    showToast: stores.systemStore.showToast.bind(stores.systemStore),
    isLogin: stores.userStore.isLogin,
    callBackUserInfo: stores.userStore.callBackUserInfo.bind(stores.userStore),
    subServerTime: stores.systemStore.subServerTime
  };
  return props;
})
@observer
export default class ProductPanel extends Component {
  exchangeBtnHandler = (productId) => {
    const { isLogin, callBackUserInfo, subServerTime } = this.props;
    if (!this.props.isLogin) {
      toggleLoginIframe(_gamesource_, () => {
        callBackUserInfo();
      });
    } else {
      exchangeProduct(productId);
    }
  };

  soldOutTips = () => {
    this.props.showToast('呐，东西是有的，只是抢光了');
  };

  render() {
    const { productList } = this.props;
    const { hotList, commonList, allList } = productList;
    const hotProductPanelClassName = classnames({
      'product-wrapper': true,
      fadeIn: !!(!!hotList.length && !!commonList.length)
    });
    return (
      <div className={hotProductPanelClassName}>
        <div className="title" id="productHot" ref="productHot" name="productPanelTop">
          <span className="icon icon-hot" />
          <span className="art">热门奖品</span>
        </div>

        <div className="product-single-wrapper">
          <ul className="product-list">
            {hotList.map((elem, index) =>
              <li className="product-li" key={elem.productId}>
                <div className="product-con">
                  <img
                    className="product-pic"
                    src={elem.picUrl}
                    onClick={() => {
                      this.exchangeBtnHandler(elem.productId);
                    }}
                  />
                  <span className="product-name">
                    {elem.name}
                  </span>
                  <a
                    className="product-value"
                    href="javascript:void(0);"
                    onClick={() => {
                      this.exchangeBtnHandler(elem.productId);
                    }}
                  >
                    {formatMoney(elem.needScore, 0)}欢乐豆
                  </a>
                  {stockIsOut(elem)}
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="title" id="productMore" ref="productMore">
          <span className="icon icon-more" />
          <span className="art">更多奖品</span>
        </div>

        <div className="product-single-wrapper">
          <ul className="product-list">
            {commonList.map((elem, index) =>
              <li className="product-li" key={elem.productId}>
                <div className="product-con">
                  <img
                    className="product-pic"
                    src={elem.picUrl}
                    onClick={() => {
                      this.exchangeBtnHandler(elem.productId);
                    }}
                  />
                  <span className="product-name">
                    {elem.name}
                  </span>
                  <a
                    className="product-value"
                    href="javascript:void(0);"
                    onClick={() => {
                      this.exchangeBtnHandler(elem.productId);
                    }}
                  >
                    {formatMoney(elem.needScore, 0)}欢乐豆
                  </a>
                  {stockIsOut(elem)}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
