---
layout: post
title: 训练21点AI专家
subtitle: 以生成对抗网络培训21点扑克AI专家
date: 2024-06-24
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Computer
header-mask: 0.1
catalog: true
---

# 生成对抗网络

生成对抗网络（Generative Adversarial Network，GAN）是一种训练AI模型的方法。传统的AI训练模式基本是给出数据集，然后构建单一的AI模型框架，AI在给定的框架下自己闷头学。GAN则是另辟蹊径，构建多个AI模型互相卷，即**养蛊**。在AI训练中，往往涉及到三个基本模块，数据集，学习，预测和反馈。数据集在传统情况下是固定不变的，学习则由定义好的AI框架下进行，预测由训练好的AI模型做出并由人为定义的评估方法反馈预测质量。在GAN中，数据集不再是一成不变而是同样由AI产生。一个AI专门生成各式各样的数据集，另一个AI学习这个AI生成的数据集。这样听起来似乎很困惑，但如果想像成是你画我猜，一个AI在其中画画，并且它清楚的知道画的是什么东西，另一个AI来猜画的是什么。在这一过程中猜画的AI会逐渐学习到不同的物体长什么样子，并且具体都是什么名字，这就是绘画人与猜题人的对抗。再往前走一步，也可以做到每个AI都在生成数据集，每个AI都在学习另一个AI产生的数据集。例如两个或多个玩家在玩斗地主，斗地主的规则是明确的，只需要写好一个判定的裁判，然后构建三四个AI玩家。这些AI玩家在刚开始一无所知随意打牌，但会不断的得到裁判的反馈，每个AI玩家有输有赢并逐渐“领悟”了斗地主是一个怎么样的游戏，以及如何出牌才能获胜。在这里多个AI模型互相对抗，每一个AI的训练集都是所有AI的行为合集。因此生成对抗网络这一概念非常适合两个场景下的机器学习。第一，人为可获取的数据集有限的情况。这里可以用有限的数据集训练一个绘画人，其可以产生超大量的数据来训练猜题人，解决了数据集有限的困境。第二，涉及到存在明确规则的场景。这里数据集不再需要获取，只需要定义好游戏规则，AI自己便会在规则的八角笼内逐步学会如何应对。

# 重写游戏代码

> 以21点扑克游戏为例

这里需要对[21点的游戏脚本](https://winchellwang.github.io/2024/04/15/blackjack_py_code/#python-code)做一定程度的重写使之适合电脑自己玩。

```python
import random
import pandas as pd

class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __str__(self):
        return f"{self.value} of {self.suit}"

class Deck:
    def __init__(self):
        self.cards = []
        suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
        for suit in suits:
            for value in values:
                self.cards.append(Card(suit, value))

    def shuffle(self):
        random.shuffle(self.cards)

    def deal_card(self):
        if len(self.cards) == 0:
            return None
        return self.cards.pop()

class Player:
    def __init__(self, name):
        self.name = name
        self.hand = []

    def add_card_to_hand(self, card):
        self.hand.append(card)

    def hand_value(self):
        value = 0
        has_ace = False
        for card in self.hand:
            if card.value.isdigit():
                value += int(card.value)
            elif card.value in ['Jack', 'Queen', 'King']:
                value += 10
            elif card.value == 'Ace':
                has_ace = True
                value += 11
        if has_ace and value > 21:
            value -= 10
        return value

def scoreboard(players):
    # current score
    player_score = pd.DataFrame({'Score':[0.0,0.0,0.0,0.0],'Distance':[21.0,21.0,21.0,21.0],'Reward':[0.0,0.0,0.0,0.0]})
    for player in players:
        player_score.loc[player.name,'Score'] = player.hand_value()
    player_score.loc[:,'Distance'] = 10*(21 - player_score.loc[:,'Score'])/21
    player_score.loc[player_score['Distance'] < 0, 'Distance'] = -10
    return player_score

def hand(players):
    # cards on hand
    player_cards = pd.DataFrame(columns=[0,1,2,3,4,5,6,7,8], index=range(4))
    for player in players:
        m = 0
        for card in player.hand:
            player_cards.loc[player.name,m] = card.value
            m += 1
    return player_cards

def deckcard(players):
    # cards on deck (possible_from_single_player_view)
    deck_cards = pd.DataFrame(columns=['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JQK', 'Ace'], index=['num', 'percent'])
    deck_cards.loc['num',:] = 4
    deck_cards.loc['num', 'JQK'] = 12
    num_cards = deck_cards.loc['num',:].sum()
    deck_cards.loc['percent',:] = deck_cards.loc['num',:]/num_cards
    for player in players:
        for card in player.hand:
            value = card.value
            if value.isdigit():
                deck_cards.loc['num',value] -= 1
            elif card.value in ['Jack', 'Queen', 'King']:
                deck_cards.loc['num', 'JQK'] -= 1
            elif card.value == 'Ace':
                deck_cards.loc['num', 'Ace'] -= 1
    num_cards = deck_cards.loc['num',:].sum()
    deck_cards.loc['percent',:] = deck_cards.loc['num',:]/num_cards
    return deck_cards

def reward(player_score):
    player_score.loc[player_score['Distance'] == -10, 'Distance'] = 100
    score_rank = player_score.sort_values('Distance')['Distance'].unique()
    rewards = [10, 7, 4, 0]
    for i, distance in enumerate(score_rank):
        player_score.loc[player_score['Distance'] == distance, 'Reward'] = rewards[i]
    player_score.loc[player_score['Distance'] == 100, 'Distance'] = -10
    player_score.loc[player_score['Distance'] == -10, 'Reward'] = 0
    return player_score

def game_init():
    # initialize game
    deck = Deck()
    deck.shuffle()
    players = [Player(0), Player(1), Player(2), Player(3)]
    # Deal two cards to each player
    for _ in range(2):
        for player in players:
            player.add_card_to_hand(deck.deal_card())
    return players, deck
```

# 定义神经网络

这里需要定义神经网络的架构，并写好神经网络的训练以及预测的函数方便后面做对抗训练。这里选择最经典的反向传播神经网络并选用ReLU函数。因为我们希望知道的是抽牌还是过牌以及胜率，所以激活函数不需要在小于0的区间内有值。

```python
import torch
import torch.nn as nn
import numpy as np

if torch.cuda.is_available():
    device = torch.device('cuda')
elif torch.backends.mps.is_available():
    device = torch.device('mps')
else:
    device = torch.device('cpu')

class NeuralNet(nn.Module):

    def __init__(self,input_size):
        super(NeuralNet,self).__init__()
        self.relu = nn.ReLU()
        self.linear1 = nn.Linear(input_size,input_size*2,device=device)
        self.linear2 = nn.Linear(input_size*2,input_size*3,device=device)
        self.linear3 = nn.Linear(input_size*3,input_size*2,device=device)
        self.linear4 = nn.Linear(input_size*2,3,device=device)

    def forward(self,x):
        out = self.linear1(x)
        out = self.relu(out)
        out = self.linear2(out)
        out = self.relu(out)
        out = self.linear3(out)
        out = self.relu(out)
        out = self.linear4(out)
        return out

def model_training(x,y,num_epochs=50):
    x = x.to_numpy()
    y = y.to_numpy()
    neural_model = NeuralNet(input_size=8)
    optimizer  = torch.optim.SGD(neural_model.parameters(),lr=0.005)
    criterion = nn.L1Loss()
    loss_save = 99999
    y,x = torch.from_numpy(y.astype(np.float32)).to(device),torch.from_numpy(x.astype(np.float32)).to(device)
    for epoch in range(num_epochs):
        # forward path and loss
        y_pred = neural_model(x)
        train_loss = criterion(y_pred,y)
        # backward pass
        train_loss.backward()
        # update
        optimizer.step()
        # empty gradient
        optimizer.zero_grad()
        # if (epoch+1) % 100 == 0:
        #     print(f'[Neural Model]: epoch {epoch+1}, training_loss = {train_loss.item():.4f}')
        if loss_save > train_loss.item():
            neural_model_save = neural_model.state_dict().copy()
            loss_save = train_loss.item()     
    return neural_model_save

def model_prediction(x,neural_model):
    model = NeuralNet(input_size=8)
    model.load_state_dict(neural_model)
    model.eval()
    with torch.no_grad():
        x = torch.from_numpy(x.astype(np.float32)).to(device)
        y = model(x)
    return y.cpu().numpy()

def continue_training(model, x, y, num_epochs=200):
    x = x.to_numpy()
    y = y.to_numpy()
    neural_model = NeuralNet(input_size=8)
    neural_model.load_state_dict(model)
    optimizer = torch.optim.SGD(neural_model.parameters(), lr=0.005)
    criterion = nn.L1Loss()
    loss_save = criterion(neural_model(torch.from_numpy(x.astype(np.float32)).to(device)), torch.from_numpy(y.astype(np.float32)).to(device)).item()
    for epoch in range(num_epochs):
        # forward path and loss
        y_pred = neural_model(torch.from_numpy(x.astype(np.float32)).to(device))
        train_loss = criterion(y_pred, torch.from_numpy(y.astype(np.float32)).to(device))
        # backward pass
        train_loss.backward()
        # update
        optimizer.step()
        # empty gradient
        optimizer.zero_grad()
        if train_loss.item() < loss_save:
            model = neural_model.state_dict().copy()
            loss_save = train_loss.item()
    return model
```

# 定义对抗方法

这里有四名玩家全部是AI模型，AI的输入是牌场上的基本信息，自己的和其他人的手牌距离21点有多远以及当前情况下大家的排名顺序。输出则是抽牌，过牌以及胜率。

```python
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np

def ai_game(model, loop_num = 500):
    log = pd.DataFrame(columns=['num', 'player',
                                'distance', 'reward',
                                'o0_distance', 'o0_reward',
                                'o1_distance', 'o1_reward',
                                'o2_distance', 'o2_reward',
                                'hit', 'hold', 'win'])
    row = 0
    for game_round in range(loop_num):
        players, deck = game_init()
        for player in players:
            while player.hand_value() <= 21:
                # update log
                player_score = scoreboard(players)
                player_score = reward(player_score)
                log.loc[row,'num'] = game_round
                log.loc[row,'player'] = player.name
                log.loc[row,'distance'] = player_score.loc[player.name,'Distance']
                log.loc[row,'reward'] = player_score.loc[player.name,'Reward']
                log.loc[row,'win'] = 0
                log.loc[row,'hit'] = 0
                log.loc[row,'hold'] = 0
                pred_input = np.array([[
                    log.loc[row,'distance'], # distance
                    log.loc[row,'reward'], # reward
                    np.nan, # o0_distance
                    np.nan, # o0_reward /10
                    np.nan, # o1_distance
                    np.nan, # o1_reward /10
                    np.nan, # o2_distance
                    np.nan, # o2_reward /10
                    ]])
                o_player = 0
                for other_player in players:
                    if other_player.name != player.name:
                        log.loc[row,'o%i_distance' % o_player] = player_score.loc[other_player.name,'Distance']
                        log.loc[row,'o%i_reward' % o_player] = player_score.loc[other_player.name,'Reward']/10
                        pred_input[0,o_player*2+2] = log.loc[row,'o%i_distance' % o_player]
                        pred_input[0,o_player*2+3] = log.loc[row,'o%i_reward' % o_player]
                        o_player += 1
                prediction = model_prediction(pred_input,model[player.name])
                if prediction[0,0] > prediction[0,1]:
                    player.add_card_to_hand(deck.deal_card())
                    log.loc[row,'hit'] = 1
                    row += 1
                else:
                    log.loc[row,'hold'] = 1
                    row += 1
                    break
            if player.hand_value() > 21:
                player_score = scoreboard(players)
                player_score = reward(player_score)
                log.loc[row,'num'] = game_round
                log.loc[row,'player'] = player.name
                log.loc[row,'distance'] = player_score.loc[player.name,'Distance']
                log.loc[row,'reward'] = player_score.loc[player.name,'Reward']
                log.loc[row,'win'] = 0
                log.loc[row,'hit'] = 0
                log.loc[row,'hold'] = 1
                o_player = 0
                for other_player in players:
                    if other_player.name != player.name:
                        log.loc[row,'o%i_distance' % o_player] = player_score.loc[other_player.name,'Distance']
                        log.loc[row,'o%i_reward' % o_player] = player_score.loc[other_player.name,'Reward']/10
                        o_player += 1
                row += 1
        # winner 1, loser 0
        final = reward(scoreboard(players))
        winner_list = final.loc[final['Reward'] == 10].index.to_list()
        for winner in winner_list:
            log.loc[(log['num'] == game_round) & (log['player'] == winner), 'win'] = 1
    return log

def ai_train(training_data):
    x = training_data.loc[:,['distance', 'reward',
                            'o0_distance', 'o0_reward',
                            'o1_distance', 'o1_reward',
                            'o2_distance', 'o2_reward',]].copy()
    y = training_data.loc[:,['hit', 'hold', 'win']].copy()
    x_1, x_2, y_1, y_2 = train_test_split(x, y, test_size=0.5, random_state=60)
    x_1, x_3, y_1, y_3 = train_test_split(x_1, y_1, test_size=0.5, random_state=14)
    x_2, x_4, y_2, y_4 = train_test_split(x_2, y_2, test_size=0.5, random_state=9)
    model_0 = model_training(x_1,y_1,num_epochs=2000)
    model_1 = model_training(x_2,y_2,num_epochs=2000)
    model_2 = model_training(x_3,y_3,num_epochs=2000)
    model_3 = model_training(x_4,y_4,num_epochs=2000)
    model = {0:model_0, 1:model_1, 2:model_2, 3:model_3}
    return model

def get_top_winners(log, n=2):
    log_unique = log.drop_duplicates(subset=['num', 'player'])
    top_winners = log_unique[log_unique['win'] == 1]['player'].value_counts().nlargest(n).index.tolist()
    return top_winners

def ai_update(model,training_log,epochs=2000):
    winner_list = get_top_winners(training_log, n=2)
    x = training_log.loc[:,['distance', 'reward',
                        'o0_distance', 'o0_reward',
                        'o1_distance', 'o1_reward',
                        'o2_distance', 'o2_reward',]].copy()
    y = training_log.loc[:,['hit', 'hold', 'win']].copy()
    x_1, x_2, y_1, y_2 = train_test_split(x, y, test_size=0.5, random_state=60)
    x_1, x_3, y_1, y_3 = train_test_split(x_1, y_1, test_size=0.5, random_state=14)
    x_2, x_4, y_2, y_4 = train_test_split(x_2, y_2, test_size=0.5, random_state=9)
    model_0 = continue_training(model[winner_list[0]],x_1,y_1,num_epochs=epochs)
    model_1 = continue_training(model[winner_list[0]],x_2,y_2,num_epochs=epochs)
    model_2 = continue_training(model[winner_list[1]],x_3,y_3,num_epochs=epochs)
    model_3 = continue_training(model[winner_list[1]],x_4,y_4,num_epochs=epochs)
    model = {0:model_0, 1:model_1, 2:model_2, 3:model_3}
    return model
```

# 种子数据集

需要注意的是，这里需要随机产生第一个种子数据集来训练初始模型。我就写了一个由随机数控制是否抽牌的代码来做第一个数据集。

```python
def init_training():
    log = pd.DataFrame(columns=['num', 'player',
                                'distance', 'reward',
                                'o0_distance', 'o0_reward',
                                'o1_distance', 'o1_reward',
                                'o2_distance', 'o2_reward',
                                'hit', 'hold', 'win'])
    row = 0
    for game_round in range(500):
        players, deck = game_init()
        for player in players:
            for _ in range(14):
                # update log
                player_score = scoreboard(players)
                player_score = reward(player_score)
                log.loc[row,'num'] = game_round
                log.loc[row,'player'] = player.name
                log.loc[row,'distance'] = player_score.loc[player.name,'Distance']
                log.loc[row,'reward'] = player_score.loc[player.name,'Reward']
                log.loc[row,'win'] = 0
                log.loc[row,'hit'] = 0
                log.loc[row,'hold'] = 0
                o_player = 0
                for other_player in players:
                    if other_player.name != player.name:
                        log.loc[row,'o%i_distance' % o_player] = player_score.loc[other_player.name,'Distance']
                        log.loc[row,'o%i_reward' % o_player] = player_score.loc[other_player.name,'Reward']/10
                        o_player += 1
                if player.hand_value() > 21:
                    log.loc[row,'hold'] = 1
                    row += 1
                    break
                # 1 hit, 0 stand
                if random.randrange(2) == 1:
                    log.loc[row,'hit'] = 1
                    player.add_card_to_hand(deck.deal_card())
                    row += 1
                else:
                    log.loc[row,'hold'] = 1
                    row += 1
                    break
        final = reward(scoreboard(players))
        winner_list = final.loc[final['Reward'] == 10].index.to_list()
        for winner in winner_list:
            log.loc[(log['num'] == game_round) & (log['player'] == winner), 'win'] = 1
    return log

log = init_training()
log.to_csv('random_training_init.csv', index=False)
```

# 初始模型

在这将种子数据集随机分为四块训练四位AI玩家。

```python
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
initial_data = pd.read_csv('random_training_init.csv')
x = initial_data.loc[:,['distance', 'reward',
                        'o0_distance', 'o0_reward',
                        'o1_distance', 'o1_reward',
                        'o2_distance', 'o2_reward',]].copy()
y = initial_data.loc[:,['hit', 'hold', 'win']].copy()
x_1, x_2, y_1, y_2 = train_test_split(x, y, test_size=0.5, random_state=60)
x_1, x_3, y_1, y_3 = train_test_split(x_1, y_1, test_size=0.5, random_state=14)
x_2, x_4, y_2, y_4 = train_test_split(x_2, y_2, test_size=0.5, random_state=9)
model_0 = model_training(x_1,y_1,num_epochs=2000)
model_1 = model_training(x_2,y_2,num_epochs=2000)
model_2 = model_training(x_3,y_3,num_epochs=2000)
model_3 = model_training(x_4,y_4,num_epochs=2000)
model = {0:model_0, 1:model_1, 2:model_2, 3:model_3}
torch.save(model, 'model_init.pt')
```
# 对抗训练

```python
model = torch.load('model_init.pt')
for _ in range(10000):
    # game rounds after each training
    log = ai_game(model,loop_num=200)
    # update model
    model = ai_update(model,log,epochs=2000)
torch.save(model, 'model.pt')
```

# 性能检查

```python
def calculate_games_won(log):
    log_unique = log.drop_duplicates(subset=['num', 'player'])
    games_won = log_unique.groupby('player')['win'].sum()
    return games_won

init_model = torch.load('model_init.pt')
update_model = torch.load('model.pt')
# the first two players are using the updated model, while the last two players are using the initial model
model = {0:update_model[0], 1:update_model[1], 2:init_model[0], 3:init_model[1]}
log = ai_game(model,loop_num=1000)
calculate_games_won(log)
```

> 目前这个模型还只是一个概念，具体性能上是否可以训练出玩21点的必胜玩家还尚未可知。这个取决于输入和奖励的设计是否合理。