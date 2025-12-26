---
layout: post
title: Disable iOS OTA Update
subtitle: Only works for trollstore and jailbreak device.
date: 2023-12-13
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Life Tips
header-mask: 0.2
catalog: true
---

**This only works on devices with TrollStore or devices that have been jailbroken.**

# 1. Take out Red Dot (Optional)

Install the [block OTA profile](https://betaprofiles.dev/#block-ota), then go to settings to check for updates. It will confirm that you are updated, and the red dot on settings will disappear.

# 2. Install Filza

Here is the [link](https://github.com/WinchellWang/S0ftwaR3_L1b/releases/download/S0ftwar3/fliza.ipa). I assume you know how to use it.

# 3. Disable Update

Fliza open the file in this path '/usr/bin/vm_stat'.

Run

```shell
rm -rf /var/MobileSoftwareUpdate/MobileAsset/AssetsV2/* && chflags schg,schange,simmutable /var/MobileSoftwareUpdate/MobileAsset/AssetsV2
```

Then, you should get something like that, if you check the updates again.

![ota_block](https://cdn.jsdelivr.net/gh/winchellwang/winchellwang.github.io/img/_post_image/2023-12-13/ota_block.jpg)

# 4. Enable Update

If you want, the same location.

```shell
chflags noschg,noschange,nosimmutable /var/MobileSoftwareUpdate/MobileAsset/AssetsV2
```

> Works for iOS 14.8