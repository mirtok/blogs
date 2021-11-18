---
title: Linux(Centos7)安装nginx
date: 2021-10-15
tags:
  - Linux
  - Centos7
  - Nginx
categories:
  - Linux
---

### nginx 安装
1. 下载
wget-c https://nginx.org/download/nginx-1.10.1.tar.gz
2. 解压 nginx-1.10.1.tar.gz 到 /usr/local目录下；
tar -zxvf nginx-1.10.1.tar.gz -C /usr/local/
```shell
# 安装nginx的依赖库
yum install gcc-c++
yum install pcre
yum install pcre-devel
yum install zlib
yum install zlib-devel
yum install openssl
yum install openssl-devel
#进入nginx解压的目录
cd /usr/local/nginx-1.10.1   ell /  
# 配置
# 其实在 nginx-1.10.1 版本中你就不需要去配置相关东西，默认就可以了。当然，如果你要自己配置目录也是可以的。
# 使用默认配置
./configure
# 自定义配置(不推荐)
./configure \
--prefix=/usr/local/nginx \
--conf-path=/usr/local/nginx/conf/nginx.conf \
--pid-path=/usr/local/nginx/conf/nginx.pid \
--lock-path=/var/lock/nginx.lock \
--error-log-path=/var/log/nginx/error.log \
--http-log-path=/var/log/nginx/access.log \
--with-http_gzip_static_module \
--http-client-body-temp-path=/var/temp/nginx/client \
--http-proxy-temp-path=/var/temp/nginx/proxy \
--http-fastcgi-temp-path=/var/temp/nginx/fastcgi \
--http-uwsgi-temp-path=/var/temp/nginx/uwsgi \
--http-scgi-temp-path=/var/temp/nginx/scgi
# 注: 将临时文件目录指定为/var/temp/nginx，需要在/var下创建temp及nginx目录
# 编译
make && make install
```
3.  查找安装路径
    -    whereis nginx (默认路径在 /usr/local/nginx)目录下面 
4.   启动,停止nginx
```shell
cd /usr/local/nginx/sbin/ 
./nginx 
./nginx -s stop #此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。
./nginx -s quit #此方式停止步骤是待nginx进程处理任务完毕进行停止。
./nginx -s reload 

#查询nginx 进程
ps aux|grep nginx
```
![QQ截图20200904175402.png](http://www.lxit365.com/fileUpload/static/upload/image/20200904/511990e615b742ef9eac3df63d74fc0b.png)
5.    开机自启动
- 第一步：进入到/lib/systemd/system/目录
    -    cd /lib/systemd/system/
- 创建nginx.service文件，并编辑
    - vim nginx.service
- 内容如下
```shell
[Unit]
Description=nginx service
After=network.target 
   
[Service] 
Type=forking 
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true 
   
[Install] 
WantedBy=multi-user.target

# 介绍
[Unit]:服务的说明
Description:描述服务
After:描述服务类别
[Service]服务运行参数的设置
Type=forking是后台运行的形式
ExecStart为服务的具体运行命令
ExecReload为重启命令
ExecStop为停止命令
PrivateTmp=True表示给服务分配独立的临时空间
注意：[Service]的启动、重启、停止命令全部要求使用绝对路径
[Install]运行级别下服务安装的相关设置，可设置为多用户，即系统运行级别为3


```
7.   加入开机自启动
- systemctl enable nginx #开机启动
- systemctl disable nginx #禁用开机启动
8.   服务的启动/停止/刷新配置文件/查看状态
```shell

# systemctl start nginx.service　         启动nginx服务

# systemctl stop nginx.service　          停止服务

# systemctl restart nginx.service　       重新启动服务

# systemctl list-units --type=service     查看所有已启动的服务

# systemctl status nginx.service          查看服务当前状态

# systemctl enable nginx.service          设置开机自启动

# systemctl disable nginx.service         停止开机自启动
```
9.    一个常见的错误
10. Warning: nginx.service changed on disk. Run 'systemctl daemon-reload' to reload units.
```shell
# 直接按照提示执行命令systemctl daemon-reload 即可。
# systemctl daemon-reload