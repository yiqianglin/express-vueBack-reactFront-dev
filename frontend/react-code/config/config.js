const path = require('path');
const localConf = require('./localConfig');
const merge = require('lodash/merge');
const argv = require('yargs').argv;
const project = require('./project');

const projectName = typeof argv.projectName === 'string'
  ? argv.projectName
  : 'guessGame';
console.log('build project:', projectName);

let config = {
  appName: project[projectName].appName,
  platform: 'app',
  title: project[projectName].title,
  htmlPath:  project[projectName].htmlPath,
  entry: path.join(
    __dirname,
    `../src/entry/${project[projectName].appName}.entry.js`
  ),
  dev: {
    env: {
      NODE_ENV: JSON.stringify('development')
    },
    port: project[projectName].port,
    autoOpenBrowser: true,
    assetsPublicPath: '/',
    proxyTable: {
      context: [
        '/game-web-site/game/system',
        '/game-web-site/game/weixin',
        '/game-web-site/game/user',
        '/game-web-updown/game/updown',
        '/game-web-mall/game/mall',
        '/game-web-smashegg/game/smashegg',
        '/game-web-hitme/game/hitme',
        '/game-web-catchbirds/game/catchbirds'
      ],
      options: {
        // target: 'http://192.168.25.151:8080',
        target: 'http://test.weitrades.com',
        changeOrigin: true
      }
    },
    template: path.join(__dirname, '../tpl/dev.template.html'),
    indexPath: project[projectName].indexPath,
    urlPath: project[projectName].urlPath // css，js文件url前缀
  },
  build: {
    env: {
      NODE_ENV: JSON.stringify('production')
    },
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: `/${project[projectName].contentPath}/`,
    template: path.join(
      __dirname,
      `../tpl/${project[projectName].appName}.template.html`
    ),
    bundleAnalyzerReport: process.env.npm_config_report,
    minifyImg: process.env.npm_config_minify
  },
  npmAlias: {
    img: path.join(__dirname, '../src/assets/img')
  },
  projectDir: `E:/game/${project[projectName].contentPath}/src/main/webapp`
};

merge(config, localConf);

module.exports = config;
