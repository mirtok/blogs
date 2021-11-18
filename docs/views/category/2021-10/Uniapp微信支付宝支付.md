---
title: Uniapp微信支付宝支付
date: 2021-10-15
tags:
  - Javascript
  - Uniapp
categories:
  - 前端
---


### 1.uniapp 支付前端处理：
```js
// 发送到后台的数据
const payData = {
	"isUpgrade": 'N',
	"lavel": level,
	"userid": this.user.id // 用户id
}
uni.getProvider({
    service: 'payment',
    success: function (res) {
		if(res.provider && res.provider.length > 0){
			if(_self.isWxPay){ // 微信支付
				if(res.provider.indexOf('wxpay') > -1){
					uni.request({
						url: "https://www.xxx.com/pay/wxpay", // 后台请求微信服务器
						data: payData,
						method: 'POST',
						success: (result) => {
							if(result.data.code == 200){
								var data = result.data;
								var obj = {
									"partnerid": data.app_result.partnerid,
									"prepayid": data.app_result.prepayid,
									"package": "Sign=WXPay",
									"appid": data.app_result.appid,
									"noncestr": data.app_result.noncestr,
									"timestamp": data.app_result.timestamp,
									"sign": data.app_result.sign
								}
								uni.requestPayment({
								    provider: 'wxpay',
								    orderInfo: obj,
								    success: function (res) {
										// 支付成功回调
								        console.log('success:' + JSON.stringify(res));
										// 支付成功通知。。。
								    },
								    fail: function (err) {
										// 支付失败回调
								        console.log('fail:' + JSON.stringify(err));
								    }
								});
							}else{
								// 失败回调
							}
						},
						fail: (e) => {
							console.log(e);
						}
					});
				}else{
					// 没有安装微信
					uni.showToast({
						icon: "none",
						title: "请先安装微信"
					})
				}
			}else{ // 支付宝支付
				if(res.provider.indexOf('alipay') > -1){
					uni.request({
						url: "https://www.xxx.com/pay/alipay",
						data: payData,
						method: 'POST',
						success: (result) => {
							console.log(result);
							if(result.data){
								if(result.data.code && result.data.code != 200){
									// 后台请求支付宝失败
								}else{
									uni.requestPayment({
									    provider: 'alipay',
									    orderInfo: result.data,
									    success: function (res) {
									    	// 支付成功回调
									        console.log('success:' + JSON.stringify(res));
									    },
									    fail: function (err) {
									    	// 支付失败回调
									        console.log('fail:' + JSON.stringify(err));
									    }
									});
								}
							}else{
								uni.showToast({
									icon: "none",
									title: "请求失败"
								})
							}
						},
						fail: (e) => {
							console.log(e);
						}
					});
				}else{
					// 没有安装支付宝
					uni.showToast({
						icon: "none",
						title: "请先安装支付宝"
					})
				}
			}
		}else{
			uni.showToast({
				icon: "none",
				title: "获取支付通道失败，请先安装微信或支付宝"
			})
		}
    }
});
```