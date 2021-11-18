---
title: Vue H5微信、支付宝支付
date: 2021-10-15
tags:
  - Javascript
  - Uniapp
  - Vue
categories:
  - 前端
---

## vue h5 支付
#### 1. 看一波流程图
![vue0062.c9931150.png](http://www.lxit365.com/fileUpload/static/upload/image/20201019/874e2dea275547dd9ed4adc4e5dd9757.png)
#### 2. 支付宝 +h5 支付
- 支付宝 h5 支付操作起来是超级简单的，前端关键代码如下：
- 代码如下
```js
methods: {
	async doPayAlipay() {
		const res = await this.$apis.doPayAlipay({
			oid: res.data,
			// 取到的交易订单号
			url: yourBackUrl // 成功后的回调地址
		})

		if (res.code === 1) {
			// 避免时间间隙造成的用户误操作，尽管拿到数据了仍然显示loading...直到跳转到支付宝的提供的页面
			this.$toast.loading({
				mask: true,
				message: '加载中...'
			});
			// 取回来的是支付宝提供的一段自执行的form表单代码
			// 这里我把这段代码插入页面中，并手动触发
			const div = document.createElement('div');
			div.innerHTML = res.data.form;
			document.body.appendChild(div);
			document.forms[0].submit();
		}
	}
}
```
#### 3. 微信支付
-  微信的 wap 端支付分两种，一种是微信内的公众号支付，一种是微信外的 H5 支付
-  公众号支付是用户在微信中打开商户的 H5 页面，商户在 H5 页面通过调用微信支付提供的 JSAPI 接口调起微信支付模块完成支付。
-  [公众号支付开发者文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&index=6)
-  openid 是微信用户在公众号 appid 下的唯一用户标识（appid 不同，则获取到的 openid 就不同），可用于永久标记一个用户，同时也是微信公众号支付的必传参数。[网页授权获取用户 openid 接口文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
1. 发起支付的关键代码(内置对象WeixinJSBridgeReady)
```js
methods: {
     weixinPay() {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
		document.addEventListener("WeixinJSBridgeReady", this.onBridgeReady(data), false);
	    } else if (document.attachEvent) {
	        document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady(data));
		document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady(data));
	    }
	} else {
	    this.onBridgeReady(data);
	}
    },
    onBridgeReady() {
	WeixinJSBridge.invoke("getBrandWCPayRequest", {
	    appId: data.appid,
	    //公众号名称，由商户传入
	    timeStamp: data.timestamp,
	    //时间戳，自1970年以来的秒数
	    nonceStr: data.nonce_str,
	    //随机串
	    package: data.prepay_id,
	    //订单详情扩展字符串
	    signType: data.signType,
	    //微信签名方式：
	    paySign: data.paySign,
	    //微信签名
        },
	res = >{
	    if (res.err_msg == "get_brand_wcpay_request:ok") {
		// ...
		} else {
		    alert("支付失败！");
		}
	});
    }
}
```
2. 微信公众号支付 jssdk jsapi实现微信支付
- 先在当前项目的命令行工具里安装npm install weixin-jsapi
- 在当前支付页面引用该weixin-jsapi
```js
import wx from 'weixin-jsapi'
```
- 完整代码
```js
import wx from 'weixin-js-sdk';
const wexinPay = (data, cb, errorCb) => {
    let [appId, timestamp, nonceStr, signature, packages, paySign] = [data.appId, data.timeStamp, data.nonceStr, data.signature,data.package, data.paySign];
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名，见附录1
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
 
    wx.ready(function() {
        wx.chooseWXPay({
            timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr, // 支付签名随机串，不长于 32 位
            'package': packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign, // 支付签名
            success(res) {
                // 支付成功后的回调函数
                cb(res);
            },
            fail(res) {
                errorCb(res);
            }
        });
    });
 
    wx.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        alert("config信息验证失败");
    });
}
 
export default wexinPay;

3.    微信外的 H5 支付
- H5 支付是指商户在微信客户端外的移动端网页展示商品或服务，用户在前述页面确认使用微信支付时，商户发起本服务呼起微信客户端进行支付。主要用于触屏版的手机浏览器请求微信支付的场景。可以方便的从外部浏览器唤起微信支付。注意：H5 支付不建议在 APP 端使用，如需要在 APP 中使用微信支付，请接 APP 支付。
-  [H5 支付开发文档](https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_4)
-  微信外的 h5 支付需要前端做的就简单多了，关键代码如下：
```js
methods: {
  async doPaySubmit() {
    const res = await this.$apis.doWechatPay({ oid: '', trade_type: 'MWEB'})
    if(res.code===1){                     
        window.location.replace(res.data.mweb_url+'&redirect_url='+encodeURIComponent(window.location.href+'&tip=yes'))
    }
  }
}
```
- 注意有坑：
- 1、需对 redirect_url 进行 urlencode 处理
- 2、由于设置 redirect_url 后，回跳指定页面的操作可能发生在：a.微信支付中间页调起微信收银台后超过 5 秒 b.用户点击“取消支付“或支付完成后点“完成”按钮。因此无法保证页面回跳时，支付流程已结束，所以商户设置的 redirect_url 地址不能自动执行查单操作，应让用户去点击按钮触发查单操作。