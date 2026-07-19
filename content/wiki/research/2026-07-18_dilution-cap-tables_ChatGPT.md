# Editorial handoff

**Scheduled concept:** Dilution & Cap Tables  
**Calendar date:** 2026-07-18  
**Priority / phase:** 7 / P1  
**Proposed page title:** Dilution and Cap Tables: Model Startup Ownership Correctly  
**Recommended URL:** `/wiki/fundraising/dilution-cap-tables`  
**Primary keyword:** startup dilution and cap table  
**Search intent:** Practical informational. The reader wants to understand a startup cap table, calculate fully diluted ownership and financing dilution, model option-pool increases and converting securities, reconcile legal records, and explain post-round ownership to founders, employees, and investors.  
**Secondary keywords:** startup cap table, equity dilution formula, fully diluted shares, option pool dilution, founder dilution, cap table modeling, pre-money option pool

**Suggested meta title:** Startup Dilution and Cap Tables Explained

**Suggested meta description:** Learn how startup cap tables work, calculate fully diluted ownership, model fundraising and option-pool dilution, and avoid common cap-table errors.

---

# Complete wiki draft

---
title: "Dilution and Cap Tables: Model Startup Ownership Correctly"
metaTitle: "Startup Dilution and Cap Tables Explained"
oneLiner: "A cap table records who owns which securities; a dilution model shows how financing, options, convertibles, and other issuances change each holder's percentage and economic outcome."
prereqs: ["How Startup Funding Works", "Startup Valuation Methods", "SAFE Notes", "Convertible Notes"]
tags: ["cap table", "dilution", "fully diluted shares", "option pool", "fundraising", "founder equity", "SAFE", "convertible note"]
readingTime: 18
lastUpdated: "2026-07-19"
owner: "Dr. Sarah Zou"
---

## Snapshot (TL;DR)

**What it is:** A capitalization table is a record of a company's ownership securities and related rights. The SEC describes a cap table as naming holders of common stock, preferred stock, convertible notes, warrants, and other securities, with information such as units, purchase price, and transaction dates. ([SEC, Small Business Glossary](https://www.sec.gov/resources-small-businesses/glossary))

**Dilution** is the reduction in a holder's percentage ownership—or in a security's economic or voting power—when the company increases the relevant denominator or changes rights. Issuing new shares is the common case, but option-pool increases, SAFEs, notes, warrants, anti-dilution adjustments, and acquisitions paid in stock can all create dilution.

**Core formulas:**

`Ownership % = holder's as-converted shares / fully diluted shares`

`Price per share = pre-money valuation / pre-financing fully diluted shares`

`New investor shares = new investment / price per share`

`Post-financing ownership = holder shares after closing / post-financing fully diluted shares`

`Relative dilution = 1 - post-transaction ownership % / pre-transaction ownership %`

If a founder owns 80% before a round and 64% after it:

`Relative dilution = 1 - 64% / 80% = 20%`

The founder lost 16 percentage points but was diluted by 20% relative to the prior stake. Those are different statements.

**Founder rule:** Never say “the round is 20% dilution” until the model includes:

- all issued shares;
- outstanding and promised equity awards;
- the unissued option pool;
- warrants;
- SAFEs and notes;
- the option-pool top-up;
- the new investment;
- pro rata purchases; and
- the capitalization definitions in the actual documents.

## Definition: the cap table is a model and a control record

A useful cap table has three layers:

1. **Legal record:** what the company has validly authorized and issued.
2. **Ownership model:** the common-equivalent, as-converted, and fully diluted views used for decisions.
3. **Scenario model:** what ownership becomes after a proposed financing, conversion, pool increase, or exit.

These layers should reconcile, but they are not interchangeable.

For a Delaware corporation, the statutory stock ledger records stockholders of record, their addresses and registered shares, and issuances and transfers. Delaware law permits the ledger and corporate records to be maintained electronically if they can produce the required stockholder information and a legible paper form. ([8 Del. C. §§ 219(c) and 224](https://delcode.delaware.gov/title8/c001/sc07/index.html))

A planning cap table is broader than that ledger. It may include:

- unexercised options;
- restricted stock units;
- the unissued pool;
- warrants;
- SAFEs;
- convertible notes and accrued interest;
- pro forma financing shares; and
- waterfall calculations.

Calling the spreadsheet a “stock ledger” does not make every forecasted share legally issued. Calling the ledger a “fully diluted cap table” does not make it decision-complete.

## Why dilution and cap tables matter to founders

### Ownership determines who receives upside

At a simple common-stock exit:

`Holder proceeds = distributable equity proceeds x holder ownership %`

But venture-backed outcomes are rarely that simple. Debt and transaction expenses are paid before equity, and preferred stock may take a liquidation preference or participate. The cap table supplies share counts; the waterfall supplies payout rights.

### Fundraising terms become share counts

A $20 million pre-money valuation and $5 million check imply 20% new-investor ownership only after the fully diluted pre-money definition is fixed:

`$5 million / ($20 million + $5 million) = 20%`

If the term sheet also requires an option-pool increase in the pre-money capitalization, founders and existing holders bear that dilution before the investor buys shares.

### Employee offers depend on the denominator

“10,000 options” is not a meaningful ownership statement by itself:

`Option ownership = option shares / fully diluted shares`

The offer should state the percentage at a dated capitalization, explain that future dilution is expected, and distinguish granted options from an informal promise.

### Investors diligence the cap table before closing

Investors use it to verify:

- legal issuance and approvals;
- founder vesting and repurchase rights;
- option grants and plan capacity;
- conversion terms;
- outstanding promises;
- securities-law compliance;
- voting thresholds;
- information and pro rata rights; and
- enough authorized shares to close.

A cap-table surprise can delay the round, change the share price, require consents, or reduce trust.

### Operators need a source of truth

Finance, legal, people operations, and the board should not maintain conflicting ownership spreadsheets. Each issuance must flow from approval and signed document to ledger, cap table, accounting, and stakeholder communication.

## The vocabulary that prevents modeling errors

### Authorized shares

The maximum shares the corporate charter authorizes for a class or series. Authorized does not mean issued or owned. A financing may require a charter amendment to create preferred stock or increase authorized shares.

### Issued shares

Shares the company has issued. Some may later be repurchased or held in treasury, depending on jurisdiction and facts.

### Outstanding shares

Issued shares currently held by stockholders, generally excluding treasury shares. Confirm the document's definition.

### Reserved shares

Shares set aside for a plan, warrant, conversion, or other purpose. Reservation does not itself make them outstanding.

### As-converted shares

The common-equivalent shares a preferred or convertible security would represent if converted under the stated assumption.

### Fully diluted shares

A scenario-dependent denominator that usually includes outstanding common, preferred on an as-converted basis, outstanding awards, warrants, and some or all of the unissued pool. There is no safe universal definition. A financing term sheet, SAFE, note, board report, and accounting calculation may use different denominators.

### Pre-money and post-money shares

Pre-money shares are counted immediately before the new investment under the financing definition. Post-money shares include closing issuances. Convertibles may be modeled before or as part of closing depending on the agreed method.

## The core cap-table framework

### Step 1: Build the current legal capitalization

For every security, record:

- holder;
- security class and series;
- certificate or grant identifier;
- issue and approval date;
- shares or principal;
- purchase or exercise price;
- vesting and repurchase terms;
- conversion ratio;
- liquidation rights;
- transfer restrictions;
- documents and signatures; and
- securities exemption.

Reconcile totals to the charter, board approvals, stock ledger, equity plan, signed grants, warrants, notes, SAFEs, and accounting records.

### Step 2: Create ownership views

Maintain at least:

- **outstanding:** issued ownership now;
- **as-converted:** preferred converted to common equivalents;
- **fully diluted:** as-converted plus awards, warrants, and selected pool;
- **pro forma:** after a defined financing or transaction; and
- **exit waterfall:** proceeds under the security rights.

Label the date and assumptions on every exported table.

### Step 3: Translate a financing into shares

Start with:

`Pre-round price = pre-money valuation / pre-financing fully diluted shares`

Then:

`New investor shares = primary investment / pre-round price`

For each convertible:

`Conversion shares = conversion amount / applicable conversion price`

Add pool top-up shares and any warrants or closing grants.

### Step 4: Recalculate every holder's percentage

`Post-round % = post-round holder shares / post-round fully diluted total`

Do not reduce percentages manually. Share counts are inputs; percentages are formulas.

### Step 5: Run economic and voting cases

Calculate:

- ownership before and after;
- relative dilution;
- pro rata investment required to maintain ownership;
- exit proceeds at several values;
- voting by class and as-converted;
- board and protective-provision control; and
- later-round dilution.

## Worked example: a priced round with a pre-money option-pool top-up

Assume the company has:

| Pre-round security | Shares | Fully diluted % |
| --- | ---: | ---: |
| Founders | 8,000,000 | 80.0% |
| Employee shares and outstanding awards | 1,000,000 | 10.0% |
| Unissued option pool | 1,000,000 | 10.0% |
| **Total fully diluted** | **10,000,000** | **100.0%** |

The proposed financing:

| Term | Amount |
| --- | ---: |
| Pre-money valuation | $20,000,000 |
| New primary investment | $5,000,000 |
| Investor post-money ownership | 20% |
| Required unissued pool after closing | 15% |
| Pool top-up treatment | Included in pre-money capitalization |
| Convertibles and warrants | None, to isolate the pool mechanics |

### First, the misleading shortcut

Ignoring the pool top-up:

`Price per share = $20 million / 10 million = $2.00`

`Investor shares = $5 million / $2.00 = 2.5 million`

Post-round ownership would be:

| Group | Shares | Post-round % |
| --- | ---: | ---: |
| Founders | 8,000,000 | 64.0% |
| Employees | 1,000,000 | 8.0% |
| Unissued pool | 1,000,000 | 8.0% |
| New investor | 2,500,000 | 20.0% |
| **Total** | **12,500,000** | **100.0%** |

The pool is only 8%, not the required 15%. The model is incomplete.

### Solve the pool top-up

Let `X` be new pool shares added before the financing.

Because the investor contributes one-quarter of the $20 million pre-money value, its shares equal:

`Investor shares = 0.25 x (10,000,000 + X)`

Post-round shares equal:

`1.25 x (10,000,000 + X)`

The unissued pool must be 15%:

`1,000,000 + X = 15% x [1.25 x (10,000,000 + X)]`

Solving:

`X = 1,076,923 shares`

### Recalculate the price and investor shares

Pre-money fully diluted shares:

`10,000,000 + 1,076,923 = 11,076,923`

Price per share:

`$20,000,000 / 11,076,923 = $1.8056`

Investor shares:

`$5,000,000 / $1.8056 = 2,769,231`

### Correct post-round cap table

| Group | Shares | Post-round % |
| --- | ---: | ---: |
| Founders | 8,000,000 | 57.78% |
| Employee shares and awards | 1,000,000 | 7.22% |
| Unissued option pool | 2,076,923 | 15.00% |
| New investor | 2,769,231 | 20.00% |
| **Total** | **13,846,154** | **100.00%** |

### Interpret the founder dilution

Founder ownership fell from 80% to 57.78%:

`Percentage-point change = 80% - 57.78% = 22.22 points`

`Relative dilution = 1 - 57.78% / 80% = 27.78%`

The new investor owns 20%, but the founder's relative dilution is 27.78% because the pre-money pool top-up also dilutes the founder.

Cooley's option-pool guidance demonstrates this same structural issue: the negotiated pool size and pre-money valuation interact, and a larger pre-money pool transfers more ownership from existing holders. ([Cooley GO, “Negotiating the Option Pool”](https://www.cooleygo.com/negotiating-option-pool/))

## How SAFEs and notes enter the cap table

### Post-money SAFEs

For a cap-only post-money SAFE, a useful ownership estimate before the priced round's new money is:

`SAFE ownership estimate = purchase amount / post-money cap`

But the closing model must use the signed SAFE's Company Capitalization and conversion mechanics.

YC explains that post-money SAFEs convert immediately before the priced round, after which the priced-round new money dilutes the founders, other stockholders, and SAFE holders. The later round's pool increase is a separate dilution event. ([Y Combinator, “New Standard Deal”](https://www.ycombinator.com/blog/new-standard-deal))

### Convertible notes

Notes add accrued interest and may use a cap, discount, or both:

`Conversion amount = principal + convertible accrued interest`

`Conversion shares = conversion amount / conversion price`

Track each tranche separately. Different caps and issue dates do not combine into an average instrument.

### Pro rata rights

An investor maintaining a percentage must buy additional shares:

`Approximate pro rata investment = target ownership x new primary capital`

The exact calculation can change with pool increases, convertibles, multiple closings, and whether the right applies to the entire offering.

## Cap table vs. dilution vs. anti-dilution

These are different concepts:

- **Ownership dilution:** a holder's percentage falls because the denominator increases.
- **Economic dilution:** a holder's claim on value weakens, which can occur through senior rights even if share percentage is unchanged.
- **Voting dilution:** voting power falls because new votes or class rights are issued.
- **Anti-dilution protection:** a preferred-stock conversion adjustment triggered by a lower-price issuance, depending on the charter.
- **Pro rata right:** a right to invest more cash to maintain percentage ownership.

Anti-dilution protection does not prevent all dilution. A broad-based weighted-average adjustment can protect an investor in a down round while the investor is still diluted by a normal up round.

## How founders, investors, and operators use the cap table

| Role | Use | Required view |
| --- | --- | --- |
| Founder | Plan fundraising, hiring equity, and control | Current FD, pro forma financing, exit waterfall |
| Investor | Underwrite ownership and rights | As-converted, pro forma, preference and voting schedules |
| Finance | Forecast dilution and accounting | Grant-level data, conversion schedule, scenario model |
| Legal | Verify valid issuance and approvals | Charter, stock ledger, board actions, signed securities |
| People team | Make equity offers and manage grants | Pool capacity, grant status, dated ownership estimate |
| Board | Approve grants and financings | Reconciled current and pro forma capitalization |
| Acquirer | Determine closing and proceeds | Legal ownership, debt, preferences, options, consents |

### In the pitch deck

The main deck rarely needs the full cap table. The financing appendix should show:

- current fully diluted ownership by major group;
- outstanding SAFEs, notes, and warrants;
- the proposed raise;
- base-case post-round ownership;
- pool assumptions; and
- enough detail to reconcile use of funds and runway.

Never omit convertibles because “they are not shares yet.”

### In employee communication

Give a dated, qualified estimate:

> This grant represents approximately X% of the company's fully diluted capitalization as of [date], using [defined components], before future financing or grants.

Also explain vesting, exercise price, expiration, tax uncertainty, liquidity, preferences, and future dilution. Percentage alone is not value.

## Common mistakes and misinterpretations

### Using only outstanding common shares

This overstates ownership when preferred, options, warrants, the pool, or convertibles belong in the decision denominator.

### Counting authorized shares as owned

Authorized but unissued shares are corporate capacity, not current ownership.

### Treating the option pool as costless

An unissued pool has no current recipient, but it is included in many fully diluted calculations. A pre-money top-up reduces existing holders' percentage.

### Showing percentages without share formulas

Manual percentages drift. Calculate every percentage from share counts and one labeled denominator.

### Mixing legal and pro forma data

Forecasted financing shares should not appear as issued. Use scenario columns and clear status fields.

### Forgetting accrued note interest

Interest can convert into shares. Update through the expected closing date and a delayed case.

### Using one SAFE shortcut for mixed instruments

Pre-money SAFEs, post-money SAFEs, notes, discounts, caps, MFNs, and warrants need instrument-level calculations.

### Ignoring promised equity

An offer letter, advisor agreement, or board commitment can create a commercial and legal obligation even if the grant is missing from the platform.

### Confusing ownership with proceeds

A founder owning 60% on an as-converted basis may receive far less than 60% of a low-value exit after debt and preferences.

### Failing to reconcile the cap table before a financing

Missing approvals, wrong names, unsigned grants, inconsistent share totals, or inadequate authorized shares become closing problems.

## When this breaks

### The capitalization definition is ambiguous

Different documents may include or exclude the unissued pool, promised grants, and convertibles. Quote the definition and map every component.

### The pool target is stated without timing

“15% option pool” is incomplete. Is that before or after the financing, and before or after planned grants?

### Convertibles create circular calculations

Some priced-round methods allocate dilution from notes or SAFEs differently. Cooley documents pre-money, percentage-ownership, and dollars-invested methods that can produce different share prices and ownership from the same headline inputs. Resolve the method in the term sheet. ([Cooley GO, “Calculating Share Price With Outstanding Convertible Notes or Safes”](https://www.cooleygo.com/calculating-share-price-outstanding-convertible-notes-or-safes/))

### The company has multiple equity classes

Common-equivalent percentages can hide liquidation, voting, dividend, and anti-dilution differences. Add class-level rights and a waterfall.

### A down round triggers anti-dilution

The preferred conversion ratio can change. The cap table must apply the charter formula and issuance exceptions.

### The company repurchases, cancels, or early-exercises equity

Outstanding, vested, tax, and repurchase status can diverge. Update transaction-level records, not only totals.

### A stock split or recapitalization occurs

All share counts, conversion ratios, exercise prices, authorizations, grants, and historical records must reconcile.

### Data access or platform administration is weak

A software cap table is not self-validating. Incorrect inputs produce polished incorrect outputs. Maintain approvals, documents, controls, backups, and review.

## Founder checklist

Before a financing:

- Reconcile the charter's authorized shares by class and series.
- Reconcile the legal stock ledger to signed issuances and transfers.
- Reconcile the equity plan, grants, exercises, cancellations, and pool.
- Add warrants, SAFEs, notes, accrued interest, and side rights.
- Identify promised but ungranted equity.
- Label outstanding, as-converted, fully diluted, and pro forma views.
- Quote the financing's capitalization definition.
- Model pool top-up timing and size.
- Calculate price per share from the correct denominator.
- Model every convertible separately.
- Show pre- and post-round ownership by holder group.
- Calculate percentage-point and relative dilution.
- Model low, base, and high exit waterfalls.
- Verify voting and protective-provision thresholds.
- Confirm sufficient authorized shares and required approvals.
- Keep legal, finance, board, and platform records synchronized.

## Related concepts and internal-link suggestions

- [How Startup Funding Works](/wiki/fundraising) — place ownership changes within the funding lifecycle.
- [Startup Valuation Methods](/wiki/fundraising/startup-valuation-methods) — connect pre-money valuation to price per share.
- [SAFE Notes](/wiki/fundraising/safe-notes) — model post-money SAFE ownership and conversion.
- [Convertible Notes](/wiki/fundraising/convertible-notes) — add principal, interest, caps, and discounts to the model.
- [Term Sheets](/wiki/fundraising/term-sheets) — define option-pool timing, ownership method, and security rights.
- [Liquidation Preferences](/wiki/fundraising/liquidation-preferences) — translate cap-table shares into exit proceeds.
- [Pre-Seed, Seed, and Series A](/wiki/fundraising/pre-seed-seed-series-a) — anticipate dilution across financing stages.

## Sources

1. U.S. Securities and Exchange Commission. [Small Business Glossary](https://www.sec.gov/resources-small-businesses/glossary) and [Common Startup Securities](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/common-startup-securities). Primary definitions of cap tables, stock, options, preferred stock, convertibles, and ownership.
2. State of Delaware. [8 Del. C. §§ 219 and 224](https://delcode.delaware.gov/title8/c001/sc07/index.html). Primary corporate-law requirements for the stock ledger and permitted record form.
3. Cooley GO. [Negotiating the Option Pool](https://www.cooleygo.com/negotiating-option-pool/) and [Calculating Share Price With Outstanding Convertible Notes or Safes](https://www.cooleygo.com/calculating-share-price-outstanding-convertible-notes-or-safes/). Practitioner models of pool dilution and priced-round capitalization methods.
4. Y Combinator. [New Standard Deal](https://www.ycombinator.com/blog/new-standard-deal) and [AngelCalc and Y Combinator's New Deal](https://www.ycombinator.com/blog/angelcalc-and-y-combinators-new-deal/). First-party explanations of post-money SAFE ownership, option-pool treatment, and priced-round dilution.
5. National Venture Capital Association. [Model Legal Documents](https://nvca.org/model-legal-documents/). Current model financing documents implementing stock rights, purchase terms, investor rights, voting, and transfer restrictions.

---

# Recommended internal links for implementation

1. `/wiki/fundraising` — anchor: **startup funding and ownership**
2. `/wiki/fundraising/startup-valuation-methods` — anchor: **valuation and price per share**
3. `/wiki/fundraising/safe-notes` — anchor: **SAFE dilution**
4. `/wiki/fundraising/convertible-notes` — anchor: **convertible note dilution**
5. `/wiki/fundraising/term-sheets` — anchor: **option pool and fully diluted capitalization**
6. `/wiki/fundraising/liquidation-preferences` — anchor: **cap table vs. exit waterfall**
7. `/wiki/fundraising/pre-seed-seed-series-a` — anchor: **dilution across funding rounds**
