---
layout: post
title: 术之根本，AI建模三大核心之三：调参
subtitle: 永远绕不开的话题：数据，特征，和调参
date: 2024-12-29
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Computer
header-mask: 0.1
catalog: true
---

调参在这里其实包含两方面。首先是模型的选择，其次是对模型超参的调整。不同的数据结构适合的模型不同，尽管他们都叫机器学习或者神经网络。而对每一个具体的模型，其可控制的超参也因为相应模型的基础逻辑不同而大相径庭。

# 模型的选择

在模型的选择上，大致可以按照数据的类型分为数值模型和图像模型。图像模型某种程度上可以视为是数值模型的一种高维情况。在一般的数值模型中，输入的数据是一维的，不同位置上的数值反应的是某一特征参数的值。而图像模型则是一个数值矩阵，换言之是一个二维数据结构，这样的二维数据结构天然的符合处理图像信息的要求，因为图像就是由像素点上对应的亮度值构成的矩阵。但这样的模型只能处理图像吗？答案是显而易见的，任何的二维数据都可以在图像模型中得到处理。那么是否有更高维度的模型呢？答案也当然是肯定的，三维的立体神经网络也同样在学术界有着广泛的研究。但是随着维度的提升，信息的密度会大幅增加，模型的结构也因此有极大的调整，对于模型的优化训练难度也有增加。不论维度有多少，模型做的事情核心就是对数据进行压缩抽提，凝练输入信息中的关键，找到核心的判据来对数据进行处理。所以会发现，不论是一维的神经网络，还是二维的卷积神经网络抑或是更高的三维模型，他们整体而言处理信息的步骤都是在压缩。一维的神经网络相对特殊，但是大部分情况下整体上神经元数量逐层下降。二维模型非常典型的卷积核为了抽提像素中的关键信息，会把相邻像素的信息压缩到一个中。三维模型的卷积核也同样是将三维数据进一步压缩到更小的cube中。某种程度上而言，模型做的事情首先是去噪，其次是构建数值关联。去噪是通过压缩数据来完成，而数值的关联则就是通过每一个神经元中的weight和bias达到。

一般而言，如果是纯数值模型，即输入是一系列的特征值，那么一般的机器学习模型，如随机森林，SVM等或者神经网络都可以考虑选择使用。这些机器学习或者神经网络模型都可以做数值拟合或者分类问题，但具体哪种模型更加合适则要考虑方方面面。计算的复杂度，计算资源是否有限，是否需要即时学习等等。但一般而言，相比于固定结构的机器学习，神经网络模型会更具有弹性，原因也无外乎神经网络是由若干结构相同且简单的神经元连接而成。相比于其他模型基于的数学理论，神经网络就像乐高积木一样，更容易拆分和拼接。如果输入的数据特征是有着明显的相对位置关联的，那么会考虑到临近数值影响的更高维神经网络模型无疑是最为合适的选择。图像是其中的典型代表，但并不是唯一。

当我们对数据的关注扩展到时间或发生的先后层面上时，顺序也会成为一个关键信息。单纯的数值加上时间，它可能就会是一段音频。将一段话按词句顺序读出，它就是一段文本。将图片按时间串联起来，它就是一段视频。对于这样的与顺序有强相关的事件，RNN就是一种通用的选择。将数据依据顺序按一定距离拆分成若干块，将这样整块的数据送入模型学习会使模型注意到每个moment之间的联系。但事情也并非只有这样做才可以。将顺序/时序这一概念转化为一种具体的数学表达方式，那就容易找到合适的模型为之匹配。任何的可以将顺序信息加入到数据中的方式都可以训练出一个包含了顺序考虑的模型。将音频和时间打平在一张二维图像中，那么就可以使用CNN处理音频数据。将视频的每一帧叠放在一起，那么就可以使用3D CNN处理视频数据。除了将前后发生的所有moment打包在一起送入模型，顺序也同样可以是时间码，可以是一个与顺序相关在每一个moment中都有的特征，例如是平均亮度，人在的位置，等等。将这样与顺序强相关的特征插入每一个moment的输入中，也可以构建一个包含了顺序的模型。

在此之外，Transformer是一个不容忽视的可以有效处理各种顺序相关的模型。Transformer不同于传统的神经网络，引入了“注意力”机制，将输入映射到向量中并计算不同输入间的注意力得分。这样使模型自己学习到了而不是人为定义了哪一个和哪一个是有关的，哪个更重要（一般来说因为人们自己也不知道哪个更重要，所以设定的是每一个输入的事件都一样重要），在计算机的层面上可以自由的理解顺序事件间的相关性，表现普遍优于其他的模型。

但总而言之，还是有一个大概的表格可以告诉我们，什么样的数据什么样的任务适合采用什么样的模型进行培训。

| 任务类型 | 推荐模型 |
|---|---|
| 图像分类 | Convolutional Neural Network (CNN) |
| 音频分类 | Recurrent Neural Network (RNN), Convolutional Neural Network (CNN) |
| 数值分类 | Support Vector Machine (SVM), Random Forest, Neural Networks (e.g., MLP) |
| 数值拟合 | Linear Regression, Random Forest, Neural Networks (e.g., MLP) |
| 内容生成 | Generative Adversarial Network (GAN), Transformer (e.g., GPT) |
| 自然语言处理 | Recurrent Neural Network (RNN), Transformer (e.g., BERT, GPT) |

如前所述，不同的模型有自己的强项，但也有着自己的弱项。当面对一个复杂的任务要求时，结合不同模型构建一个混合模型就显得理所当然。一般而言，我们会有神经网络模型的混合。如为了解决生成视频AI评论的问题，结合了图像识别的CNN以及文本生成的RNN。此外也有机器学习和神经网络的混合。例如为了做到股价预测，通过随机森林进行关键特征筛分，再通过神经网络做出股价的预测。

# 参数调整

在选择了合适的模型之后，接下来就是对模型的超参进行调整。不同的模型有各自的超参，调整这些超参可以显著影响模型的性能。

## 随机森林 (Random Forest)

- **树的数量 (n_estimators)**: 增加树的数量通常可以提高模型的性能，但也会增加计算成本。
- **最大深度 (max_depth)**: 控制树的最大深度，防止过拟合。较小的深度可以防止过拟合，但可能导致欠拟合。
- **最小样本分裂数 (min_samples_split)**: 控制一个节点需要多少样本才能进一步分裂。较大的值可以防止过拟合。

## 支持向量机 (SVM)

- **正则化参数 (C)**: 控制误分类的惩罚力度。较大的值会导致较少的误分类，但可能过拟合。
- **核函数 (kernel)**: 常用的核函数有线性核、多项式核和径向基函数 (RBF)。选择合适的核函数对模型性能影响很大。
- **核函数参数 (gamma)**: 主要用于RBF核，控制单个训练样本的影响范围。较大的值会导致模型过拟合。

## 神经网络 (Neural Networks)

- **学习率 (learning rate)**: 控制模型更新权重的步长。较小的学习率可能导致训练时间过长，较大的学习率可能导致模型不收敛。
- **批量大小 (batch size)**: 每次更新权重时使用的样本数量。较大的批量大小可以提高训练速度，但可能导致模型性能下降。
- **隐藏层数和每层神经元数量**: 增加隐藏层数和每层神经元数量可以提高模型的表达能力，但也会增加过拟合的风险。

> 神经网络中的超参对下述的神经网络也同样适用。

## 卷积神经网络 (CNN)

- **卷积核大小 (kernel size)**: 控制卷积操作的窗口大小。较大的卷积核可以捕捉更多的特征，但也会增加计算成本。
- **池化层大小 (pool size)**: 控制池化操作的窗口大小。较大的池化层可以减少特征图的尺寸，但可能丢失重要信息。
- **过滤器数量 (filters)**: 控制每层卷积层的过滤器数量。增加过滤器数量可以提高模型的表达能力，但也会增加计算成本。

## 循环神经网络 (RNN)

- **隐藏层大小 (hidden size)**: 控制每个隐藏层的神经元数量。增加隐藏层大小可以提高模型的表达能力，但也会增加过拟合的风险。
- **时间步长 (time steps)**: 控制输入序列的长度。较长的时间步长可以捕捉更多的上下文信息，但也会增加计算成本。
- **丢弃率 (dropout rate)**: 控制在训练过程中随机丢弃神经元的比例。较高的丢弃率可以防止过拟合，但也会降低模型的表达能力。

## Transformer

- **注意力头数 (number of attention heads)**: 控制多头注意力机制中的头数。增加头数可以提高模型的表达能力，但也会增加计算成本。
- **隐藏层大小 (hidden size)**: 控制每个隐藏层的神经元数量。增加隐藏层大小可以提高模型的表达能力，但也会增加过拟合的风险。
- **前馈网络大小 (feed-forward network size)**: 控制前馈网络的神经元数量。增加前馈网络大小可以提高模型的表达能力，但也会增加计算成本。

除此之外，对神经网络而言，学习率是一个非常重要的控制点。步子迈大了不收敛，步子迈小了降不下去或者降的很慢，这都涉及到所研究的数据本身的分布情况。如果想加速前期的训练过程又不想最后不收敛，动态学习率是一个很好的选项。它可以是逐步下降的，也可以是按条件变换的。

此处以一个简单的神经网络为例，代码如下：

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim.lr_scheduler import StepLR

# 随机产生一个数据集为例
x_train = torch.rand(1000, 20)
y_train = torch.randint(0, 2, (1000, 1)).float()

# 定义神经网络模型
class ExampleNN(nn.Module):
   def __init__(self):
      super(ExampleNN, self).__init__()
      self.fc1 = nn.Linear(20, 64)
      self.fc2 = nn.Linear(64, 64)
      self.fc3 = nn.Linear(64, 1)
      self.relu = nn.ReLU()
      self.sigmoid = nn.Sigmoid()

   def forward(self, x):
      x = self.relu(self.fc1(x))
      x = self.relu(self.fc2(x))
      x = self.sigmoid(self.fc3(x))
      return x

model = ExampleNN()

# 定义损失函数和优化器
criterion = nn.BCELoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

# 定义学习率调度器
scheduler = StepLR(optimizer, step_size=10, gamma=0.1)

# 训练模型
num_epochs = 50
batch_size = 32
for epoch in range(num_epochs):
   permutation = torch.randperm(x_train.size()[0])
   for i in range(0, x_train.size()[0], batch_size):
      indices = permutation[i:i + batch_size]
      batch_x, batch_y = x_train[indices], y_train[indices]

      optimizer.zero_grad()
      outputs = model(batch_x)
      loss = criterion(outputs, batch_y)
      loss.backward()
      optimizer.step()

   scheduler.step()
   print(f'Epoch {epoch+1}/{num_epochs}, Loss: {loss.item()}')
```

> 在这个例子中，我们定义了一个神经网络模型，并使用 `StepLR` 来动态调整学习率。学习率在每10个epoch后乘0.1衰减。

除此之外，神经网络还有激活函数以及损失函数的选择。其中激活函数的选择有时也要考虑到参数爆炸或参数消失，但更多的是要考虑自己数据的特点。

## 常用激活函数

- [**Sigmoid**:](https://pytorch.org/docs/stable/generated/torch.nn.Sigmoid.html)
  
  $$
  \sigma(x) = \frac{1}{1 + e^{-x}}
  $$

  > 将输入映射到 (0, 1) 之间，常用于二分类问题的输出层。

- [**Tanh** (Hyperbolic Tangent):](https://pytorch.org/docs/stable/generated/torch.nn.Tanh.html)
  
  $$
  \tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}
  $$

  > 将输入映射到 (-1, 1) 之间，常用于隐藏层，具有零均值特性。

- [**ReLU** (Rectified Linear Unit):](https://pytorch.org/docs/stable/generated/torch.nn.ReLU.html)
  
  $$
  \text{ReLU}(x) = \max(0, x)
  $$

  > 将负值映射为零，正值保持不变，计算简单且常用于隐藏层。

- [**Leaky ReLU**:](https://pytorch.org/docs/stable/generated/torch.nn.LeakyReLU.html)
  
  $$
  \text{Leaky ReLU}(x) = \begin{cases} 
  x & \text{if } x > 0 \\
  \alpha x & \text{if } x \leq 0 
  \end{cases}
  $$

  > 其中 $\alpha$ 通常是一个小的常数，例如 0.01。解决了ReLU的“死亡”问题，使负值也有一定的梯度。

- [**ELU** (Exponential Linear Unit):](https://pytorch.org/docs/stable/generated/torch.nn.ELU.html)
  
  $$
  \text{ELU}(x) = \begin{cases} 
  x & \text{if } x > 0 \\
  \alpha (e^x - 1) & \text{if } x \leq 0 
  \end{cases}
  $$

  > 其中 $\alpha$ 是一个超参数。相比于ReLU，ELU在负值区域有更平滑的输出。

- [**Softmax**:](https://pytorch.org/docs/stable/generated/torch.nn.Softmax.html)
  
  $$
  \text{Softmax}(x_i) = \frac{e^{x_i}}{\sum_{j} e^{x_j}}
  $$

  > 将输入映射到 (0, 1) 之间，并且所有输出的和为1，常用于多分类问题的输出层。

其中Sigmoid和Softmax是最为常用的非线性激活函数，ReLU有时也因为其在大于0时的线性变换而采用。

此外，损失函数的选择也同样重要，但多为MAE和MSE。取决于具体训练中的error是否大于1。因为我们总是尽可能希望误差被放大，使得模型每次都可以有效调整自己。

## 常用损失函数

- [**均方误差 (Mean Squared Error, MSE)**:](https://pytorch.org/docs/stable/generated/torch.nn.MSELoss.html)
  
  $$
  \text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
  $$

   > 适用于回归问题，衡量预测值与真实值之间的平均平方差。

- [**平均绝对误差 (Mean Absolute Error, MAE)**:](https://pytorch.org/docs/stable/generated/torch.nn.L1Loss.html)
  
  $$
  \text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|
  $$

   > 适用于回归问题，衡量预测值与真实值之间的平均绝对差。

- [**交叉熵损失 (Cross-Entropy Loss)**:](https://pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html)
  
  $$
  \text{Cross-Entropy} = -\sum_{i=1}^{n} y_i \log(\hat{y}_i)
  $$

   > 适用于分类问题，衡量预测概率分布与真实分布之间的差异。

- [**二元交叉熵损失 (Binary Cross-Entropy Loss)**:](https://pytorch.org/docs/stable/generated/torch.nn.BCELoss.html)
  
  $$
  \text{Binary Cross-Entropy} = -\frac{1}{n} \sum_{i=1}^{n} [y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i)]
  $$

   > 适用于二分类问题。

- [**负对数似然损失 (Negative Log-Likelihood Loss, NLLLoss)**:](https://pytorch.org/docs/stable/generated/torch.nn.NLLLoss.html)
  
  $$
  \text{NLLLoss} = -\sum_{i=1}^{n} \log P(y_i | x_i)
  $$

   > 适用于分类问题，通常与Softmax激活函数一起使用。

- [**Huber损失 (Huber Loss)**:](https://pytorch.org/docs/stable/generated/torch.nn.HuberLoss.html)
  
  $$
  \text{Huber}(y, \hat{y}) = \begin{cases} 
  \frac{1}{2}(y - \hat{y})^2 & \text{if } |y - \hat{y}| \leq \delta \\
  \delta |y - \hat{y}| - \frac{1}{2}\delta^2 & \text{otherwise}
  \end{cases}
  $$

   > 适用于回归问题，结合了MSE和MAE的优点，对异常值不敏感。

- [**KL散度 (Kullback-Leibler Divergence, KLDivLoss)**:](https://pytorch.org/docs/stable/generated/torch.nn.KLDivLoss.html)
  
  $$
  \text{KL}(P || Q) = \sum_{i} P(i) \log \frac{P(i)}{Q(i)}
  $$

   > 衡量两个概率分布之间的差异，常用于生成模型。

调整超参数是一个反复试验的过程，需要根据具体的数据集和任务进行多次尝试，以找到最佳的超参数组合。当超参的可选组合非常多时，人工的一个个测试就会显得相当的麻烦，此时我们就可以使用Grid Search或Random Search，[由电脑自己寻找最佳的超参设置](https://winchellwang.github.io/2024/07/30/hyperparam_optim_lightgbm/)，省却我们的烦恼。