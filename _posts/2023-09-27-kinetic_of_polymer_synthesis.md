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

Kinetic chain length (KCL) is the average number of monomer units on a living chain.

$$
KCL={R_{prop}\over R_{chain}}
$$

Since both of the chain transfer and termination would create the dead polymer,

$$
R_{chain}=R_{term}+R_{tr}
$$

Then:

$$
\begin{align}
KCL&={R_{prop}\over R_{term}+R_{tr}}\\
&={k_p[M][P_{tot}]\over k_t[P_{tot}]^2+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]}\\
&={k_p[M]\over k_t[P_{tot}]+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]}
\end{align}
$$

[Since:](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/#3-termination)

$$
k_t=k_{t,c}+k_{t,d}
$$

Therefore:

$$
KCL={k_p[M]\over (k_{t,c}+k_{t,d})[P_{tot}]+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]}
$$

**Additionally**, apply [SSH](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/), where transfer is negligible.

[As](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/#3-termination) $R^{radical\ loss}_{term}=k_t[P_{tot}]^2$, and $[P_{tot}]=\sqrt{2fk_d[I]\over k_t}$,

$$
\begin{align}
KCL&={R_{prop}\over R^{radical\ loss}_{term}}\\
&={k_p[M][P_{tot}]\over k_t[P_{tot}]^2}\\
&={k_p[M]\over k_t[P_{tot}]}\\
&={k_p[M]\over {k_t}\sqrt{2fk_d[I]\over k_t}}\\
&={k_p[M]\over \sqrt{2fk_d[I]k_t}}
\end{align}
$$