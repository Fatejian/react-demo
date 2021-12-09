# React全家桶教程 （react、webpack、babel、react-route、redux、redux-saga）

react 全家桶从 0 到 1(最新)
本文从零开始，逐步讲解如何用 react 全家桶搭建一个完整的 react 项目。文中针对 react、webpack、babel、react-route、redux、redux-saga 的核心配置会加以讲解，希望通过这个项目，可以系统的了解 react 技术栈的主要知识，避免搭建一次后面就忘记的情况。

代码库：https://github.com/Fatejian/react-demo

首先关于主要的 npm 包版本列一下：

react@16.7.0
webpack@4.28.4
babel@7+
react-router@4.3.1
redux@4+
从 webpack 开始
思考一下 webpack 到底做了什么事情？其实简单来说，就是从入口文件开始，不断寻找依赖，同时为了解析各种不同的文件加载相应的 loader，最后生成我们希望的类型的目标文件。

这个过程就像是在一个迷宫里寻宝，我们从入口进入，同时我们也会不断的接收到下一处宝藏的提示信息，我们对信息进行解码，而解码的时候可能需要一些工具，比如说钥匙，而 loader 就像是这样的钥匙，然后得到我们可以识别的内容。

回到我们的项目，首先进行项目的初始化，分别执行如下命令

```bash
mkdir react-demo // 新建项目文件夹
cd react-demo // cd 到项目目录下
npm init // npm 初始化
```

引入 webpack
```bash
npm i webpack --save
touch webpack.config.js
```

对 webpack 进行简单配置，更新 webpack.config.js

```javascript
const path = require('path');

module.exports = {
entry: './app.js', // 入口文件
output: {
path: path.resolve(\_\_dirname, 'dist'), // 定义输出目录
filename: 'my-first-webpack.bundle.js' // 定义输出文件名称
}
};
```

创建 app.js 文件

更新 package.json 文件，在 scripts 中添加 webpack 执行命令
```json
"scripts": {
"dev": "./node_modules/.bin/webpack --config webpack.config.js"
}
```
如果有报错请按提示安装 webpack-cli
```bash
npm i webpack-cli
```
执行 webpack
```bash
npm run dev
```
如果在项目文件夹下生成了 dist 文件，说明我们的配置是没有问题的。

接入 react
安装 react 相关包
```bash
npm install react react-dom --save
```
更新 app.js 入口文件
```javascript
import React from 'react';
import ReactDom from 'react-dom';
import App from './src/views/App';
```
ReactDom.render(<App />, document.getElementById('root'));
创建目录 src/views/App，在 App 目录下，新建 index.js 文件作为 App 组件，index.js 文件内容如下：
```javascript
import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>App Container</div>);
    }

}
export default App;
```
在根目录下创建模板文件 index.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>index</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
</head>
<body>
    <div id="root"></div>
</body>
</html>
```
到了这一步其实关于react的引入就OK了，不过目前还有很多问题没有解决

如何解析 JS 文件的代码？
如何将 js 文件加入模板文件中？
Babel 解析 js 文件
Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript2015+的代码转换为向后兼容版本的 JavaScript 代码。
安装 babel-loader，@babel/core，@babel/preset-env，@babel/preset-react
```bash
npm i babel-loader@8 @babel/core @babel/preset-env @babel/preset-react -D
```
babel-loader：使用 Babel 转换 JavaScript 依赖关系的 Webpack 加载器, 简单来讲就是 webpack 和 babel 中间层，允许 webpack 在遇到 js 文件时用 bable 来解析
@babel/core：即 babel-core，将 ES6 代码转换为 ES5。7.0 之后，包名升级为@babel/core。@babel 相当于一种官方标记，和以前大家随便起名形成区别。
@babel/preset-env：即 babel-preset-env，根据您要支持的浏览器，决定使用哪些 transformations / plugins 和 polyfills，例如为旧浏览器提供现代浏览器的新特性。
@babel/preset-react：即 babel-preset-react，针对所有 React 插件的 Babel 预设，例如将 JSX 转换为函数.
更新 webpack.config.js
```javascript
module: {
  rules: [
    {
      test: /\.js$/, // 匹配.js 文件
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }
  ]
}
```
根目录下创建并配置.babelrc 文件
```json
{
"presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
配置 HtmlWebPackPlugin

这个插件最主要的作用是将 js 代码通过<script>标签注入到 HTML 文件中
```bash
npm i html-webpack-plugin -D
```
webpack 新增 HtmlWebPackPlugin 配置

至此，我们看一下 webpack.config.js 文件的完整结构
```js
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(**dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: path.resolve(**dirname, 'dist/index.html')
    })
  ]
};
```
更新 package.json 文件
```json
"start": "./node_modules/.bin/webpack --config webpack.config.js"
```
执行 npm run start，生成 dist 文件夹

当前目录结构如下
目录结构

可以看到在 dist 文件加下生成了 index.html 文件，我们在浏览器中打开文件即可看到 App 组件内容。

配置 webpack-dev-server
webpack-dev-server 可以极大的提高我们的开发效率，通过监听文件变化，自动更新页面

安装 webpack-dev-server 作为 dev 依赖项
```bash
npm i webpack-dev-server -D
```
更新 package.json 的启动脚本
```json
"dev": "webpack-dev-server --config webpack.config.js --open"
```
webpack.config.js 新增 devServer 配置
```js
devServer: {
  hot: true, // 热替换
  contentBase: path.join(**dirname, 'dist'), // server 文件的根目录
  compress: true, // 开启 gzip
  port: 8080, // 端口
},
plugins: [
  new webpack.HotModuleReplacementPlugin(), // HMR 允许在运行时更新各种模块，而无需进行完全刷新
  new HtmlWebPackPlugin({
    template: './index.html',
    filename: path.resolve(**dirname, 'dist/index.html')
  })
]
```
引入 redux
redux 是用于前端数据管理的包，避免因项目过大前端数据无法管理的问题，同时通过单项数据流管理前端的数据状态。
创建多个目录

新建 src/actions 目录，用于创建 action 函数
新建 src/reducers 目录，用于创建 reducers
新建 src/store 目录，用于创建 store
下面我们来通过 redux 实现一个计数器的功能

安装依赖
```bash
npm i redux react-redux -D
```
在 actions 文件夹下创建 index.js 文件
```js
export const increment = () => {
  return {
    type: 'INCREMENT',
  };
};
```
在 reducers 文件夹下创建 index.js 文件
```js
const initialState = {
  number: 0
};

const incrementReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREMENT': {
      state.number += 1
        return { ...state }
      break
    };
    default: return state;
  }
};
export default incrementReducer;
```
更新 store.js
```js
import { createStore } from 'redux';
import incrementReducer from './reducers/index';

const store = createStore(incrementReducer);

export default store;
```
更新入口文件 app.js
```js
import App from './src/views/App';
import ReactDom from 'react-dom';
import React from 'react';
import store from './src/store';
import { Provider } from 'react-redux';

ReactDom.render(
<Provider store={store}>
  <App />
</Provider>
, document.getElementById('root'));
```
更新 App 组件
```js
import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../../actions/index';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.dispatch(increment())
    }

    render() {
        return (
            <div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick()}>点击+1</button></div>
            </div>
        );
    }

}
export default connect(
state => ({
  number: state.number
  })
)(App);
```
点击旁边的数字会不断地+1

引入 redux-saga
redux-saga 通过监听 action 来执行有副作用的 task，以保持 action 的简洁性。引入了 sagas 的机制和 generator 的特性，让 redux-saga 非常方便地处理复杂异步问题。
redux-saga 的原理其实说起来也很简单，通过劫持异步 action，在 redux-saga 中进行异步操作，异步结束后将结果传给另外的 action。
下面就接着我们计数器的例子，来实现一个异步的+1 操作。

安装依赖包
```bash
npm i redux-saga -D
```
新建 src/sagas/index.js 文件
```js
import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

export function\* incrementAsync() {
  yield delay(2000)
  yield put({ type: 'INCREMENT' })
}

export function\* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
```
解释下所做的事情，将 watchIncrementAsync 理解为一个 saga，在这个 saga 中监听了名为 INCREMENT_ASYNC 的 action，当 INCREMENT_ASYNC 被 dispatch 时，会调用 incrementAsync 方法，在该方法中做了异步操作，然后将结果传给名为 INCREMENT 的 action 进而更新 store。

更新 store.js

在 store 中加入 redux-saga 中间件
```js
import { createStore, applyMiddleware } from 'redux';
import incrementReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga'
import { watchIncrementAsync } from './sagas/index'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(incrementReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchIncrementAsync)
export default store;
```
更新 App 组件

在页面中新增异步提交按钮，观察异步结果
```js
import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../../actions/index';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.dispatch(increment())
    }

    onClick2() {
        this.props.dispatch({ type: 'INCREMENT_ASYNC' })
    }

    render() {
        return (
            <div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick()}>点击+1</button></div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick2()}>点击2秒后+1</button></div>
            </div>
        );
    }

}
export default connect(
  state => ({
  number: state.number
})
)(App);
```

观察结果我们会发现如下报错：

这是因为在 redux-saga 中用到了 Generator 函数，以我们目前的 babel 配置来说并不支持解析 generator，需要安装@babel/plugin-transform-runtime
```bash
npm install --save-dev @babel/plugin-transform-runtime
```
这里关于 babel-polyfill、和 transfor-runtime 做进一步解释

babel-polyfill
Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。
babel-runtime
Babel 转译后的代码要实现源代码同样的功能需要借助一些帮助函数，而这些帮助函数可能会重复出现在一些模块里，导致编译后的代码体积变大。
Babel 为了解决这个问题，提供了单独的包 babel-runtime 供编译模块复用工具函数。
在没有使用 babel-runtime 之前，库和工具包一般不会直接引入 polyfill。否则像 Promise 这样的全局对象会污染全局命名空间，这就要求库的使用者自己提供 polyfill。这些 polyfill 一般在库和工具的使用说明中会提到，比如很多库都会有要求提供 es5 的 polyfill。
在使用 babel-runtime 后，库和工具只要在 package.json 中增加依赖 babel-runtime，交给 babel-runtime 去引入 polyfill 就行了；
详细解释可以参考

babel presets 和 plugins 的区别
Babel 插件一般尽可能拆成小的力度，开发者可以按需引进。比如对 ES6 转 ES5 的功能，Babel 官方拆成了 20+个插件。
这样的好处显而易见，既提高了性能，也提高了扩展性。比如开发者想要体验 ES6 的箭头函数特性，那他只需要引入 transform-es2015-arrow-functions 插件就可以，而不是加载 ES6 全家桶。
但很多时候，逐个插件引入的效率比较低下。比如在项目开发中，开发者想要将所有 ES6 的代码转成 ES5，插件逐个引入的方式令人抓狂，不单费力，而且容易出错。
这个时候，可以采用 Babel Preset。
可以简单的把 Babel Preset 视为 Babel Plugin 的集合。比如 babel-preset-es2015 就包含了所有跟 ES6 转换有关的插件。
更新.babelrc 文件配置，支持 genrator
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    ["@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

点击按钮会在 2 秒后执行+1 操作。

引入 react-router
在 web 应用开发中，路由系统是不可或缺的一部分。在浏览器当前的 URL 发生变化时，路由系统会做出一些响应，用来保证用户界面与 URL 的同步。随着单页应用时代的到来，为之服务的前端路由系统也相继出现了。而 react-route 则是与 react 相匹配的前端路由。
引入 react-router-dom
```bash
npm install --save react-router-dom -D
```
更新 app.js 入口文件增加路由匹配规则
```js
import App from './src/views/App';
import ReactDom from 'react-dom';
import React from 'react';
import store from './src/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const About = () => <h2>页面一</h2>;
const Users = () => <h2>页面二</h2>;

ReactDom.render(
<Provider store={store}>
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
    </Switch>
  </Router>
</Provider>
, document.getElementById('root'));
```
更新 App 组件，展示路由效果
```js
import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../../actions/index';
import { Link } from "react-router-dom";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.dispatch(increment())
    }

    onClick2() {
        this.props.dispatch({ type: 'INCREMENT_ASYNC' })
    }

    render() {
        return (
            <div>
                <div>react-router 测试</div>
                <nav>
                    <ul>
                    <li>
                        <Link to="/about/">页面一</Link>
                    </li>
                    <li>
                        <Link to="/users/">页面二</Link>
                    </li>
                    </ul>
                </nav>

                <br/>
                <div>redux & redux-saga测试</div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick()}>点击+1</button></div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick2()}>点击2秒后+1</button></div>
            </div>
        );
    }

}
export default connect(
state => ({
number: state.number
})
)(App);
```
点击列表可以跳转相关路由

总结
至此，我们已经一步步的，完成了一个简单但是功能齐全的 react 项目的搭建，下面回顾一下我们做的工作

引入 webpack
引入 react
引入 babel 解析 react
接入 webpack-dev-server 提高前端开发效率
引入 redux 实现一个 increment 功能
引入 redux-saga 实现异步处理
引入 react-router 实现前端路由
麻雀虽小，五脏俱全，希望通过最简单的代码快速的理解 react 工具链。其实这个小项目中还是很多不完善的地方，比如说样式的解析、Eslint 检查、生产环境配置，虽然这几项是一个完整项目不可缺少的部分，但是就 demo 项目来说，对我们理解 react 工具链可能会有些干扰，所以就不在项目中加了。
后面我会新建一个分支，把这些完整的功能都加上，同时也会对当前的目录结构进行优化。
