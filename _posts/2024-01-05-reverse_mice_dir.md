---
layout: post
title: Reverse Mouse Wheel Direction on Win10
subtitle: An approach to reverse the direction of the mouse wheel to give Windows a similar feel to Mac.
date: 2024-01-05
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags: 
   - Life Tips
header-mask: 0.1
catalog: true
---

# Device Information

Find the mouse in **Device Manager**, right-click on it, and select **Properties**. Copy the value from the **Device instance path**, which will be used to locate the settings in the Registry.

![device](https://cdn.jsdelivr.net/gh/winchellwang/winchellwang.github.io/img/_post_image/2024-01-06/device.jpg)

# Setting Modification

Press "Win + R" and type "regedit" to open the Registry Editor. Navigate to "\Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Enum" and locate your device using the value from **Device instance path**. Under the folder of **Device Parameters**, change the value of "**FlipFlopWheel**" to **1** in order to reverse the scrolling direction on your mouse.

![registry](https://cdn.jsdelivr.net/gh/winchellwang/winchellwang.github.io/img/_post_image/2024-01-06/registry.jpg)

After making the changes, save them in the Registry Editor, and restart your computer for the modifications to take effect.