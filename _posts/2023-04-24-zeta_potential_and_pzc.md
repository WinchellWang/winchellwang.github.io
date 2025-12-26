---
layout: post
title: Point of Zero Charge
subtitle: A brief explanation of pzc and the concept of zeta potential
date: 2023-04-24
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Chemistry
header-mask: 0.2
catalog: true
---

Point of zero charge (pzc) is an important concept in colloid chemistry. I am trying to learn it and utilize this knowledge in my study. This blog only talks about my personal understanding of pzc. Knowledge of zeta potential is not critical to understand pzc, but it would greatly help me to know what truly happens inside the colloid when we talking about pzc.

Before we talk about the electrochemical things, let us define the system in analysis. Assuming we have a colloidal system contains two composition, and the substance A is evenly dispersed in the substance B in a tiny scale. We probably will have eight different status depends on the type of the substances.

|||*Substance A* $\Downarrow$||
|:---:|:---:|:---:|:---:|
|***Substance B*** $\Downarrow$|**Gas**|**Liquid**|**Solid**|
|**Gas**|None|Liquid Aerosols|Solid Aerosols|
|**Liquid**|Liquid Foam|Emulsion|Sol|
|**Solid**|Solid Foam|Gel|Solid Sol|

Sol and emulsion would be the major system we are focusing in this topic, as they do have an efficient transportation of ions in the system and easy for me to understand it.

# 1. Zeta Potential

Zeta potential (ζ-potential) is the potential at the slipping plane. The unit of this potential is usually millivolts (mV). It essentially reflects the energy consumed to move a monovalent charged ion from an infinite distance to the slipping plane of an opposite charged particle.

## 1.1 Electrodouble Layer

The concept of zeta potential is tightly correlated with the theory of electrodouble layer (EDL). Now, we have an aqueous solution at the interface with a negative charged solid surface. We can simply cut the solution into 3 sectors based on the concentration of positive charged ions. It is easy to understand that only positive charged ions would lay on the surface, and form a single ion layer, since the negative charged ions are repelled from the surface and the positive ions are attracted to the negative charged surface. This thin layer is the first sector, and the surface of this layer named **stern layer**. The repulsion force will, of course, decrease with the distance increasing, so it is reasonable that some of negative ions will mixed into a bunch of positive ions outside of the stern layer (Because the positive ions around the surface are so attractive to negative ions in solution. Who will refuse a lovely party that you are the only one boy/girl). Another layer, which contains part of mobile fluid from the solution which attached to the stern layer, hence, be called **slipping plane**. Everything outside the slipping plane belongs to **bulk liquid**. The combine of bulk liquid and slipping plane is called **diffuse layer**. The electrical potential at the stern layer and slipping plane are **stern potential** and **zeta potential** respectively.

We should notice that the reason of ions stay on the surface is not only electrostatic force or coulomb force, but also has the influences from chemical bonding, adsorption, etc. However, the discussion of why ions distributing like this is beyond my interest, so I would not spend my limited IQ on this complex topic.

## 1.2 What is Zeta Potential

![EDL](https://cdn.jsdelivr.net/gh/winchellwang/winchellwang.github.io/img/_post_image/2023-04-24/fig1.svg)

Based on the previous discussion, we know that the solid surface, stern layer, slipping plane shares different value of potential as the distance is various. Therefore, we define the electrical potential on the solid surface is the **surface potential**, and the potential on stern layer is the **stern potential**. **Zeta potential** is the potential on the slipping plane.

## 1.3 Why Zeta Potential

![Negatively charged particles repel each other due to electricity.](https://water.mecc.edu/courses/Env211/changes/neg.gif)

Now, let us imaging a bigger picture which we are not only have one solid surface, but many of them. Many tiny sticks suspending in a salty water. These sticks tend to absorb specific ions, like Cl<sup>-</sup>, and form negative charged solids that, of course, they all have the negative charged solid surface. Sticks should tend to coagulate together because of the van der waals force, but they actually repels each other by the electrostatic repulsive force, that more powerful than van der waals force. That force slows their sedimentation hugely, and make the sol so stable in a long time frame. Here, the question comes up. How we measure the stability of a colloid system? Zeta potential, as this section's name, is the answer.

|Magnitude of Zeta potential (mV)|Stability behavior|
|:---:|:---:|
|0-5|Rapid coagulation or flocculation|
|10-30|Incipient instability|
|30-40|Moderate stability|
|40-60|Good stability|
|>61|Excellent stability|

# 2. Point of Zero Charge

Point of zero charge is the **pH value** when the net charge of total particle surface is zero in a solution. It is easy to imagine what will happen if the particle surface has zero net charge. The coulomb force is disappeared, and van der waals force take the place to aggregate particles to sedimentation.

## 2.1 pH and ζ-potential

Zeta-potential can be changed by adjusting the pH of liquid. The surface ionization is the reason to give the particle surface a charge. The potential on the surface (zeta-potential) can go to zero, if we suppress the ionization of molecules on the surface of particles.

How we do it? One of the approach is pH. We can add alkaline or acid in liquid to adjust the ionization, hence, to change the the zeta-potential. A typical pH-Zeta Potential relationship like the figure show below. It should be noticed that the correlation may various based on the ionization reaction, and the core concepte of this is control the ionization by adjusting the pH.

![pzc](https://cdn.jsdelivr.net/gh/winchellwang/winchellwang.github.io/img/_post_image/2023-04-24/fig2.jpg)

## 2.2 How to Use Point of Zero Charge

As mentioned in our [previous discussion](#13-why-zeta-potential) on zeta potential, zeta-potential serves as an indicator of colloid stability in a liquid. There is no clear boundary distinguishing stability from instability. When the zeta-potential approaches zero, the liquid tends to become more unstable, that is for sure. Therefore, if I am aiming to create a stable sol, the best approach is to adjust the pH as far away as possible from pzc. On the contrary, if the colloids are demanded to coagulate rapidly, shifting the pH to pzc is highly recommended. The curve of zeta-potential vs pH only shows the speed of at which the colloids in the liquid undergo coagulation. Just keep it in mind.

# Reference

[1] [Lesson 9:
Colloids and Coagulation](https://water.mecc.edu/courses/Env211/lesson9.htm)

[2] [Zeta potential - An introduction in 30 minutes](https://www.research.colostate.edu/wp-content/uploads/2018/11/ZetaPotential-Introduction-in-30min-Malvern.pdf)