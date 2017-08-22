import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import { Picker, List } from 'antd-mobile';
import district from 'utils/cityCodeData';
import { setAddressee } from 'stores/market/actionFunc';
import 'assets/scss/market/pop.scss';

@inject((stores) => {
  const props = {
    productShow: stores.productListStore.productShow,
    isShow: stores.systemStore.popStatus.get('isShowSetAddress'),
    togglePop: stores.systemStore.togglePop.bind(stores.systemStore),
    showToast: stores.systemStore.showToast.bind(stores.systemStore)
  };
  return props;
}) @observer
export default class PopSetAddressConfirm extends Component {
  render() {
    const { productShow, isShow, togglePop } = this.props;
    const classname = classnames({
      'pop-wrapper': true,
      'pop-set-addressee-confirm': true,
      'pop-show': isShow
    });
    return (
      <div className={classname}>
        <section className="pop-mask"></section>
        <div className="pop-common pop-conversion pop-conversion-confirm" >
          <div className="close-btn" onClick={() => { togglePop('isShowSetAddress', false); }}></div>
          <div className="hd-title"></div>
          <div className="bd-wrp">
            <div className="bd-wrp-inner">
              <SetAddresseeConfirm></SetAddresseeConfirm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// 设置收货信息（实物类）
@inject((stores) => {
  const props = {
    productShow: stores.productListStore.productShow,
    orderId: stores.productListStore.orderId,
    isShow: stores.systemStore.popStatus.get('isShowSetAddress')
  };
  return props;
}) @observer
class SetAddresseeConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresseeName: '',
      addresseePhone: '',
      addresseeProvince: '110000',
      addresseeCity: '110100',
      addresseeAddress: ''
    };
  }

  handleChange = (target, value) => {
    this.setState({ [target]: value });
  }

  submitAddressee = () => {
    // if(!/^[\u4e00-\u9fa5 ]{2,10}$/.test(this.state.addresseeName)){
    if (!/^[\u4e00-\u9fa5A-Za-z0-9-_]+$/.test(this.state.addresseeName)) {
      this.props.showToast('请输入正确的收件人姓名');
      return;
    }
    if (!/^1[34578]\d{9}$/.test(this.state.addresseePhone)) {
      this.props.showToast('请输入正确的手机号码');
      return;
    }
    if (this.state.addresseeAddress.length === 0) {
      this.props.showToast('请输入详细的收件地址');
      return;
    }
    setAddressee(this.props.orderId, {
      receivedAddress: this.state.addresseeAddress,
      receivedCity: this.state.addresseeCity,
      receivedPhone: this.state.addresseePhone,
      receivedProvince: this.state.addresseeProvince,
      receiver: this.state.addresseeName
    });
  }

  render() {
    const { addresseeName, addresseePhone, addresseeProvince, addresseeCity, addresseeAddress } = this.state;
    return (
      <div className="panel-con panel-con-set-addressee-confirm">
        <ul className="form">
          <li>
            <label htmlFor="addressee-name">收件人</label>
            <input type="text" className="" id="addressee-name" placeholder="请填写收件人姓名"
                   defaultValue={addresseeName} maxLength="10" onChange={(event) => { this.handleChange('addresseeName', event.target.value); }}/>
          </li>
          <li>
            <label htmlFor="addressee-phone">联系电话</label>
            <input type="phone" className="" id="addressee-phone" placeholder="请填写收件人联系电话"
                   defaultValue={addresseePhone} maxLength="11" onChange={(event) => { this.handleChange('addresseePhone', event.target.value); }}/>
          </li>
          <li>
            <AreaPicker onChange={this.handleChange} defaultValue={{ addresseeProvince, addresseeCity }}/>
          </li>

          <li className="address">
            <label htmlFor="addressee-address">详细地址</label>
            <textarea className="" id="addressee-address" placeholder="请填写详细地址" maxLength="50" onChange={(event) => { this.handleChange('addresseeAddress', event.target.value); }}
            />
          </li>
        </ul>
        <p className="set-addressee-remark">收货信息一经确认，暂不支持修改</p>
        <a href="javascript:void(0);" className="btn-long btn-sure-addressee" onClick={ this.submitAddressee }>我确认信息无误</a>
      </div>
    );
  }
}

const CustomChildren = (props) => {
  return (
    <div
      onClick={props.onClick}
    >
      <div className="input-con">
        <label htmlFor="">省市</label>
        <input type="text" className="" id="addressee-city" value={`${props.extra[0]} ${props.extra[1]}`} readOnly />
      </div>
    </div>
  );
};

class AreaPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [this.props.defaultValue.addresseeProvince, this.props.defaultValue.addresseeCity]
    };
  }

  onPickerChange = (val) => {
    this.setState({ value: val });
    this.props.onChange('addresseeProvince', val[0]);
    this.props.onChange('addresseeCity', val[1]);
  }
  format = (vals) => {
    return vals;
  }
  render() {
    return (
      <div>
        <Picker extra="请选择(可选)" data={district} title="选择地区" onPickerChange = {this.onPickerChange} value={this.state.value} format={this.format} cols={2}>
          <CustomChildren />
        </Picker>
      </div>
    );
  }
}

