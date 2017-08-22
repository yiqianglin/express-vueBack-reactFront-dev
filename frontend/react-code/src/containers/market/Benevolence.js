/**
 * Created by Administrator on 2017/4/23 0023.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import 'assets/scss/market/Benevolence.scss';

@inject('userStore') @observer
export default class Benevolence extends Component {
  render() {
    const { userInfo } = this.props.userStore;
    return (
      <div className="benevolence-wrapper">
        <div className="top">
          <div className="clearfix">
            <div className="left">
              <span className="title">我的欢乐值</span>
              <span className="benevolence-left">{ userInfo.totalRechargeAmount ? userInfo.totalRechargeAmount : '0' }</span>
            </div>
            <div className="right">
              <span className="icon"></span>
            </div>
          </div>
        </div>

        <div className="remark">
          <span className="remark-icon"></span>
          <p className="remark-art">
            1元充值钻石后，自动兑换为印花道具增加一个欢乐值同时免费获赠1000欢乐豆。
          </p>
        </div>

        <div className="property-wrapper">
          <div className="title">欢乐值道具</div>
          <ul className="property-list">
            <li>
              <div className="icon-con">
                <span className="icon icon-01"></span>
              </div>
              <span className="name">签到翻倍</span>
              <span className="status">即将开放></span>
              <div className="benevolence-con">
                <span className="value">10</span>
                <span className="icon"></span>
              </div>
            </li>

            <li>
              <div className="icon-con">
                <span className="icon icon-02"></span>
              </div>
              <span className="name">猜错返还</span>
              <span className="status">即将开放></span>
              <div className="benevolence-con">
                <span className="value">10</span>
                <span className="icon"></span>
              </div>
            </li>

          </ul>
        </div>
      </div>
    );
  }
}
