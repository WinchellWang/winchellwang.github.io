---
layout: post
title: 术之根本，AI建模三大核心之一：数据
subtitle: 永远绕不开的话题：数据，特征，和调参
date: 2024-07-19
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Computer
header-mask: 0.2
catalog: true
---

人工智能（AI），在我的概念中泛指任何在计算机上构建符合人类知识的模型结构然后以输入的数据为基础不断优化模型参数进而使模型能够以输入数据为本，生成期望的数据结果。这个概念下，线性回归，二分类，多分类，神经网络，甚至是以数学，物理学，生物学公理为基础的建模都可以归纳为人工智能。而随时代进步，人工智能被细化为机器学习和深度学习。其中**机器学习**的模型结构更为固定，如线性回归，树分类等。而神经网络则因为由基础的神经单元拼搭而成，模型结构更具弹性且往往具备包含输入层，输出层，和隐含层在内的多层结构，因而从机器学习中区别出来独称**深度学习**。

不论是所谓的机器学习，或是深度学习，在建模中却有共通之处。即在我看来，其核心都是包括“数据管理”，“特征工程”，以及“模型调参”。每一步都对最后的建模表现至关重要。

# 数据管理

**数据的质量决定了模型的上限。**

不论如何建模，模型的本质就是为了尽可能的学习到数据背后代表的深层逻辑，从而可以应用到其他的数据集上并得到好的表现。因此，很清晰的是如果数据集本身就是杂乱无章的，那模型就算埋头苦学500年，也什么都学不出来，因为数据本身就不包含任何有效信息。相反，如果数据集有着充分清晰的信息，那么模型的最优解也不过是学透了这个数据集的所有信息，但是无法保证在超越这个**数据集所包含的情况**之外的条件还有好的表现。就比如一个学生可以熟读唐诗宋词，所以并不意外他可以创作优秀的唐诗宋词作品，但是如果期望他通过学习了唐诗宋词而擅长写当代散文，则显得有点不切实际。

## 数据清洗

毫无疑问，不论模型的框架如何设计，其目的都是为了更好的学习隐藏在数据背后的逻辑。而数据管理的首要目的就是要尽可能的清除掉脏数据，即输入值与输出值不符合背后逻辑的错误信息，从而突出有效的信息。例如马头人身的生物并不真实存在，那么在人脸识别建模的数据中就需要删除掉。否则，脏数据将极大的影响模型的学习，甚至可能引领模型向错误的方向学习。

常用的数据清洗包括比对当前数据与类似数据在输出值上的差异，如果差异过大，基本就是异常数据需要删掉了。比如通过统计同一情况下数据的均值，方差，中位数等，来鉴别哪些是outlier。此外，如果输入与输出存在明确的分布关联，那么可以计算和观察寻找数据中不符合分布规律的部分并删除他们。

此外，如果数据量充足的情况下（多数情况下，数据一般都不充足），还可以删除掉存在缺失值的数据，从而提高数据的质量。

以训练翻译模型为例，有时需要删除掉双语对照缺失的数据。代码如下：

```python
# 数据预处理函数 (清洗有一个语言为空的数据)

def preprocess_data(en_data: List[str], zh_data: List[str]) -> List[Tuple[List[str], List[str]]]:
    processed_data = []
    for en, zh in zip(en_data, zh_data):
        en_tokens = en_tokenizer(en.lower())[:MAX_LENGTH]
        zh_tokens = zh_tokenizer(zh)[:MAX_LENGTH]
        # 确保两个序列都不为空

        if en_tokens and zh_tokens:
            processed_data.append((en_tokens, zh_tokens))
    return processed_data
```

## 数据生成

大多数情况下，数据对于训练出一个合格的模型是不够的。因此，尽可能的扩大可用数据往往是最后的无奈之选。如果数据集本身质量不错，但是存在一些缺失，那么可以使用均值，中位数或者k-nearest neighbors算法填充缺失值，修补数据集。这样并不会提升数据质量，但是可以让本身无法送入模型学习的数据也可以被利用起来。在可获取的真实数据有限的情况下，生成仿真数据就上位了。这对一些情况是适用的。比如训练一个OCR模型，可能找到的带文本照片十分有限，但是利用生成模型可以轻易生成大量的各种场景下带任意目标文本的图像。然而，仿真数据可应用的条件也十分苛刻，即生成的数据要切实符合数据集背后的逻辑。例如，蛋白质的空间折叠结构总是对应特定的功能，随意生成任意折叠的蛋白质结构并不有助于模型学习到折叠结构对蛋白质功能的影响。此外，除了生成数据供模型学习外，为了增强模型的robustness（或称泛用性？），我们也需要人为的为数据增加合理范围内的噪声。例如图像或音频识别中，并不总是有清晰的图片或声音，摄像头可能会倒置，人脸可能没有被完整包括在照片中，人声可能被噪音覆盖或者手机质量不好录音断断续续，所以在训练中就需要人为的对数据做一定的处理生成带噪声的新数据让模型认识到各种“意外”情况。

以图像识别为例，有时需要人为让照片旋转或裁切，增强模型在不同环境下的适应性。代码如下：

```python
# 定义一个数据扩增展示函数

# img为图像，aug为扩增方法

def apply(img, aug, num_rows=2, num_cols=4, scale=1.5):
    # 扩增后的样本 list

    Y = [aug(img) for _ in range(num_rows * num_cols)]
    
    plt.figure(figsize=(10, 5))
    for idx in range(num_rows * num_cols):
        plt.subplot(num_rows, num_cols, idx+1)
        plt.imshow(Y[idx])
        plt.xticks([]); plt.yticks([])

apply(img, torchvision.transforms.RandomHorizontalFlip())
apply(img, torchvision.transforms.RandomCrop((128, 128)))
apply(img, torchvision.transforms.RandomRotation(10))
```

除了增加送入模型训练的数据集规模，另一种取巧的办法则与模型的学习模式息息相关。可以在不增加数据集规模的情况下，“有效增加”模型可学习的数据量。模型的学习一般会将数据集切分为训练集和验证集两部分，目的是为了准确得知模型当前的学习状态如何，从而避免过拟合。然而这种切分会让本就不够用的训练集雪上加霜，且切分的方式也可能影响数据质量进而影响对模型性能的评估。解决这种为了检测模型训练而造成的数据集规模缩减也就可以让数据集物尽其用，毕竟蚊子肉也是肉。而这个解决之道就是交叉验证，保持模型在学习过程中，训练集和验证集不断变换。上一轮是训练集的数据，下一轮变换为验证集，而验证集的数据变为训练集。每一轮都构建一个新的相同结构的模型但是在“不同”的训练集和验证集上学习，所有的数据都会得到至少一次的验证。在数据集不够充分的情况下，将每一轮模型的评估分数求平均即可得到一个去除了数据集切分因素的模型性能评估，从而帮助模型参数调优。

以经典的二分类算法为例，我们可以使用K-fold validation来做交叉验证。代码如下：

```python
from sklearn.model_selection import KFold
import lightgbm as lgb

# 做三次交叉验证，并随机打乱数据

kf = KFold(n_splits=3, shuffle=True, random_state=2024)

cv_scores = []
for i, (train_index, valid_index) in enumerate(kf.split(train_x, train_y)):
    print ('%n fold' % (i))
    trn_x, trn_y = train_x.iloc[train_index], train_y[train_index]
    val_x, val_y = train_x.iloc[valid_index], train_y[valid_index]
    train_matrix = clf.Dataset(trn_x, label=trn_y)
    valid_matrix = clf.Dataset(val_x, label=val_y)
    params = {
        'boosting_type': 'gbdt',
        'objective': 'regression',
        'metric': 'mse',
        'min_child_weight': 6,
        'num_leaves': 2 ** 6,
        'lambda_l2': 10,
        'feature_fraction': 0.8,
        'bagging_fraction': 0.8,
        'bagging_freq': 4,
        'learning_rate': 0.1,
        'seed': 2024,
        'nthread' : 16,
        'verbose' : -1,
        }
    model = clf.train(params,
        train_matrix, 1000,
        valid_sets=[train_matrix, valid_matrix],
        callbacks=[log_evaluation(100),early_stopping_rounds(500)])
    val_pred  = model.predict(val_x)
    score = mean_absolute_error(val_y, val_pred)
    cv_scores.append(score)

print ('score: %f' % (np.mean(cv_scores)))
```