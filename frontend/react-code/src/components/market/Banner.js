/**
 * Created by cc on 2017/4/14.
 */
import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import { inject, observer } from 'mobx-react';

@inject((store) => {
  const props = {
    bannerList: store.systemStore.bannerList
  };
  return props;
}) @observer
export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexShow: 0
    };
  }
  componentDidMount() {
  }
  render() {
    const { bannerList } = this.props;
    const { indexShow } = this.state;
    return (
      <div className="banner-wrapper" name="banner-wrapper">
        <div className="inner-wrapper">
          <Carousel
            className="my-carousel" autoplay={true} infinite={bannerList.length > 1}
            beforeChange={(from, to) => {}}
            afterChange={(index) => { return this.setState({ indexShow: index }); }}
            dots={false}
            selectedIndex={indexShow}
          >
            {bannerList.map((elem, index) => {
              return (
                <a href={elem.url ? elem.url : 'javascript:void(0);'} key={index} className="banner-link">
                  <img
                    src={elem.image}
                    className="banner-img"
                    onLoad={() => {
                      window.dispatchEvent(new Event('resize'));
                      this.setState({
                        initialHeight: null
                      });
                    }}
                  />
                </a>
              );
            })}
          </Carousel>


        </div>
        <div className="page-index-con">
          {
            bannerList.map((item, index) => {
              return (
                ((index) === indexShow) ? <span key={index} className="dec on"></span> : <span key={index} className="dec off"></span>
              );
            })
          }
        </div>
      </div>
    );
  }
}
