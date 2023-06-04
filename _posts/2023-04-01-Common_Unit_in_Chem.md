---
layout: post
title: Common Units in Chemistry
subtitle: A brief manual to conclude the common units in chemistry
date: 2023-04-01
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Technology
   - Chemistry
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

## 1.3 Convert to ppb

1 ppb is defined as 1 parts-per billion, which following this rule to convert to ppm:

$$
1 ppb = 0.001 ppm
$$

$$
1ppm = {1\over{1\over 1000}}ppb = 1000ppb
$$

## 1.4 Conversion between P and ppm

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

## 1.5 Unit of Weight

|Unit|to Gram|Equivalent to|
|---|---|---|
|Gram (g)|1g|10<sup>-3</sup>kg|
|Milligram (mg)|10<sup>-3</sup>g|10<sup>-3</sup>g|
|Microgram (μg)|10<sup>-6</sup>g|10<sup>-3</sup>mg|
|Nanogram (ng)|10<sup>-9</sup>g|10<sup>-3</sup>μg|
|Picogram (pg)|10<sup>-12</sup>g|10<sup>-3</sup>ng|
|Femtogram (fg)|10<sup>-15</sup>g|10<sup>-3</sup>pg|
|Attogram (ag)|10<sup>-18</sup>g|10<sup>-3</sup>fg|
|Zeptogram (zg)|10<sup>-21</sup>g|10<sup>-3</sup>ag|
|Pound (lb)|453.592g|16oz|
|Ounce (oz)|28.350g|1/16lb|
|Carat (c)|0.2g|0.00705oz|
