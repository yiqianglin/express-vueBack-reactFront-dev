/**
 * @namespace Container
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { autorun } from 'mobx';
import { setWechatTitle } from 'utils/utilsFunc';
import AutoLoadMore from 'components/common/AutoLoadMore';
import GoldRecordList from 'components/guessGame/GoldRecordList';

import 'assets/scss/market/goldRecord.scss';

@inject('goldRecordStore', 'systemStore')
@observer
export default class GoldRecord extends Component {
  componentDidMount() {
    setWechatTitle('欢乐豆明细');
    this.getHomeData = autorun(() => {
      if (this.props.systemStore.loadSuccess) {
        this.props.goldRecordStore.getBeansList(0);
      }
    });
  }
  getReturnUrl() {
    const params = queryUtil.toQueryParams(location.search);
    const gameSource = params.gameSource ? params.gameSource : 'market';
    if (gameSource === 'guessGame') {
      return '/game-web-updown/game/guess/home.htm';
    } else if (gameSource === 'eggGame') {
      return '/game-web-smashegg/game/egg/gameClassic.htm';
    } else if (gameSource === 'shootGame') {
      return '/game-web-hitme/game/shoot/shootHome.htm';
    } else if (gameSource === 'birdHome') {
      return '/game-web-catchbirds/game/bird/home.htm';
    } else if (gameSource === 'market') {
      return '/game-web-mall/game/market/center.htm';
    }
    return '/game-web-mall/game/market/center.htm';
  }
  render() {
    const { loading, hasMore, isFirstLoading, isEmpty, recordData } = this.props.goldRecordStore;
    const returnUrl = this.getReturnUrl();
    return (
      <div className="record-wrap">
        <p className="record-title">
          <a href={returnUrl} className="link">
            返回游戏
          </a>
          欢乐豆明细记录（近三月）
        </p>
        {recordData.length > 0
          ? <AutoLoadMore
              listClassName="record-list-wrp"
              loading={loading}
              hasMore={hasMore}
              isFirstLoading={isFirstLoading}
              isEmpty={isEmpty}
              onLoadMore={this.props.goldRecordStore.getBeansList.bind(this.props.goldRecordStore)}
            >
              <GoldRecordList />
            </AutoLoadMore>
          : loading
            ? ''
            : <div className="record-none">
                <p className="p1">暂无欢乐豆明细</p>
                <p className="p2">参与疯狂猜涨跌，赚取更多欢乐豆</p>
                <Link to={`${websitePath}/home.htm`} className="btn">
                  去参与
                </Link>
              </div>}
      </div>
    );
  }
}
