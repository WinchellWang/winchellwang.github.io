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

Theoretically, a machine learning method or deep learning algorithm should be able to learn from data and adjust the parameters by itself, just like a human reads a book. It should be noted that just as people are different, models are also different from one to one, and hyperparameters are used to control how the model looks like. From the coding point of view, hyperparameters define the structure of the model and the way of learning data. For example, the depth of the decision tree and minimizing the number of samples on a leaf can be considered as hyperparameters, as it shapes how the tree will be. Neural network can be designed with different number of layers, and the number of neurons in each hidden layer can also be flexible. Moreover, the learning rate and optimization method can also have many options. In most of the scenario, the choice of these hypermeters could significantly affect the performance, and the adjustment of these parameters, therefore, is important in model training.

# Automatic Optimization

There are many ways to optimize the hyperparameters, including manually adjust by your hand, or other automatically ways which we may prefer to do so. The "automatically optimization" essentially just do the same thing like humans, try different settings on the model and check the improvements. There are many ways to optimize the hyperparameters, such as grid search, random search, Bayesian optimization, genetic algorithm. Grid search and random search are the most fundamental one 

# Code Example