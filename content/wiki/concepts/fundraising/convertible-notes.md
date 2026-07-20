---
title: "Convertible Notes: Conversion, Interest, and Founder Dilution"
metaTitle: "Convertible Notes: Conversion and Dilution"
metaDescription: "Learn how startup convertible notes accrue interest, convert through caps or discounts, affect dilution, and create maturity risk before a priced round."
oneLiner: "A convertible note is startup debt that usually converts into equity at a later financing; principal, accrued interest, the cap or discount, and the capitalization definition determine the shares issued."
prereqs: ["How Startup Funding Works", "Pre-Seed, Seed, and Series A", "SAFE Notes"]
tags: ["convertible note", "convertible debt", "fundraising", "valuation cap", "discount", "interest", "dilution", "cap table"]
readingTime: 14
lastUpdated: "2026-07-20"
owner: "Dr. Sarah Zou"
canonical: "https://sarahzou.com/wiki/fundraising/convertible-notes"
---

## Snapshot (TL;DR)

**What it is:** A convertible note is a loan from an investor to a company that can convert into another security, usually preferred stock in the company's next priced equity financing. The SEC classifies a convertible note as both a security and a loan: it starts as debt and converts when the next round or another agreed condition occurs.

**Why founders use it:** A note can close faster than a priced round because the company does not have to negotiate a full preferred-stock financing immediately. But the speed comes from deferring the share price, not from eliminating financing cost.

**The essential difference from a [SAFE](/wiki/fundraising/safe-notes):** A classic convertible note is debt. It has principal, accrues interest, has a maturity date, and may become repayable. A standard SAFE has none of those features. Y Combinator introduced the SAFE specifically to keep future-equity conversion while removing them.

**Core conversion logic:**

`Conversion amount = principal + accrued interest that converts`

`Discount price = priced-round share price x (1 - discount rate)`

`Cap price = valuation cap / company capitalization`

`Conversion price = the lowest applicable price under the signed note`

`Conversion shares = conversion amount / conversion price`

**Founder rule:** Model the note as two obligations at once — a debt claim that can mature, default, or consume exit proceeds, and a variable future-equity claim that dilutes founders, employees, and the next round.

## What is a convertible note?

A convertible note is a promissory note with an equity-conversion feature. The investor wires cash; in return the company owes the **principal**, **interest** under the stated rate and accrual convention, performance of the note's covenants, and repayment or another settlement if the note does not convert first.

The note also defines events that replace the debt claim with stock. The most common is a **qualified financing**: a later preferred-stock round raising at least a specified amount of new money. On that closing, the outstanding conversion amount typically converts automatically at a price more favorable than the one new investors pay. That favorable price comes from one or both of a **discount** (say, 20% below the new investors' per-share price) and a **valuation cap** (a ceiling on the valuation input used to compute the note's conversion price).

**A note is not stock when issued.** Before conversion the holder is a creditor, not a stockholder. Voting, board, information, and pro rata rights exist only if the documents grant them. In a weak outcome this matters: debt generally ranks ahead of equity, so repayment obligations can consume proceeds before common stock receives anything.

**A note is still a security.** Calling the instrument a loan does not remove securities-law obligations. Every offer and sale must be registered or qualify for an exemption. Many U.S. startups rely on Regulation D, where Form D is generally due within 15 days after the first sale and becomes public on EDGAR.

## How does a note compare to a SAFE and a priced round?

| Feature | Convertible note | Standard post-money SAFE | Priced preferred round |
| --- | --- | --- | --- |
| Legal starting point | Debt security | Future-equity contract, not debt | Equity issued at closing |
| Interest | Usually accrues | None in the standard form | None |
| Maturity date | Yes | None in the standard form | Not applicable |
| Exact shares known at signing | Usually no | Usually no | Yes |
| Creditor claim before conversion | Yes, subject to subordination | No | No |
| Governance negotiated now | Usually limited | Usually limited | Board, voting, protective, information rights |
| Main founder risk | Repayment pressure plus uncertain dilution | Accumulated dilution and long-lived overhang | More cost and immediate governance trade-offs |

A note is not automatically "founder-friendlier" than a SAFE, and a SAFE is not automatically cheaper. Compare the whole package: amount raised, cap, discount, interest, time to conversion, priority, maturity remedy, exit treatment, side rights, and the expected next round.

## Why do convertible notes matter to founders?

**They connect runway to the next financing event.** A note is usually justified as a bridge to a milestone — a product launch, regulatory clearance, a revenue level, a margin improvement — that makes a priced round more attractive.

`Required note raise = cash needed to reach milestone + execution buffer - cash on hand`

Then test whether the milestone is likely well before maturity. A 24-month note funding 12 months of runway is not automatically safe; fundraising takes months, and a missed milestone leaves the company negotiating an extension while cash is scarce.

**Interest increases dilution even when no cash is paid.** Startup notes often accrue rather than pay interest. If accrued interest converts, it buys shares at the same favorable price.

`Accrued interest = principal x annual rate x time outstanding`

The note may use 365 days, 360 days, actual/actual, or compounding. Do not assume — a small per-note difference becomes material across a large stack or a delayed round.

**The maturity date is a real negotiating deadline.** If no qualified financing has occurred by maturity, the company may owe cash, the holder may have a conversion election, or the parties may extend. The document decides. Early-stage companies often cannot repay and seek an extension, but an extension is a negotiated outcome, not an automatic right.

**Debt can break an acquisition.** If the company is sold before conversion, the note may require repayment, a premium, or an as-converted payout. A small acquihire can fail economically if the price cannot satisfy outstanding debt.

## What terms should you read before signing?

| Term | What to check |
| --- | --- |
| **Principal** | Face amount funded, tracked per note and in aggregate. |
| **Interest** | Rate, simple or compounded, start date, day-count basis, cash-pay or accrue, and whether accrued interest converts. |
| **Maturity** | Not just the date — is repayment automatic or at the holder's option? Can the holder convert instead? Can a majority extend all notes? Does default interest begin? |
| **Qualified financing** | The new-money threshold that triggers conversion. Too low lets a small insider round force conversion; too high leaves notes outstanding during a legitimate round. |
| **Discount** | `Discount price = round price x (1 - discount)`. At a $2.00 round price and 20% discount, $1.60. |
| **Valuation cap** | `Cap price = valuation cap / company capitalization`. The hard term is *company capitalization* — it may include or exclude options, warrants, promised grants, the unissued pool, the new round's pool increase, and other notes or SAFEs. |
| **Conversion security** | Same preferred as new investors, a shadow series with modified economics, or common at maturity. The name does not reveal the rights. |
| **Change of control** | Principal plus interest, a cash multiple, the greater of repayment and an as-converted amount, or holder choice. |
| **Seniority** | Secured or unsecured, senior or junior to other notes, subordinated to bank or venture debt. |
| **Amendment** | Majority-action provisions avoid a holdout problem across many separate notes; certain fundamental terms usually still require individual consent. |

Interest also raises tax questions. The IRS publishes Applicable Federal Rates monthly; below-market loans and original issue discount can create imputed-interest consequences. Do not pick a zero or unusually low rate without tax advice.

## How does conversion actually work, step by step?

1. **Amount that converts.** `Conversion amount = principal + convertible accrued interest`. Adjust if interest is cash-paid or waived.
2. **Priced-round share price.** `Round price = pre-money valuation / priced-round capitalization`. The negotiated option-pool increase changes this denominator and therefore the price.
3. **Every applicable note price.** Compute the discount price and the cap price. The priced-round capitalization and the note capitalization may not be identical.
4. **Select the contractual price.** For a note with cap and discount in the alternative: `Conversion price = min(discount price, cap price)`.
5. **Issue shares.** `Conversion shares = conversion amount / conversion price`, run separately for every tranche. Do not average caps or discounts.
6. **Add round shares and pool.** `New investor shares = new cash / round price`, plus any pool top-up or warrants.

## Worked example: a $500,000 note converting in a seed round

| Input | Amount |
| --- | ---: |
| Note principal | $500,000 |
| Annual interest | 6% simple |
| Time outstanding | 18 months |
| Valuation cap | $8,000,000 |
| Conversion discount | 20% |
| Priced-round pre-money valuation | $12,000,000 |
| Shares in both simplified denominators | 6,000,000 |
| New cash in priced round | $3,000,000 |

| Step | Calculation | Result |
| --- | --- | ---: |
| Accrued interest | $500,000 x 6% x 1.5 | $45,000 |
| Conversion amount | $500,000 + $45,000 | $545,000 |
| Round price | $12,000,000 / 6,000,000 | $2.0000 |
| Discount price | $2.00 x (1 - 20%) | $1.6000 |
| Cap price | $8,000,000 / 6,000,000 | $1.3333 |
| Conversion price | min($1.60, $1.3333) | $1.3333 |
| Note shares | $545,000 / $1.3333 | 408,750 |
| New investor shares | $3,000,000 / $2.00 | 1,500,000 |

The $45,000 of interest alone buys 33,750 shares — **8.3% of the note's conversion shares**. That is not a rounding error.

| Holder group | Shares after closing | Ownership |
| --- | ---: | ---: |
| Existing holders | 6,000,000 | 75.87% |
| Converting note | 408,750 | 5.17% |
| New investors | 1,500,000 | 18.97% |
| **Total** | **7,908,750** | **100.00%** |

Immediately before the new money the note owns 6.38% (408,750 / 6,408,750); after it owns 5.17%. The priced round dilutes the noteholder too.

**Caveat on precision.** This example isolates a single note. Real closings involve multiple notes with different dates and caps, SAFEs, warrants, interest accrued to the exact closing date, an option-pool increase, promised grants, and legal definitions using different denominators. Each of those can move every percentage above. Treat the arithmetic as a teaching model, not a substitute for the closing spreadsheet built from the signed documents.

## When does the cap control, and when does the discount?

With 6 million denominator shares and an $8 million cap, the cap price is fixed at $1.3333. With a 20% discount, the two prices are equal when `round price x 80% = $1.3333`, i.e. a round price of $1.6667 — a $10 million pre-money valuation under the same 6 million-share denominator.

- **Above a $10M priced-round valuation:** the cap gives the lower price.
- **Below $10M:** the discount gives the lower price.
- **At $10M:** they are equal.

The cap is not always the controlling benefit, and a higher next round gives the noteholder more advantage relative to new investors.

## Key Facts

- **Convertible notes fell to a record-low 7% of pre-seed rounds** (and 8% of pre-seed dollars) on Carta in Q1 2026; SAFEs accounted for 93% of rounds. [Carta, State of Pre-Seed: Q1 2026](https://carta.com/data/state-of-pre-seed-q1-2026/)
- **Techstars' standard note carries a $3,000,000 valuation cap**, adjustable up to $5,000,000 for companies that already closed more than $250,000 at a higher cap, with a 2-year term, 5% simple annual interest, and a 20% discount. [Techstars, Investment Terms](https://www.techstars.com/newsroom/investment-terms-2024)
- **Cap and discount usually operate "in the alternative,"** not cumulatively: the conversion price is whichever mechanism produces the lower price. [Cooley GO, Primer on Convertible Debt](https://www.cooleygo.com/convertible-debt/)
- **A 20% discount yields 25% more shares, not 20%**, at the same dollars invested: `1 / 0.80 = 1.25`.
- **Form D is generally due within 15 days after the first sale** in a Regulation D offering, and the filing is public on EDGAR. [SEC, What Is Form D?](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/what-form-d)

## What are the most common convertible-note mistakes?

- **Calling the cap a valuation.** An $8M cap is a ceiling in a future conversion formula, not a board-approved statement that the company is worth $8M today.
- **Looking only at the coupon.** A 6% note is not cheap capital because 6% is below venture return expectations. The cap and discount determine the equity transferred; maturity and creditor priority determine downside leverage.
- **Assuming cap and discount stack.** They normally operate in the alternative — compute both prices and use the lower one — unless the document says otherwise.
- **Averaging tranches.** A $250K note at a $6M cap plus a $750K note at a $12M cap is not a $1M note at a $10.5M blended cap. Each converts on its own terms and date.
- **Assuming maturity will "just extend."** The company has no automatic right to one. Even friendly investors may want a lower cap, more interest, or a repayment premium in exchange.

## When does the convertible-note framework break down?

- **The qualified financing never happens.** The note reaches maturity as debt instead of converting in an orderly round, and the company needs repayment capacity, a contractual conversion route, or holder consent.
- **The next round is too small to trigger conversion.** New equity closes while old notes stay outstanding, creating a debt overhang new investors dislike. Revisit the threshold before launching the round.
- **The round is flat or down.** The discount may produce more shares than the cap, creating substantially more dilution than a cap-only mental shortcut suggests.
- **Too many incompatible instruments.** Multiple notes, pre- and post-money SAFEs, warrants, and conflicting capitalization definitions create recursive calculations. The financing stops being "simple" and legal fees rise.
- **The company approaches insolvency.** Directors cannot treat noteholder repayment and new fundraising as ordinary cap-table optimization once creditor interests are implicated. Get jurisdiction-specific advice early.

## Frequently asked questions

**Q:** Is the valuation cap the same as the company's valuation?

**A:** No. It is a ceiling on the valuation input used to calculate one conversion price. The priced round can price above or below the cap, and the cap is not a present-day appraisal.

**Q:** Does accrued interest always convert into shares?

**A:** Not always. Some notes convert principal only, some convert principal plus interest at the same price, and some pay interest in cash. Read the signed language before modeling.

**Q:** Should we use a note or a SAFE?

**A:** A SAFE avoids interest, maturity, and creditor priority, which is why it dominates pre-seed. A note may fit when the investor specifically wants a debt claim, or where local law or an investor's mandate makes debt easier to hold. Compare the total economic package, not the label.

**Q:** What happens to notes if we're acquired before a priced round?

**A:** Whatever the change-of-control clause says: repayment of principal plus interest, a cash multiple, the greater of repayment and an as-converted amount, or holder choice. Model this before signing — it determines whether a modest acquisition leaves anything for common stock.

**Q:** Is a friends-and-family note exempt from securities rules?

**A:** No. A convertible note is a security even when the investor is a relative. Round labels do not create regulatory exemptions, and general solicitation rules still apply to how you market it.

## Sources

1. U.S. Securities and Exchange Commission. [Small Business Glossary](https://www.sec.gov/resources-small-businesses/glossary). Regulatory definition of a convertible note as a loan, security, and future conversion instrument.
2. U.S. Securities and Exchange Commission. [Private Companies and the SEC](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/private-companies-sec), [Exempt Offerings](https://www.sec.gov/resources-small-businesses/exempt-offerings), [What Is Form D?](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/what-form-d), [General Solicitation](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/general-solicitation), and [Early-Stage Investors](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/early-stage-investors).
3. Cooley GO. [Primer on Convertible Debt](https://www.cooleygo.com/convertible-debt/), [Frequently Asked Questions: Convertible Debt](https://www.cooleygo.com/frequently-asked-questions-convertible-debt/), and [Series Seed Convertible Note Financing Package](https://www.cooleygo.com/documents/series-seed-notes-financing-package/).
4. Techstars. [Investment Terms](https://www.techstars.com/newsroom/investment-terms-2024). First-party accelerator note terms: cap, interest, maturity, discount, and change-of-control treatment.
5. Y Combinator. [Announcing the Safe, a Replacement for Convertible Notes](https://www.ycombinator.com/blog/announcing-the-safe-a-replacement-for-convertible-notes).
6. Carta. [State of Pre-Seed: Q1 2026](https://carta.com/data/state-of-pre-seed-q1-2026/). Instrument mix across pre-seed rounds and dollars.
7. Internal Revenue Service. [Applicable Federal Rates](https://www.irs.gov/applicable-federal-rates), [Publication 550](https://www.irs.gov/publications/p550), and [Publication 1212](https://www.irs.gov/publications/p1212).
8. Financial Accounting Standards Board. [Accounting Standards Update 2020-06](https://storage.fasb.org/ASU%202020-06.pdf).

> **Educational note:** This page explains financing mechanics for founders. It is not legal, tax, accounting, or investment advice. There is no universal convertible note — the executed documents, jurisdiction, securities exemption, and tax treatment control. Use qualified advisers for an actual transaction.

<!--
FORWARD LINKS — target pages do not exist yet (create then link):
/wiki/fundraising/bootstrapping-vs-vc
Links live at time of writing: /wiki/fundraising, /wiki/fundraising/pre-seed-seed-series-a,
/wiki/fundraising/safe-notes, /wiki/fundraising/startup-valuation-methods,
/wiki/fundraising/dilution-cap-tables, /wiki/fundraising/term-sheets,
/wiki/fundraising/liquidation-preferences (all published in this batch)
-->
