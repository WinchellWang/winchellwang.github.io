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
KCL={R_{prop}\over R_{chain}}
$$

In the consideration of chain transfer, another atom (often hydrogen) is transferred from a molecule in the system to the polymer radical. The original polymer chain is terminated, and a new one is initiated. As a result, the kinetic chain length is shortened. Thus, the $R_{chain}$ is redefined as:

$$
R_{chain}=R_{init}+R_{tr}
$$

Apply [QSSA](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/):

$$
R_{init}=R_{term}
$$

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

**Additionally**, apply [LCH](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/), where transfer is negligible.

[As](https://winchellwang.github.io/2023/09/25/polymer_synthesis_basic_mechanism/#3-termination)

$$
R^{radical\ loss}_{term}=k_t[P_{tot}]^2
$$

and

$$
[P_{tot}]=\sqrt{2fk_d[I]\over k_t}
$$

Therefore:

$$
\begin{align}
KCL&={R_{prop}\over R^{radical\ loss}_{term}}\\
&={k_p[M][P_{tot}]\over k_t[P_{tot}]^2}\\
&={k_p[M]\over k_t[P_{tot}]}\\
&={k_p[M]\over {k_t}\sqrt{2fk_d[I]\over k_t}}\\
&={k_p[M]\over \sqrt{2fk_d[I]k_t}}
\end{align}
$$

# 3. Instantaneous Degree of Polymerization

Instantaneous degree of polymerization ($DP^{inst}_{n}$), also called instantaneous number-average chain length of dead polymer chains, is the average number of monomer units on a dead polymer chain formed at any instant. It is related to the average number of monomer units on a "dead" or "terminated" polymer chain formed at that instant due to polymerization reactions. 

$$
DP^{inst}_{n}={R_{prop}\over R_{dead\ chain}}
$$

The rate of dead polymer can be defined as the dead polymer generated in the system, which includes termination and transfer. It should be noted that termination by combination only creates 1 dead chain from 2 radicals.

$$
R_{dead\ chain}={1\over 2}R_{t,c}+R_{t,d}+R^{mon}_{tr}+R^{sol}_{tr}
$$

Therefore,

$$
\begin{align}
DP^{inst}_{n}&={R_{prop}\over R_{dead\ chain}}\\
&={k_p[M][P_{tot}]\over {1\over 2}k_{t,c}[P_{tot}]^2+k_{t,d}[P_{tot}]^2+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]}\\
&={k_p[M]\over {1\over 2}k_{t,c}[P_{tot}]+k_{t,d}[P_{tot}]+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]}\\
&={k_p[M]\over ({1\over 2}k_{t,c}+k_{t,d})[P_{tot}]+k^{mon}_{tr}[M]+k^{sol}_{tr}[S]}
\end{align}
$$

# 4. Instantaneous Degree of Radicals

Instantaneous degree of radicals ($DP^{rad}_{n}$) is the number-average chain length of radicals.

$$
DP^{rad}_{n}={R_{prop}\over R_{radical\ generate}}
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
DP^{rad}_{n}&={k_p[M][P_{tot}]\over k_t[P_{tot}]^2+k^{mon}_{tr}[M][P_{tot}]+k^{sol}_{tr}[S][P_{tot}]}\\
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



# References

[1] https://www.chemeurope.com/en/encyclopedia/Kinetic_chain_length.html