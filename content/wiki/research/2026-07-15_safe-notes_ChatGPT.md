# Editorial handoff

**Scheduled concept:** SAFE Notes  
**Calendar date:** 2026-07-15  
**Priority / phase:** 4 / P1  
**Proposed page title:** SAFE Notes: How Startup SAFEs Work and Dilute Founders  
**Recommended URL:** `/wiki/fundraising/safe-notes`  
**Primary keyword:** SAFE notes  
**Search intent:** Practical informational. The reader wants to understand what a SAFE is, how valuation caps and discounts affect conversion, how much ownership a founder is selling, how a SAFE differs from a convertible note, and what to model before signing or presenting a SAFE round to investors.  
**Secondary keywords:** what is a SAFE note, simple agreement for future equity, post-money SAFE, SAFE valuation cap, SAFE conversion, SAFE dilution, SAFE vs convertible note

**Suggested meta title:** SAFE Notes: Conversion and Dilution Explained

**Suggested meta description:** Learn how startup SAFEs work, calculate cap-based ownership and conversion, model founder dilution, compare terms, and avoid common fundraising mistakes.

---

# Complete wiki draft

---
title: "SAFE Notes: How Startup SAFEs Work and Dilute Founders"
metaTitle: "SAFE Notes: Conversion and Dilution Explained"
oneLiner: "A SAFE gives an investor a contractual right to future equity when a defined event occurs; the cap, discount, capitalization definition, and later financing terms determine the shares issued."
prereqs: ["How Startup Funding Works", "Pre-Seed, Seed, and Series A"]
tags: ["SAFE", "SAFE notes", "fundraising", "valuation cap", "dilution", "cap table", "seed financing"]
readingTime: 17
lastUpdated: "2026-07-15"
owner: "Dr. Sarah Zou"
---

## Snapshot (TL;DR)

**What it is:** A SAFE—a *simple agreement for future equity*—is a security under which an investor pays a company now for a contractual right to receive equity, cash, or other proceeds when specified events occur. Until conversion, the investor generally does not own stock merely because it holds the SAFE. The SEC describes a SAFE as a promise of a future ownership interest if a trigger such as an equity financing or acquisition occurs. ([SEC, Small Business Glossary](https://www.sec.gov/resources-small-businesses/glossary))

**Important naming correction:** “SAFE note” is common search language, but the standard Y Combinator SAFE is not a promissory note. It has no interest rate or maturity date and is not debt. A convertible note, by contrast, is a debt obligation that usually carries interest and a maturity date. ([Y Combinator, Safe Financing Documents](https://www.ycombinator.com/documents); [SEC, Investor Bulletin on SAFEs](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-52))

**Why it matters:** A SAFE can make an early financing faster and less expensive to document than a priced equity round, and investors can close separately as they become ready. The economic simplicity can be misleading, however: every SAFE sells a claim on future ownership, multiple SAFEs accumulate, and the conversion result depends on definitions in the signed agreement and the terms of the later round.

**Core post-money cap estimate:**

`Cap-implied SAFE ownership = purchase amount / post-money valuation cap`

A $750,000 post-money SAFE with a $12 million cap implies 6.25% ownership immediately before the new money in the converting priced round, assuming the cap price controls. That percentage is then diluted by the priced round's new shares and usually by any option-pool increase negotiated with that round.

**Founder rule:** Model the entire stack of SAFEs, notes, warrants, promised equity, side letters, the existing option pool, the next round, and the next pool increase. Never evaluate one SAFE in isolation.

This page explains the standard U.S. post-money SAFE framework published by Y Combinator. Executed documents, company jurisdiction, securities-law exemption, tax treatment, and accounting facts can change the outcome. Use qualified legal, tax, and accounting advisers for an actual financing.

## Definition: what a SAFE is—and is not

A SAFE separates the date on which cash enters the company from the date on which the investor receives shares. The investor pays a **purchase amount** when the SAFE is issued. The agreement then specifies what happens in three broad situations:

1. **Equity financing:** The SAFE normally converts automatically into preferred stock. Under YC's post-money form, there is no minimum financing threshold required to trigger conversion.
2. **Liquidity event:** If the company is acquired, merges, or goes public before conversion, the investor generally receives the greater of its purchase amount or the value of an as-converted claim, subject to the agreement's priority and proceeds provisions.
3. **Dissolution event:** If the company shuts down, the holder is entitled to its purchase amount if funds remain after creditors and debt are paid.

Under the standard YC post-money form, the SAFE is junior to creditors and outstanding debt, on the same level as other SAFEs and standard non-participating preferred stock, and senior to common stock for the applicable liquidation payment. It terminates after the holder receives stock, cash, or other proceeds under the first relevant trigger. A SAFE can otherwise remain outstanding for a long time because it has no maturity date. ([Y Combinator, Post-Money Safe User Guide](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf))

Before conversion, a SAFE is not the same as common stock. The holder does not automatically have the voting, information, dividend, or governance rights of a stockholder. Those rights depend on the SAFE, any side letter, and the shares issued when it converts. The SEC therefore cautions investors to read the actual instrument: trigger and conversion provisions vary, and a SAFE may never convert if no specified event occurs. ([SEC, Investor Bulletin on SAFEs](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-52))

## Why SAFEs matter to founders

### They let a company close a round one investor at a time

In a priced round, investors often sign and fund around one coordinated closing. A SAFE supports “high-resolution fundraising”: the company can sign and receive funds from each investor when that investor is ready. This can shorten the time between an investor's decision and cash reaching the company's bank account. YC identifies separate closings and a flexible one-document security as two of the SAFE's main operating advantages. ([Y Combinator, Safe Financing Documents](https://www.ycombinator.com/documents))

### They defer the share-price calculation, not the economics

A SAFE usually postpones the exact share count until a financing or other trigger supplies the missing inputs. It does not postpone dilution in an economic sense. A post-money cap already lets the founder estimate the minimum stake sold when the cap price governs.

This distinction matters in a pitch deck and fundraising plan. “We have not set a priced-round valuation” can be true while “we have not sold any ownership yet” is economically false. A valuation cap is not a present valuation, but it determines a ceiling on the conversion price and therefore creates a minimum ownership claim in the usual up-round case.

### They turn fundraising amount and runway into a dilution decision

Suppose two operating plans both reach the same milestone:

- Plan A raises $750,000 at a $12 million post-money cap: 6.25% cap-implied SAFE ownership.
- Plan B raises $1.5 million at the same cap: 12.5% cap-implied SAFE ownership.

The second plan may be correct if the extra runway materially increases the probability or valuation of the next round. But the trade-off should be explicit. The fundraising ask, hiring plan, burn, milestone, and dilution budget belong in one model.

### They affect later hiring and financing capacity

The SAFE stack becomes part of the fully diluted cap table. It changes how much ownership founders, employees, and new investors have after conversion. It may also affect the size and burden of the next option-pool increase. A seed round that looks inexpensive in legal fees can still be expensive in equity if the company keeps taking small checks without tracking aggregate dilution.

## The mechanism: from cash today to shares later

### 1. The company selects a form and economic term

YC currently publishes three U.S. post-money versions:

| Form | Main economic protection | What determines conversion |
| --- | --- | --- |
| **Valuation cap, no discount** | Maximum post-money valuation used for the cap-price calculation | Investor receives the result of the cap-price or priced-round-price calculation that produces more shares |
| **Discount, no cap** | Percentage reduction from the new investors' price | Discounted price in the equity financing |
| **Uncapped MFN** | Right to adopt a later SAFE's more favorable terms, subject to the MFN provision | Same price as the new round if the MFN was not previously exercised; otherwise the adopted later SAFE terms |

The YC user guide also explains a cap-plus-discount variation. When both apply, the cap price and discount price are compared and the calculation most favorable to the investor governs. ([Y Combinator, Safe Financing Documents](https://www.ycombinator.com/documents); [Y Combinator, Post-Money Safe User Guide](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf))

### 2. The investor funds the purchase amount

The investor wires cash and receives the executed SAFE. No shares are necessarily issued at that moment. The company should record the instrument, holder, purchase amount, date, cap or discount, MFN terms, side letters, and board approval in a central cap-table record.

### 3. A trigger fixes the settlement mechanics

In an equity financing, the company calculates the shares issued under each SAFE. A cap-only post-money SAFE compares:

- shares based on the **Safe Price**, and
- shares based on the price paid by the new preferred-stock investors.

The holder receives the result that produces more shares under the standard form. A cap therefore protects the investor from converting at a price above the cap-based price, while a low-priced financing can produce even more shares than the cap-implied estimate.

### 4. The SAFE becomes stock or settles under the event terms

When the SAFE converts in an equity financing, the holder usually receives a separate “shadow” or sub-series of preferred stock. It generally tracks the new round's preferred stock but has economics such as liquidation preference and conversion price based on the SAFE's own purchase amount and conversion price. The executed financing documents and charter implement the resulting rights.

## The key formulas

### 1. Cap-implied ownership for a post-money SAFE

For a post-money valuation-cap SAFE:

`Target ownership_i = purchase amount_i / post-money valuation cap_i`

For multiple post-money cap SAFEs, when every cap price governs:

`Total SAFE ownership = sum(purchase amount_i / post-money valuation cap_i)`

`Existing-holder ownership after SAFE conversion, before new round money = 1 - total SAFE ownership`

YC's worked example uses a $200,000 SAFE at a $4 million post-money cap (5%) plus an $800,000 SAFE at an $8 million cap (10%), for at least 15% sold before the new money in the priced round. “At least” matters: if the priced round share price is below a SAFE's cap-based price, that SAFE may receive more shares. ([Y Combinator, Post-Money Safe User Guide](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf))

### 2. Company capitalization and Safe Price

In a simplified case with only post-money cap SAFEs and a known fully diluted pre-SAFE base:

`Company capitalization = pre-SAFE fully diluted shares / (1 - total target SAFE ownership)`

For each SAFE:

`Safe Price_i = post-money valuation cap_i / Company capitalization`

`Cap-based conversion shares_i = purchase amount_i / Safe Price_i`

The actual agreement's capitalization definition controls. In YC's form, Company Capitalization includes issued and outstanding stock, converting securities, outstanding and promised options, and the existing unissued option pool, while generally excluding the option-pool increase adopted with the converting equity financing. ([Y Combinator, Post-Money Safe User Guide](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf))

### 3. Discount conversion

If a SAFE gives a 20% discount, YC's drafting expresses this as an 80% **Discount Rate**:

`Discount price = new-round price per share x 80%`

`Discount-based shares = purchase amount / discount price`

If an instrument contains both a cap and a discount, calculate both prices and use the lower price—the one that issues more shares—subject to the signed form.

### 4. Dilution from the converting priced round

Ignoring an option-pool increase and pro rata participation:

`New-round investor ownership = new money / (negotiated pre-money valuation + new money)`

`SAFE ownership after round = SAFE ownership before new money x (1 - new-round investor ownership)`

This is why “a $750,000 SAFE at a $12 million post-money cap equals 6.25%” is incomplete. The 6.25% is measured before the new money in the priced round. The round then dilutes the SAFE along with other pre-round holders.

## Worked example: a $750,000 post-money SAFE

Assume:

- The founders and existing employee pool collectively hold **10,000,000 fully diluted shares** before the SAFE.
- An investor purchases a **$750,000 post-money SAFE** with a **$12,000,000 valuation cap** and no discount.
- The next priced round raises **$4,000,000 at a $20,000,000 pre-money valuation**.
- The example ignores other convertibles, warrants, promised options, transaction costs, an option-pool increase, and pro rata participation.

### Step 1: Estimate the ownership sold on the SAFE

`$750,000 / $12,000,000 = 6.25%`

Immediately before the new money in the priced round, the SAFE investor is expected to own 6.25% if the cap price controls. Existing holders collectively retain 93.75%.

### Step 2: Calculate Company Capitalization

`10,000,000 / (1 - 6.25%) = 10,666,667 shares`

The SAFE therefore needs approximately:

`10,666,667 x 6.25% = 666,667 shares`

### Step 3: Calculate the Safe Price

`$12,000,000 / 10,666,667 = $1.125 per share`

Check:

`$750,000 / $1.125 = 666,667 SAFE conversion shares`

### Step 4: Compare with the priced-round price

The simplified Series A price is:

`$20,000,000 / 10,666,667 = $1.875 per share`

The Safe Price of $1.125 is lower, so the cap-based calculation gives the SAFE holder more shares and controls.

### Step 5: Issue the new-money shares

`$4,000,000 / $1.875 = 2,133,333 new Series A shares`

Post-closing fully diluted shares in this simplified example:

`10,000,000 + 666,667 + 2,133,333 = 12,800,000`

| Holder group | Shares | Post-closing ownership |
| --- | ---: | ---: |
| Existing holders | 10,000,000 | 78.125% |
| SAFE investor | 666,667 | 5.208% |
| New-money investors | 2,133,333 | 16.667% |
| **Total** | **12,800,000** | **100.000%** |

The SAFE investor had 6.25% immediately before the new money but 5.208% after the round. That is expected: post-money SAFEs are “post” the SAFE money, not post the new money in the priced round. YC's guide explicitly says post-money SAFEs are not diluted by one another when modeled under their caps, but are diluted by the converting financing's new money. ([Y Combinator, Post-Money Safe User Guide](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf))

If this investor had a pro rata side letter and exercised it fully in this simplified round, it could buy 6.25% of the new round—$250,000 of the $4 million—to offset dilution from the new-money issuance. A pool increase or other securities could still change the final percentage.

## How founders, operators, and investors use SAFEs in practice

### Founders: price runway in ownership, not just dollars

Before opening the round, build scenarios for:

- minimum cash needed to reach the next financeable milestone;
- base and downside burn;
- post-money caps under discussion;
- discount, MFN, and pro rata rights;
- aggregate ownership sold across all planned closes;
- option grants promised but not issued;
- the next round's raise, pre-money valuation, and target option pool; and
- a low-valuation or no-next-round case.

The cap should be a product of the cash-versus-ownership negotiation, not a decorative number copied from another startup. YC's explanation of the post-money SAFE makes the same point: investors can negotiate “X% for $Y,” with the cap reflecting that ownership bargain. ([Y Combinator, Post-Money Safe User Guide](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf))

### Operators: connect the financing to milestones

The operating plan should show what the SAFE capital buys: months of runway, hires, product releases, regulatory work, customer evidence, revenue, or gross-margin improvement. A financing instrument is useful only if the milestone it funds improves the company's options.

For example, a founder choosing between $750,000 and $1.25 million at the same cap should compare:

`incremental dilution` against `incremental probability and quality of the next financing or path to cash flow`

This is not a precise expected-value calculation, but it forces a better question than “How much will investors give us?”

### Investors: estimate ownership and downside treatment

Investors model the cap-implied ownership, likely conversion round, option-pool treatment, other convertibles, and the right to maintain ownership. They also examine the liquidity and dissolution provisions because a SAFE is illiquid and can remain outstanding indefinitely.

The SEC notes that early-stage and VC investments often have long holding periods and depend on a later liquidity event. It also emphasizes clear risk disclosure, especially when founders raise from friends and family. ([SEC, Early-Stage Investors](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/early-stage-investors))

### In the pitch deck and data room

In a pitch deck, state the amount being raised, the milestone it funds, and the intended instrument. Avoid presenting the SAFE cap as if it were a priced-round post-money valuation.

In the data room, maintain:

- every executed SAFE and amendment;
- side letters and pro rata agreements;
- board consents;
- a security ledger or cap-table export;
- the capitalization model before and after conversion;
- investor wiring and signature records; and
- securities-law filings and state notices advised by counsel.

YC's guide states that the board should formally approve SAFE issuances before the company issues them. It also warns that undisclosed edits to a standard template force parties to compare documents line by line, which is why the standard form includes a representation about modifications. ([Y Combinator, Post-Money Safe User Guide](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf))

## SAFE vs. convertible note vs. priced round

| Feature | Standard post-money SAFE | Convertible note | Priced equity round |
| --- | --- | --- | --- |
| Security at issuance | Contractual right to future equity or event proceeds | Debt that may convert | Stock issued at closing |
| Interest | None in the standard YC form | Usually accrues | None |
| Maturity date | None in the standard YC form | Usually yes | Not applicable |
| Valuation today | No priced-round valuation; cap may limit conversion price | Usually deferred; may have cap/discount | Explicit pre- and post-money valuation |
| Governance rights | Usually limited until conversion; side letters may add rights | Contract-dependent | Negotiated stockholder, information, veto, and sometimes board rights |
| Closing process | Often separate investor closes | Often separate investor closes | Usually coordinated closing with a larger document set |
| Founder modeling burden | Low only if all instruments are consistent and tracked | Interest, maturity, priority, and conversion add complexity | More negotiation upfront; ownership is explicit at closing |

A priced round may be preferable when a lead investor wants a board seat, protective provisions, detailed information rights, or a large, coordinated ownership position. YC frames the choice similarly: after ownership uncertainty is reduced, the remaining question is whether rights commonly attached to a priced round are important for the financing. ([Y Combinator, Post-Money Safe User Guide](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf))

## Common mistakes and misinterpretations

### Calling the SAFE debt

“SAFE note” encourages founders to treat the instrument like a loan. The standard SAFE has no repayment schedule, interest, or maturity. It also ranks behind debt in a liquidity or dissolution event. Use the correct legal and accounting characterization for the actual instrument, not its nickname.

### Calling the cap the company's valuation

A $12 million cap does not mean the board, investor, or market has established that the company is worth exactly $12 million today. It sets a maximum valuation input for one conversion calculation. The priced round may be above or below it.

### Adding the purchase amount to a post-money cap

For the ownership shortcut, a $750,000 investment at a $12 million **post-money** cap is 6.25%: `$750,000 / $12,000,000`. Do not turn the denominator into $12.75 million. That would treat a stated post-money number as pre-money.

### Treating cap-implied ownership as the final post-round ownership

The SAFE is diluted by the priced round's new money and normally by its option-pool increase. Pro rata rights can offset some dilution only if they exist and the investor contributes more cash.

### Modeling only the latest SAFE

Ten small closings can sell more of the company than one large closing. Keep a cumulative dilution meter:

`sum(purchase amount_i / post-money cap_i)`

for comparable cap-only post-money SAFEs, then run the full conversion model.

### Mixing pre-money SAFEs, post-money SAFEs, and notes in a shortcut

The simple percentages no longer stack cleanly when capitalization definitions differ, notes accrue interest, discounts vary, or some instruments convert at the round price. YC warns that mixing pre- and post-money SAFEs creates cap-table uncertainty and requires careful conversion calculations. It also generally discourages mixing notes and post-money SAFEs because they are treated differently in liquidity, dissolution, and option-pool calculations. ([Y Combinator, Post-Money Safe User Guide](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf))

### Ignoring promised options and the unissued pool

The share-count denominator is not always just issued common stock. Under the standard form, outstanding options, promised options, the existing unissued pool, and other converting securities can enter the calculation. A cap-table model that omits them can materially misstate the conversion.

### Treating every MFN as a free option on individual terms

Under YC's uncapped MFN form, the investor generally adopts the later SAFE as a package rather than cherry-picking only its best clause, and exercising the MFN typically consumes the provision. Read the actual amendment language.

### Assuming a SAFE issuance is legally “just paperwork”

A SAFE is a security. U.S. federal law requires every offer and sale of securities—even one sale by a private company—to be registered or qualify for an exemption, with possible federal and state filings and restrictions. The correct pathway depends on who is solicited, how the offering is marketed, investor status, amount, and jurisdiction. ([SEC, Private Companies and the SEC](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/private-companies-sec); [SEC, Exempt Offerings](https://www.sec.gov/resources-small-businesses/exempt-offerings))

### Using the U.S. template for the wrong entity or jurisdiction

YC publishes separate forms for Canada, the Cayman Islands, and Singapore and tells users to consult counsel licensed where the company was formed. Local corporate, securities, tax, and accounting rules can change the analysis. ([Y Combinator, Safe Financing Documents](https://www.ycombinator.com/documents))

## When this breaks

### The company never reaches a trigger

A profitable company might never raise a priced equity round, sell itself, or go public. A SAFE without a maturity date can remain outstanding indefinitely. That can create a permanent overhang for the company and an illiquid, non-voting claim for the investor.

### The priced round is below or near the cap

The purchase-amount-divided-by-cap shortcut is a minimum estimate in the ordinary up-round case. If the new preferred share price is lower than the Safe Price, the SAFE can convert at the new round price and receive more shares than the cap-implied percentage. Near the boundary, option-pool and capitalization definitions can decide which calculation wins.

### The company stacks instruments with different definitions

Pre-money SAFEs, post-money SAFEs, discounts, cap-plus-discount forms, MFNs, notes, warrants, side letters, and multiple option-pool promises can create recursive calculations. A one-line ownership formula is no longer adequate.

### The next round changes the option pool

New investors often negotiate a target post-closing pool. Whether the increase sits in the pre-money denominator determines who bears the dilution. The post-money SAFE improves visibility into the SAFE round, but it does not eliminate the next round's pool negotiation.

### A liquidity event has too little value

SAFE holders sit behind creditors and debt. In a low-value sale or dissolution, there may be insufficient proceeds to return all purchase amounts, and common holders may receive nothing. In a higher-value sale, the as-converted amount may exceed the cash-out amount. The event waterfall—not the cap shortcut—controls.

### The business needs negotiated governance now

A large institutional seed investor may require a board seat, veto rights, information rights, a closing condition package, or an explicit ownership structure. A priced round can be more appropriate even if it costs more and takes longer to document.

### Tax or accounting treatment is material

Legal intent, tax classification, and financial-statement accounting are not automatically identical. YC says it intended the SAFE to be an equity security but expressly directs users to a tax adviser when characterization matters. Companies subject to audits, lender covenants, cross-border rules, or acquisition diligence should resolve classification early. ([Y Combinator, Post-Money Safe User Guide](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf))

### The template has been modified

The simplicity benefit depends on a known form. Changes to event definitions, priority, conversion, transfer, amendment, or side-letter terms can materially alter economics. Redline every non-standard document against the referenced form.

## Founder checklist

Before issuing a SAFE:

- Confirm the legal entity and jurisdiction match the form.
- Choose the applicable securities-law exemption with counsel before soliciting or selling.
- Calculate purchase amount divided by post-money cap for every planned close.
- Set a maximum aggregate dilution budget for the SAFE round.
- Model a base, low, and high priced-round valuation.
- Include outstanding SAFEs, notes, warrants, options, promised grants, and the unissued pool.
- Model the next round's new money and option-pool increase.
- Record discounts, MFNs, pro rata rights, and all side letters.
- Obtain the required board approval before issuance.
- Keep executed documents and the cap table synchronized.
- Explain what milestone the cash funds and why that milestone should improve the next financing outcome.
- Review legal, tax, and accounting treatment with qualified advisers.

Before signing as an investor:

- Read the trigger, conversion, liquidity, dissolution, priority, transfer, and amendment provisions.
- Verify whether the form is cap-only, discount-only, MFN, or modified.
- Reconstruct Company Capitalization from the cap table.
- Model the full stack, not only your instrument.
- Test a no-next-round case and a low-value exit.
- Confirm whether pro rata rights exist and whether exercising them is financially realistic.

## Related concepts and internal-link suggestions

- [How Startup Funding Works](/wiki/fundraising) — place SAFEs within the broader funding-stage and instrument map.
- [Pre-Seed, Seed, and Series A](/wiki/fundraising/pre-seed-seed-series-a) — explain when SAFEs are commonly used and what milestone the next round expects.
- [Convertible Notes](/wiki/fundraising/convertible-notes) — compare debt, interest, maturity, priority, discount, and cap mechanics.
- [Startup Valuation Methods](/wiki/fundraising/startup-valuation-methods) — distinguish a negotiated SAFE cap from a priced-round valuation.
- [Dilution and Cap Tables](/wiki/fundraising/dilution-cap-tables) — expand the ownership math across SAFEs, pools, and priced rounds.
- [Term Sheets](/wiki/fundraising/term-sheets) — show how a priced-round term sheet supplies the inputs that convert outstanding SAFEs.
- [Liquidation Preferences](/wiki/fundraising/liquidation-preferences) — explain the payout stack and why SAFE cash-out treatment is not the same as common-stock ownership.

## Sources

1. Y Combinator. [Safe Financing Documents](https://www.ycombinator.com/documents). Current U.S. post-money SAFE forms, international forms, pro rata side letter, and overview.
2. Y Combinator. [Post-Money Safe User Guide, version 1.1](https://www.ycombinator.com/assets/ycdc/Primer%20for%20post-money%20safe%20v1.1-2af8129e12effd9638eeab383b7309142c8f415e5cdb0bc210d573f779177a1c.pdf). Definitions, conversion mechanics, capitalization, worked examples, event priority, MFN, pro rata, board approval, and limitations.
3. Y Combinator. [New Standard Deal](https://www.ycombinator.com/blog/new-standard-deal). Concise explanation of post-money SAFE ownership and dilution math.
4. U.S. Securities and Exchange Commission. [Small Business Glossary: Simple Agreement for Future Equity](https://www.sec.gov/resources-small-businesses/glossary). Current regulatory definition.
5. U.S. Securities and Exchange Commission, Office of Investor Education and Advocacy. [Investor Bulletin: Be Cautious of SAFEs in Crowdfunding](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-52). Trigger, non-equity-at-issuance, illiquidity, and instrument-variation risks.
6. U.S. Securities and Exchange Commission. [Private Companies and the SEC](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/private-companies-sec), [Exempt Offerings](https://www.sec.gov/resources-small-businesses/exempt-offerings), and [Early-Stage Investors](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/early-stage-investors). Current primary guidance on securities offerings, exemptions, and early-stage investor context.

---

# Recommended internal links for implementation

1. `/wiki/fundraising` — anchor: **how startup funding works**
2. `/wiki/fundraising/pre-seed-seed-series-a` — anchor: **pre-seed and seed rounds**
3. `/wiki/fundraising/convertible-notes` — anchor: **SAFE vs. convertible note**
4. `/wiki/fundraising/startup-valuation-methods` — anchor: **valuation cap vs. company valuation**
5. `/wiki/fundraising/dilution-cap-tables` — anchor: **model SAFE dilution on a cap table**
6. `/wiki/fundraising/term-sheets` — anchor: **priced-round term sheet**
7. `/wiki/fundraising/liquidation-preferences` — anchor: **liquidation priority and payout waterfall**
