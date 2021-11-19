(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{567:function(t,s,a){"use strict";a.r(s);var p=a(10),n=Object(p.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"_1-首先安装python3-8"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-首先安装python3-8"}},[t._v("#")]),t._v(" 1. 首先安装python3.8")]),t._v(" "),a("ol",[a("li",[t._v("Python for Windows： "),a("a",{attrs:{href:"https://www.python.org/ftp/python/3.8.6/python-3.8.6rc1-amd64.exe",target:"_blank",rel:"noopener noreferrer"}},[t._v("window 下载"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("tip: 在安装时最下面勾选加入path")]),t._v(" "),a("li",[t._v("安装成功后命令行中直接输入python如下显示即为安装成功，安装python几乎不会出错。\n"),a("img",{attrs:{src:"http://www.lxit365.com/fileUpload/static/upload/image/20200910/d6d310d99c4d49528e465dbde474335e.png",alt:"截图"}})])]),t._v(" "),a("h3",{attrs:{id:"_2-python更新pip-提示-如果安装过程中出现报错pip版本太低-即刻升级pip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-python更新pip-提示-如果安装过程中出现报错pip版本太低-即刻升级pip"}},[t._v("#")]),t._v(" 2. Python更新pip(提示：如果安装过程中出现报错pip版本太低，即刻升级pip)")]),t._v(" "),a("ol",[a("li",[t._v("python -m pip install --upgrade pip （可能报错，如果报错用以下语句解决）\n"),a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20190407214406266.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMTA1ODMx,size_16,color_FFFFFF,t_70",alt:"图片"}})]),t._v(" "),a("li",[t._v("python -m pip install -U --force-reinstall pip")]),t._v(" "),a("li",[t._v("完美解决\n"),a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20190407214739200.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMTA1ODMx,size_16,color_FFFFFF,t_70",alt:"图片"}})])]),t._v(" "),a("h3",{attrs:{id:"_4-安装scrapy-for-windows"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-安装scrapy-for-windows"}},[t._v("#")]),t._v(" 4. 安装scrapy for Windows")]),t._v(" "),a("ol",[a("li",[t._v("(由于Twisted安装会报错)这里提供一个链接下载Twisted （此版本是python3.8 64 位）")]),t._v(" "),a("li",[t._v("链接：https://pan.baidu.com/s/1KTwxzqQBlNtyjKsJfBGbQw\n提取码：p4j5")])]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 安装前依赖")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# pip install wheel Lxml Pywin32 ")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# pip install Twisted-20.3.0-cp38-cp38-win_amd64.whl")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# pip install scrapy")]),t._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("安装完毕输入scrapy 出现安装成功\n"),a("img",{attrs:{src:"http://www.lxit365.com/fileUpload/static/upload/image/20200910/ea7ce41eb10144b38f2b83ac6e5adf52.png",alt:"图片"}})])]),t._v(" "),a("h3",{attrs:{id:"_5-pip-设置国内镜像"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-pip-设置国内镜像"}},[t._v("#")]),t._v(" 5. pip 设置国内镜像")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 临时使用pypi国内镜像源地址 - 从阿里云镜像源安装 scrapy")]),t._v("\npip install scrapy "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("i https"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("//")]),t._v("mirrors"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("aliyun"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("pypi"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("simple"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 永久全局设置pypi国内镜像源地址")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# 如果你只想为当前用户设置，你也可以去掉下面的"--global"选项')]),t._v("\npip config "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("global")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("set")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("global")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("index"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("url https"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("//")]),t._v("\nmirrors"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("aliyun"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("pypi"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("simple"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 设置镜像 文件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 用户目录创建pip.ini")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 内容")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("global")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\nindex"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("url "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" https"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("//")]),t._v("mirrors"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("aliyun"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("pypi"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("simple"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);