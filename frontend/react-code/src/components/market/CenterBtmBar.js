import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import ReactLink from 'components/common/ReactLink';

import '../../assets/scss/market/components/centerBtmBar.scss';

@inject((stores) => {
  const props = {
    mallLinkUrl: stores.systemStore.playerNumInfo.get('mallLinkUrl'),
    lotteryLinkUrl: stores.systemStore.playerNumInfo.get('lotteryLinkUrl'),
    showToast: stores.systemStore.showToast.bind(stores.systemStore)
  };
  return props;
})
@observer
class CenterBtmBar extends Component {
  render() {
    const { mallLinkUrl, lotteryLinkUrl, showToast } = this.props;
    return (
      <div className="btm-bar">
        <Link className="btm-market" to={mallLinkUrl}>
          <p className="title">领奖柜台</p>
          <p className="btn">
            兑换奖品<span className="icon-gold" />
          </p>
        </Link>
        <a className="btm-lottery" href={lotteryLinkUrl}>
          <p className="btn">点击抽奖</p>
        </a>
        <section
          className="btm-more"
          onClick={() => {
            showToast('游戏券设计中');
          }}
        >
          <p className="intro">敬请期待</p>
          <div className="btn">我的游戏券</div>
        </section>
      </div>
    );
  }
}

export default CenterBtmBar;
