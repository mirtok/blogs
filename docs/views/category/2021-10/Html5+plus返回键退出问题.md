---
title: Html5+Plus返回键退出问题
date: 2021-10-15
tags:
  - Html5+Plus
  - Javascript
categories:
  - 前端
---

### 1.新建listenrBack.js
```js
document.addEventListener('plusready', function (es) {
    if (!window.plus) return;
    var first = null
    var webview = plus.webview.currentWebview(); //获取当前页面的webview对象
    plus.key.addEventListener('backbutton', function () {
        webview.canBack(e => { // canBack函数用于查询Webview窗口是否可后退
            if (e.canBack) { //判断是否可以后退
                webview.back() // 调用当前webview的后退
            } else { // else代码块表示不能后退，也就意味着回退到首页了
                if (!first) { //连按两次退出程序的功能实现
                    first = new Date().getTime()
                    plus.nativeUI.toast('再按一次退出应用');
                    setTimeout(function () {
                        first = null
                    }, 1000)
                } else {
                    if (new Date().getTime() - first < 1000) { //这里的1000是指两次按键的时间间隔在1秒内就退出应用
                        plus.runtime.quit() //退出应用
                    }
                }
            }
        })
    }, false);
})
```