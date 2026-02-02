---
title: "Tiered / graduated / block pricing"
metaTitle: "Tiered, graduated, and block pricing: Definition and Examples"
oneLiner: "Pricing that changes by volume or usage band—e.g. first N units at $X, next M at $Y, with or without a fixed fee."
prereqs: []
tags: ["tiered", "graduated", "block pricing", "volume", "usage", "SaaS"]
readingTime: 5
lastUpdated: "2025-02-02"
owner: "Dr. Sarah Zou"
---

## Snapshot (TL;DR)

**What it is:** Units of [usage](/wiki/pricing/models-and-metering/usage-based-pricing) or volume are grouped into bands (blocks or tiers); each band has a different unit price. Examples: first 1M API calls at $0.01 each, next 5M at $0.008; or graduated tiers (Starter, Growth, Scale) with different included usage and overage.

**Why it matters:** Balances simplicity with fairness: heavy users pay more in total but often get a lower marginal price; light users pay less. Supports predictable [commit-plus-overage](/wiki/pricing/models-and-metering/minimum-commitment-plus-overage) and [hybrid](/wiki/pricing/models-and-metering/hybrid-pricing) designs.

**When to use:** When usage is variable and you want to encourage growth without leaving money on the table at low volume or over-penalizing at high volume.

**Key Takeaways:**

- Define bands and unit prices clearly; avoid too many tiers so buyers can reason about cost.
- Can be purely usage-based or combined with a [subscription](/wiki/pricing/models-and-metering/subscription-model) base; [minimum commitment + overage](/wiki/pricing/models-and-metering/minimum-commitment-plus-overage) is a common variant.
- Align band boundaries with natural “step changes” in value or usage (e.g. SMB vs. mid-market vs. enterprise bands).
