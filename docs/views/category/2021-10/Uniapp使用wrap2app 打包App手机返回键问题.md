---
title: Uniapp使用wrap2app 打包App手机返回键问题
date: 2021-10-15
tags:
  - Javascript
  - Uniapp
categories:
  - 前端
---


### 首先创造一个appback.js
>  这里是监听手机物理返回键的js
```js
let firstBack = null;
document.addEventListener('plusready', function(es) {
    if (!window.plus) return;
    plus.navigator.setFullscreen(false);
    const webview = plus.webview.currentWebview();
    const platform = uni.getSystemInfoSync().platform;
    const main = platform == "android" ? plus.android.runtimeMainActivity() :plus.ios.runtimeMainActivity();
    let first = null;
	plus.key.addEventListener('backbutton',1.
 function() {
	    webview.canBack(function(e) {
		plus.nativeUI.toast = (function(str) {
		    if (str.indexOf('再按一次') != -1) {
		    plus.nativeUI.closeToast();
		}
	    });
	    if (e.canBack) {
		webview.back();
	    } else {
		if (!first) {
	            window.history.back();
		    first = new Date().getTime()
		    setTimeout(function() {
			first = null;
		    }, 1000)
		} else {
		    if (new Date().getTime() - first < 1000) {
			plus.android.invoke(main, "moveTaskToBack", false) || plus.ios.invoke(main, "moveTaskToBack", false)
		    }
	        }
	    }
        })
    }, false);
})
```
> 重写页面的onBackPress
1. uni-app自定义返回逻辑教程
![QQ截图20201012111052.png](http://www.lxit365.com/fileUpload/static/upload/image/20201012/a536a043021549ea8c58af8bc49fd93a.png)
2. 详细可查看地址[uni-app自定义返回逻辑教程](https://ask.dcloud.net.cn/article/35120)
3. 我这里是这样写的，绑定到了uniapp global上
```js
global.onBackPress = (options) => {
    const webview = plus.webview.currentWebview();
    webview.canBack(function(e) {
        if (e.canBack) {
	    webview.back();
        }
    });
}
```
> 页面使用
```js
// 只有在该函数中返回值为 true 时，才表示不执行默认的返回，自行处理此时的业务逻辑。
if(window.plus){
    global.onBackPress();
    return true;
}
    return false;
}
```