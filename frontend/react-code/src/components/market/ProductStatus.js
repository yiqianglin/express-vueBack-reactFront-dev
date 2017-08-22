/**
 * Created by Administrator on 2017/4/23 0023.
 */
/**
 * Created by cc on 2017/4/14.
 */
import React, { Component } from 'react';
import { mapOrderStatus, mapSkinOrderStatus } from 'stores/market/actionFunc';

export default class ProductStatus extends Component {
  statusGenerator(receivedStatus, orderStatus, couponType) { // 状态生成器，receivedStatus确定是否为实物或者激活码，orderStatus确定激活码是否已经发放
    // 状态生成器，receivedStatus确定是否为实物或者激活码，orderStatus确定激活码是否已经发放
    // 皮肤类型
    if (couponType === 'skin') {
      return mapSkinOrderStatus(receivedStatus);
    }
    // receivedStatus !== 0，即实物，直接map映射
    if (receivedStatus !== 0) {
      return mapOrderStatus(receivedStatus);
    }
    // 当receivedStatus===0，即非实物
    if (orderStatus === 1) {
      return '已发放';
    }
    return '等待发放';
  }

  render() {
    const { ProductStatusData: renderData } = this.props;
    return (
      <div className="status-wrapper">
        <ul>
          <li>
            <span className="label">奖品状态</span><span className="details">{this.statusGenerator(renderData.receivedStatus, renderData.orderStatus, renderData.couponType)}</span>
          </li>
          <li>
            <span className="label">订单编号</span><span className="details">{renderData.orderId}</span>
          </li>
        </ul>
      </div>
    );
  }
}
