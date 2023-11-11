---
layout: post
title: The Method of Moments in Polymerization Reaction (2)
subtitle: The application of MoM in describing the basic kinetic mechanism of polymerization reaction
date: 2023-11-10
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Technology
   - Chemistry
header-mask: 0.1
catalog: true
---

# Flory–Schulz Distribution

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