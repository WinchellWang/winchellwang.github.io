---
layout: post
title: The Method of Moments in Polymerization Reaction (3)
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

# Product

## Moment Definition

Define 0, 1st, and 2nd moment:

$$
\begin{align}
\mu_0&=\sum^\infty_{n=1}{D_n}\\
\mu_1&=\sum^\infty_{n=1}{nD_n}\\
\mu_2&=\sum^\infty_{n=1}{n^2D_n}
\end{align}
$$

Where D<sub>n</sub> is the concentration of dead chain with chain length n in certain moment.

## Rate of Change

$$
\begin{align}
R(D_1)=&k_{t,d}\lambda_0P_1+k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M]P_1\\
R(D_n)=&\overbrace{k_{t,d}\lambda_0P_n}^{term\ by\ dispropotion}+\overbrace{k^{sol}_{tr}[S]P_n}^{sol\ trans}+\overbrace{k^{mon}_{tr}[M]P_n}^{mon\ trans}+\overbrace{{1\over 2}k_{t,c}\sum^{n-1}_{m=1}{P_mP_{n-m}}}^{term\ by\ combination}
\end{align}
$$

## Moment Equation

$$
\begin{align}
R(\mu_0)&=\sum^\infty_{n=1}{R(D_n)}\\
R(\mu_1)&=\sum^\infty_{n=1}{R(nD_n)}=\sum^\infty_{n=1}{nR(D_n)}\\
R(\mu_2)&=\sum^\infty_{n=1}{R(n^2D_n)}=\sum^\infty_{n=1}{n^2R(D_n)}
\end{align}
$$