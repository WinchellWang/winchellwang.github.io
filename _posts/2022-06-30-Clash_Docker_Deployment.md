---
layout: post
title: Docker部署Clash实现透明网关
subtitle: 在Ubuntu Server 20.04上利用Docker部署Clash对网络进行接管并实现透明代理
date: 2022-06-30
author: Me
header-img: "img/home-bg-o.jpg"
tags: [Technology]
header-mask: 0.1
catalog: true
---

# 1 部署Clash的WebUI（Clash Dashboard）

## 1.1 基于Docker容器的WebUI

这里我们首先拉取Clash Dashbaord的镜像。该镜像基于 haishanh/yacd（[Docker链接](https://hub.docker.com/r/haishanh/yacd)，[Github链接](https://github.com/haishanh/yacd)）。

```shell
docker pull haishanh/yacd
```
>需要注意的是如果你并非使用root账户或用户未加入docker组则<mark>在对docker操作时需要使用 sudo</mark>

然后根据介绍直接运行。

```shell
docker run --name clash_webui -d -p 1234:80 haishanh/yacd
```

在这里80端口是容器的端口，1234是服务器的端口（该端口可以由自己定义，只要没有被占用就可以）。

```shell
sudo ufw allow 1234
```

>如果你没有打开防火墙的话，即运行 **```sudo ufw status```** 显示未运行则此处及后续有关ufw的设置都无需更改。（当然我个人强烈建议打开防火墙，防火墙的启动方式为 **```sudo ufw enable```** ）

打开防火墙对应端口，即可以使用服务器地址跟对应端口号访问。例如服务器地址为192.168.1.2，则在浏览器中输入```192.168.1.2:1234```，就可以打开Clash Dashboard。

## 1.2 直接部署WebUI

通过[此链接](https://github.com/haishanh/yacd/releases)下载最新版本的```yacd.tar.xz```解压，并将文件夹重命名为dashboard。将其与下文中的**config.yaml**放置在同一文件夹下。

# 2 部署Clash容器

这里首先要准备好你的设置文件**config.yaml**，设置文件可以参考[此链接](https://github.com/Dreamacro/clash/wiki/configuration)内的设置，但有几个设置是需要与下文保持一致。（其实当然也可以按照你自己的意愿设定，但前提是确实明白这些参数代表的意思与功能）

```yml
port: 7890
socks-port: 7891
#转发端口一定要配置
redir-port: 7892
#允许接管局域网流量
allow-lan: true
#默认代理模式
mode: Rule
log-level: warning
#接口控制端口你可以自己设置，默认是9090
#这里尽量避免使用和 Clash Dashboard 中的端口一样，否则可能无法登录WebUI查看Clash运行状态
external-controller: 0.0.0.0:7070
#如果服务器对公网开放可以设置密码
secret: ""
#external-ui: dashboard
#配置由clash接管的dns解析
dns:
  enable: true
#主要监听定向转发来的数据，后续会在路由表里配置转发端口为1053
  listen: 0.0.0.0:1053
  enhanced-mode: redir-host
#见下方链接
  nameserver:
    - '114.114.114.114'
    - '223.5.5.5'
  fallback:
    - 'tls://1.1.1.1:853'
    - 'tcp://1.1.1.1:53'
    - 'tcp://208.67.222.222:443'
    - 'tls://dns.google'
```

准备好配置文件后，将配置文件放置在 ```~/clash```中，创建文件夹的命令为：
```shell
mkdir ~/clash
```

然后在防火墙中打开以下端口
```shell
sudo ufw allow 端口号
需要开启的端口号：7890, 7891, 7892, 7070, 1053, 53
```

然后拉取 Clash 的镜像。Clash的镜像共有两种。普通版与高级版两个都是免费的，但高级版有更多的功能，具体的区别可以在[此处链接](https://github.com/Dreamacro/clash/wiki/premium-core-features)中了解。

[普通版镜像](https://hub.docker.com/r/dreamacro/clash)拉取方式：

```shell
docker pull dreamacro/clash
```

[高级版镜像](https://hub.docker.com/r/dreamacro/clash-premium)拉取方式：

```shell
docker pull dreamacro/clash-premium
```

然后运行如下命令启动clash容器

```shell
docker run --name clash \
        -v ~/clash:/root/.config/clash \
        --network=host \ 
        --privileged \ 
        --restart=unless-stopped \ 
        -d dreamacro/clash-premium
 ```

>其中 -v 命令之后的挂载卷映射的左侧原始路径是你自己的config.yaml的位置，此处已是我们在用户文件夹下创建好的用于存储配置文件的路径。

如果配置文件设置无误的话，可以在Dashboard页面输入服务器地址与端口，链接到Clash进行设置了。

![img](https://raw.githubusercontent.com/MoaxWang/moaxwang.github.io/main/img/_post_image/2022-06-30/Clash_Dashboard.jpg)

>**Tips:**
Dashboard支持对链接添加参数，具体设置可以参考[此链接](https://github.com/haishanh/yacd)。
以服务器地址为192.168.1.2，clash的 config.yaml 中 external-controller 端口设置为7070，且Clash Dashboard的端口设置为1234为例，则可以使用以下链接进行访问：
<br>&ensp;&ensp;```http://192.168.1.2:1234/?hostname=192.168.1.2&port=7070```

# 3 配置路由表 (Optional)

## 3.1 配置服务器路由表转发规则

可以终端中输入以下命令，也可以写进.sh脚本，chmod +x 之后执行./xxx.sh。

```shell
#在nat表中新建一个clash规则链
iptables -t nat -N CLASH
#排除环形地址与保留地址，匹配之后直接RETURN
iptables -t nat -A CLASH -d 0.0.0.0/8 -j RETURN
iptables -t nat -A CLASH -d 10.0.0.0/8 -j RETURN
iptables -t nat -A CLASH -d 127.0.0.0/8 -j RETURN
iptables -t nat -A CLASH -d 169.254.0.0/16 -j RETURN
iptables -t nat -A CLASH -d 172.16.0.0/12 -j RETURN
iptables -t nat -A CLASH -d 192.168.0.0/16 -j RETURN
iptables -t nat -A CLASH -d 224.0.0.0/4 -j RETURN
iptables -t nat -A CLASH -d 240.0.0.0/4 -j RETURN
#重定向tcp流量到本机7892端口
iptables -t nat -A CLASH -p tcp -j REDIRECT --to-port 7892
#拦截外部tcp数据并交给clash规则链处理
iptables -t nat -A PREROUTING -p tcp -j CLASH

#在nat表中新建一个clash_dns规则链
iptables -t nat -N CLASH_DNS
#清空clash_dns规则链
iptables -t nat -F CLASH_DNS
#重定向udp流量到本机1053端口
iptables -t nat -A CLASH_DNS -p udp -j REDIRECT --to-port 1053
#抓取本机产生的53端口流量交给clash_dns规则链处理
iptables -t nat -I OUTPUT -p udp --dport 53 -j CLASH_DNS
#拦截外部upd的53端口流量交给clash_dns规则链处理
iptables -t nat -I PREROUTING -p udp --dport 53 -j CLASH_DNS
```

>**Tips:**
普通用户设置iptables需要sudo权限。

## 3.2 路由表持久化

路由表每次重新开机之后都会回复为默认值，如果想要将更改的内容持久化，需要借助一个软件包 iptables-persistent 实现。
```shell
sudo apt install iptables-persistent
sudo netfilter-persistent save
```

## 3.3 路由表复原

如果需要删除上述的路由表配置，执行以下命令
```shell
sudo iptables -t nat -D PREROUTING -p tcp -j CLASH
sudo iptables -t nat -D OUTPUT -p udp --dport 53 -j CLASH_DNS
sudo iptables -t nat -D PREROUTING -p udp --dport 53 -j CLASH_DNS
sudo iptables -t nat -F CLASH
sudo iptables -t nat -X CLASH
sudo iptables -t nat -F CLASH
sudo iptables -t nat -X CLASH_DNS
sudo netfilter-persistent save
```
>**或在修改iptables前使用如下命令保存原始设置**
```shell
sudo iptables-save > iptables.bak
sudo netfilter-persistent save
```
**用如下命令复原iptables**
```shell
sudo iptables-restore < iptables.bak
sudo netfilter-persistent save
```

# 4 两种流量接管方式

## 4.1 非侵入式

### 4.1.1 代理模式

**此模式无需在第三步中对路由表进行修改**

打开网络代理设置，将服务器地址填入，并在端口中输入7890（Socks代理则在端口中输入7891）。

![img](https://raw.githubusercontent.com/MoaxWang/moaxwang.github.io/main/img/_post_image/2022-06-30/Screenshoot_1.jpeg)

此种方式为终端设备主动寻求流量接管。优点是如果服务器宕机，局域网里的其他联网设备不受影响。缺点是每一个需要接管的设备都需要手动设置，较为麻烦。

### 4.1.2 非代理模式

手动设置需要被接管流量的终端设备的IP地址，将网关地址与DNS服务器地址设置为你部署clash的服务器地址。

网关：
![img](https://raw.githubusercontent.com/MoaxWang/moaxwang.github.io/main/img/_post_image/2022-06-30/Screenshoot_2.jpeg)

DNS：
![img](https://raw.githubusercontent.com/MoaxWang/moaxwang.github.io/main/img/_post_image/2022-06-30/Screenshoot_3.jpeg)

## 4.2 侵入式

手动设置服务器的网关地址为主路由器
```shell
vim /etc/netplan/xxx.yaml
```

修改dhcp4为false，并配置静态IP，其中需要注意的是nameservers中的addresses应该是路由器的地址，在本例中即为192.168.1.1。

在路由器中，在内网DHCP配置页面，将网关与DNS服务器都设置为clash服务器的IP地址。

![img](https://raw.githubusercontent.com/MoaxWang/moaxwang.github.io/main/img/_post_image/2022-06-30/Router.jpg)

这样设置下，由主路由器分发给所有终端设备clash服务器的地址作为网关与dns解析接口。Clash服务器处理完数据包之后发送回主路由器，并由主路由器向上送至光猫。此时网络才是通的，实现的是旁路由的原理。

这种方法将由clash服务器全权接管局域网内的所有流量。好处是在局域网覆盖范围内只要接入，直接走代理，不需要进行任何设置。缺点是一旦服务器宕机，整个局域网就瘫痪了。

最终效果：
![img](https://raw.githubusercontent.com/MoaxWang/moaxwang.github.io/main/img/_post_image/2022-06-30/Screenshoot_4.jpeg)

>**Tips：**
打通整个网络，除了配置要没有错误之外，以下三点要反复确认:<br>docker里的clash在运行状态<br>路由表配置完毕<br>clash服务器网关地址指向主路由器

>Reference:
[Docker+Clash 部署透明“网关”的实现](https://zhuanlan.zhihu.com/p/423684520)
