(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{555:function(a,t,s){"use strict";s.r(t);var e=s(10),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h3",{attrs:{id:"linux安装jdk-两种方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#linux安装jdk-两种方式"}},[a._v("#")]),a._v(" Linux安装jdk(两种方式)")]),a._v(" "),s("h4",{attrs:{id:"_1-不管那一步都要查看系统是否自带jdk"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-不管那一步都要查看系统是否自带jdk"}},[a._v("#")]),a._v(" 1.   不管那一步都要查看系统是否自带jdk")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 卸载系统自带的OpenJDK以及相关的java文件 ")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# java -version 结果 存在")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看相关java文件 rpm -qa | grep java")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 删除相关文件")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("rpm")]),a._v(" -e --nodeps java-1.8.0-openjdk-headless-1.8.0.65-3.b17.el7.x86_64\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("rpm")]),a._v(" -e --nodeps java-1.8.0-openjdk-1.8.0.65-3.b17.el7.x86_64\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看删除结果")]),a._v("\n  java -version\n\n")])])]),s("h4",{attrs:{id:"yum-安装jdk1-8"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yum-安装jdk1-8"}},[a._v("#")]),a._v(" yum 安装jdk1.8")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#查询 jdk")]),a._v("\n    yum -y list java*\n")])])]),s("ol",[s("li",[a._v("查询 jdk      yum -y list java*\n"),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/b2199c2ec832189bc052a2fe99d3f1be.png",alt:"dw"}})]),a._v(" "),s("li",[a._v("安装jdk1.8")]),a._v(" "),s("li",[a._v("yum install -y java-1.8.0-openjdk.x86_64")]),a._v(" "),s("li",[a._v("java -version")]),a._v(" "),s("li",[a._v("这样就安装成功了。默认给安装到usr/lib/jvm/")])]),a._v(" "),s("h3",{attrs:{id:"手动安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#手动安装"}},[a._v("#")]),a._v(" 手动安装")]),a._v(" "),s("ol",[s("li",[a._v("先去官网下载jdk1.8")]),a._v(" "),s("li",[s("a",{attrs:{href:"https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("点我快速进入官网"),s("OutboundLink")],1),a._v(" "),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/b58b387f6d9d120dcdf603d7ef740b60.png",alt:"jdk"}})]),a._v(" "),s("li",[a._v("没有账号需要注册一下oracle账号。\n"),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/22b2bb69449836b883b79e5232e85de7.png",alt:"orcle"}}),a._v(" "),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/30190dbdf46ad9061cd66313f5090751.png",alt:"orcle"}})]),a._v(" "),s("li",[a._v("第一次注册需要邮箱激活一下。\n"),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/43f03de8df78085df815f73c2d7b064e.png",alt:"激活"}})]),a._v(" "),s("li",[a._v("然后就可以用邮箱+密码直接登录。 登录完之后可以直接下载！\n"),s("img",{attrs:{src:"F:%5Cpress-project%5Cmy-blog%5Cdocs%5Cviews%5Ccategory%5C2021-10%5Cttps:%5Cimg.cnbuilder.cn%5Cblog%5Ca827f3f1d1fe4d79e676a9b0dad01423.png",alt:"jdk"}})]),a._v(" "),s("li",[a._v("服务器创建文件夹")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#进入根目录")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" / \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#在根目录创建jdk目录")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("mkdir")]),a._v(" jdk\n")])])]),s("ol",{attrs:{start:"7"}},[s("li",[a._v("上传服务器\n"),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/17ed2091594b95e98d509c6209c0c9b9.png",alt:"jdk"}})]),a._v(" "),s("li",[a._v("上传完成：在jdk目录下ll查询一下\n"),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/9e4d0b36afc29e5f0b17d028c28f6cd9.png",alt:"jdk"}})]),a._v(" "),s("li",[a._v("解压jdk：\n"),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/2911257ab0a4f08c8bc4ccd437f1db39.png",alt:"jdk"}})]),a._v(" "),s("li",[a._v("命令tar -zxvf jdk-8u211-linux-x64.tar.gz（jdk-8..这个是刚下载的jdk名称）")]),a._v(" "),s("li",[a._v("解压成功\n"),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/4a258c463f0b48b8fa8524c0674b93b6.png",alt:"jdk"}})]),a._v(" "),s("li",[a._v("配置环境变量 vim /etc/profile\n"),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/38b4970cd0dc808242b78837f88626b1.png",alt:"jdk"}})]),a._v(" "),s("li",[a._v("配置一下环境变量代码：\n"),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/3c724dcd1aad89fd0dd8a83128aae568.png",alt:"jdk"}})])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#将以下命令放到环境变量 注意文件夹名称")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("JAVA_HOME")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("/DATA/jdk/jdk1.8.0_211 \n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLASSPATH")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("$:CLASSPATH:"),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$JAVA_HOME")]),a._v("/lib/ \n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("PATH")])]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$PATH")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$JAVA_HOME")]),a._v("/bin\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#点击esc 进入命令模式 输入：wq! 保存修改信息")]),a._v("\n")])])]),s("p",[s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/728c14268b0f2a36cd558f1cbf6b2cb8.png",alt:"jdk"}}),a._v("\n14.   刷新环境变量文件： 刷新环境变量命令:source /etc/profile\n"),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/740b8a257ab422b620bf2046eb5d52e0.png",alt:"jdk"}}),a._v("\n15.   查看是否安装成功: 查询jdk版本命令： java -version\n"),s("img",{attrs:{src:"https://img.cnbuilder.cn/blog/f812303af87104b974a9bcc4f3f9c561.png",alt:"jdk"}}),a._v("\n16.   关于如果没有oracle账号的效果版可以看这里\n"),s("a",{attrs:{href:"http://bugmenot.com/view/oracle.com",target:"_blank",rel:"noopener noreferrer"}},[a._v("点我获取账号哦!"),s("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=n.exports}}]);