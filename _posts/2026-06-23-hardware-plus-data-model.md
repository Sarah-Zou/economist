---
title: "The Hardware-plus-Data Model"
date: 2026-06-23
author: Dr. Sarah Zou
description: "When the hardware is a sensor and the data is the product. A framework for the data-as-product archetype, three subtypes, comparables, and a seven-dimension data-moat test."
image: "/assets/images/newsletter/1.4_header.png"
imageAlt: "Illustration of a hardware sensing network feeding proprietary data into analytics dashboards and AI models—the hardware-plus-data business model."
canonical: "https://sarahzou.com/newsletter/hardware-plus-data-model"
tags:
  - Hardware
  - Data Platforms
  - Deep Tech
  - Pricing
  - Monetization
  - Startups
---

## The frontier

Some hardware exists only to manufacture data. The device is a means; **the data it generates is the product, the subscription, and the moat.** That is the model this piece takes apart.

Planet Labs is the clean example. It photographs all of Earth's land every day, but the daily picture isn't the product — the decade-deep archive is, sold by subscription, with 98% of annual contract value (ACV) recurring on $307.7m of FY2026 revenue [1]. The satellites are how it collects; the data is the business.

If you read [Selling Physics as a Service](/newsletter/selling-physics-as-a-service), this is the **data-as-product** archetype from its matrix, zoomed in — the most data-intensive corner of selling physics as a service, and the one that matters most for the AI era.

The trap is the gap between the claim and the reality: **every hardware startup says "we'll have data." Almost none have a data moat.**

## Why the naive view misleads

**Data alone is not a moat.** Andreessen Horowitz's own partners argued it: there is rarely an inherent network effect in merely having more data; it goes stale, and competitors collect their own [2]. So the question is not "do you have data" but *"is the data your product, and what keeps it defensible?"*

## What turns hardware data into a business

Three conditions, then a structural choice.

1. **Proprietary collection.** You own or control the sensing network, so the data can't simply be accessed elsewhere.
2. **Archive depth or network effects.** Either an irreproducible history competitors can't back-collect, or usage could make the product better and pull in more usage.
3. **Workflow lock-in.** The customer's analytics, models, and decisions are built on your data, so leaving means rebuilding.

The economics follow — with a caveat. Once the sensing network exists and the data is reusable, each additional customer is cheap to serve relative to the fixed cost of building the network. But note that in AI era, **"near-zero marginal cost" overstates it**: compute, storage, integration, API, QA, support, and delivery all still scale with customers. The real point is *the wide gap between low marginal cost and high fixed cost*, which lets these businesses earn SaaS-like recurring revenue on a hardware foundation [3].

## Three subtypes

Data-as-product comes in three shapes, by who deploys the sensing and how it is funded.

| Subtype | Capital model | Data role | Examples |
| --- | --- | --- | --- |
| **1. Owned sensing network** | Company owns the sensing infrastructure | Data is the product | Planet, Spire, Tomorrow.io |
| **2. Customer/partner-deployed sensor network** | Customer or partner funds and hosts the sensors | Data powers a monitoring / AI product | Samsara, Augury |
| **3. Device-as-membership / personal data loop** | Device distributed to the user; the subscription funds the product | Longitudinal data improves coaching / insight | Whoop |

Subtypes 1 and 2 are the B2B core. They differ on one thing that decides everything downstream: **who owns the sensor.** In subtype 1 you build and own the sensing network; in subtype 2 the sensors live in someone else's infrastructure — the customer's machines, a partner's fiber, an existing fleet. That single fact reshapes where your moat can come from, which is why subtype 2 — the home of most infrastructure founders reading this — gets close attention below.

## Comparables

### 1. Owned sensing network — you build and own the sensors

| Company | What it sells | Recurring evidence | Moat & risk |
| --- | --- | --- | --- |
| **Planet Labs** | Daily Earth-observation imagery + analytics, by subscription | 98% recurring ACV; $307.7m FY26 revenue [1] | Irreproducible archive depth (record to ~2009); the image itself commoditizing |
| **Spire Global** | Maritime (AIS), aviation (ADS-B), weather (GNSS-RO) data; "space services" | ~$100m data subscriptions in FY24 [5] | Proprietary RF/weather network on 100+ nanosats; capital-intensive to build |
| **Tomorrow.io** | Enterprise weather intelligence — 60+ data layers via API, dashboard, alerts | B2B (Delta, JetBlue, Uber, Ford, government); enterprise subscriptions [10] | First commercial weather-radar satellite constellation + AI models; capital-intensive |

### 2. Customer/partner-deployed sensor network — the sensors live in the field

| Company | What it sells | Recurring evidence | Moat & risk |
| --- | --- | --- | --- |
| **Samsara** | Connected-operations data — safety, telematics, equipment monitoring | FY25 revenue $1.25bn; ARR ~$1.5bn (+33%) [7] | Cross-fleet data network + workflow lock-in; the customer installs the hardware |
| **Augury** | "Machine Health as a Service" — predictive maintenance from vibration/ultrasonic sensors + AI | Bundled hardware + AI + analyst subscription [8] | Largest machine-health data library feeding the AI |

**The subtype-2 bargain.** Not owning the sensor is what makes this model reachable for a startup — the customer or partner funds the hardware and the deployment, so you carry far less capital.

But it is also the model's structural weakness, and it lands precisely on the first dimension of the data-moat test below: **collection control.** You do not own the signal. The customer could, in principle, move to another vendor on the same hardware, or a competitor could strike the same partner deal.

So in subtype 2 the moat cannot be the sensing network — it has to be built one layer up: *in how you transform raw signal into trusted decisions, in how deeply your data embeds in the customer's workflow, and in what your contracts let you do with the data*. Samsara's defensibility is the cross-fleet data network plus workflow lock-in, not the dongle; Augury's is the largest machine-health library feeding the AI.

The test below makes this concrete, and the section after it says what to do when it flags you.

### 3. Device-as-membership / personal data loop — consumer-adjacent

| Company | What it sells | Recurring evidence | Moat & risk |
| --- | --- | --- | --- |
| **Whoop** | Health & performance insights; the strap is free, you buy the membership | 2.5m members and exited 2025 at a $1.1B bookings run-rate [6] | Longitudinal personal data + coaching; consumer-facing, wearable data commoditizing |

Subtype 3 is consumer-facing; it is here to complete the map, and because the *"free device, paid data"* mechanic shows up in B2B too.

**Borderline — Dexcom.** A glucose sensor sells continuous personal data, but structurally it is a consumable razor-and-blade routed through insurance, and its wall is clinical accuracy and FDA clearance, not a data flywheel [9]. A personal-data-loop cousin, not a core case.

**Excluded — Tesla FSD.** The car is sold as a product; FSD is a feature subscription; the data flywheel feeds Tesla's own product rather than a data service it sells. A data-advantaged product company, not hardware-plus-data-as-a-service.

## Why this is the AI-era model

Real-world sensor data is the **scarcest input** in physical AI; the limit is physical collection, not funding, so proprietary collection has become the defensibility [4]. Subtypes 1 and 2 — the B2B core — are in effect selling AI trained on proprietary physical data: Tomorrow.io on the atmosphere, Augury on machine vibration, Samsara on fleet operations.

That reconciles the a16z caution: data is not a standalone moat, but **proprietary physical-world data feeding a product the customer is locked into compounds.** The hardware buys the data position; the lock-in turns it into a moat [2][4].

## The data-moat test

Seven dimensions. The more that hold, the more defensible the data.

| Dimension | The question |
| --- | --- |
| **Collection control** | Can competitors get the same signal, or do you control the source? |
| **Temporal depth** | Does history matter — is your archive irreproducible? |
| **Label quality** | Do you own proprietary ground truth or event labels? |
| **Data transformation** | Do you turn raw signal into trusted features, alerts, or decisions? |
| **Workflow embedding** | Does the customer rebuild processes if they leave? |
| **Model improvement loop** | Does usage improve prediction or automation? |
| **Distribution / access rights** | Do contracts let you reuse, aggregate, train, or resell the data? |

This is the second half of a pair. The six-test worksheet in [Selling Physics as a Service](/newsletter/selling-physics-as-a-service) asks whether the servitization model is sound; this asks whether, given a data-as-product model, the data is actually defensible. Run them in that order — **model first, then moat.**

A weak result is a to-do list, not a verdict. Most subtype-2 founders score low on the same two dimensions — **collection control** and **access rights** — because they don't own the signal. The response is not to abandon the model; it is to compensate where you still can, and two moves do most of the work. Both happen in the pilot contract, before you scale.

First, **negotiate data rights explicitly**: exclusivity on the signal where you can get it, plus the right to aggregate, train on, and resell the derived data.

Second, **spend your moat budget on transformation and workflow embedding** rather than on collecting more raw signal you can't defend.

You win subtype 2 on what you do with the data and how deeply the customer comes to depend on it — not on owning the pipe.

## Next action

Place your business in one of the three subtypes, then run the seven-dimension test. For a B2B infrastructure or platform founder the live questions are usually the same three: **collection control** (do you own the signal?), **data transformation** (do you turn signal into decisions?), and **access rights** (can you train and resell?).

This is also what an infrastructure investor would diligence as your moat — *"we have data"* is not a claim an investor will credit, but a filled-in seven-dimension test is. And if the data isn't yet the product — only a by-product you hope to monetize later — you are building toward this model, not in it. Say so plainly; it is a more fundable position than pretending otherwise.

---

### References

1. Planet Labs FY2026 results (record revenue $307.7m; 98% recurring ACV; first full year of adjusted-EBITDA profitability and positive free cash flow; GAAP basis still a net loss, largely a non-cash warrant revaluation). [https://www.sec.gov/Archives/edgar/data/0001836833/000119312526257401/pl-ex99_1.htm](https://www.sec.gov/Archives/edgar/data/0001836833/000119312526257401/pl-ex99_1.htm)
2. Casado & Lauten (2019), "The Empty Promise of Data Moats," a16z. [https://a16z.com/the-empty-promise-of-data-moats/](https://a16z.com/the-empty-promise-of-data-moats/)
3. Recurring-revenue vs hardware valuation multiples (Aventis). [https://aventis-advisors.com/tech-company-valuation-multiples/](https://aventis-advisors.com/tech-company-valuation-multiples/)
4. Physical AI: real-world data scarcity and proprietary-data premium (State of Robotics 2026). [https://www.roboticscenter.ai/state-of-robotics-2026](https://www.roboticscenter.ai/state-of-robotics-2026)
5. Spire Global business model — "space-to-cloud" data subscriptions (Nasdaq; investor materials). [https://www.nasdaq.com/articles/spire-global-data-orbit-delivered-earth](https://www.nasdaq.com/articles/spire-global-data-orbit-delivered-earth)
6. Whoop device-as-a-service / membership model (Contrary Research). [https://research.contrary.com/company/whoop](https://research.contrary.com/company/whoop)
7. Samsara FY2025 annual report / results (revenue $1.25bn; ARR ~$1.5bn). [https://www.sec.gov/Archives/edgar/data/1642896/000164289625000048/iot2025ars.pdf](https://www.sec.gov/Archives/edgar/data/1642896/000164289625000048/iot2025ars.pdf)
8. Augury, "Machine Health as a Service" (AI predictive maintenance). [https://www.augury.com/machine-health/](https://www.augury.com/machine-health/)
9. Dexcom CGM / Stelo over-the-counter subscription (MedTech Dive). [https://www.medtechdive.com/news/dexcom-sells-stelo-over-the-counter-cgm/725310/](https://www.medtechdive.com/news/dexcom-sells-stelo-over-the-counter-cgm/725310/)
10. Tomorrow.io — enterprise weather intelligence; first commercial weather-radar satellite constellation. [https://www.tomorrow.io/](https://www.tomorrow.io/)

---

Building the commercial layer for a hardware or deep tech platform? [See how I help technical founders with pricing, GTM, and unit economics](/consulting)—especially when the product is complex and the business model is not obvious.

*Want more frameworks like this? [Subscribe to the newsletter](/newsletter) for weekly pricing and monetization insights.*
