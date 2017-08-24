/**
 * Created by Administrator on 2017/4/15.
 */

import React, { Component } from 'react';
import { when } from 'mobx';
import { inject, observer } from 'mobx-react';
import { exchangeProduct, getExchangeRecordInfo } from 'stores/market/actionFunc';
import { getUrlParameter } from 'utils/utilsFunc';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import ProductDetailsTop from 'components/market/ProductDetailsTop';
import ExchangeRecordInfoActiveCodeCommon from 'components/market/ExchangeRecordInfoActiveCodeCommon';
import ExchangeRecordInfoEntity from 'components/market/ExchangeRecordInfoEntity';
import ExchangeRecordInfoGameSkin from 'components/market/ExchangeRecordInfoGameSkin';
import QQqunBottomRemark from 'components/market/QQqunBottomRemark';

import 'assets/scss/market/productInfo.scss';

@inject((store) => {
  const props = {
    userStore: store.userStore,
    systemStore: store.systemStore
  };
  return props;
})
@observer
export default class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    };
  }
  componentWillMount() {
    const { userStore } = this.props;
    const productId = getUrlParameter().orderId;
    when(
      () => { return this.props.systemStore.loadSuccess; },
      () => {
        getExchangeRecordInfo(productId).then(() => {
          this.setState({
            isShow: true
          });
        });
      }
    );
  }

  goBack() {
    if (window.history && window.history.length > 1) {
      browserHistory.goBack();
    } else {
      browserHistory.replace('game-web-mall/game/market/creditMarket.htm');
    }
  }
  render() {
    const { exchangeRecordInfo } = this.props.userStore;
    const { skinServerList } = this.props.systemStore;
    const productInfoClass = classnames({
      'product-info-wrapper': true,
      fadeIn: !!this.state.isShow
    });
    const status = {
      isShowActiveCode: !!(exchangeRecordInfo && exchangeRecordInfo.receivedStatus === 0 && exchangeRecordInfo.skinFlg !== 1), // 非实物且非皮肤类型（激活码类型）
      isShowEntity: !!(exchangeRecordInfo && exchangeRecordInfo.receivedStatus !== 0 && exchangeRecordInfo.skinFlg !== 1), // 实物类型
      isShowSkin: !!(exchangeRecordInfo && exchangeRecordInfo.skinFlg === 1 && skinServerList) // 皮肤类型
    };

    // 商品详情头部数据
    let productDetailsTopData = {};

    if (exchangeRecordInfo) {
      const {
        productId,
        productName: name,
        productPicUrl: picUrl,
        spendScore,
        createSource,
      } = exchangeRecordInfo;
      productDetailsTopData = { productId, name, picUrl, spendScore, createSource };
    }

    return (
      <div className={productInfoClass}>
        <div className="top-wrapper">
          {/* 顶部商品详情介绍 */}
          <ProductDetailsTop productDetailsTopData={productDetailsTopData} />

          {/* 激活码 */}
          {status.isShowActiveCode
            ? <ExchangeRecordInfoActiveCodeCommon/>
            : null}

          {/* 实物 */}
          {status.isShowEntity
            ? <ExchangeRecordInfoEntity/>
            : null}

          {/* 王者荣耀皮肤 */}
          {status.isShowSkin
            ? <ExchangeRecordInfoGameSkin/>
            : null}
        </div>
        <QQqunBottomRemark />
      </div>
    );
  }
}
