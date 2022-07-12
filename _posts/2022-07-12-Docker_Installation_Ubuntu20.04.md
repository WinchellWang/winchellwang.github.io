---
layout: post
title: Install Docker on Ubuntu Server 20.04
subtitle: A simple and neat installation guide for Docker
date: 2022-07-12
author: Moax.Wang
header-img: "img/post-bg-tech.jpg"
tags: [Technology]
header-mask: 0.1
catalog: true
---

>Assume you are using a normal account, but not <mark>root</mark> account.

# 1 Update and Install Necessary Program

```ca-certificates``` and ```curl``` are necessary for the following step to add Docker repository to system.

```shell
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

# 2 Add Docker Repository to System

You probably need to check the availablity of the link below, especially if you are working on a different system.

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

>```https://download.docker.com/linux/ubuntu/gpg``` and ```https://download.docker.com/linux/ubuntu``` may need to be changed according to your system.

# 3 Install Docker

Install Docker :D

```shell
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
```

Add the current user to docker group, so you don't have to add ```sudo``` to use docker.

```shell
sudo usermod -aG docker $USER
```

Save all works on computer/server, and reboot it by following command.

```shell
sudo reboot
```

# 4 Check Installtion

You don't need to use ```sudo``` for docker operations, if your account is successfully added to docker group.

```shell
docker run --rm hello-world
```

After executing the command above, you should see something like the following on your screen, if docker can run smoothly. 

```shell
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
s0mevalue: Pull complete 
Digest: sha256:xxxxxx
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

# 4 Basic Command in Docker

**Pull image**
```shell
docker pull imageNAME:TAG
```
OR pull the latest image available on your system.
```shell
docker pull imageNAME
```

**List all containers**
```shell
docker ps -a
```

**List all images**
```shell
docker images
```

**Stop and remove specific running container**
```shell
docker stop containerID/containerNAME
docker remove containerID/containerNAME
```

**Remove unused image**
```shell
docker rmi imageNAME:TAG/imageID
```
>For example to remove the ```hello-world``` image you just pulled:
>```shell
>docker rmi hello-world:latest
>```
>And the image will be removed.
