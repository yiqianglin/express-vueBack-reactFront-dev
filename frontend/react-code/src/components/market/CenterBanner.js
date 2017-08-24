import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import { inject, observer } from 'mobx-react';

import '../../assets/scss/market/components/centerBanner.scss';

@inject((stores) => {
  const props = {
    banner: stores.systemStore.banner
  };
  return props;
}) @observer
class CenterBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexShow: 0
    };
  }
  render() {
    const { banner } = this.props;
    const { indexShow } = this.state;
    return (
      <div className="banner-part" >
        <section className="banner">
          <div className="inner-wrapper">
            <Carousel
              className="my-carousel" autoplay={true} infinite={banner.length > 1}
              beforeChange={(from, to) => {}}
              afterChange={(index) => { return this.setState({ indexShow: index }); }}
              dots={false}
              selectedIndex={indexShow}
            >
              {banner.map((elem, index) => {
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
              banner.map((item, index) => {
                return (
                  ((index) === indexShow) ? <span key={index} className="dec on"></span> : <span key={index} className="dec off"></span>
                );
              })
            }
          </div>
        </section>
        <section className="banner-lates"></section>
      </div>
    );
  }
}

export default CenterBanner;
