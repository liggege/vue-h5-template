## VUE-H5-TEMPLATE

<p>
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-3.0.0-brightgreen.svg" alt="vue">
  </a>
  </a>
    <a href="https://youzan.github.io/vant/#/zh-CN/">
    <img src="https://img.shields.io/badge/vant-3.0.3-brightgreen.svg" alt="vant">
  </a>
  <a href="https://github.com/Ewall1106/panda-vue-template/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>

 `Vue3.0+Typescript+Vant` 搭建 `移动端h5页面` 开发所需的基础模板，并提供一些通用型的解决方案及扩展功能。


## 安装使用

```bash
# 项目下载

$ git clone 

# 安装运行
$ yarn & yarn dev
```

## 功能特性

开发规范

- `Eslint` 校检及错误提示
- `Prettier` 统一代码风格
- `StyleLint` 样式风格
- `Typescript` 语法支持

初始化配置

- `vw` 移动端适配
- `css` 预处理器
- 浏览器默认样式处理
- `promise` 降级
- `fast-click` 处理

基础功能

- `vuex4.0` 封装及使用
- `vue-router4.x` 路由配置及权限控制
- `axios+typescript` 封装及请求
- `composition-api` 及自定义 `hooks` 封装

组件相关

- `vant` 组件的安装及使用
- `scroll` 横向滚动组件封装
- `svg-icon` 图标组件

其它方面

- `vscode` 调试
- ....

## 目录结构

```bash
|-- public                // public
|-- config                // config配置文件
|-- src
|   |-- api               // 接口列表
|   |-- assets            // 图片资源
|   |-- components        // 公共组件
|   |-- hooks             // 全局hooks
|   |-- icons             // svg图标
|   |-- router            // 路由
|   |-- store             // vuex
|   |-- styles            // 公共样式
|   |-- types             // 文件声明
|   |-- utils             // 工具函数
|   |-- views             // 各级页面
|   |   |-- home          // 首页
|   |   |   |-- components   // 局部组件
|   |   |   |-- hooks        // 局部hooks
|   |   |   |-- index.vue    // 页面
|   |   |-- user          // 用户
|   |   |-- ....          // ...
|   |-- App.vue           // 主页面
|   |-- main.js           // 入口文件
|-- .eslintrc.js          // eslint配置
|-- .prettierrc           // .prettier配置
|-- babel.config.js       // babel配置文件
|-- changelog.md          // 更新日志
|-- package.json          // 客户端依赖
|-- postcss.config.js     // postcss配置文件
|-- vue.config.js         // vue相关配置文件
|-- ...
```

目录说明：

- 目录 `components` 下的所有公共组件使用 [tsx](https://v3.vuejs.org/guide/render-function.html) 进行开发。
- 目录 `views` 下的业务组件使用 [sfc](https://cn.vuejs.org/v2/guide/single-file-components.html) 的形式进行开发。
- 为什么这样划分？对于公共组件来说，使用 `tsx` 开发更加灵活、渲染性能更好且更方便测试。对于业务组件，使用 `sfc` 的方式可以更好的发挥出 `vue` 的优势，简洁明了。

## 协议

