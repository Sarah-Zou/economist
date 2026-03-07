import type { AnswerValue, AnswersMap, QuestionId, QuizQuestion, ScorerResponse } from '@/lib/matchmaker/types'

export const CORE_SEQUENCE: QuestionId[] = ['P0', 'P1', 'P4', 'Q0', 'P3', 'P5', 'P6']

export const PATH_BY_Q0: Record<'A' | 'B' | 'C' | 'D', QuestionId[]> = {
  A: ['A1', 'A2', 'A3'],
  B: ['B1', 'B2', 'B5'],
  C: ['C1', 'C2', 'C4'],
  D: ['D1', 'D2', 'D3', 'D3b']
}

export const QUESTION_BANK: Record<QuestionId, QuizQuestion> = {
  P0: {
    id: 'P0',
    prompt: 'Where are you today?',
    helpText: 'This helps us recommend a model that is realistic to launch now versus later.',
    examples: 'Examples: "We have pilots but no paying users" -> Pre-revenue. "A handful of SMBs pay monthly" -> Early revenue.',
    options: [
      { value: 'A', label: 'Pre-revenue — MVP/beta, no paying customers yet' },
      { value: 'B', label: 'Early revenue — a few paying customers (often < $10k MRR or < 20 customers)' },
      { value: 'C', label: 'Growing — repeatable sales and expansion (often $10k-$100k MRR or 20-200 customers)' },
      { value: 'D', label: 'Scaling — Series A/B motion or enterprise pipeline (often > $100k MRR or 200+ customers)' },
      { value: 'E', label: 'Not sure' }
    ]
  },
  P1: {
    id: 'P1',
    prompt: 'Who are your first paying customers likely to be?',
    helpText: 'Different buyers expect different billing complexity and buying motions.',
    examples: 'Examples: "Indie developers" -> Individuals/small teams. "Security review + invoice/PO" -> Mid-market/enterprise.',
    options: [
      { value: 'A', label: 'Individuals/prosumers — self-serve, pay by card' },
      { value: 'B', label: 'Small teams — self-serve, pay by card' },
      { value: 'C', label: 'Teams with light sales — may want a demo, still buys fast' },
      { value: 'D', label: 'Mid-market/enterprise — security review, procurement, invoice/PO, annual contracts' },
      { value: 'E', label: 'Not sure' }
    ]
  },
  P4: {
    id: 'P4',
    prompt: 'When customers use the product more, do your costs go up noticeably?',
    helpText: 'If extra use costs real money, pricing often needs limits, overages, or commits.',
    examples: 'Examples: "We pay per token/GPU minute" -> High. "Mostly fixed hosting and support" -> Low.',
    options: [
      { value: 'A', label: 'High — each extra unit costs real money (LLM tokens, GPU time, SMS, storage, 3rd-party API fees)' },
      { value: 'B', label: 'Medium — some costs scale, but not dramatically' },
      { value: 'C', label: 'Low — costs are mostly fixed; extra usage is cheap' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  Q0: {
    id: 'Q0',
    prompt: 'What do customers mostly buy from you?',
    helpText: 'This routes your quiz into a focused set of product-type questions.',
    examples: 'Examples: "Inference API" -> API. "Team workflow tool" -> SaaS. "Warehouse/events pipeline" -> Data.',
    options: [
      { value: 'A', label: 'API/developer service — you sell endpoints/SDKs developers integrate' },
      { value: 'B', label: 'SaaS app for teams — people log into a UI to do recurring work' },
      { value: 'C', label: 'Data platform/analytics — ingest, store, or query data (events, logs, warehouses)' },
      { value: 'D', label: 'Automation/agent — the product completes tasks/work on the user’s behalf' },
      { value: 'E', label: 'Not sure' }
    ]
  },
  P3: {
    id: 'P3',
    prompt: 'Can a new customer get real value without talking to you?',
    helpText: 'This decides whether trial/freemium is realistic or a demo-first path is safer.',
    examples: 'Examples: "Connect one integration and it works" -> Yes. "We always need onboarding calls" -> No.',
    options: [
      { value: 'A', label: 'Yes, in ~10 minutes — sign up and see value fast' },
      { value: 'B', label: 'Yes, but it takes 1-7 days — needs setup/integration but no sales call' },
      { value: 'C', label: 'No, it needs onboarding/sales — customers usually need calls, training, or services' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  P5: {
    id: 'P5',
    prompt: 'When customers get more value, what usually increases first?',
    helpText: 'This points to the cleanest thing to charge for on your pricing page.',
    examples: 'Examples: "More people join" -> Teammates. "They send more calls/events" -> Volume.',
    options: [
      { value: 'A', label: 'More teammates need access' },
      { value: 'B', label: 'More volume processed (API calls, tokens, events, files, runs)' },
      { value: 'C', label: 'More workspaces/projects (more teams, more environments)' },
      { value: 'D', label: 'Bigger outcomes (save time, save cost, increase revenue)' },
      { value: 'E', label: 'Not sure' }
    ]
  },
  P6: {
    id: 'P6',
    prompt: 'Could you charge based on usage/volume today (or soon)?',
    helpText: 'If usage tracking is not reliable yet, a simpler launch model is often safer.',
    examples: 'Examples: "We already count usage per account" -> Ready now. "No per-account counters yet" -> Not ready.',
    options: [
      { value: 'A', label: 'Ready now — you already have strong logs/counters per customer' },
      { value: 'B', label: 'Soon — you could build reliable tracking in ~1 month' },
      { value: 'C', label: 'Not ready — you want the simplest pricing page first' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  A1: {
    id: 'A1',
    prompt: 'After integration, will API usage be steady or can it spike?',
    helpText: 'This helps us tune for budgetability versus burst protection.',
    examples: 'Examples: "Tax-season or campaign spikes" -> Some spikes/very spiky. "Similar traffic monthly" -> Mostly steady.',
    options: [
      { value: 'A', label: 'Mostly steady month to month' },
      { value: 'B', label: 'Some spikes (seasonal launches, campaigns)' },
      { value: 'C', label: 'Very spiky/hard to predict (viral bursts, unpredictable workloads)' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  A2: {
    id: 'A2',
    prompt: 'Pick the unit you can explain in one sentence and measure from logs.',
    helpText: 'Choose the clearest unit your team can meter reliably today.',
    examples: 'Examples: "We count requests per API key" -> API requests. "We bill by input/output" -> Tokens.',
    options: [
      { value: 'A', label: 'API requests (calls)' },
      { value: 'B', label: 'Tokens (input + output)' },
      { value: 'C', label: 'Compute time (GPU-seconds/minutes)' },
      { value: 'D', label: 'Events ingested' },
      { value: 'E', label: 'Not sure' }
    ]
  },
  A3: {
    id: 'A3',
    prompt: 'How do you think customers prefer to budget for you?',
    helpText: 'Budget style strongly affects whether usage-only, hybrid, or commits fit best.',
    examples: 'Examples: "Enterprise infra budget" -> Annual commit. "Startup teams are okay with variable bills" -> Variable bill is fine.',
    options: [
      { value: 'A', label: 'Predictable monthly line item (same-ish every month)' },
      { value: 'B', label: 'Variable bill is fine (pay for what you use)' },
      { value: 'C', label: 'Annual commit is normal (invoice/PO, budgets set annually)' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  B1: {
    id: 'B1',
    prompt: 'If a company adds teammates, does value mainly rise because more people can use it?',
    helpText: 'This helps decide whether seat logic is natural or forced.',
    examples: 'Examples: "Everyone needs an account" -> Yes. "Only a few power users matter" -> No/Sometimes.',
    options: [
      { value: 'A', label: 'Yes' },
      { value: 'B', label: 'Sometimes' },
      { value: 'C', label: 'No' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  B2: {
    id: 'B2',
    prompt: 'Would customers feel punished if you charged by usage?',
    helpText: 'Some product actions feel unfair to meter and can hurt conversion.',
    examples: 'Examples: "Charging per login/view causes complaints" -> Yes.',
    options: [
      { value: 'A', label: 'Yes' },
      { value: 'B', label: 'Somewhat' },
      { value: 'C', label: 'No' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  B5: {
    id: 'B5',
    prompt: 'Which statement best matches how customers get value today?',
    helpText: 'Pick the closest access pattern your users would consider fair.',
    examples: 'Examples: "Many occasional users, few daily" -> Active seats. "Shared account value matters most" -> Workspace/org.',
    options: [
      { value: 'A', label: 'Seats — each person needs their own account to get value' },
      { value: 'B', label: 'Active seats — many users are occasional; only active users should count' },
      { value: 'C', label: 'Workspace/org — value is tied to the team/account, not individual logins' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  C1: {
    id: 'C1',
    prompt: 'In plain terms, customers get the most value because they...',
    helpText: 'This identifies the most credible headline metric for data products.',
    examples: 'Examples: "We are an ingestion pipeline" -> Send/ingest data. "We are retention/storage first" -> Store data.',
    options: [
      { value: 'A', label: 'Send/ingest data into you (events/logs/telemetry)' },
      { value: 'B', label: 'Store/retain data over time (storage + retention window)' },
      { value: 'C', label: 'Query/compute on data (queries, transformations, compute minutes)' },
      { value: 'D', label: 'It is a mix / Not sure' }
    ]
  },
  C2: {
    id: 'C2',
    prompt: 'When a customer grows, what increases your costs the most?',
    helpText: 'Cost pressure shapes whether usage, hybrid, or simpler packaging works.',
    examples: 'Examples: "Compute-heavy transformations" -> Compute/query. "Mostly fixed infra" -> Costs barely change.',
    options: [
      { value: 'A', label: 'Storage grows' },
      { value: 'B', label: 'Compute/query grows' },
      { value: 'C', label: 'Both grow meaningfully' },
      { value: 'D', label: 'Costs barely change as usage grows' },
      { value: 'E', label: 'Not sure' }
    ]
  },
  C4: {
    id: 'C4',
    prompt: 'If you could show only one number on your pricing page, which is it?',
    helpText: 'Pick the metric customers already understand without extra explanation.',
    examples: 'Examples: "Customers talk about events per month" -> Events. "Retention window and GB drive value" -> Storage/retention.',
    options: [
      { value: 'A', label: 'Events ingested (data in)' },
      { value: 'B', label: 'Storage/retention (data kept)' },
      { value: 'C', label: 'Queries/compute (data used)' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  D1: {
    id: 'D1',
    prompt: 'What is the clearest unit of work your product completes?',
    helpText: 'Choose one unit you can count clearly and explain quickly.',
    examples: 'Examples: "Invoice processing" -> Documents. "Support triage" -> Tickets/tasks.',
    options: [
      { value: 'A', label: 'Runs/workflows executed' },
      { value: 'B', label: 'Documents processed' },
      { value: 'C', label: 'Tickets or tasks completed' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  D2: {
    id: 'D2',
    prompt: 'If your product works, will customers need fewer humans doing the job?',
    helpText: 'This affects whether seat pricing conflicts with your value story.',
    examples: 'Examples: "We replace manual triage" -> Yes.',
    options: [
      { value: 'A', label: 'Yes' },
      { value: 'B', label: 'Sometimes' },
      { value: 'C', label: 'No' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  D3: {
    id: 'D3',
    prompt: 'If you priced on outcomes, could you prove results with data without arguments?',
    helpText: 'Outcome pricing only works when measurement is clear, agreed, and attributable.',
    examples: 'Examples: "Resolved tickets in system-of-record" -> Yes/Partly. "Result attribution is fuzzy" -> No.',
    options: [
      { value: 'A', label: 'Yes — clear measurement and agreement' },
      { value: 'B', label: 'Partly — might depend on customer setup' },
      { value: 'C', label: 'No — results are too disputed/indirect' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  D3b: {
    id: 'D3b',
    prompt: 'When can you usually confirm the outcome?',
    helpText: 'Faster verification supports cleaner billing and less pricing friction.',
    examples: 'Examples: "Verified monthly" -> Within weeks. "Needs quarterly review" -> Months/quarters.',
    options: [
      { value: 'A', label: 'Within weeks (fits a billing cycle)' },
      { value: 'B', label: 'Months or quarters' },
      { value: 'C', label: 'Not sure' }
    ]
  },
  W1: {
    id: 'W1',
    prompt: 'If someone used your product for free, could you keep costs under control with limits?',
    helpText: 'This is about variable costs (tokens/compute/telephony/storage) and how safely you can cap free usage.',
    examples: 'Examples: "A small free tier is fine" -> Yes. "Each use costs meaningful money" -> No.',
    options: [
      { value: 'A', label: 'Yes, easily — free users are cheap to serve' },
      { value: 'B', label: 'Yes, with strict limits — we can cap usage tightly (small allowance)' },
      { value: 'C', label: 'No — free usage would be too expensive or risky' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  W2: {
    id: 'W2',
    prompt: 'When someone tries your product, do they naturally invite teammates or share it at work?',
    helpText: 'Freemium works best when free users create more qualified users through collaboration or sharing.',
    examples: 'Examples: "Collaboration tools" -> Often. "Solo utilities" -> Rarely.',
    options: [
      { value: 'A', label: 'Often — invites/sharing is a normal part of using the product' },
      { value: 'B', label: 'Sometimes' },
      { value: 'C', label: 'Rarely — one user can get value alone' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  P7: {
    id: 'P7',
    prompt: 'The closest competitors you know usually charge by...',
    helpText: 'This is a low-weight tiebreaker when recommendation confidence is weaker.',
    examples: 'Examples: "Most dev tools are per-seat" -> Seats. "Infra players are usage-based" -> Usage.',
    options: [
      { value: 'A', label: 'Seats (per user)' },
      { value: 'B', label: 'Plans (Starter/Pro/Enterprise)' },
      { value: 'C', label: 'Usage (pay-as-you-go)' },
      { value: 'D', label: 'Annual commit/credits' },
      { value: 'E', label: 'Per transaction' },
      { value: 'F', label: 'Not sure' }
    ]
  },
  F3: {
    id: 'F3',
    prompt: 'Would you be comfortable selling an annual commitment (often with discount)?',
    helpText: 'Annual commits can fit procurement-heavy buyers and budget planning.',
    examples: 'Examples: "Customers expect annual invoice/PO" -> Yes. "We stay card-only self-serve" -> No.',
    options: [
      { value: 'A', label: 'Yes — we want annual cash/procurement-friendly offers' },
      { value: 'B', label: 'Maybe later' },
      { value: 'C', label: 'No — keep monthly/pay-as-you-go' },
      { value: 'D', label: 'Not sure' }
    ]
  },
  F4: {
    id: 'F4',
    prompt: 'What worries you more if you publish pricing?',
    helpText: 'This helps us bias implementation notes toward your biggest launch risk.',
    examples: 'Examples: "Usage can spike 10x" -> Flat fees lose money. "Customers hate variable bills" -> Surprise bills.',
    options: [
      { value: 'A', label: 'Surprise bills scare users away' },
      { value: 'B', label: 'Flat fees lose money when usage spikes' },
      { value: 'C', label: 'Too complicated pricing hurts conversion' },
      { value: 'D', label: 'Not sure' }
    ]
  }
}

/** Conditional questions (P7, F3, F4) that may be shown after main sequence; frontend uses this to avoid submitting until they are answered. */
export const CONDITIONAL_QUESTION_IDS: QuestionId[] = ['P7', 'F3', 'F4']

/** Returns conditional question IDs not yet answered; used to show conditional step without calling the API. */
export function getPendingConditionalIds(answers: AnswersMap): QuestionId[] {
  return CONDITIONAL_QUESTION_IDS.filter((id) => answers[id] === undefined || answers[id] === null)
}

export function buildMainSequence(answers: AnswersMap): QuestionId[] {
  const q0Answer = answers.Q0
  const pathQuestions: QuestionId[] =
    q0Answer && q0Answer in PATH_BY_Q0
      ? PATH_BY_Q0[q0Answer as 'A' | 'B' | 'C' | 'D']
      : q0Answer === 'E'
        ? PATH_BY_Q0.B
        : []
  const shouldAskWrapperInference = answers.P3 && answers.P3 !== 'C'
  const wrapperIds: QuestionId[] = shouldAskWrapperInference ? ['W1', 'W2'] : []
  return [...CORE_SEQUENCE, ...pathQuestions, ...wrapperIds]
}

export function isNotSureSelection(questionId: QuestionId, value?: AnswerValue) {
  if (!value) return false
  const question = QUESTION_BANK[questionId]
  const option = question.options.find((item) => item.value === value)
  if (!option) return false
  return option.label.toLowerCase().includes('not sure')
}

export function countNotSure(answers: AnswersMap) {
  return (Object.entries(answers) as [QuestionId, AnswerValue | undefined][])
    .filter(([questionId, value]) => isNotSureSelection(questionId, value))
    .length
}

export function normalizeFollowupIds(
  rawNeedFollowups: ScorerResponse['needFollowups'],
  rawFollowupIds: ScorerResponse['followupQuestionIds']
): QuestionId[] {
  const fromField = Array.isArray(rawFollowupIds) ? rawFollowupIds : []
  const fromNeed = Array.isArray(rawNeedFollowups) ? rawNeedFollowups : []
  const merged = [...fromField, ...fromNeed]
  const unique: QuestionId[] = []
  const seen = new Set<QuestionId>()
  for (const id of merged) {
    if (id in QUESTION_BANK && !seen.has(id)) {
      seen.add(id)
      unique.push(id)
    }
  }
  return unique
}

