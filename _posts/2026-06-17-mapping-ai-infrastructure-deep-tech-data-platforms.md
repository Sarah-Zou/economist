---
title: "Mapping the Emerging AI Infrastructure and Deep Tech Data Platforms"
date: 2026-06-17
author: Dr. Sarah Zou
description: "A founder's map of AI software infrastructure and deep tech data platforms—drawn by economics, not buzzwords—with segments, comparables, and the margin question for each."
image: "/assets/images/newsletter/1.2_header.png"
imageAlt: "Isometric illustration of interconnected AI and data infrastructure including cloud compute, data centers, satellites, global networks, industrial sensors, and data visualization layers."
canonical: "https://sarahzou.com/newsletter/mapping-ai-infrastructure-deep-tech-data-platforms"
tags:
  - AI Infrastructure
  - Deep Tech
  - Data Platforms
  - Pricing
  - Monetization
  - Startups
---

Most AI infrastructure maps start from the supply chain: chips, GPUs, networking, data centers, storage, cloud platforms, data systems, models, and applications. That view is useful for understanding where technical capacity comes from. It is less useful for founders trying to answer a more urgent question: **what kind of business am I actually building?**

A vector database and a satellite company have nothing in common until you look at how they make money. They are essentially the same business in different clothes: a proprietary or capital-intensive capability, delivered as a metered API or data product, where unit economics decide survival. The label hides it.

That is the reason for this map: not to create a complete encyclopedia of AI infrastructure, but to identify the emerging platform businesses whose success depends on commercial architecture.

So here is the map, drawn by economics instead of by buzzword. It gives an explicit test for what belongs on it, and names the companies in each segment so a founder can locate themselves and their nearest comparables.

## The defining thesis

**Inclusion test.** A company is on this map if it clears the four markers below.

1. **Sells a capability, not a finished job.** Customers build on it, composing your compute, model endpoint, storage, retrieval, data feed, or sensor readings into their own products.
2. **Consumption-linked economics.** Both cost and revenue scale with usage (tokens, gigabytes, compute-hours, API calls, square kilometers imaged, or miles of cable monitored), not with the number of seats.
3. **API or data-product delivery.** The product is bought by a developer or a data team, and it is metered.
4. **Proprietary or capital-intensive supply.** There is a real cost floor or moat behind the endpoint—GPUs, a satellite constellation, a sensor network, a labeled-data engine, a hard-won dataset. It is not "just software."

These four markers are why a company shipping tokens and a company shipping terabytes of imagery can be run with the same commercial discipline.

**What is deliberately excluded—and why.** Two large groups are left off, on purpose.

- **The heavy metal.** The firms that design chips (Nvidia, AMD, Cerebras), wire the networks (Broadcom), build the fast storage (VAST Data, WEKA), and run the hyperscale clouds (AWS, Azure, Google Cloud). These are real infrastructure, but their capital intensity and scale put them outside the "emerging" founder this map serves. They are suppliers and comparables, not the audience.
- **The mature data and machine-learning stack.** The warehouses (Databricks, Snowflake), the pipes (Confluent, Fivetran), and the older end-to-end machine-learning platforms (SageMaker). They are incumbents, not an emerging segment, but they are retained as primary comparables, because their filings and pricing pages are the best design documents in existence for everyone on the map.

Excluded as audience, kept as evidence.

## The map of three groups

What remains falls into three groups, running from the most software-like to the most physical, with one borderline case at the end.

- **Group A — AI software infrastructure:** software-margin, API-first companies built around models, compute, data, and the tools that watch them.
- **Group B — Deep-tech and physical-world data platforms:** companies whose product is data collected from the physical world (orbit, ground, atmosphere, etc.) with real hardware and capital behind it.
- **Group C — Application-layer AI with infrastructure-style economics:** an adjacent set of agent and copilot companies that are technically applications but whose unit economics behave like infrastructure.

![Infographic mapping three groups of emerging AI infrastructure and deep tech data platforms, with four inclusion criteria and deliberately excluded categories](/assets/images/newsletter/1.2_relationship.png)

## Group A: AI software infrastructure

These are the businesses most people mean by "AI infrastructure": software-margin, API-first, sold to developers and platform teams.

### A1. Inference-API platforms

Companies that let other people run, fine-tune, route, and serve models behind an endpoint: the model makers (OpenAI, Anthropic, Google, with Mistral, Cohere, AI21) and the independent serving layer (Together AI, Fireworks AI, Baseten, Replicate, Fal, OpenRouter, Anyscale).

- **Nearest reference:** Twilio, the original metered-API business.
- **Challenge:** defending margin when the model itself is a pass-through cost and a rival can undercut you tomorrow.

### A2. GPU clouds

Infrastructure that abstracts GPU access, orchestration, scaling, and deployment, whether capital-heavy "neoclouds" (CoreWeave, Lambda, Crusoe, Nebius, Nscale) or serverless tier (Modal, RunPod, Replicate, Baseten). The difference from A1 is what the customer brings: a model behind an endpoint, or their own model and code on rented compute, paying per GPU- or compute-hour.

- **Nearest reference:** the CoreWeave S-1 (2025), the first clean public look at "neocloud" economics.
- **Challenge:** GPU amortization and utilization risk, since idle GPUs are capital spending in a software costume.

### A3. Vector and knowledge stores

Systems that store, index, retrieve, and serve knowledge for AI applications, especially retrieval-augmented generation and semantic search. The vector-database leaders (Pinecone, Weaviate, Qdrant, Milvus / Zilliz, Chroma), sit alongside the Postgres-native option (pgvector) and a retrieval layer (Vectara, Contextual AI, LlamaIndex).

- **Nearest reference:** Snowflake and MongoDB.
- **Challenge:** an API alone is no moat.

### A4. Observability and evaluation tools

Tooling that helps teams debug, trace, monitor, evaluate, and improve LLM apps and agents—the operational layer for production AI. LangSmith, Arize (Phoenix), Langfuse, Weights & Biases (Weave), Braintrust, Helicone, and Galileo are representative.

- **Nearest reference:** Datadog, which turned monitoring into a meter that grows with the customer.
- **Challenge:** whether to price per seat or per usage, and how to prove ROI on something buyers treat as optional.

### A5. AI data engines

Companies that make the training and evaluation data, through labeling, human judgment, and synthetic generation: the human-data houses (Scale AI, Surge AI, Mercor, Labelbox, Snorkel AI, iMerit) beside the synthetic-data producers (Gretel, now Nvidia's; Mostly AI; Tonic).

- **Nearest reference:** the services-to-product margin path.
- **Challenge:** human-in-the-loop labor in COGS, lowering margins toward a services firm's, and whether the data itself is defensible.

### A6. Developer-API platforms

API-first products where developers adopt first and enterprise contracts drive monetization (Stripe, Twilio, Plaid, Algolia, Checkr, Persona, Mapbox). Most are not AI-native, and they are on this map for a specific reason: they are the mature template for consumption-priced, developer-led infrastructure GTM, and the comparables the rest of the playbook borrows from. Treat them as the reference class, not as AI companies.

- **Challenge they already solved:** how to convert free developer adoption into committed enterprise spend.

## Group B: Deep-tech and physical-world data platforms

Here the product is data extracted from the physical world, with real hardware and capital behind the endpoint. The commercial logic is the same—meter a proprietary capability—but the cost floor is heavier and the category newer.

### B1. Earth-observation platforms

Companies that turn proprietary satellite and geospatial data into feeds, analytics, and decisions: constellations (Planet Labs, Spire Global, ICEYE, Capella Space, BlackSky, Satellogic, Maxar) and aggregators that resell them (UP42, SkyFi, SkyWatch).

- **Nearest reference:** The Planet and Spire prospectuses from 2021 are rare public windows into the economics of owning satellites.
- **Challenge:** enormous up-front capex, and the work of converting raw pixels into a recurring, priced data product.

### B2. Industrial sensing platforms

Companies that convert hardware-based sensing into recurring data, monitoring, or infrastructure-as-a-service—the "hardware-plus-data" model. This ranges from connected-operations and machine-health platforms (Samsara, Augury, Tractian, Cognite) to specialist sensing built on fiber, photonics, and acoustics (Luna Innovations, Silixa, Prisma Photonics).

- **Nearest reference:** the hardware-plus-data business model itself, where a sensor or appliance is the wedge and the recurring data subscription is the business.
- **Challenge:** turning one-off hardware or project revenue into recurring data revenue, and amortizing the hardware honestly.

### B3. Weather, climate, and environmental APIs

Platforms that provide proprietary readings of the atmosphere: weather (Tomorrow.io, Meteomatics, Spire, Salient), climate risk (Jupiter Intelligence, ClimateAi, Mitiga Solutions), and air-quality and environmental data players.

- **Challenge:** defending a data moat against free public baselines (NOAA, ECMWF, Copernicus), and choosing between an API and a dashboard as the unit of sale.

## Group C: Application-layer AI with infrastructure-style economics

The companies in this group are, strictly, applications: they sell a complete outcome (e.g., a resolved support ticket, a closed sales task, a piece of written code) to a line-of-business buyer. They are on this map because their unit economics behave like infrastructure. When their cost rises with every outcome they produce, the founder faces the same questions an infrastructure founder does: what is the value metric, where is the cost floor, and how do you price usage or outcomes without giving away margin or trust?

The clearest examples are the outcome-priced customer-support agents: priced per resolution, Sierra, Decagon, Fin, Crescendo, and meter coding by the use, Cursor, Cognition's Devin, Replit. Vertical outcome businesses in law (Harvey, EvenUp), sales (11x), and health (Abridge) belong here too.

The boundary matters. These are not the core audience of this map and most of the application playbook applies to them. But when the conversation turns to pricing architecture and unit economics, they stand inside the infrastructure discipline, which is why they belong at the edge and not off it.

## Place yourself

Find the row whose signal matches your core product, and read across to the segment, the metric you should meter, your nearest public comp, and the question that will decide your margin.

![Segment locator table matching core product descriptions to AI infrastructure segments, metering units, nearest public comps, and margin questions](/assets/images/newsletter/1.2_table_segment_locator.png)

## The shared commercial problem

Every company on this map faces the same four questions, and generic software advice does not apply here.

1. **The value metric:** the one thing you meter and bill.
2. **The cost floor:** your real cost of goods, modeled honestly instead of assumed away.
3. **Usage or outcome pricing:** how to charge for what the customer consumes without leaving money or trust on the table.
4. **Capability-first selling and funding:** how to sell and fund a capability when the category has no name yet and the buyer has no budget line for it.

Those four questions are the spine of everything that follows in this series: the buyer and the value metric, the cost floor, the pricing, the packaging and go-to-market, and the story that makes the company fundable.

### How to use this map

First place yourself in one segment, or name your hybrid honestly. Then pull the right comparison that shares your economics, not your industry; an industrial-sensing founder often learns more from Twilio's metering than from a competitor's website. Finally, borrow the matching pricing and metric pattern, and flag every place you are importing an application-playbook default for correction.

The companion classifier in [Why AI Infrastructure Is Not an AI Application Business](/newsletter/ai-infrastructure-not-ai-app) is where to start; this map tells you which kind of infrastructure you are once you know you are one.

For pricing mechanics by segment, see [monetization models](/wiki/pricing/models-and-metering/monetization-model) and [usage-based pricing](/wiki/pricing/models-and-metering/usage-based-pricing).

---

Building the commercial layer for an AI infrastructure or deep tech data platform? [See how I help technical founders with pricing, GTM, and unit economics](/consulting)—especially when the product is complex and the business model is not obvious.

*Want more frameworks like this? [Subscribe to the newsletter](/newsletter) for weekly pricing and monetization insights.*
