import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import TweenOne, { PathPlugin, TweenOneGroup } from 'rc-tween-one';
import BezierPlugin from 'rc-tween-one/lib/plugin/BezierPlugin';
import { getIn } from 'utils/utilsFunc';

TweenOne.plugins.push(BezierPlugin);

@inject((stores) => {
  const props = {
    isShow: stores.systemStore.popStatus.get('isShowFirstLogin'),
    pause: stores.systemStore.firstLogin.get('pause'),
    moment: stores.systemStore.firstLogin.get('moment'),
    registerNum: stores.systemStore.registerNum,
    signinStatus: getIn(['signinStatus'], stores.userStore.userInfo, false),
    togglePop: stores.userStore.togglePop.bind(stores.userStore),
    sysTogglePop: stores.systemStore.togglePop.bind(stores.systemStore),
    stopAnimateBeans: stores.systemStore.stopAnimateBeans.bind(stores.animationStore)
  };
  return props;
})
@observer
class PopFirstLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowBean2: false
    };
    this.onEnd = this.onEnd.bind(this);
  }
  onEnd() {
    this.setState({
      isShowBean2: true
    });
    setTimeout(() => {
      this.props.sysTogglePop('isShowFirstLogin', false);
      if (this.props.signinStatus) {
        this.props.togglePop('isShowSign', true);
      }
    }, 3000);
  }
  renderAnimation() {
    this.options = {
      duration: 2000,
      ease: 'linear',
      varPath: [
        [
          // 点1
          { x: 0, y: lib.flexible.rem2px(0) }, // 0.77
          { x: 0, y: -lib.flexible.rem2px(3.8) },
          { x: 0, y: -lib.flexible.rem2px(10.8) },
          { x: 0, y: -lib.flexible.rem2px(3.8) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点2
          { x: 0, y: lib.flexible.rem2px(2.35) },
          { x: 0, y: -lib.flexible.rem2px(1.22) },
          { x: 0, y: -lib.flexible.rem2px(8.22) },
          { x: 0, y: -lib.flexible.rem2px(1.22) },
          { x: 0, y: lib.flexible.rem2px(2.35) }
        ],
        [
          // 点3
          { x: 0, y: lib.flexible.rem2px(0) }, // 0.75
          { x: 0, y: -lib.flexible.rem2px(3.81) },
          { x: 0, y: -lib.flexible.rem2px(10.81) },
          { x: 0, y: -lib.flexible.rem2px(3.81) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点4
          { x: 0, y: lib.flexible.rem2px(0) }, // 0.74
          { x: 0, y: -lib.flexible.rem2px(3.81) },
          { x: 0, y: -lib.flexible.rem2px(10.81) },
          { x: 0, y: -lib.flexible.rem2px(3.81) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点5
          { x: 0, y: lib.flexible.rem2px(0) }, // 0.75
          { x: 0, y: -lib.flexible.rem2px(4.32) },
          { x: 0, y: -lib.flexible.rem2px(11.32) },
          { x: 0, y: -lib.flexible.rem2px(4.32) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点6
          { x: 0, y: lib.flexible.rem2px(0) }, // 0.2
          { x: 0, y: -lib.flexible.rem2px(4.07) },
          { x: 0, y: -lib.flexible.rem2px(11.07) },
          { x: 0, y: -lib.flexible.rem2px(4.07) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点7
          { x: 0, y: lib.flexible.rem2px(0) }, // 0.48
          { x: 0, y: -lib.flexible.rem2px(4.22) },
          { x: 0, y: -lib.flexible.rem2px(11.22) },
          { x: 0, y: -lib.flexible.rem2px(4.22) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点8
          { x: 0, y: lib.flexible.rem2px(0) }, // 0.34
          { x: 0, y: -lib.flexible.rem2px(3.68) },
          { x: 0, y: -lib.flexible.rem2px(10.68) },
          { x: 0, y: -lib.flexible.rem2px(3.68) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点9
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(4.55) },
          { x: 0, y: -lib.flexible.rem2px(11.55) },
          { x: 0, y: -lib.flexible.rem2px(4.55) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点10
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(2.42) },
          { x: 0, y: -lib.flexible.rem2px(9.42) },
          { x: 0, y: -lib.flexible.rem2px(2.42) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点11
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(4.34) },
          { x: 0, y: -lib.flexible.rem2px(11.34) },
          { x: 0, y: -lib.flexible.rem2px(4.34) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点12
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(4.43) },
          { x: 0, y: -lib.flexible.rem2px(11.43) },
          { x: 0, y: -lib.flexible.rem2px(4.43) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点13
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(3.86) },
          { x: 0, y: -lib.flexible.rem2px(10.86) },
          { x: 0, y: -lib.flexible.rem2px(3.86) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点14
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(3.61) },
          { x: 0, y: -lib.flexible.rem2px(10.61) },
          { x: 0, y: -lib.flexible.rem2px(3.61) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点15
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(3.12) },
          { x: 0, y: -lib.flexible.rem2px(10.12) },
          { x: 0, y: -lib.flexible.rem2px(3.12) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点16
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(2.48) },
          { x: 0, y: -lib.flexible.rem2px(9.48) },
          { x: 0, y: -lib.flexible.rem2px(2.48) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点17
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(4.48) },
          { x: 0, y: -lib.flexible.rem2px(11.48) },
          { x: 0, y: -lib.flexible.rem2px(4.48) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点18
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(4.47) },
          { x: 0, y: -lib.flexible.rem2px(11.47) },
          { x: 0, y: -lib.flexible.rem2px(4.47) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点19
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(3.12) },
          { x: 0, y: -lib.flexible.rem2px(10.12) },
          { x: 0, y: -lib.flexible.rem2px(3.12) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点20
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(2.44) },
          { x: 0, y: -lib.flexible.rem2px(9.44) },
          { x: 0, y: -lib.flexible.rem2px(2.44) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点21
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(2.9) },
          { x: 0, y: -lib.flexible.rem2px(9.9) },
          { x: 0, y: -lib.flexible.rem2px(2.9) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ],
        [
          // 点22
          { x: 0, y: lib.flexible.rem2px(0) },
          { x: 0, y: -lib.flexible.rem2px(3.61) },
          { x: 0, y: -lib.flexible.rem2px(10.61) },
          { x: 0, y: -lib.flexible.rem2px(3.61) },
          { x: 0, y: lib.flexible.rem2px(0) }
        ]
      ],
      onEnd: this.onEnd
    };

    const animationArray = [];

    for (const value of this.options.varPath) {
      const num = this.options.varPath.indexOf(value);
      animationArray.push({
        className: `bean bean${num + 1}`,
        animation: [
          {
            display: 'inline-block',
            bezier: {
              type: 'soft',
              vars: this.options.varPath[num],
              autoRotate: true
            },
            duration: this.options.duration,
            ease: this.options.ease,
            onComplete: this.options.onEnd
          }
        ]
      });
    }
    return (
      <TweenOneGroup>
        {animationArray.map((item, index) =>
          <TweenOne
            animation={item.animation}
            className={item.className}
            paused={this.props.pause}
            moment={this.props.moment}
            key={`ani${index}`}
          />
        )}
      </TweenOneGroup>
    );
  }
  render() {
    const { isShow, pause, moment, registerNum } = this.props;
    const { isShowBean2 } = this.state;
    const content = this.renderAnimation();
    const classname = classnames({
      'pop-layer': true,
      'pop-first-login': true,
      'pop-show': isShow
    });
    const bean2Class = classnames({
      'bean2-wrp': true,
      'show-beans': isShowBean2
    });
    return (
      <div className={classname}>
        <section className="pop-mask" />
        <section className="pop-body pop-body-first-login">
          <div className="bean-wrp">
            {content}
          </div>
          <div className={bean2Class}>
            <section className="bg-light" />
            <section className="bg-wrp">
              欢乐豆<span className="score">×{registerNum}</span>
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default PopFirstLogin;
