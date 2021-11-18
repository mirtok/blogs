---
title: Uniapp简单实现手写签名
date: 2021-10-15
tags:
  - Html5+Plus
  - Javascript
  - Uniapp
categories:
  - 前端
---

### index.vue
```js
<template>
  <view>
	  <button type="primary" style="width: 724rpx;margin-bottom: 20rpx;" @click="signature">签名</button>
	  <view class="input_box" style="width: 30%;" v-if="params.signature_field">
	  	<view class="name">签名图片</view>
	  	<view class="upload_info">
	  		<view class="upload_img" v-if="params.signature_field">
	  			<image :src="'https://XXXX.XX.com/' + params.signature_field" mode="aspectFill"></image>
	  			<view class="delete" @click="removeSignImg"></view>
	  		</view>
	  	</view>
	  </view>
	  <signature canvasId="canvas1"  @close="close" @save="signFileUpdate" :visible="isShow" />
  </view>
</template>

<script>
	import signature from '@/components/signature/signature.vue'
	export default {
		components: {
			signature
		},
		data() {
			return {
				params:{
					signature_field:''
				},
				isShow:false
			}
		},
		methods:{
			signature(){
				this.isShow = true;
			},
			close(){
				this.isShow = false;
			},
			//签名图片上传
			signFileUpdate(val){
				let that = this
				that.isShow = false;
				uni.getFileInfo({
					filePath:val,
					success: (e) => {
						uni.uploadFile({
							header: {
								Authorization:  uni.getStorageSync('Authorization')
							},
							url: that.$fileUrl + 'saveFile', //仅为示例，非真实的接口地址
							filePath: val,
							name: 'file',
							fileType: 'image',
							formData: {
								type: 'image/png',
								size: e.size,
								name: 'file'
							},
							success: (uploadFileRes) => {
								that.params.signature_field = JSON.parse(uploadFileRes.data).data.ctBaseFile.id									
							},
							fail:(e)=>{
								that.errorMsg = JSON.stringify(e)
								uni.showToast({
									title:JSON.stringify(e)
								})
							}
						});
					},
					fail:(e)=>{}
				})
			},
		}
	}
</script>
```
### signature.vue
```vue
<template>
	<view v-if="visibleSync" class="cat-signature" :class="{'visible':show}" @touchmove.stop.prevent="moveHandle">
		<view class="mask" />
		<view class="content">
			<view style="text-align: right;border-bottom: 0.8px solid #F5F5F5">
				<image class="closeImg" @tap="close" src="http://www.lxit365.com/fileUpload/static/upload/image/20210310/32451573245844ee8cc65fd1f688ca5b.png"></image>
			</view>
			<canvas class='firstCanvas' :canvas-id="canvasId" @touchmove='move' @touchstart='start($event)'
				@touchend='end' @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error' />
			<view class="btns">
				<view class="btn" @tap="clear">清除</view>
				<view class="btn" style="background-color: #108EE9;" @tap="save">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvasw = res.windowWidth;
			canvash = canvasw * 9 / 16;
		},
	})
	export default {
		name: 'signature',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			canvasId: {
				type: String,
				default: 'firstCanvas'
			}
		},
		data() {
			return {
				show: false,
				visibleSync: false,
				signImage: '',
				hasDh: false,
			}
		},
		watch: {
			visible(val) {
				this.visibleSync = val;
				this.show = val;
				this.getInfo()
			}
		},

		created(options) {
			this.visibleSync = this.visible;
			this.getInfo();
			setTimeout(() => {
				this.show = this.visible;
			}, 100)
		},
		methods: {
			getInfo() {
				//获得Canvas的上下文
				content = uni.createCanvasContext(this.canvasId, this)
				//设置线的颜色
				content.setStrokeStyle("#000")
				//设置线的宽度
				content.setLineWidth(5)
				//设置线两端端点样式更加圆润
				content.setLineCap('round')
				//设置两条线连接处更加圆润
				content.setLineJoin('round')
			},
			// 
			close() {
				this.show = false;
				this.hasDh = false;
				this.$emit('close')
			},
			moveHandle() {

			},
			// 画布的触摸移动开始手势响应
			start(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y,
				}
				touchs.push(point);
				this.hasDh = true
			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},

			// 画布的触摸移动结束手势响应
			end: function(e) {
				//清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}

			},

			// 画布的触摸取消响应
			cancel: function(e) {},

			// 画布的长按手势响应
			tap: function(e) {},

			error: function(e) {},

			//绘制
			draw: function(touchs) {
				let point1 = touchs[0]
				let point2 = touchs[1]
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true);
				touchs.shift()

			},
			//清除操作
			clear: function() {
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
				// this.close()
				this.hasDh = false;
				this.$emit('clear')
			},
			save() {
				var that = this;
				if (!this.hasDh) {
					uni.showToast({
						title: '请先签字',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title: '生成中...',
					mask: true
				})
				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: this.canvasId,
						success: function(res) {
							that.signImage = res.tempFilePath;
							that.$emit('save', res.tempFilePath);
							uni.hideLoading()
							that.hasDh = false;
							that.show = false;
						},
						fail: function(err) {
							uni.hideLoading()
						}
					}, this)
				}, 100)
			}
		}
	}
</script>

<style lang="scss">
	.cat-signature.visible {
		visibility: visible
	}

	.cat-signature {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		z-index: 11;
		height: 100vh;
		visibility: hidden;

		.mask {
			display: block;
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .4);
			transition: opacity .3s;
		}

		.content {
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			width: 94%;
			height: 550upx;
			background: #fff;
			border-radius: 8upx;
			box-shadow: 0px 3px 3px #333;

			// canvas
			.firstCanvas {
				background-color: #fff;
				width: 100%;
				height: 400upx;
			}

			// canvas

			.btns {
				padding: 0 15px;
				height: 100upx;
				overflow: hidden;
				position: absolute;
				bottom: 6upx;
				left: 0;
				right: 0;
				margin: auto;
				display: flex;
				justify-content: space-between;

				.btn {
					width: 40%;
					text-align: center;
					font-size: 28upx;
					height: 60upx;
					line-height: 60upx;
					background-color: #999;
					color: #fff;
					border-radius: 6upx;
				}
			}

			.closeImg {
				width: 20px;
				height: 20px;
				margin-top: 5px;
				margin-right: 5px;
			}

		}
	}

	.visible .mask {
		display: block;
		opacity: 1
	}
</style>
```

