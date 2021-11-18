---
title: Linux(Centos7)安装jdk1.8
date: 2021-10-15
tags:
  - Linux
  - Centos7
  - JDK1.8
categories:
  - Linux
---

### Linux安装jdk(两种方式)
#### 1.   不管那一步都要查看系统是否自带jdk
  ```shell
# 卸载系统自带的OpenJDK以及相关的java文件 
# java -version 结果 存在
# 查看相关java文件 rpm -qa | grep java
# 删除相关文件
    rpm -e --nodeps java-1.8.0-openjdk-headless-1.8.0.65-3.b17.el7.x86_64
	rpm -e --nodeps java-1.8.0-openjdk-1.8.0.65-3.b17.el7.x86_64
# 查看删除结果
    java -version

  ```
#### yum 安装jdk1.8
```shell
#查询 jdk
    yum -y list java*
```
1.    查询 jdk      yum -y list java*
![dw](https://img.cnbuilder.cn/blog/b2199c2ec832189bc052a2fe99d3f1be.png)   
2.    安装jdk1.8
3.    yum install -y java-1.8.0-openjdk.x86_64
4.    java -version
5.    这样就安装成功了。默认给安装到usr/lib/jvm/ 
### 手动安装
1.    先去官网下载jdk1.8
2.    [点我快速进入官网](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)
![jdk](https://img.cnbuilder.cn/blog/b58b387f6d9d120dcdf603d7ef740b60.png)
3.    没有账号需要注册一下oracle账号。
![orcle](https://img.cnbuilder.cn/blog/22b2bb69449836b883b79e5232e85de7.png)
![orcle](https://img.cnbuilder.cn/blog/30190dbdf46ad9061cd66313f5090751.png)
4.    第一次注册需要邮箱激活一下。
![激活](https://img.cnbuilder.cn/blog/43f03de8df78085df815f73c2d7b064e.png)
5.    然后就可以用邮箱+密码直接登录。 登录完之后可以直接下载！
![jdk](F:\press-project\my-blog\docs\views\category\2021-10\ttps:\img.cnbuilder.cn\blog\a827f3f1d1fe4d79e676a9b0dad01423.png)
6.    服务器创建文件夹
```shell
#进入根目录
cd / 
#在根目录创建jdk目录
mkdir jdk
```
7.    上传服务器
![jdk](https://img.cnbuilder.cn/blog/17ed2091594b95e98d509c6209c0c9b9.png)
8.    上传完成：在jdk目录下ll查询一下
![jdk](https://img.cnbuilder.cn/blog/9e4d0b36afc29e5f0b17d028c28f6cd9.png)
9.    解压jdk：
![jdk](https://img.cnbuilder.cn/blog/2911257ab0a4f08c8bc4ccd437f1db39.png)
10.    命令tar -zxvf jdk-8u211-linux-x64.tar.gz（jdk-8..这个是刚下载的jdk名称）
11.    解压成功
![jdk](https://img.cnbuilder.cn/blog/4a258c463f0b48b8fa8524c0674b93b6.png)
12.    配置环境变量 vim /etc/profile
![jdk](https://img.cnbuilder.cn/blog/38b4970cd0dc808242b78837f88626b1.png)
13.    配置一下环境变量代码：
![jdk](https://img.cnbuilder.cn/blog/3c724dcd1aad89fd0dd8a83128aae568.png)
```shell
#将以下命令放到环境变量 注意文件夹名称
export JAVA_HOME=/DATA/jdk/jdk1.8.0_211 
export CLASSPATH=$:CLASSPATH:$JAVA_HOME/lib/ 
export PATH=$PATH:$JAVA_HOME/bin
#点击esc 进入命令模式 输入：wq! 保存修改信息
```
![jdk](https://img.cnbuilder.cn/blog/728c14268b0f2a36cd558f1cbf6b2cb8.png)
14.   刷新环境变量文件： 刷新环境变量命令:source /etc/profile
![jdk](https://img.cnbuilder.cn/blog/740b8a257ab422b620bf2046eb5d52e0.png) 
15.   查看是否安装成功: 查询jdk版本命令： java -version
![jdk](https://img.cnbuilder.cn/blog/f812303af87104b974a9bcc4f3f9c561.png)
16.   关于如果没有oracle账号的效果版可以看这里
[点我获取账号哦!](http://bugmenot.com/view/oracle.com)