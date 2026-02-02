---
title: "Usage-based pricing"
metaTitle: "Usage-based pricing (pay-as-you-go): Definition and Examples"
oneLiner: "Charge customers based on measured consumption so price scales with value, improving adoption and expansion."
prereqs: []
tags: ["SaaS", "cloud", "consumption pricing", "monetization", "packaging", "PLG", "billing"]
readingTime: 10
lastUpdated: "2026-01-31"
owner: "Dr. Sarah Zou"
---

## Snapshot (TL;DR)

**What it is:** A pricing model (often called "pay-as-you-go") where customers pay based on their consumption of a specific metric (e.g., API calls, data stored, transactions processed) rather than a flat monthly fee per user.

**Why it matters:** It lowers the barrier to entry for small users while providing an uncapped revenue ceiling as your customers grow and succeed.

**When to use:** When value scales with usage, usage can be metered accurately, customers can predict/control consumption, and when [seat-based](/wiki/pricing/models-and-metering/seat-based-pricing) licensing discourages adoption.

**Key Takeaways:**

- **Value Alignment:** You win when your customer wins.
- **The "Unit" is King:** Success depends entirely on choosing the right [value metric](/wiki/pricing/models-and-metering/pricing-metric-value-metric).
- **Low Friction:** UBP allows customers to start small with minimal upfront risk, ideal for PLG (Product-Led Growth).
- **Net Retention Power:** UBP is the primary driver of 130%+ Net Revenue Retention (NRR).
- **Audit for "The Taxi Meter Effect":** If customers are afraid to use your product because they see the "meter running," you will kill adoption.

## Key Facts

- **38% Faster Growth:** Public SaaS companies utilizing usage-based pricing grew 38% faster year-over-year compared to those with traditional models. ([OpenView, 2023](https://openviewpartners.com/blog/state-of-usage-based-pricing/))
- **54% of CFOs like UBP:** 54% of CFOs agree that flexible "pay-as-you-use" models are a game-changer for reducing customer churn. ([LogiSense](https://twitter.com/LogiSense/status/1658172144566583296))
- **2/3 use UBP:** 80% of customers said consumption pricing better aligns with value; ~2/3 of software companies using it said it increases revenue with existing customers. ([Bain](https://www.bain.com/insights/is-consumption-based-pricing-right-for-your-software-tech-report-2022/))

## What is usage-based pricing?

**Usage-Based Pricing (Consumption Pricing),** often called "pay-as-you-go", is a [monetization model](/wiki/pricing/models-and-metering/monetization-model) where customers are charged based on their consumption of a product or service (e.g., gigabytes stored, API calls made, messages sent) rather than a flat fee or per-user license. It aligns the price paid directly with the volume of value received.

The emergence of UBP fits within the context of **The Usage Economy.**

**The Usage Economy:** The broader economic shift from ownership (buying an asset) to access (paying for the utility of an asset). It relies on atomic-level tracking of value delivery.

### Key definitions

* **[Pricing Metric (Value Metric)](/wiki/pricing/models-and-metering/pricing-metric-value-metric):** The specific unit of measurement used to define usage (e.g., per "active user," per "resolution," per "compute hour"). Selecting the right metric is the **single most consequential** decision in UBP. In UBP, you *want* these to be the same (or very close).
* **Rate card:** The price per unit (often tiered).
* **Allowance:** Included usage (free or bundled) before overage charges.
* **Overage:** The variable bill above allowance.
* **[Hybrid pricing](/wiki/pricing/models-and-metering/hybrid-pricing):** A base fee (platform access / SLA / minimum) plus usage charges.
* **Commit-to-consume (committed spend):** Customer commits to a minimum spend/units for a discount; usage burns down the commitment. (See [minimum commitment + overage](/wiki/pricing/models-and-metering/minimum-commitment-plus-overage) and [prepaid credits](/wiki/pricing/models-and-metering/prepaid-credits-drawdown-model).)
* **Minimum Commit:** A floor price customers pay to ensure a baseline of revenue for the vendor. (See [minimum commitment + overage](/wiki/pricing/models-and-metering/minimum-commitment-plus-overage).)

### Worked example (generic)

You sell an API that processes "events."

* Base: \$200/month includes 1M events.
* Overage: \$0.00025 per event (= \$250 per additional 1M).
* Customer uses 3.4M events.

Bill = \$200 + \$0.00025 × (3.4M − 1.0M) = \$200 + \$0.00025 × 2.4M = \$200 + \$600 = \$800/month

Add predictability option: "Commit \$1,500/month for up to 8M events at an effective \$0.0001875/event."

### Mental model

**"The Taxi vs. The Car"**

![Usage-based pricing mental model: The Taxi vs The Car. Subscription/License (The Car) means you pay the same whether you use it or not; the asset sits idle. Usage-Based (The Taxi) means you pay only for distance traveled; no travel equals zero cost. Hybrid (The Cell Phone Plan) is a base bucket plus overage—predictability with upside capture.](/images/wiki_ubp_mental.png)

* **[Subscription](/wiki/pricing/models-and-metering/subscription-model)/License (The Car):** You buy the car (or lease it flat-rate). You pay the same amount whether you drive it 100 miles or 0 miles. It sits idle 95% of the time, representing wasted efficiency for the buyer.
* **Usage-Based (The Taxi):** You pay only for the specific distance traveled. If you don't travel, you pay zero. The risk of asset utilization shifts from the buyer to the seller.
* **[Hybrid](/wiki/pricing/models-and-metering/hybrid-pricing) (The Cell Phone Plan):** The most common successful B2B model. You pay a base fee for a "bucket" of usage (e.g., 5GB data), and pay extra (overage) only if you exceed it. This creates predictability while capturing upside.

### Rules of thumb

* **Pick a "value meter" first, then design [packaging](/wiki/pricing/packaging-and-bundling/packaging).** If your unit doesn't track value, UBP becomes "taxation," not alignment.
* **Customers must be able to estimate the next bill** within a rough band (or feel safe via caps/alerts/commits).
* **Prefer metrics customers can influence** (avoid charging for things that feel outside their control).
* **Design for procurement:** Offer predictable options (commits, annual prepay, or capped plans) alongside pay-go.

## Why does usage-based pricing matter?

In traditional [seat-based](/wiki/pricing/models-and-metering/seat-based-pricing) SaaS, a company might pay for 100 seats but only use 10. This creates **"shelfware,"** leading to churn during budget cuts. In UBP, if the customer doesn't use the product, they don't pay.

* **Lower Barrier to Entry:** UBP allows customers to start small with minimal upfront risk. This "land and expand" dynamic often reduces Customer Acquisition Cost (CAC) and accelerates adoption. Ideal for PLG (Product-Led Growth).
* **Built-in Expansion (NRR):** As a customer's usage grows, revenue grows automatically without requiring a sales interaction to upsell a new [tier](/wiki/pricing/packaging-and-bundling/good-better-best). This maximizes Net Revenue Retention (NRR).
* **Fairness & Churn Reduction:** Customers perceive it as fair because they only pay for what they value. Unlike flat [subscriptions](/wiki/pricing/models-and-metering/subscription-model) where low-usage customers might churn because they feel they are "overpaying," UBP allows them to scale costs down during quiet periods without leaving the platform.

## When should you use usage-based pricing?

### Decision criteria

| If your product…                                        | Usage-based pricing is a good fit when…                        | Watch-outs                                       |
| -------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------ |
| Value grows with activity (compute, data, transactions) | More usage = more customer value                                | Bill shock; heavy-user discounts may be expected |
| Has measurable, auditable events                         | Metering is accurate and hard to spoof                          | Metering disputes; instrumentation gaps         |
| Serves developers / automated workflows                  | Seats don't reflect value (APIs, agents, pipelines)             | Harder to sell "budget certainty"                |
| Has significant variable cost                            | You need price to scale with cost and avoid margin compression  | Must model worst-case usage/margin               |
| Has wide customer size variance                          | You want low-friction entry + organic expansion                 | Revenue forecasting becomes usage forecasting    |

## How do you implement usage-based pricing step-by-step?

### Inputs you need

* **Telemetry Data:** What you can meter reliably (and the cost drivers behind them)? You need historical data on how customers actually use the product (e.g., how many "events" does an average user trigger?) and the distribution by segment (P50/P90/P99), seasonality, growth curves.
* **Customer Interviews:** Test for "Predictability Bias" and ask about ROI. Ask customers: "Would you rather pay \$1,000 flat, or an estimated \$800 that varies between \$600 and \$1,200?" "At what point would this bill feel too expensive relative to the value you got?"
* **Unit economics:** Calculate the marginal cost of delivering one unit of value (e.g., one AI query). Your price floor must cover marginal cost per unit + target gross margin.
* **Competitive landscape:** Common metrics and price points customers have anchored on.

### Step-by-step

1. **Select the Pricing Metric/Value Metric (and validate it):** List 3–5 potential metrics (e.g., Storage, API calls, Active Users). Score each on: value alignment (does it track with their success?), predictability (can they budget for it?), controllability, meterability, auditability, and risk of gaming. Choose 1 primary metric (pricing-page headline) + 0–2 secondary meters (only for major cost/value drivers).

2. **Build the commercial model (rate card + predictability):** Create a rate card with 2–4 volume bands (linear or volumetric discounts). Add at least 2 predictability controls: allowance, caps/limits, alerts, commits, or annual prepay drawdown.

3. **Build the Billing Infrastructure:** Connect your product's telemetry to your billing system (e.g., Stripe, NetSuite). This "metering" plumbing is the #1 technical hurdle. Ensure customers have a dashboard to view their real-time usage (units, trend, forecast) with clear definitions (what counts, rounding rules, windows) + exportable audit logs.

4. **Pilot, iterate, then launch:** Run a "Shadow Billing" period (pilot with one [segment](/wiki/pricing/value-and-customers/customer-segments); monitor churn/expansion and pricing-related support tickets). Show customers what they *would* have paid under UBP before switching them over (a simple narrative + calculator/example bills).

## Metrics to monitor

* **Usage Churn:** Are customers using less over time? This is a leading indicator of cancellation.
* **Net Revenue Retention (NRR):** In UBP models, this should naturally exceed 110–120% as successful customers grow. The gold standard for UBP.
* **Usage Adoption Rate:** % of customers increasing usage month-over-month.
* **Revenue predictability:** % of revenue committed vs. purely variable.

## Risks & anti-patterns (and fixes)

| Pitfall | Fix |
| ------- | --- |
| **Unpredictable Revenue.** Investors hate revenue volatility. | Use the **Pre-paid Drawdown** or **Credit** model. Customers buy $10k worth of "credits" upfront (booking revenue today) and consume them over the year. (See [prepaid credits](/wiki/pricing/models-and-metering/prepaid-credits-drawdown-model).) |
| **The "Adoption Tax":** Charging for things that discourage people from using the product (e.g., charging for logins). | Run a value-metric workshop; validate with 10–20 customer interviews. Only charge for "Success Outcomes," keep seats/logins free. |
| **The "Bill Shock" Crisis.** Customers get a massive, unexpected invoice. | Implement **Circuit Breakers** and auto-alerts at 50%, 80%, and 100% of usage limits. Offer one-time forgiveness for accidental overages to build goodwill. Provide clear forecasting in-product. |
| **Misaligned Incentives.** If you charge "per hour" but your software becomes faster (saving time), your revenue drops while value rises. | Price on **[Outcomes](/wiki/pricing/models-and-metering/outcome-performance-based-pricing)** (e.g., "per successful audit") rather than inputs (time/data). |
| **Sales Compensation Misalignment:** Salespeople hate UBP because they can't "close a big deal" upfront. | Pay commissions on "estimated first-year usage" or "committed spend." |

## References & Links

### Sources:

* Heap, S., & Brar, S. (2022). [*Is consumption-based pricing right for your software?*](https://www.bain.com/insights/is-consumption-based-pricing-right-for-your-software-tech-report-2022/). Bain & Company.
* Nagle, T. T., Müller, G., & Gruyaert, E. (2023). *The Strategy and Tactics of Pricing: A Guide to Growing More Profitably* (7th ed.). Routledge.
* Poyar, K. (2023, February 2). [*The State of Usage-Based Pricing: 2nd Edition*](https://openviewpartners.com/blog/state-of-usage-based-pricing/). OpenView Partners.
* Hinterhuber, A., & Liozu, S. M. (2020). *Pricing Strategy Implementation: Translating Pricing Strategy into Results*. Routledge.
* Howatson, A. (2024). *The Usage Economy: Strategies for Growth, Smart Pricing, and Effective Technology Management*.
* Ghuman, A. (2021). *Price to Scale: Practical Pricing for Your High Growth Software Startup*.

**Related pages:** [Pricing metric / value metric](/wiki/pricing/models-and-metering/pricing-metric-value-metric) | [Monetization model](/wiki/pricing/models-and-metering/monetization-model) | [Hybrid pricing](/wiki/pricing/models-and-metering/hybrid-pricing) | [Minimum commitment + overage](/wiki/pricing/models-and-metering/minimum-commitment-plus-overage) | [Prepaid credits](/wiki/pricing/models-and-metering/prepaid-credits-drawdown-model) | [Subscription model](/wiki/pricing/models-and-metering/subscription-model) | [Seat-based pricing](/wiki/pricing/models-and-metering/seat-based-pricing) | [Outcome/performance-based pricing](/wiki/pricing/models-and-metering/outcome-performance-based-pricing) | [Packaging](/wiki/pricing/packaging-and-bundling/packaging) | [Good-Better-Best](/wiki/pricing/packaging-and-bundling/good-better-best) | [Customer segments](/wiki/pricing/value-and-customers/customer-segments) | [Price fences](/wiki/pricing/value-and-customers/price-fences-price-discrimination) | [Freemium](/wiki/pricing/models-and-metering/freemium-model)

## FAQ

**Q:** What's the biggest reason UBP fails?

**A:** A bad metric: if customers don't see it as value-aligned and controllable, they'll resist or churn.

**Q:** Should we include free usage?

**A:** Often yes—use a small allowance to reduce adoption friction and provide a predictable "floor." (See [freemium](/wiki/pricing/models-and-metering/freemium-model).)

**Q:** Can I combine subscription and usage pricing?

**A:** Yes, this is the **Hybrid Model** (or 3-Part Tariff) and is the industry standard for B2B. You charge a platform fee ([subscription](/wiki/pricing/models-and-metering/subscription-model)) for access and a usage fee for volume. Large enterprises often prefer a predictable "Unlimited" tier or a "[Pre-paid Credit](/wiki/pricing/models-and-metering/prepaid-credits-drawdown-model)" model to satisfy their procurement departments.

**Q:** Does usage-based pricing hurt company valuation?

**A:** It can complicate it. Investors love predictable ARR. Pure usage models (pay-as-you-go) are harder to forecast. However, because UBP companies typically grow faster (38% vs. peers), the growth premium often outweighs the predictability penalty. Also, at scale, the aggregate usage of 1,000 customers is highly predictable. Investors actually prefer the higher NRR that comes with UBP.

**Q:** How do we forecast revenue with UBP?

**A:** Forecast leading indicators of usage (active projects, data volumes, API calls) by cohort/segment, then convert to revenue via the rate card.

**Q:** What if my competitors are all seat-based?

**A:** That is your opportunity. You can "land" in their accounts by offering a low-cost, usage-based entry point for teams that can't justify a full [seat-based](/wiki/pricing/models-and-metering/seat-based-pricing) license for everyone.

**Q:** How do I transition existing customers to usage pricing?

**A:** Do not force it overnight. Introduce the new model for *new* customers first. For existing customers, grandfather them for a set period (e.g., 12 months) or offer a "shadow bill" showing what they *would* pay under the new model to acclimate them before switching.
