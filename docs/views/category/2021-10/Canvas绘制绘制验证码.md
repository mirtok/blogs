---
title: Canvas绘制绘制验证码
date: 2021-10-15
tags:
  - Canvas
categories:
  - 前端
---

### 1.代码如下：
```js
function drawCode() {
	this.show_num = '';
	let canvas_width = this.$refs.canvas.offsetWidth;
	let canvas_height = this.$refs.canvas.offsetHeight;
	let canvas = this.$refs.canvas;//获取到canvas的对象
	let context = canvas.getContext('2d');//获取到canvas画图的环境，演员表演的舞台
	canvas.width = canvas_width;
	canvas.height = canvas_height;
	let sCode = 'a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0';
	let aCode = sCode.split(',');
	let aLength = aCode.length;//获取到数组的长度
	for (let i = 0; i < 4; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
		let j = Math.floor(Math.random() * aLength);//获取到随机的索引值
		// let deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
		let deg = Math.random() - 0.5; //产生一个随机弧度
		let txt = aCode[j];//得到随机的一个内容
		this.show_num += txt.toLowerCase();
		let x = 10 + i * 20;//文字在canvas上的x坐标
		let y = 20 + Math.random() * 5;//文字在canvas上的y坐标
		context.font = 'bold 22px 微软雅黑';
		context.translate(x, y);
		context.rotate(deg);
		context.fillStyle = this.randomColor();
		context.fillText(txt, 0, 0);
		context.rotate(-deg);
		context.translate(-x, -y);
	}
	for (let i = 0; i <= 5; i++) { //验证码上显示线条
		context.strokeStyle = this.randomColor();
		context.beginPath();
		context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.stroke();
	}
	for (let i = 0; i <= 30; i++) { //验证码上显示小点
		context.strokeStyle = this.randomColor();
		context.beginPath();
		let x = Math.random() * canvas_width;
		let y = Math.random() * canvas_height;
		context.moveTo(x, y);
		context.lineTo(x + 1, y + 1);
		context.stroke();
	}
}
function randomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}
```