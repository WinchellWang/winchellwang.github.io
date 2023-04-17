---
layout: post
title: 恢复微信通知
subtitle: iPhone上微信/WeChat的通知无法收到如何解决
date: 2023-04-17
author: Moax.Wang
header-img: "img/post-bg-life.jpg"
tags:
    - Blog
header-mask: 0.1
catalog: true
---

最近学到了，也是腾讯自己修复了微信的这个bug吧。或者与其说是修复，不如说是提供给用户一种修复微信通知的工具。

# 背景问题

我在使用iPhone这么久，发现微信有一个不断复现的问题，就是在长时间使用微信后，微信的notification banner就消失了。具体而言，就是当安装的微信在没有任何的重装行为，正常使用一段时间，通常是半年到两年的时间后，当把微信关闭后，或者微信长期驻留后台没有使用，那当有新消息时，微信不会推送任何通知给手机。**但是，微信可能推送新消息**。当使用完微信，且刚刚把微信切换到后台，并且手机没有锁屏的时候，有新消息时，是有推送弹出来的。但是我推测此时之所以能成功推送是因为这个推送并不来自于apple的信息通知服务器，而是微信后台程序尚未被冻结时，自己仍在运行并接收到新消息后，自己直接调用手机的信息通知功能。

# 如何解决

这里假设已经完全正常开启了信息通知，包括微信内的设定以及系统中的设定，而仍无法收到消息的情况。

## 最新方法（17/04/2023）

因为用的英文版的WeChat，这里只给英文的流程。中文WeChat或者微信步骤应该是一样的。

$$
\begin{align}
Me & \Rightarrow Settings \Rightarrow Help\& Feedback \\
& \Rightarrow Samll\ Spanner\ Logo\ on\ the\ Top\ Right \\
& \Rightarrow Repair\ Notifications
\end{align}
$$

然后关掉微信，过一段时间（确保后台已经完全退出），再打开。

保持你的使用习惯，如果又出现这个问题了，重复这个步骤。

## 以往的方法

1. 可以尝试进入账户安全内，然后在设备管理中删掉所有的除了本机以外的全部设备。

2. 彻底删除掉微信，然后重新安装。如果担心聊天记录消失的话，请提前导出备份。

除此之外的任何方法，包括但不限于重启，信息通知重开，删掉app但保留文档数据然后重安app的方式都可以尝试，但是如果无法解决的话，不妨试试本文的方法。