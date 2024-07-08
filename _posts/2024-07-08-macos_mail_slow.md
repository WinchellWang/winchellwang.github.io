---
layout: post
title: 修复邮箱打开缓慢
subtitle: 修复Macos 12.7 Monterey中邮箱应用打开极度缓慢的问题
date: 2024-07-08
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
  - Life Tips
header-mask: 0.1
catalog: true
---

# 问题简述

在我的苹果M系列电脑，系统版本为Macos 12.7 Monterey中使用系统自带的邮箱应用时会发现打开这个应用需要等待非常非常久。

# 解决方法

解决方法非常简单，退出邮箱应用，只需要删除如下路径的文件再重新打开邮箱即可。

```
~/Library/Application\ Support/Mail/Plug-ins/Bundles/Library/Mail/Bundles/Properties.plist
```

或在终端中执行如下命令：

```shell
rm -f ~/Library/Application\ Support/Mail/Plug-ins/Bundles/Library/Mail/Bundles/Properties.plist
```