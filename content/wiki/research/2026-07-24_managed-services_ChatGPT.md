# Editorial handoff

**Scheduled concept:** Managed Services  
**Calendar date:** 2026-07-24  
**Priority / phase:** 13 / P1  
**Proposed page title:** Managed Services: Scope, Unit Economics, and Scaling  
**Recommended URL:** `/wiki/business-models/managed-services`  
**Primary keyword:** managed services business model  
**Search intent:** Practical informational and commercial. The reader wants to understand how a managed service differs from consulting, outsourcing, support, and SaaS; how to define scope and service levels; how to price and model delivery capacity; which metrics belong in an operating plan or pitch deck; and when human delivery, security exposure, or contract risk prevents the model from scaling.  
**Secondary keywords:** managed service provider, MSP business model, managed services pricing, managed services gross margin, managed services agreement, service-level agreement, recurring services revenue, productized services

**Suggested meta title:** Managed Services: A Founder's Guide to Profitable Scale

**Suggested meta description:** Learn how to scope, price, and operate managed services, model labor and capacity, protect gross margin, and know when the model stops scaling.

---

# Complete wiki draft

---
title: "Managed Services: Scope, Unit Economics, and Scaling"
metaTitle: "Managed Services: A Founder's Guide to Profitable Scale"
metaDescription: "Learn how to scope, price, and operate managed services, model labor and capacity, protect gross margin, and know when the model stops scaling."
oneLiner: "A managed service is an ongoing contractual commitment to operate a defined customer function or outcome, using repeatable processes, people, software, and service levels for a recurring or usage-linked fee."
prereqs: ["Subscription Model", "Packaging", "Cost-Plus Pricing"]
tags: ["managed services", "MSP", "business model", "recurring revenue", "service-level agreement", "unit economics", "productized services", "gross margin"]
readingTime: 15
lastUpdated: "2026-07-24"
owner: "Dr. Sarah Zou"
canonical: "https://sarahzou.com/wiki/business-models/managed-services"
---

## Snapshot (TL;DR)

**What it is:** In a managed-services model, a provider repeatedly operates a defined function for a customer under a contract. The customer buys continuing responsibility and an operating outcome—not merely advice, access to software, or a temporary worker.

**What it is not:** A monthly invoice does not make project work recurring revenue. A support plan is not necessarily a managed service if the customer still operates the function. Staff augmentation is not managed service delivery when the customer directs the people and owns the process. SaaS is not managed service delivery when the customer operates the workflow through self-service software.

**Core economic test:**

`Managed-service gross margin = (service revenue - direct delivery cost) / service revenue`

Direct delivery cost should include delivery payroll and benefits, contractors, third-party tools, customer-specific cloud or data costs, on-call coverage, quality assurance, and expected service credits. Excluding the people who actually fulfill the promise produces a software-looking margin that the business does not have.

**Core capacity test:**

`Capacity coverage = productive delivery hours available / expected delivery hours required`

A ratio below 1.0 means the current team cannot meet expected workload. A ratio barely above 1.0 can also be unsafe because incidents, leave, onboarding, and demand spikes consume the apparent headroom.

**Founder rule:** Sell a narrow, auditable service before selling an open-ended promise. Define the in-scope assets, work types, volumes, hours, service levels, exclusions, customer duties, change process, and exit procedure in the offer and contract.

## Clear definition

A **managed service** is a continuing arrangement in which a provider accepts responsibility for operating, monitoring, maintaining, or improving a defined customer function. Delivery usually combines software, automation, standardized procedures, and human judgment. Payment is commonly recurring, per managed unit, usage-linked, or a hybrid of these.

A 2022 joint advisory from CISA and international cybersecurity agencies defines managed service providers as entities that deliver, operate, or manage information and communications technology services for customers under a contractual arrangement such as a service-level agreement. That definition is cybersecurity-specific, but its structure generalizes: there is an ongoing function, delegated operating responsibility, and a contract that defines performance. ([CISA joint advisory](https://www.cisa.gov/sites/default/files/publications/AA22-131A_Protecting_Against_Cyber_Threats_to_MSPs_and_their_Customers.pdf))

Managed services appear in IT operations, cybersecurity, cloud infrastructure, finance, compliance, data engineering, AI operations, revenue operations, customer support, marketing operations, and industry-specific workflows. The label matters less than the operating boundary: what will the provider run, what remains with the customer, and how will both parties know the service was delivered?

### Managed services versus adjacent models

| Model | Customer is primarily buying | Who operates the recurring workflow? | Typical commercial unit | Main scaling constraint |
| --- | --- | --- | --- | --- |
| Managed service | Ongoing responsibility for a defined function or outcome | Provider, within an agreed boundary | Retainer, managed unit, usage, or hybrid | Delivery capacity, exceptions, and risk |
| Consulting project | Diagnosis, design, or a time-bounded change | Usually customer after handoff | Project, milestone, or time and materials | Expert time and project pipeline |
| Staff augmentation | Additional labor under customer direction | Customer | Hour, day, or FTE | Recruiting and billable utilization |
| Outsourcing | Transfer of a broader process, team, or function | Provider | Multi-year contract or cost-plus arrangement | Transition complexity and concentration |
| SaaS | Access to software | Customer, through the product | Seat, subscription, or usage | Product adoption, infrastructure, and support |
| Support or maintenance | Help when something fails or needs updating | Customer remains primary operator | Subscription, entitlement, or incident | Ticket volume and response obligations |

The categories can coexist. A vertical SaaS company may charge for software, onboarding, and an optional managed workflow. The accounting and operating model should keep those components separate even when the buyer receives one proposal.

### The responsibility boundary is the product

Founders often describe the service by listing tasks: monitor dashboards, respond to tickets, prepare reports, optimize campaigns. Buyers care about the responsibility boundary:

- Which systems, locations, accounts, data sets, or business units are covered?
- Which events trigger provider action?
- What can the provider change without approval?
- Which decisions remain with the customer?
- What response, restoration, completion, quality, or reporting target applies?
- What evidence will prove performance?
- What happens when volume, complexity, or risk exceeds the agreed baseline?

If these answers are ambiguous, every sale creates a new product.

## Why managed services matter to founders

### They can turn expertise into a repeatable offer

Early customers may value an outcome but lack the people, process, or confidence to operate new software. A managed layer can close that adoption gap. It lets a startup observe the actual workflow, learn where exceptions occur, and build reusable runbooks before automating the stable portions.

This can be a strong go-to-market wedge in vertical software and AI. The founder does not need to wait until every edge case is self-service. The risk is becoming a custom agency whose software merely supports bespoke delivery. The test is whether each cohort can be served with fewer exception hours, shorter onboarding, and more consistent quality.

### Recurrence improves visibility, but does not guarantee quality

Ongoing contracts can make revenue more predictable than a sequence of one-off projects. They may also improve retention because the provider becomes embedded in a recurring operating process. Neither property makes the revenue SaaS-like.

Accenture's May 2026 quarterly filing illustrates both the scale and the caveats of the category. Managed services represented 50% of its quarterly revenue, and the company said managed-services bookings are typically multi-year and convert to revenue over a longer period than consulting bookings. It also disclosed that many contracts can be terminated on short notice and warned that bookings are not a substitute for revenue analysis. A startup should therefore separate signed bookings, non-cancelable contract value, recurring billings, recognized revenue, and cash collected. ([Accenture Form 10-Q for the quarter ended May 31, 2026](https://www.sec.gov/Archives/edgar/data/1467373/000146737326000032/acn-20260531.htm))

### Managed services expose the real product gap

Human delivery produces high-resolution evidence about missing integrations, confusing interfaces, weak alerts, incomplete data, and exceptions that software does not handle. A disciplined founder converts that evidence into product priorities. An undisciplined founder lets the team patch every gap manually and mistakes customer heroics for product-market fit.

Track whether the service is becoming more productized:

`Human delivery hours per comparable managed unit`

`Exception rate = cases requiring nonstandard intervention / total eligible cases`

`Straight-through rate = cases completed within the quality threshold without human intervention / total eligible cases`

The last metric should include a quality threshold. Automation that silently creates rework is not operating leverage.

### Buyers transfer work, not accountability

A customer can delegate operation without eliminating its regulatory, security, or business-continuity exposure. NIST's 2024 supply-chain guide recommends defining and communicating supplier requirements and matching their rigor to supplier criticality. The FTC's Safeguards Rule provides a concrete regulated example: covered financial institutions must select capable service providers, put safeguards in contracts, monitor provider work, and reassess providers periodically. These rules do not apply to every customer or service, but they show why buyers request security evidence, audit rights, incident procedures, subcontractor disclosure, and exit support. ([NIST SP 1305](https://doi.org/10.6028/NIST.SP.1305); [FTC Safeguards Rule guide](https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know))

For a founder, compliance is therefore part of the commercial design. A high-privilege service can shorten the path to customer value and simultaneously lengthen procurement, increase insurance needs, and enlarge breach impact.

## The operating framework: scope, load, service level, and control

The model works when four layers reconcile.

### 1. Scope: define the managed unit

Choose a unit that can be counted and whose workload is reasonably predictable: endpoint, cloud account, location, data pipeline, invoice, campaign, user cohort, support queue, model deployment, or monitored asset.

For each unit, publish a service catalog:

- included routine actions;
- included incident or exception types;
- supported systems and integrations;
- operating window and time zone;
- standard reports and review cadence;
- volume or complexity allowance;
- explicit exclusions; and
- paid add-ons or change-order triggers.

The unit is useful only if it explains cost. One "customer" may have ten times another customer's assets, data volume, risk, or exception load.

### 2. Load: estimate demand and capacity

Measure delivery demand from observed workload rather than sales intuition.

`Required hours = managed units x events per unit x handling hours per event + fixed account hours`

Then calculate usable team capacity:

`Productive capacity = delivery FTEs x paid hours per FTE x productive-service fraction`

The productive-service fraction excludes leave, training, internal meetings, administrative work, and other non-delivery time. Do not assume every paid hour is available to fulfill customer work.

U.S. Bureau of Labor Statistics data make the same cost point from another angle. In March 2026, private-industry compensation averaged $32.60 per worked hour in wages and $14.01 in benefits, or $46.60 total. This economy-wide figure is not a staffing quote for specialists, but it shows why a wage-only delivery model materially understates labor cost. ([BLS Employer Costs for Employee Compensation, March 2026](https://www.bls.gov/news.release/ecec.htm))

### 3. Service level: promise what operations can control

A service-level agreement should connect a measurable event to a measurable commitment. Common dimensions include availability, monitoring coverage, acknowledgement time, response time, restoration time, completion time, defect rate, reconciliation accuracy, and reporting timeliness.

Distinguish these terms:

- **Acknowledgement:** the provider confirms receipt.
- **Response:** qualified work begins.
- **Workaround or restoration:** service resumes temporarily or substantially.
- **Resolution:** the underlying issue is corrected.
- **Outcome:** the customer's business result improves.

Promising a 15-minute response is not promising a 15-minute resolution. Founders should also define the measurement clock, severity criteria, exclusions, maintenance windows, dependency failures, and remedy. A percentage without a denominator and clock is not an operable commitment.

### 4. Control: assign duties and preserve evidence

Create a responsibility matrix for the provider, customer, and material subcontractors. Cover identity and access, data quality, configuration approval, incident declaration, customer communications, backup, recovery, legal notices, and offboarding.

CISA's MSP guidance emphasizes shared responsibility, least-privilege access, logging, monitoring, and clear contractual roles because providers can become high-leverage targets. The provider should retain only the access needed, use separate privileged identities, preserve audit logs, test recovery, and give customers evidence rather than a generic claim of security. ([CISA joint advisory](https://www.cisa.gov/sites/default/files/publications/AA22-131A_Protecting_Against_Cyber_Threats_to_MSPs_and_their_Customers.pdf))

## Key formulas and metrics

### Revenue

For a hybrid managed service:

`Monthly service revenue = base fees + managed-unit fees + usage or overage fees + earned outcome fees - service credits`

Keep one-time setup, migration, hardware resale, and pass-through spend separate. They can be valuable, but combining them with recurring fees hides the economics of the continuing service.

### Direct cost and gross margin

`Direct delivery cost = delivery labor + benefits + contractors + delivery tools + customer-specific infrastructure + on-call and QA + expected credits`

`Gross profit = managed-service revenue - direct delivery cost`

`Gross margin = gross profit / managed-service revenue`

Classify costs consistently. A customer-success role that only renews accounts may sit below gross profit; an operator who performs the contracted workflow belongs in direct delivery cost even if the job title says customer success.

### Capacity coverage and headroom

`Capacity coverage = productive capacity / expected required hours`

`Capacity headroom = productive capacity - expected required hours`

Model a normal month, a peak month, and an incident scenario. Capacity is perishable: unused operator time cannot be stored, while an understaffed shift can create SLA breaches and burnout.

### Customer acquisition payback

`Monthly recurring gross profit per account = recurring revenue per account x recurring gross margin`

`CAC payback months = customer acquisition cost / monthly recurring gross profit per account`

Use the recurring gross margin of the managed service, not a corporate blended margin and not an aspirational SaaS margin.

### Retention and expansion

Track gross revenue retention and net revenue retention on recurring managed-service revenue. Also track why accounts expand. Growth from more managed units is healthier than growth from emergency custom work that damages margin.

## Pricing and packaging choices

| Structure | Fits when | Main risk | Guardrail |
| --- | --- | --- | --- |
| Flat monthly retainer | Workload is stable and tightly bounded | High-volume customers consume the pool | State unit, volume, and exception allowances |
| Per managed unit | Cost scales with assets, accounts, locations, or users | Units vary in complexity | Create complexity tiers or factors |
| Base plus usage | Customer needs a minimum service layer and variable volume | Surprise bills or gaming | Use visible meters, alerts, and caps |
| Block of hours | Work is variable but still cataloged | Model becomes time-and-materials in disguise | Limit the block to defined offers and expiration rules |
| Outcome or performance fee | Outcome is attributable and auditable | Provider bears risks it cannot control | Add a base fee, baseline, exclusions, and verification method |
| Cost plus | Scope is uncertain or pass-through is material | Weak incentive to automate | Add productivity targets and transparent cost rules |

AWS's current managed-operations materials illustrate two real packaging patterns: infrastructure management priced from the managed environment and an operations-on-demand catalog sold in monthly 20-hour blocks. The point is not to copy AWS pricing. It is that even a large provider defines the managed resource, catalogs eligible work, and meters exceptional labor. ([AWS Managed Services FAQ](https://aws.amazon.com/managed-services/faqs/); [AWS Operations on Demand documentation](https://docs.aws.amazon.com/managedservices/latest/userguide/ops-on-demand.html))

Avoid the phrase "unlimited support" unless the eligible requests, channels, users, response target, fair-use boundary, and abuse remedy are unambiguous. Unlimited ambiguity is an unpriced liability.

## Simple worked example

Assume an early-stage cloud-operations provider manages 20 customer accounts.

### Monthly revenue

- 20 accounts x $6,000 monthly fee = **$120,000 managed-service revenue**

### Direct delivery cost

- 3.0 delivery FTEs x $12,000 fully loaded monthly cost = $36,000
- 0.5 FTE shared on-call and quality coverage x $12,000 = $6,000
- Monitoring, ticketing, and security tools: 20 x $500 = $10,000
- Customer-specific cloud and data costs = $4,000
- Expected service credits and rework reserve = $2,000
- **Total direct delivery cost = $58,000**

Therefore:

`Gross profit = $120,000 - $58,000 = $62,000`

`Gross margin = $62,000 / $120,000 = 51.7%`

This is a viable service margin in the example; it is not a universal benchmark. The next question is whether the team can reliably deliver it.

### Capacity

Each account consumes an average of 18 delivery hours per month:

`Expected required hours = 20 x 18 = 360 hours`

The 3.5 delivery FTEs each have 160 paid hours per month, but only 70% is available for productive customer service after leave, training, internal work, and administration:

`Productive capacity = 3.5 x 160 x 70% = 392 hours`

`Capacity coverage = 392 / 360 = 1.09`

The business has 32 hours, or about 9%, of expected headroom. If incident load increases demand by 15%, required hours rise to 414 and coverage falls to 0.95. The same P&L that looked profitable is then operationally under-capacity.

### CAC payback

If customer acquisition cost is $18,000:

`Monthly gross profit per account = $6,000 x 51.7% = $3,102`

`CAC payback = $18,000 / $3,102 = 5.8 months`

This payback is only credible if the 51.7% recurring gross margin is stable and retention lasts beyond the recovery period.

### What should the founder change?

Suppose automation reduces average delivery time from 18 to 15 hours without degrading quality:

`New required hours = 20 x 15 = 300 hours`

Coverage rises to 1.31. Gross margin does not improve immediately if the team remains fully employed; the business has created capacity. Margin improves when that capacity prevents hiring, supports more customers, replaces contractors, or reduces service failures. Treating saved hours as instant accounting profit would overstate the benefit.

## How founders, operators, and investors use the model

### Founders: choose the wedge and sequence productization

Start with a narrow customer and problem where the desired outcome repeats, access can be obtained safely, and workload can be counted. Deliver manually enough to learn the workflow, but instrument every handoff and exception. Standardize before automating; automate before expanding scope.

A practical sequence is:

1. sell one defined outcome to one [ideal customer profile](/wiki/pricing/value-and-customers/ideal-customer-profile);
2. document the service catalog and responsibility matrix;
3. measure hours, events, exceptions, and quality by account;
4. turn common work into runbooks and product features;
5. move variable workload into a [hybrid pricing](/wiki/pricing/models-and-metering/hybrid-pricing) meter or add-on; and
6. add adjacent services only after the first offer has stable economics.

### Operators: run one service ledger

Review these metrics by offer and customer cohort:

- recurring service revenue and gross margin;
- direct labor hours per managed unit;
- productive capacity, required hours, and coverage;
- ticket or event volume by severity;
- acknowledgement, response, restoration, and resolution attainment;
- repeat incidents and rework;
- exception and straight-through rates;
- onboarding time and onboarding cost;
- service credits and unbilled work;
- gross and net revenue retention;
- customer concentration; and
- privileged-access and subcontractor inventory.

Blended averages can hide one profitable standardized offer subsidizing a custom, loss-making one.

### Investors: separate recurrence from operating leverage

An investor should ask:

- What portion of revenue is recurring managed-service fees versus projects, setup, resale, or pass-through spend?
- How much contract value is non-cancelable?
- Does gross margin improve by cohort after onboarding?
- Are delivery hours per comparable unit falling?
- Which tasks are standardized or automated, with what quality result?
- How concentrated are customers, vendors, platforms, and key operators?
- What liability, service-credit, breach, and business-continuity exposure sits behind the contract?
- Can a software vendor or customer internalize the managed layer?

Accenture's filings are a useful caution against optimizing one metric in isolation. The company reports utilization because compensation is a major operating cost, while its 2025 annual report warns that utilization that is too high or too low can hurt engagement, work quality, staffing ability, and results. A startup should target resilient coverage, not maximum busyness. ([Accenture 2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1467373/000146737325000217/acn-20250831.htm))

### Pitch deck: show the service engine

A credible business-model slide should show:

1. the managed unit and customer outcome;
2. base and variable price;
3. recurring gross margin by offer;
4. delivery hours and exception rate by customer cohort;
5. capacity coverage and hiring trigger;
6. retention and expansion from managed units;
7. the automation or productization roadmap; and
8. the security and responsibility boundary.

Do not label total contract bookings as ARR. If a contract is cancelable, volume-dependent, or contains one-time work, show those attributes.

## Contract and revenue-recognition implications

A managed-services agreement commonly covers term and termination, scope, pricing and indexation, service levels, service credits, customer duties, change control, data use, security, subcontractors, intellectual property, insurance, liability, incident cooperation, business continuity, audit evidence, transition assistance, and data return or deletion.

Commercial recurrence and accounting revenue are related but not identical. Under FASB's revenue standard, a series of substantially similar distinct services with the same transfer pattern can be treated as one performance obligation satisfied over time. FASB's service-contract example recognizes revenue as weekly service is provided, including after a contract modification. Accenture separately reports deferring transition or setup payments on managed-services contracts and recognizing them as services are delivered. The accounting depends on the actual promises and facts; founders should not assume a nonrefundable setup invoice is immediately recognizable revenue. ([FASB ASU 2014-09, Topic 606](https://storage.fasb.org/ASU%202014-09_Section%20A.pdf); [Accenture May 2026 Form 10-Q](https://www.sec.gov/Archives/edgar/data/1467373/000146737326000032/acn-20260531.htm))

This section is an operating explanation, not accounting or legal advice. Have qualified advisers review material contracts, revenue recognition, employment classification, privacy, security, and sector-specific obligations.

## Common mistakes and misinterpretations

### "The customer pays monthly, so it is ARR"

Monthly billing can include cancelable projects, pass-through cloud charges, hardware, setup work, or blocks of labor. Define recurring revenue policy and reconcile it to contract terms, billings, recognized revenue, and cash.

### "The gross margin is software-like"

This usually results from putting delivery personnel below gross profit or excluding shared on-call, quality, and customer-specific tools. Classify cost by function, not title.

### "One flat price keeps sales simple"

Flat pricing works only when the workload distribution is bounded. Without managed-unit and overage rules, the heaviest customers set the staffing requirement while every customer pays the average.

### "High utilization proves efficiency"

Near-total utilization leaves no room for incidents, coaching, process improvement, sales support, or leave. It can increase service failures and attrition. Measure coverage and workload variability, not only billable time.

### "We will automate it later"

Automation is hardest when every customer has a unique process and exception policy. Narrow the offer and normalize inputs first. Otherwise the company automates one-off work repeatedly.

### "Fast response means the problem is solved"

Acknowledgement, response, restoration, resolution, and outcome are different clocks. Sales materials and contracts should use the same definitions as the operating dashboard.

### "The customer owns security because it owns the data"

The provider may hold credentials, logs, backups, configurations, or sensitive data and may be an attractive path into many customers. Security duties must follow actual access and control.

### "Customer-specific work creates a moat"

Bespoke knowledge can increase switching costs, but it can also trap the provider in non-transferable labor. A defensible service system produces reusable tooling, procedures, benchmarks, and learning without violating customer confidentiality.

### "Automation savings are immediate profit"

Saved hours first create capacity. Financial benefit arrives when the company avoids cost, serves more demand, improves retention or quality, or changes price. Keep operational capacity and recognized profit distinct.

## When this breaks: limitations of managed services

### Workload variance overwhelms the price

Incident-heavy or seasonal customers can consume multiples of the planned effort. The model breaks when the contract fixes price while the workload has no cap, meter, or repricing trigger.

### Customers are too heterogeneous

If every account uses different systems, approvals, data structures, and definitions of success, runbooks do not transfer. The provider remains a portfolio of projects with a monthly billing schedule.

### Labor scales almost one-for-one with revenue

Recurring revenue can grow while operating leverage does not. If hours per managed unit remain flat and specialist labor is scarce, growth requires proportional hiring and working capital. The company may still be healthy, but it should be valued and financed as a people-intensive service rather than disguised SaaS.

### Tail events dominate economics

Security incidents, outages, data errors, or regulatory deadlines can create correlated demand across customers. Average monthly workload misses this tail. Stress-test common-vendor failures and simultaneous high-severity events.

### The provider lacks customer cooperation

Missing access, delayed approvals, bad source data, unsupported systems, and unreported changes can make an SLA impossible. Define customer dependencies, clock pauses, escalation, and deemed approvals carefully.

### Privilege and concentration create unacceptable risk

An MSP can become a single operational or security dependency across customers. CISA's advisory was issued because attackers exploit provider-customer trust relationships. If access cannot be segmented, monitored, and recovered, the model's downside may exceed its commercial value. ([CISA joint advisory](https://www.cisa.gov/sites/default/files/publications/AA22-131A_Protecting_Against_Cyber_Threats_to_MSPs_and_their_Customers.pdf))

### A platform vendor absorbs the managed layer

Cloud, software, or equipment vendors may automate the routine tasks that justified the service. The provider must move toward cross-platform orchestration, domain-specific judgment, higher-value outcomes, or an adjacent workflow. Reselling a vendor feature is not durable differentiation.

### Customers bring the function in-house

At sufficient scale, a customer may hire its own team. The service remains valuable only if shared tooling, specialized expertise, benchmarking, coverage, or lower total cost offsets the customer's desire for control.

### Liability is disproportionate to contract value

A small monthly fee can sit next to uncapped breach, outage, regulatory, intellectual-property, or consequential-loss exposure. Insurance exclusions, service credits, indemnities, and liability caps must match the actual risk and bargaining position.

### Founder knowledge is the delivery system

If every exception escalates to the founder, capacity is neither repeatable nor investable. The remedy is not merely hiring. Encode decisions, escalation thresholds, evidence, and approval rights so another qualified operator can deliver the service.

## A founder's 90-day validation plan

### Days 1-30: bound the offer

- Choose one ideal customer profile and one recurring outcome.
- Define the managed unit, supported systems, included events, volume allowance, and exclusions.
- Write the responsibility matrix and minimum security controls.
- Record handling time and exception type for every case.
- Build the unit-level cost model with fully loaded labor.

### Days 31-60: test delivery and price

- Run the service with a small cohort under one service catalog.
- Measure quality, response, resolution, rework, and customer dependencies.
- Compare flat, per-unit, and base-plus-usage pricing against observed cost.
- Create runbooks for the highest-volume paths.
- Separate onboarding economics from steady-state economics.

### Days 61-90: test operating leverage

- Automate one stable, high-volume path and verify quality before and after.
- Measure hours and exceptions per managed unit by cohort.
- Stress-test a peak month and a correlated incident.
- Set hiring and repricing triggers from capacity coverage.
- Standardize contract language for scope, change, security, termination, and exit.
- Decide whether the next dollar belongs in software, operations, sales, or a narrower offer.

At day 90, classify the model honestly:

1. **Productizing managed service:** comparable accounts require fewer hours and exceptions over time.
2. **Stable service business:** economics are healthy but labor remains the main scaling input.
3. **Consulting sold as a retainer:** work is recurring in billing, not standardized in delivery.
4. **Unpriced operational liability:** scope, capacity, or risk cannot be reconciled to price.

## Related concepts and internal-link suggestions

### Existing EconNova pages

- [Subscription Model](/wiki/pricing/models-and-metering/subscription-model): distinguish recurring access from recurring operating responsibility.
- [Hybrid Pricing](/wiki/pricing/models-and-metering/hybrid-pricing): combine a service retainer with managed-unit or overage charges.
- [Usage-Based Pricing](/wiki/pricing/models-and-metering/usage-based-pricing): meter variable events or consumption without hiding customer cost.
- [Outcome and Performance-Based Pricing](/wiki/pricing/models-and-metering/outcome-performance-based-pricing): structure variable fees when outcomes are attributable and auditable.
- [Pricing Metric and Value Metric](/wiki/pricing/models-and-metering/pricing-metric-value-metric): select a managed unit that tracks value and delivery cost.
- [Packaging](/wiki/pricing/packaging-and-bundling/packaging): define tiers, inclusions, exclusions, and add-ons.
- [Cost-Plus Pricing](/wiki/pricing/foundations/cost-plus-pricing): understand the cost floor without treating cost as willingness to pay.
- [Value-Based Pricing](/wiki/pricing/foundations/value-based-pricing): connect continuing responsibility to customer economic value.
- [Economic Value Estimation](/wiki/pricing/value-and-customers/economic-value-estimation): quantify savings, risk reduction, or released capacity.
- [Ideal Customer Profile](/wiki/pricing/value-and-customers/ideal-customer-profile): target customers with similar systems, workload, and risk.
- [Customer Use Cases](/wiki/pricing/value-and-customers/customer-use-cases): define the workflow and outcome before designing the service catalog.
- [Bootstrapping vs. Venture Capital](/wiki/fundraising/bootstrapping-vs-vc): match the model's labor and working-capital needs to financing strategy.

### Planned pages to cross-link when published

- **API as a Product:** compare delegated operations with self-service programmable infrastructure.
- **Professional Services:** separate implementation and advisory projects from continuing managed responsibility.
- **Vertical SaaS:** show when the managed layer accelerates adoption and when it prevents software scale.
- **Gross Margin:** classify direct delivery labor and pass-through cost consistently.
- **Contribution Margin:** evaluate account-level economics after variable sales and service costs.
- **Service-Level Agreements:** define clocks, severity, evidence, remedies, and exclusions.
- **Customer Concentration:** quantify the downside of a few large managed-service contracts.
- **Recurring Revenue and ARR:** distinguish billing cadence from durable, non-cancelable recurrence.

## Sources used

1. [CISA and international partners, Protecting Against Cyber Threats to Managed Service Providers and their Customers (2022)](https://www.cisa.gov/sites/default/files/publications/AA22-131A_Protecting_Against_Cyber_Threats_to_MSPs_and_their_Customers.pdf)
2. [NIST, Cybersecurity Framework 2.0 Quick-Start Guide for Cybersecurity Supply Chain Risk Management, SP 1305 (2024)](https://doi.org/10.6028/NIST.SP.1305)
3. [Federal Trade Commission, Safeguards Rule: What Your Business Needs to Know](https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know)
4. [Financial Accounting Standards Board, ASU 2014-09, Revenue from Contracts with Customers (Topic 606)](https://storage.fasb.org/ASU%202014-09_Section%20A.pdf)
5. [U.S. Bureau of Labor Statistics, Employer Costs for Employee Compensation, March 2026](https://www.bls.gov/news.release/ecec.htm)
6. [Accenture, Form 10-Q for the quarter ended May 31, 2026](https://www.sec.gov/Archives/edgar/data/1467373/000146737326000032/acn-20260531.htm)
7. [Accenture, 2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1467373/000146737325000217/acn-20250831.htm)
8. [AWS, Managed Services FAQ](https://aws.amazon.com/managed-services/faqs/)
9. [AWS, Operations on Demand documentation](https://docs.aws.amazon.com/managedservices/latest/userguide/ops-on-demand.html)

---

## Recommended internal links for implementation

| Anchor text | Target | Placement |
| --- | --- | --- |
| subscription model | `/wiki/pricing/models-and-metering/subscription-model` | Definition; distinguish recurring access from managed responsibility |
| hybrid pricing | `/wiki/pricing/models-and-metering/hybrid-pricing` | Pricing table and founder sequence |
| usage-based pricing | `/wiki/pricing/models-and-metering/usage-based-pricing` | Variable workload and overage discussion |
| outcome-based pricing | `/wiki/pricing/models-and-metering/outcome-performance-based-pricing` | Pricing table and limitations |
| pricing metric | `/wiki/pricing/models-and-metering/pricing-metric-value-metric` | Managed-unit definition |
| packaging | `/wiki/pricing/packaging-and-bundling/packaging` | Service catalog and tier design |
| cost-plus pricing | `/wiki/pricing/foundations/cost-plus-pricing` | Cost model and pricing section |
| value-based pricing | `/wiki/pricing/foundations/value-based-pricing` | Why the model matters and pricing |
| economic value estimation | `/wiki/pricing/value-and-customers/economic-value-estimation` | Buyer outcome and worked example |
| ideal customer profile | `/wiki/pricing/value-and-customers/ideal-customer-profile` | Founder implementation sequence |
| customer use cases | `/wiki/pricing/value-and-customers/customer-use-cases` | Definition and offer design |
| bootstrapping vs. venture capital | `/wiki/fundraising/bootstrapping-vs-vc` | Financing and pitch-deck discussion |
| API as a product | `/wiki/business-models/api-as-a-product` | Adjacent-model comparison; add after publication |
| service-level agreements | `/wiki/governance-and-process/service-level-agreements` | Contract and operating framework; add when published |
| gross margin | `/wiki/unit-economics/gross-margin` | Formulas and investor diligence; add when published |
| recurring revenue and ARR | `/wiki/economics-and-metrics/recurring-revenue-arr` | Bookings-versus-ARR warning; add when published |
