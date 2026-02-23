---
title: "Outcome / performance-based pricing"
metaTitle: "Outcome and performance-based pricing: Definition and Examples"
oneLiner: "A pricing model where customers pay based on the actual results or value achieved (outcomes) rather than usage, seats, or access."
prereqs: []
tags: ["value-based pricing", "pricing strategy", "business models", "b2b sales", "risk sharing", "outcome-based", "performance-based"]
readingTime: 8
lastUpdated: "2026-02-08"
owner: "Dr. Sarah Zou"
---

## Snapshot (TL;DR)

**What it is:** You charge based on *verified outcomes* (e.g., cost saved, revenue generated, uptime achieved) rather than inputs (hours) or outputs (features/[usage](/wiki/pricing/models-and-metering/usage-based-pricing)).

**Why it matters:** It aligns incentives by removing the risk for the customers, shortening sales cycles and allowing you to capture a massive share of the value they create.

**When to use:** When value is directly tied to a measurable business result, attribution is clear, and both parties can agree on definition and measurement. See [pricing metric / value metric](/wiki/pricing/models-and-metering/pricing-metric-value-metric) for choosing the outcome metric.

**Key Takeaways:**

- Outcome pricing is fundamentally **risk-sharing:** This model shifts the risk from customers to you. You only win when your customer wins. This alignment creates deep trust and "lock-in".
- **Attribution is the Hardest Part:** You must prove *your* product/service caused the result. If there is ambiguity about who caused the result, the model will fail in legal disputes. The metric must be verifiable.
- **High Risk, High Reward:** Because you are taking on the risk of failure, you can capture a portion of the total value created, often leading to much higher ACV (Annual Contract Value) than [seat-based](/wiki/pricing/models-and-metering/seat-based-pricing) models. 
- **Sales Cycle Accelerator:** It lowers the barrier to entry for skeptical customers.

## What is outcome / performance-based pricing?

**Outcome / Performance-Based Pricing** is a [monetization model](/wiki/pricing/models-and-metering/monetization-model) where the fee is variable and contingent upon achieving a specific, measurable result.

*Examples* include contingency legal fees (33% of settlement), Google AdSense (pay per click), or text-message marketing services that charge per *verified* lead.

A common structure is:

> **Fee = Base fee + Share × Verified Incremental Outcome Value**

Where *Verified Incremental Outcome Value* is computed from:

* KPI definition
* Data source
* Time window
* Baseline and adjustments
* Attribution rules

### Key definitions

* **Outcome:** A business result the customer cares about (e.g., incremental revenue, cost avoided, uptime, response time, quality score).
* **The Outcome Metric:** The specific [pricing metric](/wiki/pricing/models-and-metering/pricing-metric-value-metric) (KPI) used for billing (e.g., "Cost per Lead," "5% of recovered revenue").
* **Output:** What you deliver (e.g., reports, automations, API calls, workflows).
* **Input:** Resources consumed (e.g., hours, headcount).
* **Baseline:** The "starting line" used to calculate *incremental* impact.
* **Success Gap:** The difference between the baseline and the achieved outcome.
* **Attribution:** Rules for how much of the outcome is credited to your product vs. other factors.
* **Gainshare / shared savings:** You earn a **percentage** of verified value created (often paired with a base fee).
* **Painshare / penalties / service credits:** You give money back if outcomes fall below target.

### Common contract patterns

* **Pure outcome:** 100% variable fee (rare; highest vendor risk).
* **[Hybrid](/wiki/pricing/models-and-metering/hybrid-pricing) (most common):** Base retainer + variable upside/downside.
* **Bonus-malus:** Fixed fee, with bonus for hitting targets and penalties for missing them.
* **Performance guarantee:** Fixed fee with refund/service credits if minimum results not achieved.

### Common problems

* **Attribution Problem:** The difficulty in proving that *your* product caused the result. If a client's revenue goes up, was it your software or their new marketing director? Outcome pricing requires solving this problem.
* **The Control Problem:** The risk that the vendor relies on the customer to execute the final step to generate value. For example, if you generate leads but the customer's sales team is incompetent, you don't get paid. You need control over the outcome.

### Mental model

**The Risk-Success Loop**

To succeed in OBP, you must move beyond a simple transaction and enter a "Partnership Loop." Think of it as a three-stage Loop:

![Outcome-based pricing mental model: The Risk-Success Loop. Stage 1 (Risk Transfer - The Hook): You eliminate the customer's fear of failure by moving financial risk from their balance sheet to yours. Stage 2 (Attribution Transparency - The Engine): You provide undeniable "But-For" proof making value visible and attributable in real-time. Stage 3 (Revenue Sharing - The Capture): Instead of charging for costs, you charge for a slice of newly created revenue. This shifts the startup from a "Cost Center" (vendor) to a "Profit Center" (partner).](/images/wiki_obp_mental.png)

1. **Risk Transfer (The Hook):** You eliminate the customer's "fear of failure" by moving the financial risk from their balance sheet to yours. If the product doesn't work, they don't pay. This collapses sales friction.
2. **Attribution Transparency (The Engine):** You provide an undeniable "But-For" proof (e.g., "But for this AI agent, these 500 tickets would still be open"). By making the value visible and attributable in real-time, you remove billing friction.
3. **Revenue Sharing (The Capture):** Instead of charging for costs, you charge for a slice of the *newly created revenue*. As the customer scales their success using your tool, your revenue grows without needing to upsell new seats or features.

*This shifts the startup from a "Cost Center" (vendor) to a "Profit Center" (partner).*

## When should you use outcome-based pricing?

Use the decision criteria below to assess whether OBP is a good fit. Green lights support outcome pricing; yellow signals a [hybrid](/wiki/pricing/models-and-metering/hybrid-pricing) or capped structure; red flags suggest sticking with [subscription](/wiki/pricing/models-and-metering/subscription-model) or [usage-based](/wiki/pricing/models-and-metering/usage-based-pricing) pricing instead.

### Decision criteria

| Criterion | Green light | Yellow | Red flag |
| -------------------------------- | ----------- | ------ | -------- |
| **Measurable:** Can you count the result unambiguously? | Objective KPI; automated data; reproducible calc; clear sign-off/true-up | Some manual reconciliation; definitions mostly clear | Subjective KPI, manual proof each time, or customer won't accept measurement |
| **Controllable:** Do you control the factors that drive the result? | You control most drivers (or have enforceable governance) | Shared control with dependencies | Outcome depends mostly on customer/market actions |
| **Attributable:** Can the customer argue that "the market" or "another tool" caused the win? | Clear counterfactual (A/B, matched cohort, but-for evidence) | Attribution plausible but imperfect | Attribution inherently ambiguous; many confounders |
| **Time-to-outcome:** Can you reach a billable, verified result within the billing cycle? | Days–weeks | 1–2 quarters | 6–18+ months |
| **Volatility:** Is the outcome stable enough to build a predictable business? | Stable distribution; variance manageable | Medium variance; needs caps/floors | Highly volatile/noisy; hard to forecast |

### Rules of thumb

* **The 10:1 ROI Rule:** In B2B, a common benchmark is to deliver a 10x Return on Investment. If you generate \$1M in new value, you can reasonably charge \$100k–\$200k. Do not try to capture 50% unless you are a full-service partner (like a hedge fund or lawyer).
* **The Risk Premium:** Because you take the risk of zero revenue, your effective margin in successful months should be higher than a standard fixed-fee contract.

## Why does outcome-based pricing matter?

Traditional SaaS pricing ([per seat](/wiki/pricing/models-and-metering/seat-based-pricing)) is a "tax on growth"—the more people use it, the more it costs, even if the value isn't there. OBP flips this. It's particularly powerful for **AI Startups** where the value isn't in the "software" but in the "work" the AI completes.

* **Overcoming Skepticism:** For startups, the biggest objection is "Will this work?" Outcome pricing answers this by saying, "We don't get paid unless it does." It is the ultimate risk-reversal strategy.
* **Uncapping Revenue:** In a SaaS [per-seat](/wiki/pricing/models-and-metering/seat-based-pricing) model, you are capped by the number of employees. In outcome pricing, you are capped only by the customer's success. As they grow, your revenue grows linearly with their success, often yielding far higher ACV (Annual Contract Value) than [seat-based](/wiki/pricing/models-and-metering/seat-based-pricing) pricing.

## Key Facts

- **Market demands OBP:** A report shows **77% of business leaders** say customers are increasingly pushing for outcome-based pricing, but only **32% of businesses** report defining "usage" in that way (highlighting an implementation gap). ([Stripe](https://stripe.com/resources/more/outcome-based-pricing))
- **The Ad-Tech Standard:** The internet advertising industry shifted from CPM (Cost per Thousand views—an input) to CPC/CPA (Cost per Click/Action—an outcome), which is now the **dominant** model because it guarantees advertiser value. (*The Strategy and Tactics of Pricing*)

## How do you implement outcome-based pricing step-by-step?

### Inputs you need

* **Baseline Data:** You need to know the customer's *current* performance (or historical KPI or agreed control period) to prove you improved it. Without a baseline, you cannot calculate the "lift".
* **Attribution Telemetry:** You need technical integration that proves your product triggered the event (e.g., a tracking pixel, a unique phone number, or a verified API log). Metric definition, data sources, logging, and auditability.
* **Value Assessment:** Understanding the customer's math ([economic value](/wiki/pricing/value-and-customers/economic-value-estimation)). How much is one "lead" or one "hour of uptime" actually worth to them?
* **Unit economics:** Delivery cost, expected impact distribution, cashflow needs. Ensure your "floor" covers your cloud/infrastructure costs even if the outcome is low.

### Step-by-step

1. **Define the "Unit of Success":** Identify the metric that equals value. Is it a "booked appointment," a "fraudulent transaction stopped," or a "dollar of tax saved"? It must be binary (did it happen: yes/no). Budget line item or board metric beats "nice-to-have" metrics.

2. **Set a baseline:** Audit the customer's current state during onboarding. Examples: "vs. trailing 90-day average," "vs. matched cohort," or "A/B test where feasible."

3. **Establish the Attribution Gate:** Build the technical [fence](/wiki/pricing/value-and-customers/price-fences-price-discrimination) that tracks the outcome. *Example:* If you price on "leads," you must ensure you only charge for *qualified* leads, or the customer will churn due to low quality. You need a definition of "qualified" written into the contract (e.g., "Lead must have a valid business email and phone number").

4. **Set the Price per Outcome:** Determine the upper bound. *Method:* Work backward from the value. If a lead turns into a $10,000 deal 10% of the time, a lead is worth $1,000. You might charge $100–$200 per lead.

5. **Design the commercial structure (usually [hybrid](/wiki/pricing/models-and-metering/hybrid-pricing)):** Pure outcome pricing is dangerous for cash flow. Start with a [hybrid](/wiki/pricing/models-and-metering/hybrid-pricing) model ([seat](/wiki/pricing/models-and-metering/seat-based-pricing) + Performance) before going "Pure OBP."

   * A small **Platform Fee** ([subscription](/wiki/pricing/models-and-metering/subscription-model)) to cover basic operational costs/onboarding + downside protection.
   * Variable fee captures upside (gainshare) and/or guarantees minimum performance.
   * Add **caps/floors** and **payout timing** (monthly/quarterly true-ups).

6. **Make it auditable:** Build a shared dashboard, exportable logs, documented calculation steps, sign-off workflow.

7. **Pilot → calibrate → scale:** Run 1–3 customers first; tighten definitions, then templatize.

## Metrics to monitor

* **Outcome attainment:** % of customers hitting targets; distribution of outcomes. Are 80% of your fees coming from 20% of clients? This indicates your product only works for a specific [segment](/wiki/pricing/value-and-customers/customer-segments).
* **Gross margin:** on base and on variable (variable should not destroy margin). Watch out for "high effort, low outcome" clients.
* **Revenue Volatility:** Outcome pricing is seasonal. Track the variance month-over-month to manage cash flow burn.
* **Dispute rate:** % invoices disputed; time to resolution. How often do customers argue about the invoice? If high, your metric is not defined clearly enough.

## Risks & anti-patterns (and fixes)

| Pitfall | Fix |
| ------- | --- |
| **The "Black Box" Trust Gap:** If the customer cannot see *how* you calculated the fee, they will suspect you are cheating. | Radical transparency. Provide a dashboard showing every single "success event" with timestamps and metadata. |
| **The "Gaming" Risk:** Customers may try to bypass your attribution (e.g., calling the lead directly to avoid the tracking number). | Contractual clauses auditing the process, or technical features that mask data until the "unlock" (transaction) occurs. |
| **Outcome decoupling:** You generate leads, but the client stops closing them because they fired their sales team. You stop getting paid. | Price on the step *you* control (the lead generation), not the step *they* control (the closed deal), unless you are deeply embedded in their ops. |
| **The "Free" Trap:** Providing value but failing to track/bill for it. | Ensure the contract includes "deemed outcomes" if data tracking is blocked. |
| **Data Disputes:** Customer claims your tracking is wrong. | Use a third-party source of truth (e.g., the customer's CRM or ERP). |

## References & Links

### Sources:

* Ng, I. C. L., Ding, D. X., & Yip, N. (2013). [Outcome-based contracts as new business model: The role of partnership and value-driven relational assets](https://doi.org/10.1016/j.indmarman.2013.05.009). *Industrial Marketing Management, 42*(5), 730–743.
* Hou, J., & Neely, A. (2018). [Investigating risks of outcome-based service contracts from a provider's perspective](https://doi.org/10.1080/00207543.2017.1319089). *International Journal of Production Research, 56*(6), 2103–2115.
* Nagle, T. T., Müller, G., & Gruyaert, E. (2018). [*The strategy and tactics of pricing: A guide to growing more profitably*](https://www.routledge.com/The-Strategy-and-Tactics-of-Pricing-A-Guide-to-Growing-More-Profitably/Nagle-Muller-Gruyaert/p/book/9780367763994) (7th ed.). *Routledge*.
* Ramanujam, M., & Tacke, G. (2016). *Monetizing Innovation: How Smart, High-Growth Companies Create Value*. *Wiley*.
* Raju, J., & Zhang, Z. J. (2010). *Smart Pricing: How Google, Priceline, and Leading Businesses Use Pricing Innovation for Profitability*. *Wharton School Publishing*.
* Harvard Business School Working Knowledge. (2002, July 22). [*Is performance-based pricing the right price for you?*](https://www.library.hbs.edu/working-knowledge/is-performance-based-pricing-the-right-price-for-you)

**Related pages:** [Value-based pricing](/wiki/pricing/foundations/value-based-pricing) | [Monetization model](/wiki/pricing/models-and-metering/monetization-model) | [Usage-based pricing](/wiki/pricing/models-and-metering/usage-based-pricing) | [Transaction-based pricing](/wiki/pricing/models-and-metering/transaction-based-pricing) | [Subscription model](/wiki/pricing/models-and-metering/subscription-model) | [Seat-based pricing](/wiki/pricing/models-and-metering/seat-based-pricing) | [Hybrid pricing](/wiki/pricing/models-and-metering/hybrid-pricing) | [Pricing metric / value metric](/wiki/pricing/models-and-metering/pricing-metric-value-metric) | [Price fences](/wiki/pricing/value-and-customers/price-fences-price-discrimination) | [Customer segments](/wiki/pricing/value-and-customers/customer-segments) | [Economic value estimation](/wiki/pricing/value-and-customers/economic-value-estimation)

## FAQ

**Q:** Is outcome-based pricing the same as value-based pricing?

**A:** Outcome-based is a *subset* of [value-based pricing](/wiki/pricing/foundations/value-based-pricing): you specifically tie payment to verified results, not just willingness-to-pay.

**Q:** Can I use outcome pricing if I'm a seed-stage startup?

**A:** Yes, it is often the *best* way to get your first 10 customers because it removes their risk. Tell early users: "We won't charge you unless we save you money." It's the ultimate way to validate your Value Prop. However, you must move to a [hybrid](/wiki/pricing/models-and-metering/hybrid-pricing) model (base + performance) quickly to ensure you cover your own burn rate.

**Q:** What if the customer lies about the outcome?

**A:** You cannot rely on self-reporting. You must own the metering/telemetry. If you can't technically measure the result yourself (e.g., tracking pixel), do not use this model.

**Q:** What if the customer won't share data?

**A:** Either (a) choose an outcome you can verify independently, (b) use proxy metrics, or (c) avoid outcome pricing.

**Q:** Does outcome pricing hurt my valuation?

**A:** It can. Investors prefer predictable recurring revenue (MRR or ARR). Outcome pricing is variable. To fix this, you can show a "Floor" price and a high historical "Success Yield." High NRR (superior to [subscription](/wiki/pricing/models-and-metering/subscription-model) peers) often outweighs the month-to-month variance in the eyes of VCs.
