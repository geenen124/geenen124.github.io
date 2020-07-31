---
title: "Reading Notes - Data Distillation: Towards Omni-Supervised Learning"
description: "Radosavovic, I et. al. Data Distillation: Towards Omni-Supervised Learning (2017)"
slug: reading-notes-omni-supervised-learning
date: 2020-07-31
author: Alex Geenen
tags: ['semi-supervised', 'object-detection', 'computer-vision', 'reading notes']
excerpt: "Radosavovic, I et. al. Data Distillation: Towards Omni-Supervised Learning (2017)"
---

#### [Omni-Supervised Learning](https://arxiv.org/abs/1712.04440)

This paper describes a novel method for omni-supervised learning (a variant of semi-supervised learning), which the authors call Data Distillation. 

- Data Distillation borrows from the student-teacher dynamics of Model Distillation. 
    - An aside: Model Distillation is a technique where we aim to teach a less computationally expensive ''student'' model to mimic the behavior of a complex (and usually pretty computationally expensive) ''teacher'' model. In many multi-target tasks, this consists of training the output distribution of the student to match the teacher's output distribution. This way, we aren't just teaching it about the relevant target (in the case of classification) - but also about the long-tail, which is where a lot of the value of the ''teacher'' can lie. This long tail can be seen as the most difficult-to-learn information contained within these complex models.
- Instead of using a pre-trained expert model to teach the student, they pick a more indirect path - in which the student has the exact same architecture as the teacher.
- Data Distillation works as follows: 
    - The teacher network is trained using the normal supervised dataset for the desired task.
    - New unlabeled data is presented to the now-trained teacher network, which predicts a label for each new sample. The unlabeled data is evaluated multiple times by the teacher - each time with a different transform applied (e.g. in the case of computer vision this could consist of rotating, scaling, and/or cropping an image). 
    - The set of labels per unlabeled data point are seen as outputs from models in an ensemble network, and they are then aggregated to produce a final label.
    - The student network - architecturally identical to the teacher network - is trained from scratch on the union of the supervised dataset and this newly ''self''-labeled dataset.
- *Why does this work?* Since many neural models have achieved very good results on computer-vision tasks, the authors argue that using the same network to augment the data used for training no longer just introduces noise into the dataset, but actually introduces new knowledge.

#### Things To Note:

- The output of the ensemble needs to be a hard label - averaging won't be enough, since it produces a ''soft'' label i.e. a probability vector.
    - The generation of hard labels requires task and dataset-specific logic. In the case of the COCO tasks used by the authors, they apply [Non-maximum Suppression](https://www.pyimagesearch.com/2014/11/17/non-maximum-suppression-object-detection-python/) in order to merge multiple sets of boxes.
- When the system was tested on a small-scale dataset (Table 1a), the data-distilled student outperformed the smaller supervised dataset. However, when compared to a ''vanilla'' model trained on a supervised dataset that was the same size as union of the small dataset and the augmented data, it was outperformed by the vanilla model. The authors argue that the performance of a fully-supervised model on the small-scale dataset can be seen as the lower bound on the performance of omni-supervised models, since there is much more unlabeled data available.
