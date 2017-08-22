import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import { exchangeProductConfirmed } from 'stores/market/actionFunc';
import 'assets/scss/market/pop.scss';

// 兑换商品面板
@inject((stores) => {
  const props = {
    productShow: stores.productListStore.productShow,
    isShow: stores.systemStore.popStatus.get('isShowExchangeConfirm'),
    togglePop: stores.systemStore.togglePop.bind(stores.systemStore)
  };
  return props;
}) @observer
export default class PopExchangeConfirm extends Component {
  exchangeProductHandler = () => {
    const { productShow } = this.props;
    exchangeProductConfirmed(productShow.productId, productShow.needScore);
  }
  render() {
    const { productShow, isShow, togglePop } = this.props;
    const classname = classnames({
      'pop-wrapper': true,
      'pop-show': isShow
    });
    return (
      <div className={classname}>
        <section className="pop-mask"></section>
        <div className="pop-common pop-conversion pop-conversion-confirm" >
          <div className="close-btn" onClick={() => { togglePop('isShowExchangeConfirm', false); }}></div>
          <div className="hd-title"></div>
          <div className="bd-wrp">
            <div className="bd-wrp-inner">
              <div className="panel-con panel-con-conversion-confirm">
                <p className="title">领取该奖品</p>
                <p className="remark">将花费<span className="product-value">{productShow && productShow.needScore}</span>欢乐豆抽奖获取</p>
                <div className="btn-con">
                  <a href="javascript:void(0);" className="btn-short btn-cancel" onClick={() => { togglePop('isShowExchangeConfirm', false); }}>取消</a>
                  <a href="javascript:void(0);" className="btn-short btn-sure" onClick={() => { this.exchangeProductHandler(); }}>确认</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
