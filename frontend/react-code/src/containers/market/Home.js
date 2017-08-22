/**
 * Created by cc on 2017/4/14.
 */
import React, { Component } from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import { setAddresseeShow } from 'stores/market/actionFunc';
import { setWechatTitle } from 'utils/utilsFunc';
import async from 'async';
import Banner from 'components/market/Banner';
import Nav from 'components/market/Nav';
import Marquee from 'components/market/HomeMarquee';
import ProductPanel from 'components/market/ProductPanel';
import FixedToGameButton from 'components/market/FixedToGameButton';
import QQqun from 'components/market/QQqun';
import BottomRemark from 'components/market/BottomRemark';

import 'assets/scss/market/home.scss';
import 'assets/scss/market/pop.scss';

@inject('systemStore', 'productListStore', 'userStore') @observer
export default class Home extends Component {
  componentDidMount() {
    setWechatTitle('领奖台');
    const { systemStore, productListStore, userStore } = this.props;
    this.getHomeData = autorun(() => {
      if (systemStore.loadSuccess) {
        // 热门奖品和更多商品加载后，根据路由进行锚点定位
        async.parallel(
          {
            getProductList: async function getProductList(done) {
              await productListStore.getProductList(1);
              done(null, null);
            },
            productListStore: async function getProductList(done) {
              await productListStore.getProductList(0);
              done(null, null);
            }
          },
          (error, result) => {
            if (new RegExp('productHot').test(this.props.location.hash)) {
              console.log('回到热点');
            } else if (new RegExp('productMore').test(this.props.location.hash)) {
              console.log('回到热点');
            }
          }
        );
        systemStore.getBannerList();
      }
    });
  }
  // 关闭个人中心弹窗
  cancelUserCenterHandler = (event) => {
    if (this.props.userStore.isLogin) {
      this.refs.nav.wrappedInstance.userCenterHandler(false, event);
    }
  }

  render() {
    return (
      <div className="homepage" id="homepage" onClick={ (event) => { this.cancelUserCenterHandler(event); } }>
        <Banner />
        {
          this.props.userStore.isLogin ? <Nav ref="nav"/> : ''
        }
        <QQqun />
        <Marquee />
        <ProductPanel ref="ProductPanel"/>
        <FixedToGameButton />
        <BottomRemark />
      </div>
    );
  }
}

