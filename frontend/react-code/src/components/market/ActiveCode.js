/**
 * Created by Administrator on 2017/4/23 0023.
 */
import React, { Component } from 'react';

// 根据兑换码是否有'/'来判断是否为两项的样式
const judgeCouponType = (couponCode) => {
  if (/\//.test(couponCode)) {
    return 'double';
  }
  return 'simple';
};
// 根据兑换码分隔'/'获得卡号，卡密
const getSeparateCoupon = (couponCode) => {
  const arr = couponCode.split('/');
  if (arr.length >= 2) {
    return { id: arr[0], key: arr[1] };
  }
  return {};
};
// 根据simple/double生成对应ReactDom
class ActiveCodeCon extends React.Component {
  render() {
    const { couponCode } = this.props;
    const couponTypeJudge = judgeCouponType(couponCode);
    return (
      <div>
        {
          couponCode ?
            <div>
              {
                couponTypeJudge === 'simple' ?
                  <div className="redeem-code-wrapper-simple">
                    <p className="title">奖品兑换码/激活码</p>
                    <p className="redeem-code">{couponCode}</p>
                  </div>
                  :
                  <div className="redeem-code-wrapper-double">
                    <ul>
                      <li>
                        <span className="label">奖品卡号</span><span className="details cardId">{getSeparateCoupon(couponCode).id}</span>
                      </li>
                      <li>
                        <span className="label">奖品卡密</span><span className="details cardKey">{getSeparateCoupon(couponCode).key}</span>
                      </li>
                    </ul>
                  </div>
              }
            </div>
            :
            <div className="redeem-code-wrapper-simple">
              <p className="title">奖品兑换码/激活码</p>
              <p className="redeem-code-default">下一工作日24点前生成</p>
            </div>
        }
      </div>
    );
  }
}

export default class ActiveCode extends Component {
  render() {
    const { ActiveCodeData: renderData } = this.props;
    return (
      <div>
        <ActiveCodeCon {...renderData} />

        <div className="remark u-clearP">
          <div className="left">使用方法</div>
          <div className="right">
            <div dangerouslySetInnerHTML={{ __html: `<p>${renderData.productDesc}</p>` }} />
          </div>
        </div>
      </div>
    );
  }
}

ActiveCode.propTypes = {
  // ActiveCodeData: React.PropTypes.object.isRequired,
  ActiveCodeData: React.PropTypes.shape({
    couponCode: React.PropTypes.string,
    productDesc: React.PropTypes.string
  })
};
ActiveCode.defaultProps = {
  ActiveCode: {
    couponCode: '*************',
    productDesc: null
  }
};
