import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { togglePopGold } from 'stores/market/actionFunc';

import 'assets/scss/market/pop.scss';

@inject((stores) => {
  return {
    isShow: stores.systemStore.popGoldStatus.get('isShowWeixinSubscribe'),
    subscribeScore: stores.systemStore.subscribeScore
  };
}) @observer
class PopWeixinSubscribe extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  render() {
    const classname = classnames({
      'pop-subscribe': true,
      'pop-layer': true,
      'pop-show': this.props.isShow
    });
    const src = require('assets/img/pop/subscribe/qrcode.jpg');
    return (
      <div className={`${classname} pop-wrapper`}>
        <section className="pop-mask" onClick={this.close}></section>
        <div className="pop-subscribe-content ">
          <p className="pop-text1">粉一下“<span className="highlight">迅雷小游戏</span>”</p>
          <p className="pop-text2">免费再领<span className="highlight">{this.props.subscribeScore}</span>欢乐豆赚一把</p>
          <img className="qrcode" src={src} alt="" />
          <p className="pop-text3">迅雷小游戏，能赚钱的小游戏</p>
          <p className="highlight">长按二维码领取</p>
        </div>
      </div>
    );
  }

  close() {
    togglePopGold('isShowWeixinSubscribe', false);
  }
}

export default PopWeixinSubscribe;
