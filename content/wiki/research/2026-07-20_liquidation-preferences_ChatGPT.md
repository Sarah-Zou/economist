# Editorial handoff

**Scheduled concept:** Liquidation Preferences  
**Calendar date:** 2026-07-20  
**Priority / phase:** 9 / P1  
**Proposed page title:** Liquidation Preferences: How Startup Exit Waterfalls Work  
**Recommended URL:** `/wiki/fundraising/liquidation-preferences`  
**Primary keyword:** liquidation preference  
**Search intent:** Practical informational. The reader wants to understand how preferred-stock liquidation preferences divide startup sale proceeds, compare nonparticipating and participating terms, model multiple financing rounds, and recognize the term-sheet provisions that can change founder and employee outcomes.  
**Secondary keywords:** startup liquidation preference, 1x liquidation preference, participating preferred stock, nonparticipating preferred stock, exit waterfall, preferred stock seniority, pari passu liquidation preference

**Suggested meta title:** Liquidation Preferences: Founder Exit Waterfall Guide

**Suggested meta description:** Learn how liquidation preferences split startup exit proceeds, with formulas for 1x, participating, capped, senior, and pari passu terms plus an example.

---

# Complete wiki draft

---
title: "Liquidation Preferences: How Startup Exit Waterfalls Work"
metaTitle: "Liquidation Preferences: Founder Exit Waterfall Guide"
oneLiner: "A liquidation preference determines who gets paid first in a startup exit; its multiple, participation, seniority, dividends, and conversion terms can matter more than ownership percentages at modest outcomes."
prereqs: ["How Startup Funding Works", "Startup Valuation Methods", "Dilution and Cap Tables", "Term Sheets"]
tags: ["liquidation preference", "preferred stock", "venture capital", "fundraising", "exit waterfall", "participating preferred", "term sheet", "cap table"]
readingTime: 17
lastUpdated: "2026-07-20"
owner: "Dr. Sarah Zou"
---

## Snapshot (TL;DR)

**What it is:** A liquidation preference is a preferred stockholder's contractual right to receive specified proceeds before holders of junior equity, usually common stock, when a defined liquidation event occurs. The event often includes a sale or merger, not only a shutdown.

**Why it matters:** Ownership percentages do not by themselves determine exit payouts. A founder can own 60% of the fully diluted shares and still receive nothing in a low-value sale if debt, transaction costs, and senior preference claims absorb the proceeds.

**Base preference amount:**

`Preference claim = liquidation multiple x original investment + eligible unpaid dividends`

For **1x nonparticipating preferred**, the investor generally receives the greater of:

1. the preference claim; or
2. the proceeds available on an as-converted-to-common basis.

The claim is limited by the proceeds actually available.

**Founder rule:** Never review a liquidation preference as a single phrase such as "1x." Model six connected terms:

1. the multiple;
2. participating or nonparticipating;
3. any participation cap;
4. seniority among preferred series;
5. dividends included in the claim; and
6. the definition and allocation mechanics for a liquidation event.

In Cooley's Q1 2026 reported venture financings, 98.2% had a 1x preference and 96.4% had nonparticipating preferred. That is a useful market reference, not a rule and not a substitute for modeling the actual charter. ([Cooley, Q1 2026 Venture Financing Report](https://www.cooley.com/news/insight/2026/2026-04-29-q1-2026-venture-financing-report))

## Clear definition

The SEC staff's small-business glossary describes a liquidation preference as a right an investor may have to be paid before other investors upon a liquidation event, often expressed as 1x or 2x the initial investment plus applicable unpaid dividends. It can differ by stock class and by financing round. ([SEC, Small Business Glossary](https://www.sec.gov/resources-small-businesses/glossary))

Three parts of that definition deserve emphasis.

### It is a priority right, not a valuation

A $5 million investment with a 1x preference creates a $5 million base preference claim, subject to the governing documents. It does **not** mean:

- the company is worth $5 million;
- the investor owns $5 million at all times;
- the investor is guaranteed a $5 million return; or
- the investor receives 1x the company's post-money valuation.

If only $3 million is available to that class after higher-priority obligations, a 1x claim cannot manufacture another $2 million.

### It applies to defined events

The documents normally cover an actual liquidation, dissolution, or winding up. Venture charters also commonly define certain mergers, changes of control, or sales of substantially all assets as **deemed liquidation events**. The exact definition, exceptions, and waiver vote matter.

An IPO is usually handled differently. Preferred stock commonly converts into common stock under specified public-offering conditions, so the private-company preference normally does not continue as an IPO payout right. Read the conversion section rather than assuming every "exit" triggers the waterfall.

### It is implemented in the charter

The term sheet summarizes the bargain, but the amended and restated certificate of incorporation usually creates the preferred stock's operative economic rights. Delaware General Corporation Law Section 151 permits classes and series with stated preferences, participating rights, conversion rights, and rights on dissolution or asset distribution. Those rights must be expressed in the certificate or an authorized board resolution. ([Delaware Code, Title 8, Section 151](https://delcode.delaware.gov/title8/c001/sc05/))

The National Venture Capital Association's current model financing set includes an October 2025 model certificate of incorporation with alternative liquidation structures and drafting commentary. NVCA describes its documents as starting points that must be tailored to the transaction. ([NVCA, Model Legal Documents](https://nvca.org/model-legal-documents/))

## Why liquidation preferences matter to founders

### They separate cap-table ownership from economic ownership

A cap table answers, "Who owns how many shares on an as-converted basis?" A liquidation waterfall answers, "Who receives the next dollar of distributable proceeds?"

Those answers converge in a sufficiently large exit because nonparticipating preferred converts when pro rata common proceeds exceed the preference. They can diverge sharply in a modest or distressed exit.

### They change the minimum exit that produces value for common

Founders and employees usually hold common stock or options on common. If the preferred stack is $20 million, common may receive no sale proceeds until distributable equity value exceeds that stack. A sale can be positive for customers, employees, creditors, and preferred investors while leaving common equity with little or no payout.

This should affect:

- acquisition-offer analysis;
- management incentive planning;
- expectations communicated to employees;
- board conflict procedures;
- fundraising strategy; and
- whether another round's downside protection is worth its headline valuation.

### They can compound across rounds

One 1x nonparticipating series may be straightforward. Several series can create a large stack, different seniority tiers, conversion decisions, cumulative dividends, and contingent-consideration rules.

Wilson Sonsini's Q1 2026 transaction data illustrates why seniority must be reviewed separately from the multiple: senior liquidation preferences appeared in 18% of its Series B and later financings, down from higher levels in 2022 but still present in a meaningful minority. ([Wilson Sonsini, The Entrepreneurs Report, Q1 2026](https://www.wsgr.com/a/web/nUBevewwxJfQCSWvNbkuLe/entrepreneurs-report-q1-2026-uk.pdf))

### They influence incentives at the board and investor level

An investor with a preference may favor an exit that returns its capital even when common holders receive nothing. Common holders may prefer to continue operating because their downside is already zero and they retain upside.

That divergence is not hypothetical. In the Trados litigation, a $60 million merger produced approximately $52 million for preferred stockholders, a management-plan payout for executives, and nothing for common stockholders. The Delaware Court of Chancery examined alleged conflicts and the board's treatment of common-holder interests. ([Delaware Court of Chancery, *In re Trados Incorporated Shareholder Litigation*](https://courts.delaware.gov/opinions/download.aspx?ID=124840))

The lesson is not that a board must reject any sale below the preference stack. It is that contractual payout rights, fiduciary duties, board conflicts, and process are separate questions requiring counsel.

## The exit-waterfall framework

Use a waterfall, not a single ownership percentage.

### Step 1: Start with distributable equity proceeds

Do not start with the press-release purchase price. Build from the value actually available to stockholders:

`Distributable equity proceeds`

`= gross transaction consideration`

`- debt and debt-like obligations paid at closing`

`- transaction expenses and other agreed deductions`

`- amounts paid or reserved ahead of equity`

`+ or - document-specific treatment of escrow, holdbacks, earn-outs, and rollover equity`

The precise bridge is deal-specific. In a formal dissolution, Delaware law requires payment or reasonable provision for claims and obligations before the residual plan of distribution operates. ([Delaware Code, Title 8, Section 281](https://delcode.delaware.gov/title8/c001/sc10/))

### Step 2: Calculate each series' preference claim

Let:

- `I` = original investment represented by the preferred shares;
- `m` = liquidation multiple, such as 1.0 or 2.0;
- `D` = dividends included under the documents; and
- `L` = base preference claim.

Then:

`L = m x I + D`

Use the charter's per-share original issue price and adjustment rules when building the actual model. Do not substitute the latest preferred-share price, current 409A value, post-money valuation, or accounting carrying value.

### Step 3: Apply seniority

Common priority structures are:

- **Senior:** one series is paid before another.
- **Pari passu:** series share the same priority. If proceeds are insufficient, they commonly share ratably based on their respective entitlements.
- **Junior:** a series is paid only after a senior series.
- **Complex or tiered:** groups of series sit in different layers.

Example: Series B has a $6 million senior claim and Series A has a $4 million junior claim. If $7 million is distributable, Series B receives $6 million, Series A receives $1 million, and common receives zero.

If the same claims are pari passu and the documents allocate a shortfall in proportion to the $10 million aggregate entitlement, Series B receives $4.2 million and Series A receives $2.8 million. The total preference stack is identical; the result by investor is not.

### Step 4: Apply participation

#### Nonparticipating preferred

Nonparticipating preferred receives the better of its preference or its as-converted common payout, not both.

Let:

- `P` = distributable equity proceeds;
- `s` = the investor's as-converted ownership percentage; and
- `L` = its preference claim.

For one preferred series with no senior claims:

`Investor payout = max(min(P, L), s x P)`

`Common payout = P - investor payout`

The investor's conversion threshold is:

`Conversion threshold = L / s`

Above that threshold, as-converted proceeds exceed the preference.

#### Participating preferred

Uncapped participating preferred first receives its preference, then shares in remaining proceeds as if converted. This is sometimes described as a "double dip."

For the same simple one-series case:

`Investor payout = min(P, L) + s x max(P - L, 0)`

`Common payout = P - investor payout`

Actual multi-series models must avoid double-counting shares and must follow the charter's conversion and allocation language.

#### Capped participating preferred

A participation cap limits the combined preference-plus-participation payout, often to a stated multiple of the original investment. Once participation reaches the cap, the investor generally takes the better of:

- the capped participating amount; or
- an uncapped as-converted common payout.

Do not model a "2x cap" as a 2x liquidation preference. A 1x participating security capped at 2x and a 2x nonparticipating security produce different payout curves.

### Step 5: Allocate contingent and noncash consideration

Exit consideration may include:

- cash at closing;
- buyer stock;
- escrow;
- indemnity holdbacks;
- earn-outs;
- milestone payments;
- rollover equity; or
- retention and management incentive payments.

Ask when each item enters the waterfall, how it is valued, whether preference dollars are satisfied at closing, and how later payments are divided. The NVCA model certificate includes detailed optional mechanics and commentary because a pro rata escrow holdback can otherwise cause the final result to differ from the agreed preference once claims are resolved. ([NVCA, Model Certificate of Incorporation, updated October 2025](https://nvca.org/document/nvca-model-certificate-of-incorporation-updated-oct-2025/))

## Simple worked example

Assume:

- founders and employees hold 8 million common shares;
- a Series A investor holds 2 million preferred shares on an as-converted basis;
- the investor paid $4 million in total;
- the preferred has a 1x preference;
- there are no included dividends;
- Series A owns 20% on an as-converted basis;
- there is no debt, fee, escrow, tax, or other senior claim; and
- all stated exit values below are distributable equity proceeds.

The base preference is:

`L = 1.0 x $4 million = $4 million`

The nonparticipating conversion threshold is:

`$4 million / 20% = $20 million`

| Distributable proceeds | 1x nonparticipating investor | Common holders | Uncapped participating investor | Common holders |
|---:|---:|---:|---:|---:|
| $3.0M | $3.0M | $0 | $3.0M | $0 |
| $10.0M | $4.0M | $6.0M | $5.2M | $4.8M |
| $30.0M | $6.0M | $24.0M | $9.2M | $20.8M |

At a $10 million outcome:

- Straight 20% pro rata ownership would give the investor $2 million.
- Nonparticipating preferred takes the $4 million preference because it exceeds $2 million.
- Participating preferred takes $4 million first, then 20% of the remaining $6 million: `$4M + 20% x $6M = $5.2M`.

At a $30 million outcome:

- Nonparticipating preferred converts because 20% of $30 million, or $6 million, exceeds the $4 million preference.
- Uncapped participating preferred receives `$4M + 20% x $26M = $9.2M`.

The $3 million row demonstrates an important limit: a $4 million preference claim does not guarantee a $4 million payout when only $3 million is available.

## How founders, investors, and operators use liquidation preferences

### Founders: compare term sheets on exit outcomes

For every serious financing proposal, create a scenario table with:

- distributable proceeds from zero through a credible upside case;
- payout by preferred series;
- payout to common;
- founder proceeds;
- employee option proceeds after exercise cost, where relevant;
- investor multiple on invested capital; and
- the exit value at which each series converts.

At minimum, compare:

- the proposed terms;
- 1x nonparticipating pari passu;
- any senior preference;
- any participating term;
- included cumulative dividends; and
- the fully diluted cap table after the round.

This converts a legal phrase into an economic curve. A higher pre-money valuation can be offset by a more aggressive preference, especially in modest outcomes.

### Investors: protect downside and underwrite return paths

Investors use the preference to define priority when the company's value is insufficient to give every class its as-converted share. They also model:

- recovery of invested capital;
- conversion thresholds;
- return multiples across exit values;
- dilution from future rounds;
- seniority of later capital; and
- how much new money can be raised without making common equity economically remote.

A clean 1x nonparticipating structure aligns investor and common-holder upside above the conversion threshold more closely than participating preferred.

### Finance and legal operators: maintain the waterfall

The waterfall should be updated when the company:

- closes a priced round;
- issues SAFEs or convertible notes;
- amends a charter;
- grants unusual dividend or redemption rights;
- completes a tender or secondary transaction;
- receives an acquisition indication; or
- negotiates escrow, earn-out, or management incentive arrangements.

The cap table, charter, stock purchase documents, SAFE and note schedules, debt payoff amounts, and transaction model must reconcile. A cap-table platform is useful, but it cannot repair incorrect legal inputs.

### Boards: evaluate process as well as payout

For an acquisition, the board should see at least:

- enterprise-to-equity value bridge;
- proceeds by class and material holder;
- preference and conversion assumptions;
- management and retention payments;
- conflicts and investor affiliations;
- credible standalone alternatives; and
- sensitivity to escrow and contingent proceeds.

Bring counsel into the process early when preferred and common incentives diverge.

### Fundraising teams: keep the pitch and data room consistent

A pitch deck normally focuses on the operating plan, round size, use of funds, milestones, and valuation narrative—not a full exit waterfall. But the founder's internal fundraising model should show how the proposed round affects both dilution and distribution rights.

In the data room, keep a current:

- fully diluted cap table;
- charter and amendments;
- security-by-security preference summary;
- SAFE and convertible-note schedule;
- pro forma round model; and
- exit waterfall.

If the company cannot explain its preference stack, an investor or acquirer will rebuild it during diligence, usually under more time pressure.

## Founder term-sheet checklist

For each preferred series, answer these questions in writing:

1. What is the original issue price and aggregate invested capital?
2. What multiple applies?
3. Which dividends are added—declared but unpaid, or accruing whether declared or not?
4. Is the security nonparticipating, participating, or capped participating?
5. If capped, what exactly is capped and when does conversion become better?
6. Is the series senior, pari passu, or junior to every existing series?
7. Which transactions are deemed liquidation events?
8. Who can waive that treatment?
9. How are escrow, holdbacks, earn-outs, buyer stock, and rollover equity allocated?
10. What are the optional and automatic conversion rules?
11. How do SAFEs, notes, warrants, and promised equity affect as-converted ownership?
12. Do the term sheet, charter, cap table, and waterfall all produce the same economics?

## Common mistakes and misinterpretations

### "A 1x preference is founder-friendly, so there is nothing else to review"

One-times is only the multiple. A 1x participating, senior security with cumulative dividends can be materially more investor-favorable than 1x nonparticipating, pari passu preferred with no accruing dividend.

### "The preference means the investor gets its money back"

It means the investor has a contractual priority claim against available proceeds. Recovery may be less than the claim.

### "The sale price is the waterfall input"

Gross purchase price can differ from distributable equity proceeds because of debt, expenses, working-capital adjustments, escrow, claims, earn-outs, and noncash consideration.

### "Liquidation means bankruptcy"

The charter may treat a merger, change of control, or asset sale as a deemed liquidation event. A legal dissolution, bankruptcy distribution, asset sale, stock sale, and IPO can follow different rules.

### "The latest round price determines the preference"

The preference usually references each series' original issue price, adjusted as the documents specify. It is not automatically reset to the latest valuation or common-stock fair market value.

### "Ownership percentages are enough"

Fully diluted ownership is only one input. Preference, participation, seniority, dividends, conversion, and proceeds definitions determine the waterfall.

### "All preferred converts together"

Different series or holders may have different economic incentives. Multi-series conversion decisions can interact because one series' conversion changes the pool shared by common and converted preferred.

### "Pari passu means equal dollars"

Pari passu means equal priority, not necessarily equal payout. A shortfall is commonly allocated ratably according to the amounts each series would otherwise receive.

### "The signed term sheet controls"

The term sheet is a summary. The final charter and definitive documents control the issued security. Review the final language and rerun the model before closing.

## When this breaks: limitations of the simple model

### Multiple series create interdependent conversion decisions

The simple formulas above assume one preferred series. With several series, each conversion decision changes the common-equivalent denominator and the residual proceeds. Seniority and participation can make the waterfall iterative. Use a holder- and series-level model reviewed against the charter.

### Debt and claims can dominate equity economics

A preference ranks equity classes; it does not ordinarily move preferred stock ahead of creditors. Debt, taxes, employee claims, leases, transaction costs, and dissolution reserves can eliminate the equity pool.

### Contingent consideration is path-dependent

Escrow may be released or forfeited. Earn-outs may never be earned. Buyer stock may change value and may be illiquid. A single closing-date number can misstate both timing and allocation.

### Dividends may grow the stack

If dividends accrue whether or not declared, the preference can increase over time. The simple example assumes no such accrual.

### Options require a separate employee model

Option holders may face exercise prices, vesting, tax, cancellation, substitution, or treatment under the acquisition agreement. "Common receives $6 million" does not tell an individual employee what they receive.

### Legal form and jurisdiction matter

The discussion here is centered on a U.S. venture-backed corporation and Delaware-law concepts. LLC interests, non-U.S. entities, public-company preferred stock, bankruptcy proceedings, and bespoke securities can work differently.

### Contract rights do not resolve fiduciary questions

The waterfall can calculate contractual proceeds. It cannot determine whether a board process satisfies fiduciary duties, whether a director is conflicted, or whether a waiver or amendment is valid. Those are legal questions.

### A waterfall is not a valuation forecast

The model shows allocation conditional on an exit value. It does not predict the exit value, probability, timing, tax result, or investor return after time value. Pair it with operating scenarios and a realistic financing plan.

## Practical takeaway

Liquidation preferences are downside-allocation terms. At large exits, 1x nonparticipating preferred often converts and the cap table becomes a reasonable payout guide. At low and middle outcomes, the preference stack can dominate.

For founders, the right workflow is:

1. reconcile every security to the charter and cap table;
2. bridge gross deal value to distributable equity proceeds;
3. apply priority, participation, and conversion in order;
4. show payouts across a range, not one exit value;
5. compare term sheets using both dilution and exit economics; and
6. have counsel confirm that the model matches the documents.

The objective is not to eliminate investor protection. It is to understand the economic bargain before the company signs it.

## Related concepts

- [Term Sheets](/wiki/fundraising/term-sheets) — where the preference multiple, participation, seniority, and deemed-liquidation treatment are first negotiated.
- [Dilution and Cap Tables](/wiki/fundraising/dilution-cap-tables) — the as-converted ownership denominator used in conversion analysis.
- [Startup Valuation Methods](/wiki/fundraising/startup-valuation-methods) — why headline valuation and exit distribution are different questions.
- [How Startup Funding Works](/wiki/fundraising) — the role of preferred stock in the financing lifecycle.
- [Pre-Seed, Seed, Series A](/wiki/fundraising/pre-seed-seed-series-a) — when priced preferred rounds typically enter the capital structure.
- [SAFE Notes](/wiki/fundraising/safe-notes) — how pre-equity instruments may convert or receive contractual payouts in liquidity events.
- [Convertible Notes](/wiki/fundraising/convertible-notes) — how debt conversion and repayment interact with the equity stack.

## Sources

1. U.S. Securities and Exchange Commission, Office of the Advocate for Small Business Capital Formation, [Small Business Glossary: Liquidation Preference](https://www.sec.gov/resources-small-businesses/glossary).
2. Delaware General Assembly, [Delaware General Corporation Law, Section 151](https://delcode.delaware.gov/title8/c001/sc05/).
3. Delaware General Assembly, [Delaware General Corporation Law, Section 281](https://delcode.delaware.gov/title8/c001/sc10/).
4. National Venture Capital Association, [Model Legal Documents](https://nvca.org/model-legal-documents/) and [Model Certificate of Incorporation, updated October 2025](https://nvca.org/document/nvca-model-certificate-of-incorporation-updated-oct-2025/).
5. Cooley, [Q1 2026 Venture Financing Report](https://www.cooley.com/news/insight/2026/2026-04-29-q1-2026-venture-financing-report).
6. Wilson Sonsini Goodrich & Rosati, [The Entrepreneurs Report: Private Company Financing Trends, Q1 2026](https://www.wsgr.com/a/web/nUBevewwxJfQCSWvNbkuLe/entrepreneurs-report-q1-2026-uk.pdf).
7. Delaware Court of Chancery, [*In re Trados Incorporated Shareholder Litigation*](https://courts.delaware.gov/opinions/download.aspx?ID=124840).
8. National Venture Capital Association and PitchBook, [2025 NVCA Yearbook](https://nvca.org/wp-content/uploads/2025/03/2025-NVCA-Yearbook.pdf).

---

# Recommended internal links

## Ready or represented in current EconNova content

- `/wiki/fundraising/term-sheets` — anchor: `term sheets`
- `/wiki/fundraising/dilution-cap-tables` — anchor: `dilution and cap tables`
- `/wiki/fundraising/startup-valuation-methods` — anchor: `startup valuation methods`
- `/wiki/fundraising` — anchor: `how startup funding works`
- `/wiki/fundraising/pre-seed-seed-series-a` — anchor: `Pre-Seed, Seed, and Series A`
- `/wiki/fundraising/safe-notes` — anchor: `SAFE notes`
- `/wiki/fundraising/convertible-notes` — anchor: `convertible notes`

## Useful future supporting pages

- `/wiki/fundraising/participating-vs-nonparticipating-preferred` — anchor: `participating vs. nonparticipating preferred`
- `/wiki/fundraising/preferred-stock-seniority` — anchor: `senior and pari passu preferred`
- `/wiki/fundraising/exit-waterfall` — anchor: `exit waterfall model`
- `/wiki/fundraising/down-rounds` — anchor: `down rounds`
- `/wiki/fundraising/anti-dilution` — anchor: `anti-dilution protection`
