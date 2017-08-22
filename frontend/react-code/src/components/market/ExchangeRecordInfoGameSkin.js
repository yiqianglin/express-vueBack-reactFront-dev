/**
 * Created by cc on 2017/7/10.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Picker } from 'antd-mobile';
import { browserHistory } from 'react-router';
import ProductStatus from 'components/market/ProductStatus';


@inject((stores) => {
  const props = {
    exchangeRecordInfo: stores.userStore.exchangeRecordInfo,
    skinServerList: stores.systemStore.skinServerList,
    showToast: stores.systemStore.showToast.bind(stores.systemStore)
  };
  return props;
}) @observer
export default class ExchangeRecordInfoGameSkin extends Component {
  constructor(props) {
    super(props);
    this.constData = {
      serverType: [],
      skinType: []
    };
  }

  componentWillMount() {
    if (this.props.exchangeRecordInfo.skinList) {
      // 根据后台返回的皮肤可选择项，重新组合成picker类型
      const temp = [];
      this.props.exchangeRecordInfo.skinList.forEach((elem, index, arr) => {
        temp.push({
          value: elem.skinId,
          type: elem.type,
          label: elem.skinInfo,
          mark: elem.mark
        });
      });
      this.constData.skinType = temp;
    }

    if (this.props.skinServerList) {
      // 根据后台返回游戏区服，重新组合成picker类型
      const temp = [];
      this.props.skinServerList.forEach((elem, index, arr) => {
        temp.push({
          value: elem.id,
          label: elem.serverName,
          stuatus: elem.status
        });
      });
      this.constData.serverType = temp;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.exchangeRecordInfo.skinList) {
      // 根据后台返回的皮肤可选择项，重新组合成picker类型
      const temp = [];
      this.props.exchangeRecordInfo.skinList.forEach((elem, index, arr) => {
        temp.push({
          value: elem.skinId,
          type: elem.type,
          label: elem.skinInfo,
          mark: elem.mark
        });
      });
      this.constData.skinType = temp;
    }

    if (nextProps.skinServerList) {
      // 根据后台返回游戏区服，重新组合成picker类型
      const temp = [];
      this.props.skinServerList.forEach((elem, index, arr) => {
        temp.push({
          value: elem.id,
          label: elem.serverName,
          stuatus: elem.status
        });
      });
      this.constData.serverType = temp;
    }
  }

  render() {
    // 是否有选择最终皮肤信息
    const { selectSkinInfo } = this.props.exchangeRecordInfo;
    // 后台返回的skinType，重新组合成picker类型
    return (
      <div className="exchange-game-skin-info-wrp">
        {
          // 没有最终选择皮肤信息，则视为还没填写
          selectSkinInfo ?
            <GameAccountShower constData = { this.constData } />
            :
            (this.constData.serverType.length && this.constData.skinType.length) ?
            <GameAccountEditor constData = { this.constData } />
              :
              null
        }
      </div>
    );
  }
}


const SkinPickerChildren = (props) => {
  return (
    <div className="selection-inner" onClick={props.onClick}>
      <div type="text" className="real-selection">{props.extra}</div>
    </div>
  );
};
class SkinPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }
  onPickerChange = (val) => {
    console.log('onPickerChange', val);
    this.setState({ value: val });
    this.props.onChange('skinId', val[0]);
  }
  componentWillMount() {
    this.props.onChange('skinId', this.state.value[0]);
  }
  render() {
    return (
      <Picker data={ this.props.constData.skinType } onChange = { this.onPickerChange } value={this.state.value} cols={1}>
        <SkinPickerChildren />
      </Picker>
    );
  }
}

const ServerTypePickerChildren = (props) => {
  return (
    <div className="selection-inner" onClick={props.onClick}>
      <div type="text" className="real-selection">{props.extra}</div>
    </div>
  );
};
class ServerTypePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [this.props.defaultValue]
    };
  }
  onPickerChange = (val) => {
    this.setState({ value: val });
    this.props.onChange('serverType', val[0]);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: [nextProps.defaultValue] });
  }

  render() {
    return (
      <Picker data={ this.props.constData.serverType } onChange = { this.onPickerChange } value={this.state.value} cols={1} format = {this.format}>
        <ServerTypePickerChildren />
      </Picker>
    );
  }
}

@inject((stores) => {
  const props = {
    showToast: stores.systemStore.showToast.bind(stores.systemStore),
    exchangeRecordInfo: stores.userStore.exchangeRecordInfo,
    completeWzryOrder: stores.userStore.completeWzryOrder.bind(stores.userStore),
    getUserInfoWZRY: stores.userStore.getUserInfoWZRY.bind(stores.userStore),
    userInfoWZRY: stores.userStore.userInfoWZRY
  };
  return props;
}) @observer
class GameAccountEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: props.exchangeRecordInfo.orderId,
      serverType: null,
      roleName: '',
      skinId: null,
      qq: '',
      weixin: ''
    };
  }

  componentWillMount() {
    this.props.getUserInfoWZRY().then(() => {
      const { serverType, roleName, qq, weixin } = this.props.userInfoWZRY;
      this.setState({ serverType, roleName, qq, weixin });
    });
  }

  handleChange = (target, value) => {
    this.setState({ [target]: value });
  }

  saveGameInfo = () => {
    if (!this.state.serverType) {
      this.props.showToast('请选择区服类型');
      return;
    }
    if ((this.state.serverType === 2 || this.state.serverType === 4) && !/^[0-9]+$/.test(this.state.qq)) {
      this.props.showToast('请输入正确的QQ号码');
      return;
    }
    if ((this.state.serverType === 1 || this.state.serverType === 3) && !this.state.weixin) {
      this.props.showToast('请输入微信号');
      return;
    }
    if (!this.state.roleName) {
      this.props.showToast('请输入游戏角色名称');
      return;
    }
    if (!this.state.skinId) {
      this.props.showToast('请选择皮肤');
      return;
    }

    const userInputParams = {
      serverType: this.state.serverType,
      roleName: this.state.roleName,
      skinId: this.state.skinId
    };
    if (this.state.serverType === 2 || this.state.serverType === 4) {
      userInputParams.qq = this.state.qq;
    } else {
      userInputParams.weixin = this.state.weixin;
    }
    this.props.completeWzryOrder(this.state.orderId, userInputParams);
  }

  render() {
    const { receivedStatus, orderStatus, orderId, couponType } = this.props.exchangeRecordInfo;
    const ProductStatusData = { receivedStatus, orderStatus, orderId, couponType };
    const { serverType, roleName, skinId, qq, weixin } = this.state;
    return (
      <div className="game-account-editor">
        <ProductStatus ProductStatusData = { ProductStatusData } />

        <form action="">
          <div className="input-con server-type-wrp common-picker">
            <label htmlFor="server-type">区服类型</label>
{/*            // 单选radio类型
            <ul className="server-type-selection">
              <li><span className="selection selection-01"></span><span className="selection-name">IOS 微信</span></li>
              <li><span className="selection selection-02"></span><span className="selection-name">IOS QQ</span></li>
              <li><span className="selection selection-03"></span><span className="selection-name">Android 微信</span></li>
              <li><span className="selection selection-04"></span><span className="selection-name">Android QQ</span></li>
            </ul>
*/}
            <ServerTypePicker onChange={this.handleChange} defaultValue={this.state.serverType} constData = {this.props.constData} />
          </div>
          {
            serverType === 2 || serverType === 4 ? (
              <div className="input-con">
                <label htmlFor="qq">QQ号码</label>
                <input type="text" className="text-input" id="qq" placeholder="请填写用于游戏的QQ号（不是昵称）"
                       value={ qq } maxLength="14" onChange={(event) => { this.handleChange('qq', event.target.value); }}
                />
              </div>
            ) : null
          }
          {
            serverType === 1 || serverType === 3 ? (
              <div className="input-con">
                <label htmlFor="weixin">微信号</label>
                <input type="text" className="text-input" id="qq" placeholder="请填写用于游戏的微信号（不是昵称）"
                       value={ weixin } maxLength="20" onChange={(event) => { this.handleChange('weixin', event.target.value); }}
                />
              </div>
            ) : null
          }
          <div className="input-con">
            <label htmlFor="roleName">游戏角色</label>
            <input type="text" className="text-input" id="roleName" placeholder="请填写游戏角色名称，并确认无误"
                   value={ roleName } maxLength="20" onChange={(event) => { this.handleChange('roleName', event.target.value); }}
            />
          </div>
          <div className="input-con common-picker">
            <label htmlFor="weixin">选择皮肤</label>
            <SkinPicker onChange={this.handleChange} constData = {this.props.constData}/>
          </div>
        </form>

        <a href="javascript:void(0);" className="save-info-btn" onClick={ this.saveGameInfo }>保存账号信息</a>
      </div>
    );
  }
}


@inject((stores) => {
  const props = {
    exchangeRecordInfo: stores.userStore.exchangeRecordInfo,
  };
  return props;
}) @observer
class GameAccountShower extends Component {

  serverTypeMap = (serverType) => {
    let serverLabel = null;
    this.props.constData.serverType.forEach((value, index, arr) => {
      if (value.value === serverType) {
        serverLabel = value.label;
      }
    });
    return serverLabel;
  }

  goBack() {
    if (window.history && window.history.length > 1) {
      browserHistory.goBack();
    } else {
      browserHistory.replace('game-web-mall/game/market/creditMarket.htm');
    }
  }

  render() {
    const { receivedStatus, orderStatus, orderId } = this.props.exchangeRecordInfo;
    const ProductStatusData = { receivedStatus, orderStatus, orderId };

    const { qq, weixin, serverType, roleName, selectSkinInfo } = this.props.exchangeRecordInfo;
    return (
      <div className="game-account-shower">
        {
          (serverType === 2 || serverType === 4) ? <div className="skin-tips-qq">
            <div className="tips-inner">
{/*              由于皮肤赠予需双方互加好友 <br/>
              因此后续皮肤发放流程将通过QQ沟通完成 <br/>
              建议主动添加官方客服QQ为好友，号码：<span className="qq-palceHolder"> </span>*/}
              王者皮肤赠予需双方互为好友 <br/>
              请添加官方客服QQ为好友，号码：<span className="qq-palceHolder"> </span> <br/>
              客服小姐姐每天定时处理申请与赠予，请您耐心等待
            </div>
            <p className="tip-acc qq">2091074781</p>
          </div> :
          <div className="skin-tips-wechat">
            <div className="tips-inner">
{/*              由于皮肤赠予需双方互加好友 <br/>
              因此后续皮肤发放流程将通过微信沟通完成 <br/>
              建议主动添加官方客服微信为好友，微信号：<span className="weixin-palceHolder"> </span>*/}
              皮肤赠予需双方互为好友 <br/>
              请添加官方客服微信为好友，微信号：<span className="weixin-palceHolder"> </span> <br/>
              客服小姐姐每天定时处理申请与赠予，请您耐心等待
            </div>
            <p className="tip-acc weixin">xlgamegift</p>
          </div>
        }

        <ul className="game-account-details">
          <li>
            <span className="label">区服类型</span><span className="details">{this.serverTypeMap(serverType)}</span>
          </li>
          {
            (serverType === 2 || serverType === 4) ? (
              <li>
                <span className="label">QQ号码</span><span className="details">{ qq }</span>
              </li>
            ) : (
              <li>
                <span className="label">微信号</span><span className="details">{ weixin }</span>
              </li>
            )
          }
          <li>
            <span className="label">游戏角色</span><span className="details">{ roleName }</span>
          </li>
          <li>
            <span className="label">选择皮肤</span><span className="details">{ selectSkinInfo }</span>
          </li>
        </ul>

        <ProductStatus ProductStatusData={ProductStatusData} />
        <a href="javascript:void(0);" className="btn return-btn" onClick={() => { this.goBack(); }}>返回</a>
      </div>
    );
  }
}
