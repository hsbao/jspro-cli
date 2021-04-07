# 快速搭建和开发前端项目的CLI工具

## 安装
```js
yarn add -g jspro-cli
# OR
npm install -g jspro-cli
```

## 创建项目
&emsp;&emsp;:tada:可快速本地目录为你创建项目并安装相关开发依赖（目前只支持创建Vue项目）~

```js
jspro init
```

## 创建页面及路由

```js
jspro page PageName  # jspro page Home，默认会放到src/pages/home/Home.vue中，并且会创建src/page/home/router.js 
jspro p PageName -d src/pages/home # 也可以指定存放的具体文件夹 
```

## 创建组件

```js
jspro component ComponentName  # jspro component NavBar，默认会存放到src/components文件夹中 
jspro c ComponentName -d src/pages/home # 也可以指定存放的具体文件夹 
```

## 创建vuex子模块

```js
jspro store ModuleName # jspro addstore home，默认会放到src/store/modules/home/index.js和types.js 
jspro s ModuleName -d src/vuex/modules # 也可以指定文件夹 
```
