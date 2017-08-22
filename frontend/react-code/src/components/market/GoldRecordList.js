import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';

import 'assets/scss/market/goldRecord.scss';

@inject((stores) => {
  const props = {
    recordData: stores.goldRecordStore.recordData
  };
  return props;
})
@observer
class GoldRecordList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.recordData !== this.props.recordData;
  }
  getOrigin(operate) {
    let operateStr = '';
    switch (operate) {
      case 1:
        operateStr = '模拟盘盈利';
        break;
      case 2:
        operateStr = '参加抽奖';
        break;
      case 3:
        operateStr = '抽奖奖励';
        break;
      case 4:
        operateStr = '签到奖励';
        break;
      case 5:
        operateStr = '领奖兑换';
        break;
      case 6:
        operateStr = '新手奖励';
        break;
      case 7:
        operateStr = '充值';
        break;
      case 8:
        operateStr = '游戏投注';
        break;
      case 9:
        operateStr = '猜对奖励';
        break;
      case 10:
        operateStr = '关注公众号奖励';
        break;
      case 11:
        operateStr = '充值赠送';
        break;
      case 12:
        operateStr = '任务奖励';
        break;
      case 13:
        operateStr = '账户合并';
        break;
      case 14:
        operateStr = '绑定手机';
        break;
      case 15:
        operateStr = '猜涨跌排行榜奖励';
        break;
      case 21:
        operateStr = '任务奖励（单期2笔）';
        break;
      case 22:
        operateStr = '任务奖励（首充即送）';
        break;
      case 23:
        operateStr = '任务奖励（猜对加奖）';
        break;
      case 24:
        operateStr = '任务奖励（免费抽奖）';
        break;
      case 25:
        operateStr = '任务奖励（连玩2天）';
        break;
      case 26:
        operateStr = '任务奖励（满10万大奖）';
        break;
      case 31:
        operateStr = '砸金蛋投注';
        break;
      case 32:
        operateStr = '砸金蛋返奖';
        break;
      case 41:
        operateStr = '来打我呀投注';
        break;
      case 42:
        operateStr = '来打我呀返奖';
        break;
      case 60:
        operateStr = '参与任务（任务奖励）';
        break;
      case 61:
        operateStr = '不来1发么（任务奖励）';
        break;
      case 62:
        operateStr = '神马神偷（任务奖励）';
        break;
      case 63:
        operateStr = '不想抽么（任务奖励）';
        break;
      case 64:
        operateStr = '这不是软柿子（任务奖励）';
        break;
      case 65:
        operateStr = '红太狼的平底锅（任务奖励）';
        break;
      case 66:
        operateStr = '小李tmd飞刀（任务奖励）';
        break;
      case 67:
        operateStr = '壕掷千金（任务奖励）';
        break;
      case 71:
      case 72:
      case 73:
      case 74:
        operateStr = '砸金蛋任务奖励';
        break;
      case 80:
        operateStr = '捕鸟投注';
        break;
      case 81:
        operateStr = '捕鸟返奖';
        break;
      case 82:
      case 83:
      case 84:
      case 85:
      case 86:
        operateStr = '天天来捕鸟任务奖励';
        break;
      default:
        break;
    }
    return operateStr;
  }
  render() {
    const { recordData } = this.props;
    return (
      <div className="records-data">
        {recordData.map((record, index) => {
          const numClass = classnames({
            'record-right': true,
            'gold-color-positive': record.type === 1
          });
          const title = this.getOrigin(record.operate);
          return (
            <section className="record-list" key={`record-${index}`}>
              <p className="p-title">
                {title}
              </p>
              <p className="p-date">
                {record.createTime}
              </p>
              <div className={numClass}>
                {record.type === 1 ? record.score : `-${record.score}`}
              </div>
            </section>
          );
        })}
      </div>
    );
  }
}

export default GoldRecordList;
