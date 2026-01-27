---
title: "Leader/Filler/Killer Features"
metaTitle: "Leader/Filler/Killer Features: Definition, Framework, Classification"
oneLiner: "A classification system for categorizing features by their impact on purchase decisions and willingness to pay."
prereqs: ["Value-Based Pricing", "Packaging Architecture", "Value Drivers", "Segmentation"]
tags: ["packaging", "feature classification", "tiering", "monetization", "SaaS", "product strategy"]
readingTime: 6
lastUpdated: "2026-01-27"
owner: "Dr. Sarah Zou"
---

## Snapshot (TL;DR)

**What it is:** A three-category framework for classifying every product feature based on its role in driving purchase decisions and [willingness to pay (WTP)](/wiki/pricing/value-and-customers/willingness-to-pay).

**Why it matters:** Misclassifying features leads to "feature shock" (too many unwanted features), value leakage (giving away high-value features), or customer rejection (including features that turn buyers away). Proper classification is the foundation of effective [packaging architecture](/wiki/pricing/packaging-and-bundling/packaging).

**When to use:**
- Designing or redesigning [product tiers](/wiki/pricing/packaging-and-bundling/packaging)
- Deciding which features belong in which [tier](/wiki/pricing/packaging-and-bundling/packaging)
- Evaluating whether to add a new feature to an existing plan
- Preparing for a packaging overhaul

**Key Takeaways:**
- **Leaders** drive purchases and justify price premiums—use them to differentiate tiers.
- **Fillers** add perceived value but don't drive sales—include them strategically to bulk up offers.
- **Killers** actively turn customers away—never include them in mass-market packages.
- A feature's classification can change by [segment](/wiki/pricing/value-and-customers/customer-segments) and over time as markets evolve.

## Key Facts

- **~80% of features:** In the average software product, **~80% of features** are rarely or never used—often because they're misclassified as Leaders when they're actually Fillers. ([Pendo, 2019 Feature Adoption Report](https://www.pendo.io/resources/the-2019-feature-adoption-report/))
- **72% failure rate:** Approximately **72% of new products** fail to meet revenue targets, often because companies include Killer features in mass-market packages or fail to use Leaders to differentiate tiers. ([Ramanujam, M., & Tacke, G. (2016). Monetizing Innovation](https://www.wiley.com/en-us/Monetizing+Innovation%3A+How+Smart+Companies+Design+the+Product+Around+the+Price-p-9781119163840). Wiley.)
- **30% pricing improvement:** Companies that properly classify features and use Leaders to differentiate tiers see **~30% higher likelihood** of effective pricing/discount controls. ([McKinsey, 2023](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-art-of-software-pricing-unleashing-growth-with-data-driven-insights))

## What are Leader/Filler/Killer Features?

**Leader/Filler/Killer** is a classification framework that helps product and pricing teams categorize every feature based on its impact on customer purchase decisions and [willingness to pay](/wiki/pricing/value-and-customers/willingness-to-pay). This classification is essential for designing effective [packaging architecture](/wiki/pricing/packaging-and-bundling/packaging) that maximizes revenue while avoiding common pitfalls.

### Key definitions

* **Leader Features:** Must-have features that drive the purchase decision and high [willingness to pay (WTP)](/wiki/pricing/value-and-customers/willingness-to-pay). These are the features customers actively seek and are willing to pay a premium for. Without Leaders, customers won't buy. With strong Leaders, customers will pay more.

  * *Examples:* Advanced security/SSO for enterprise buyers, AI-powered automation for efficiency-focused teams, real-time collaboration for distributed teams, compliance certifications for regulated industries.

  * *How to identify:* Features that customers mention first in interviews, features that correlate with higher [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) in surveys, features that appear in win/loss analysis as deal-winners.

* **Filler Features:** Nice-to-have features that add perceived value/bulk but don't drive the sale. These features enhance the offer's perceived completeness but aren't decisive in purchase decisions. Customers appreciate them but won't pay extra for them alone.

  * *Examples:* Customizable themes/branding, export to multiple formats, basic integrations, standard reporting, mobile apps (when desktop is primary).

  * *How to identify:* Features that customers mention as "nice to have" but don't prioritize, features with low usage rates even when included, features that don't correlate with [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) or retention.

* **Killer Features:** Features that actively turn customers away or devalue the offer. These are features that create friction, complexity, or negative associations that reduce [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) or cause customers to reject the offer entirely.

  * *Examples:* Forcing complex enterprise features (e.g., advanced compliance, multi-tenant architecture) on small businesses; requiring extensive setup/configuration for simple use cases; including features that signal the product is "too advanced" or "too basic" for the target segment.

  * *How to identify:* Features mentioned in lost-deal analysis as deal-breakers, features that correlate with lower conversion or higher churn, features that create support burden without adding value.

## Why do Leader/Filler/Killer Features matter?

For startup founders, proper feature classification prevents three common packaging mistakes:

- **Feature Shock:** Including too many features (especially Fillers and Killers) in every tier creates confusion and reduces perceived value. Customers can't distinguish between plans, leading to analysis paralysis and abandoned purchases.

- **Value Leakage:** Misclassifying Leaders as Fillers and including them in lower tiers means high-value customers pay the same as low-value customers, despite deriving far more value. This leaves money on the table.

- **Customer Rejection:** Including Killer features in mass-market packages actively drives away potential customers. For example, forcing enterprise-grade security on a small business signals the product is "too complex" or "not for them."

Proper classification enables effective [packaging architecture](/wiki/pricing/packaging-and-bundling/packaging) by:

* **Differentiating tiers:** Use Leaders to create clear "Why Upgrade" stories between [Good/Better/Best](/wiki/pricing/packaging-and-bundling#good-better-best) tiers.
* **Optimizing value capture:** Reserve high-value Leaders for higher tiers where customers with higher [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) will pay for them.
* **Reducing complexity:** Exclude Killers from packages where they don't belong, and use Fillers strategically to add perceived value without bloating core offerings.

## Mental model

Think of feature classification as a **filtering system** for your [packaging architecture](/wiki/pricing/packaging-and-bundling/packaging):

```
All Features
    ↓
[Classification Filter]
    ↓
    ├─→ Leaders → Higher Tiers (Premium Pricing)
    ├─→ Fillers → Strategic Placement (All Tiers or Add-ons)
    └─→ Killers → Exclude or Segment-Specific Only
```

**The Golden Rule:** Never put a Killer in a mass-market package. Always use Leaders to differentiate tiers. Use Fillers to add perceived value without driving up costs or complexity.

## Rules of thumb

* **The 80/20 Rule:** Typically, **~20% of features are Leaders**, **~60% are Fillers**, and **~20% are Killers** (or segment-specific). Focus your packaging decisions on the Leaders.

* **Segment-Specific Classification:** A feature can be a Leader for one [segment](/wiki/pricing/value-and-customers/customer-segments) and a Killer for another. For example, "Advanced compliance certifications" is a Leader for enterprise buyers but a Killer for small businesses (signals complexity/cost).

* **Time Decay:** Features can shift categories over time. A Leader today (e.g., "AI-powered automation") may become a Filler tomorrow (when competitors offer it) and eventually a requirement for the "Good" tier (when it becomes table stakes).

* **The "Would They Pay More?" Test:** If removing a feature doesn't meaningfully reduce [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) or conversion, it's likely a Filler. If customers actively avoid plans with a feature, it's a Killer.

## How to Apply It

### Inputs you need

* **[Value Drivers](/wiki/pricing/value-and-customers/value-drivers) research:** Quantitative and qualitative data on which features drive [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) and purchase decisions.
* **[MaxDiff analysis](/wiki/pricing/research-and-experiments#maxdiff):** Survey method that forces customers to trade off features, revealing true Leaders (purchase drivers) versus Fillers (nice-to-haves).
* **Usage telemetry:** Behavioral data showing which features are actually used by high-value versus low-value customers.
* **Win/loss analysis:** Deal-level data on which features were mentioned as deal-winners (Leaders) or deal-breakers (Killers).
* **[Customer interviews](/wiki/pricing/value-and-customers/jobs-to-be-done):** Qualitative insights on which features customers actively seek (Leaders), appreciate but don't prioritize (Fillers), or avoid (Killers).

### Step-by-step

1. **List all features:** Create a comprehensive inventory of every feature, capability, and service in your product. Include both existing features and planned features.

2. **Gather classification data:** Use [MaxDiff](/wiki/pricing/research-and-experiments#maxdiff) surveys, [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) research, usage telemetry, and win/loss analysis to understand how each feature impacts purchase decisions and [WTP](/wiki/pricing/value-and-customers/willingness-to-pay).

3. **Classify by segment:** For each [customer segment](/wiki/pricing/value-and-customers/customer-segments), classify every feature as Leader, Filler, or Killer. Remember: a feature's classification can vary by segment.

4. **Map Leaders to tiers:** Use Leaders to differentiate your [Good/Better/Best](/wiki/pricing/packaging-and-bundling#good-better-best) tiers. Reserve the strongest Leaders for the highest tiers where customers with the highest [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) will pay for them.

5. **Place Fillers strategically:** Include Fillers in all tiers (to add perceived value) or as [add-ons](/wiki/pricing/packaging-and-bundling#add-ons-modular) (to avoid bloating base prices). Don't use Fillers to differentiate tiers—they won't drive upgrades.

6. **Exclude or segment Killers:** Never include Killers in mass-market packages. If a feature is a Killer for one segment but a Leader for another, create segment-specific packages or [fences](/wiki/pricing/value-and-customers/price-fences-price-discrimination) to separate them.

7. **Validate and iterate:** After launching your [packaging](/wiki/pricing/packaging-and-bundling/packaging), monitor feature adoption, conversion by tier, and customer feedback. Reclassify features as markets evolve and competitors change.

## Metrics to monitor

* **Feature adoption by tier:** Are Leaders actually being used by customers in the tiers where they're included? Low adoption suggests misclassification.

* **Conversion impact:** Do plans with specific Leaders convert better? Do plans with Killers convert worse? Track conversion rates by feature mix.

* **Upgrade drivers:** Which features are mentioned most often when customers upgrade? These are likely Leaders that should be positioned as tier differentiators.

* **Churn correlation:** Do customers who have access to Killer features churn at higher rates? This confirms Killer classification.

* **WTP correlation:** In [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) surveys, which features correlate with higher acceptable price ranges? These are Leaders.

## Risks & anti-patterns (and fixes)

| Pitfall | Fix |
|---------|-----|
| **Treating all features as Leaders:** Assuming every feature drives purchase decisions, leading to bloated tiers that confuse customers. | Use [MaxDiff](/wiki/pricing/research-and-experiments#maxdiff) analysis to identify true Leaders. Most features are Fillers—accept this and package accordingly. |
| **Using Fillers to differentiate tiers:** Trying to justify higher-tier pricing with Fillers, which don't drive upgrades. | Use Leaders to differentiate tiers. Fillers can be included in all tiers or as [add-ons](/wiki/pricing/packaging-and-bundling#add-ons-modular), but they won't drive the upgrade decision. |
| **Including Killers in mass-market packages:** Forcing enterprise features on small businesses, or simple features on enterprise buyers, causing rejection. | Segment-specific packaging: exclude Killers from packages where they don't belong, or use [fences](/wiki/pricing/value-and-customers/price-fences-price-discrimination) to separate segments. |
| **Ignoring segment differences:** Classifying features the same way for all segments, missing that a Leader for one segment can be a Killer for another. | Classify features separately for each [segment](/wiki/pricing/value-and-customers/customer-segments). Build separate feature maps per segment. |
| **Not reclassifying over time:** Treating feature classifications as permanent, missing that Leaders become Fillers as markets mature. | Review classifications annually or when competitors change. A Leader today (e.g., "AI features") may become a Filler tomorrow (when everyone offers it). |

## References & Links

### Sources

* Ramanujam, M., & Tacke, G. (2016). [*Monetizing Innovation: How Smart Companies Design the Product Around the Price*](https://www.wiley.com/en-us/Monetizing+Innovation%3A+How+Smart+Companies+Design+the+Product+Around+the+Price-p-9781119163840). Wiley.
* McKinsey & Company. (2023, June 2). [The art of software pricing: Unleashing growth with data-driven insights](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-art-of-software-pricing-unleashing-growth-with-data-driven-insights). McKinsey & Company.
* Pendo. (2019). [The 2019 Feature Adoption Report](https://www.pendo.io/resources/the-2019-feature-adoption-report/). Pendo.

**Related pages:** [Packaging Architecture](/wiki/pricing/packaging-and-bundling/packaging) | [Value Drivers](/wiki/pricing/value-and-customers/value-drivers) | [Good-Better-Best Tiers](/wiki/pricing/packaging-and-bundling#good-better-best) | [MaxDiff Analysis](/wiki/pricing/research-and-experiments#maxdiff) | [Willingness-to-Pay (WTP)](/wiki/pricing/value-and-customers/willingness-to-pay) | [Segmentation](/wiki/pricing/value-and-customers/customer-segments)

## FAQ

**Q:** Can a feature be both a Leader and a Killer?

**A:** Yes, but for different segments. For example, "Advanced compliance certifications" is a Leader for enterprise buyers (they need it) but a Killer for small businesses (signals complexity/cost they can't afford). This is why you must classify features separately for each [segment](/wiki/pricing/value-and-customers/customer-segments).

**Q:** How do I know if a feature is a Leader or just a Filler?

**A:** Use the "Would they pay more?" test: If removing the feature doesn't meaningfully reduce [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) or conversion, it's a Filler. Leaders correlate with higher [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) and appear in win/loss analysis as deal-winners. [MaxDiff](/wiki/pricing/research-and-experiments#maxdiff) analysis is the most reliable method to identify true Leaders.

**Q:** Should I include Fillers in my packaging at all?

**A:** Yes, but strategically. Fillers add perceived value and completeness to offers. Include them in all tiers (to bulk up perceived value) or as [add-ons](/wiki/pricing/packaging-and-bundling#add-ons-modular) (to avoid bloating base prices). Just don't use them to differentiate tiers—they won't drive upgrades.

**Q:** What if I'm not sure whether a feature is a Killer?

**A:** Look for negative signals: Does it appear in lost-deal analysis as a deal-breaker? Does it correlate with lower conversion or higher churn? Does it create support burden without adding value? If yes, it's likely a Killer for that segment. Test by excluding it from a package and measuring conversion impact.

**Q:** How often should I reclassify features?

**A:** Review classifications annually or when: (1) competitors launch similar features (Leaders may become Fillers), (2) you enter a new segment (features may shift categories), (3) usage data shows low adoption (may indicate misclassification), or (4) win/loss analysis reveals new patterns.

**Q:** Can I have too many Leaders in one tier?

**A:** Yes. If every tier has too many Leaders, customers can't distinguish between tiers, leading to analysis paralysis. Use Leaders strategically to create clear "Why Upgrade" stories. Typically, each tier should have 2–3 distinct Leaders that differentiate it from the tier below.
