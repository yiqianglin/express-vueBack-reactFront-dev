/**
 * Created by cc on 2017/4/14.
 */
/**
 * Created by cc on 2017/4/14.
 */
import React, { Component } from 'react';
import { when } from 'mobx';
import { Carousel } from 'antd-mobile';
import { inject, observer } from 'mobx-react';

@inject((stores) => {
  const props = {
    marqueeStatus: stores.systemStore.marqueeStatus,
    systemStore: stores.systemStore,
    getMarqueeData: stores.systemStore.getMarqueeData.bind(stores.systemStore)
  };
  return props;
}) @observer
export default class HomeMarquee extends Component {
  componentDidMount() {
    when(() => { return this.props.systemStore.loadSuccess; }, () => { this.props.getMarqueeData(); });
  }

  render() {
    const renderData = this.props.marqueeStatus.get('data');
    return (
      <div className="marquee-wrapper">
        <div className="left">
          <span className="icon-trumpet"></span>
          <span className="title">中奖播报</span>
        </div>

        <Carousel className="right award-list" speed={700} autoplayInterval={3000} dots={false} swiping={false} autoplay={true} infinite vertical>
          {
            renderData.map((elem, index) => {
              return (
                <div className="award" key={elem.orderId}>
                  <span className="l_1 mgr">恭喜</span>
                  <span className="l_2 mgr">{elem.weixinName ? elem.weixinName : `微信用户${elem.userId}` }</span>
                  <span className="l_3">抽中</span><span className="hasGot">{elem.productName}</span>
                </div>
              );
            })
          }
        </Carousel>
      </div>
    );
  }
}
