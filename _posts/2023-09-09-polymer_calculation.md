---
layout: post
title: Molecular Weight Distribution
subtitle: Calculation for Polymer
date: 2023-09-09
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Chemistry
header-mask: 0.2
catalog: true
---

# 1. Number Average Molecular Weight

$$
\overline{M}_n=\dfrac{\sum{n(D_n+P_n)}}{\sum{D_n+P_n}}w_m
$$

Where $D_n$ and $P_n$ are the number of moles of dead and growing polymer chains of degree of polymerization n (number of repeated units in the chain, also called length), and $w_m$ is the molecular weight of the repeated unit.

> Example:
>
> 4 moles polyethylene in a bulk. The chain length is 5, 3, and 10. Each have 1, 2, and 1 mole.
>
>$w_m=28$, $n=3,5,10$, $D_n+P_n=2,1,1$
>
>$$\overline{M}_n=\dfrac{2*3+5+10}{2+1+1}*28=147$$

# 2. Weight Average Molecular Weight

$$
\overline{M}_w=\dfrac{\sum{n^2(D_n+P_n)^2}}{\sum{n(D_n+P_n)}}w_m
$$

> Example:
>
>$$\overline{M}_w=\dfrac{2^2*3^2+5^2+10^2}{2*3+5+10}*28\approx214.67$$

# 3. Polydispersity Index

Polydispersity index (PDI) is a measure of the distribution of molecular mass in a given polymer sample. The PDI value is always greater than 1, but as the polymer chains approach a uniform chain length, the PDI converges to 1.

$$
PDI=\dfrac{\overline{M}_w}{\overline{M}_n}
$$

> Example:
>
>$$PDI=\dfrac{214.67}{147}\approx1.46$$

PDI affects the properties of polymer applications. The stiffness of PE increases with an increase in PDI. Conversely, the mechanical strength of LLDPE improves as PDI decreases. This leads to higher viscosity in the melt, which results in poorer processability.

# 4. Number Average Degree of Polymerization

$$
DP_n=\dfrac{\overline{M}_n}{w_m}=\dfrac{\sum{n(D_n+P_n)}}{\sum{D_n+P_n}}
$$

> Example:
>
>$$DP_n=\dfrac{147}{28}=\dfrac{2*3+5+10}{2+1+1}=5.25$$

# 5. Weight Average Degree of Polymerization

$$
DP_w=\dfrac{\overline{M}_w}{w_m}=\dfrac{\sum{n^2(D_n+P_n)^2}}{\sum{n(D_n+P_n)}}
$$

> Example:
>
>$$DP_w=\dfrac{214.67}{28}=\dfrac{2^2*3^2+5^2+10^2}{2*3+5+10}\approx7.67$$

# References
[1] https://www.chemeurope.com/en/encyclopedia/Polydispersity_index.html

[2] Asua, Jose, ed. Polymer reaction engineering. John Wiley & Sons, 2008.