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
R(D_n)=&\overbrace{k_{t,d}\lambda_0P_n}^{term\ by\ dispropotion}+\overbrace{k^{sol}_{tr}[S]P_n}^{sol\ trans}+\overbrace{k^{mon}_{tr}[M]P_n}^{mon\ trans}+\overbrace{0.5k_{t,c}\sum^{n-1}_{m=1}{P_mP_{n-m}}}^{term\ by\ combination}
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

### Zeroth Moment $R(\mu_0)$

$$
\begin{align}
R(\mu_0)=&R(D_1)+R(D_2)+R(D_3)+\dots+R(D_{n-1})+R(D_n)+\dots\\
=&k_{t,d}\lambda_0P_1+k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M]P_1\\
&+k_{t,d}\lambda_0P_2+k^{sol}_{tr}[S]P_2+k^{mon}_{tr}[M]P_2+0.5k_{t,c}\sum^{2}_{m=1}{P_mP_{2-m}}\\
&+k_{t,d}\lambda_0P_3+k^{sol}_{tr}[S]P_3+k^{mon}_{tr}[M]P_3+0.5k_{t,c}\sum^{3}_{m=1}{P_mP_{3-m}}\\
&\vdots\\
&+k_{t,d}\lambda_0P_{n-1}+k^{sol}_{tr}[S]P_{n-1}+k^{mon}_{tr}[M]P_{n-1}+0.5k_{t,c}\sum^{{n-1}}_{m=1}{P_mP_{n-1-m}}\\
&+k_{t,d}\lambda_0P_n+k^{sol}_{tr}[S]P_n+k^{mon}_{tr}[M]P_n+0.5k_{t,c}\sum^{n}_{m=1}{P_mP_{n-m}}\\
&\vdots\\
=&k_{t,d}\lambda_0^2+k^{sol}_{tr}[S]\lambda_0+k^{mon}_{tr}[M]\lambda_0\\
&+0.5k_{t,c}[P_1P_1+\\
&\qquad\qquad P_1P_2+P_2P_1+\\
&\qquad\qquad\vdots
\end{align}
$$

### First Moment $R(\mu_1)$

$$
\begin{align}
R(\mu_1)=&1R(D_1)+2R(D_2)+3R(D_3)+\dots+(n-1)R(D_{n-1})+nR(D_n)+\dots\\
=&k_{t,d}\lambda_0P_1+k^{sol}_{tr}[S]P_1+k^{mon}_{tr}[M]P_1\\
&+2k_{t,d}\lambda_0P_2+2k^{sol}_{tr}[S]P_2+2k^{mon}_{tr}[M]P_2+2*0.5k_{t,c}\sum^{2}_{m=1}{P_mP_{2-m}}\\
&+3k_{t,d}\lambda_0P_3+3k^{sol}_{tr}[S]P_3+3k^{mon}_{tr}[M]P_3+3*0.5k_{t,c}\sum^{3}_{m=1}{P_mP_{3-m}}\\
&\vdots\\
&+(n-1)k_{t,d}\lambda_0P_{n-1}+(n-1)k^{sol}_{tr}[S]P_{n-1}+(n-1)k^{mon}_{tr}[M]P_{n-1}+(n-1)0.5k_{t,c}\sum^{{n-1}}_{m=1}{P_mP_{n-1-m}}\\
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
&+0.5k_{t,c}(P_1\sum^\infty_{n=1}{(n+1)P_n}+P_2\sum^\infty_{n=1}{(n+2)P_n}+\dots+P_m\sum^\infty_{n=1}{(n+m)P_n}+\dots)\\
=&k_{t,d}\lambda_0\lambda_1+k^{sol}_{tr}[S]\lambda_1+k^{mon}_{tr}[M]\lambda_1+0.5k_{t,c}(\lambda_0\lambda_1+\lambda_1\lambda_0)\\
R(\mu_1)=&k_{t,d}\lambda_0\lambda_1+k^{sol}_{tr}[S]\lambda_1+k^{mon}_{tr}[M]\lambda_1+k_{t,c}\lambda_0\lambda_1\\
\end{align}
$$

### Second Moment $R(\mu_2)$

$$
\begin{align}
R(\mu_2)=&1R(D_1)+2^2R(D_2)+3^2R(D_3)+\dots+(n-1)^2R(D_{n-1})+n^2R(D_n)+\dots\\
=&k_{t,d}\lambda_0\lambda_2+k^{sol}_{tr}[S]\lambda_2+k^{mon}_{tr}[M]\lambda_2+0.5k_{t,c}\sum^\infty_{n=1}{n^2\sum^{n-m}_{m=1}{P_mP_{n-m}}}\\
R(\mu_2)=&k_{t,d}\lambda_0\lambda_2+k^{sol}_{tr}[S]\lambda_2+k^{mon}_{tr}[M]\lambda_2+0.5k_{t,c}(\lambda_0\lambda_2+\lambda_1^2)
\end{align}
$$

## Product Distribution

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