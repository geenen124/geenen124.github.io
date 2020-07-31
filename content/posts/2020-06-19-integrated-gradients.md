---
title: "Reading Notes - Integrated Gradients"
description: "Sundararajan, M et. al. Axiomatic Attribution for Deep Networks (2017)"
slug: reading-notes-integrated-gradients
date: 2020-06-19
author: Alex Geenen
tags: ['interpretability', 'reading notes']
excerpt: "Sundararajan, M et. al. Axiomatic Attribution for Deep Networks (2017)"
---

#### [Integrated Gradients](https://arxiv.org/abs/1703.01365)


#### 2.0.1
"Gradients (of the model w.r.t. the input) are a natural analog of the model coefficients for a deep network, and therefore the product of the gradient and feature values is a reasonable starting point for an attribution method."

### 2.1 Sensitivity Axiom Part 1
An attribution method satisfies this axiom if for every input/baseline combo that differs in one feature and has different output predictions, then the differing feature needs to be given a non-zero attribution.

### 2.2 Implementation Invariance Axiom

If two networks are functionally equivalent - then their outputs are equal for all inputs. Ergo, attributions for these functionally equivalent networks need to be identical.
- The authors use the chain rule to explain this. The point of this axiom is that given the gradient of the output w.r.t. the input, the in-between steps shouldn't mess with the property of the chain rule. If this is violated - i.e. if the graident of output w.r.t. input isn't equal to the method used to attribute importance then it doesn't respect the chain rule nad violates this axiom

## 3. Integrated Gradients
Given a function that maps from $R^{n}$ to $[0,1]$, an input $x \in R^{n}$ and a baseline input $x' \in R^{n}$, then a straight line from the baseline to the input will be considered, and the gradients will be computed along this path.
- Integrated graidents are the path integral of the graidents of this straightline path.


### 3.1 Completeness Axiom

An attriubtion method satisfies this axiom if all attributions add up to the differnce between the outputs for $x$ and the baseline $x'$ of the network. - Note - DeepLIFT and LRP also do this.

## 4. Uniqueness of Integrated Gradients

Integrated gradients are a single case of the more general path integrated gradients.

Given a path function $\gamma(\alpha)$ which is a function of $\alpha \in [0,1]$ where $\gamma(1) = x$ and $\gamma(0) = x'$ then an integrated graident can be defined as following this path. *N.B.* The authors remark that all of these path integrated gradients satisfy the Implementation Invariance, Completeness, and Sensitivity Part 1 axioms.

They then proceed to describe a few more axioms:

#### Sensitivity Axiom Part 2
If a function doesn't mathematically depend on a (input) variable then the attribution to this variable is zero.

#### Linearity Axiom
If two networsk are combined linearly ($a*g(x) + b*f(x)$) then the attributions of this linear combination will also weighed by $a$ and $b$.


Key takeaways:
For Integrated Gradients a good baseline per input feature needs to be chosen. A zero valued input isn't necessarily always the best starting point - for CV applications it definitely could be, but again, it all depends on your specific use case (A 1 or `max(range_of_pixel_values)` could also be considered i.e. a pure white).