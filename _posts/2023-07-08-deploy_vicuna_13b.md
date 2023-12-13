---
layout: post
title: Deploy Vicuna-13B Locally
subtitle: To have my personal ChatBot powered by AI.
date: 2023-07-08
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Computer
header-mask: 0.1
catalog: true
---

# 1. What is Vicuna?

![Vicuna](https://toursinsalta.com/wp-content/uploads/2017/05/vicunas-puna-argentina.jpg)

Vicuña is a domesticated species of South American camelid (just kidding). [Vicuña](https://lmsys.org/blog/2023-03-30-vicuna/) is a large language model (LLM) developed by UCB, based on the open-source LLM model called [LLaMA](https://ai.facebook.com/blog/large-language-model-llama-meta-ai/), which was developed by Meta. **The team behind this model states that Vicuña-13B performs at 90% of the level of GPT-4**. Considering that ChatGPT is a business product running on their servers, with no guarantee of data privacy, there is value in running a chatbot locally.

# 2. Hardware & Software Requirement

LLM is a computationally intensive program which typically requires a high performance setup or even a server to run smoothly. Vicuña-13B, being a LLM, also demands significant computing resources. Therefore, high-end CPU and GPUs are highly recommended to run it. In addition to the calculation speed, large memories, including RAM and VRAM, is crucial for storing the conversation and generating a large content.

It is indeed a common understanding that most of AI models are running on Linux core, and it is unavoidable to use linux for Vicuña as well. In this example, Ubuntu is selected as the system, and running Vicuna within a docker container. While running in docker is not essential for the deployment of Vicuna, it can offer benefits such as maintaining a clean system and minimizing compatibility issues when multiple programs are being developed simultaneously. 

## 2.1 GPU Recommendation

High-end GPUs with large VRAM are all suitable for running an LLM, but Nvidia GPUs are strongly recommended. Nvidia has well developed tools and environments for developing AI codes, which can help developer to avoid most of the unnecessary troubles during deployment. On the other hand, using GPUs from AMD or Intel may result in more difficulties. In this post, two RTX 3090 has been utilized to ensure a smooth conversation experience similar to ChatGPT.

## 2.2 Environment

|Configuration|Detail|
|-|-|
|CPU|Intel Xeon Gold 6133 *2|
|GPU|Nvidia RTX 3090 (24G)*2|
|RAM|256GB|
|System|Ubuntu 20.04 Server LTSC|
|GPU Driver|530.41.03|
|CUDA|12.1|
|Container|nvcr.io/nvidia/cuda:12.1.0-devel-ubuntu20.04|

# 3. Installation

## 3.1 Python Installation

Download file and start installation.

```shell
wget https://repo.anaconda.com/miniconda/Miniconda3-py310_23.3.1-0-Linux-x86_64.sh
bash Miniconda3-py310_23.3.1-0-Linux-x86_64.sh
```

Then following the instruction for installation.

> Please chose <mark>yes</mark> for init during conda installation.

Conda activation.

```shell
cd / && source .bashrc
```

## 3.2 Faschat Installation

```shell
pip3 install fschat
```

To accelerate the installation process in mainland China, it is recommended to use the following command:

```shell
pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple fschat
```

Please check the CUDA availability by following command.

```shell
python -c "import torch; print(torch.cuda.is_available())"
```

It should return <mark>True</mark>, if all things are correctly installed.

## 3.3 Model Weight

[Vicuna-13B model weight can be downloaded from this website.](https://huggingface.co/lmsys/vicuna-13b-v1.3/tree/main)

Download all files in one folder (recommend to name it as vicuna-13b).

Start using the Chatbot by following command.

```shell
python3 -m fastchat.serve.cli --model-path vicuna-13b/ --num-gpus 2
```

>|Utilized Hardware|Command|
>|-|-|
>|Single GPU|python3 -m fastchat.serve.cli --model-path /path/to/vicuna-13b/|
>|Multiple GPUs|python3 -m fastchat.serve.cli --model-path /path/to/vicuna-13b/ --num-gpus 2|
>|CPU Only (RAM>60GB)|python3 -m fastchat.serve.cli --model-path /path/to/vicuna-13b --device cpu|
>|Mac|python3 -m fastchat.serve.cli --model-path /path/to/vicuna-13b --device mps --load-8bit|
>
>load-8bit is used to reduce the memory usage as most of Mac does not have enough RAM to run it. It will slightly decrease the performances.

If the screen shows following things, it means the chatbot runs successfully. You can talk with her by input message in terminal.

```shell
Loading checkpoint shards: 100%|██████| 3/3 [00:30<00:00, 10.27s/it]
USER:
```