/**
 * Created by cc on 2017/4/14.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject((stores) => {
  const props = {
    isShow: stores.systemStore.popStatus.get('isShowQQqunTips'),
    togglePop: stores.systemStore.togglePop.bind(stores.systemStore)
  };
  return props;
}) @observer
export default class QQqunBottomRemark extends Component {
  render() {
    return (
      <div className="bottom-QQqun-remark-con" onClick={() => { this.props.togglePop('isShowQQqunTips', true); }}>
        <p className="bottom-remark remark-top">听说奖品很值钱？</p>
        <p className="bottom-remark remark-bottom">加入官方QQ交流群，了解更多：</p>
        <p className="QQqun">196401270</p>
      </div>
    );
  }
}
