---
title: "SAFE Notes: How Startup SAFEs Work and Dilute Founders"
metaTitle: "SAFE Notes: Conversion and Dilution Explained"
metaDescription: "Learn how startup SAFEs work, calculate cap-based ownership and conversion, model founder dilution, compare SAFEs to convertible notes, and avoid common mistakes."
oneLiner: "A SAFE gives an investor a contractual right to future equity when a defined event occurs; the cap, discount, capitalization definition, and later financing terms decide the shares issued."
prereqs: ["How Startup Funding Works", "Pre-Seed, Seed, and Series A"]
tags: ["SAFE", "SAFE notes", "fundraising", "valuation cap", "dilution", "cap table", "seed financing"]
readingTime: 13
lastUpdated: "2026-07-16"
owner: "Dr. Sarah Zou"
canonical: "https://sarahzou.com/fundraising/safe-notes"
---

## Snapshot (TL;DR)

**What it is:** A SAFE—a *simple agreement for future equity*—is a security in which an investor pays a company now for a contractual right to receive equity (or, in some events, cash) when a specified trigger occurs. Until conversion, holding a SAFE is not the same as owning stock. The SEC defines a SAFE as a promise of a future ownership interest if a trigger such as an equity financing or acquisition occurs.

**Naming correction:** "SAFE note" is common search language, but the standard Y Combinator SAFE is *not* a promissory note. It has no interest rate and no maturity date, and it is not debt. A [convertible note](/fundraising/convertible-notes), by contrast, is a debt obligation that usually carries interest and a maturity date.

**Why it matters:** A SAFE can make an early financing faster and cheaper to document than a priced round, and investors can close one at a time. That is why SAFEs dominate [pre-seed and seed rounds](/fundraising/pre-seed-seed-series-a). But the simplicity is misleading: every SAFE sells a claim on future ownership, multiple SAFEs accumulate, and the conversion result depends on definitions in the signed agreement and on the terms of the later round.

**Core estimate:**

`Cap-implied SAFE ownership = purchase amount / post-money valuation cap`

A $750,000 post-money SAFE with a $12M cap implies 6.25% ownership immediately *before* the new money in the converting round—if the cap price controls. That percentage is then diluted by the priced round's new shares and usually by any option-pool increase.

**Founder rule:** Model the entire stack—every SAFE, note, warrant, promised option, side letter, the existing pool, the next round, and the next pool increase. Never evaluate one SAFE in isolation.

This page explains the standard U.S. post-money SAFE published by Y Combinator. Executed documents, jurisdiction, securities-law exemption, tax, and accounting facts can change the outcome—use qualified advisers for a real financing.

## What is a SAFE—and what is it not?

A SAFE is one of several instruments in the broader map of [how startup funding works](/fundraising/how-startup-funding-works). It separates the date cash enters the company from the date the investor receives shares. The investor pays a **purchase amount** when the SAFE is issued. The agreement then specifies three broad situations:

- **Equity financing:** The SAFE normally converts automatically into preferred stock. Under YC's post-money form there is no minimum financing size required to trigger conversion.
- **Liquidity event:** On an acquisition, merger, or IPO before conversion, the investor generally receives the greater of its purchase amount or the value of an as-converted claim, subject to the agreement's priority provisions.
- **Dissolution event:** If the company shuts down, the holder is entitled to its purchase amount only if funds remain after creditors and debt are paid.

Under the standard YC post-money form, the SAFE is junior to creditors and debt, on par with other SAFEs and standard non-participating preferred, and senior to common stock for the applicable payment. It has no maturity date, so it can remain outstanding for a long time and terminates only after the holder receives stock, cash, or other proceeds under the first relevant trigger.

Before conversion, a SAFE is not common stock. The holder does not automatically have voting, information, dividend, or governance rights; those depend on the SAFE, any side letter, and the shares issued at conversion. The SEC therefore cautions investors to read the actual instrument: triggers and conversion terms vary, and a SAFE may never convert if no specified event occurs—leaving the investor with nothing.

## Why do SAFEs matter to founders?

**They let you close a round one investor at a time.** Instead of coordinating a single closing, the company can sign and receive funds from each investor as they become ready. This "high-resolution fundraising" shortens the time between an investor's yes and cash in the bank.

**They defer the share-price calculation, not the economics.** A SAFE postpones the exact share count until a financing supplies the missing inputs—but it does not postpone dilution. "We haven't set a priced-round valuation" can be true while "we haven't sold any ownership yet" is economically false. A cap is not a present valuation, but it sets a ceiling on the conversion price and therefore a minimum ownership claim in the usual up-round case.

**They turn runway into a dilution decision.** Raising $750,000 at a $12M cap is 6.25% cap-implied ownership; raising $1.5M at the same cap is 12.5%. More runway may be worth it if it materially improves the next round—but the trade-off should be explicit, with the ask, burn, milestone, and dilution budget in one model.

**They shape later hiring and financing capacity.** The SAFE stack becomes part of the fully diluted cap table. A round that looks cheap in legal fees can still be expensive in equity if the company keeps taking small checks without tracking aggregate dilution.

## How does a SAFE go from cash today to shares later?

**1. The company picks a form and economic term.** YC currently publishes three U.S. post-money versions:

| Form | Main economic protection | What determines conversion |
| --- | --- | --- |
| **Valuation cap, no discount** | Maximum post-money valuation used for the cap-price calculation | The cap-price or priced-round-price calculation that produces more shares |
| **Discount, no cap** | Percentage reduction from the new investors' price | The discounted price in the equity financing |
| **Uncapped MFN** | Right to adopt a later SAFE's more favorable terms | The new-round price, unless the MFN was exercised to adopt a later SAFE's terms |

The user guide also explains a cap-plus-discount variation: when both apply, the calculation most favorable to the investor governs.

**2. The investor funds the purchase amount.** Cash is wired and the executed SAFE is delivered—no shares are issued yet. Record the instrument, holder, amount, date, cap or discount, MFN terms, side letters, and board approval in a central cap-table record.

**3. A trigger fixes the settlement.** In an equity financing, a cap-only post-money SAFE compares shares based on the **Safe Price** with shares based on the price paid by the new investors, and the holder receives whichever produces more shares. A cap protects the investor from converting above the cap-based price; a low-priced financing can produce even more shares than the cap-implied estimate.

**4. The SAFE becomes stock.** The holder usually receives a separate "shadow" sub-series of preferred stock that tracks the new round but carries economics—liquidation preference, conversion price—based on the SAFE's own purchase amount and conversion price.

## What are the key SAFE formulas?

**Cap-implied ownership (post-money cap SAFE):**

`Target ownership = purchase amount / post-money valuation cap`

For multiple post-money cap SAFEs, when every cap price governs:

`Total SAFE ownership = sum(purchase amount / post-money cap)`

YC's worked example uses a $200,000 SAFE at a $4M cap (5%) plus an $800,000 SAFE at an $8M cap (10%), for **at least 15%** sold before the new money. "At least" matters: if the priced-round price is below a SAFE's cap-based price, that SAFE receives more shares.

**Company capitalization and Safe Price** (simplified case, only post-money cap SAFEs over a known pre-SAFE base):

`Company capitalization = pre-SAFE fully diluted shares / (1 - total target SAFE ownership)`

`Safe Price = post-money cap / company capitalization`

`Cap-based conversion shares = purchase amount / Safe Price`

The signed agreement's capitalization definition controls. In YC's form, Company Capitalization includes issued stock, converting securities, and outstanding, promised, and unissued option-pool shares, while generally *excluding* the option-pool increase adopted with the converting financing.

**Discount conversion** (a 20% discount is drafted as an 80% Discount Rate):

`Discount price = new-round price x 80%` → `Discount shares = purchase amount / discount price`

If an instrument has both a cap and a discount, calculate both and use the lower price (more shares), subject to the signed form.

**Dilution from the converting round** (ignoring pool increase and pro rata):

`New-round investor ownership = new money / (pre-money valuation + new money)`

`SAFE ownership after round = SAFE ownership before new money x (1 - new-round investor ownership)`

## Worked example: a $750,000 post-money SAFE

Assume: founders and the existing pool hold **10,000,000** fully diluted shares before the SAFE; an investor buys a **$750,000** post-money SAFE at a **$12,000,000** cap with no discount; the next round raises **$4,000,000 at a $20,000,000 pre-money** valuation. The example ignores other convertibles, warrants, promised options, an option-pool increase, and pro rata—so treat the priced-round price below as a simplification.

| Step | Calculation | Result |
| --- | --- | ---: |
| 1. Ownership sold on the SAFE | $750,000 / $12,000,000 | 6.25% |
| 2. Company capitalization | 10,000,000 / (1 − 6.25%) | 10,666,667 |
| 3. Safe Price | $12,000,000 / 10,666,667 | $1.125 |
| — SAFE conversion shares | $750,000 / $1.125 | 666,667 |
| 4. Simplified round price | $20,000,000 / 10,666,667 | $1.875 |
| 5. New-money shares | $4,000,000 / $1.875 | 2,133,333 |

The Safe Price ($1.125) is below the round price ($1.875), so the cap-based calculation controls. Post-closing:

| Holder group | Shares | Ownership |
| --- | ---: | ---: |
| Existing holders | 10,000,000 | 78.125% |
| SAFE investor | 666,667 | 5.208% |
| New-money investors | 2,133,333 | 16.667% |
| **Total** | **12,800,000** | **100.000%** |

The SAFE investor held 6.25% before the new money but 5.208% after—as expected. A post-money SAFE is "post" the SAFE money, not post the new money in the priced round; YC's guide states post-money SAFEs are not diluted by *one another*, but they *are* diluted by the converting financing's new money. If this investor held a pro rata side letter and fully exercised it, it could buy 6.25% of the round—$250,000 of the $4M—to offset that dilution. (A pool increase or other securities would shift the final percentages, which is why the round price above is illustrative rather than exact.)

## How do SAFEs compare to convertible notes and priced rounds?

| Feature | Standard post-money SAFE | Convertible note | Priced equity round |
| --- | --- | --- | --- |
| Security at issuance | Right to future equity or event proceeds | Debt that may convert | Stock issued at closing |
| Interest | None | Usually accrues | None |
| Maturity date | None | Usually yes | Not applicable |
| Valuation today | No priced valuation; cap may limit conversion price | Usually deferred; may have cap/discount | Explicit pre- and post-money |
| Governance rights | Usually limited until conversion | Contract-dependent | Negotiated stockholder, information, veto, board rights |
| Closing process | Often separate closes | Often separate closes | Usually one coordinated closing |

A priced round may be preferable when a lead investor wants a board seat, protective provisions, detailed information rights, or a large, coordinated ownership position. YC frames the choice the same way: once ownership uncertainty is reduced, the remaining question is whether the rights that come with a priced round matter for this financing.

## Key Facts

- **YC's standard deal is $500,000**: $125,000 on a post-money SAFE for a fixed **7%**, plus $375,000 on an uncapped MFN SAFE (which, at an example $15M cap next round, converts to ~2.5%). [Y Combinator, The Standard Deal](https://www.ycombinator.com/deal)
- **Convertible notes fell to a record-low ~7% of pre-seed rounds** on Carta in Q1 2026; SAFEs are now the default early instrument. [Carta, State of Pre-Seed: Q1 2026](https://carta.com/data/state-of-pre-seed-q1-2026/)
- **YC's worked example sells at least 15% before the new money**: a $200,000 SAFE at a $4M cap (5%) plus an $800,000 SAFE at an $8M cap (10%). [Y Combinator, Post-Money Safe User Guide](https://www.ycombinator.com/documents)
- **A SAFE is not an equity stake at issuance** and may never convert if no triggering event occurs, the SEC warns—leaving the holder with nothing. [SEC, Investor Bulletin on SAFEs](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-52)

## What are the most common SAFE mistakes?

- **Calling the SAFE debt.** The nickname "note" invites treating it like a loan. The standard SAFE has no repayment schedule, interest, or maturity, and it ranks behind debt in a liquidity or dissolution event.
- **Calling the cap a valuation.** A $12M cap is not a determination that the company is worth $12M today. It sets a maximum valuation input for one conversion calculation; the priced round may be above or below it.
- **Grossing up a post-money cap.** For the shortcut, $750,000 at a $12M *post-money* cap is 6.25% (`750,000 / 12,000,000`). Do not add the investment to the denominator—that treats a post-money number as pre-money.
- **Treating cap-implied ownership as final ownership.** The SAFE is still diluted by the priced round's new money and normally by its option-pool increase; pro rata offsets this only if the right exists and the investor adds cash.
- **Modeling only the latest SAFE.** Ten small closings can sell more of the company than one large one. Keep a running total—`sum(purchase amount / post-money cap)`—then run the full conversion model.

## When does the SAFE framework break down?

- **The company never reaches a trigger.** A profitable company might never raise a priced round, sell, or go public. With no maturity date, the SAFE can sit outstanding indefinitely—an overhang for the company and an illiquid, non-voting claim for the investor.
- **The priced round is at or below the cap.** The purchase-amount-over-cap shortcut is a *minimum* in the ordinary up-round case. If the new share price is below the Safe Price, the SAFE converts at the round price and gets more shares than the cap-implied percentage.
- **Instruments have different definitions.** Mixing pre-money and post-money SAFEs, discounts, MFNs, notes, and warrants creates recursive calculations; a one-line ownership formula is no longer adequate. YC warns specifically against mixing pre- and post-money SAFEs, and against mixing notes with post-money SAFEs.
- **The next round changes the option pool.** Whether the pool increase sits in the pre-money denominator decides who bears that dilution. The post-money SAFE improves visibility into the SAFE round but does not remove the next round's pool negotiation.
- **A SAFE issuance is treated as "just paperwork."** A SAFE is a security. Every offer and sale must be registered or qualify for an exemption, with possible federal and state filings; the correct pathway depends on who is solicited, investor status, amount, and jurisdiction.

## Frequently asked questions

**Q:** Is a "SAFE note" the same as a convertible note?

**A:** No. Despite the nickname, a standard SAFE is not debt—no interest, no maturity, and it ranks behind creditors. A [convertible note](/fundraising/convertible-notes) is a loan that converts, usually with interest and a maturity date. Use the correct characterization for the actual instrument, not its nickname.

**Q:** Does a $750,000 SAFE at a $12M post-money cap mean the investor ends up with 6.25%?

**A:** Only *before* the new money in the converting round, and only if the cap price controls. The priced round dilutes the SAFE—in the worked example, 6.25% becomes ~5.2% after a $4M round. A pool increase dilutes it further.

**Q:** Is the valuation cap the company's valuation?

**A:** No. The cap is a ceiling on the conversion price for one calculation, not a present-day valuation. The priced round can price above or below the cap.

**Q:** What happens if the company never raises a priced round?

**A:** The SAFE may never convert. With no maturity date, it can stay outstanding indefinitely. On a low-value sale or dissolution, holders sit behind creditors and debt and may recover only part—or none—of the purchase amount.

**Q:** Can a SAFE investor avoid dilution from the next round?

**A:** Only with a pro rata (participation) right, and only by investing more cash in that round. Absent that, the SAFE is diluted by new money and the option-pool increase like other pre-round holders.

**Q:** Should we use a SAFE or a priced round?

**A:** A SAFE is faster and cheaper when you're closing checks and don't yet need negotiated governance. A priced round fits when a lead wants a board seat, protective provisions, detailed information rights, or a large coordinated stake—even though it costs more to document.

## Sources

1. Y Combinator, [Safe Financing Documents](https://www.ycombinator.com/documents). Current U.S. post-money SAFE forms, international forms, pro rata side letter, and overview.
2. Y Combinator, [Post-Money Safe User Guide, v1.1](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf). Definitions, conversion mechanics, capitalization, worked examples, event priority, MFN, pro rata, and board approval.
3. Y Combinator, [The Standard Deal](https://www.ycombinator.com/deal). $500K structure ($125K post-money SAFE for 7% + $375K uncapped MFN SAFE) and conversion order.
4. U.S. Securities and Exchange Commission, [Small Business Glossary](https://www.sec.gov/resources-small-businesses/glossary). Current regulatory definition of a SAFE.
5. U.S. Securities and Exchange Commission, [Investor Bulletin: Be Cautious of SAFEs in Crowdfunding](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-52). Trigger risk, not-equity-at-issuance, illiquidity, and instrument-variation warnings.
6. U.S. Securities and Exchange Commission, [Private Companies and the SEC](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/private-companies-sec), [Exempt Offerings](https://www.sec.gov/resources-small-businesses/exempt-offerings), and [Early-Stage Investors](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/early-stage-investors). Securities offerings, exemptions, and early-stage context.
7. Carta, [State of Pre-Seed: Q1 2026](https://carta.com/data/state-of-pre-seed-q1-2026/). Instrument mix showing SAFEs as the default early instrument.

> **Educational note:** This page explains financing mechanics for founders. It is not legal, tax, accounting, or investment advice. Use qualified counsel and financial advisers for an actual offering and cap table.

<!--
FORWARD LINKS — target pages do not exist yet (create then link):
/fundraising/convertible-notes, /fundraising/startup-valuation-methods,
/fundraising/dilution-cap-tables, /fundraising/term-sheets,
/fundraising/liquidation-preferences
Existing internal links used and live: /wiki/fundraising (how-startup-funding-works),
/fundraising/pre-seed-seed-series-a
-->
