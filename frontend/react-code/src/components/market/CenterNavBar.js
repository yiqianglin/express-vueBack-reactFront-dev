import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

import '../../assets/scss/market/components/centerNavBar.scss';

@inject((stores) => {
  const props = {
    userInfo: stores.userStore.userInfo,
    showPopRecharge: stores.rechargeStore.showPopRecharge.bind(stores.rechargeStore),
    showToast: stores.systemStore.showToast.bind(stores.systemStore)
  };
  return props;
})
@observer
class CenterNavBar extends Component {
  render() {
    const { userInfo, showToast, showPopRecharge } = this.props;
    const defaultUserPic = require('../../assets/img/market/home/icon-nav-user-default.jpg');
    return (
      <div className="nav-bar">
        <section className="nav-left">
          <div className="img-box">
            <img
              src={userInfo && userInfo.portraitUri ? userInfo.portraitUri : defaultUserPic}
              alt={userInfo && userInfo.weixinName ? userInfo.weixinName : ''}
            />
          </div>
          <p className="user-name">
            {userInfo && userInfo.weixinName ? userInfo.weixinName : ''}
          </p>
        </section>
        <section className="nav-right">
          <div
            className="gold-num"
            onClick={() => {
              showPopRecharge();
            }}
          >
            {!(userInfo && userInfo.score)
              ? ''
              : userInfo.score > 9999999
                ? '9999999+'
                : userInfo.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            <span className="icon-gold" />
            <span className="icon-plus" />
          </div>
          {/*
              <a className="icon-rank" href="/game-web-activity/game/activity/m_top10GameChart.htm"></a>
               */}
        </section>
      </div>
    );
  }
}

export default CenterNavBar;
