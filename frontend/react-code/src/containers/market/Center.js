import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { autorun, reaction } from 'mobx';
import { setWechatTitle } from 'utils/utilsFunc';
import CenterNavBar from 'components/market/CenterNavBar';
import CenterBanner from 'components/market/CenterBanner';
import CenterGameArea from 'components/market/CenterGameArea';
import CenterBtmBar from 'components/market/CenterBtmBar';
import LoadingLayer from 'components/market/LoadingLayer';
import PopSign from 'components/common/PopSign';
import PopSignSucc from 'components/common/PopSignSucc';
import PopFirstLogin from 'components/market/PopFirstLogin';

import 'assets/scss/market/center.scss';

@inject((stores) => {
  const props = {
    systemStore: stores.systemStore,
    userStore: stores.userStore
  };
  return props;
})
@observer
export default class Center extends Component {
  componentDidMount() {
    setWechatTitle('游戏厅');
    const { systemStore, userStore } = this.props;
    this.getHomeData = autorun(() => {
      if (systemStore.loadSuccess) {
        systemStore.loadIndex();
      }
    });
    if (_userStatus === '1') {
      systemStore.togglePop('isShowFirstLogin', true);
      systemStore.startAnimateBeans();
    }
  }
  render() {
    let content = <LoadingLayer />;
    if (this.props.systemStore.isLoadingComplete) {
      content = (
        <div className="center-wrap">
          {
            this.props.userStore.isLogin ? <CenterNavBar /> : ''
          }
          <CenterBanner />
          <CenterGameArea />
          <CenterBtmBar />
          <PopSign />
          <PopSignSucc />
          <PopFirstLogin />
        </div>
      );
    }
    return content;
  }
}
