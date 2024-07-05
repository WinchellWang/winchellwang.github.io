---
layout: post
title: 修复EPUB电子书
subtitle: 修复Mac的Books中导出的EPUB文件不能被Calibre识别的问题
date: 2024-07-05
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
  - Life Tips
header-mask: 0.1
catalog: true
---

# 问题简述

Mac的Books应用可以由外部导入书籍，但是如果导入一个正常的epub书后再导出到外面，会发现比如像Calibre等其他的常用书籍管理软件无法正常导入，并显示文件错误。

![calibre_error](https://cdn.jsdelivr.net/gh/winchellwang/winchellwang.github.io/img/_post_image/2024-07-05/calibre_error.jpg)


报错详情：

```
calibre, version 6.29.0
WARNING: Errors while adding: There were problems adding some files, click "Show details" for more information


----------------------------------------------------------------------
Failed to add the file /Book/from_books.epub to the book: /Book/from books
With error:
Traceback (most recent call last):
  File "calibre/gui2/add.py", line 491, in add_formats
  File "calibre/db/cache.py", line 1839, in add_format
IsADirectoryError: [Errno 21] Is a directory: '/Book/from_books.epub'
```

经过排查发现，Mac系统对epub采用了一种非常“别具一格”的解码方式。当epub文件导入到Books后，epub文件会被解压为以“.epub”为尾缀的**文件夹**，例如book.epub/，并在文件夹中写入一些参数文件方便Books应用读取。然而，当把epub书从Books中导出时，Mac并不会反向将epub文件重压缩，而是原封不动的把这个挂着.epub尾缀的文件夹复制出来。并且，Mac系统中强制识别以.epub结尾的文件夹是书籍文件，也就是说这个由Books导出的“epub”能且仅能被Mac的Books重新导入。然而在别的正常的读书软件中无法识别一个.epub后缀的文件夹是正常的epub书籍。

![epub_before_after_books](https://cdn.jsdelivr.net/gh/winchellwang/winchellwang.github.io/img/_post_image/2024-07-05/epub_before_after_books.jpg)

> 可以看到虽然原版epub文件，从Books中导出的epub文件，和修复后的文件在窗口界面中都显示类型为EPUB，但是在终端可以很清晰地看到从Books中导出的epub实际上是Directory（目录），即是个文件夹。而修复好的书就是真正的epub格式了。

# 解决方法

既然明白了问题来源在于Books导出的epub是伪装成epub的文件夹，那么只需要正确的将这个文件夹内容重新压缩为epub文件就可以被其他的读书软件导入。在Books导出的书籍所在文件夹打开终端（terminal），并输入如下指令：

相关命令如下

```shell
# 进入books导出的epub文件夹内部，文件夹名应该与书名相同
cd broken.epub 

# 将书籍内容重新压缩并命名为fixed.epub在书籍所在文件夹，并移除Books应用添加的多余参数文件
zip -Xr9D ../fixed.epub mimetype * -x  .DS_Store -x iTunesMetadata.plist -x iTunesMetadata-original.plist -x OEBPS/.DS_Store
```

此外，如果不善于使用命令的话，只需要下载我写好的软件，打开运行选择相应的书籍处理即可，修复好的fixed.epub文件会导出在桌面上。

[软件链接在此](https://github.com/WinchellWang/S0ftwaR3_L1b/releases/download/epub_fix/fix_epub.zip)