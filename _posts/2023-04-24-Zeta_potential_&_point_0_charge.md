---
layout: post
title: Point of zero charge
subtitle: A brief explanation of pzc and the concept of zeta potential
date: 2023-04-24
author: Moax.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Chemistry
header-mask: 0.1
catalog: true
---

**Still Editing**

Point of zero charge (pzc) is an important concept in colloid chemistry. I am trying to learn it and utilize this knowledge in my study. This paper only talks about my personal understanding of pzc. Knowledge of zeta potential is not critical to understand pzc, but it would greatly help me to know what truly happened inside the colloid when we talking about pzc.

Before we talk about the electrochemical things, let us define the system in analysis. Assuming we have a colloidal system contains two composition, and the substance A is evenly dispersed in the substance B in a tiny scale. We probably will have eight different status depends on the type of the substances.

|||*Substance A* $\Downarrow$||
|:---:|:---:|:---:|:---:|
|***Substance B*** $\Downarrow$|**Gas**|**Liquid**|**Solid**|
|**Gas**|None|Liquid Aerosols|Solid Aerosols|
|**Liquid**|Liquid Foam|Emulsion|Sol|
|**Solid**|Solid Foam|Gel|Solid Sol|

Sol and emulsion would be the major system we focusing on in this topic, as they do have an efficient transportation of ions in the system and easy for me to understand it.

# 1. Zeta Potential

Zeta potential (ζ-potential) is the potential at the slipping plane. The unit of this potential usually is millivolts (mv). It basically reflects the energy consumed to move an monovalent charged ion from an infinity distance to the slipping plane on an opposite charged particle.

## 1.1 Electrodouble Layer

The concept of zeta potential is tightly correlated with the theory of electrodouble layer (EDL). Now, we have an aqueous solution at the interface with a negative charged solid surface. We can simply cut the solution into 3 sectors based on the concentration of positive charged ions. It is easy to understand that only positive charged ions would lay on the surface, and form a single ion layer, since the negative charged ions are repelled from the surface and the positive ions are so love to stay on the negative charged surface. This thin layer is the first section, and the surface of this layer named **stern layer**. The repulsion force will, of course, decrease with the distance increasing, so it is reasonable that some of negative ions will mixed into a bunch of positive ions outside of the stern layer (Because the positive ions around the surface are so attractive to negative ions in solution. Who will refuse a lovely party that you are the only one boy/girl). Another layer, which contains part of mobile fluid from the solution which attached to the stern layer, hence, be called **slipping plane**. Everything outside the diffuse layer belongs to **bulk liquid**. The combine of bulk liquid and slipping plane is called **diffuse layer**. The electrical potential at the stern layer and slipping plane are **stern potential** and **zeta potential** respectively.

We should notice that the reason of ions stay on the surface is not only electrostatic force or coulomb force, but also has the influences from chemical bonding, adsorption, etc. However, the discussion of why ions distributing like this is beyond my interest, so I would not spend my limited IQ in this complex world.

## 1.2 What is Zeta Potential

<img src="https://raw.githubusercontent.com/MoaxWang/moaxwang.github.io/main/img/_post_image/2023-04-24/fig1.svg">

Based on the sectors defined in the previous discussion, we know that the solid surface, stern layer, slipping plane shares different value of potential as the distance is various. Therefore, we define the electrical potential on the solid surface is the **surface potential**, and the potential on stern layer is the **stern potential**. **Zeta potential**, hence, is the potential on the slipping plane.

## 1.3 Why Zeta Potential

<figure>
<img src="https://raw.githubusercontent.com/MoaxWang/moaxwang.github.io/main/img/_post_image/2023-04-24/neg.jpg" width=80%>
<figcaption>Negatively charged particles repel each other due to electricity.</figcaption>
</figure>

Now, let us imagine a bigger picture which we are not only have one solid surface, but many of them. Many tiny sticks suspending in a salty water. These sticks tend to absorb specific charged ions, like Cl<sup>-</sup>, and formed negative charged solids that, of course, they all have the negative charged solid surface. Sticks should tend to coagulate together because of the van der waals force, but they actually repels each other by the electrostatic repulsive force, that more powerful than van der waals force. That force slows their sedimentation hugely, and make the sol so stable in a long time frame. Here, the question comes up. How we measure the stability of a colloid system? Zeta potential, as our today's topic, is the answer.

|Magnitude of Zeta potential (mV)|Stability behavior|
|:---:|:---:|
|0-5|Rapid coagulation or flocculation|
|10-30|Incipient instability|
|30-40|Moderate stability|
|40-60|Good stability|
|>61|Excellent stability|

# 2. Point of Zero Charge
