# Pricing Model Matchmaker (V1) — Tightened Spec (SaaS + AI/API)

## 0) Audience & purpose

**Audience:** Pre-seed to Series B founders; \~50% MVP/beta; low pricing-jargon fluency.

**Goal:** Collect \~**12–15** easy inputs and return a **ranked recommendation**:

- **Primary pricing model** (+ optional secondary)
- **Headline value metric** (+ optional secondary meter)
- **GTM wrapper** (Freemium vs Free Trial vs None)
- **2–4 implementation notes** (allowances, caps, commits, tiers)
- **Launch now** vs **Evolve later** (esp. MVP-stage)

---

## 1) MVP-friendly UX rules

- Every question includes plain language + examples + **Not sure**.
- If user selects **Not sure**, show a 1-line hint: “Guess based on your target customer or closest competitors.”
- Track **Not sure count**. If **4+**:
  - Bias toward **simple launch** models (SUB\_TIERED / USAGE / HYBRID)
  - Avoid recommending **OUTCOME** as **primary**
  - Add a **Measure-next checklist** (2–4 items)

---

## 2) Candidates & score maps (normalized)

### 2.1 Pricing model candidates (scored in `model_score`)

- **SUB\_TIERED** — Subscription with tiers/plans
- **SEAT** — Seat-based subscription (named or active)
- **USAGE** — Usage-based pay-as-you-go
- **HYBRID** — Base subscription + usage overage/bundles
- **CREDITS** — Credits / drawdown (commit-to-consume)
- **TXN** — Transaction-based (per discrete event)
- **OUTCOME** — Outcome/performance-based (usually with base fee)

### 2.2 Metric candidates (scored in `metric_score`)

**Access / org:** SEATS, ACTIVE\_SEATS, WORKSPACE

**API & AI consumption:** API\_CALLS, TOKENS, COMPUTE, AGENT\_ACTIONS

**Data platform:** EVENTS, RECORDS, STORAGE\_GB, QUERIES

**Automation / workflow:** RUNS, DOCS, TASKS\_TICKETS

**Transactions / commerce-like:** TXN\_UNITS, TAKE\_RATE

**Outcome metrics:** OUTCOME\_\$, OUTCOME\_TIME

### 2.3 Wrapper candidates (selected in `wrapper_score`)

- **FREEMIUM**
- **FREE\_TRIAL**
- **NONE**

> **Important:** Wrapper does **not** compete with pricing model selection.

---

## 3) Output schema

Return:

- **Primary model:** {model\_id}
- **Secondary model (optional):** {model\_id}
- **Wrapper:** {FREEMIUM | FREE\_TRIAL | NONE}
- **Headline metric:** {metric\_id}
- **Secondary meter (optional):** {metric\_id}
- **Launch now:** simplest defensible first pricing page
- **Evolve later:** upgrade path once data/procurement/enterprise asks arrive
- **Why this fits (3 bullets)**
- **Watch-outs (2 bullets)**
- **Starter packaging suggestion** (plans/allowances/minimums/commits)
- **Implementation notes (2–4 bullets)**
- **Measure-next checklist (2–4 bullets)** *(only if confidence Medium/Low)*

---

## 4) Quiz flow (tight V1: \~12–15 questions)

> **UI copy rule:** Keep every question to: **(1) 1-sentence prompt, (2) 1–2 lines of plain-language help, (3) examples.** Avoid pricing jargon. Always include **Not sure**.

### Always ask (Core 7)

#### P0 — Stage (how far along are you?)

**Prompt:** Where are you today?

Help: This helps us recommend a model that’s realistic to launch now vs later.

Options:

- A) **Pre-revenue** — MVP/beta, no paying customers yet
- B) **Early revenue** — a few paying customers (often < \$10k MRR or < 20 customers)
- C) **Growing** — repeatable sales and expansion (often \$10k–\$100k MRR or 20–200 customers)
- D) **Scaling** — Series A/B motion or enterprise pipeline (often > \$100k MRR or 200+ customers)
- E) **Not sure**

Examples: “We have pilots but no paying users” → A. “A handful of SMBs pay monthly” → B.

---

#### P1 — First paying customers & how they buy

**Prompt:** Who are your first *paying* customers likely to be?

Help: Different buyers expect different billing styles (card vs invoice/PO) and different pricing complexity.

Options:

- A) **Individuals / prosumers** — self-serve, pay by card
- B) **Small teams** — self-serve, pay by card
- C) **Teams with light sales** — may want a demo, still buys fast
- D) **Mid-market / enterprise** — security review, procurement, invoice/PO, annual contracts
- E) **Not sure**

Examples: “Indie developers” → A/B. “IT/security review + vendor onboarding” → D.

---

#### P4 — Do you pay more when customers use more? (variable cost)

**Prompt:** When customers use the product more, do your costs go up noticeably?

Help: If every extra use costs you money, you usually need limits, overages, or commits.

Options:

- A) **High** — each extra unit costs real money (LLM tokens, GPU time, SMS, storage, 3rd‑party API fees)
- B) **Medium** — some costs scale, but not dramatically
- C) **Low** — costs are mostly fixed; extra usage is cheap
- D) **Not sure**

Examples: “We pay per token / per GPU minute” → High. “Mostly fixed hosting + support” → Low.

---

#### Q0 — Product type (pick the closest)

**Prompt:** What do customers mostly buy from you?

Help: This routes to a few targeted questions.

Options:

- A) **API / developer service** — you sell endpoints/SDKs developers integrate
- B) **SaaS app for teams** — people log into a UI to do recurring work
- C) **Data platform / analytics** — ingest/store/query data (events, logs, warehouses)
- D) **Automation / agent** — the product completes tasks/work on the user’s behalf
- E) **Not sure**

Examples: “Embeddings/inference API” → A. “CRM/workflow tool” → B. “Event pipeline/warehouse” → C. “Ticket triage agent” → D.

---

#### P3 — Time-to-value (self-serve vs needs a call)

**Prompt:** Can a new customer get real value *without* talking to you?

Help: This helps pick the right “try it” offer (trial/freemium vs demo-first).

Options:

- A) **Yes, in \~10 minutes** — sign up and see value fast
- B) **Yes, but it takes 1–7 days** — needs setup/integration but no sales call
- C) **No, it needs onboarding/sales** — customers usually need calls, training, or services
- D) **Not sure**

Examples: “Connect 1 integration and it works” → A/B. “We always run a pilot / onboarding” → C.

---

#### P5 — What grows first when customers love you?

**Prompt:** When a customer gets more value from your product, what usually increases first?

Help: This points to the cleanest thing to charge for.

Options:

- A) **More teammates** need access
- B) **More volume** processed (API calls, tokens, events, files, runs)
- C) **More workspaces/projects** (more teams, more environments)
- D) **Bigger outcomes** (save time, save cost, increase revenue)
- E) **Not sure**

Examples: “More people join the workspace” → A. “They send more events/calls” → B. “They add more clients/projects” → C.

---

#### P6 — Can you track usage per customer today? (billing readiness)

**Prompt:** Could you charge based on usage/volume *today* (or soon)?

Help: If you can’t reliably track usage per account yet, start simpler and evolve.

Options:

- A) **Ready now** — you already have strong logs/counters per customer
- B) **Soon** — you could build reliable tracking in \~1 month
- C) **Not ready** — you want the simplest pricing page first
- D) **Not sure**

Examples: “We can count API calls per workspace today” → A. “We don’t have per-account counters yet” → C.

---

### Conditional (ask only when triggered)

#### P7 — What do similar products charge by? (optional, low weight)

**Ask only if:** confidence is Medium/Low **or** the top-2 models are within 1 point.

**Prompt:** The closest competitors you know usually charge by…

Options:

- A) **Seats** (per user)
- B) **Plans** (Starter/Pro/Enterprise)
- C) **Usage** (pay-as-you-go)
- D) **Annual commit/credits**
- E) **Per transaction**
- F) **Not sure**

Examples: “Most dev tools show \$/seat” → Seats. “Infra tools show \$ per usage” → Usage.

---

#### F3 — Annual commit readiness (optional)

**Ask only if:** P1 = enterprise **or** HYBRID/CREDITS is in the top-2.

**Prompt:** Would you be comfortable selling an annual commitment (often with a discount)?

Help: Annual commitments are common for procurement-heavy buyers and predictable budgets.

Options:

- A) **Yes** — we want annual cash / procurement-friendly offers
- B) **Maybe later**
- C) **No** — keep monthly/pay-as-you-go
- D) **Not sure**

Examples: “Customers expect annual invoice/PO” → Yes. “We’re self-serve card-only” → No.

---

#### F4 — Biggest pricing fear (optional, pick ONE risk question for V1)

**Prompt:** What scares you more if you publish pricing?

Options:

- A) **Surprise bills** scare users away
- B) **Flat fees** lose money when usage spikes
- C) **Too complicated** pricing hurts conversion
- D) **Not sure**

Examples: “Our usage can spike 10×” → B. “Customers hate variable bills” → A.

---

### Path-specific (ask 3–4)

#### Path A — API / AI API (ask 3)

**A1 — Usage volatility (will bills swing?)**

**Prompt:** After a customer integrates your API, will usage be steady or can it spike?

Options:

- A) **Mostly steady** month to month
- B) **Some spikes** (seasonal launches, campaigns)
- C) **Very spiky** / hard to predict (viral bursts, unpredictable workloads)
- D) **Not sure**

Examples: “Tax season spikes” → B/C. “Always similar traffic” → A.

**A2 — Cleanest measurable unit (pick one)**

**Prompt:** Pick the unit you can explain in one sentence **and** measure from logs.

Options:

- **API requests** (calls)
- **Tokens** (input + output)
- **Compute time** (GPU‑seconds / minutes)
- **Events ingested**
- **Not sure**

Examples: “We already count requests per key” → API requests.

**A3 — How customers will budget you**

**Prompt:** How do you think customers prefer to budget for you?

Options:

- A) **Predictable monthly line item** (same-ish every month)
- B) **Variable bill is fine** (pay for what you use)
- C) **Annual commit is normal** (invoice/PO, budgets set annually)
- D) **Not sure**

Examples: “Enterprise infra budget” → C. “Startups comfortable with usage bills” → B.

---

#### Path B — SaaS app for teams (ask 3)

**B1 — Does value scale with number of people?**

**Prompt:** If a company adds more teammates, does your product become more valuable mainly because more people can use it?

Options:

- **Yes** / **Sometimes** / **No** / **Not sure**

Examples: “Everyone needs an account to do the job” → Yes. “Only a few power users matter” → No/Sometimes.

**B2 — Would usage pricing feel like a penalty?**

**Prompt:** Would customers feel punished if you charged by usage?

Help: Some things feel unfair to meter (logins, views, reads).

Options:

- **Yes** / **Somewhat** / **No** / **Not sure**

Examples: “Charging per login/view would cause complaints” → Yes.

**B5 — Seats vs active seats vs workspace (pick the closest today)**

**Prompt:** Which statement best matches how customers get value today?

Options:

- A) **Seats** — each person needs their own account to get value
- B) **Active seats** — many users are occasional; only active users should count
- C) **Workspace/org** — value is tied to the team/account, not individual logins
- D) **Not sure**

Examples: “10 collaborators but only 2 use daily” → Active seats. “Shared workspace is what matters” → Workspace.

---

#### Path C — Data platform / analytics (ask 3)

**C1 — What are customers mainly paying you for?**

**Prompt:** In plain terms, customers get the most value because they…

Options:

- A) **Send/ingest data** into you (events/logs/telemetry)
- B) **Store/retain data** over time (storage + retention window)
- C) **Query/compute on data** (queries, transformations, compute minutes)
- D) **It’s a mix / not sure**

Examples: “We’re an ingestion pipeline” → A. “We’re a storage/retention system” → B.

**C2 — What makes your costs go up when customers scale?**

**Prompt:** When a customer grows, what increases *your* costs the most?

Options:

- A) **Storage** grows
- B) **Compute/query** grows
- C) **Both** grow meaningfully
- D) **Costs barely change** as usage grows
- E) **Not sure**

Examples: “Compute-heavy transformations” → B/C. “Mostly fixed infra” → D.

**C4 — If you could show only ONE number on the pricing page…**

**Prompt:** What’s the one metric customers already understand best?

Options:

- **Events ingested** (data in)
- **Storage/retention** (data kept)
- **Queries/compute** (data used)
- **Not sure**

Examples: “Customers talk about ‘events per month’” → Events.

---

#### Path D — Automation / agent (ask 4)

**D1 — What does your product do that customers can count?**

**Prompt:** What’s the clearest unit of work your product completes?

Options:

- **Runs/workflows executed**
- **Documents processed**
- **Tickets/tasks completed**
- **Not sure**

Examples: “We process invoices” → Documents. “We resolve support tickets” → Tickets.

**D2 — Does it reduce humans needed?**

**Prompt:** If your product works, will customers need fewer humans doing the job?

Options:

- **Yes** / **Sometimes** / **No** / **Not sure**

Examples: “Replaces manual triage work” → Yes.

**D3 — Could outcome-based pricing be non-arguable?**

**Prompt:** If you charged based on results, could you prove the result with data **without arguments**?

Options:

- A) **Yes** — clear measurement and agreement
- B) **Partly** — might depend on customer setup
- C) **No** — results are too disputed/indirect
- D) **Not sure**

Examples: “We can verify ‘tickets resolved’ from systems of record” → Yes/Partly.

**D3b — How fast can you verify the outcome?**


**Prompt:** When can you usually confirm the result?

Options:

- A) **Within weeks** (fits a billing cycle)
- B) **Months/quarters**
- C) **Not sure**

Examples: “Cost savings proved after quarterly review” → B.

---

## 5) Scoring system (normalized + tightened)

### 5.1 Maintain three score maps

- `model_score[model_id]`
- `metric_score[metric_id]`
- `wrapper_score[wrapper_id]` *(or direct selection rules)*

### 5.2 Confidence score

- Initialize `confidence_score = 0`
- Each **Not sure**: `confidence_score -= 1`

Confidence tiers:

- **High:** >= -1
- **Medium:** -2 to -3
- **Low:** <= -4

Behavior:

- Medium/Low: emphasize **simpler launch plan** + **Measure-next checklist**.

### 5.3 Base scoring (Core)

#### P0 — Stage

- A: +SUB\_TIERED(2), +USAGE(1), +HYBRID(1), -OUTCOME(4), -CREDITS(1)
- B: +SUB\_TIERED(1), +HYBRID(1)
- C: +HYBRID(1), +CREDITS(1), +SUB\_TIERED(1)
- D: +CREDITS(2), +HYBRID(1), +SUB\_TIERED(1)

Rule: If P0=A, always output **Launch now** + **Evolve later**.

#### P1 — First buyer / buying process

- A: +SUB\_TIERED(2), +USAGE(1), -CREDITS(2), -SEAT(1)
- B: +USAGE(2), +SUB\_TIERED(1), +SEAT(1)
- C: +SUB\_TIERED(2), +HYBRID(1)
- D: +CREDITS(3), +HYBRID(2), +SUB\_TIERED(1)
- E: +HYBRID(1)

#### P4 — Variable cost

- A (High): +HYBRID(4), +USAGE(3), +CREDITS(2), -SUB\_TIERED(1)
- B (Med): +HYBRID(3), +USAGE(2)
- C (Low): +SUB\_TIERED(2), +SEAT(1)
- D: +HYBRID(2)

#### Q0 — Product type (light bias)

- API: +USAGE(1), +HYBRID(1)
- SaaS: +SUB\_TIERED(1), +SEAT(1)
- Data: +HYBRID(1), +CREDITS(1)
- Automation: +HYBRID(1), +TXN(1)

#### P3 — Time-to-value (also wrapper gate)

- A: wrapper\_self\_serve = strong
- B: wrapper\_self\_serve = medium
- C: wrapper\_self\_serve = weak
- D: wrapper\_self\_serve = medium

Model tweak if C (needs onboarding): +SUB\_TIERED(1), +HYBRID(1), +CREDITS(1)

#### P5 — Growth lever

Model:

- A: +SEAT(3)
- B: +USAGE(3), +HYBRID(2)
- C: +SUB\_TIERED(2)
- D: +OUTCOME(2), +HYBRID(2)
- E: +HYBRID(1)

Metric:

- A: +SEATS(2), +ACTIVE\_SEATS(1)
- B: +API\_CALLS(1), +TOKENS(1), +EVENTS(1), +RUNS(1)
- C: +WORKSPACE(2)
- D: +OUTCOME\_\$(1), +OUTCOME\_TIME(1)

#### P6 — Billing readiness

- A: +USAGE(1), +HYBRID(1)
- B: +HYBRID(1)
- C: +SUB\_TIERED(3), +SEAT(1)
- D: +SUB\_TIERED(1), +HYBRID(1)

### 5.4 Conditional scoring

#### P7 — Competitor expectation (low weight)

- Seats: +SEAT(1)
- Tiers: +SUB\_TIERED(1)
- Usage: +USAGE(1)
- Credits: +CREDITS(1)
- Per txn: +TXN(1)

#### F3 — Annual commit readiness

- Yes: +CREDITS(2), +HYBRID(1)
- Maybe later: +HYBRID(1)
- No: +USAGE(1), +SUB\_TIERED(1)
- Not sure: +HYBRID(1)

If P0=A and Yes selected: recommend annual as **optional add-on**, not required.

#### F4 — Biggest pricing fear

- Bill shock: +HYBRID(2), +CREDITS(1)
- Flat fee loses money: +USAGE(2), +HYBRID(2)
- Too complicated: +SUB\_TIERED(2)
- Not sure: +HYBRID(1)

---

## 6) Path scoring (by route)

### Path A — API / AI API

**A1 — Usage volatility**

- Predictable: +USAGE(2)
- Some spikes: +HYBRID(2)
- Very spiky: +CREDITS(2), +HYBRID(2)
- Not sure: +HYBRID(1)

Attach note trigger: If B/C/D → add **allowance + alerts + optional hard cap**.

**A2 — Cleanest unit (metric pick)**

- API calls: +API\_CALLS(5)
- Tokens: +TOKENS(5)
- Compute: +COMPUTE(5)
- Events: +EVENTS(5)
- Not sure: +API\_CALLS(2), +EVENTS(2)

**A3 — Budget style**

- Predictable monthly: +HYBRID(2), +SUB\_TIERED(1)
- Variable bill fine: +USAGE(2)
- Annual commit normal: +CREDITS(3), +HYBRID(1)
- Not sure: +HYBRID(1)

### Path B — SaaS app for teams

**B1 — Value scales with people**

- Yes: +SEAT(4)
- Sometimes: +SEAT(2), +SUB\_TIERED(2)
- No: +SUB\_TIERED(3)
- Not sure: +SUB\_TIERED(1), +SEAT(1)

**B2 — Usage feels punitive?**

- Yes: +SEAT(3)
- Somewhat: +SUB\_TIERED(2), +SEAT(1)
- No: +SUB\_TIERED(2), +HYBRID(1)
- Not sure: +SUB\_TIERED(1)

**B5 — Seat vs active seats vs workspace (metric pick)**

- Seats: +SEATS(5)
- Active seats: +ACTIVE\_SEATS(5)
- Workspace: +WORKSPACE(5)
- Not sure: +WORKSPACE(4), +SEATS(1)

### Path C — Data platform / analytics

**C1 — Value driver (metric bias)**

- Ingest: +EVENTS(5)
- Store: +STORAGE\_GB(5)
- Query/compute: +QUERIES(5), +COMPUTE(2)
- Mix/NS: +EVENTS(2), +STORAGE\_GB(2), +QUERIES(2)

**C2 — Cost drivers (model bias)**

- Storage: +HYBRID(3), +USAGE(2)
- Compute: +HYBRID(3), +USAGE(2)
- Both: +HYBRID(4), +CREDITS(2)
- Costs barely change: +SUB\_TIERED(2)
- Not sure: +HYBRID(2)

**C4 — ONE headline metric (metric pick)**

- Events: +EVENTS(5)
- Storage/retention: +STORAGE\_GB(5)
- Queries/compute: +QUERIES(5)
- Not sure: +EVENTS(2), +QUERIES(2)

Rule: If HYBRID/CREDITS wins, allow a **secondary meter** from the non-headline dimensions.

### Path D — Automation / agent

**D1 — Unit of work (metric pick)**

- Runs: +RUNS(5)
- Docs: +DOCS(5)
- Tickets/tasks: +TASKS\_TICKETS(5)
- Not sure: +RUNS(2), +DOCS(2)

**D2 — Reduces humans needed**

- Yes: -SEAT(3), +HYBRID(3), +TXN(2), +USAGE(2)
- Sometimes: -SEAT(1), +HYBRID(2)
- No: +SEAT(1)
- Not sure: +HYBRID(1)

**D3 — Outcome eligibility (verifiable)**

- Yes: +OUTCOME(5)
- Partially: +OUTCOME(2), +HYBRID(2)
- No: +TXN(3), +HYBRID(2)
- Not sure: +HYBRID(2)

**D3b — Time-to-outcome gate**

- Weeks: +OUTCOME(2)
- Months/quarters: -OUTCOME(4), +HYBRID(1)
- Not sure: -OUTCOME(2), +HYBRID(1)

---

## 7) Wrapper selection (gated, safer defaults)

Wrapper selection is **not scored as a model**.

### 7.1 Wrapper gating from P3

- If P3=C (needs onboarding/sales): wrapper defaults to **NONE** unless user explicitly selects otherwise in F1.
- Else: ask **F1**.

### 7.2 F1 — Free entry offer (ask only if P3 != C)

- A) Freemium (ongoing free tier)
- B) Free trial (7–14 days)
- C) None (demo-first / paid pilot)
- D) Not sure

**Wrapper rule**

- A → FREEMIUM (with strict caps)
- B → FREE\_TRIAL
- C → NONE
- D → FREE\_TRIAL

**Freemium safety override**

- If P4=High variable cost AND wrapper=FREEMIUM:
  - require strict caps/credits/allowance language + hard stop limits OR downgrade wrapper to FREE\_TRIAL.

---

## 8) Metric sanity check (SMP filter) — behind the scenes

After selecting the top metric, apply a lightweight filter:

- **Simple:** can explain in one sentence?
- **Measurable:** can meter reliably from logs (no disputes)?
- **Predictable:** will customers be able to anticipate bills?

If **Predictable** is weak (e.g., A1 spiky or F4 bill-shock):

- attach mandatory notes: **alerts + caps + included allowance**
- nudge toward HYBRID/CREDITS in tie-breaks (do not always override)

If **Measurable** is weak:

- downweight OUTCOME/TXN as primary; recommend as “Evolve later”

---

## 9) Selection rules & overrides

### 9.1 Primary model selection

- Primary = argmax(`model_score`).

### 9.2 Secondary model selection

Pick 2nd highest if:

- within **2 points**, OR
- a natural complement pair:
  - (USAGE ↔ HYBRID)
  - (HYBRID ↔ CREDITS)
  - (TXN ↔ HYBRID)

### 9.3 Headline metric selection

- Headline = argmax(`metric_score`) subject to primary model constraint:
  - SEAT → {SEATS, ACTIVE\_SEATS, WORKSPACE}
  - SUB\_TIERED → {WORKSPACE, SEATS} (+ caps if variable cost)
  - USAGE/HYBRID/CREDITS → consumption/work-unit metrics
  - TXN → {TXN\_UNITS, TAKE\_RATE}
  - OUTCOME → {OUTCOME\_\$, OUTCOME\_TIME} only if D3=Yes AND D3b=Weeks

Secondary meter rule:

- Only include if primary is HYBRID/CREDITS **and** runner-up metric is within 2 points OR is a standard second dimension (e.g., storage + compute).

### 9.4 Hard constraints / overrides

- If P4=High variable cost and Primary=SUB\_TIERED:

  - either (a) switch Primary to HYBRID **if HYBRID within 2 points**, else
  - (b) keep SUB\_TIERED but attach mandatory **hard caps/allowance + overage** note.

- If D2=Yes and Primary=SEAT:

  - apply -3 to SEAT and recompute primary.

- If D3 is not Yes OR D3b != Weeks:

  - OUTCOME cannot be Primary (can appear as **Evolve later**).

### 9.5 Launch now vs Evolve later

If P0=A **or** confidence is Low:

- **Launch now:** choose simplest defensible among top 2 models (prefer SUB\_TIERED, USAGE, HYBRID).
- **Evolve later:** natural upgrade path:
  - USAGE → HYBRID → CREDITS
  - SEAT → ACTIVE\_SEATS (or WORKSPACE if seat tax risk)
  - TXN → OUTCOME (only if outcome gates satisfied)

Also apply an “early-stage simplicity tie-break”:

- If P0=A and P4 != High and top-2 within 1 point → prefer SUB\_TIERED for Launch now.

---

## 10) Recommendation content library (templates)

### 10.1 Why-this-fits (3 bullets)

- **USAGE:** Aligns price to consumption; easy entry and expansion with customer growth.
- **HYBRID:** Budgetable while protecting margins; best when there’s baseline platform value + variable usage/cost.
- **CREDITS:** Procurement-friendly annual commits with flexible consumption; reduces bill shock.
- **SEAT:** Natural when access/identity/permissions drive value and collaboration is core.
- **SUB\_TIERED:** Best when you can fence features/limits across segments and create clear upgrade paths.
- **TXN:** Best when discrete business events map to value and are easy to count.
- **OUTCOME:** Best when KPI is verifiable, attributable, controllable, and fast enough to measure.

### 10.2 Watch-outs (2 bullets)

- **USAGE:** bill shock; forecasting; requires instrumentation.
- **HYBRID:** complexity creep; pick one primary growth lever and keep the meter simple.
- **CREDITS:** credit-to-unit confusion; needs clear drawdown + true-up.
- **SEAT:** can discourage invites; breaks for automation that reduces headcount.
- **SUB\_TIERED:** leakage across tiers; needs enforceable fences and honest plan differences.
- **TXN:** unit value variance; may need tiers/minimums.
- **OUTCOME:** disputes; long time-to-outcome; volatile results.

### 10.3 Implementation notes (auto-attach 2–4)

**Always attach for USAGE/HYBRID/TXN when risk indicates:**

- **Alerts + cap option** (bill shock / spiky usage)
- **Included allowance/bundle** (meter anxiety)

Other attachables:

- Allowance + overage (HYBRID)
- Volume tiers (wide customer variation)
- Annual commit/credits + true-up (CREDITS or F3=Yes)
- Active-seat definition (ACTIVE\_SEATS)
- Metering checklist (USAGE/TXN/OUTCOME)

### 10.4 Measure-next checklist (2–4, for Medium/Low confidence)

Pick based on selected model/metric:

- Track one clean usage counter (calls/events/runs/docs) and show it in-product.
- Track a cost proxy per account (tokens/compute/storage).
- Identify who buys (card vs procurement) and typical deal size.
- Define the upgrade trigger (what causes the jump to a higher tier/plan).

