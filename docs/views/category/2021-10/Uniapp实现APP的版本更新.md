---
title: Uniapp实现APP的版本更新
date: 2021-10-15
tags:
  - Javascript
  - Uniapp
categories:
  - 前端
---

### 1.封装js 文件
```js
/**
 * 导入后台接口请求地址
 */
import {
	getVersion
} from '@/api/versionUpdate.js';
/**
 * 系统更新
 */d
const AndroidCheckSysUpdate = () => {
	uni.getSystemInfo({
		success: (res) => {
			//检测当前平台，如果是安卓则启动安卓更新  
			if (res.platform == "android") {
				getVersion({}).then(ver => {
					if (ver.flag != 1) {
						return uni.showToast({
							title: ver.message,
							icon: 'none'
						});
					}
					const versionNumber = ver.data.versionNumber; //版本号
					const appDownload = ver.data.appDownload; //下载地址
					const appVersionDesc = ver.data.app_version_desc; //更新描述
					plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
						// 如果版本不一样
						if (wgtinfo.version.toString() != versionNumber.toString()) {
							AndroidCheckUpdate(appDownload, appVersionDesc);
						}
					})
				})
			}
		}
	})
}

/**
 * 提示更新
 */
const AndroidCheckUpdate = (appDownload, appVersionDesc) => {
	uni.getNetworkType({
		success: function(res1) {
			if (res1.networkType != 'none') {
				uni.showModal({
					title: '版本更新',
					content: appVersionDesc,
					// content: `1. 用户签订协议的页面页面显示不全问题 \n2. 解决红包不能领取也在跳动bug \n3. APP升级后窗口提示更改`
					confirmText: '立即更新',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							doUpData(appDownload)
						}
					}
				});
			}
		}
	});
}

/**
 * 更新
 */
const doUpData = (appDownload) => {
	let dtask = plus.downloader.createDownload(appDownload, {},
		function(d, status) {
			// 下载完成
			if (status == 200) {
				plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, function(success) {

				}, function(error) {
					uni.showToast({
						title: '安装失败',
						mask: false,
						duration: 1500
					});
				})
			} else {
				uni.showToast({
					title: '更新失败',
					mask: false,
					duration: 1500
				});
			}
		});
	try {
		dtask.start(); // 开启下载的任务
		let prg = 0;
		let showLoading = plus.nativeUI.showWaiting("正在下载"); //创建一个showWaiting对象 
		dtask.addEventListener('statechanged', function(task, status) {
			// 给下载任务设置一个监听 并根据状态  做操作
			switch (task.state) {
				case 1:
					showLoading.setTitle("正在下载");
					break;
				case 2:
					showLoading.setTitle("已连接到服务器");
					break;
				case 3:
					prg = parseInt((parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100);
					showLoading.setTitle("  正在下载" + prg + "%  ");
					break;
				case 4:
					plus.nativeUI.closeWaiting();
					break;
			}
		});
	} catch (err) {
		plus.nativeUI.closeWaiting();
		uni.showToast({
			title: '更新失败',
			mask: false,
			duration: 1500
		});
	}
}




export default AndroidCheckSysUpdate;
```
### 2. 在index.vue 中的onload方法里面或者app.vue中的onLaunch中使用上部分：