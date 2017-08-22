import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

import 'assets/scss/market/pop.scss';

@inject((stores) => {
  const props = {
    isShow: stores.systemStore.popStatus.get('isShowQQqunTips'),
    togglePop: stores.systemStore.togglePop.bind(stores.systemStore)
  };
  return props;
}) @observer
class PopQQqunTips extends Component {
  close() {
    this.props.togglePop('isShowQQqunTips', false);
  }

  render() {
    const { isShow } = this.props;
    const classname = classnames({
      'pop-layer': true,
      'pop-QQqun-tips': true,
      'pop-show': isShow
    });
    return (
      <div className={`${classname} pop-wrapper`} >
        <section className="pop-mask" onClick={ () => { this.close(); } }></section>
        <section className="pop-body pop-QQqun-tips-con">
          <p className="remark-top">
            ( ; '⌒` )~微信不支持唤起手机QQ
            <br/>
            —— 请长按复制群号 ——
          </p>
          <p className="QQqun">196401270</p>
          <p className="remark-bottom">
            打开手机QQ，搜索框粘贴群号，即可加群
          </p>
        </section>
      </div>
    );
  }
}

export default PopQQqunTips;
