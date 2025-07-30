---
title: 介绍
order: 1
toc: menu
nav:
  title: 脚手架
  order: 1
---

## 介绍

脚手架

## 使用方法

米家生态链产品开发依赖小米的 miot plugin sdk，<code>git clone https://github.com/MiEcosystem/miot-plugin-sdk.git</code>，后进入 `projects` 目录使用脚手架命令。
![](./images//image_01.png 'image_01.png')

### 安装

```bash
npm install -g ymyy-cli
或
yarn add -g ymyy-cli
```

### 主要命令

```bash
// 创建项目
ymyy-cli create <项目目录名称>

// 打包项目
ymyy-cli build <项目目录名称>
```

### 创建项目

创建项目需要在 `projects` 目录下执行 `ymyy-cli create <项目目录名称>` 命令，例如`ymyy-cli create com.xiaomi.demo9527`,就会在 `projects` 目录下根据模板项目创建新产品项目，参考连接：[小米 iot 开发者平台-快速开始](https://iot.mi.com/v2/new/doc/plugin/overview#3.%20%E8%8E%B7%E5%8F%96%E6%89%A9%E5%B1%95%E7%A8%8B%E5%BA%8F%20SDK)。

### 打包项目

项目开发完成可以进行打包和发布新版本到米家 iot 平台，进行线上测试。在`projects`目录下执行 `ymyy-cli build <项目目录名称>` 命令把项目打包为一个 `publish.mpkg` 文件，默认放在 `/miot-plugin-sdk/projects/项目目录名称/build/publish.mpkg`，参考连接：[小米 iot 开发者平台-调试与测试](https://iot.mi.com/v2/new/doc/plugin/tutorial/dev#%E7%99%BD%E5%90%8D%E5%8D%95%E6%B5%8B%E8%AF%95)。
