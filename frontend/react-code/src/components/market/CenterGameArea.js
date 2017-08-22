import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { formatMoneyToWan, isWeixinBrowser } from 'utils/utilsFunc';

import '../../assets/scss/market/components/centerGameArea.scss';

@inject((stores) => {
  const props = {
    updownUserNum: stores.systemStore.playerNumInfo.get('updownUserNum'),
    smasheggUserNum: stores.systemStore.playerNumInfo.get('smasheggUserNum'),
    hitmeUserNum: stores.systemStore.playerNumInfo.get('hitmeUserNum'),
    crazybetUserNum: stores.systemStore.playerNumInfo.get('crazybetUserNum'),
    updownLinkUrl: stores.systemStore.playerNumInfo.get('updownLinkUrl'),
    smasheggLinkUrl: stores.systemStore.playerNumInfo.get('smasheggLinkUrl'),
    hitmeLinkUrl: stores.systemStore.playerNumInfo.get('hitmeLinkUrl'),
    crazybetLinkUrl: stores.systemStore.playerNumInfo.get('crazybetLinkUrl'),
    updownImage: stores.systemStore.playerNumInfo.get('updownImage'),
    smasheggImage: stores.systemStore.playerNumInfo.get('smasheggImage'),
    hitmeImage: stores.systemStore.playerNumInfo.get('hitmeImage'),
    crazybetImage: stores.systemStore.playerNumInfo.get('crazybetImage'),
    moreImage: stores.systemStore.playerNumInfo.get('moreImage'),
    centerImage: stores.systemStore.playerNumInfo.get('centerImage'),
    showToast: stores.systemStore.showToast.bind(stores.systemStore),
    isLogin: stores.userStore.isLogin,
    catchbirdsLinkUrl: stores.systemStore.playerNumInfo.get('catchbirdsLinkUrl'),
    catchbirdsImage: stores.systemStore.playerNumInfo.get('catchbirdsImage'),
    catchbirdsUserNum: stores.systemStore.playerNumInfo.get('catchbirdsUserNum')
  };
  return props;
})
@observer
class CenterGameArea extends Component {
  render() {
    const {
      updownUserNum,
      smasheggUserNum,
      hitmeUserNum,
      crazybetUserNum,
      updownLinkUrl,
      smasheggLinkUrl,
      hitmeLinkUrl,
      crazybetLinkUrl,
      updownImage,
      smasheggImage,
      hitmeImage,
      crazybetImage,
      moreImage,
      centerImage,
      showToast,
      isLogin,
      catchbirdsLinkUrl,
      catchbirdsImage,
      catchbirdsUserNum
    } = this.props;
    return (
      <div className="game-area">
        <a className="area-egg area" href={smasheggLinkUrl}>
          <img src={smasheggImage} className="game-img" />
          <div className="player-num">
            {smasheggUserNum > 99999 ? formatMoneyToWan(smasheggUserNum, 2) : smasheggUserNum}人玩
          </div>
        </a>
        <div className="area-wrp">
          <a className="area-guess area" href={catchbirdsLinkUrl}>
            <img src={catchbirdsImage} className="game-img" />
            <div className="player-num">
              {catchbirdsUserNum > 99999
                ? formatMoneyToWan(catchbirdsUserNum, 2)
                : catchbirdsUserNum || 0}人玩
            </div>
            <span className="person" />
          </a>
          <a className="area-shoot area" href={hitmeLinkUrl}>
            <img src={hitmeImage} className="game-img" />
            <div className="player-num">
              {hitmeUserNum > 99999 ? formatMoneyToWan(hitmeUserNum, 2) : hitmeUserNum}人玩
            </div>
            <span className="person" />
          </a>
        </div>
        <section className="area-center area">
          <img src={centerImage} className="game-img" />
        </section>
        <div className="area-wrp2">
          <a
            className="area-ftball area"
            onClick={() => {
              if (!isWeixinBrowser() && !isLogin) {
                toggleLoginIframe(_gamesource_, () => {
                  window.location.href = crazybetLinkUrl;
                });
                return false;
              }
              window.location.href = crazybetLinkUrl;
              return true;
            }}
          >
            <img src={crazybetImage} className="game-img" />
            <div className="player-num">
              {crazybetUserNum > 99999 ? formatMoneyToWan(crazybetUserNum, 2) : crazybetUserNum}人玩
            </div>
            <span className="person" />
          </a>
          <section
            className="area-more"
            onClick={() => {
              showToast('新游戏建设中');
            }}
          >
            <img src={moreImage} className="game-img" />
          </section>
        </div>
      </div>
    );
  }
}

export default CenterGameArea;
