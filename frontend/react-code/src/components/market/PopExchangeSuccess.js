import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { exchangeProduct } from 'stores/market/actionFunc';
import 'assets/scss/market/pop.scss';

// 兑换商品面板
@inject((stores) => {
  const props = {
    productShow: stores.productListStore.productShow,
    orderId: stores.productListStore.orderId,
    isShow: stores.systemStore.popStatus.get('isShowExchangeSuccess'),
    togglePop: stores.systemStore.togglePop.bind(stores.systemStore)
  };
  return props;
}) @observer
export default class PopExchangeSuccess extends Component {
  goCheckAwardHasGot = () => {
    // 关闭弹层以免用户返回
    this.props.togglePop('isShowExchangeSuccess', false);
  }
  render() {
    const { productShow, orderId, isShow, togglePop } = this.props;
    const wrpClassname = classnames({
      'pop-wrapper': true,
      'pop-show': isShow,
    });
    const innerWrpClassname = classnames({
      'pop-common': true,
      'pop-conversion': true,
      'pop-conversion-success-active-code': productShow && productShow.needSend === 0,
      'pop-conversion-success-entity': productShow && productShow.needSend === 1
    });
    const contentClassname = classnames({
      'panel-con': true,
      'panel-con-conversion-success-active-code': productShow && productShow.needSend === 0,
      'panel-con-conversion-success-entity': productShow && productShow.needSend === 1
    });
    return (
      <div className={wrpClassname}>
        <section className="pop-mask"></section>
        <div className={innerWrpClassname} >
          <div className="close-btn" onClick={() => { togglePop('isShowExchangeSuccess', false); }}></div>
          <div className="hd-title"></div>
          <div className="bd-wrp">
            <div className="bd-wrp-inner">
              <div className={contentClassname}>
                <p className="title">恭喜！领奖成功！</p>
                <p className="remark"><span className="product-name">{productShow && productShow.name}</span>已收入囊中</p>
                {
                  productShow && productShow.needSend === 1 ? (
                    <div className="btn-con">
                      <a href="javascript:void(0);" className="btn-long btn-set-addressee" onClick = {() => { togglePop('isShowExchangeSuccess', false); togglePop('isShowSetAddress', true); }}>填写收货信息</a>
                    </div>
                  ) : (
                    <div className="btn-con">
                      <a href="javascript:void(0);" className="btn-short btn-continue" onClick={
                        () => {
                          togglePop('isShowExchangeSuccess', false);
                          exchangeProduct(productShow.productId);
                        }
                      }>继续领奖</a>
                      <Link className="btn-short btn-check-award" to={`${websitePath}/productInfo.htm?orderId=${orderId}`} onClick={this.goCheckAwardHasGot}>查看奖品</Link>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
