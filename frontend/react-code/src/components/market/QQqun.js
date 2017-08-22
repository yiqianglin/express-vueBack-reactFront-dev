/**
 * Created by cc on 2017/4/14.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject((stores) => {
  const props = {
    togglePop: stores.systemStore.togglePop.bind(stores.systemStore)
  };
  return props;
}) @observer
export default class QQqun extends Component {
  clickHandler() {
    const isInWeixin = (/MicroMessenger/i).test(window.navigator.userAgent.toLowerCase());
    if (isInWeixin) {
      this.props.togglePop('isShowQQqunTips', true);
    } else {
      window.location.href = 'mqqapi://card/show_pslcard?src_type=internal&version=1&uin=196401270&card_type=group&source=qrcode';
    }
  }
  render() {
    return (
      <div className="QQqun-wrapper" onClick={ () => { this.clickHandler(); } }>
        <div className="QQqun-panel">
          <p className="QQqun-remark QQqun-remark-top">欢乐豆兑奖有疑问？加入官方交流群，听小伙伴分享经验</p>
          <p className="QQqun-remark QQqun-remark-bottom">点击进入：</p>
          <p className="QQqun ab">196401270</p>
        </div>
      </div>
    );
  }
}
