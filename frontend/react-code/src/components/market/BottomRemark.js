/**
 * Created by cc on 2017/4/14.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';

@inject((store) => {
  const props = {
    productList: store.productListStore.productList.toJS(),
    productListStore: store.productListStore
  };
  return props;
}) @observer
export default class BottomRemark extends Component {
  clickHandler(that) {
    const currentScroll = document.getElementById('homepage').scrollTop;
    if (currentScroll > 0) {
      document.getElementById('homepage').scrollTop = currentScroll - (currentScroll / 5);
      window.requestAnimationFrame(() => { that.clickHandler(that); });
    }
  }
  render() {
    const { productList } = this.props;
    const { hotList, commonList, allList } = productList;
    const classname = classnames({
      'homepage-bottom-remark': true,
      fadeIn: !!(!!hotList.length && !!commonList.length)
    });
    return (
      <div className={classname}>
        <div className="is-most-bottom">别拉了，到底了</div>
        <a href="javascript:void(0);" className="to-top-botton" onClick={ () => { this.clickHandler(this); }}>一键冲顶</a>
      </div>
    );
  }
}
