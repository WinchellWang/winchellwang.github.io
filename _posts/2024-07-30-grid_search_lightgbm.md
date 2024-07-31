---
layout: post
title: Automatic Hyperparameter Optimization
subtitle: Automatic Optimize LightGBM Parameters for Chemical Reaction Yield Prediction
date: 2024-07-30
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Computer
header-mask: 0.1
catalog: true
---

# Hyperparameter

Theoretically, a machine learning method or deep learning algorithm should be able to learn from data and adjust the parameters by itself, just like a human reads a book. In reality, it should be noted that just as people are different, models are also different from one to one, and hyperparameters are used to control how the model looks like. From the coding point of view, hyperparameters define the structure of the model and the way of learning data. For example, the depth of the decision tree and minimizing the number of samples on a leaf can be considered as hyperparameters, as it shapes how the tree will be. Neural network can be designed with different number of layers, and the number of neurons in each hidden layer can also be flexible. Moreover, the learning rate and optimization method can also have many options. In most of the scenario, the choice of these hyperparameters could significantly affect the performance, and the adjustment of these parameters, therefore, is important in model training.

# Automatic Optimization

There are many ways to optimize the hyperparameters, including manual adjustment by your hand, or other automatic ways that we may prefer to do so. The "automatic optimization" essentially just does the same thing as humans, trying different settings on the model and checking the improvements. There are many ways to optimize the hyperparameters, such as grid search, random search, Bayesian optimization, genetic algorithm. Grid search and random search are the most basic. It basically just tries all combinations of settings. While the other methods are more efficient to adjust the hyperparameters based on the loss, and has been demonstrated in this post.

# Code Example

Here is an example where we use ```optuna``` to optimize the hyperparameters.

Assume that we have data like:

|Reactant1|Reactant2|Product|Additive|Solvent|Yield|
|:---:|:---:|:---:|:---:|:---:|:---:|
|c1ccc2c(c1)Nc1ccccc1O2|Brc1ccccc1I|Brc1ccccc1N1c2ccccc2Oc2ccccc21|CC(C)(C)[O-].CC(C)(C)[PH+](C(C)(C)C)C(C)(C)C.F[B-](F)(F)F.F[B-](F)(F)F.O=C(C=Cc1ccccc1)C=Cc1ccccc1.O...|Cc1ccccc1|0.78|
|c1ccc2c(c1)Nc1ccccc1O2|Brc1ccccc1I|Brc1ccccc1N1c2ccccc2Oc2ccccc21|C1COCCOCCOCCOCCOCCO1.O=C([O-])[O-].[Cu+].[I-].[K+].[K+]|Clc1ccccc1Cl|0.9|
|...|...|...|...|...|...|

Here we want to predict the yield of the product based on the reaction equation and conditions.

## Feature Engineering

As the structure of molecule is just a bunch of string value which cannot be understood and processed by computer, we need to convert it into a series of number which can be done in many ways. Here we use ```rdkit``` to convert it to [MorganFingerprint](https://www.rdkit.org/docs/source/rdkit.Chem.rdMolDescriptors.html).

```python
import pandas as pd
from tqdm import tqdm # progress bar

from rdkit.Chem import rdMolDescriptors # convert molecule to number

from rdkit import RDLogger,Chem
import lightgbm as lgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import numpy as np
import warnings
import optuna # hyperparameter optimizier


RDLogger.DisableLog('rdApp.*')
warnings.filterwarnings('ignore')

def mfgen(mol,nBits=2048, radius=2):
   fp = rdMolDescriptors.GetMorganFingerprintAsBitVect(
      mol,
      radius=radius,
      nBits=nBits
      )
   return np.array(list(map(eval,list(fp.ToBitString()))))

def vec_cpd_lst(smi_lst):
   smi_set = list(set(smi_lst))
   smi_vec_map = {}
   for smi in tqdm(smi_set):
      mol = Chem.MolFromSmiles(smi)
      smi_vec_map[smi] = mfgen(mol)
   smi_vec_map[''] = np.zeros(2048)
   
   vec_lst = [smi_vec_map[smi] for smi in smi_lst]
   return np.array(vec_lst)

def load_train():
   DATA = pd.read_csv('train_data.csv')
   DATA_rct1_smi = DATA['Reactant1'].to_list()
   DATA_rct2_smi = DATA['Reactant2'].to_list()
   DATA_add_smi = DATA['Additive'].to_list()
   DATA_sol_smi = DATA['Solvent'].to_list()
   DATA_rct1_fp = vec_cpd_lst(DATA_rct1_smi)
   DATA_rct2_fp = vec_cpd_lst(DATA_rct2_smi)
   DATA_add_fp = vec_cpd_lst(DATA_add_smi)
   DATA_sol_fp = vec_cpd_lst(DATA_sol_smi)
   DATA_X = np.concatenate(
      [
         DATA_rct1_fp,
         DATA_rct2_fp,
         DATA_add_fp,
         DATA_sol_fp
         ],
      axis=1,
   )
   DATA_Y = DATA['Yield'].to_numpy()
   return DATA_X, DATA_Y

DATA_X, DATA_Y = load_train()
```

## Hyperparameter Optimization

Here we use ```optuna``` to find the best settings for ```lightgbm```.

```python
def objective(trial):
   param = {
      'objective': 'regression',
      'metric': 'mae',
      'verbosity': -1,
      'boosting_type': 'gbdt',
      'device' : 'gpu',
      'seed': 2024,
      'lambda_l2': trial.suggest_loguniform('lambda_l2', 1e-8, 10.0),
      'num_leaves': trial.suggest_int('num_leaves', 2 ** 3, 2 ** 10),
      'feature_fraction': trial.suggest_uniform('feature_fraction', 0.4, 1.0),
      'bagging_fraction': trial.suggest_uniform('bagging_fraction', 0.4, 1.0),
      'bagging_freq': trial.suggest_int('bagging_freq', 1, 7),
      'min_child_weight': trial.suggest_int('min_child_weight', 1, 10),
      'learning_rate': trial.suggest_loguniform('learning_rate', 0.005, 0.2),
   }
   DATA_X, DATA_Y = np.load('DATA_X.npy'), np.load('DATA_Y.npy')
   X_train, X_val, Y_train, Y_val = train_test_split(
      DATA_X, DATA_Y,
      shuffle=True,
      test_size=0.2,
      random_state=2024)
   train_matrix = lgb.Dataset(X_train, label=Y_train)
   valid_matrix = lgb.Dataset(X_val, label=Y_val)
   model = lgb.train(
      param,
      train_matrix,
      1000,
      valid_sets=[train_matrix, valid_matrix],
      categorical_feature=[],
      callbacks=[lgb.early_stopping(100)]
      )
   preds = model.predict(X_val)
   mae = mean_absolute_error(Y_val, preds)
   return mae

study = optuna.create_study(
   study_name='LighGBM_Param_Optim',
   direction='minimize',
   )
study.optimize(objective, n_trials=5, n_jobs=1,show_progress_bar=True)
```

In ```param```, we define the settings for ```lightgbm```, where ```trial.suggest_***``` means that ```optuna``` would optimize the corresponding parameter in the following range. For example, 

```python
trial.suggest_int('num_leaves', 2 ** 3, 2 ** 10),
```

means that the parameter is set between 8 and 1024, and can only be an integer number.

This code will run 5 times (```n_trails```), and will give you the best hyperparameter combination with the lowest ```mae``` (```direction='minimize'```).

Then the best settings can be printed by

```python
print('Best trial:', study.best_trial.params)
```

And can be saved to a json file using

```python
import json

best_params = study.best_trial.params

filename = 'best_trial_params.json'

with open(filename, 'w') as f:
    json.dump(best_params, f, indent=4)

print(f"Best trial parameters saved to {filename}")
```

## Model Training

Once we have the best parameters, the model can be build with the following code.

```python
def train(DATA_X, DATA_Y):
   X_train, X_val, Y_train, Y_val = train_test_split(
      DATA_X, DATA_Y,
      shuffle=True,
      test_size=0.2,
      random_state=2024
      )
   train_matrix = lgb.Dataset(X_train, label=Y_train)
   valid_matrix = lgb.Dataset(X_val, label=Y_val)
   lgb_params = {
      'boosting_type': 'gbdt',
      'objective': 'regression',
      'metric': 'mae',
      'min_child_weight': 6,
      'num_leaves': 1000,
      'lambda_l2': 0.5,
      'feature_fraction': 0.7,
      'bagging_fraction': 0.7,
      'bagging_freq': 5,
      'learning_rate': 0.005,
      'seed': 2024,
      'nthread' : 16,
      'verbose' : -1,
      'device' : 'gpu',
   }
   model = lgb.train(
      lgb_params,
      train_matrix,
      10000,
      valid_sets=[train_matrix, valid_matrix],
      categorical_feature=[],
      callbacks=[lgb.log_evaluation(100),lgb.early_stopping(1000)]
      )
   val_pred = model.predict(
      X_val,
      num_iteration=model.best_iteration
      )
   score = mean_squared_error(val_pred, Y_val)
   print('Validation Set Score:',score)
   model.save_model('lgbr_best.txt',num_iteration=model.best_iteration)
   return model

model = train(DATA_X, DATA_Y)
```

## Prediction

And predict the value of the yield for each reaction by

```python
def load_test():
    DATA = pd.read_csv('task1_test_data.csv')
    DATA_rct1_smi = DATA['Reactant1'].to_list()
    DATA_rct2_smi = DATA['Reactant2'].to_list()
    DATA_add_smi = DATA['Additive'].to_list()
    DATA_sol_smi = DATA['Solvent'].to_list()
    DATA_rct1_fp = vec_cpd_lst(DATA_rct1_smi)
    DATA_rct2_fp = vec_cpd_lst(DATA_rct2_smi)
    DATA_add_fp = vec_cpd_lst(DATA_add_smi)
    DATA_sol_fp = vec_cpd_lst(DATA_sol_smi)
    DATA_X = np.concatenate([DATA_rct1_fp,DATA_rct2_fp,DATA_add_fp,DATA_sol_fp],axis=1)
    np.save('test_X.npy', DATA_X)
    return DATA_X

DATA_X = load_test()
model = lgb.Booster(model_file='lgbr_best.txt')
prediction = model.predict(DATA_X, num_iteration=model.best_iteration)
```