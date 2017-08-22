/**
 * 静态数据集合
 */

/**
 * 接口url映射集合
 * @type {object}
 */
export const urlProtoMap = {
  GetServerTime: {
    url: '/game-web-site/game/system/getServerTime.htm',
    proto: 'com.xunleijr.game.vo.GetServerTimeResult'
  },
  SystemConfig: {
    url: '/game-web-site/game/system/systemConfig.htm',
    proto: 'com.xunleijr.game.vo.SystemConfigResult'
  },
  Index: {
    url: '/game-web-site/game/system/index.htm',
    proto: 'com.xunleijr.game.vo.IndexResult'
  },
  UserSignin: {
    url: '/game-web-site/game/user/userSignin.htm',
    proto: 'com.xunleijr.game.vo.UserSigninResult'
  },
  UserInfo: {
    url: '/game-web-site/game/user/userInfo.htm',
    proto: 'com.xunleijr.game.vo.UserInfoResult'
  },
  UserChannelBind: {
    url: '/game-web-site/game/user/userChannelBind.htm',
    proto: 'com.xunleijr.game.vo.UserChannelBindResult'
  },
  ScoreLoggerList: {
    url: '/game-web-site/game/user/scoreLogger.htm',
    proto: 'com.xunleijr.game.vo.ScoreLoggerListResult'
  },
  UserInfoWZRY: {
    url: '/game-web-site/game/user/userInfoWZRY.htm',
    proto: 'com.xunleijr.game.vo.UserInfoWZRYResult'
  },
  WxRechargeScore: {
    url: '/game-web-site/game/weixin/wxRechargeScore.htm',
    proto: 'com.xunleijr.game.vo.WxRechargeScoreResult'
  },
  WxRechargeScoreQuery: {
    url: '/game-web-site/game/weixin/wxRechargeScoreQuery.htm',
    proto: 'com.xunleijr.game.vo.WxRechargeScoreQueryResult'
  },
  ServerCurRoundInfo: {
    url: '/game-web-updown/game/updown/getServerCurRoundInfo.htm',
    proto: 'com.xunleijr.game.vo.ServerCurRoundInfoResult'
  },
  LightningLine: {
    url: '/game-web-updown/game/updown/quote/lightningLine.htm',
    proto: 'com.xunleijr.game.vo.LightningLineResult'
  },
  UpdownHistoryRecord: {
    url: '/game-web-updown/game/updown/getHistoryRecordResult.htm',
    proto: 'com.xunleijr.game.vo.UpdownHistoryRecordResult'
  },
  UpdownGoldList: {
    url: '/game-web-updown/game/updown/goldlist.htm',
    proto: 'com.xunleijr.game.vo.UpdownGoldListResult'
  },
  UpdownUserGuessRecord: {
    url: '/game-web-updown/game/updown/getUserGuessRecord.htm',
    proto: 'com.xunleijr.game.vo.updown.UpdownUserGuessRecordResult'
  },
  Guess: {
    url: '/game-web-updown/game/updown/guess.htm',
    proto: 'com.xunleijr.game.vo.GuessResult'
  },
  UpdownRoundInfo: {
    url: '/game-web-updown/game/updown/getCurrentRoundInfo.htm',
    proto: 'com.xunleijr.game.vo.UpdownRoundInfoResult'
  },
  UpdownUserNumAndHeadImgs: {
    url: '/game-web-updown/game/updown/getCurrentRoundUserNumAndHeadImgs.htm',
    proto: 'com.xunleijr.game.vo.UpdownUserNumAndHeadImgsResult'
  },
  UserRoundGuessRecord: {
    url: '/game-web-updown/game/updown/getUserRoundGuessRecord.htm',
    proto: 'com.xunleijr.game.vo.UserRoundGuessRecordResult'
  },
  TaskNotice: {
    url: '/game-web-updown/game/updown/getTaskNotice.htm',
    proto: 'com.xunleijr.game.vo.TaskNoticeResult'
  },
  AcceptPrize: {
    url: '/game-web-updown/game/updown/acceptPrize.htm',
    proto: 'com.xunleijr.game.vo.AcceptPrizeResult'
  },
  TaskList: {
    url: '/game-web-updown/game/updown/getTaskList.htm',
    proto: 'com.xunleijr.game.vo.TaskListResult'
  },
  LastBigPrize: {
    url: '/game-web-updown/game/updown/lastBigPrize.htm',
    proto: 'com.xunleijr.game.vo.updown.LastBigPrizeResult'
  },
  PlayTypeInfo: {
    url: '/game-web-updown/game/updown/getPlayTypeInfo.htm',
    proto: 'com.xunleijr.game.vo.updown.PlayTypeInfoResult'
  },
  QueryPlayTypeSwitch: {
    url: '/game-web-updown/game/updown/queryPlayTypeSwitch.htm',
    proto: 'com.xunleijr.game.vo.updown.QueryPlayTypeSwitchResult'
  },
  ChangePlayTypeSwitch: {
    url: '/game-web-updown/game/updown/changePlayTypeSwitch.htm',
    proto: 'com.xunleijr.game.vo.updown.ChangePlayTypeSwitchResult'
  },
  GetPlayTypeOptions: {
    url: '/game-web-updown/game/updown/getPlayTypeOptions.htm',
    proto: 'com.xunleijr.game.vo.updown.GetPlayTypeOptionsResult'
  },
  MobileLogin: {
    url: '/game-web-site/game/user/login.htm',
    proto: 'com.xunleijr.game.vo.MobileLoginResult'
  },
  UpDownHistoryChart: {
    url: '/game-web-updown/game/updown/getUpDownHistoryChart.htm',
    proto: 'com.xunleijr.game.vo.updown.UpDownHistoryChartResult'
  },
  SmashEggCurrentRoundInfo: {
    url: '/game-web-smashegg/game/smashegg/getCurrentRoundInfo.htm',
    proto: 'com.xunleijr.game.vo.smashegg.SmashEggCurrentRoundInfoResult'
  },
  SmashEggHistoryRecord: {
    url: '/game-web-smashegg/game/smashegg/getHistoryRecordResult.htm',
    proto: 'com.xunleijr.game.vo.smashegg.SmashEggHistoryRecordResult'
  },
  SmashEgg: {
    url: '/game-web-smashegg/game/smashegg/smashEgg.htm',
    proto: 'com.xunleijr.game.vo.smashegg.SmashEggResult'
  },
  SmashEggWinnersList: {
    url: '/game-web-smashegg/game/smashegg/winnersList.htm',
    proto: 'com.xunleijr.game.vo.smashegg.SmashEggWinnersListResult'
  },
  SmashTaskNotice: {
    url: '/game-web-smashegg/game/smashegg/getTaskNotice.htm',
    proto: 'com.xunleijr.game.vo.TaskNoticeResult'
  },
  SmashAcceptPrize: {
    url: '/game-web-smashegg/game/smashegg/acceptPrize.htm',
    proto: 'com.xunleijr.game.vo.AcceptPrizeResult'
  },
  SmashTaskList: {
    url: '/game-web-smashegg/game/smashegg/getTaskList.htm',
    proto: 'com.xunleijr.game.vo.TaskListResult'
  },
  GameExtraInfo: {
    url: '/game-web-smashegg/game/smashegg/getGameExtraInfo.htm',
    proto: 'com.xunleijr.game.vo.smashegg.GameExtraInfoResult'
  },
  Hit: {
    url: '/game-web-hitme/game/hitme/hit.htm',
    proto: 'com.xunleijr.game.vo.hitme.HitResult'
  },
  HitHistory: {
    url: '/game-web-hitme/game/hitme/hithistory.htm',
    proto: 'com.xunleijr.game.vo.hitme.HitHistoryResult'
  },
  HitPrizeList: {
    url: '/game-web-hitme/game/hitme/prizeList.htm',
    proto: 'com.xunleijr.game.vo.hitme.PrizeListResult'
  },
  CreateRound: {
    url: '/game-web-hitme/game/hitme/cr.htm',
    proto: 'com.xunleijr.game.vo.hitme.CreateRoundResult'
  },
  ShootTaskList: {
    url: '/game-web-hitme/game/hitme/getTaskList.htm',
    proto: 'com.xunleijr.game.vo.TaskListResult'
  },
  ShootAcceptPrize: {
    url: '/game-web-hitme/game/hitme/acceptPrize.htm',
    proto: 'com.xunleijr.game.vo.AcceptPrizeResult'
  },
  BuyViewProbChance: {
    url: '/game-web-hitme/game/hitme/buyViewProbChance.htm',
    proto: 'com.xunleijr.game.vo.hitme.BuyViewProbChanceResult'
  },
  HitmeSystemProperties: {
    url: '/game-web-hitme/game/hitme/getHitmeSystemProperties.htm',
    proto: 'com.xunleijr.game.vo.hitme.HitmeSystemPropertiesResult'
  },
  GetProbability: {
    url: '/game-web-hitme/game/hitme/getProbability.htm',
    proto: 'com.xunleijr.game.vo.hitme.GetProbabilityResult'
  },
  MallBannerList: {
    url: '/game-web-mall/game/mall/bannerList.htm',
    proto: 'com.xunleijr.game.vo.HomePageResult'
  },
  MallProductList: {
    url: '/game-web-mall/game/mall/productList.htm',
    proto: 'com.xunleijr.game.vo.MallProductListResult'
  },
  MallProductInfo: {
    url: '/game-web-mall/game/mall/productInfo.htm',
    proto: 'com.xunleijr.game.vo.MallProductInfoResult'
  },
  MallExchangeProduct: {
    url: '/game-web-mall/game/mall/exchangeProduct.htm',
    proto: 'com.xunleijr.game.vo.BasicResult'
  },
  MallExchangeRecord: {
    url: '/game-web-mall/game/mall/exchangeRecord.htm',
    proto: 'com.xunleijr.game.vo.ExchangeRecordListResult'
  },
  MallExchangeRecordInfo: {
    url: '/game-web-mall/game/mall/exchangeRecordInfo.htm',
    proto: 'com.xunleijr.game.vo.ExchangeRecordInfoResult'
  },
  MallSetReceivedAddress: {
    url: '/game-web-mall/game/mall/setReceivedAddress.htm',
    proto: 'com.xunleijr.game.vo.BasicResult'
  },
  MallGlobalExchangeRecord: {
    url: '/game-web-mall/game/mall/mallExchangeRecord.htm',
    proto: 'com.xunleijr.game.vo.MallExchangeRecordListResult'
  },
  MallCompleteWzryOrder: {
    url: '/game-web-mall/game/mall/completeWzryOrder.htm',
    proto: 'com.xunleijr.game.vo.BasicResult'
  },
  MallProductSkinServerList: {
    url: '/game-web-mall/game/mall/skinServerList.htm',
    proto: 'com.xunleijr.game.vo.MallProductSkinServerListResult'
  },
  MallRecommendProductList: {
    url: '/game-web-mall/game/mall/recommendProductList.htm',
    proto: 'com.xunleijr.game.vo.MallRecommendProductListResult'
  },
  CatchBirdsCurrentRoundInfo: {
    url: '/game-web-catchbirds/game/catchbirds/getCurrentRoundInfo.htm',
    proto: 'com.xunleijr.game.vo.catchbirds.CatchBirdsCurrentRoundInfoResult'
  },
  CatchBirdsRewardConfig: {
    url: '/game-web-catchbirds/game/catchbirds/rewardConfig.htm',
    proto: 'com.xunleijr.game.vo.catchbirds.CatchBirdsRewardConfigResult'
  },
  CatchBirdsShoot: {
    url: '/game-web-catchbirds/game/catchbirds/shoot.htm',
    proto: 'com.xunleijr.game.vo.catchbirds.CatchBirdsShootResult'
  },
  CatchBirdsHistoryRecord: {
    url: '/game-web-catchbirds/game/catchbirds/getHistoryRecordResult.htm',
    proto: 'com.xunleijr.game.vo.catchbirds.CatchBirdsHistoryRecordResult'
  },
  CatchBirdsTaskNotice: {
    url: '/game-web-catchbirds/game/catchbirds/getTaskNotice.htm',
    proto: 'com.xunleijr.game.vo.TaskNoticeResult'
  },
  CatchBirdsAcceptPrize: {
    url: '/game-web-catchbirds/game/catchbirds/acceptPrize.htm',
    proto: 'com.xunleijr.game.vo.AcceptPrizeResult'
  },
  CatchBirdsTaskList: {
    url: '/game-web-catchbirds/game/catchbirds/getTaskList.htm',
    proto: 'com.xunleijr.game.vo.TaskListResult'
  }
};

export const socketProtoMap = {
  register: {
    name: 'Register',
    proto: 'com.xunlei.weipan.vo.RegisterResult'
  },
  guessQuote: {
    name: 'GuessQuote',
    proto: 'com.xunleijr.game.vo.GuessQuoteResult'
  },
  channelId: {
    name: 'ChannelBinding',
    proto: 'com.xunleijr.game.vo.ChannelBindingResult'
  },
  blockGuess: {
    name: 'BlockGuess',
    proto: 'com.xunleijr.game.vo.BlockGuessResult'
  },
  newOdds: {
    name: 'NewOdds',
    proto: 'com.xunleijr.game.vo.NewOddsResult'
  },
  wxRechargeScore: {
    name: 'WxRechargeNotify',
    proto: 'com.xunleijr.game.vo.WxRechargeNotifyResult'
  },
  gameResult: {
    name: 'UpdownGameResult',
    proto: 'com.xunleijr.game.vo.updown.UpdownGameResultResult'
  },
  userGuessResult: {
    name: 'UpdownUserGuessResult',
    proto: 'com.xunleijr.game.vo.updown.UpdownUserGuessResultResult'
  },
  userGuess: {
    name: 'UpdownUserGuess',
    proto: 'com.xunleijr.game.vo.updown.UpdownUserGuessResult'
  },
  openClose: {
    name: 'OpenClose',
    proto: 'com.xunleijr.game.vo.OpenCloseResult'
  },
  othersPrize: {
    name: 'OthersPrize',
    proto: 'com.xunleijr.game.vo.OthersPrizeResult'
  }
};
