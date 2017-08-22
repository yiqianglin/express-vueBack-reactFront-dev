import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject((stores) => {
  const props = {
    loadingProgress: stores.systemStore.loadingProgress
  };
  return props;
}) @observer
class LoadingLayer extends Component {
  render() {
    return (
      <div className="loading-layer">
        <div className="loading-bar">
          <div className="loading-block" style={{ transform: `translateX(${(5.77 * this.props.loadingProgress) / 100}rem)` }}></div>
          <div className="progress-bar" style={{ width: `${this.props.loadingProgress}%` }}></div>
          <p className="progress-text">加载...{this.props.loadingProgress}%</p>
        </div>
      </div>
    );
  }
}

export default LoadingLayer;
