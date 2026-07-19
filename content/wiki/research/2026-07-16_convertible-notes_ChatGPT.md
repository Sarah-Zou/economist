# Editorial handoff

**Scheduled concept:** Convertible Notes  
**Calendar date:** 2026-07-16  
**Priority / phase:** 5 / P1  
**Proposed page title:** Convertible Notes: Conversion, Interest, and Founder Dilution  
**Recommended URL:** `/wiki/fundraising/convertible-notes`  
**Primary keyword:** convertible note  
**Search intent:** Practical informational. The reader wants to understand how a startup convertible note works, how interest, valuation caps, and discounts determine conversion, how notes affect founder dilution and a priced round, what happens at maturity or an exit, and when a SAFE or priced equity round may be a better instrument.  
**Secondary keywords:** convertible notes for startups, convertible debt, convertible note valuation cap, convertible note discount, convertible note conversion, convertible note maturity date, convertible note vs SAFE, convertible note dilution

**Suggested meta title:** Convertible Notes: Conversion and Dilution

**Suggested meta description:** Learn how startup convertible notes accrue interest, convert through caps or discounts, affect dilution, and create maturity risk before a priced round.

---

# Complete wiki draft

---
title: "Convertible Notes: Conversion, Interest, and Founder Dilution"
metaTitle: "Convertible Notes: Conversion and Dilution"
oneLiner: "A convertible note is startup debt that usually converts into equity at a later financing; principal, accrued interest, the cap or discount, and the capitalization definition determine the shares issued."
prereqs: ["How Startup Funding Works", "Pre-Seed, Seed, and Series A", "SAFE Notes"]
tags: ["convertible note", "convertible debt", "fundraising", "valuation cap", "discount", "interest", "dilution", "cap table"]
readingTime: 19
lastUpdated: "2026-07-19"
owner: "Dr. Sarah Zou"
---

## Snapshot (TL;DR)

**What it is:** A convertible note is a loan from an investor to a company that can convert into another security, usually preferred stock in the company's next priced equity financing. The U.S. Securities and Exchange Commission classifies a convertible note as both a security and a loan; it typically starts as debt and converts when the next round or another agreed condition occurs. ([SEC, Small Business Glossary](https://www.sec.gov/resources-small-businesses/glossary))

**Why founders use it:** A note can close faster than a priced equity round because the company does not have to negotiate a full preferred-stock financing immediately. It can bridge the company to a milestone that supports a later round. But the speed comes from deferring the share price, not from eliminating financing cost.

**The essential difference from a SAFE:** A classic convertible note is debt. It has principal, accrues interest, has a maturity date, and may become repayable. A standard SAFE has no interest or maturity date and is not debt. Y Combinator introduced the SAFE specifically to retain future-equity conversion while removing those debt features. ([Y Combinator, “Announcing the Safe”](https://www.ycombinator.com/blog/announcing-the-safe-a-replacement-for-convertible-notes))

**Core conversion logic:**

`Conversion amount = principal + accrued interest that converts`

`Discount price = priced-round share price x (1 - discount rate)`

`Cap price = valuation cap / company capitalization`

`Conversion price = the lowest applicable price under the signed note`

`Conversion shares = conversion amount / conversion price`

If a $500,000 note earns 6% simple interest for 18 months, $545,000 converts if the document applies the same conversion terms to principal and accrued interest. With an $8 million cap, 6 million shares in the defined capitalization, and a $2.00 priced-round share price, the cap price is $1.3333 and the 20%-discount price is $1.60. The cap produces the lower price, so the note converts into 408,750 shares.

**Founder rule:** Model the note as two obligations at once:

1. a debt claim that can mature, default, or consume exit proceeds; and
2. a variable future-equity claim that can dilute founders, employees, and the next round.

This page describes a common U.S. venture-style convertible promissory note. There is no universal note. The executed documents, entity jurisdiction, securities-law exemption, accounting, tax treatment, and facts of the financing control. Use qualified legal, tax, and accounting advisers for an actual transaction.

## Definition: what a convertible note is

A convertible note is a promissory note with an equity-conversion feature. The investor wires cash to the company. In return, the company owes the investor:

- the **principal**, equal to the amount invested;
- **interest** under the stated rate and accrual convention;
- performance of the note's covenants; and
- repayment or another settlement if the note does not convert first.

The note also defines events that may replace the debt claim with stock. The most common is a **qualified financing**: a later preferred-stock round that raises at least a specified amount of new money. Upon that closing, the outstanding conversion amount typically converts automatically at a price more favorable than the price paid by the new investors.

That favorable price usually comes from one or both of:

- a **discount**, such as 20% below the new investors' per-share price; and
- a **valuation cap**, which sets a ceiling on the valuation input used to calculate the note's conversion price.

Cooley's current convertible-debt primer describes this classic structure: principal and often interest, a maturity date, a qualified-financing threshold, and a cap and discount that commonly operate in the alternative so that the lower conversion price applies. It also emphasizes that the cap is not itself a company valuation. ([Cooley GO, “Primer on Convertible Debt,” reviewed September 2, 2025](https://www.cooleygo.com/convertible-debt/))

### A note is not stock when it is issued

Before conversion, the noteholder is a creditor, not automatically a stockholder. The holder does not receive founder common stock merely because it funded the note. Voting, board, information, inspection, and pro rata rights exist only if the documents grant them or applicable law supplies them.

That distinction matters in a weak outcome. Debt generally ranks ahead of equity. If the company has little value, repayment obligations to lenders and noteholders can consume proceeds before common stock receives anything. The exact priority depends on secured claims, senior debt, subordination agreements, the note, insolvency law, and the transaction documents.

### A note is also a security

Calling the instrument a loan does not remove securities-law obligations. The SEC says federal securities laws cover convertible instruments and debt issued by private companies. Every offer and sale of a security—even to one person—must be registered or qualify for an exemption. ([SEC, “Private Companies and the SEC”](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/private-companies-sec))

Many U.S. startups rely on Regulation D, but the correct pathway depends on the investors, solicitation method, amount, disclosures, and state law. For Regulation D offerings, Form D is generally due within 15 days after the first sale, and the notice becomes public on EDGAR. ([SEC, “Exempt Offerings”](https://www.sec.gov/resources-small-businesses/exempt-offerings); [SEC, “What Is Form D?”](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/what-form-d))

## Convertible note vs. SAFE vs. priced equity

| Feature | Convertible note | Standard post-money SAFE | Priced preferred-stock round |
| --- | --- | --- | --- |
| Legal starting point | Debt security | Contractual future-equity security, not debt | Equity issued at closing |
| Interest | Usually accrues | None in the standard form | None |
| Maturity date | Yes | None in the standard form | Not applicable |
| Exact shares known at signing | Usually no | Usually no | Yes |
| Cap or discount | Common | Common, depending on form | Price is negotiated directly |
| Creditor claim before conversion | Yes, subject to priority and subordination | No | No |
| Governance negotiated now | Usually limited | Usually limited | Often includes board, voting, protective, and information rights |
| Main founder advantage | Speed plus debt structure some investors prefer | Speed without maturity or interest | Explicit ownership and rights |
| Main founder risk | Repayment pressure plus uncertain dilution | Accumulated dilution and long-lived overhang | More negotiation, cost, and immediate governance trade-offs |

A note is not automatically “founder-friendlier” than a SAFE, and a SAFE is not automatically cheaper than a note. Compare the entire economic package: amount raised, cap, discount, interest, time to conversion, priority, maturity remedy, exit treatment, side rights, and the expected next round.

## Why convertible notes matter to founders

### They connect runway to the next financing event

A note is usually justified as a bridge: the company needs cash now and expects a later milestone to make a priced round more attractive. That milestone might be:

- a product launch;
- regulatory clearance;
- a technical proof point;
- repeatable customer acquisition;
- a target level of annual recurring revenue;
- a gross-margin improvement;
- a signed enterprise pipeline; or
- enough operating history to support a defensible valuation.

The financing decision is therefore inseparable from the operating plan:

`Required note raise = cash needed to reach milestone + execution buffer - cash on hand`

Then test whether the milestone is likely to occur well before maturity. A 24-month note funding only 12 months of runway is not automatically safe; fundraising can take months, and a missed milestone can leave the company negotiating an extension while cash is scarce.

### Interest increases dilution even if no cash interest is paid

Startup notes often accrue rather than pay interest in cash. Founders may therefore treat interest as irrelevant. It is not. If accrued interest converts, it buys shares at the same favorable cap or discount price, increasing the noteholder's ownership.

For simple interest:

`Accrued interest = principal x annual interest rate x time outstanding`

For day-based accrual:

`Accrued interest = principal x annual interest rate x accrued days / day-count basis`

The note may use 365 days, 360 days, actual/actual, compounding, or another convention. Do not assume. A difference that looks small per note can become material across a large stack or a delayed round.

### The maturity date creates a real negotiating deadline

If a qualified financing has not occurred by maturity, the company may owe cash, the holder may have a conversion election, the note may convert automatically, or the parties may extend it. The document decides. Cooley notes that early-stage companies often cannot repay at maturity and frequently seek an extension, but an extension is a negotiated outcome rather than an automatic right. ([Cooley GO, “Frequently Asked Questions: Convertible Debt”](https://www.cooleygo.com/frequently-asked-questions-convertible-debt/))

Maturity therefore affects fundraising leverage. A company with nine months of runway and 14 months to maturity has options. A company with six weeks of runway and overdue notes is negotiating with both new investors and existing creditors under pressure.

### Conversion changes the next round's ownership math

New investors price the round using a pre-money valuation and a defined fully diluted capitalization. Outstanding notes then convert into additional shares. Those shares dilute the pre-note holders, and the new money dilutes everyone who owns shares immediately before the investment.

The cap table used in the pitch deck should not show notes as if they were already fixed common shares. But the company should show a pro forma conversion range and disclose the principal, interest, caps, discounts, maturity dates, and side rights. Hiding the note stack until diligence is a credibility problem, not a cap-table strategy.

### Debt can affect an acquisition or shutdown

If the company is sold before conversion, the note may require repayment, a premium, or an as-converted payout. A small acquihire can fail economically if the purchase price cannot satisfy outstanding debt. Cooley advises surfacing that issue early because note repayment can become an impediment to the deal. ([Cooley GO, “Frequently Asked Questions: Convertible Debt”](https://www.cooleygo.com/frequently-asked-questions-convertible-debt/))

## The term map: what to read before signing

### Principal

The face amount funded by the investor. Track it per note and in aggregate.

### Interest rate and accrual convention

The stated annual rate, whether interest is simple or compounded, when it starts, the day-count convention, whether it is payable in cash, and whether accrued interest converts.

Interest also raises tax and accounting questions. The IRS publishes Applicable Federal Rates monthly and explains that below-market loans and original issue discount can create imputed-interest consequences. A startup should not select a zero or unusually low rate without tax advice. ([IRS, Applicable Federal Rates](https://www.irs.gov/applicable-federal-rates); [IRS Publication 550](https://www.irs.gov/publications/p550); [IRS Publication 1212](https://www.irs.gov/publications/p1212))

### Maturity date

The date the debt becomes due or another maturity remedy becomes available. Read the remedy, not only the date:

- Is repayment automatic or at the holder's option?
- Can the holder convert instead?
- What security and price apply at maturity?
- Can a majority of note principal extend all notes?
- Do individual holders have vetoes over fundamental changes?
- Does default interest begin?

### Qualified financing

The equity financing that triggers automatic conversion. It usually has a minimum new-money threshold. A threshold that is too low can let a small insider round force conversion; one that is too high can leave notes outstanding during a legitimate financing.

### Discount

A reduction from the price paid by the new investors:

`Discount price = round price x (1 - discount rate)`

At a $2.00 round price and a 20% discount:

`$2.00 x (1 - 20%) = $1.60`

The investor receives more shares because it converts at $1.60 rather than $2.00.

### Valuation cap

A maximum valuation input used to calculate a conversion price:

`Cap price = valuation cap / company capitalization`

The difficult term is **company capitalization**. Depending on the note, it may include or exclude:

- issued common and preferred stock;
- outstanding options;
- warrants;
- promised but ungranted equity;
- the unissued option pool;
- the pool increase required by the new round;
- other notes or SAFEs; and
- shares reserved for conversion.

A one-line formula is only correct when the denominator matches the signed definition. Cooley warns that the round size and cap can each materially change ownership and that founders should run sensitivity analysis rather than treating the cap as a decorative headline term. ([Cooley GO, “Primer on Convertible Debt”](https://www.cooleygo.com/convertible-debt/))

### Conversion security

The note may convert into:

- the same preferred shares sold to the new investors;
- a separate shadow series with modified liquidation economics;
- preferred or common stock at maturity; or
- another security specified for a non-qualified financing.

The name alone does not reveal the rights. Read liquidation preference, dividends, conversion, voting, and protective provisions after conversion.

### Change of control

The treatment if the company is acquired before a qualified financing. Possible outcomes include:

- principal plus accrued interest;
- a cash multiple;
- the greater of repayment and an as-converted amount; or
- holder choice.

As one current market example, Techstars publishes an optional convertible note with a two-year maturity, 5% simple interest, a 20% discount, a valuation cap, qualified-financing conversion, a maturity conversion election, and change-of-control treatment based on the greater of repayment and an as-converted value. This is evidence of one actual instrument, not a universal standard. ([Techstars, Investment Terms](https://www.techstars.com/newsroom/investment-terms-2024))

### Security, seniority, and subordination

Determine whether the note is secured by company assets, unsecured, senior or junior to other notes, and subordinate to bank or venture debt. A future lender may require the noteholders to sign a subordination agreement.

### Default

Read events of default, notice and cure periods, acceleration, default interest, enforcement costs, and cross-defaults. “The investor intends to convert” does not erase contractual remedies.

### Amendment and majority action

When many investors hold separate notes, unanimous consent can create a holdout problem. Majority-action provisions often let holders of more than a stated percentage of principal amend or waive terms for the group, while reserving certain fundamental terms for individual consent.

### Side rights

Information rights, pro rata rights, most-favored-nation clauses, board observer rights, warrant coverage, and closing fees can be economically important even when they are outside the note's conversion formula.

## The conversion mechanism

### Step 1: Calculate the amount that converts

Start with principal. Add the accrued interest that the documents say converts:

`Conversion amount = principal + convertible accrued interest`

If interest is paid in cash, waived, or treated differently, adjust the amount accordingly.

### Step 2: Calculate the priced-round share price

A simplified round price is:

`Round price = negotiated pre-money valuation / priced-round capitalization`

The financing documents define the capitalization. The negotiated option-pool increase can change the denominator and therefore the price paid by new investors.

### Step 3: Calculate every applicable note price

For a discount:

`Discount price = round price x (1 - discount)`

For a cap:

`Cap price = valuation cap / note capitalization`

The priced-round capitalization and note capitalization may not be identical.

### Step 4: Select the contractually applicable price

For a common note with both a cap and discount operating in the alternative:

`Conversion price = min(discount price, cap price)`

Some documents also compare the undiscounted round price, apply different terms to accrued interest, or use a different rule in a non-qualified financing. Follow the signed language.

### Step 5: Issue conversion shares

`Conversion shares = conversion amount / conversion price`

Run the calculation for every tranche. Do not average caps or discounts unless the documents expressly permit it.

### Step 6: Add the priced-round shares and pool increase

`New investor shares = new cash invested / round price`

Then include any option-pool top-up, warrants, or other closing issuances to calculate post-closing ownership.

## Worked example: a $500,000 note converting in a seed round

Assume:

| Input | Amount |
| --- | ---: |
| Note principal | $500,000 |
| Annual interest | 6% simple |
| Time outstanding | 18 months |
| Valuation cap | $8,000,000 |
| Conversion discount | 20% |
| Priced-round pre-money valuation | $12,000,000 |
| Shares in both simplified price denominators | 6,000,000 |
| New cash in priced round | $3,000,000 |
| Convertible interest treatment | Principal and accrued interest convert on the same terms |
| Other instruments and pool increase | None, solely to isolate the note |

### 1. Accrued interest

`$500,000 x 6% x 1.5 years = $45,000`

### 2. Conversion amount

`$500,000 + $45,000 = $545,000`

### 3. Priced-round share price

`$12,000,000 / 6,000,000 shares = $2.00 per share`

### 4. Discount price

`$2.00 x (1 - 20%) = $1.60 per share`

### 5. Cap price

`$8,000,000 / 6,000,000 shares = $1.3333 per share`

### 6. Conversion price

The cap price is lower:

`min($1.60, $1.3333) = $1.3333`

### 7. Note shares

`$545,000 / $1.3333 = 408,750 shares`

The $45,000 of interest creates:

`$45,000 / $1.3333 = 33,750 shares`

Interest therefore represents 8.26% of the note's conversion shares in this example. It is not a rounding error.

### 8. New investor shares

`$3,000,000 / $2.00 = 1,500,000 shares`

### 9. Simplified ownership

| Holder group | Shares after closing | Ownership after closing |
| --- | ---: | ---: |
| Existing holders | 6,000,000 | 75.87% |
| Converting note | 408,750 | 5.17% |
| New investors | 1,500,000 | 18.97% |
| **Total** | **7,908,750** | **100.00%** |

Immediately before the new money, the note owns:

`408,750 / (6,000,000 + 408,750) = 6.38%`

After the new money, it owns 5.17%. The priced round dilutes the noteholder as well as the existing holders.

### What the example deliberately leaves out

Real closings often include multiple notes, different issuance dates, more than one cap, different discounts, SAFEs, warrants, accrued interest through the exact closing date, an option-pool increase, promised grants, pro rata investments, and legal definitions that use different denominators. Those items can materially change every percentage.

The example is a teaching model, not a substitute for the closing spreadsheet prepared from the actual documents.

## Sensitivity: when the cap or discount controls

With 6 million denominator shares, an $8 million cap produces a fixed simplified cap price of $1.3333.

With a 20% discount, the discount price equals the cap price when:

`Round price x 80% = $1.3333`

`Round price = $1.6667`

That corresponds to a $10 million pre-money valuation under the simplified 6 million-share denominator.

- Above a $10 million priced-round valuation, the cap produces the lower price.
- Below $10 million, the discount produces the lower price.
- At $10 million, they are equal.

This boundary helps founders run scenarios. The cap is not always the controlling benefit, and a higher next-round valuation can give the noteholder more advantage relative to the new investors.

## How founders, investors, and operators use convertible notes

| Role | Practical use | Decision to model |
| --- | --- | --- |
| Founder | Bridge to a milestone without pricing a full preferred round today | Does the cash reach a value-creating milestone with time left before maturity? |
| Investor | Fund earlier while preserving a debt claim and receiving conversion price protection | What ownership range results under cap, discount, down-round, maturity, and exit cases? |
| Finance operator | Maintain the note ledger, accrued interest, maturity calendar, and pro forma cap table | Are all documents and model inputs synchronized through the expected closing date? |
| Board | Approve the financing and oversee runway, legal compliance, and future obligations | Is the amount and instrument consistent with solvency, financing strategy, and fiduciary duties? |
| New lead investor | Price the round and diligence the outstanding stack | How much pre-closing dilution, consent work, and post-closing ownership does conversion create? |
| Acquirer | Determine debt payoff and closing requirements | What cash, consent, or conversion is required before equity receives proceeds? |

### In a pitch deck

Do not place a misleading “clean” ownership chart in the appendix while notes remain outstanding. Show:

- issued and fully diluted ownership today;
- outstanding convertible principal and accrued interest;
- a base-case as-converted cap table;
- low and high priced-round scenarios;
- the maturity schedule; and
- the amount and milestone funded by the bridge.

The deck does not need every legal clause, but the financial model should reconcile to the note ledger.

### In fundraising strategy

Work backward from the next round:

1. Define the milestone a credible new lead investor needs to see.
2. Estimate the cash and time required to reach it.
3. Add a delay and execution buffer.
4. Choose a maturity date beyond the expected financing window.
5. Set a qualified-financing threshold that fits the anticipated round.
6. Model dilution at several next-round valuations.
7. Test what happens if the round never closes.

The note should finance a transition, not merely postpone a capital-structure decision.

### In pricing and unit economics

A note can be sensible when it funds an experiment that resolves a key economic uncertainty: willingness to pay, gross margin, payback period, retention, or sales-cycle length. If the capital only subsidizes an unproven acquisition channel without improving the underlying economics, the next round may arrive at a weak valuation—or not arrive at all.

Compare plans using milestone-adjusted dilution:

`Equity cost of bridge = ownership after conversion under the expected next round`

Then ask whether the additional runway creates enough enterprise value or financing probability to justify that cost. Coupon interest alone is a poor measure of the note's economic price.

### In treasury and cap-table operations

Maintain a note ledger with at least:

- holder and contact;
- issue and funding date;
- principal;
- interest rate and convention;
- accrued interest through the current date;
- maturity date;
- cap;
- discount;
- qualified-financing threshold;
- conversion security;
- exit and maturity treatment;
- security or subordination;
- amendment threshold;
- pro rata, MFN, warrant, and information rights;
- board approval;
- securities exemption and filing status;
- executed document link; and
- current consent status.

Cooley recommends keeping a notes ledger next to the cap table because the exact share count is often unknown until conversion and accrued interest must be updated. ([Cooley GO, “Frequently Asked Questions: Convertible Debt”](https://www.cooleygo.com/frequently-asked-questions-convertible-debt/))

## Common mistakes and misinterpretations

### Calling the cap the company's current valuation

An $8 million cap is not a board-approved statement that the company is worth $8 million today. It is a ceiling used in a future conversion-price formula. Treating it as a valuation can mislead founders, employees, and investors.

### Looking only at the coupon rate

A 6% note is not “cheap capital” merely because 6% is below the expected venture return. The cap and discount determine the equity transferred. Maturity and creditor priority determine downside leverage. Model the total package.

### Forgetting that interest may convert

Accrued interest can buy discounted shares. The longer the round is delayed, the more dilution the same principal can create. Calculate through the expected closing date and a delayed case.

### Confusing a 20% discount with a 20% ownership discount

A 20% conversion discount means the note price is 80% of the new investor price. It does not mean the investor receives exactly 20% more shares:

`1 / 0.80 = 1.25`

At the same dollars invested, the note receives 25% more shares than a new investor paying the undiscounted price.

### Assuming the cap and discount are cumulative

They commonly operate in the alternative: calculate both prices and use the lower one. They do not normally mean “apply the cap, then take another 20% off” unless the document explicitly says so. ([Cooley GO, “Primer on Convertible Debt”](https://www.cooleygo.com/convertible-debt/))

### Modeling the denominator incorrectly

Using only issued founder shares can understate the denominator if options, warrants, or a pool are included. Including the new-money shares when the definition excludes them can overstate it. Copy the capitalization definition into the model and map every term.

### Averaging different note tranches

A $250,000 note at a $6 million cap and a $750,000 note at a $12 million cap do not equal a $1 million note at a $10.5 million weighted-average cap. Each converts under its own price, interest, and date.

### Assuming maturity will “just extend”

An investor may agree to extend, but the company has no automatic entitlement unless the documents provide it. Even friendly investors may seek a lower cap, added interest, a repayment premium, information rights, or other consideration.

### Setting the qualified-financing threshold without the operating plan

If the threshold is above the likely round, the notes may not convert. If it is too low, a small financing can trigger conversion without enough new capital to stabilize the company. Tie the threshold to a realistic financing plan.

### Ignoring the note in an exit waterfall

A small acquisition price does not go directly to common holders. Debt, transaction expenses, and preferred claims may absorb it first. Model the note's change-of-control clause before celebrating headline consideration.

### Treating friends-and-family notes as informal IOUs

A convertible note is a security even if the investor is a relative. Securities exemptions, disclosures, state law, corporate approval, conflicts, and documentation still matter. The SEC states that round labels do not create regulatory exemptions. ([SEC, “Early-Stage Investors”](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/early-stage-investors))

### Publicly advertising a private note without checking the exemption

Rule 506(b) generally prohibits general solicitation. A social post or unrestricted web page describing a specific investment opportunity can be an offer. Choose the offering pathway before marketing the note. ([SEC, “General Solicitation”](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/general-solicitation))

### Using a template without reconciling the whole document set

A note financing can require a term sheet, note or note purchase agreement, investor representations, board consent, stockholder or other approvals, and securities filings. Cooley's Series Seed package includes a term sheet, convertible promissory note, investor suitability questionnaire, and board consent, while warning that optional clauses require careful review. ([Cooley GO, Series Seed Convertible Note Financing Package](https://www.cooleygo.com/documents/series-seed-notes-financing-package/))

## When this breaks

### The qualified financing never happens

The central assumption fails. The note reaches maturity as debt rather than converting in an orderly financing. The company then needs cash repayment capacity, a contractual conversion route, or noteholder consent to extend.

### The company reaches maturity with insufficient cash

An unpaid maturity obligation can create default, acceleration, enforcement cost, and leverage for holders. Even if holders prefer equity, negotiations consume management time and may complicate a new round.

### The next financing is too small to trigger conversion

The company can close new equity while old notes remain outstanding. New investors may dislike the debt overhang, and the post-closing capitalization becomes harder to explain. Revisit the threshold before launching the round, not at the closing table.

### The next round is flat or down

The discount may produce more shares than the cap. If the note compares several formulas, the lowest price can create substantially more dilution than a cap-only mental shortcut suggests. Anti-dilution, option-pool, and pay-to-play terms in the new preferred stock can add further complexity.

### The company has too many incompatible instruments

Multiple notes, pre-money and post-money SAFEs, warrants, side letters, promised options, and different capitalization definitions can create recursive or conflicting calculations. The financing stops being “simple,” and diligence and legal fees rise.

### A senior lender requires subordination

A bank or venture lender may require noteholders to subordinate payment or enforcement rights. If holders will not consent, the company may lose access to the new debt facility.

### A low-value acquisition cannot clear the debt

The buyer may refuse to increase cash consideration. Noteholders may have to accept less, convert, or block the structure if their consent is required. Founders and employees can receive little even when the team is hired.

### The company becomes insolvent

Directors cannot treat noteholder repayment and new fundraising as ordinary cap-table optimization when insolvency law and creditor interests are implicated. Get jurisdiction-specific advice early; do not wait for a missed maturity date.

### Tax or accounting treatment changes the economics

Interest, below-market rates, original issue discount, conversion features, warrants, modifications, and debt extinguishment can have consequences that the cap-table model does not show. FASB's convertible-instrument guidance simplifies some accounting models but retains classification, measurement, EPS, and disclosure requirements that depend on the instrument. ([FASB, Accounting Standards Update 2020-06](https://storage.fasb.org/ASU%202020-06.pdf))

### The company or investor is in another jurisdiction

Corporate authority, interest limits, withholding, securities exemptions, insolvency priority, and tax classification vary. A U.S. Delaware startup form should not be copied into another entity or country without local review.

### The document has non-standard conversion language

Small drafting changes can alter whether interest converts, which capitalization applies, whether the cap and discount are alternatives, and what happens in a sale or at maturity. Redline against the referenced form and model the signed version.

## Founder checklist

Before issuing a convertible note:

- Identify the operating milestone the cash must fund.
- Build a monthly cash plan through the milestone and expected priced-round close.
- Add a financing-delay buffer before maturity.
- Decide whether a note, SAFE, or priced round best fits the investor and company.
- Model accrued interest through base and delayed closing dates.
- Calculate cap, discount, and round-price scenarios for every note tranche.
- Include options, promised grants, the pool, warrants, SAFEs, and other notes.
- Model the next round's new money and pool increase.
- Test no-financing, maturity, default, low-value sale, and dissolution cases.
- Align the qualified-financing threshold with the expected round.
- Review maturity remedies, change-of-control treatment, security, subordination, and defaults.
- Set workable majority-amendment provisions and identify individual veto rights.
- Record all side letters and pro rata, MFN, warrant, and information rights.
- Obtain required corporate approvals before issuance.
- Choose the securities-law exemption before solicitation or sale.
- Complete federal and state filings with counsel.
- Review interest rate, tax, and accounting treatment.
- Keep executed documents, the note ledger, and cap-table model synchronized.
- Start extension or conversion discussions well before maturity if the priced round slips.

Before investing through a note:

- Verify principal, interest, maturity, and creditor priority.
- Reconstruct the cap and discount calculations from the actual capitalization definition.
- Model the full outstanding stack, not only your note.
- Read qualified- and non-qualified-financing treatment.
- Read maturity, default, amendment, change-of-control, and dissolution provisions.
- Confirm what security and rights you receive after conversion.
- Test whether the company can plausibly reach the next financing before maturity.
- Confirm securities-law representations and transfer restrictions.

## Related concepts and internal-link suggestions

- [How Startup Funding Works](/wiki/fundraising) — place convertible debt within the broader financing-instrument and stage map.
- [Pre-Seed, Seed, and Series A](/wiki/fundraising/pre-seed-seed-series-a) — connect the bridge milestone to the expectations of the next priced round.
- [SAFE Notes](/wiki/fundraising/safe-notes) — compare debt, interest, maturity, creditor priority, and conversion mechanics.
- [Startup Valuation Methods](/wiki/fundraising/startup-valuation-methods) — distinguish a conversion cap from a priced-round valuation.
- [Dilution and Cap Tables](/wiki/fundraising/dilution-cap-tables) — extend the worked example across option pools and multiple instruments.
- [Term Sheets](/wiki/fundraising/term-sheets) — explain how next-round economics and governance terms interact with note conversion.
- [Liquidation Preferences](/wiki/fundraising/liquidation-preferences) — map the payout stack after notes convert and before common receives proceeds.
- [Bootstrapping vs. Venture Capital](/wiki/fundraising/bootstrapping-vs-vc) — compare a bridge round with a capital plan that avoids institutional financing.

## Sources

1. U.S. Securities and Exchange Commission. [Small Business Glossary: Convertible Note](https://www.sec.gov/resources-small-businesses/glossary). Current regulatory definition of a convertible note as a loan, security, and future conversion instrument.
2. U.S. Securities and Exchange Commission. [Private Companies and the SEC](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/private-companies-sec), [Exempt Offerings](https://www.sec.gov/resources-small-businesses/exempt-offerings), [What Is Form D?](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/what-form-d), [General Solicitation](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/general-solicitation), and [Early-Stage Investors](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/early-stage-investors). Primary guidance on private-company securities, offering pathways, solicitation, notice filing, and round labels.
3. Cooley GO. [Primer on Convertible Debt](https://www.cooleygo.com/convertible-debt/), reviewed September 2, 2025; [Frequently Asked Questions: Convertible Debt](https://www.cooleygo.com/frequently-asked-questions-convertible-debt/); and [Series Seed Convertible Note Financing Package](https://www.cooleygo.com/documents/series-seed-notes-financing-package/). Current practitioner explanations and first-party model-document resources for classic U.S. convertible debt.
4. Techstars. [Investment Terms](https://www.techstars.com/newsroom/investment-terms-2024). First-party example of an actual accelerator note's principal, interest, maturity, cap, discount, qualified-financing, maturity, and change-of-control terms.
5. Y Combinator. [Announcing the Safe, a Replacement for Convertible Notes](https://www.ycombinator.com/blog/announcing-the-safe-a-replacement-for-convertible-notes). First-party explanation of why interest and maturity distinguish convertible notes from standard SAFEs.
6. Internal Revenue Service. [Applicable Federal Rates](https://www.irs.gov/applicable-federal-rates), [Publication 550: Investment Income and Expenses](https://www.irs.gov/publications/p550), and [Publication 1212: Guide to Original Issue Discount Instruments](https://www.irs.gov/publications/p1212). Primary sources on prescribed rates, below-market loans, and original issue discount.
7. Financial Accounting Standards Board. [Accounting Standards Update 2020-06: Accounting for Convertible Instruments and Contracts in an Entity's Own Equity](https://storage.fasb.org/ASU%202020-06.pdf). Primary U.S. GAAP standard-setting source on convertible-instrument accounting and disclosure.

---

# Recommended internal links for implementation

1. `/wiki/fundraising` — anchor: **how startup funding works**
2. `/wiki/fundraising/pre-seed-seed-series-a` — anchor: **bridge from seed to a priced round**
3. `/wiki/fundraising/safe-notes` — anchor: **convertible note vs. SAFE**
4. `/wiki/fundraising/startup-valuation-methods` — anchor: **valuation cap vs. company valuation**
5. `/wiki/fundraising/dilution-cap-tables` — anchor: **model note conversion and founder dilution**
6. `/wiki/fundraising/term-sheets` — anchor: **priced-round term sheet**
7. `/wiki/fundraising/liquidation-preferences` — anchor: **liquidation priority after conversion**
8. `/wiki/fundraising/bootstrapping-vs-vc` — anchor: **bridge financing vs. bootstrapping**
