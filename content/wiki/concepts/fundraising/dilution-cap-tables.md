---
title: "Dilution and Cap Tables: Model Startup Ownership Correctly"
metaTitle: "Startup Dilution and Cap Tables Explained"
metaDescription: "Learn how startup cap tables work, calculate fully diluted ownership, model fundraising and option-pool dilution, and avoid common cap-table errors."
oneLiner: "A cap table records who owns which securities; a dilution model shows how financing, options, convertibles, and other issuances change each holder's percentage and economic outcome."
prereqs: ["How Startup Funding Works", "Startup Valuation Methods", "SAFE Notes", "Convertible Notes"]
tags: ["cap table", "dilution", "fully diluted shares", "option pool", "fundraising", "founder equity", "SAFE", "convertible note"]
readingTime: 15
lastUpdated: "2026-07-20"
owner: "Dr. Sarah Zou"
canonical: "https://sarahzou.com/fundraising/dilution-cap-tables"
---

## Snapshot (TL;DR)

**What it is:** A capitalization table records a company's ownership securities and related rights — holders of common stock, preferred stock, convertible notes, warrants, and other securities, with units, purchase price, and transaction dates.

**Dilution** is the reduction in a holder's percentage ownership, or in a security's economic or voting power, when the company increases the relevant denominator or changes rights. New shares are the common case, but option-pool increases, SAFEs, notes, warrants, anti-dilution adjustments, and stock-funded acquisitions all create dilution. Every financing path in [how startup funding works](/fundraising/how-startup-funding-works) eventually shows up here as a change in ownership.

**Core formulas:**

`Ownership % = holder's as-converted shares / fully diluted shares`

`Price per share = pre-money valuation / pre-financing fully diluted shares`

`New investor shares = new investment / price per share`

`Relative dilution = 1 - post-transaction ownership % / pre-transaction ownership %`

If a founder owns 80% before a round and 64% after: `1 - 64% / 80% = 20%`. The founder lost **16 percentage points** but was diluted **20% relative** to the prior stake. Those are different statements, and conflating them is the most common cap-table communication error.

**Founder rule:** Never say "the round is 20% dilution" until the model includes all issued shares, outstanding and promised awards, the unissued option pool, warrants, SAFEs and notes, the pool top-up, the new investment, pro rata purchases, and the capitalization definitions in the actual documents.

## What is a cap table, exactly?

A useful cap table has three layers that should reconcile but are not interchangeable:

1. **Legal record** — what the company has validly authorized and issued.
2. **Ownership model** — the common-equivalent, as-converted, and fully diluted views used for decisions.
3. **Scenario model** — what ownership becomes after a proposed financing, conversion, pool increase, or exit.

For a Delaware corporation, the statutory **stock ledger** records stockholders of record, their addresses, registered shares, and all issuances and transfers. Delaware law permits these records to be kept electronically — including on distributed databases — provided they can produce the required stockholder list and be converted into clearly legible paper form on request.

A planning cap table is broader than that ledger: it may include unexercised options, RSUs, the unissued pool, warrants, SAFEs, notes with accrued interest, pro forma financing shares, and waterfall calculations. Calling the spreadsheet a "stock ledger" does not make forecasted shares legally issued. Calling the ledger a "fully diluted cap table" does not make it decision-complete.

## What vocabulary prevents modeling errors?

| Term | What it means | Common error |
| --- | --- | --- |
| **Authorized** | Maximum shares the charter permits for a class | Counting authorized-but-unissued shares as owned |
| **Issued** | Shares the company has issued | Ignoring later repurchase or treasury status |
| **Outstanding** | Issued shares currently held by stockholders | Assuming it equals fully diluted |
| **Reserved** | Shares set aside for a plan, warrant, or conversion | Treating reservation as outstanding |
| **As-converted** | Common-equivalent shares a preferred or convertible would represent | Assuming a 1:1 ratio without checking |
| **Fully diluted** | Scenario-dependent denominator, usually as-converted plus awards, warrants, and some or all of the pool | Assuming one universal definition exists |

There is no safe universal definition of "fully diluted." A term sheet, a SAFE, a note, a board report, and an accounting calculation may each use a different denominator. Quote the definition from the document you are modeling and map every component to it.

## Why does this matter to founders?

**Fundraising terms become share counts.** A $20M pre-money and a $5M check imply `$5M / ($20M + $5M) = 20%` new-investor ownership — but only after the fully diluted pre-money definition is fixed. If the term sheet also requires an option-pool increase inside the pre-money capitalization, existing holders bear that dilution before the investor buys a single share. The same arithmetic applies whether the round is labeled [seed or Series A](/fundraising/pre-seed-seed-series-a); the label does not change the model.

**Employee offers depend on the denominator.** "10,000 options" is not an ownership statement. `Option ownership = option shares / fully diluted shares`. An offer should state the percentage at a dated capitalization, note that future dilution is expected, and distinguish a granted option from an informal promise.

**Investors diligence the cap table before closing.** They verify legal issuance and approvals, founder vesting, plan capacity, conversion terms, outstanding promises, voting thresholds, and whether there are enough authorized shares to close. A cap-table surprise delays the round, changes the share price, or costs trust.

**Ownership is not proceeds.** At a simple common-stock exit, `Holder proceeds = distributable proceeds x ownership %`. Venture outcomes are rarely that simple: debt and transaction expenses come first, and preferred stock may take a preference or participate. The cap table supplies share counts; the [waterfall](/fundraising/liquidation-preferences) supplies payout rights.

## Worked example: a priced round with a pre-money option-pool top-up

Pre-round capitalization:

| Pre-round security | Shares | Fully diluted % |
| --- | ---: | ---: |
| Founders | 8,000,000 | 80.0% |
| Employee shares and outstanding awards | 1,000,000 | 10.0% |
| Unissued option pool | 1,000,000 | 10.0% |
| **Total fully diluted** | **10,000,000** | **100.0%** |

Proposed financing: $20,000,000 pre-money, $5,000,000 new investment (20% post-money), required unissued pool **after** closing of 15%, pool top-up included in the **pre-money** capitalization, no convertibles or warrants.

### The misleading shortcut

Ignoring the top-up: `price = $20M / 10M = $2.00`, `investor shares = $5M / $2.00 = 2.5M`, giving founders 64%, employees 8%, pool 8%, investor 20% on 12,500,000 shares.

But the pool is now 8%, not the required 15%. The model is incomplete.

### Solving the top-up

Let `X` be the new pool shares added pre-money. The investor contributes one-quarter of the $20M pre-money value, so:

`Investor shares = 0.25 x (10,000,000 + X)` and `Post-round total = 1.25 x (10,000,000 + X)`

The unissued pool must equal 15% of the post-round total:

`1,000,000 + X = 0.15 x 1.25 x (10,000,000 + X)`

`1,000,000 + X = 1,875,000 + 0.1875X`  →  `0.8125X = 875,000`  →  `X = 1,076,923`

| Step | Calculation | Result |
| --- | --- | ---: |
| Pre-money fully diluted | 10,000,000 + 1,076,923 | 11,076,923 |
| Price per share | $20,000,000 / 11,076,923 | $1.8056 |
| Investor shares | $5,000,000 / $1.8056 | 2,769,231 |

### Correct post-round cap table

| Group | Shares | Post-round % |
| --- | ---: | ---: |
| Founders | 8,000,000 | 57.78% |
| Employee shares and awards | 1,000,000 | 7.22% |
| Unissued option pool | 2,076,923 | 15.00% |
| New investor | 2,769,231 | 20.00% |
| **Total** | **13,846,154** | **100.00%** |

**Interpreting founder dilution.** Founders fell from 80% to 57.78% — **22.22 percentage points**, or **27.78% relative dilution** (`1 - 57.78% / 80%`). The investor bought 20%, but the founder gave up considerably more, because the pre-money pool top-up is funded entirely by existing holders. This is why pool timing is a real negotiation, not a formality: the same headline valuation produces materially different founder outcomes depending on whether the pool sits pre- or post-money.

## How do SAFEs and notes enter the model?

**Post-money SAFEs.** A quick estimate before the priced round's new money is `SAFE ownership = purchase amount / post-money cap`. Post-money SAFEs convert immediately before the priced round; the new money then dilutes founders, other stockholders, *and* SAFE holders. The pool increase is a separate dilution event. The closing model must use the signed SAFE's Company Capitalization definition, not the shortcut.

**Convertible notes.** `Conversion amount = principal + convertible accrued interest`, then `Conversion shares = conversion amount / conversion price`. Track each tranche separately — different caps and issue dates do not combine into an average instrument.

**Pro rata rights.** An investor maintaining its percentage buys roughly `target ownership x new primary capital`. The exact figure shifts with pool increases, convertibles, and multiple closings.

**Method matters.** When convertibles are outstanding, the same headline inputs can produce different share prices depending on the method used — Cooley documents three (pre-money, percentage-ownership, and dollars-invested) that allocate conversion dilution differently between founders and new investors. Resolve which method applies in the term sheet, not at the closing table.

## How do dilution, anti-dilution, and pro rata differ?

- **Ownership dilution:** percentage falls because the denominator grew.
- **Economic dilution:** the claim on value weakens through senior rights, even if percentage is unchanged.
- **Voting dilution:** voting power falls because new votes or class rights were issued.
- **Anti-dilution protection:** a preferred conversion-ratio adjustment triggered by a lower-priced issuance.
- **Pro rata right:** a right to invest *more cash* to maintain percentage.

Anti-dilution protection does not prevent all dilution. A broad-based weighted-average adjustment protects an investor in a down round while leaving that investor diluted by an ordinary up round.

## Key Facts

- **Delaware defines the stock ledger by statute** as the records naming stockholders of record, their addresses, registered shares, and all issuances and transfers. [8 Del. C. § 219](https://delcode.delaware.gov/title8/c001/sc07/index.html)
- **Delaware permits electronic and distributed-database records**, including the stock ledger, provided they can generate the statutory stockholder list and convert to legible paper form on request. [8 Del. C. § 224](https://delcode.delaware.gov/title8/c001/sc07/index.html)
- **Three different share-price methods exist** for rounds with outstanding convertibles — pre-money, percentage-ownership, and dollars-invested — and they shift conversion dilution between founders and new investors. [Cooley GO](https://www.cooleygo.com/calculating-share-price-outstanding-convertible-notes-or-safes/)
- **In the worked example, a 15% post-close pool costs founders 6.22 percentage points** beyond the investor's 20% purchase (57.78% with the pre-money top-up versus 64.00% without it).

## What are the most common cap-table mistakes?

- **Using only outstanding common shares.** This overstates ownership whenever preferred, options, warrants, the pool, or convertibles belong in the decision denominator.
- **Treating the option pool as costless.** An unissued pool has no recipient yet, but it sits in most fully diluted denominators, and a pre-money top-up reduces existing holders' percentages immediately.
- **Typing percentages instead of calculating them.** Manual percentages drift. Every percentage should be a formula over share counts and one labeled denominator.
- **Mixing legal and pro forma data.** Forecasted financing shares must never appear as issued. Use scenario columns and explicit status fields.
- **Ignoring promised equity.** An offer letter, advisor agreement, or board commitment can create a real obligation even when the grant is missing from the equity platform.

## When does cap-table modeling break down?

- **The capitalization definition is ambiguous.** Documents differ on whether the unissued pool, promised grants, and convertibles count. Quote the definition and map every component.
- **The pool target is stated without timing.** "15% option pool" is incomplete — before or after the financing, and before or after planned grants?
- **Convertibles create circular calculations.** Conversion shares depend on price, which depends on the denominator, which depends on conversion shares. Resolve the method contractually.
- **A down round triggers anti-dilution.** The preferred conversion ratio changes, and the model must apply the charter formula and its issuance exceptions.
- **A stock split or recapitalization occurs.** Share counts, conversion ratios, exercise prices, authorizations, grants, and historical records all have to reconcile afterward.

## Frequently asked questions

**Q:** How much dilution is "normal" per round?

**A:** Priced rounds commonly land in the 15–25% range for the new investor, but the figure that matters to you is total dilution including the option-pool top-up and any converting SAFEs or notes — which is often considerably higher, as the worked example shows.

**Q:** Should the option pool go in the pre-money or post-money?

**A:** A pre-money pool is funded entirely by existing holders; a post-money pool is shared with the new investor. Investors typically ask for pre-money. This is negotiable, and the size is as negotiable as the timing — tie it to an actual 12-to-18-month hiring plan rather than accepting a round number.

**Q:** Is a percentage-point drop the same as relative dilution?

**A:** No. Going from 80% to 64% is a 16-point drop and 20% relative dilution. Both are correct descriptions of the same event; state which one you mean.

**Q:** Do I have to count the unissued pool in my ownership?

**A:** It depends on the denominator the decision requires. Most financing definitions of fully diluted include it, which lowers everyone's stated percentage. Use the definition from the governing document rather than the one that flatters the number.

**Q:** Can cap-table software be trusted as the source of truth?

**A:** Only as far as its inputs. Software does not validate that a grant was board-approved, that a signature exists, or that authorized shares suffice. The legal records govern; the platform reflects them.

## Sources

1. U.S. Securities and Exchange Commission. [Small Business Glossary](https://www.sec.gov/resources-small-businesses/glossary) and [Common Startup Securities](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/common-startup-securities).
2. State of Delaware. [8 Del. C. §§ 219 and 224](https://delcode.delaware.gov/title8/c001/sc07/index.html). Statutory stock-ledger definition and permitted record form.
3. Cooley GO. [Negotiating the Option Pool](https://www.cooleygo.com/negotiating-option-pool/) and [Calculating Share Price With Outstanding Convertible Notes or Safes](https://www.cooleygo.com/calculating-share-price-outstanding-convertible-notes-or-safes/).
4. Y Combinator. [New Standard Deal](https://www.ycombinator.com/blog/new-standard-deal). First-party explanation of post-money SAFE conversion order and pool treatment.
5. National Venture Capital Association. [Model Legal Documents](https://nvca.org/model-legal-documents/). Model financing documents implementing stock rights, voting, and transfer restrictions.

> **Educational note:** This page explains ownership mechanics for founders. It is not legal, tax, accounting, or investment advice. Cap-table records have legal consequences — reconcile them with counsel before a financing or exit.

<!--
FORWARD LINKS — all targets exist as of publication:
/wiki/fundraising, /fundraising/startup-valuation-methods, /fundraising/safe-notes,
/fundraising/convertible-notes, /fundraising/term-sheets,
/fundraising/liquidation-preferences, /fundraising/pre-seed-seed-series-a
-->
