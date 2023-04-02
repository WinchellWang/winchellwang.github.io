---
layout: post
title: Common Units in Chemistry
subtitle: A brief manual to conclude the common units in chemistry
date: 2023-04-01
author: Moax.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Technology
   - Computer
header-mask: 0.1
catalog: true
---

**NOT Finish yet, Still drafting.**

# 1. Weight

## 1.1 Weight Percent

Weight Percent (重量比), P is used to express approximate concentrations. The term specifies the grams of substance per 100 grams of solution (**Solution just means the solution, does not include the substance**).

$$
P = {W \over W+W_0} \times 100\%
$$

> P = Percent of substance by weight <br>
W = Grams of substance <br>
W<sub>0</sub> = Grams of solution

## 1.2 Meaning of ppm

Let's assume that the substance does not change the density of the water, and the mixture contains 1 gram of substance in 1L water. Then we will have

$$
\begin{align}
{1mg \over L} = {1mg \over 1,000g} & = {1mg \over 10^6mg} = 1\ ppm \\
\therefore 1mg/L & = 1ppm
\end{align}
$$

## 1.3 Conversion between P and ppm

In the calculation of P, we assume that:

$W+W_0=W_0$ & the concentration of substance is 1ppm

Then:

$$
\begin{align}
P & = {W \over W+W_0} \times 100\% \\
& = {1mg \over 1L} \times 100\% \\
& = ({10^{-3} g \over 10^3 g} \times 100)\% \\
& = 10^{-4}\%
\end{align}
$$

Therefore:

$$
\boldsymbol{1ppm = 10^{-4} \% \qquad OR \qquad 1 \% = 10^4 ppm = 10^4 mg/L}
$$

**Notice:** In this conversion, we assumed that the total weight would not change with the add of more substance. However, the weight of substance will take effect and the error will increase, since the density is changing. **This convenient conversion would not be usable when the solute concentration exceeds 10%.**
