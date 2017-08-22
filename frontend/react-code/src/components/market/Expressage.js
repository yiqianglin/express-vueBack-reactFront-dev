/**
 * Created by Administrator on 2017/4/23 0023.
 */
import React, { Component } from 'react';
import { cityCode2cityName } from 'utils/utilsFunc';


export default class Expressage extends Component {
  render() {
    const { ExpressData: renderData } = this.props;
    const { provinceName, cityName } = cityCode2cityName(renderData.receivedProvince, renderData.receivedCity);
    return (
      <div className="expressage-wrapper">
        <ul>
          <li>
            <span className="label">快递单号</span><span className="details">{renderData.trackingCompany ? renderData.trackingCompany : ''} { renderData.trackingNumber ? renderData.trackingNumber : '待生成' }</span>
          </li>
          <li className="address">
            <span className="label">详细地址</span><span className="details address-details">{`${renderData.receiver} ${renderData.receivedPhone} ${provinceName}${cityName}${renderData.receivedAddress}`}</span>
          </li>
        </ul>
      </div>
    );
  }
}
