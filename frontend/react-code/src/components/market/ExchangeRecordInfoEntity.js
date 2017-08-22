/**
 * Created by cc on 2017/7/11.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import ProductStatus from 'components/market/ProductStatus';
import Addressee from 'components/market/Addressee';
import Expressage from 'components/market/Expressage';

@inject((stores) => {
  const props = {
    exchangeRecordInfo: stores.userStore.exchangeRecordInfo,
  };
  return props;
}) @observer
export default class ExchangeRecordInfoEntity extends Component {
  goBack() {
    if (window.history && window.history.length > 1) {
      browserHistory.goBack();
    } else {
      browserHistory.replace('game-web-mall/game/market/creditMarket.htm');
    }
  }
  render() {
    const status = {
      isShowAddressee: !!(this.props.exchangeRecordInfo && this.props.exchangeRecordInfo.receivedStatus === 1), // 是否需要展示地址填写表单（即未设置收货地址）
      isShowExpressage: !!(this.props.exchangeRecordInfo && this.props.exchangeRecordInfo.receivedStatus >= 10) // 未发货、已发货、已签收、已确认收货
    };
    // 奖品状态信息
    const { receivedStatus, orderStatus, orderId } = this.props.exchangeRecordInfo;
    const ProductStatusData = { receivedStatus, orderStatus, orderId };
    // 收件人信息
    const { receiver, receivedPhone, receivedProvince, receivedCity, receivedAddress } = this.props.exchangeRecordInfo;
    const AddresseeData = { receiver, receivedPhone, receivedProvince, receivedCity, receivedAddress, orderId };
    // 物流信息
    const { trackingNumber, trackingCompany } = this.props.exchangeRecordInfo;
    const ExpressData = { trackingNumber, trackingCompany, receiver, receivedPhone, receivedProvince, receivedCity, receivedAddress };

    return (
      <div className="exchange-exchange-info-wrp">
        <ProductStatus ProductStatusData={ProductStatusData} />
        {
          status.isShowAddressee ? <Addressee AddresseeData={AddresseeData} /> : null
        }
        {
          status.isShowExpressage ? <Expressage ExpressData={ExpressData} /> : null
        }
        {
          // 不需要设置地址信息，则显示返回按钮
          !status.isShowAddressee ? <a className="btn" href="javascript:void(0);" onClick={() => { this.goBack(); }}>返回</a> : null
        }
      </div>
    );
  }
}
