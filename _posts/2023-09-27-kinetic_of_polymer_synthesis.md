---
layout: post
title: Kinetic of Polymer Reaction
subtitle: Basic Kinetic of polymer reactions under assumptions for a batch reactor in ideal conditions
date: 2023-09-27
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Technology
   - Chemistry
header-mask: 0.1
catalog: true
---

# 1. Rate of Polymerization

[Since:](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/#2-propagation)

$$
R_{prop}=k_p[M][P_{tot}]
$$

and,

$$
[P_{tot}]=\sqrt{2fk_d[I]\over k_t}
$$

Therefore:

$$
R_{prop}=k_p[M]\sqrt{2fk_d[I]\over k_t}
$$

# 2. Kinetic Chain Length

Kinetic chain length (KCL) is the average number of monomer units on a living chain. In principle, it is the ratio of the chain propagation rate to the chain initiation rate.

$$
KCL={R_{prop}\over R_{init}}
$$

Apply [QSSA](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/):

$$
R_{init}=R_{term}
$$

Then:

$$
\begin{align}
KCL&={R_{prop}\over R_{term}}\\
&={k_p[M][P_{tot}]\over k_t[P_{tot}]^2}\\
&={k_p[M]\over k_t[P_{tot}]}
\end{align}
$$

[Since:](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/#3-termination)

$$
k_t=k_{t,c}+k_{t,d}
$$

Therefore:

$$
KCL={k_p[M]\over (k_{t,c}+k_{t,d})[P_{tot}]}
$$

[As](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/#3-termination)

$$
[P_{tot}]=\sqrt{2fk_d[I]\over k_t}
$$

Therefore:

$$
\begin{align}
KCL&={k_p[M]\over k_t[P_{tot}]}\\
&={k_p[M]\over {k_t}\sqrt{2fk_d[I]\over k_t}}\\
&={k_p[M]\over \sqrt{2fk_d[I]k_t}}
\end{align}
$$

# 3. Instantaneous Degree of Polymerization

Instantaneous degree of polymerization ($DP^{inst}_{n}$), also called instantaneous number-average chain length of dead polymer chains, is the average number of monomer units on a dead polymer chain formed at any instant. It is related to the average number of monomer units on a "dead" or "terminated" polymer chain formed at that instant due to polymerization reactions. 

$$
DP^{inst}_n={R_{prop}\over R_{dead\ chain}}
$$

The rate of dead polymer can be defined as the dead polymer generated in the system, which includes termination and transfer. It should be noted that termination by combination only creates 1 dead chain from 2 radicals.

$$
R_{dead\ chain}={1\over 2}R_{t,c}+R_{t,d}+R^{mon}_{tr}+R^{sol}_{tr}
$$

Therefore,

$$
\begin{align}
DP^{inst}_n&={R_{prop}\over R_{dead\ chain}}\\
&={k_p[M][P_{tot}]\over {1\over 2}k_{t,c}[P_{tot}]^2+k_{t,d}[P_{tot}]^2+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]}\\
&={k_p[M]\over {1\over 2}k_{t,c}[P_{tot}]+k_{t,d}[P_{tot}]+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]}\\
&={k_p[M]\over ({1\over 2}k_{t,c}+k_{t,d})[P_{tot}]+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]}
\end{align}
$$

# 4. Instantaneous Degree of Radicals

Instantaneous degree of radicals ($DP^{rad}_{n}$) is the number-average chain length of radicals.

$$
DP^{rad}_n={R_{prop}\over R_{radical\ generate}}
$$

Both of the initiation and transfer would generate radicals, so:

$$
\begin{align}
R_{radical\ generate}&=R_{init}+R_{tr}\\
&=R_{init}+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]
\end{align}
$$

Since $R_{prop}=k_p[M][P_{tot}]$,

And apply QSSA, 

$$
R_{init}=R^{radical\ loss}_{term}=k_t[P_{tot}]^2
$$

Therefore,

$$
\begin{align}
DP^{rad}_n&={k_p[M][P_{tot}]\over k_t[P_{tot}]^2+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]}\\
&={k_p[M]\over k_t[P_{tot}]+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]}
\end{align}
$$

# 5. Radical Lifetime

The radical lifetime is equal to the concentration of total radicals divided by the termination rate.

$$
Radical\ Lifetime={[P_{tot}]\over R^{radical\ loss}_{term}}
$$

Apply QSSA, 
$R^{radical\ loss}_{term}=R_d=2fk_d[I]$.

And

$$
[P_{tot}]=\sqrt{2fk_d[I]\over k_t}
$$

Therefore,

$$
\begin{align}
Radical\ Lifetime&={\sqrt{2fk_d[I]\over k_t}\over 2fk_d[I]}\\
&=\sqrt{2fk_d[I]\over 4f^2{k_d}^2[I]^2k_t}\\
&={1\over \sqrt{2fk_d[I]k_t}}
\end{align}
$$

# 6. Monomer Concentration

$$
{d[M]\over dt}=R_{mon}=-k_p[M][P_{tot}]
$$

Since

$$
[P_{tot}]=\sqrt{2fk_d[I]\over k_t}
$$

And

$$
[I]=[I]_0\cdot e^{-k_dt}
$$

Assume $[M]\mid _{t=0}=[M]_0$, then

$$
\begin{align}
{d[M]\over dt}&=-k_p[M]\sqrt{2fk_d[I]\over k_t}\\
{d[M]\over [M]}&=-k_p\sqrt{2fk_d[I]\over k_t}dt\\
{d[M]\over [M]}&=-k_p\sqrt{2fk_d[I]_0\cdot e^{-k_dt}\over k_t}dt\\
{d[M]\over [M]}&=-k_p\sqrt{2fk_d[I]_0\over k_t}{e^{-k_dt\over 2}}dt\\
Intergration:\int{1\over [M]}d[M]&=\int{-k_p\sqrt{2fk_d[I]_0\over k_t}{e^{-k_dt\over 2}}}dt\\
\int{1\over [M]}d[M]&=-k_p\sqrt{2fk_d[I]_0\over k_t}\int{(e^{-k_d\over 2})^t}dt\\
\ln [M]&=-k_p\sqrt{2fk_d[I]_0\over k_t}({e^{-k_dt\over 2}\over {-k_d\over 2}}+C)\\
\ln [M]&=2k_p\sqrt{2f[I]_0\over k_dk_t}e^{-k_dt\over 2}-Ck_p\sqrt{2fk_d[I]_0\over k_t}\\
Exponentiate\ both\ side:[M]&=e^{2k_p\sqrt{2f[I]_0\over k_dk_t}e^{-k_dt\over 2}-Ck_p\sqrt{2fk_d[I]_0\over k_t}}\\
Denote\ e^{-Ck_p\sqrt{2fk_d[I]_0\over k_t}} as\ another\ constant\ value\ A:[M]&=A\cdot e^{2k_p\sqrt{2f[I]_0\over k_dk_t}e^{-k_dt\over 2}}
\end{align}
$$

As $[M]\mid _{t=0}=[M]_0$:

$$
\begin{align}
[M]_0&=A\cdot e^{2k_p\sqrt{2f[I]_0\over k_dk_t}}\\
A&=[M]_0e^{-2k_p\sqrt{2f[I]_0\over k_dk_t}}
\end{align}
$$

Therefore,

$$
\begin{align}
[M]&=[M]_0e^{-2k_p\sqrt{2f[I]_0\over k_dk_t}}e^{2k_p\sqrt{2f[I]_0\over k_dk_t}e^{-k_dt\over 2}}\\
[M]&=[M]_0e^{2k_p\sqrt{2f[I]_0\over k_dk_t}(e^{-k_dt\over 2}-1)}
\end{align}
$$

# 7. Instantaneous Weight-Average Chain Length of Radicals

As

$$
DP^{rad}_n={R_{prop}\over R_{init}+R_{tr}}
$$

Here we define:

$$
DP^{rad}_n={1\over \tau +\beta}
$$

Where

$$
\tau ={k_{t,d}[P]_{tot}+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]\over k_p[M]}
$$

And

$$
\beta ={k_{t,c}[P]_{tot}\over k_p[M]}
$$

Hence,

$$
DP^{inst}_n={1\over \tau +{1\over 2}\beta}
$$

**AND**

$$
DP^{inst}_w={2(\tau +{3\over 2}\beta)\over (\tau +\beta)^2}
$$

>Polymer Dispersity: $PDI^{inst}={DP^{inst}_w\over DP^{inst}_n}={(2\tau +3\beta)(2\tau +\beta)\over 2(\tau +\beta)^2}$, when β = 0 (no termination by combination), PDI<sup>inst</sup> = 2.

# 8. Schulz-Flory Distribution

As

$$
DP_n={1\over 1-P}
$$

Where P stands for the probability of propagation.

$$
P = {1\over 1+\tau +\beta}
$$

Then, the live radical distribution will be

$$
{P_n\over P_{tot}}=({1\over {1+\tau +\beta}})^n(\tau +\beta)
$$

# References

[1] https://www.chemeurope.com/en/encyclopedia/Kinetic_chain_length.html