/**
 * Created by cc on 2017/7/10.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import ProductStatus from 'components/market/ProductStatus';
import ActiveCode from 'components/market/ActiveCode';

@inject((stores) => {
  const props = {
    exchangeRecordInfo: stores.userStore.exchangeRecordInfo,
  };
  return props;
}) @observer
export default class ExchangeRecordInfoActiveCodeCommon extends Component {
  goBack() {
    if (window.history && window.history.length > 1) {
      browserHistory.goBack();
    } else {
      browserHistory.replace('game-web-mall/game/market/creditMarket.htm');
    }
  }
  render() {
    const { couponCode, productDesc, couponType } = this.props.exchangeRecordInfo;
    const ActiveCodeData = { couponCode, productDesc, couponType };
    const { receivedStatus, orderStatus, orderId } = this.props.exchangeRecordInfo;
    const ProductStatusData = { receivedStatus, orderStatus, orderId };
    return (
      <div className="exchange-exchange-info-wrp">
        <ActiveCode ActiveCodeData={ActiveCodeData} />
        <ProductStatus ProductStatusData={ProductStatusData} />
        <a className="btn" href="javascript:void(0);" onClick={() => { this.goBack(); }}>
          返回
        </a>
      </div>
    );
  }
}
