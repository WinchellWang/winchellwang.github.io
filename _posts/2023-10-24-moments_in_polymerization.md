---
layout: post
title: The Method of Moments in Polymerization Reaction
subtitle: The application of MoM in describing the basic kinetic mechanism of polymerization reaction
date: 2023-10-24
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Technology
   - Chemistry
header-mask: 0.1
catalog: true
---

# 1. Basic Reaction

**Chain Initiation**

$$
\begin{align}
I\xrightarrow{k_d}&2fI^*\\
I^*+M\xrightarrow{k_i}&P_1
\end{align}
$$

In short:

$$
I\xrightarrow{k_d}2fP_1
$$

**Chain Propagation**

$$
P_n+M\xrightarrow{k_p}P_{n+1}
$$

**Chain Termination**

By Combination:

$$
P_n+P_m\xrightarrow{k_{t,c}}D_{n+m}
$$

By Disproportionation:

$$
P_n+P_m\xrightarrow{k_{t,d}}D_n+D_m
$$

**Chain Transfer**

To Monomer:

$$
\begin{align}
P_n+M\xrightarrow{k^{mon}_{tr}}&D_n+M^*\\
M^*+M\xrightarrow{k^{mon}_{i}}&P_1
\end{align}
$$

In short:

$$
P_n+M\xrightarrow{k^{mon}_{tr}}D_n+P_1
$$

To Solvent or Transfer Agent:

$$
\begin{align}
P_n+S\xrightarrow{k^{sol}_{tr}}&D_n+S^*\\
S^*+S\xrightarrow{k^{sol}_{i}}&P_1
\end{align}
$$

In short:

$$
P_n+S\xrightarrow{k^{sol}_{tr}}D_n+P_1
$$

> This post did not consider the transfer between radicals and the branching in polymerization.

# 2. Radical

## 2.1 Moment Definition

Define 0, 1st, and 2nd moment:

$$
\begin{align}
\lambda_0&=\sum^\infty_{n=1}{P_n}=[P_{tot}]\\
\lambda_1&=\sum^\infty_{n=1}{nP_n}\\
\lambda_2&=\sum^\infty_{n=1}{n^2P_n}
\end{align}
$$

Where P<sub>n</sub> is the concentration of radicals with chain length n in certain moment.

## 2.2 Rate of Change

$$
\begin{align}
R(P_1)&=\overbrace{2fk_d[I]}^{init}-\overbrace{k_p[M]P_1}^{form\ P_2}-\overbrace{k_t[P_{tot}]P_1}^{term}-\overbrace{k^{mon}_{tr}[M]P_1}^{trans\ to\ mon}-\overbrace{k^{sol}_{tr}[S]P_1}^{trans\ to\ sol}+\overbrace{k^{mon}_{tr}[M][P_{tot}]}^{trans\ from\ mon}+\overbrace{k^{sol}_{tr}[S][P_{tot}]}^{trans\ from\ sol}\\
R(P_2)&=\overbrace{k_p[M]P_1}^{poly\ from\ P_1}-\overbrace{k_p[M]P_2}^{form\ P_3}-\overbrace{k_t[P_{tot}]P_2}^{term}-\overbrace{k^{mon}_{tr}[M]P_2}^{trans\ to\ mon}-\overbrace{k^{sol}_{tr}[S]P_2}^{trans\ to\ sol}\\
&=k_p[M]P_1-k_p[M]P_2-(k_t[P_{tot}]+k^{mon}_{tr}[M]+k^{sol}_{tr}[S])P_2\\
&\vdots\\
R(P_n)_{n>1}&=k_p[M]P_{n-1}-k_p[M]P_n-k_t[P_{tot}]P_n-k^{mon}_{tr}[M]P_n-k^{sol}_{tr}[S]P_n
\end{align}
$$

## 2.3 Moment Equation

$$
\begin{align}
R(\lambda_0)&=\sum^\infty_{n=1}{R(P_n)}\\
R(\lambda_1)&=\sum^\infty_{n=1}{R(nP_n)}=\sum^\infty_{n=1}{nR(P_n)}\\
R(\lambda_2)&=\sum^\infty_{n=1}{R(n^2P_n)}=\sum^\infty_{n=1}{n^2R(P_n)}\\
\end{align}
$$

### 2.3.1 Zero Moment $R(\lambda_0)$

$$
\begin{align}
R(\lambda_0)=&R(P_1)+R(P_2)+\dots+R(P_{n-1})+R(P_n)\\
=&2fk_d[I]-k_p[M]P_1-k_t[P_{tot}]P_1-k^{mon}_{tr}[M]P_1-k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&+k_p[M]P_1-k_p[M]P_2-k_t[P_{tot}]P_2-k^{mon}_{tr}[M]P_2-k^{sol}_{tr}[S]P_2\\
&+k_p[M]P_{n-2}-k_p[M]P_{n-1}-k_t[P_{tot}]P_{n-1}-k^{mon}_{tr}[M]P_{n-1}-k^{sol}_{tr}[S]P_{n-1}\\
&+k_p[M]P_{n-1}-k_p[M]P_n-k_t[P_{tot}]P_n-k^{mon}_{tr}[M]P_n-k^{sol}_{tr}[S]P_n\\
=&2fk_d[I]+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&+k_p[M](-P_1+P_1-P_2+P_2-\dots -P_{n-1}+P_{n-1}-P_n+P_n)\\
&-k_t[P_{tot}](P_1+P_2+\dots+P_{n-1}+P_n)\\
&-k^{mon}_{tr}[M](P_1+P_2+\dots+P_{n-1}+P_n)\\
&-k^{sol}_{tr}[S](P_1+P_2+\dots+P_{n-1}+P_n)\\
=&2fk_d[I]+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]-k_t[P_{tot}]^2-k^{mon}_{tr}[M][P_{tot}]-k^{sol}_{tr}[S][P_{tot}]\\
=&2fk_d[I]-k_t[P_{tot}]^2\\
R(\lambda_0)=&2fk_d[I]-k_t\lambda^2_0
\end{align}
$$

### 2.3.2 First Moment $R(\lambda_1)$

$$
\begin{align}
R(\lambda_1)=&1R(P_1)+2R(P_2)+\dots+(n-1)R(P_{n-1})+nR(P_n)\\
=&2fk_d[I]-k_p[M]P_1-k_t[P_{tot}]P_1-k^{mon}_{tr}[M]P_1-k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&+2k_p[M]P_1-2k_p[M]P_2-2k_t[P_{tot}]P_2-2k^{mon}_{tr}[M]P_2-2k^{sol}_{tr}[S]P_2\\
&+(n-1)k_p[M]P_{n-2}-(n-1)k_p[M]P_{n-1}-(n-1)k_t[P_{tot}]P_{n-1}-(n-1)k^{mon}_{tr}[M]P_{n-1}-(n-1)k^{sol}_{tr}[S]P_{n-1}\\
&+nk_p[M]P_{n-1}-nk_p[M]P_n-nk_t[P_{tot}]P_n-nk^{mon}_{tr}[M]P_n-nk^{sol}_{tr}[S]P_n\\
=&2fk_d[I]+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&+k_p[M](-P_1+2P_1-2P_2+3P_2-\dots -(n-2)P_{n-1}+(n-1)P_{n-1}-(n-1)P_n+nP_n)\\
&-k_t[P_{tot}]\overbrace{(P_1+2P_2+\dots+(n-1)P_{n-1}+nP_n)}^{\lambda_1}\\
&-k^{mon}_{tr}[M](P_1+2P_2+\dots+(n-1)P_{n-1}+nP_n)\\
&-k^{sol}_{tr}[S](P_1+2P_2+\dots+(n-1)P_{n-1}+nP_n)\\
=&2fk_d[I]+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&+k_p[M](P_1+P2+\dots+P_{n-1}+P_n)\\
&-k_t\lambda_0\lambda_1-k^{mon}_{tr}[M]\lambda_1-k^{sol}_{tr}[S]\lambda_1\\
=&2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0+k_p[M]\lambda_0-k_t\lambda_0\lambda_1-k^{mon}_{tr}[M]\lambda_1-k^{sol}_{tr}[S]\lambda_1\\
R(\lambda_1)=&2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0+k_p[M]\lambda_0-(k_t\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S])\lambda_1
\end{align}
$$

### 2.3.3 Second Moment $R(\lambda_2)$

# 3. Product