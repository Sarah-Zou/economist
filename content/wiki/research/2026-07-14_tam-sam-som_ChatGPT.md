# Editorial handoff

**Scheduled concept:** TAM, SAM, SOM  
**Calendar date:** 2026-07-14  
**Priority / phase:** 3 / P1  
**Proposed page title:** TAM, SAM, and SOM: How to Size a Startup Market  
**Recommended URL:** `/wiki/go-to-market/tam-sam-som`  
**Primary keyword:** TAM SAM SOM  
**Search intent:** Practical informational. The reader wants to understand the difference between TAM, SAM, and SOM; calculate each one with defensible assumptions; use market sizing in a pitch deck, operating plan, and go-to-market strategy; and avoid inflated top-down estimates.  
**Secondary keywords:** TAM vs SAM vs SOM, how to calculate TAM, total addressable market, serviceable available market, serviceable obtainable market, startup market sizing, bottom-up market sizing

**Suggested meta title:** TAM, SAM & SOM: Market Sizing for Founders

**Suggested meta description:** Learn how to calculate TAM, SAM, and SOM with bottom-up formulas, a worked example, pitch-deck guidance, and common market-sizing mistakes.

---

# Complete wiki draft

---
title: "TAM, SAM, and SOM: How to Size a Startup Market"
metaTitle: "TAM, SAM & SOM: Market Sizing for Founders"
oneLiner: "TAM is the full revenue pool, SAM is the portion your current offer can serve, and SOM is the time-bound share your company can realistically capture."
prereqs: ["Ideal Customer Profile (ICP)", "Customer Segmentation", "Willingness to Pay"]
tags: ["TAM", "SAM", "SOM", "market sizing", "go-to-market", "pitch deck", "fundraising", "pricing"]
readingTime: 18
lastUpdated: "2026-07-14"
owner: "Dr. Sarah Zou"
---

## Snapshot (TL;DR)

**What it is:** TAM, SAM, and SOM are three nested views of a market opportunity:

- **Total addressable market (TAM):** The annual revenue opportunity if every relevant buyer in a clearly defined market bought the current type of solution.
- **Serviceable available market (SAM):** The portion of TAM that the company's current product and business model can actually serve, after constraints such as customer type, use case, geography, regulation, integrations, language, and channel are applied.
- **Serviceable obtainable market (SOM):** The revenue or unit volume the company can plausibly capture within a stated period, given its reach, conversion, delivery capacity, retention, and competition.

The words *available* and *addressable* are sometimes used interchangeably in the acronym expansions. The calculation matters more than the label. State the definition you use.

**Why it matters:** Market sizing connects long-term ambition to present-day focus. Investors use it to judge whether a venture-scale outcome is possible; founders use it to choose a beachhead, price the offer, set sales capacity, test the business model, and keep forecasts within the market's boundaries.

**Core rule:** Treat market share as the result of a customer-acquisition model, not an assumption.

**Default bottom-up formula:**

`Market revenue = eligible buying units x annual revenue per buying unit`

For a time-bound SOM:

`SOM at horizon h = active customers at h x realized annual revenue per customer`

where:

`Active customers_t = active customers_(t-1) x (1 - churn_t) + new customers_t`

The U.K. government's 2025 investor-readiness guidance similarly frames TAM as the opportunity's upper limit, SAM as the subset limited by factors such as geography, customer type, or regulation, and SOM as a realistic share supported by strategy, resources, and traction. It also emphasizes that the three figures should be grounded in evidence, logically connected, and linked to the plan for capturing the market. ([GOV.UK, Investor Readiness Essentials](https://www.gov.uk/government/publications/unlocking-space-for-investment-growth-hub/track-1-investor-readiness-essentials))

## TAM vs. SAM vs. SOM at a glance

| Layer | Question it answers | Typical filters | Best unit | Main founder use |
| --- | --- | --- | --- | --- |
| **TAM** | If the defined market fully adopted this type of offer, how large could the annual revenue pool be? | Relevant problem, buyer type, category boundary, monetization model | Accounts x annual revenue per account; units x price; transaction value x take rate | Test whether the long-term opportunity fits the company's ambition and capital strategy |
| **SAM** | Which part can the current product and business model serve? | ICP, use case, geography, regulation, language, integrations, minimum scale, buying channel | Same revenue unit as TAM, after explicit eligibility filters | Choose the beachhead, product scope, packaging, and go-to-market motion |
| **SOM** | What can this company plausibly capture by a stated date? | Reachable accounts, pipeline, conversion, sales and onboarding capacity, retention, competition | Active customers x realized revenue per customer, or equivalent operating driver | Build the operating plan, revenue case, hiring plan, and fundraising milestones |

TAM is not “everyone who could benefit.” SAM is not “the segment we like.” SOM is not “1% because 1% sounds conservative.” Each number should be reconstructable from a buyer definition, a revenue unit, filters, a time period, and named evidence.

## Why market sizing matters to founders

### It tests whether the business model can support the desired outcome

A large user population can still produce a small revenue opportunity. A marketplace may facilitate billions in gross merchandise value but retain only a small take rate. A vertical SaaS product may address many locations but earn too little per location to support an expensive sales motion. A hardware company may have a large installed-base opportunity but be constrained by replacement cycles and manufacturing capacity.

For fundraising, the relevant question is not only “Is the market large?” It is “Can this company capture enough gross profit and enterprise value from the market to fit the fund's return requirements?” Sequoia's pitching framework places market potential alongside the customer, competition, business model, and five-year vision; the size claim has to fit the rest of the company story. ([Sequoia Capital, Writing a Business Plan](https://sequoiacap.com/article/writing-a-business-plan/))

### It forces a precise customer definition

A defensible estimate requires the founder to name the buying unit. Is the customer a company, establishment, team, licensed professional, household, device, shipment, or transaction? That choice affects both the numerator and the price.

This is not a clerical detail. The U.S. Census Bureau distinguishes firms from establishments: one firm can operate multiple physical establishments. County Business Patterns reports establishment, employment, and payroll data for businesses with paid employees, while Nonemployer Statistics covers businesses with no paid employees. Adding one dataset, omitting the other, or multiplying locations by a company-level price can materially distort a B2B TAM. ([U.S. Census Bureau, County Business Patterns API](https://www.census.gov/data/developers/data-sets/cbp-zbp/cbp-api.html); [Nonemployer Statistics](https://www.census.gov/programs-surveys/nonemployer-statistics.html))

### It links pricing to strategy

In a bottom-up model, price is a primary driver. A $2,000 annual product and a $20,000 product sold to the same 10,000 accounts do not have the same revenue TAM. But list price is not automatically valid. Use realized annual revenue per account by segment, net of ordinary discounts, expected usage, and the actual take rate.

If the resulting market is too small, the strategic answer may be to change packaging, add a revenue stream, move upmarket, reduce cost to acquire and serve, or expand the product boundary. It is not to inflate the number of buyers.

### It makes the go-to-market plan auditable

SOM should reconcile to the revenue plan. If the deck claims $20 million of revenue within three years, the model should show enough reachable accounts, qualified opportunities, wins, onboarding capacity, and retained customers to produce it. If it does not, the problem is in the operating plan, not the font size on the market slide.

### It improves the fundraising narrative

The market slide should do two jobs at once:

1. Show that the long-term opportunity is large enough.
2. Show that the startup knows where it will win first.

The second job often creates more credibility than the first. A focused SAM and capacity-based SOM demonstrate that the founder understands the buyer and the path to revenue. U.K. investor-readiness guidance explicitly connects market sizing to the initial niche, competitive differentiation, financial forecast, and evidence such as contracts, pilots, pipeline, and retention. ([GOV.UK, Investor Readiness Essentials](https://www.gov.uk/government/publications/unlocking-space-for-investment-growth-hub/track-1-investor-readiness-essentials))

## The core framework: boundary, unit, price, filters, capture

### Step 1: Define the market boundary

Write one sentence that specifies:

`Customer + problem/use case + offer category + geography + base year + revenue basis`

Example:

> Annual subscription revenue for workflow software sold to U.S. multi-site outpatient clinic groups for compliance documentation, measured in 2026 dollars.

This prevents common category errors. “U.S. healthcare” is an industry, not a market definition. “The global AI market” says nothing about the buyer, use case, or revenue the company can capture.

The U.S. Small Business Administration recommends examining demand, number of interested buyers, customer location, saturation, and the prices customers pay for alternatives, using both existing data and direct research. Those questions are a useful boundary checklist. ([U.S. Small Business Administration, Market Research and Competitive Analysis](https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis))

### Step 2: Choose the buying unit and revenue unit

Use the unit that signs the contract and drives billing.

| Business model | Useful bottom-up revenue equation | Frequent mistake |
| --- | --- | --- |
| B2B subscription | `eligible accounts x realized annual contract value` | Counting locations but charging once per parent company |
| Per-seat SaaS | `eligible organizations x average paid seats x net price per seat per year` | Treating all employees as paid seats |
| Usage-based software | `eligible accounts x annual billable usage x net price per unit` | Using user count without a usage distribution |
| Marketplace | `addressable transaction value x expected take rate` | Presenting GMV as company revenue |
| Transaction product | `annual addressable transactions x net revenue per transaction` | Ignoring frequency or payment failure |
| Hardware | `annual addressable units x average selling price` | Multiplying the installed base by price every year despite long replacement cycles |
| Hardware plus service | `annual hardware revenue + installed base x service attach rate x annual service revenue` | Mixing one-time and recurring revenue without a time basis |
| Consumer subscription | `eligible consumers x paid conversion x annual net revenue per subscriber` | Assuming every potential user becomes a payer |

Use revenue unless another unit is intentionally required. If a deck shows both GMV and net revenue, label both and explain the conversion.

### Step 3: Build TAM from the bottom up

For one segment:

`TAM = total eligible buying units x realized annual revenue per unit`

For several segments:

`TAM = sum(accounts_i x annual revenue per account_i)`

Bottom-up does not mean “small.” It means the estimate is assembled from the economic units that produce revenue. Y Combinator's pitching guidance recommends this approach over a purely top-down estimate: identify who buys comparable solutions, estimate the unit price, and multiply potential customers by that price. ([Y Combinator, Practical Design: Pitching](https://www.ycombinator.com/blog/practical-design-pitching/))

Use top-down data as a boundary check. Government industry statistics, company filings, procurement databases, and trade data can reveal whether the bottom-up result is off by an order of magnitude. But do not take a broad analyst category and apply a string of unsupported percentages until the answer looks attractive.

### Step 4: Derive SAM with explicit serviceability filters

Start with the TAM buyer table. Apply only filters that affect whether the current offer and business model can serve an account.

Common SAM filters include:

- required integrations, equipment, or workflow;
- customer size or transaction volume;
- launch geography, language, currency, and support hours;
- regulatory approval, licenses, reimbursement, or data-residency requirements;
- procurement route and contract structure;
- product capabilities available now, not features on a speculative roadmap;
- a minimum willingness to pay compatible with the business model;
- a channel the company can access economically.

A useful segment formula is:

`SAM_i = TAM accounts_i x product-eligible rate_i x geography-eligible rate_i x other non-overlapping eligibility rates_i x annual revenue per account_i`

Avoid multiplying several correlated percentages as if they were independent. When possible, query or enumerate the jointly eligible accounts directly. If the same customer appears in two segments, deduplicate before summing.

### Step 5: Build SOM from the acquisition and retention system

SOM needs a horizon: for example, exit ARR in 36 months or cumulative revenue during 2027-2029. Do not compare a five-year cumulative SOM with a one-year SAM.

The simplest customer-based model is:

`New customers_t = reachable accounts_t x qualified-opportunity rate_t x win rate_t`

`Active customers_t = active customers_(t-1) x (1 - logo churn_t) + new customers_t`

`SOM revenue_t = active customers_t x realized annual revenue per active customer_t`

Then impose operational caps:

`New customers_t <= sales capacity_t`

`New customers_t <= onboarding or production capacity_t`

For a sales-led business:

`Sales capacity_t = productive sellers_t x opportunities per seller_t x win rate_t`

For a self-serve business:

`New paid customers_t = qualified traffic_t x signup rate_t x activation rate_t x paid conversion_t`

For a marketplace:

`SOM revenue_t = active buyers_t x transactions per buyer_t x average transaction value_t x take rate_t`

The resulting market share is a diagnostic:

`SOM share = SOM revenue at horizon / SAM revenue at the same horizon`

Do not start with the share. A government guide may offer a typical percentage as a presentation heuristic, but no universal 1%, 3%, or 5% rule can substitute for a distribution model. Market structure varies too much.

### Step 6: Triangulate and show sensitivity

Use at least two approaches when the decision matters:

1. **Bottom-up buyer model:** buying units x revenue per unit.
2. **Top-down boundary check:** relevant category spend, company revenues, government production or trade data, or procurement totals.
3. **Value-based model for a new category:** customers x quantified economic value created x plausible value-capture rate.

The value-based approach is useful when no established category exists, but it is also the easiest to overstate. A customer saving $1 million does not imply a $1 million willingness to pay. Validate with paid pilots, contracts, procurement behavior, or comparable budgets.

Show a range for uncertain drivers rather than one falsely precise total. A recent U.K. government market study used the TAM-SAM-SOM framework because its narrowing logic made assumptions visible, but it published ranges, disclosed judgment-based filters, and excluded categories that lacked consistent expenditure data. That is a better model of analytical honesty than forcing every possible revenue stream into one headline number. ([GOV.UK, Economic Opportunities of Climate Adaptation for the UK](https://www.gov.uk/government/publications/economic-opportunities-of-climate-adaptation-for-the-uk/economic-opportunities-of-climate-adaptation-for-the-uk))

## Data sources and how to use them

### Government business counts

For U.S. B2B markets, County Business Patterns provides annual establishment counts, employment, and payroll by geography and detailed NAICS industry for businesses with paid employees. Statistics of U.S. Businesses adds firm, establishment, employment, and payroll views by enterprise size. Nonemployer Statistics covers businesses without paid employees and reports establishments and receipts. ([U.S. Census Bureau, County Business Patterns API](https://www.census.gov/data/developers/data-sets/cbp-zbp/cbp-api.html); [Statistics of U.S. Businesses](https://www.census.gov/programs-surveys/susb.html); [Nonemployer Statistics](https://www.census.gov/programs-surveys/nonemployer-statistics.html))

Use these carefully:

- match the NAICS definition to the actual buyer, not the nearest-sounding label;
- distinguish a firm from an establishment;
- check whether the target includes nonemployers;
- note the data year and publication lag;
- avoid adding overlapping datasets;
- document suppressed values and coverage exclusions;
- separate the number of businesses from the number that meets the product's eligibility criteria.

### Industry revenue and spending

Industry output can be a useful top-down check, but the measure must match the question. The U.S. Bureau of Economic Analysis defines gross output principally as an industry's sales or receipts and notes that it includes sales to final users plus business-to-business intermediate inputs. GDP is a value-added measure, so it is not interchangeable with gross output or addressable vendor revenue. ([U.S. Bureau of Economic Analysis, Gross Output by Industry](https://www.bea.gov/data/industries/gross-output-by-industry))

Published market reports can be useful inputs, but record the report's category definition, base year, geography, currency, nominal or real basis, and whether the figure is vendor revenue, customer spend, unit volume, installed base, or economic value. A CAGR without those definitions is not enough.

### Primary customer and operating evidence

Secondary statistics usually tell you how many potential units exist. They rarely tell you what fraction has the problem, can buy, will switch, or will pay your price. Use:

- customer interviews and workflow observation;
- paid pilots and contracts;
- win/loss data;
- CRM counts and conversion by segment;
- realized price and discount data;
- product activation, usage, retention, and expansion;
- channel-partner capacity;
- procurement and implementation timelines.

The SBA recommends combining existing quantitative sources with direct research because public data may not be specific enough to the target audience. ([U.S. Small Business Administration, Market Research and Competitive Analysis](https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis))

## Worked example: B2B compliance software

Assume a startup sells compliance-workflow software to U.S. multi-site outpatient clinic groups. The figures below are hypothetical so the mechanics remain clear.

### 1. Define the boundary and unit

- **Buying unit:** one clinic group that signs one contract, not each physical location.
- **Revenue unit:** realized annual contract value (ACV).
- **Base year:** 2026.
- **Offer:** the current software subscription, excluding future payments or data products.
- **Average realized ACV:** $12,000.

Suppose the founder's account-level research identifies 20,000 U.S. clinic groups with the relevant workflow and enough scale to buy.

`TAM = 20,000 accounts x $12,000 ACV = $240 million annual revenue`

### 2. Derive SAM

The product initially works only for groups that:

- operate in the five launch states;
- use a supported clinical system;
- have a centralized compliance buyer; and
- can adopt without a certification the startup does not yet have.

After deduplicating account records, 5,000 groups meet all four conditions.

`SAM = 5,000 serviceable accounts x $12,000 ACV = $60 million annual revenue`

Do not obtain 5,000 by multiplying four rough percentages unless those filters are independent and validated. A direct account count is stronger.

### 3. Build a 36-month SOM

The operating plan assumes:

- Year 1: founders close 20 new accounts.
- Year 2: two productive sellers close two accounts per month for ten productive months: `2 x 2 x 10 = 40` new accounts.
- Year 3: four productive sellers at the same productivity: `4 x 2 x 10 = 80` new accounts.
- Annual logo retention: 90%.
- ACV remains $12,000; expansion is excluded.

Active accounts at the end of Year 3 are approximately:

`Year 1 cohort = 20 x 90% x 90% = 16.2`

`Year 2 cohort = 40 x 90% = 36`

`Year 3 cohort = 80`

`Total active accounts = 16.2 + 36 + 80 = 132.2, rounded to 132`

`36-month SOM = 132 active accounts x $12,000 ACV = $1.584 million exit ARR`

`SOM share of SAM = $1.584 million / $60 million = 2.64%`

The 2.64% share is the output of the hiring, productivity, and retention assumptions. It was not chosen first.

### 4. Stress-test it

If sellers close only 1.5 accounts per month and annual retention is 85%, the Year 3 active-account total falls materially. If ACV rises to $18,000 but the qualified win rate falls, revenue may increase or decrease depending on the balance. Present the two or three drivers that matter most instead of hiding them inside a single “conservative” case.

### 5. Connect it to the deck and financing plan

The market slide can state:

- **TAM:** $240 million from 20,000 relevant U.S. clinic groups at $12,000 ACV.
- **SAM:** $60 million from 5,000 groups the current product can serve in the launch footprint.
- **36-month SOM:** $1.6 million exit ARR from approximately 132 active customers under the stated sales-capacity and retention plan.
- **Expansion path:** new integrations, certifications, and geographies can move accounts from TAM into SAM; new products can expand revenue per account.

The financial model must use the same seller count, productivity, churn, and ACV assumptions. If the fundraising deck shows a different revenue outcome, reconcile it before sending the deck.

## How founders, operators, and investors use TAM, SAM, and SOM

### Founders

- **Choose a beachhead:** Select a SAM where the problem is urgent, the product works, the buyer is reachable, and willingness to pay supports the cost to acquire and serve.
- **Decide what to build:** Identify which product, integration, certification, or localization constraint keeps attractive accounts outside SAM.
- **Design pricing:** Test whether price, package, and value metric produce enough revenue per account for the market and sales motion.
- **Choose a capital path:** A small but profitable market may fit bootstrapping better than venture financing. A large TAM does not require venture capital, and a small TAM does not become larger because a founder wants to raise.
- **Build the pitch deck:** Put the formula, buyer definition, source year, and critical assumptions on the slide or in an appendix.

### Operators

- Turn SOM into territories, account lists, pipeline targets, seller capacity, onboarding load, and customer-success staffing.
- Track conversion and retention by segment so the estimate improves with evidence.
- Maintain one market-sizing model that reconciles with CRM, pricing, and the financial forecast.
- Separate expansion that grows SAM from execution that captures the existing SAM.

### Investors

- Rebuild the estimate from its units and test whether customers, price, and filters match the product.
- Compare SOM with the revenue plan and the company's actual acquisition and retention evidence.
- Test whether the fund's ownership and return case works under a plausible market share, not only the founder's upside case.
- Examine whether adjacent markets require the same product and go-to-market system or a new company in practice.

## Common mistakes and misinterpretations

### Starting with a large report and taking a small percentage

“The market is $100 billion; we only need 1%” avoids the hard questions: Which buyers? Which budget? Which product? Which channel? Why this company? A small percentage of a poorly defined number is still a poor estimate.

### Treating users as revenue

Potential users are not necessarily buyers, paid seats, active accounts, or annual transactions. Convert the user population through the actual monetization mechanism.

### Mixing GMV, customer spend, vendor revenue, and gross profit

A marketplace's addressable transaction volume is not its revenue. Industry gross output is not the startup's serviceable vendor revenue. Revenue is not gross profit. Use the economic measure that matches the business model and label it.

### Counting establishments when the contract is sold to firms

A multi-location company can appear as many establishments. If the company buys one enterprise license, multiplying establishments by enterprise ACV double counts the opportunity. The reverse can happen when pricing is per location.

### Applying overlapping filters multiplicatively

Suppose 60% of accounts are in the target geography and 50% use the required system. It does not follow that 30% meet both conditions. Query the intersection or state the dependence assumption.

### Using list price instead of realized revenue

Discounts, free tiers, utilization, channel fees, failed payments, and tier mix can make realized annual revenue materially lower than the price page suggests.

### Calling the next forecast “SOM” without a capture mechanism

A forecast is not a defensible SOM merely because it is time-bound. It needs reachable demand, conversion, capacity, and retention assumptions.

### Treating SAM as a fixed property of the market

SAM changes when the product, certification, integration set, geography, channel, or pricing changes. Track the reason an account is excluded so product and go-to-market work can expand serviceability deliberately.

### Adding every roadmap adjacency to TAM

If an adjacency requires a different buyer, product, regulatory pathway, delivery model, or sales motion, show it separately. A “future platform” does not make unrelated budgets addressable today.

### Mixing time bases and currencies

Do not compare annual TAM with five-year cumulative SOM, current TAM with future forecast revenue, or nominal dollars from different years without adjustment. State the base year, horizon, currency, and whether values are nominal or real.

### Presenting false precision

A result such as $487,326,911 signals spreadsheet precision, not market knowledge. Use ranges and rounded figures that reflect source quality.

## When this breaks

TAM-SAM-SOM is a useful communication framework, but it can create false confidence when the market does not have stable boundaries or comparable buying behavior.

### Category creation and new budgets

When the product replaces no established category, historical vendor revenue may understate opportunity while value-based models may overstate willingness to pay. Model the current substitute, the economic value created, and the new budget-formation process separately. Validate with paid behavior.

### Multi-sided and network-effect markets

The supply side, demand side, and transaction layer can each have a different “market size.” Liquidity by city or category may matter more than global GMV. A national TAM does not solve a local cold-start problem.

### Highly concentrated markets

Ten potential buyers are not statistically interchangeable with 10,000. Procurement cycles, account concentration, bargaining power, and one contract's timing dominate the outcome. Use named-account scenarios and probability-weighted pipeline, not smooth percentage shares.

### Supply-constrained businesses

For semiconductors, energy, manufacturing, healthcare delivery, or other capacity-limited models, obtainable demand may exceed producible supply. SOM should be capped by facilities, labor, yield, approvals, working capital, and throughput.

### Regulated or reimbursement-driven markets

Need does not equal payable demand. Approval, reimbursement, procurement, licensure, and evidence requirements can move a large theoretical TAM outside SAM for years.

### Usage-based and volatile-spend markets

Average revenue per account can hide a heavy-tailed distribution and macro sensitivity. Model cohorts or usage bands and show how the result changes with utilization and price.

### Fast-moving or structurally changing markets

Static buyer counts and historical spend may fail when regulation, technology, prices, or distribution changes quickly. Use scenarios rather than one CAGR. The U.K. government's 2026 climate-adaptation study explicitly used ranges and acknowledged that fragmented categories, uncertain forecasts, opaque source methods, and missing expenditure data limited the estimate. ([GOV.UK, Economic Opportunities of Climate Adaptation for the UK](https://www.gov.uk/government/publications/economic-opportunities-of-climate-adaptation-for-the-uk/economic-opportunities-of-climate-adaptation-for-the-uk))

### Local, informal, or poorly measured markets

Official datasets may exclude informal activity, omit nonemployers, suppress small cells, or lag the current market. Combine administrative data, channel checks, field research, and direct account enumeration. State what is missing.

### Businesses that expand the revenue pool

A new business model can change how much of a customer's economics becomes vendor revenue. Fintech embedded in vertical software, for example, can add transaction revenue to subscription revenue. Show the existing revenue TAM and the expansion separately so investors can distinguish current proof from future option value.

## Founder checklist

1. What exact customer, problem, offer, geography, revenue basis, base year, and horizon define the market?
2. What is the buying unit: firm, establishment, seat, household, device, transaction, or something else?
3. Does the price reflect realized annual revenue, not list price or total customer value?
4. Is TAM calculated from the units that actually produce revenue?
5. Which explicit product, geography, regulatory, integration, and channel filters turn TAM into SAM?
6. Are filters based on direct intersections or unsupported multiplied percentages?
7. Is SOM derived from reach, conversion, capacity, and retention by a stated date?
8. Does SOM reconcile with the financial model and hiring plan?
9. Are GMV, revenue, gross profit, industry output, and economic value clearly distinguished?
10. Are source dates, definitions, coverage limits, currency, and time basis documented?
11. Does a top-down cross-check support the bottom-up result within a reasonable range?
12. Which assumptions most change the answer, and are downside and upside cases shown?
13. Which roadmap moves expand SAM, and which merely improve capture of the existing SAM?
14. Can an investor reproduce the estimate from one slide plus an appendix?

## Related concepts and internal-link suggestions

- [Ideal Customer Profile (ICP)](/wiki/pricing/value-and-customers/ideal-customer-profile): Link from the buyer-definition and SAM-filter sections.
- [Customer Segmentation](/wiki/pricing/value-and-customers/customer-segments): Link from the multi-segment formula and beachhead discussion.
- [Willingness to Pay](/wiki/pricing/value-and-customers/willingness-to-pay): Link from price validation and the warning against using list price.
- [Customer Use Cases](/wiki/pricing/value-and-customers/customer-use-cases): Link from the market-boundary framework.
- [Product-Market Fit](/wiki/go-to-market/product-market-fit): Link from the discussion of direct customer evidence, retention, and repeatability.
- [How Startup Funding Works](/wiki/fundraising): Link from the fundraising and capital-path sections.
- [Pre-Seed, Seed, and Series A](/wiki/fundraising/pre-seed-seed-series-a): Link from the investor expectations and milestone discussion.
- [ARR & MRR](/wiki/unit-economics/arr-mrr): Link from the SOM exit-ARR example.
- [Customer Acquisition Cost (CAC)](/wiki/unit-economics/customer-acquisition-cost): Link from the channel-economics and beachhead discussion.
- [Unit Economics](/wiki/unit-economics): Link from the business-model viability discussion.

## Sources

1. GOV.UK, [Track 1: Investor Readiness Essentials](https://www.gov.uk/government/publications/unlocking-space-for-investment-growth-hub/track-1-investor-readiness-essentials), published December 2, 2025.
2. U.S. Small Business Administration, [Market Research and Competitive Analysis](https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis), updated March 24, 2026.
3. U.S. Census Bureau, [County Business Patterns API](https://www.census.gov/data/developers/data-sets/cbp-zbp/cbp-api.html), page revised May 20, 2026; [Statistics of U.S. Businesses](https://www.census.gov/programs-surveys/susb.html); and [Nonemployer Statistics](https://www.census.gov/programs-surveys/nonemployer-statistics.html).
4. U.S. Bureau of Economic Analysis, [Gross Output by Industry](https://www.bea.gov/data/industries/gross-output-by-industry), page modified June 25, 2026.
5. GOV.UK Government Office for Science, [Economic Opportunities of Climate Adaptation for the UK](https://www.gov.uk/government/publications/economic-opportunities-of-climate-adaptation-for-the-uk/economic-opportunities-of-climate-adaptation-for-the-uk), 2026.
6. Y Combinator, [Practical Design: Pitching](https://www.ycombinator.com/blog/practical-design-pitching/), August 15, 2016.
7. Sequoia Capital, [Writing a Business Plan](https://sequoiacap.com/article/writing-a-business-plan/).

> Research note: TAM, SAM, and SOM are planning estimates, not audited facts. Preserve the assumptions, source definitions, and calculation model so the page can be updated as the product and evidence change.

---

# Recommended internal links for implementation

1. Link “buying unit” and the SAM filters to `/wiki/pricing/value-and-customers/ideal-customer-profile` and `/wiki/pricing/value-and-customers/customer-segments`.
2. Link realized ACV and price validation to `/wiki/pricing/value-and-customers/willingness-to-pay`.
3. Link retention and direct customer evidence to `/wiki/go-to-market/product-market-fit`.
4. Link the exit-ARR worked example to `/wiki/unit-economics/arr-mrr` and acquisition capacity to `/wiki/unit-economics/customer-acquisition-cost`.
5. Link the fundraising use case to `/wiki/fundraising` and `/wiki/fundraising/pre-seed-seed-series-a`.
6. Add a reciprocal link from the existing ICP page's TAM/SAM/SOM reference to `/wiki/go-to-market/tam-sam-som`.
