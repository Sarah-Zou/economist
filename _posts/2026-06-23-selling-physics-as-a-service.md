---
title: "Selling Physics as a Service"
date: 2026-06-23
author: Dr. Sarah Zou
description: "When should a hardware company stop selling equipment and start selling an outcome? A framework for servitization, four archetypes, and the asset-light vs asset-heavy decision."
dek: "A decision framework for hardware founders choosing between product sales, outcome pricing, and data-as-product models."
image: "/assets/images/newsletter/1.3_header.webp"
imageAlt: "Illustration of hardware servitization—equipment transitioning from a one-time product sale to metered outcomes such as uptime, throughput, and sensing data."
canonical: "https://sarahzou.com/newsletter/selling-physics-as-a-service"
tags:
  - Hardware
  - Servitization
  - Deep Tech
  - Pricing
  - Monetization
  - Startups
---

You have built a smart device that works, and you have noticed something: *the value isn't the box, it's what the box does* — an hour of uptime, a unit of throughput, a measurement the customer would pay for on its own. So the question arrives: should you stop selling equipment and start selling that outcome instead?

The answer is never "always." It turns on three things — **what you can meter**, **how much capital and risk you can carry**, and **what your data does**. Get them right and you earn software economics on a hardware base. Get them wrong and you have written an insurance policy at a loss.

## The movement of servitization

Rolls-Royce makes its money on flight hours, not on engines. Under "power by the hour" — pioneered in 1962 for the Viper engine and now run at scale as TotalCare — an airline pays a fixed fee for every hour an engine flies, so Rolls-Royce is paid only when engines perform [3][16]. The airline buys thrust delivered; Rolls-Royce keeps the risk.

That is the move: **stop selling the machine, sell what it does, metered in the customer's own units, and carry the asset and risk the customer used to carry**. It is an old idea — *servitization*, named in 1988 [1], but with a new, data-era edge. The claim is not that services beat products; the two obey different economics, and the mistake is bringing the wrong playbook to the wrong layer.

The trap is right there in the temptation: a founder with a clever device sees recurring revenue and applies the SaaS playbook. But hardware that sells an outcome carries capital and physics that software never did.

## Why the naive view misleads

The naive view treats the model as *"SaaS with a gadget bolted on."* It misleads. The model is a **hybrid**: it carries the capital and physics risk of hardware while chasing the margins and stickiness of software. Underprice the risk or overbuild the service and you hit the **service paradox** — manufacturers that pour money into services and fail to profit, sometimes courting bankruptcy [2]. Peloton's inventory glut and GE Predix's roughly $7bn write-off are that bill coming due [12][11].

## The four archetypes

Sort the models by the one decision that drives the rest — **what you meter and sell**.

| Archetype (example) | What you sell & meter | Capital | Data role | Moat |
| --- | --- | --- | --- | --- |
| Performance-risk contract (Rolls-Royce TotalCare) | Reduced operational risk; metered by operating hours / uptime | Vendor carries performance risk | Low — asset-health data cuts cost to serve | Reliability trust + installed base [3][4] |
| Outcome-as-a-service (Michelin, Signify, Deere) | A physical output by the unit — lux, km, sprayed acre | Vendor-owned or customer-owned + usage billing | Low–mid — usage / optimization | Aligned incentives; capex→opex [5][6][7] |
| Razor-and-blade (Peloton; Intuitive da Vinci) | Hardware placed or sold, then a recurring stream — subscription or consumables | Asset sold to the customer; recurring revenue layered on | Low — engagement / utilization | Content/community or consumable lock-in [12][9] |
| Data-as-product (Planet, Spire) | A subscription to the data the hardware generates | High — own the sensing network | High — the data is the product | Proprietary data network [10] |

Of the four, the **data-as-product archetype is the AI-era model** where proprietary data, not the device, is the durable advantage. Data by itself is never the moat [13]; what turns it into one is the subject of [The Hardware-plus-Data Model](/newsletter/hardware-plus-data-model), which takes this archetype apart in detail.

## Two questions place any business

The archetypes name what you sell; the matrix places how you should build, and it turns on just two variables — how much asset you carry, and what your data does. The answers land you in one box.

| | Data cuts cost to serve | Data deepens lock-in | Data is the product |
| --- | --- | --- | --- |
| **Asset-light** (customer owns asset) | Intuitive Surgical | John Deere | Whoop, Samsara |
| **Hybrid / financed** | Caterpillar [8] | Michelin | Komatsu Smart Construction; Element Fleet [17][18] |
| **Asset-heavy** (vendor owns asset) | Rolls-Royce | Signify | Planet, Spire |

That last cell is thin for a reason: when the data is the product, you usually want to own the sensing network outright (asset-heavy) to control data rights and quality. Komatsu and Element approach the model from an asset-financing and fleet-management angle: dealer-financed machines or leased fleets with data sold on top; that makes the combination possible, but still rarer and more hybrid than the other two [17][18].

## The decision that matters most: asset-light or asset-heavy

For a founder this is the fork — and for an early-stage one it is not a symmetric choice. Owning the asset buys control, data rights, and a stronger moat; it also loads a balance sheet you then have to survive [14][15]. Until you have proven the buyer and the value metric, **asset-light is the default and asset-heavy is something you earn the right to do**. Read the table below as "where you're heading," not "choose one today."

| Model | Upside | Downside |
| --- | --- | --- |
| **Asset-light** | Faster learning, lower burn, less dilution, easy pilots; the customer funds the infrastructure | Less control, weaker moat, partner dependency, murky data rights, shared margin |
| **Asset-heavy** | More control and data rights, better SLAs, stronger moat, more margin at scale | Higher burn, slower deployment, utilization risk, financing burden |

In practice the sequence is almost always **light first, then heavy**: validate cheaply, then earn the capital case. The two forces below are what make the choice bite.

### Capital exposure

An asset-heavy model sinks capital into hardware that must stay busy. Idle assets and fixed costs are pure loss, so **utilization risk sits on you, not the customer** — and it scales with every unit you deploy ahead of demand [14][15].

### Risk transfer

Selling an outcome means absorbing the customer's downside — downtime, maintenance, replacement, the volatility of how hard they use the thing. **That absorption is the product; it is also the danger.**

*Peloton shows the cost-side version even for an asset-light seller. Its customers buy or rent the bike — Peloton never owned the asset — yet it read a pandemic spike as permanent and built fixed capacity to match (a $420m Precor plant acquisition, a $400m U.S. factory). When demand normalized it cleared bikes below cost and exited owned manufacturing entirely [12]. The model was sound; the capacity bet was not. Asset-light protects you from utilization risk on the asset — not from over-building everything around it.*

## Where it breaks

| Anti-pattern | What goes wrong | Tell |
| --- | --- | --- |
| Operating-leverage trap | Scale fixed manufacturing capacity and inventory to a demand peak you misread as permanent; the cost base can't shrink when volume falls | Peloton [12] |
| Wrong altitude | Sell a horizontal platform to the whole industry instead of outcomes off your own installed base | GE Predix [11] |
| Service paradox | Invest in services customers won't buy, or build capability faster than revenue | Manufacturers broadly [2] |
| Unpriced risk transfer | Sell predictability but don't price downtime, maintenance, replacement, or utilization volatility | An insurance policy written at a loss |
| Bad meter | Meter what's easy to measure, not what the customer economically values | Billing logins, not outcomes |

## Worksheet: place a business

| Test | Sound only if… |
| --- | --- |
| **1. Metering** | You can meter an outcome (hour, lux, km, acre, uptime) that customers economically value |
| **2. Priced risk** | Buyers are willing to pay a premium for predictability, and you've priced the downside |
| **3. Capital** | If you own the asset, cost flexes with volume (the Peloton test) |
| **4. Installed-base moat** | Switching costs survive even setting data aside — training, integration, certification |
| **5. Data flywheel** | The hardware generates proprietary data that competitors can't scrape |
| **6. Focus** | You sell outcomes off your own installed base, not a platform for everyone (the GE Predix test) |

These six tests ask whether the model is sound — they are the first half of a pair. If your answer to the model is data-as-product, the second half is whether the data is defensible: the seven-dimension data-moat test in [The Hardware-plus-Data Model](/newsletter/hardware-plus-data-model). Run them in that order — **model first, then moat**.

## Next action

Back to the question: should you stop selling equipment and start selling an outcome? Pick one outcome you could sell instead of a product. Name the unit you would meter and the risk you would absorb. Locate yourself on the matrix, then make the asset-light-or-heavy call by one test — is the footprint your moat?

This choice is also a fundraising decision. **Asset-heavy is a deep-tech and project-finance story**, told to a different investor and valued on different multiples; **asset-light is a software-multiple story**. The model you pick here is the narrative you defend.

---

### References

1. Vandermerwe & Rada (1988), "Servitization of Business," European Management Journal. [https://www.sciencedirect.com/science/article/abs/pii/0263237388900333](https://www.sciencedirect.com/science/article/abs/pii/0263237388900333)
2. "Explaining the servitization paradox," Int. J. Operations & Production Mgmt (2021). [https://www.emerald.com/ijopm/article/41/5/517/148636/Explaining-the-servitization-paradox-a](https://www.emerald.com/ijopm/article/41/5/517/148636/Explaining-the-servitization-paradox-a)
3. Rolls-Royce, "TotalCare" (power-by-the-hour; fixed fee per flying hour). [https://www.rolls-royce.com/media/our-stories/discover/2017/totalcare.aspx](https://www.rolls-royce.com/media/our-stories/discover/2017/totalcare.aspx)
4. Rolls-Royce Holdings 2025 Full-Year Results. [https://www.rolls-royce.com/media/press-releases/2026/26-02-2026-rr-holdings-plc-2025-full-year-results.aspx](https://www.rolls-royce.com/media/press-releases/2026/26-02-2026-rr-holdings-plc-2025-full-year-results.aspx)
5. Signify, "Light as a Service." [https://www.signify.com/global/signify-services/managed-services/light-as-a-service](https://www.signify.com/global/signify-services/managed-services/light-as-a-service)
6. IMD, "Michelin Fleet Solutions — selling kilometers." [https://www.imd.org/research-knowledge/marketing/case-studies/business-model-innovation-michelin-fleet-solutions-from-selling-tires-to-selling-kilometers/](https://www.imd.org/research-knowledge/marketing/case-studies/business-model-innovation-michelin-fleet-solutions-from-selling-tires-to-selling-kilometers/)
7. John Deere recurring revenue / See & Spray per-acre. [https://blog.tractortuesday.com/2025/10/27/john-deeres-shift-toward-the-intelligence-layer/](https://blog.tractortuesday.com/2025/10/27/john-deeres-shift-toward-the-intelligence-layer/)
8. Caterpillar services target and connected assets (Investor Day 2025). [https://www.digitalcommerce360.com/2025/07/18/caterpillar-digital-28-billion-services-revenue/](https://www.digitalcommerce360.com/2025/07/18/caterpillar-digital-28-billion-services-revenue/)
9. Intuitive Surgical instruments and training (recurring ~85%). [https://www.intuitive.com/en-us/products-and-services/da-vinci/instruments](https://www.intuitive.com/en-us/products-and-services/da-vinci/instruments)
10. Planet Labs FY2026 results (record revenue; 98% recurring ACV). [https://www.sec.gov/Archives/edgar/data/0001836833/000119312526257401/pl-ex99_1.htm](https://www.sec.gov/Archives/edgar/data/0001836833/000119312526257401/pl-ex99_1.htm)
11. GE Predix failure (Panorama; IndustryWeek $15bn goal). [https://www.panorama-consulting.com/ge-digital-transformation-failure/](https://www.panorama-consulting.com/ge-digital-transformation-failure/)
12. Peloton: customers buy or rent the bike; failure was fixed capacity, inventory glut, demand overexpansion (Supply Chain Dive; CNBC, July 2022). [https://www.supplychaindive.com/news/peloton-manufacturing-operations-precor/642137/](https://www.supplychaindive.com/news/peloton-manufacturing-operations-precor/642137/)
13. Casado & Lauten (2019), "The Empty Promise of Data Moats," a16z. [https://a16z.com/the-empty-promise-of-data-moats/](https://a16z.com/the-empty-promise-of-data-moats/)
14. Recurring-revenue vs hardware valuation multiples (Aventis). [https://aventis-advisors.com/tech-company-valuation-multiples/](https://aventis-advisors.com/tech-company-valuation-multiples/)
15. Equipment financing: capex-to-opex, balance sheet (J.P. Morgan). [https://www.jpmorgan.com/insights/banking/commercial-loans-and-lines-of-credit/how-equipment-financing-can-optimize-liquidity](https://www.jpmorgan.com/insights/banking/commercial-loans-and-lines-of-credit/how-equipment-financing-can-optimize-liquidity)
16. Rolls-Royce, 50th anniversary of "Power-by-the-Hour" (1962 origin, Viper engine). [https://www.rolls-royce.com/media/press-releases-archive/yr-2012/121030-the-hour.aspx](https://www.rolls-royce.com/media/press-releases-archive/yr-2012/121030-the-hour.aspx)
17. Komatsu Smart Construction — data/digital services on financed equipment. [https://www.komatsu.com/en-us/technology/smart-construction](https://www.komatsu.com/en-us/technology/smart-construction)
18. Element Fleet — telematics/connected data on leased fleets. [https://www.elementfleet.com/fleet-services/vehicle-telematics](https://www.elementfleet.com/fleet-services/vehicle-telematics)

---

Building the commercial layer for a hardware or deep tech platform? [See how I help technical founders with pricing, GTM, and unit economics](/consulting)—especially when the product is complex and the business model is not obvious.

*Want more frameworks like this? [Subscribe to the newsletter](/newsletter) for weekly pricing and monetization insights.*
