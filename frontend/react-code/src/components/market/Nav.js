/**
 * Created by cc on 2017/4/14.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import { formatMoneyToWan } from 'utils/utilsFunc';

@inject('userStore')
@observer
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCenterIsShow: false
    };
  }

  userCenterHandler = (isShow, event) => {
    this.setState({ userCenterIsShow: isShow });
    event.stopPropagation();
  };

  render() {
    const { userStore } = this.props;
    const defaultUserPic = require('../../assets/img/market/home/icon-nav-user-default.jpg');
    return (
      <div className="nav-wrapper">
        <ul className="nav-ul">
          <li>
            <a href={`${websitePath}/goldRecord.htm`}>
              <div className="spe spe-left">
                <div className="con">
                  <span className="icon icon-credits" />
                  <span className="article">
                    <span className="score-left">
                      {formatMoneyToWan(userStore.userScore, 2)}
                    </span>
                    {' '}
                    欢乐豆
                  </span>
                </div>
              </div>

            </a>
          </li>
          <li>
            <Link to={`${websitePath}/awardLogger.htm`}>
              <div className="spe">
                <div className="con">
                  <span className="icon icon-record" />
                  <span className="article">领奖记录</span>
                </div>
              </div>
            </Link>
          </li>
          <li
            onClick={(event) => {
              this.userCenterHandler(true, event);
            }}
          >
            <div className="spe spe-right">
              <div className="con user-con">
                <span className="icon icon-rules" />
                <span className="apostrophe" />
                <span className="user-pic-con">
                  <img
                    className="user-pic"
                    src={
                      userStore.userInfo && userStore.userInfo.portraitUri
                        ? userStore.userInfo.portraitUri
                        : defaultUserPic
                    }
                    alt=""
                  />
                </span>
              </div>
            </div>
          </li>
        </ul>
        {this.state.userCenterIsShow === true
          ? <div className="nav-pop-panel animated slideIntoPosition">
            {/* <div className="nav-pop-panel animated flipInX"> */}
            {/* <Link to={`${websitePath}/rules.htm`} className="nav-pannel-link">领奖说明</Link> */}
            <Link
              to={`${websitePath}/benevolence.htm`}
              className="nav-panel-link"
            >
              <span className="nav-inner-con">欢乐值</span>
            </Link>
            <a
              href={`/game-web-updown/game/guess/home.htm?_userStatus=${_userStatus}`}
              className="nav-panel-link"
            >
              <span className="nav-inner-con">返回游戏</span>
            </a>
          </div>
          : null}

      </div>
    );
  }
}
