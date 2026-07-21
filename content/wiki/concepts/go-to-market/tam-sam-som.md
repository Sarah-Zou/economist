---
title: 'TAM, SAM, and SOM: How to Size a Startup Market'
metaTitle: 'TAM, SAM & SOM: Market Sizing for Founders'
metaDescription: 'Learn how to calculate TAM, SAM, and SOM with bottom-up formulas, a worked example, pitch-deck guidance, and common market-sizing mistakes.'
oneLiner: 'TAM is the full revenue pool, SAM is the portion your current offer can serve, and SOM is the time-bound share your company can realistically capture.'
prereqs: ['Ideal Customer Profile (ICP)', 'Customer Segmentation', 'Willingness to Pay']
tags: ['TAM', 'SAM', 'SOM', 'market sizing', 'go-to-market', 'pitch deck', 'fundraising', 'pricing']
readingTime: 14
lastUpdated: '2026-07-14'
owner: 'Dr. Sarah Zou'
canonical: 'https://sarahzou.com/wiki/go-to-market/tam-sam-som'
---

## Snapshot (TL;DR)

**What it is:** TAM, SAM, and SOM are three nested views of a market opportunity:

- **Total addressable market (TAM):** The annual revenue opportunity if every relevant buyer in a clearly defined market bought this type of solution.
- **Serviceable available market (SAM):** The portion of TAM the current product and business model can actually serve, after constraints such as customer type, use case, geography, regulation, integrations, and channel.
- **Serviceable obtainable market (SOM):** The revenue or unit volume the company can plausibly capture within a stated period, given its reach, conversion, capacity, retention, and competition.

**Why it matters:** Market sizing connects long-term ambition to present-day focus. Investors use it to judge whether a venture-scale outcome is possible; founders use it to choose a beachhead, price the offer, set sales capacity, and keep forecasts inside the market's boundaries.

**Core rule:** Treat market share as the _result_ of a customer-acquisition model, not an assumption.

**Default bottom-up formula:**

`Market revenue = eligible buying units × annual revenue per buying unit`

For a time-bound SOM, where `Active customers_t = active customers_(t-1) × (1 − churn_t) + new customers_t`:

`SOM at horizon h = active customers at h × realized annual revenue per customer`

UK government investor-readiness guidance frames TAM as the opportunity's upper limit, SAM as the subset limited by geography, customer type, or regulation, and SOM as a realistic share supported by strategy, resources, and traction—grounded in evidence and logically connected to the plan for capturing the market.

## TAM vs. SAM vs. SOM at a glance

| Layer   | Question it answers                                                                                 | Typical filters                                                            | Main founder use                                                                        |
| ------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **TAM** | If the defined market fully adopted this type of offer, how large could the annual revenue pool be? | Relevant problem, buyer type, category boundary, monetization model        | Test whether the long-term opportunity fits the company's ambition and capital strategy |
| **SAM** | Which part can the current product and business model serve?                                        | ICP, use case, geography, regulation, integrations, minimum scale, channel | Choose the beachhead, product scope, packaging, and go-to-market motion                 |
| **SOM** | What can this company plausibly capture by a stated date?                                           | Reachable accounts, pipeline, conversion, capacity, retention, competition | Build the operating plan, revenue case, hiring plan, and fundraising milestones         |

TAM is not "everyone who could benefit." SAM is not "the segment we like." SOM is not "1% because 1% sounds conservative." Each number should be reconstructable from a buyer definition, a revenue unit, filters, a time period, and named evidence.

## Why does market sizing matter to founders?

**It tests whether the business model can support the desired outcome.** A large user population can still produce a small revenue opportunity: a marketplace may move billions in gross merchandise value but retain only a small take rate; a vertical SaaS product may reach many locations but earn too little per location to fund an expensive sales motion. For fundraising, the question is not only "Is the market large?" but "Can this company capture enough gross profit and enterprise value to fit the fund's return requirements?" Sequoia's business-plan framework places market potential alongside the customer, competition, business model, and long-term vision—the size claim has to fit the rest of the story.

**It forces a precise customer definition and links pricing to strategy.** A defensible estimate requires naming the buying unit: a company, establishment, team, licensed professional, household, device, or transaction. That choice drives both the count and the price. In a bottom-up model, price is a primary lever—but use realized annual revenue per account by segment, net of ordinary discounts and actual usage, not list price. If the resulting market is too small, the answer is to change packaging, add a revenue stream, or move upmarket—not to inflate the number of buyers.

**It makes the go-to-market plan auditable.** SOM should reconcile to the revenue plan. If the deck claims $20M of revenue in three years, the model should show enough reachable accounts, qualified opportunities, wins, onboarding capacity, and retained customers to produce it. A focused SAM and a capacity-based SOM often build more credibility with investors than a giant TAM, because they show the founder understands the buyer and the path to revenue.

## How do you calculate TAM, SAM, and SOM?

**Step 1 — Define the market boundary.** Write one sentence: `Customer + problem/use case + offer category + geography + base year + revenue basis`. For example: "Annual subscription revenue for compliance-documentation workflow software sold to U.S. multi-site outpatient clinic groups, measured in 2026 dollars." "U.S. healthcare" is an industry, not a market definition. The SBA recommends examining demand, number of interested buyers, customer location, saturation, and the prices customers pay for alternatives, using both existing data and direct research.

**Step 2 — Choose the buying unit and revenue unit.** Use the unit that signs the contract and drives billing.

| Business model        | Bottom-up revenue equation                                                 | Frequent mistake                                                        |
| --------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| B2B subscription      | `eligible accounts × realized annual contract value`                       | Counting locations but charging once per parent company                 |
| Usage-based software  | `eligible accounts × annual billable usage × net price per unit`           | Using user count without a usage distribution                           |
| Marketplace           | `addressable transaction value × expected take rate`                       | Presenting GMV as company revenue                                       |
| Hardware              | `annual addressable units × average selling price`                         | Multiplying the installed base by price despite long replacement cycles |
| Consumer subscription | `eligible consumers × paid conversion × annual net revenue per subscriber` | Assuming every potential user becomes a payer                           |

**Step 3 — Build TAM from the bottom up.** For one segment, `TAM = total eligible buying units × realized annual revenue per unit`; for several, sum the segments. Bottom-up does not mean "small"—it means the estimate is assembled from the economic units that produce revenue. Y Combinator's pitching guidance recommends this over a purely top-down estimate: identify who buys comparable solutions, estimate the unit price, and multiply. Use top-down data (government statistics, filings, trade data) as a boundary check, not as a source of unsupported percentages.

**Step 4 — Derive SAM with explicit serviceability filters.** Start from the TAM buyer table and apply only filters that affect whether the current offer can serve an account: required integrations, customer size, launch geography and language, regulatory approval, procurement route, current (not roadmap) capabilities, and an economically reachable channel. A useful segment formula:

`SAM_i = TAM accounts_i × product-eligible rate_i × geography-eligible rate_i × other non-overlapping eligibility rates_i × annual revenue per account_i`

Avoid multiplying correlated percentages as if independent. Where possible, enumerate the jointly eligible accounts directly and deduplicate.

**Step 5 — Build SOM from the acquisition and retention system.** SOM needs a horizon (for example, exit ARR in 36 months). The simplest model:

`New customers_t = reachable accounts_t × qualified-opportunity rate_t × win rate_t`

`Active customers_t = active customers_(t-1) × (1 − logo churn_t) + new customers_t`

`SOM revenue_t = active customers_t × realized annual revenue per active customer_t`

Then impose operational caps: new customers cannot exceed sales capacity or onboarding/production capacity. The resulting market share is a _diagnostic_ (`SOM share = SOM revenue / SAM revenue at the same horizon`)—do not start with the share. No universal 1%, 3%, or 5% rule can substitute for a distribution model.

**Step 6 — Triangulate and show sensitivity.** Use at least two approaches when the decision matters: a bottom-up buyer model, a top-down boundary check, and (for a new category) a value-based model of customers × economic value created × plausible value-capture rate. A customer saving $1M does not imply $1M of willingness to pay—validate with paid pilots and contracts. Show ranges for uncertain drivers rather than one falsely precise total.

## Which data sources should you use?

For U.S. B2B markets, the Census Bureau's **County Business Patterns** gives annual establishment counts, employment, and payroll by geography and detailed NAICS industry for employers; **Statistics of U.S. Businesses** adds firm-level views by enterprise size; and **Nonemployer Statistics** covers businesses without paid employees. Match the NAICS code to the actual buyer, distinguish a firm from an establishment, note the data year and lag, and avoid adding overlapping datasets.

For industry-level checks, the **Bureau of Economic Analysis** defines gross output as an industry's sales or receipts (including business-to-business intermediate inputs), whereas GDP is a value-added measure—so the two are not interchangeable with addressable vendor revenue. Published market reports can be useful inputs, but record each report's category definition, base year, geography, currency, and whether the figure is vendor revenue, customer spend, unit volume, or economic value.

Secondary statistics tell you how many units exist; they rarely tell you what fraction has the problem, can buy, will switch, or will pay your price. Combine them with primary evidence: customer interviews, paid pilots, win/loss data, CRM conversion by segment, realized price data, and channel-partner capacity. The SBA recommends pairing existing quantitative sources with direct research because public data is often not specific enough to the target audience.

## Worked example: B2B compliance software

A startup sells compliance-workflow software to U.S. multi-site outpatient clinic groups. _(Figures are hypothetical.)_

**1. Boundary and unit.** Buying unit: one clinic group that signs one contract (not each location). Revenue unit: realized annual contract value (ACV) of $12,000. Base year: 2026. Account-level research identifies 20,000 U.S. clinic groups with the relevant workflow and enough scale to buy.

`TAM = 20,000 accounts × $12,000 ACV = $240 million`

**2. SAM.** The product initially works only for groups that operate in the five launch states, use a supported clinical system, have a centralized compliance buyer, and can adopt without a certification the startup lacks. After deduplication, 5,000 groups meet all four conditions.

`SAM = 5,000 accounts × $12,000 ACV = $60 million`

Do not get 5,000 by multiplying four rough percentages unless the filters are independent and validated—a direct account count is stronger.

**3. 36-month SOM.** The plan: Year 1, founders close 20 accounts; Year 2, two sellers close 2/month for 10 productive months (`2 × 2 × 10 = 40`); Year 3, four sellers at the same productivity (`4 × 2 × 10 = 80`); annual logo retention 90%; ACV flat at $12,000.

`Year 1 cohort = 20 × 0.9 × 0.9 = 16.2` · `Year 2 cohort = 40 × 0.9 = 36` · `Year 3 cohort = 80`

`Active accounts ≈ 16.2 + 36 + 80 = 132`

`36-month SOM = 132 × $12,000 = $1.58 million exit ARR`

`SOM share of SAM = $1.58M / $60M = 2.6%`

The 2.6% share is the _output_ of the hiring, productivity, and retention assumptions—it was not chosen first. If sellers close 1.5/month and retention is 85%, the total falls materially; present the two or three drivers that matter most rather than hiding them in a single "conservative" case. The financial model must use the same seller count, productivity, churn, and ACV.

## Key Facts

- **SOM is commonly modeled as roughly 1–5% of SAM** captured over the next few years—but UK investor-readiness guidance stresses this must be backed by bottom-up data, not assumed as a round number. [GOV.UK, Investor Readiness Essentials](https://www.gov.uk/government/publications/unlocking-space-for-investment-growth-hub/track-1-investor-readiness-essentials)
- **GDP ≠ gross output.** BEA defines gross output as an industry's sales or receipts including business-to-business intermediate inputs, while GDP measures value added—so they are not interchangeable for a top-down TAM. [U.S. BEA, Gross Output by Industry](https://www.bea.gov/data/industries/gross-output-by-industry)
- **Firms ≠ establishments.** The Census reports establishment counts (County Business Patterns) separately from firm counts (Statistics of U.S. Businesses) and nonemployers; mismatching them can distort a B2B TAM by an order of magnitude. [U.S. Census Bureau, CBP](https://www.census.gov/data/developers/data-sets/cbp-zbp/cbp-api.html)

## What are the most common mistakes?

- **Top-down "1% of a huge number."** "The market is $100B; we only need 1%" avoids the hard questions—which buyers, which budget, which channel, why this company. A small percentage of a poorly defined number is still a poor estimate.
- **Treating users as revenue.** Potential users are not paid seats, active accounts, or annual transactions. Convert the user population through the actual monetization mechanism.
- **Mixing GMV, customer spend, vendor revenue, and gross profit.** A marketplace's transaction volume is not its revenue; industry gross output is not the startup's serviceable revenue; revenue is not gross profit. Use the measure that matches the business model and label it.
- **Applying overlapping filters multiplicatively.** If 60% of accounts are in the target geography and 50% use the required system, it does not follow that 30% meet both—query the intersection or state the dependence.
- **Presenting false precision.** A result like $487,326,911 signals spreadsheet precision, not market knowledge. Use ranges and rounded figures that reflect source quality.

## When does TAM-SAM-SOM break down?

- **Category creation.** When the product replaces no established category, historical vendor revenue understates the opportunity while value-based models overstate willingness to pay. Model the current substitute, the economic value created, and new budget formation separately—and validate with paid behavior.
- **Multi-sided and network-effect markets.** Supply side, demand side, and transaction layer can each have a different "market size." Liquidity by city or category often matters more than global GMV; a national TAM does not solve a local cold-start problem.
- **Highly concentrated markets.** Ten potential buyers are not interchangeable with 10,000. Use named-account scenarios and probability-weighted pipeline, not smooth percentage shares.
- **Supply-constrained businesses.** For manufacturing, energy, or healthcare delivery, obtainable demand may exceed producible supply. Cap SOM by facilities, labor, yield, approvals, and throughput.
- **Regulated or reimbursement-driven markets.** Need does not equal payable demand. Approval, reimbursement, procurement, and evidence requirements can keep a large theoretical TAM outside SAM for years.

## Frequently asked questions

**Q:** What's the difference between TAM, SAM, and SOM in one line each?

**A:** TAM is the whole revenue pool for the category, SAM is the slice your current product and model can serve, and SOM is what you can realistically win by a specific date.

**Q:** Should I use top-down or bottom-up sizing?

**A:** Build TAM bottom-up from buying units × realized revenue per unit, then use a top-down figure only as a boundary check. A bottom-up estimate forces the buyer, price, and filters into the open, which is exactly what investors probe.

**Q:** Is there a "right" percentage for SOM?

**A:** No. Roughly 1–5% is a common sanity band, but SOM should fall out of a reach-conversion-capacity-retention model. If your model produces the number, you can defend it; if you picked the number first, you can't.

**Q:** Does SAM ever change?

**A:** Yes. SAM expands when you add integrations, certifications, geographies, languages, or channels, or change pricing. Track _why_ each account is excluded so product and GTM work can grow serviceability deliberately.

**Q:** How does market sizing connect to fundraising?

**A:** A large TAM shows the ceiling; a focused SAM and a capacity-based SOM show you know where you'll win first and that the operating plan is realistic. Both jobs matter—see [Pre-Seed, Seed, and Series A](/fundraising/pre-seed-seed-series-a) for how investor expectations shift by stage.

## Sources

1. GOV.UK, [Track 1: Investor Readiness Essentials](https://www.gov.uk/government/publications/unlocking-space-for-investment-growth-hub/track-1-investor-readiness-essentials).
2. U.S. Small Business Administration, [Market Research and Competitive Analysis](https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis).
3. U.S. Census Bureau, [County Business Patterns API](https://www.census.gov/data/developers/data-sets/cbp-zbp/cbp-api.html), [Statistics of U.S. Businesses](https://www.census.gov/programs-surveys/susb.html), and [Nonemployer Statistics](https://www.census.gov/programs-surveys/nonemployer-statistics.html).
4. U.S. Bureau of Economic Analysis, [Gross Output by Industry](https://www.bea.gov/data/industries/gross-output-by-industry).
5. Y Combinator, [Practical Design: Pitching](https://www.ycombinator.com/library/practical-design-pitching).
6. Sequoia Capital, [Writing a Business Plan](https://www.sequoiacap.com/article/writing-a-business-plan/).

> **Research note:** TAM, SAM, and SOM are planning estimates, not audited facts. Preserve the assumptions, source definitions, and calculation model so the page can be updated as the product and evidence change.

<!--
FORWARD LINKS — target pages do not exist yet (create then link):
/wiki/go-to-market/product-market-fit, /wiki/unit-economics/arr-mrr,
/wiki/unit-economics/customer-acquisition-cost
EXISTING LINKS OK: /wiki/pricing/value-and-customers/ideal-customer-profile,
/wiki/pricing/value-and-customers/customer-segments,
/wiki/pricing/value-and-customers/willingness-to-pay,
/wiki/pricing/value-and-customers/customer-use-cases,
/wiki/fundraising/pre-seed-seed-series-a (published this run),
/wiki/fundraising/how-startup-funding-works
-->
