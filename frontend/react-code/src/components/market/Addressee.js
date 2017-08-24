/**
 * Created by Administrator on 2017/4/23 0023.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { setAddressee } from 'stores/market/actionFunc';
import { cityCode2cityName } from 'utils/utilsFunc';
import district from 'utils/cityCodeData';

const CustomChildren = (props) => {
  return (
    <div
      onClick={props.onClick}
    >
      <div className="input-con">
        <label htmlFor="">省市</label>
        <div type="text" className="" id="addressee-province">{props.extra[0]}</div>
        <div type="text" className="" id="addressee-city">{props.extra[1]}</div>
      </div>
    </div>
  );
};

class AreaPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: ['440000','440300','440305']
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
        <Picker extra="请选择(可选)" data={district} title="选择地区" onPickerChange={this.onPickerChange}
          value={this.state.value}
          format={this.format} cols={2}
        >
          <CustomChildren />
        </Picker>
      </div>
    );
  }
}

@inject((stores) => {
  const props = {
    showToast: stores.systemStore.showToast.bind(stores.systemStore)
  };
  return props;
}) @observer
export default class Addressee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresseeName: '',
      addresseePhone: '',
      addresseeProvince: '110000',
      addresseeCity: '110100',
      addresseeAddress: '',
      isCheckAddress: false
    };
  }

  handleChange = (target, value) => {
    this.setState({ [target]: value });
    /* this.props.showToast(data.msg); */
  }

  toCheckAddressee = () => {
    /* if(!/^[\u4e00-\u9fa5 ]{2,10}$/.test(this.state.addresseeName)){ */
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
    this.toggleCheckAddressPanel();
  }

  toggleCheckAddressPanel = () => {
    this.setState((prevState, props) => {
      return { isCheckAddress: !prevState.isCheckAddress };
    });
  }

  submitAddress = () => {
    const data = setAddressee(this.props.AddresseeData.orderId, {
      receivedAddress: this.state.addresseeAddress,
      receivedCity: this.state.addresseeCity,
      receivedPhone: this.state.addresseePhone,
      receivedProvince: this.state.addresseeProvince,
      receiver: this.state.addresseeName
    });
  }


  render() {
    const { addresseeName, addresseePhone, addresseeProvince, addresseeCity, addresseeAddress, isCheckAddress } = this.state;
    const { canEdit } = this.props;
    return (
      <div className="addressee-wrapper">
        <form action="">
          <div className="input-con">
            <label htmlFor="addressee-name">收件人</label>
            <input type="text" className="" id="addressee-name" placeholder="请填写收件人姓名"
              defaultValue={addresseeName} maxLength="10" onChange={(event) => {
                this.handleChange('addresseeName', event.target.value);
              }}
            />
          </div>
          <div className="input-con">
            <label htmlFor="addressee-phone">联系电话</label>
            <input type="tel" className="" id="addressee-phone" placeholder="请填写收件人联系电话"
              defaultValue={addresseePhone} maxLength="11" onChange={(event) => {
                this.handleChange('addresseePhone', event.target.value);
              }}
            />
          </div>
          <AreaPicker onChange={this.handleChange} defaultValue={{ addresseeProvince, addresseeCity }}/>
          <div className="input-con">
            <label htmlFor="addressee-address">详细地址</label>
            <input type="text" className="" id="addressee-address" placeholder="请填写详细地址" maxLength="50"
              onChange={(event) => {
                this.handleChange('addresseeAddress', event.target.value);
              }}
            />
          </div>
        </form>

        <a className="btn" href="javascript:void(0);" onClick={ this.toCheckAddressee }>保存收货信息</a>

        {
          isCheckAddress ? <CheckAddressPanel checkingData={{
            receivedAddress: addresseeAddress,
            receivedCity: addresseeCity,
            receivedPhone: addresseePhone,
            receivedProvince: addresseeProvince,
            receiver: addresseeName
          }} sumbitHandler={this.submitAddress} toggleHandler={this.toggleCheckAddressPanel}
          /> : null
        }

      </div>
    );
  }
}


class CheckAddressPanel extends Component {
  render() {
    const { receivedAddress, receivedCity, receivedPhone, receivedProvince, receiver } = this.props.checkingData;
    const { toggleHandler } = this.props;
    const { provinceName, cityName } = cityCode2cityName(receivedProvince, receivedCity);
    return (
      <div className="pop-wrapper pop-show">
        <section className="pop-mask"></section>
        <div className="pop-common pop-set-addressee-confirm">
          <div className="close-btn" onClick={() => {
            toggleHandler();
          }}></div>
          <div className="hd-title"></div>
          <div className="bd-wrp">

            <div className="bd-wrp-inner">
              <div className="panel-con panel-con-set-addressee-confirm">
                <ul className="form">
                  <li>
                    <label htmlFor="addressee-name">收件人</label>
                    <input type="tel" className="" id="addressee-phone"
                      defaultValue={receiver} readOnly
                    />
                  </li>
                  <li>
                    <label htmlFor="addressee-phone">联系电话</label>
                    <input type="phone" className="" id="addressee-phone"
                      defaultValue={receivedPhone} readOnly/>
                  </li>
                  <li>
                    <label htmlFor="addressee-phone">省市</label>
                    <input type="phone" className="" id="addressee-phone"
                      defaultValue={`${provinceName} ${cityName}`} readOnly/>
                  </li>

                  <li className="address">
                    <label htmlFor="addressee-address">详细地址</label>
                    <textarea className="" id="addressee-address"
                      defaultValue={receivedAddress} readOnly
                    />
                  </li>
                </ul>
                <p className="set-addressee-remark">收货信息一经确认，暂不支持修改</p>
                <a href="javascript:void(0);" className="btn-long btn-sure-addressee" onClick={ () => {
                  this.props.sumbitHandler();
                }}>我确认信息无误</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
