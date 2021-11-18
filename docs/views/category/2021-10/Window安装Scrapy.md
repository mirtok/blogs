---
title: Window安装Scrapy
date: 2021-10-15
tags:
  - Python
  - Scrapy
categories:
  - Python
---

### 1. 首先安装python3.8
1. Python for Windows： [window 下载](https://www.python.org/ftp/python/3.8.6/python-3.8.6rc1-amd64.exe)
2. tip: 在安装时最下面勾选加入path
3. 安装成功后命令行中直接输入python如下显示即为安装成功，安装python几乎不会出错。
![截图](http://www.lxit365.com/fileUpload/static/upload/image/20200910/d6d310d99c4d49528e465dbde474335e.png)
### 2. Python更新pip(提示：如果安装过程中出现报错pip版本太低，即刻升级pip)
1. python -m pip install --upgrade pip （可能报错，如果报错用以下语句解决）
![图片](https://img-blog.csdnimg.cn/20190407214406266.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMTA1ODMx,size_16,color_FFFFFF,t_70)
2. python -m pip install -U --force-reinstall pip
3. 完美解决
![图片](https://img-blog.csdnimg.cn/20190407214739200.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMTA1ODMx,size_16,color_FFFFFF,t_70)
### 4. 安装scrapy for Windows
1. (由于Twisted安装会报错)这里提供一个链接下载Twisted （此版本是python3.8 64 位）
2. 链接：https://pan.baidu.com/s/1KTwxzqQBlNtyjKsJfBGbQw 
提取码：p4j5 
```python
# 安装前依赖
# pip install wheel Lxml Pywin32 
# pip install Twisted-20.3.0-cp38-cp38-win_amd64.whl
# pip install scrapy
```
3. 安装完毕输入scrapy 出现安装成功
![图片](http://www.lxit365.com/fileUpload/static/upload/image/20200910/ea7ce41eb10144b38f2b83ac6e5adf52.png)
### 5. pip 设置国内镜像
```python
# 临时使用pypi国内镜像源地址 - 从阿里云镜像源安装 scrapy
pip install scrapy -i https://mirrors.aliyun.com/pypi/simple/
# 永久全局设置pypi国内镜像源地址
# 如果你只想为当前用户设置，你也可以去掉下面的"--global"选项
pip config --global set  global.index-url https://
mirrors.aliyun.com/pypi/simple/
# 设置镜像 文件
# 用户目录创建pip.ini
# 内容
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/
```