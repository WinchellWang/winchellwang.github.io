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

> This post did not consider the transfer between radicals, the branching in polymerization, and many other side reactions.

# 2. Radical

## 2.1 Moment Definition

Define 0th, 1st, and 2nd moment:

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
R(P_n)_{n>1}&=k_p[M]P_{n-1}-k_p[M]P_n-k_t[P_{tot}]P_n-k^{mon}_{tr}[M]P_n-k^{sol}_{tr}[S]P_n\\
&\vdots
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

### 2.3.1 Zeroth Moment $R(\lambda_0)$

$$
\begin{align}
R(\lambda_0)=&R(P_1)+R(P_2)+\dots+R(P_{n-1})+R(P_n)+\dots\\
=&2fk_d[I]-k_p[M]P_1-k_t[P_{tot}]P_1-k^{mon}_{tr}[M]P_1-k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&+k_p[M]P_1-k_p[M]P_2-k_t[P_{tot}]P_2-k^{mon}_{tr}[M]P_2-k^{sol}_{tr}[S]P_2\\
&\vdots\\
&+k_p[M]P_{n-2}-k_p[M]P_{n-1}-k_t[P_{tot}]P_{n-1}-k^{mon}_{tr}[M]P_{n-1}-k^{sol}_{tr}[S]P_{n-1}\\
&+k_p[M]P_{n-1}-k_p[M]P_n-k_t[P_{tot}]P_n-k^{mon}_{tr}[M]P_n-k^{sol}_{tr}[S]P_n\\
&\vdots\\
=&2fk_d[I]+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&+k_p[M](-P_1+P_1-P_2+P_2-\dots -P_{n-1}+P_{n-1}-P_n+P_n+\dots)\\
&-k_t[P_{tot}](P_1+P_2+\dots+P_{n-1}+P_n+\dots)\\
&-k^{mon}_{tr}[M](P_1+P_2+\dots+P_{n-1}+P_n+\dots)\\
&-k^{sol}_{tr}[S](P_1+P_2+\dots+P_{n-1}+P_n+\dots)\\
=&2fk_d[I]+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]-k_t[P_{tot}]^2-k^{mon}_{tr}[M][P_{tot}]-k^{sol}_{tr}[S][P_{tot}]\\
=&2fk_d[I]-k_t[P_{tot}]^2\\
R(\lambda_0)=&2fk_d[I]-k_t\lambda^2_0
\end{align}
$$

### 2.3.2 First Moment $R(\lambda_1)$

$$
\begin{align}
R(\lambda_1)=&1R(P_1)+2R(P_2)+\dots+(n-1)R(P_{n-1})+nR(P_n)+\dots\\
=&2fk_d[I]-k_p[M]P_1-k_t[P_{tot}]P_1-k^{mon}_{tr}[M]P_1-k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&+2k_p[M]P_1-2k_p[M]P_2-2k_t[P_{tot}]P_2-2k^{mon}_{tr}[M]P_2-2k^{sol}_{tr}[S]P_2\\
&\vdots\\
&+(n-1)k_p[M]P_{n-2}-(n-1)k_p[M]P_{n-1}-(n-1)k_t[P_{tot}]P_{n-1}-(n-1)k^{mon}_{tr}[M]P_{n-1}-(n-1)k^{sol}_{tr}[S]P_{n-1}\\
&+nk_p[M]P_{n-1}-nk_p[M]P_n-nk_t[P_{tot}]P_n-nk^{mon}_{tr}[M]P_n-nk^{sol}_{tr}[S]P_n\\
&\vdots\\
=&2fk_d[I]+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&+k_p[M](-P_1+2P_1-2P_2+3P_2-\dots -(n-2)P_{n-1}+(n-1)P_{n-1}-(n-1)P_n+nP_n+\dots)\\
&-k_t[P_{tot}]\overbrace{(P_1+2P_2+\dots+(n-1)P_{n-1}+nP_n+\dots)}^{\lambda_1}\\
&-k^{mon}_{tr}[M](P_1+2P_2+\dots+(n-1)P_{n-1}+nP_n+\dots)\\
&-k^{sol}_{tr}[S](P_1+2P_2+\dots+(n-1)P_{n-1}+nP_n+\dots)\\
=&2fk_d[I]+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&+k_p[M](P_1+P2+\dots+P_{n-1}+P_n+\dots)\\
&-k_t\lambda_0\lambda_1-k^{mon}_{tr}[M]\lambda_1-k^{sol}_{tr}[S]\lambda_1\\
=&2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0+k_p[M]\lambda_0-k_t\lambda_0\lambda_1-k^{mon}_{tr}[M]\lambda_1-k^{sol}_{tr}[S]\lambda_1\\
R(\lambda_1)=&2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0+k_p[M]\lambda_0-(k_t\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S])\lambda_1
\end{align}
$$

### 2.3.3 Second Moment $R(\lambda_2)$

$$
\begin{align}
R(\lambda_2)=&1^2R(P_1)+2^2R(P_2)+\dots+(n-1)^2R(P_{n-1})+n^2R(P_n)+\dots\\
=&2fk_d[I]-k_p[M]P_1-k_t[P_{tot}]P_1-k^{mon}_{tr}[M]P_1-k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&+2^2k_p[M]P_1-2^2k_p[M]P_2-2^2k_t[P_{tot}]P_2-2^2k^{mon}_{tr}[M]P_2-2^2k^{sol}_{tr}[S]P_2\\
&\vdots\\
&+(n-1)^2k_p[M]P_{n-2}-(n-1)^2k_p[M]P_{n-1}-(n-1)^2k_t[P_{tot}]P_{n-1}-(n-1)^2k^{mon}_{tr}[M]P_{n-1}-(n-1)^2k^{sol}_{tr}[S]P_{n-1}\\
&+n^2k_p[M]P_{n-1}-n^2k_p[M]P_n-n^2k_t[P_{tot}]P_n-n^2k^{mon}_{tr}[M]P_n-n^2k^{sol}_{tr}[S]P_n\\
&\vdots\\
=&2fk_d[I]+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]\\
&-k_t[P_{tot}]\overbrace{(P_1+2^2P_2+\dots+(n-1)^2P_{n-1}+n^2P_n+\dots)}^{\lambda_2}\\
&-k^{mon}_{tr}[M](P_1+2^2P_2+\dots+(n-1)^2P_{n-1}+n^2P_n+\dots)\\
&-k^{sol}_{tr}[S](P_1+2^2P_2+\dots+(n-1)^2P_{n-1}+n^2P_n+\dots)\\
&+k_p[M](-1^2P_1+2^2P_1-2^2P_2+\dots+(n-1)^2P_{n-2}-(n-1)^2P_{n-1}+n^2P_{n-1}-n^2P_n+\dots)\\
=&2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0-k_t\lambda_0\lambda_2-k^{mon}_{tr}[M]\lambda_2-k^{sol}_{tr}[S]\lambda_2\\
&+k_p[M](\sum^\infty_{n=1}{(n+1)^2P_n}-\sum^\infty_{n=1}{n^2P_n})\\
=&2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0-(k_t\lambda_0-k^{mon}_{tr}[M]-k^{sol}_{tr}[S])\lambda_2\\
&+k_p[M](\sum^\infty_{n=1}{(n+1)^2P_n}-\sum^\infty_{n=1}{n^2P_n})\\
=&2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0-(k_t\lambda_0-k^{mon}_{tr}[M]-k^{sol}_{tr}[S])\lambda_2\\
&+k_p[M](\sum^\infty_{n=1}{n^2P_n}+2\sum^\infty_{n=1}{nP_n}+\sum^\infty_{n=1}{P_n}-\sum^\infty_{n=1}{n^2P_n})\\
R(\lambda_2)=&2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0+k_p[M](2\lambda_1+\lambda_0)-(k_t\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S])\lambda_2
\end{align}
$$

## 2.4 Radical Distribution

For a constant volume batch reactor:

We have

$$
\begin{align}
{d\lambda_0\over dt}=&R(\lambda_0)\\
{d\lambda_1\over dt}=&R(\lambda_1)\\
{d\lambda_2\over dt}=&R(\lambda_2)
\end{align}
$$

**If we apply [QSSA](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/) to get the differentiation equation:**

Since QSSA, $R(\lambda_0)=R(\lambda_1)=R(\lambda_2)=0$,

$$
\begin{align}
R(\lambda_0)=2fk_d[I]-k_t\lambda^2_0=&0\\
k_t\lambda^2_0=&2fk_d[I]\\
[P_{tot}]=\lambda_0=&\sqrt{2fk_d[I]\over k_t}
\end{align}
$$

As we defined $\tau,\ \beta$:

$$
\begin{align}
\tau =&{k_{t,d}\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]\over k_p[M]}\\
\beta =&{k_{t,c}\lambda_0\over k_p[M]}
\end{align}
$$

And

$$
\begin{align}
R(\lambda_1)=&2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0+k_p[M]\lambda_0-(k_t\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S])\lambda_1=0\\
\lambda_1=&{2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0+k_p[M]\lambda_0\over k_t\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]}\\
\lambda_1=&{(k_t\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S])\lambda_0+k_p[M]\lambda_0\over k_t\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]}\\
\lambda_1=&({\tau +\beta +1\over \tau +\beta})\lambda_0
\end{align}
$$

**AS $DP^{rad}_{n}={\lambda_1\over \lambda_0}$**

$$
DP^{rad}_{n}={\tau +\beta +1\over \tau +\beta}
$$

And apply [LCH](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/), where is The consumption of monomer by chain-initiation or transfer events is negligible compared to that by propagation:

$$
\begin{align}
\tau +\beta +1\approx &1\\
DP^{rad}_{n}=&{1\over \tau +\beta}
\end{align}
$$

Since

$$
\begin{align}
R(\lambda_2)=&2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0+k_p[M](2\lambda_1+\lambda_0)-(k_t\lambda_0-k^{mon}_{tr}[M]-k^{sol}_{tr}[S])\lambda_2=0\\
\lambda_2=&{2fk_d[I]+k^{mon}_{tr}[M]\lambda_0+k^{sol}_{tr}[S]\lambda_0+k_p[M](2\lambda_1+\lambda_0)\over k_t\lambda_0-k^{mon}_{tr}[M]-k^{sol}_{tr}[S]}\\
\lambda_2=&{(k_t\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S])\lambda_0+k_p[M](2\lambda_1+\lambda_0)\over k_t\lambda_0-k^{mon}_{tr}[M]-k^{sol}_{tr}[S]}\\
\lambda_2=&{2\lambda_1+(1+\tau +\beta)\lambda_0\over \tau +\beta}
\end{align}
$$

As

$$
\lambda_1=({\tau +\beta +1\over \tau +\beta})\lambda_0
$$

So

$$
\lambda_2={2+\tau +\beta \over \tau +\beta}\lambda_1
$$

**AS $DP^{rad}_{w}={\lambda_2\over \lambda_1}$**

$$
DP^{rad}_{w}={2+\tau +\beta \over \tau +\beta}
$$

And apply [LCH](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/),

$$
DP^{rad}_{w}={2\over \tau +\beta}
$$

# 3. Flory–Schulz Distribution

The **probability of propagation** is defined as:

$$
P={1\over 1+\tau +\beta}
$$

Therefore

$$
\begin{align}
DP^{rad}_{n}=&{1\over 1-P}\\
DP^{rad}_{w}=&{1+P\over 1-P}
\end{align}
$$

If P is approaching 1,

$$
PDI={DP^{rad}_{w}\over DP^{rad}_{n}}={1+P\over 1}=2
$$

[As](#22-rate-of-change)

$$
R(P_n)_{n>1}=k_p[M]P_{n-1}-k_p[M]P_n-k_t[P_{tot}]P_n-k^{mon}_{tr}[M]P_n-k^{sol}_{tr}[S]P_n
$$

Apply [QSSA](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/),

$$
\begin{align}
R(P_n)_{n>1}=&k_p[M]P_{n-1}-k_p[M]P_n-k_t[P_{tot}]P_n-k^{mon}_{tr}[M]P_n-k^{sol}_{tr}[S]P_n=0\\
P_n=&{k_p[M]P_{n-1}\over k_p[M]-k_t\lambda_0-k^{mon}_{tr}[M]-k^{sol}_{tr}[S]}\\
P_n=&{1\over 1+\tau +\beta}P_{n-1}
\end{align}
$$

So

$$
P_n=({1\over 1+\tau +\beta})^{n-1}P_1 \Leftarrow
\begin{cases}
P_{n-1}=&{1\over 1+\tau +\beta}P_{n-2}\\
P_{n-2}=&{1\over 1+\tau +\beta}P_{n-3}\\
&\vdots
\end{cases}
$$

And

$$
\begin{align}
R(P_1)&=2fk_d[I]-k_p[M]P_1-k_t[P_{tot}]P_1-k^{mon}_{tr}[M]P_1-k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]=0\\
P_1&={(k_t\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S])\lambda_0\over k_p[M]+k_t\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]}\\
P_1&={\tau +\beta \over 1+\tau +\beta}\lambda_0
\end{align}
$$

Hence,

$$
\begin{align}
P_n=&({1\over 1+\tau +\beta})^{n-1}({\tau +\beta \over 1+\tau +\beta})\lambda_0\\
=&P^{n-1}(1-P)\lambda_0
\end{align}
$$

And the fraction of polymer chain has repeat unit of n

$$
f(n)={P_n\over \lambda_0}=P^{n-1}(1-P)
$$

![fn_n](https://cdn.jsdelivr.net/gh/winchellwang/winchellwang.github.io/img/_post_image/2023-10-24/fn_n.svg)

# 4. Product

## 4.1 Moment Definition

Define 0th, 1st, and 2nd moment:

$$
\begin{align}
\mu_0&=\sum^\infty_{n=1}{D_n}\\
\mu_1&=\sum^\infty_{n=1}{nD_n}\\
\mu_2&=\sum^\infty_{n=1}{n^2D_n}
\end{align}
$$

Where D<sub>n</sub> is the concentration of dead chain with chain length n in certain moment.

## 4.2 Rate of Change

$$
\begin{align}
R(D_1)=&k_{t,d}\lambda_0P_1+k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M]P_1\\
R(D_n)=&\overbrace{k_{t,d}\lambda_0P_n}^{term\ by\ dispropotion}+\overbrace{k^{sol}_{tr}[S]P_n}^{sol\ trans}+\overbrace{k^{mon}_{tr}[M]P_n}^{mon\ trans}+\overbrace{0.5k_{t,c}\sum^{n-1}_{m=1}{P_mP_{n-m}}}^{term\ by\ combination}
\end{align}
$$

## 4.3 Moment Equation

$$
\begin{align}
R(\mu_0)&=\sum^\infty_{n=1}{R(D_n)}\\
R(\mu_1)&=\sum^\infty_{n=1}{R(nD_n)}=\sum^\infty_{n=1}{nR(D_n)}\\
R(\mu_2)&=\sum^\infty_{n=1}{R(n^2D_n)}=\sum^\infty_{n=1}{n^2R(D_n)}
\end{align}
$$

### 4.3.1 Zeroth Moment $R(\mu_0)$

$$
\begin{align}
R(\mu_0)=&R(D_1)+R(D_2)+R(D_3)+\dots+R(D_{n-1})+R(D_n)+\dots\\
=&k_{t,d}\lambda_0P_1+k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M]P_1\\
&+k_{t,d}\lambda_0P_2+k^{sol}_{tr}[S]P_2+k^{mon}_{tr}[M]P_2+0.5k_{t,c}\sum^{2}_{m=1}{P_mP_{2-m}}\\
&+k_{t,d}\lambda_0P_3+k^{sol}_{tr}[S]P_3+k^{mon}_{tr}[M]P_3+0.5k_{t,c}\sum^{3}_{m=1}{P_mP_{3-m}}\\
&\vdots\\
&+k_{t,d}\lambda_0P_{n-1}+k^{sol}_{tr}[S]P_{n-1}+k^{mon}_{tr}[M]P_{n-1}+0.5k_{t,c}\sum^{n-1}_{m=1}{P_mP_{n-1-m}}\\
&+k_{t,d}\lambda_0P_n+k^{sol}_{tr}[S]P_n+k^{mon}_{tr}[M]P_n+0.5k_{t,c}\sum^{n}_{m=1}{P_mP_{n-m}}\\
&\vdots\\
=&k_{t,d}\lambda_0^2+k^{sol}_{tr}[S]\lambda_0+k^{mon}_{tr}[M]\lambda_0\\
&+0.5k_{t,c}[P_1P_1+\\
&\qquad\qquad P_1P_2+P_2P_1+\\
&\qquad\qquad\vdots\\
&\qquad\qquad P_1P_{n-2}+P_2P_{n-3}+\dots+P_{n-3}P_2+P_{n-2}P_1\\
&\qquad\qquad P_1P_{n-1}+P_2P_{n-2}+P_3P_{n-3}+\dots+P_{n-3}P_3+P_{n-2}P_2+P_{n-1}P_1\\
&\qquad\qquad \vdots\qquad]\\
=&k_{t,d}\lambda_0^2+k^{sol}_{tr}[S]\lambda_0+k^{mon}_{tr}[M]\lambda_0\\
&+0.5k_{t,c}(P_1\lambda_0+P_2\lambda_0+\dots P_{n-1}\lambda_0+P_n\lambda_0+\dots)\\
R(\mu_0)=&k_{t,d}\lambda_0^2+k^{sol}_{tr}[S]\lambda_0+k^{mon}_{tr}[M]\lambda_0+0.5k_{t,c}\lambda_0^2
\end{align}
$$

### 4.3.2 First Moment $R(\mu_1)$

$$
\begin{align}
R(\mu_1)=&1R(D_1)+2R(D_2)+3R(D_3)+\dots+(n-1)R(D_{n-1})+nR(D_n)+\dots\\
=&k_{t,d}\lambda_0P_1+k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M]P_1\\
&+2k_{t,d}\lambda_0P_2+2k^{sol}_{tr}[S]P_2+2k^{mon}_{tr}[M]P_2+2*0.5k_{t,c}\sum^{2}_{m=1}{P_mP_{2-m}}\\
&+3k_{t,d}\lambda_0P_3+3k^{sol}_{tr}[S]P_3+3k^{mon}_{tr}[M]P_3+3*0.5k_{t,c}\sum^{3}_{m=1}{P_mP_{3-m}}\\
&\vdots\\
&+(n-1)k_{t,d}\lambda_0P_{n-1}+(n-1)k^{sol}_{tr}[S]P_{n-1}+(n-1)k^{mon}_{tr}[M]P_{n-1}+(n-1)0.5k_{t,c}\sum^{n-1}_{m=1}{P_mP_{n-1-m}}\\
&+nk_{t,d}\lambda_0P_n+nk^{sol}_{tr}[S]P_n+nk^{mon}_{tr}[M]P_n+n0.5k_{t,c}\sum^{n}_{m=1}{P_mP_{n-m}}\\
&\vdots\\
=&k_{t,d}\lambda_0\lambda_1+k^{sol}_{tr}[S]\lambda_1+k^{mon}_{tr}[M]\lambda_1\\
&+0.5k_{t,c}[2P_1P_1+\\
&\qquad\qquad 3P_1P_2+3P_2P_1+\\
&\qquad\qquad\vdots\\
&\qquad\qquad (n-1)P_1P_{n-2}+(n-1)P_2P_{n-3}+\dots+(n-1)P_{n-3}P_2+(n-1)P_{n-2}P_1\\
&\qquad\qquad nP_1P_{n-1}+nP_2P_{n-2}+nP_3P_{n-3}+\dots+nP_{n-3}P_3+nP_{n-2}P_2+nP_{n-1}P_1\\
&\qquad\qquad \vdots\qquad]\\
=&k_{t,d}\lambda_0\lambda_1+k^{sol}_{tr}[S]\lambda_1+k^{mon}_{tr}[M]\lambda_1\\
&+0.5k_{t,c}[P_1(2P_1+3P_2+\dots+nP_{n-1}+\dots)+\\
&\qquad\qquad P_2(3P_1+4P_2+\dots++nP_{n-2}+\dots)+\\
&\qquad\qquad\vdots\\
&\qquad\qquad P_{n-1}(nP_1+(n+1)P_2+\dots+(2n-1)P_n)+\\
&\qquad\qquad \vdots\qquad]\\
=&k_{t,d}\lambda_0\lambda_1+k^{sol}_{tr}[S]\lambda_1+k^{mon}_{tr}[M]\lambda_1\\
&+0.5k_{t,c}(P_1\sum^{\infty}_{n=1}{(n+1)P_n}+P_2\sum^{\infty}_{n=1}{(n+2)P_n}+\dots+P_m\sum^{\infty}_{n=1}{(n+m)P_n}+\dots)\\
=&k_{t,d}\lambda_0\lambda_1+k^{sol}_{tr}[S]\lambda_1+k^{mon}_{tr}[M]\lambda_1+0.5k_{t,c}(\lambda_0\lambda_1+\lambda_1\lambda_0)\\
R(\mu_1)=&k_{t,d}\lambda_0\lambda_1+k^{sol}_{tr}[S]\lambda_1+k^{mon}_{tr}[M]\lambda_1+k_{t,c}\lambda_0\lambda_1\\
\end{align}
$$

### 4.3.3 Second Moment $R(\mu_2)$

$$
\begin{align}
R(\mu_2)=&1R(D_1)+2^2R(D_2)+3^2R(D_3)+\dots+(n-1)^2R(D_{n-1})+n^2R(D_n)+\dots\\
=&k_{t,d}\lambda_0\lambda_2+k^{sol}_{tr}[S]\lambda_2+k^{mon}_{tr}[M]\lambda_2+0.5k_{t,c}\sum^{\infty}_{n=1}{n^2\sum^{n-m}_{m=1}{P_mP_{n-m}}}\\
R(\mu_2)=&k_{t,d}\lambda_0\lambda_2+k^{sol}_{tr}[S]\lambda_2+k^{mon}_{tr}[M]\lambda_2+0.5k_{t,c}(\lambda_0\lambda_2+\lambda_1^2)
\end{align}
$$

## 4.4 Product Distribution

**For cumulative distribution:**

$$
\begin{align}
{DP}^{cum}_n&={\mu_1\over \mu_0}\\
{DP}^{cum}_w&={\mu_2\over \mu_1}
\end{align}
$$

**For instantaneous distribution:**

$$
\begin{align}
{DP}^{inst}_n&={R(\mu_1)\over R(\mu_0)}\\
{DP}^{inst}_w&={R(\mu_2)\over R(\mu_1)}
\end{align}
$$

As we defined $\tau,\ \beta$:

$$
\begin{align}
\tau =&{k_{t,d}\lambda_0+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]\over k_p[M]}\\
\beta =&{k_{t,c}\lambda_0\over k_p[M]}
\end{align}
$$

Hence,

$$
\begin{align}
R(\mu_0)=&k_p[M]\lambda_0(\tau+0.5\beta)\\
R(\mu_1)=&k_p[M]\lambda_1(\tau+\beta)\\
R(\mu_2)=&k_p[M]\lambda_2(\tau+\beta)+k_{t,c}\lambda_1^2\\
\end{align}
$$

**For DP<sub>n</sub><sup>inst</sup>:**

$$
\begin{align}
{DP}_n^{inst}=&{R(\mu_1)\over R(\mu_0)}\\
=&{\lambda_1 \over \lambda_0}*{\tau+\beta\over \tau+0.5\beta}
\end{align}
$$

Since:

$$
\begin{align}
{DP}^{rad}_n=&{\lambda_1 \over \lambda_0}\\
=&{\tau +\beta +1\over \tau +\beta}
\end{align}
$$

So,

$$
\begin{align}
{DP}_n^{inst}=&{\tau +\beta +1\over \tau +\beta}*{\tau+\beta\over \tau+0.5\beta}\\
=&{\tau +\beta +1\over \tau+0.5\beta}
\end{align}
$$

<mark>Apply LCH to the equation:</mark>

$$
{DP}_n^{inst}\approx {1\over \tau+0.5\beta}
$$

**For DP<sub>w</sub><sup>inst</sup>:**

$$
\begin{align}
{DP}_w^{inst}=&{R(\mu_2)\over R(\mu_1)}\\
=&{k_p[M]\lambda_2(\tau+\beta)+k_{t,c}\lambda_1^2\over k_p[M]\lambda_1(\tau+\beta)}\\
=&{\lambda_2\over \lambda_1}+{k_{t,c}\lambda_1^2\over k_p[M]\lambda_1(\tau+\beta)}
\end{align}
$$

Since:

$$
\begin{align}
{DP}^{rad}_w=&{\lambda_2 \over \lambda_1}\\
=&{2+\tau +\beta \over \tau +\beta}\\
\\
\beta =&{k_{t,c}\lambda_0\over k_p[M]}\\
{k_{t,c}\over k_p[M]}=&{\beta\over \lambda_0} 
\end{align}
$$

So,

$$
\begin{align}
{DP}_w^{inst}=&{2+\tau +\beta \over \tau +\beta}+{\beta\lambda_1\over \lambda_0(\tau+\beta)}\\
=&{2+\tau+\beta\over \tau+\beta}+{\lambda_1\over \lambda_0}{\beta\over \tau+\beta}\\
=&{2+\tau+\beta\over \tau+\beta}+{1+\tau+\beta\over \tau+\beta}*{\beta\over \tau+\beta}
\end{align}
$$

<mark>Apply LCH to the equation:</mark>

$$
\begin{align}
{DP}_w^{inst}\approx&{2+\tau+\beta\over \tau+\beta}+{1+\tau+\beta\over \tau+\beta}*{\beta\over \tau+\beta}\\
=&{2\over \tau+\beta}+{\beta\over (\tau+\beta)^2}\\
=&{2\tau+3\beta\over (\tau+\beta)^2}
\end{align}
$$