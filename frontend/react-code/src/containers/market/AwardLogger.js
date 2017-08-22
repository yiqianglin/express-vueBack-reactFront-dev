/**
 * Created by Administrator on 2017/4/23 0023.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import { when } from 'mobx';
import { inject, observer } from 'mobx-react';
import { setAwardLoggerPageIndex, getMoreAwardLogger, mapOrderStatus, mapSkinOrderStatus, cleanExchangeRecordData } from 'stores/market/actionFunc';
import { formatMoney, formatDate } from 'utils/utilsFunc';
import { ListView } from 'antd-mobile';
import { BrowserRouter as Router, Route, Link } from 'react-router';
import QQqunBottomRemark from 'components/market/QQqunBottomRemark';

import 'assets/scss/market/awardLogger.scss';

@inject((store) => {
  const props = {
    systemStore: store.systemStore,
    userStore: store.userStore,
    pageIndex: store.userStore.exchangeRecord.toJS().pageIndex,
    pageSize: store.userStore.exchangeRecord.toJS().pageSize
  };
  return props;
})
@observer
export default class AwardLogger extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => {
        return row1 !== row2;
      }
    });
    this.state = {
      dataSource: dataSource.cloneWithRows({}),
      isLoading: true, // 正在加载
      isLastPage: false, // 所有数据展现
      beforeFirstLoad: true, // 在第一次加载前
      isEmpty: false // 加载后，列表为空
    };
  }
  fetchData() {
    getMoreAwardLogger(1).then((data) => {
      const {
        exchangeRecordListCache
      } = this.props.userStore.exchangeRecord.toJS();
      const dataBlob = exchangeRecordListCache.toJS();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataBlob),
        isLoading: false,
        isLastPage: !!(dataBlob.length === 0 ||
          dataBlob.length < this.props.pageSize),
        isEmpty: dataBlob.length === 0,
        beforeFirstLoad: false
      });
    });
  }

  componentDidMount() {
    when(
      () => {
        return this.props.systemStore.loadSuccess;
      },
      () => {
        this.fetchData();
      }
    );
  }

  onEndReached = (event) => {
    // 到底部加载跟多
    if (this.state.beforeFirstLoad) {
      this.setState({ beforeFirstLoad: false });
      return;
    }
    const { pageIndex } = this.props;
    if (this.state.isLastPage) {
      return;
    }
    if (this.state.isLoading) {
      return;
    }
    (async function (that) {
      if (that.state.isLastPage) {
        return;
      }
      const list = await getMoreAwardLogger(that.props.pageIndex + 1);
      const {
        exchangeRecordListCache,
        pageSize
      } = that.props.userStore.exchangeRecord.toJS();
      const dataBlob = exchangeRecordListCache.toJS();
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(dataBlob),
        isLoading: false,
        isLastPage: !!(list.length === 0 || list.length < pageSize)
      });
    }(this));
  };

  anotherDate(dateStr) {
    // 日期格式化
    const newTime = new Date(
      dateStr.replace(/(\d{4})-(\d{2})-(\d{2}).*/g, '$1/$2/$3')
    );
    const datetext = `${newTime.getFullYear()}年${newTime.getMonth() + 1}月${newTime.getDate()}日`;
    return datetext;
  }

  componentWillUnmount() {
    // 销毁前清除缓存数据
    cleanExchangeRecordData();
  }

  statusGenerator(receivedStatus, orderStatus, couponType) {
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
    const { isLoading, isLastPage, beforeFirstLoad, isEmpty } = this.state;
    const { pageSize } = this.props.userStore.exchangeRecord.toJS();
    const row = (obj) => {
      const statusClassName = classnames({
        'logger-status': true,
        highlight: (obj.orderStatus === 0 && (obj.receivedStatus === 0 || obj.receivedStatus === 1 || obj.receivedStatus === 10)) || (obj.orderStatus === 1 && (obj.receivedStatus === 1 || obj.receivedStatus === 10))
      });
      return (
        <li key={obj.orderId}>
          <Link to={`${websitePath}/productInfo.htm?orderId=${obj.orderId}`}>
            <div className="logger-left">
              <img src={obj.productPicUrl} alt="" className="product-pic" />
            </div>
            <div className="logger-middle-left">
              <span className="product-name">{obj.productName}</span>
              <span className="product-got-date">
                {obj.exchangeTime}
              </span>
            </div>
            <div className="logger-middle-right">
              <span className={statusClassName}>
                {this.statusGenerator(obj.receivedStatus, obj.orderStatus, obj.couponType)}
              </span>
              {
                obj.createSource === 1
                ? <span className="got-way">
                    消耗
                    <span className="product-value">
                      {formatMoney(obj.spendScore, 0)}
                    </span>
                    欢乐豆
                  </span>
                : obj.createSource === 2
                    ? <span className="got-way">抽奖获得</span>
                    : obj.createSource === 3
                        ? <span className="got-way">首充赠送</span>
                        : obj.createSource === 4
                            ? <span className="got-way">充值赠送</span>
                            : null
              }
            </div>
            <div className="logger-right"><span className="arrow-right" /></div>
          </Link>
        </li>
      );
    };

    return (
      <div className="award-logger-wrapper">
        <div className="top clearfix">
          <div className="left">
            <span className="icon" />
          </div>
          <div className="right">
            <span className="title" />
          </div>
        </div>

        <div className="award-logger">
          {isEmpty
            ? <IsEmpty />
            : <div className="award-logger-con">
                <ListView
                  ref="lv"
                  dataSource={this.state.dataSource}
                  renderRow={row}
                  renderFooter={() => {
                    return (
                      <div style={{ textAlign: 'center' }}>
                        {isLoading
                          ? '加载中...'
                          : isLastPage ? '已经是最后一页了' : '下拉继续加载'}
                      </div>
                    );
                  }}
                  pageSize={pageSize}
                  scrollEventThrottle={10}
                  onScroll={() => {}}
                  onEndReached={this.onEndReached}
                  onEndReachedThreshold={10}
                >
                  {isLastPage ? <LastPageBottomRemark /> : null}
                  {isLastPage ? <QQqunBottomRemark /> : null}
                </ListView>

              </div>}
        </div>
      </div>
    );
  }
}

class LastPageBottomRemark extends Component {
  render() {
    return (
      <div>
        <a
          className="award-logger-to-game-button"
          href={`/game-web-updown/game/guess/home.htm?_userStatus=${_userStatus}`}
        >
          继续赚豆兑大奖~
        </a>
      </div>
    );
  }
}

class IsEmpty extends Component {
  render() {
    return (
      <div className="isEmpty-wrapper">
        <p className="title">暂无领奖记录</p>
        <p className="remark">玩游戏赚欢乐豆，换了抽大奖</p>
        <a href={'/game-web-updown/game/guess/home.htm'} className="goGame">
          去参与
        </a>
      </div>
    );
  }
}
