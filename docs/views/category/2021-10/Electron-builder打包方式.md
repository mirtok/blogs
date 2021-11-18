---
title: Electron 打包方式
date: 2021-10-15
tags:
  - JavaScript
  - Electron
categories:
  - 前端
---

### 一. 分析两种打包方式
1. 使用 electron-packager 打包
2. 安装依赖
```shell
yarn add,n electron-packager --save-dev
```
3. 打包 (在 package.json 中添加 scripts)
```sh
"scripts": {
  "packager": "electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]"
}
```
4.最简单的就是直接运行 electron-pacager .进行打包默认情况下， appname 为 当前项目下的 package.json 文件中的 productName 或者 name 字段的值；platform 和 arch 则与主机一致，在 Windows 64位 下打包就是 Windows 64 位的版本。
5. ==electron-builder就是有比electron-packager有更丰富的的功能，支持更多的平台，同时也支持了自动更新。除了这几点之外，由electron-builder打出的包更为轻量，并且可以打包出不暴露源码的setup安装程序==
```txt
1. electron-builder 可以打包成msi、exe、dmg文件，macOS系统，只能打包dmg文件，window系统才能打包exe，msi文件；
2. 几乎支持了所有平台的所有格式
3. 支持Auto Update
4. 支持CLI和JS API两种使用方式
5. 打包方式配置较麻烦
6. 打包不建议使用cnpm 建议使用npm
```
### 二. electron-builder打包详解
1. 安装electron-builder
```shell
npm install -g electron-builder
```
2. 配置script
```json
"scripts": {
     "start": "electron .",
     "build": "rimraf pack && electron-builder --win --x64",
     "build:prod": "rimraf pack && electron-builder --win --x64",
     "build:mac-daily": "rm -rf pack && electron-builder --mac --x64 ",
     "build:mac-prod": "rm -rf pack && electron-builder --mac --x64 --config.productName=DEMO-electron",
     "build:linux-prod": "rm -rf pack && electron-builder --linux --x64 --config.productName=DEMO-electron"
},
```
3. 配置build
```json
"build": {
    "asar": true, // 设置为 true 可以把自己的代码合并并加密
    "productName": "短信发送平台", //项目名，也是生成的安装文件名，即aDemo.exe
    "appId": "com.send.app", // appid
    "copyright": "Copyright © 2014", //版权信息
    "directories": {
        "output": "pack" //输出文件路径
    },
    "publish": [
      {
        "provider": "generic", // 服务器提供商 也可以是GitHub等等
        "url": "http://xxxxx/" // 服务器地址
      }
    ],    
    "nsis": {  
        "oneClick": false, // 是否一键安装
        "perMachine": true,  //是否显示辅助安装程序的安装模式安装程序页面（选择按机器还是按用户）。或者是否始终按所有用户（每台计算机）安装。
        "allowElevation": true,  // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
        "allowToChangeInstallationDirectory": true, // 允许修改安装目录
        "installerIcon": "dist/favicon.ico", // 安装图标
        "uninstallerIcon": "dist/favicon.ico", //卸载图标
        "installerHeaderIcon": "dist/favicon.ico", // 安装时头部图标
        "createDesktopShortcut": true, // 创建桌面图标
        "createStartMenuShortcut": true, // 创建开始菜单图标
        "shortcutName": "短信发送平台", // 图标名称
        "license": "LICENSE.txt", // electron中LICENSE.txt所需要的格式，并非是GBK，或者UTF-8，LICENSE.txt写好之后，需要进行转化，转化为ANSI
    },
     "mac": {
        "category": "public.app-category.developer-tools", // 应用程序类别
        "target": ["dmg", "zip"],  // 目标包类型 
        "icon": "build/icon.icns" // 图标的路径
    },
    "dmg": {
        "background": "build/background.tiff or build/background.png", // 背景图像的路径
        "title": "标题",
        "icon": "build/icon.icns" // 图标路径
    },
    "win": {//win相关配置
        "icon": "dist/favicon.ico",//图标，当前图标在根目录下
        "target": [
            {
                "target": ["nsis","zip"], //利用nsis制作安装程序zip
                "arch": [
                    "x64" // x64-64位 ia32-32位
                ]
            }
        ]
    },
     "linux": {
          "icon": "build/icons"
    }
}
```
4. 执行命令
```sh
npm run build
```
5. 由于网络原因，各种包下载不下来，导致出错
- electron-builder 在打包时会检测cache中是否有electron 包，如果没有的话会从github上拉去，在国内网络环境中拉取的过程大概率会失败，所以你可以自己去下载一个包放到cache目录里
- 例如在macos平台打包electron应用，执行 electron-builder --mac --x64
```sh
➜  clipboard git:(master) ✗ npm run dist

> clipboard@1.0.0 dist /Users/xx/workspace/electron/clipboard
> electron-builder --mac --x64

  • electron-builder  version=22.3.2 os=18.7.0
  • loaded configuration  file=package.json ("build" field)
  • writing effective config  file=dist/builder-effective-config.yaml
  • packaging       platform=darwin arch=x64 electron=8.0.0 appOutDir=dist/mac
  • downloading     url=https://github.com/electron/electron/releases/download/v8.0.0/electron-v8.0.0-darwin-x64.zip size=66 MB parts=8
```
- 可以单独下载这个包 https://github.com/electron/electron/releases/download/v8.0.0/electron-v8.0.0-darwin-x64.zip， 放到~/Library/Caches/electron/ 目录下
- 各个平台的目录地址
```sh
Linux: $XDG_CACHE_HOME or ~/.cache/electron/
MacOS: ~/Library/Caches/electron/
Windows: %LOCALAPPDATA%/electron/Cache or ~/AppData/Local/electron/Cache/
```
- [参考地址](https://blog.csdn.net/weixin_41779718/article/details/106562736)