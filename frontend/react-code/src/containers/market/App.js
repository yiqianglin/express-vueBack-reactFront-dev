import React, { Component } from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import PopToast from 'components/common/PopToast';
import PopQQqunTips from 'components/market/PopQQqunTips';
import PopSign from 'components/common/PopSign';
import PopSignSucc from 'components/common/PopSignSucc';

import 'assets/scss/market/app.scss';

@inject('systemStore', 'userStore')
@observer
export default class App extends Component {
  componentDidMount() {
    this.props.systemStore.getServerTime();
    this.getGlobalData = autorun(() => {
      if (this.props.systemStore.loadSuccess) {
        console.log('');
      }
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        {this.props.children}
        <PopQQqunTips />
        <PopToast />
      </div>
    );
  }
}
