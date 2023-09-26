---
layout: post
title: Mechanism of Polymer Reaction
subtitle: Basic mechanisms of polymer reactions under assumptions for a batch reactor in ideal conditions
date: 2023-09-25
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Technology
   - Chemistry
header-mask: 0.1
catalog: true
---

**Hypothesis/Assumption in polymer reaction:**

1) Long chain hypothesis (***LCH***): The consumption of monomer by chain-initiation or transfer events is negligible compared to that by propagation. Thus, the rate of polymerization (disappearance of monomer) can be taken as equal to the rate of propagation ($-R_{monomer}=R_{pol}=R_{prop}$) with the rate of heat generation proportional to the rate of this exothermic reaction.

2) Quasi-Steady-State Assumption (***QSSA***): With a continuous source of new radicals in the system, an equilibrium is achieved instantaneously between radical generation and consumption, such that $R_{init}=R_{term}$.

3) The small radical species $ I^* $, $ M^* $ and $ S^* $ are not consumed by side reactions and do not accumulate in the system, but are converted to polymeric radicals with 100% efficiency. Thus, the total rate of polymer radical formation is given by ($R_{init}=R_{tran}$). The net formation of polymeric radicals is $R_{init}$, since transfer events both consume and create a polymeric radical species.

4) The rates of propagation, transfer, and termination reactions are independent of n, the length(s) of radical(s) involved.

5) The rate of propagation is significantly higher than any other reactions in the system. $R_{prop}\ggg R_{init},R_{term},R_{tran}...$

# 1. Initiation

# 1.1 Initiator Decomposition

$$
I\xrightarrow{k_d}2fI^*
\\
R_{d} = 2fk_d[I]
$$

Where $I$ stands for initiator, $I^*$ is the primary radicals, $f$ is initiation efficiency ($0.4<f<1.0$), $k_d$ is the rate coefficient value, and $R$ is the reaction rate ($mol\over{L\cdot S}$).

# 1.2 Chain Initiation

Assume primary radicals react with monomer, and we will have:

$$
I^*+M\xrightarrow{k_{init}}P_1
$$

Where $M$ stands for monomer, $P_n$ is the growing radical with $n$ unit long.

The reaction rate for primary radical in the system is the difference between the generation of primary radical (initiator decomposition) and the consumption of primary radical (chain initiation).

$$
\begin{align}
R_{I^*}&=R_d-k_{init}[I^*][M]\\
&=2fk_d[I]-k_{init}[I^*][M]
\end{align}
$$

As QSSA in the hypothesis, the consumption of free radical equals to the generation of it.

$$
R_{I^*}\approx 2fk_d[I]=k_{init}[I^*][M]
$$

According to the reaction of chain initiation,

$$
R_{P_1formation}=k_{init}[I^*][M]
$$

Then,

$$
R_{P_1formation}=k_{init}[I^*][M]=2fk_d[I]
$$

According to the reaction rate $R_{P_1formation}=2fk_d[I]$, we can conclude that:

$$
I\xrightarrow{k_d}2fP_1
$$

# 2. Propagation

For a chain propagation, such as:

$$
P_1+M\rightarrow P_2\Rightarrow P_2+M\rightarrow P_3 \Rightarrow ...
$$

Which can be generalized as:

$$
P_n+M\xrightarrow{k_{prop}}P_{n+1}, n=1,2,3...
$$

According to the assumption, the reaction in polymer synthesis is independent to the length of radicals involved, we have:

