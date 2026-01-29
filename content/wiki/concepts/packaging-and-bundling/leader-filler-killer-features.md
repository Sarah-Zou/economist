---
title: "Leader / Filler / Killer Features"
metaTitle: "Leader / Filler / Killer Features: Definition, Framework, Classification"
oneLiner: "A packaging lens that classifies features so you can design high-converting tiers and avoid \"feature soup.\""
prereqs: ["Value-Based Pricing", "Packaging Architecture", "Value Drivers", "Segmentation"]
tags: ["Packaging", "Tiering", "Good–Better–Best", "Growth", "SaaS pricing", "Value-based pricing"]
readingTime: 7
lastUpdated: "2026-01-28"
owner: "Dr. Sarah Zou"
---

## Snapshot (TL;DR)

**What it is:** A practical way to sort features into (1) leaders that drive choosing a tier, (2) fillers that make the tier feel complete, and (3) killers that devalue the tier.

**Why it matters:** Most startups fail at pricing because they treat all features as equal. This framework helps you decide what goes in the "Pro" plan vs. the "Free" plan. Misplaced features can cause plan cannibalization, low ARPA, and feature-bloat.

**When to use:** Use this during initial packaging design, when launching a new major feature, or when preparing for a price increase.

**Key Takeaways:**

- **Leaders define the Tier:** Your "Best" tier should be defined by the inclusion of premium Leaders that high-value customers buy the product for. Leaders should be few, specific, and clearly tied to a [segment's job-to-be-done](/wiki/pricing/value-and-customers/jobs-to-be-done).
- **Fillers prevent "Nickel-and-Diming":** Do not charge extra for Fillers. Include them to add "bulk" and perceived value. Fillers should reduce risk (trust, usability, completeness) but not be your main differentiator.
- **Killers must be exiled:** Killers actually decrease [WTP](/wiki/pricing/value-and-customers/willingness-to-pay) for certain segments and should be removed. If a small group loves the feature, sell it as a separate [Add-on](/wiki/pricing/packaging-and-bundling/add-ons-modular).
- The goal isn't "more features"—it's **a clean upgrade story**.

## Key Facts

- **70%+ rarely used:** Over 70% of features in the average software product are rarely or never used (also estimated $29.5B spent building them). ([Pendo, 2019 Feature Adoption Report](https://www.pendo.io/resources/the-2019-feature-adoption-report/))
- **2x more impactful:** [Packaging](/wiki/pricing/packaging-and-bundling/packaging) (the what) is often 2x more impactful on growth than the price point (the how much). ([ProfitWell's "Anatomy of SaaS Pricing"](https://www.profitwell.com/recurring/all/saas-pricing-strategy))
- **25% Uplift:** A web hosting company increased revenue by 25% simply by removing unwanted features (Killers) from their core package, proving that "less" can be worth more. ([Ramanujam & Tacke, Monetizing Innovation](https://www.wiley.com/en-us/Monetizing+Innovation%3A+How+Smart+Companies+Design+the+Product+Around+the+Price-p-9781119163840))

## Core Concepts & Framework

The Leader/Filler/Killer framework is a method for classifying product features based on customer preference and [willingness to pay (WTP)](/wiki/pricing/value-and-customers/willingness-to-pay). It is used to design product [packages](/wiki/pricing/packaging-and-bundling/packaging) that maximize revenue and minimize sales friction.

### Key definitions

* **Leader feature** ("hero" or **"must-have"**): A feature that drives the customer's decision to purchase. It solves the core problem and has high value and high WTP across your target [segment](/wiki/pricing/value-and-customers/customer-segments).

* **Filler feature** (**"nice-to-have"** or "table stakes / hygiene"): A feature rarely justifies the purchase on its own, but it adds perceived value and makes the package feel "complete." Customers won't buy for the filler, but they feel better about the price because it is included.

* **Killer feature** ("cannibalizer"): A feature that actively devalues the product for a specific [customer segment](/wiki/pricing/value-and-customers/customer-segments). Including a "Killer" can reduce the customer's likelihood of purchase or the amount they are willing to pay because they view it as unnecessary clutter, complexity, or a cost driver they don't want to subsidize.

### Why It Matters

Without this distinction, founders fall into **"Kitchen Sink Syndrome"**: piling features into one [tier](/wiki/pricing/packaging-and-bundling/good-better-best), raising COGS and complexity without earning a higher price. The Leader/Filler/Killer lens forces a sharper [packaging](/wiki/pricing/packaging-and-bundling/packaging) story—what drives the decision, what rounds out the offer, and what should be [fenced](/wiki/pricing/value-and-customers/price-fences-price-discrimination) or moved up.

## Mental model

**The "Steak, Bread/Sides, and Coffee"**

* **Leader (The Steak):** The main reason you went to the restaurant. You are happy to pay $50 because you want the steak.
* **Filler (The Bread/Sides):** You wouldn't go to the restaurant just for the bread, but you expect it to be there. It makes the $50 price tag feel justifiable.
* **Killer (The Coffee for a Child):** Imagine the "Family Meal Deal" forces you to pay for coffee for everyone, including your 5-year-old. You resent paying for it because your child can't use it. You might walk away and go to a place that lets you buy just the food.

Think of a simple 2×2 grid:

![Leader/Filler/Killer packaging matrix: 2×2 grid with Perceived Value (Low to High) on the X-axis and Willingness to Pay (Low to High) on the Y-axis. Quadrants show Leader (High/High – reason customers buy), Filler (High Value/Low WTP – nice-to-have), Killer (Low/Low – devalues product), and Add-on (Low Value/High WTP – sell separately).](/images/wiki_lfk_mental.png)

* **X-Axis:** Perceived Value (Relative Preference) — Low to High  
* **Y-Axis:** Willingness to Pay (WTP) — Low to High  
* **Leader:** High Value / High WTP (The reason customers buy; "must-have").  
* **Filler:** High Value / Low WTP ("nice-to-have"; feel "complete").  
* **Killer:** Low Value / Low WTP ("cannibalizer"; devalues the product).  
* **Add-on:** Low Value / High WTP (a small group loves the feature).

## Rules of thumb

* **Leaders per tier:** Aim for **1–2 leader features** that are *unique* (or uniquely powerful) to that tier.
* **Filler ratio:** If your plan page is mostly fillers, you're competing on a checklist and inviting price pressure.
* **The 20/20 Rule:** A feature is likely a **Killer** if it is valued by less than 20% of your customers and actively not valued (or seen as worthless) by more than 20%.
* **Fence before you ship:** Don't release a Leader without an upgrade [fence](/wiki/pricing/value-and-customers/price-fences-price-discrimination) (limits, governance, advanced workflow, risk controls).

## How to Apply It

### Inputs you need

* **[Customer segmentation](/wiki/pricing/value-and-customers/customer-segments):** 2–4 segments with distinct [jobs-to-be-done](/wiki/pricing/value-and-customers/jobs-to-be-done) and budgets.
* **Feature list:** current + near-term roadmap.
* **[MaxDiff Analysis](/wiki/pricing/research-and-experiments#maxdiff) (Maximum Difference Scaling):** A survey method where customers are forced to choose the "Most Preferred" and "Least Preferred" features from a list. This forces trade-offs and clearly identifies Leaders vs. Killers.
* **Willingness to Pay (WTP) Data:** Data from [Van Westendorp](/wiki/pricing/research-and-experiments/van-westendorp) surveys to correlate feature preference with price sensitivity.
* **Competitive context:** common "table stakes" and typical [tier](/wiki/pricing/packaging-and-bundling/good-better-best) [fences](/wiki/pricing/value-and-customers/price-fences-price-discrimination).

### Step-by-step

1. **List and Categorize Features:** List all potential features (both current and roadmap). Don't just list technical specs; list benefits/capabilities.

2. **Survey Your Customers (The MaxDiff Method):** Ask customers: "Which of these features adds the most value to your business, and which adds the least?" Get a relative preference score for each feature.

3. **Plot the "Packaging Strategies Matrix":** Create a 2×2 matrix (refer to mental model above).
   * X-Axis: Relative Preference (Low to High).
   * Y-Axis: Willingness to Pay (Low to High).
   * Plot features:
     * **High Value / High WTP:** These are Leaders. Put them in your premium [tiers](/wiki/pricing/packaging-and-bundling/good-better-best) to drive upsells.
     * **Low Value / High WTP:** These are potential [Add-ons](/wiki/pricing/packaging-and-bundling/add-ons-modular). Only a few people want them, but they will pay a lot. Sell them separately.
     * **High Value / Low WTP:** These are Fillers. Everyone wants them, but won't pay extra. Include in all plans.
     * **Low Value / Low WTP:** These are Killers. Remove them or offer as a separate [add-on](/wiki/pricing/packaging-and-bundling/add-ons-modular).

4. **Construct the Packages:** Refer to page [Good-Better-Best](/wiki/pricing/packaging-and-bundling/good-better-best).

## Metrics to monitor

* **Feature Usage Rate:** What % of users in a tier actually use the "Leader" feature? (Should be > 50%). If a feature in your "Best" plan has <5% usage, it is likely a Filler or Killer masquerading as a Leader.
* **Upgrade funnel:** upgrade conversion rate, time-to-upgrade, downgrade rate.
* **Win/Loss Reasons:** If prospects say, "I don't need all that stuff," you have a packaging problem involving Killers.

## Risks & anti-patterns (and fixes)

| Pitfall | Fix |
|---------|-----|
| **The "Kitchen Sink" Trap:** Engineering teams often want to bundle everything they built. | Use the "20% Rule." If >20% of customers don't value it, cut it from the base package. |
| **Confusing Fillers with Leaders:** Thinking a "nice-to-have" feature will drive upgrades. | Check the MaxDiff data. If WTP is low, it's a Filler. Don't fence it; use it to sweeten the deal. |
| **Killing a potential add-on:** Removing a weird feature that 5% of users love and would pay huge money for. | Don't kill it; turn it into a high-margin [Add-on](/wiki/pricing/packaging-and-bundling/add-ons-modular) module. |
| **Leaders that aren't used:** Customers pay, then don't activate → churn. | Use onboarding that activates leader features; set success milestones per tier. |
| **Over-fencing:** Feels punitive; customers seek alternatives. | [Fence](/wiki/pricing/value-and-customers/price-fences-price-discrimination) around value (scale, risk, governance), not basic usability. |

## References & Links

### Sources

* Baker, W., Kiewell, D., & Winkler, G. (2014). [*The hidden power of pricing: How B2B companies can unlock profit*](https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/ebook-the-hidden-power-of-pricing-how-b2b-companies-can-unlock-profit). McKinsey & Company.
* Ghuman, A. (2021). [*Price to Scale: Practical Pricing for Your High Growth Software Startup*](https://www.amazon.com/Price-Scale-Practical-Pricing-Growth-Startup/dp/0578937502). Independently published.
* Gourville, J. T., & Soman, D. (2018). [The good-better-best approach to pricing](https://hbr.org/2018/09/the-good-better-best-approach-to-pricing). *Harvard Business Review*, *96*(5), 118–125.
* Nagle, T. T., Hogan, J. E., & Zale, J. (2016). [*The strategy and tactics of pricing: A guide to growing more profitably*](https://www.routledge.com/The-Strategy-and-Tactics-of-Pricing-A-Guide-to-Growing-More-Profitably/Nagle-Hogan-Zale/p/book/9781138846774) (6th ed.). Routledge.
* Ramanujam, M., & Tacke, G. (2016). [*Monetizing innovation: How smart companies design the product around the price*](https://www.wiley.com/en-us/Monetizing+Innovation%3A+How+Smart+Companies+Design+the+Product+Around+the+Price-p-9781119163840). Wiley.

**Related pages:** [Packaging](/wiki/pricing/packaging-and-bundling/packaging) | [Good–Better–Best](/wiki/pricing/packaging-and-bundling/good-better-best) | [Price Fences](/wiki/pricing/value-and-customers/price-fences-price-discrimination) | [Add-ons & modular packaging](/wiki/pricing/packaging-and-bundling/add-ons-modular) | [Customer Segments](/wiki/pricing/value-and-customers/customer-segments) | [Jobs-to-Be-Done](/wiki/pricing/value-and-customers/jobs-to-be-done) | [Willingness to Pay (WTP)](/wiki/pricing/value-and-customers/willingness-to-pay) | [Value Drivers](/wiki/pricing/value-and-customers/value-drivers) | [Van Westendorp](/wiki/pricing/research-and-experiments/van-westendorp) | [MaxDiff Analysis](/wiki/pricing/research-and-experiments#maxdiff)

## FAQ

**Q:** How many leader features should a plan have?

**A:** Typically 1 or 2. If you have 5 Leaders in one tier, you are likely leaving money on the table and increase the chance you create a killer in a lower tier.

**Q:** What if a feature is both table stakes and a leader?

**A:** Provide the basic version everywhere (filler) and gate the advanced version (leader) via limits, governance, or scale.

**Q:** What do I do if a feature is a Leader for one segment and a Killer for another?

**A:** This is the primary signal that you need distinct [packages](/wiki/pricing/packaging-and-bundling/packaging) or [modules](/wiki/pricing/packaging-and-bundling/add-ons-modular). You cannot sell the same bundle to both. Create an "Enterprise Edition" (with the feature) and a "Starter Edition" (without it) to prevent the Killer effect.

**Q:** How do I identify a "Killer" without a survey?

**A:** Listen to sales calls. If prospects ask, "Can I get a discount if I remove X?" or "We won't use X, why are we paying for it?", then X is a Killer.

**Q:** How do I test if a feature is a leader vs filler?

**A:** Run message tests and bundle tests: does highlighting it increase conversion for a [segment](/wiki/pricing/value-and-customers/customer-segments)? Does gating it increase upgrades without spiking churn?

**Q:** How often should we reclassify features?

**A:** At least quarterly for fast-moving SaaS or whenever you release major capabilities; leaders often become fillers over time.
