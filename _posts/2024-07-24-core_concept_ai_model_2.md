---
layout: post
title: 术之根本，AI建模三大核心之二：特征
subtitle: 永远绕不开的话题：数据，特征，和调参
date: 2024-07-24
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Computer
header-mask: 0.1
catalog: true
---

# 特征工程

**自变量要与因变量存在明确的因果关系。**

什么是特征？简而言之，特征就是见一斑而知全豹中的那一“斑”。假设我们研究的东西本质是一头大象，建模就像是盲人摸象。我们用手触摸大象，收集到了触摸时手的压力反馈，温度差，硬度，等等。这些都是基础的收集到的数据，但是这样的数据并不方便我们理解所触摸到的到底是什么，我们需要将这些基础的数据转化为更容易理解，与大象这个物体相关性更强的参数。如果是人手触摸，大脑自动的帮我们转化了这些手触碰到的数据为一个更高，**更抽象**的特征，即触感。相比于压力，温度，硬度这些基础的输入，触感帮助我们更好的在脑中构建了大象的模样。这种将输入参数做一种过滤，抽提，向更高维抽象化的过程就是特征工程。

## 特征转换

特征转换的核心目的一般包含两方面。一方面，通过特征转换，增强输入与输出的相关性。如果直接获得到的自变量并不能显示出与因变量强烈的相关性，那么特征工程要做的就是对自变量做进一步的处理，产生新的自变量。在新变量中凸显出与因变量的相关性。例如预测一个公司的股价波动，股价的核心包含公司净值，但是直接将公司净值放入模型很可能得不到与股价波动的强相关。然而将当期公司净值减去公司净值的近三年平均值获得的差值或许会显示出更高的相关性。对于因变量而言，有时我们也需要做类似的处理。例如我们需要预测股指，股指可能是一个高达几千上万的数值，但是这样大的数值在训练模型时并不利于模型微调自己的参数。因而将股指的预测修改为一个基础值加上波动值可能更方便。此外，我们也可以通过一些数学方式来对数据做压缩，将变化范围极大的数值压缩到一个相对小的范围，比如log转换，归一化等等，留足空间让模型可以尽情优化参数。

以常用的sklearn库为例，将数据压缩到0到1之间。代码如下：

```python
from sklearn.preprocessing import MinMaxScaler

data = [[-1, 2], [-0.5, 6], [0, 10], [1, 18]]
scaler = MinMaxScaler()
data = scaler.fit_transform(data)
```

另一方面，通过特征转换，让计算机理解我们的输入和输出。有时我们的输入甚至并不是一串数字，那么我们就需要将特征转换为计算机可以理解的语言，即数字。例如计算机不能理解人类的文字，但是我们可以将文字与数字编码一一对应，编写一本计算机的“词典”。这样的特征转换可以让抽象的内容具体化为计算机可以理解的数字，在大语言模型时代是一种十分重要的手段。

以通过循环神经网络构建中英翻译为例，将英文单词转换为相应的一串数字。代码如下：

```python
from torchtext.vocab import build_vocab_from_iterator

# 构建英文到数字，中文到数字的字典

def build_vocab(data: List[Tuple[List[str], List[str]]]):
    en_vocab = build_vocab_from_iterator(
        (en for en, _ in data),
        specials=['<unk>', '<pad>', '<bos>', '<eos>']
    )
    zh_vocab = build_vocab_from_iterator(
        (zh for _, zh in data),
        specials=['<unk>', '<pad>', '<bos>', '<eos>']
    )
    en_vocab.set_default_index(en_vocab['<unk>'])
    zh_vocab.set_default_index(zh_vocab['<unk>'])
    return en_vocab, zh_vocab

# 将英文和中文与字典匹配转换为代表对应字符的数字索引

class TranslationDataset(Dataset):
    def __init__(self, data: List[Tuple[List[str], List[str]]], en_vocab, zh_vocab):
        self.data = data
        self.en_vocab = en_vocab
        self.zh_vocab = zh_vocab

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        en, zh = self.data[idx]
        en_indices = [self.en_vocab['<bos>']] + [self.en_vocab[token] for token in en] + [self.en_vocab['<eos>']]
        zh_indices = [self.zh_vocab['<bos>']] + [self.zh_vocab[token] for token in zh] + [self.zh_vocab['<eos>']]
        return en_indices, zh_indices

en_vocab, zh_vocab = build_vocab(train)
train_dataset = TranslationDataset(train, en_vocab, zh_vocab)
```

## 特征扩充

有时基础的输入值并不能充分反映自变量和因变量的真实关系，我们就需要对原输入进行扩充。对因变量做一定的处理，让模型从不同的视角理解输入和输出的关系，或者是人为将因变量做更高维度的扩充，来让模型考虑到因素间的交互作用或者是某一输入的不同次方数带来的影响。我们以电力消耗的时序样本为例，如果我们直接列出过往100天的电力消耗值来预测后一天的电力消耗，模型的准确度会被限制在直接的每日的电力消耗水平上。但是我们深入思考居民用电的习惯，我们会发现其在大的和小的时间尺度上都具备周期性。例如一周内的用电周期性，按季度的周期性等，那么提取出按周和季度的平均用电水平可以有效的帮助模型理解某一特定天内的用电量的大致范围。这些从基础输入中扩充出来的参数就是一种特征扩充。

以电力系统耗电量预测为例，我们将一些周期性的特征加入模型。代码如下：

```python
import pandas as pd
import numpy as np

# 窗口统计 均值，方差，中位数，最小值，最大值

# 当前日期前7日，30日，90日的耗电量做计算，扩充特征值（x）

for window in [7, 30，90]:
    data[f'win{window}_mean_target'] = data.groupby(['id'])['target'].rolling(window=window).mean().reset_index(drop=True)
    data[f'win{window}_std_target'] = data.groupby(['id'])['target'].rolling(window=window).std().reset_index(drop=True)
    data[f'win{window}_median_target'] = data.groupby(['id'])['target'].rolling(window=window).median().reset_index(drop=True)
    data[f'win{window}_min_target'] = data.groupby(['id'])['target'].rolling(window=window).min().reset_index(drop=True)
    data[f'win{window}_max_target'] = data.groupby(['id'])['target'].rolling(window=window).max().reset_index(drop=True)

# 增加当前日期在时间尺度上的位置，提供周期性信息

# 当前日期是星期几

data['day_of_week'] = pd.to_datetime(data['dt'],unit='D',origin=pd.Timestamp('2022-2-30')).dt.dayofweek

# 当前日期是几月

data['month'] = pd.to_datetime(data['dt'],unit='D',origin=pd.Timestamp('2022-2-30')).dt.month

# 当前日期是几季度

data['quarter'] = pd.to_datetime(data['dt'],unit='D',origin=pd.Timestamp('2022-2-30')).dt.quarter
```

总之，特征工程就是在翻译和解释数据给计算机，让他更好的理解数据的关系，从而建立更准确的模型。特征工程就是汤师爷，在给县长翻译翻译什么叫惊喜。

![wut_is_suprise?!](https://cdn.jsdelivr.net/gh/winchellwang/winchellwang.github.io/img/_post_image/2024-07-24/wut_is_suprise.gif)