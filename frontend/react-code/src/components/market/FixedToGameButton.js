/**
 * Created by cc on 2017/5/26.
 */
import React, { Component } from 'react';

export default class FixedToGameButton extends Component {
  render() {
    return (
      <a
        className="fixed-to-game-button"
        href={`/game-web-mall/game/market/center.htm?_userStatus=${_userStatus}`}
      />
    );
  }
}
