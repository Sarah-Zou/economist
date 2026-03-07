'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, ExternalLink, HelpCircle, Mail, RotateCcw } from 'lucide-react'
import { MATCHMAKER_ENDPOINT, postMatchmakerAnswers, postMatchmakerReportDraft } from '@/lib/matchmaker/api'
import {
  buildMainSequence,
  countNotSure,
  getPendingConditionalIds,
  isNotSureSelection,
  normalizeFollowupIds,
  QUESTION_BANK
} from '@/lib/matchmaker/questions'
import type { AnswerValue, AnswersMap, MatchmakerResult, QuestionId } from '@/lib/matchmaker/types'

/** Plain-English labels and one-line "What it means" from reference doc */
const MODEL_LABELS: Record<string, string> = {
  SUB_TIERED: 'Subscription (tiered plans)',
  SEAT: 'Seat-based subscription',
  USAGE: 'Usage-based (pay-as-you-go)',
  HYBRID: 'Base subscription + usage overage',
  CREDITS: 'Credits / drawdown (commit-to-consume)',
  TXN: 'Transaction-based (per discrete event)',
  OUTCOME: 'Outcome / performance-based'
}

/** Two "Why this fits" bullets per model — from reference doc */
const MODEL_WHY_FITS_BULLETS: Record<string, [string, string]> = {
  SUB_TIERED: [
    'Based on your answers, customers will rely on your product on an ongoing basis — so a predictable recurring plan feels natural (and easy to budget).',
    'You indicated your value is mainly about capability and workflow, not one perfect "thing to count." Tiers communicate that value clearly without over-metering.'
  ],
  SEAT: [
    'Your answers suggest value grows as more teammates participate (collaboration, adoption, internal rollout). Seats track that growth directly.',
    'You surfaced needs like access control, permissions, or accountability. Seat pricing maps cleanly to "who gets access" and is easy to manage.'
  ],
  USAGE: [
    'Your inputs point to a clear, countable unit customers can understand and verify — which makes pay-for-what-you-use feel fair.',
    'You want customers to start small and scale as they succeed. Usage pricing grows automatically with adoption without renegotiation.'
  ],
  HYBRID: [
    'Your answers suggest you need predictable revenue and you have meaningful variable costs. A base fee covers the platform value; overages pass through the variable part.',
    'You described usage that can spike or be seasonal. Hybrid reduces the "overpay in slow months" problem while still capturing upside when usage grows.'
  ],
  CREDITS: [
    'Your answers signal a buyer who cares about budget control (procurement/annual planning). Credits turn usage into a pre-approved spend envelope.',
    'You indicated usage is variable and hard to forecast month-to-month. A credit bucket reduces invoice surprises while keeping flexibility.'
  ],
  TXN: [
    'Your product produces a discrete, auditable value moment (a completed event). Charging per transaction feels intuitive and fair.',
    'Your answers imply customers can reason in unit economics ("we can pay $X per ___"). That makes adoption and internal justification easier.'
  ],
  OUTCOME: [
    'Your answers suggest success can be measured with a concrete business KPI (not just product usage). That\'s the foundation for outcome pricing.',
    'You indicated the result is attributable enough to your product (and you control key drivers) to avoid constant attribution debates.'
  ]
}

/** One "Watch-outs" bullet per model — from reference doc */
const MODEL_WATCH_OUTS: Record<string, string> = {
  SUB_TIERED: 'If usage or costs vary wildly across customers, flat plans can create cross-subsidy (small customers fund whales) and margin surprises.',
  SEAT: 'Seat-tax trap: customers restrict access to control cost, which reduces adoption and value.',
  USAGE: 'Taxi-meter effect: customers feel punished for using the product and throttle usage.',
  HYBRID: 'Too many meters (seats + storage + API calls) creates billing confusion.',
  CREDITS: 'Credits can be confusing if "1 credit" doesn\'t map cleanly to something customers recognize.',
  TXN: 'Edge cases create disputes (retries, duplicates, refunds, fraud) unless counting rules are explicit.',
  OUTCOME: 'Attribution fights: customers claim something else caused the improvement.'
}

/** One "Evolve later" sentence per model — from reference doc (Switch to X if…) */
const MODEL_EVOLVE_LATER: Record<string, string> = {
  SUB_TIERED: 'Consider hybrid (base + overages) when variable costs scale with usage or usage variance is high; or usage-based/transaction-based if you have a simple value counter.',
  SEAT: 'Consider workspace or account pricing if value is tied to shared data and workflows; or usage-based/hybrid if value scales with volume more than headcount.',
  USAGE: 'Consider hybrid (base + overages) if customers or FP&A need more predictability; or credits/drawdown if enterprise wants annual commit.',
  HYBRID: 'Consider pure usage-based if the base fee is the main adoption blocker; or credits/drawdown if customers demand annual commits.',
  CREDITS: 'Consider usage-based if you\'re mostly self-serve and buyers prefer monthly variability; or hybrid if you need a stable platform fee plus flexibility.',
  TXN: 'Consider usage-based if consumption is more continuous than discrete; or outcome-based if you can reliably price on a verified business result.',
  OUTCOME: 'Consider hybrid first if measurement or attribution isn\'t airtight yet; or usage/transaction-based as a simpler proxy while you collect outcome data.'
}

const WRAPPER_LABELS: Record<string, string> = {
  FREEMIUM: 'Freemium',
  FREE_TRIAL: 'Free trial',
  NONE: 'No free tier / demo-first'
}

/** One "Why this fits" bullet per wrapper — from reference doc */
const WRAPPER_WHY_FITS: Record<string, string> = {
  FREEMIUM: 'Your answers suggest users can reach value quickly and your cost to serve a free user is manageable — making free access a sustainable acquisition lever.',
  FREE_TRIAL: 'Your answers imply prospects need to experience the product before committing — but an indefinite free tier would be too costly or risky for you.',
  NONE: 'Your answers point to higher-touch selling (security/compliance, complex onboarding, or expensive compute). Open free access would create downside without real signal.'
}

const METRIC_LABELS: Record<string, string> = {
  SEATS: 'Seats',
  ACTIVE_SEATS: 'Active seats',
  WORKSPACE: 'Workspace / account',
  API_CALLS: 'API calls',
  TOKENS: 'Tokens',
  COMPUTE: 'Compute time',
  AGENT_ACTIONS: 'Agent actions',
  EVENTS: 'Events ingested',
  RECORDS: 'Records',
  STORAGE_GB: 'Storage (GB)',
  QUERIES: 'Queries',
  RUNS: 'Runs/workflows',
  DOCS: 'Documents processed',
  TASKS_TICKETS: 'Tasks / tickets completed',
  TXN_UNITS: 'Transaction units',
  TAKE_RATE: 'Take rate',
  OUTCOME_$: 'Outcome ($ value)',
  OUTCOME_TIME: 'Outcome (time saved)'
}

const METRIC_WHAT_IT_MEANS: Record<string, string> = {
  SEATS: 'Total paid user licenses. Best when value scales with team adoption and permissions.',
  ACTIVE_SEATS: 'Seats that meet a clear activity threshold (e.g. used in last 30 days). Reduces “paying for unused seats” friction.',
  WORKSPACE: 'Per account/org/workspace. Good when value comes from shared data and workflows more than individual users.',
  API_CALLS: 'Count of API requests. Good when customers understand “requests” and usage maps to value and cost.',
  TOKENS: 'LLM input + output tokens. Good when cost and value scale with model usage and you can show token dashboards.',
  COMPUTE: 'Compute time/units (e.g. GPU-seconds). Good when infrastructure cost is the main driver.',
  AGENT_ACTIONS: 'Count of agent-completed actions. Good when the product does work on behalf of users.',
  EVENTS: 'Events/logs/messages ingested. Good when ingest volume is the main scaling driver.',
  RECORDS: 'Rows/objects processed or stored. Good when value and cost scale with dataset size.',
  STORAGE_GB: 'GB stored. Good when retention and storage are the core value driver.',
  QUERIES: 'Queries executed. Good when value is about analysis/compute and customers can predict volume.',
  RUNS: 'Workflow/automation runs. Good when customers pay for work completed by the system.',
  DOCS: 'Documents processed or generated. Good for document AI and back-office automation.',
  TASKS_TICKETS: 'Tasks or tickets processed/resolved. Strong when “ticket resolved” is a clear, auditable value moment.',
  TXN_UNITS: 'Discrete transactions (payments, bookings, etc.). Works when the event is cleanly countable.',
  TAKE_RATE: '% of dollars processed or GMV. Best for marketplaces or payment-like flows.',
  OUTCOME_$: 'Dollars saved or earned (verified). Best when attribution is strong and both sides agree on the math.',
  OUTCOME_TIME: 'Time saved or uptime gained (verified). Best when the time metric is objective and tied to real economics.'
}

/** When to choose this model instead — from plain-English reference (Switch to X if…) */
const MODEL_ALTERNATIVE_REASONS: Record<string, string[]> = {
  SUB_TIERED: [
    'Variable costs or usage variance is high (tokens, compute, storage) — hybrid or usage-based may fit better.',
    'You have a simple, auditable value counter customers already understand — consider usage-based or transaction-based.'
  ],
  SEAT: [
    'Value is tied to shared data and workflows more than individual logins — consider workspace/account pricing.',
    'Value scales with volume processed (tokens, events, runs) more than headcount — consider usage-based or hybrid.'
  ],
  USAGE: [
    'Customers or FP&A need more predictability — hybrid (base + overages) can help.',
    'Enterprise buyers want annual PO/commit while keeping flexible consumption — consider credits/drawdown.'
  ],
  HYBRID: [
    'Baseline value is low and the base fee is the main adoption blocker — consider pure usage-based.',
    'Customers demand annual commits or hard spend control — consider credits/drawdown.'
  ],
  CREDITS: [
    'You’re mostly self-serve and buyers prefer monthly variability — consider usage-based.',
    'You need a stable platform fee plus flexible consumption — consider hybrid.'
  ],
  TXN: [
    'Consumption is more continuous (GB, minutes, compute) than discrete — consider usage-based.',
    'You can reliably price on a verified business result — consider outcome-based.'
  ],
  OUTCOME: [
    'Outcomes are promising but measurement or attribution isn’t airtight yet — consider hybrid first.',
    'Outcomes are too long-cycle or noisy to bill in a normal period — consider tiered or seat-based.'
  ]
}

type MatchmakerQuizProps = {
  onRestart?: () => void
}

type GtagFn = (command: 'event', eventName: string, params?: Record<string, unknown>) => void

type UTMData = {
  source: string
  medium: string
  campaign: string
  term: string
  content: string
}

const UTM_STORAGE_KEY = 'matchmaker_utm_v1'
const NS = new Set(['NS', 'NOT_SURE', 'not_sure', 'Not sure', ''])

/** Normalize Apps Script snake_case result to camelCase for UI */
function normalizeResultKeys<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    const camel = k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
    out[camel] = v
  }
  return out
}
const EMPTY_UTM: UTMData = {
  source: '',
  medium: '',
  campaign: '',
  term: '',
  content: ''
}

function getGtag() {
  if (typeof window === 'undefined') return null
  const maybeGtag = (window as Window & { gtag?: GtagFn }).gtag
  return typeof maybeGtag === 'function' ? maybeGtag : null
}

export function trackQuizStart() {
  if (typeof window === 'undefined') return
  const gtag = getGtag()
  if (gtag) {
    gtag('event', 'matchmaker_quiz_start', {
      tool: 'pricing_model_matchmaker'
    })
  }
  window.dispatchEvent(new CustomEvent('matchmaker_quiz_start'))
}

export function trackQuizComplete() {
  if (typeof window === 'undefined') return
  const gtag = getGtag()
  if (gtag) {
    gtag('event', 'matchmaker_quiz_complete', {
      tool: 'pricing_model_matchmaker'
    })
  }
  window.dispatchEvent(new CustomEvent('matchmaker_quiz_complete'))
}

export function trackLeadSubmit(payload?: { pass?: 'initial' | 'followup'; notSureCount?: number }) {
  if (typeof window === 'undefined') return
  const gtag = getGtag()
  if (gtag) {
    gtag('event', 'matchmaker_lead_submit', {
      tool: 'pricing_model_matchmaker',
      pass: payload?.pass,
      not_sure_count: payload?.notSureCount
    })
  }
  window.dispatchEvent(new CustomEvent('matchmaker_lead_submit'))
}

function labelForValue(map: Record<string, string>, rawValue?: string | null) {
  if (!rawValue) return null
  return map[rawValue] ?? rawValue
}

function splitOptionParts(label: string) {
  const parts = label.split(' — ')
  if (parts.length <= 1) {
    return { title: label, detail: '' }
  }
  return { title: parts[0], detail: parts.slice(1).join(' — ') }
}

function splitIntoBulletPoints(items: string[], maxItems = 2) {
  return items
    .flatMap((item) =>
      item
        .split(';')
        .map((part) => part.trim())
        .filter(Boolean)
    )
    .map((part) => {
      if (!part) return part
      const capped = part.charAt(0).toUpperCase() + part.slice(1)
      return /[.!?]$/.test(capped) ? capped : `${capped}.`
    })
    .slice(0, maxItems)
}

function toPlainEnglishLine(text: string) {
  const simplified = text
    .replace(/[;]+/g, '. ')
    .replace(/\s*\/\s*/g, ' and ')
    .replace(/\bKPI\b/g, 'result')
    .replace(/\bprocurement\b/gi, 'finance review')
    .replace(/\btrue-up\b/gi, 'end-of-period adjustment')
    .replace(/\s+/g, ' ')
    .trim()

  if (!simplified) return ''

  const sentenceParts = simplified.split(/([.!?]+)/)
  const sentences: string[] = []
  for (let i = 0; i < sentenceParts.length; i += 2) {
    const sentence = (sentenceParts[i] || '').trim()
    const punct = (sentenceParts[i + 1] || '').trim()
    if (!sentence) continue
    const capped = sentence.charAt(0).toUpperCase() + sentence.slice(1)
    sentences.push(punct ? `${capped}${punct}` : `${capped}.`)
  }
  return sentences.join(' ').trim()
}

function toSentenceCaseSingle(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return ''
  const lower = trimmed.toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

/** Remove wrapper sentence from guidance text so "What to do next" stays action-oriented */
function sanitizeWrapperInText(text: string, currentWrapper: string): string {
  if (!text || typeof text !== 'string') return text
  const label = WRAPPER_LABELS[currentWrapper] ?? currentWrapper
  const withoutWrapperSentence = text
    .replace(
      /(^|[.\n\r]\s*)Wrapper:\s*(FREEMIUM|FREE_TRIAL|NONE|Freemium|Free trial|No free tier \/ demo-first|None)\.?\s*/gi,
      '$1'
    )
    .replace(/\bWrapper:\s*(FREEMIUM|FREE_TRIAL|NONE)\b/gi, '')
    .replace(/\bWrapper:\s*[^.\n\r]+\.?/gi, '')

  return withoutWrapperSentence
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+\./g, '.')
    .trim()
}

function generateSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function loadPersistedUtm() {
  if (typeof window === 'undefined') return EMPTY_UTM

  const params = new URLSearchParams(window.location.search)
  const fromUrl: UTMData = {
    source: params.get('utm_source') ?? '',
    medium: params.get('utm_medium') ?? '',
    campaign: params.get('utm_campaign') ?? '',
    term: params.get('utm_term') ?? '',
    content: params.get('utm_content') ?? ''
  }

  const hasUrlUtm = Object.values(fromUrl).some(Boolean)

  let fromStorage: UTMData = EMPTY_UTM
  const raw = sessionStorage.getItem(UTM_STORAGE_KEY)
  if (raw) {
    try {
      fromStorage = JSON.parse(raw) as UTMData
    } catch {
      fromStorage = EMPTY_UTM
    }
  }

  const merged = hasUrlUtm ? fromUrl : fromStorage
  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged))
  return merged
}

/** Maps option letters to tokens expected by Apps Script (snake_case / semantic values). */
const ANSWER_TO_API: Partial<Record<QuestionId, Partial<Record<AnswerValue, string>>>> = {
  A2: { A: 'API_CALLS', B: 'TOKENS', C: 'COMPUTE', D: 'EVENTS', E: 'NS', F: 'NS' },
  P7: { A: 'SEATS', B: 'TIERS', C: 'USAGE', D: 'CREDITS', E: 'TXN', F: 'NS' },
  B1: { A: 'YES', B: 'SOMETIMES', C: 'NO', D: 'NS' },
  B2: { A: 'YES', B: 'SOMEWHAT', C: 'NO', D: 'NS' },
  B5: { A: 'SEATS', B: 'ACTIVE_SEATS', C: 'WORKSPACE', D: 'NS' },
  C1: { A: 'INGEST', B: 'STORE', C: 'QUERY', D: 'NS' },
  C2: { A: 'STORAGE', B: 'COMPUTE', C: 'BOTH', D: 'FIXED', E: 'NS' },
  C4: { A: 'EVENTS', B: 'STORAGE_GB', C: 'QUERIES', D: 'NS' },
  D1: { A: 'RUNS', B: 'DOCS', C: 'TASKS_TICKETS', D: 'NS' },
  D2: { A: 'YES', B: 'SOMETIMES', C: 'NO', D: 'NS' },
  D3: { A: 'YES', B: 'PARTLY', C: 'NO', D: 'NS' },
  D3b: { A: 'WEEKS', B: 'MONTHS', C: 'NS' }
}

function mapAnswerToApiValue(questionId: QuestionId, value: AnswerValue): string {
  if (isNotSureSelection(questionId, value)) {
    return 'NS'
  }

  const map = ANSWER_TO_API[questionId]
  if (map) {
    const mapped = map[value]
    return NS.has(mapped ?? '') ? 'NS' : (mapped ?? value)
  }

  return NS.has(value) ? 'NS' : value
}

function buildApiAnswers(answers: AnswersMap): Record<QuestionId, string> {
  const payloadAnswers = {} as Record<QuestionId, string>
  for (const [questionId, value] of Object.entries(answers) as [QuestionId, AnswerValue | undefined][]) {
    if (!value) continue
    payloadAnswers[questionId] = mapAnswerToApiValue(questionId, value)
  }
  return payloadAnswers
}

function resolveWrapper(answers: AnswersMap, notSureCount: number) {
  if (notSureCount >= 4 && answers.P3 !== 'C') {
    return {
      wrapper: 'FREE_TRIAL',
      wasAutoDowngraded: true,
      safetyNote: 'Low confidence from many "Not sure" answers, so wrapper defaults to Free trial.'
    }
  }

  if (answers.P3 === 'C') {
    return {
      wrapper: 'NONE',
      wasAutoDowngraded: false,
      safetyNote: undefined
    }
  }

  if (answers.W1 === 'C') {
    return {
      wrapper: 'FREE_TRIAL',
      wasAutoDowngraded: false,
      safetyNote:
        answers.P4 === 'A'
          ? 'Free usage is too costly, so wrapper is Free trial with strict trial caps and limits.'
          : 'Free usage is too costly, so wrapper defaults to Free trial.'
    }
  }

  const freemiumEligible =
    answers.P3 === 'A' && (answers.W1 === 'A' || answers.W1 === 'B') && answers.W2 === 'A'

  if (freemiumEligible) {
    if (answers.P4 === 'A' && answers.W1 !== 'B') {
      return {
        wrapper: 'FREE_TRIAL',
        wasAutoDowngraded: true,
        safetyNote:
          'High variable cost requires strict freemium caps; wrapper is downgraded to Free trial unless caps are very tight.'
      }
    }
    return {
      wrapper: 'FREEMIUM',
      wasAutoDowngraded: false,
      safetyNote:
        answers.W1 === 'B'
          ? 'Freemium selected with strict caps, small allowances, and a hard stop.'
          : undefined
    }
  }

  return {
    wrapper: 'FREE_TRIAL',
    wasAutoDowngraded: false,
    safetyNote: undefined
  }
}

export function MatchmakerQuiz({ onRestart }: MatchmakerQuizProps) {
  const [answers, setAnswers] = useState<AnswersMap>({})
  const [sessionId] = useState<string>(() => generateSessionId())
  const [utmData] = useState<UTMData>(() => loadPersistedUtm())
  const [flow, setFlow] = useState<'main' | 'followup' | 'results'>('main')
  const [stepIndex, setStepIndex] = useState(0)
  const [followupIds, setFollowupIds] = useState<QuestionId[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [result, setResult] = useState<MatchmakerResult | null>(null)
  const [reportEmail, setReportEmail] = useState('')
  const [productUrl, setProductUrl] = useState('')
  const [reportSent, setReportSent] = useState(false)
  const [reportSubmitting, setReportSubmitting] = useState(false)
  const [reportError, setReportError] = useState<string | null>(null)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const reportModuleRef = useRef<HTMLDivElement | null>(null)
  const submitInProgressRef = useRef(false)

  useEffect(() => {
    trackQuizStart()
  }, [])

  const mainSequence = useMemo(() => buildMainSequence(answers), [answers])
  const activeSequence = flow === 'followup' ? followupIds : mainSequence

  const safeStepIndex = Math.min(stepIndex, Math.max(activeSequence.length - 1, 0))
  const currentQuestionId = activeSequence[safeStepIndex]
  const currentQuestion = currentQuestionId ? QUESTION_BANK[currentQuestionId] : null
  const currentAnswer = currentQuestionId ? answers[currentQuestionId] : undefined
  const notSureCount = countNotSure(answers)

  const canContinue = !!currentQuestionId && !!currentAnswer
  const isLastStep = activeSequence.length > 0 && safeStepIndex >= activeSequence.length - 1

  const showNotSureHint =
    !!currentQuestionId && !!currentAnswer && isNotSureSelection(currentQuestionId, currentAnswer)

  const resolvedWrapper = resolveWrapper(answers, notSureCount)

  function onSelectOption(value: AnswerValue) {
    if (!currentQuestionId) return
    setErrorMessage(null)
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionId]: value
    }))
  }

  function goBack() {
    if (safeStepIndex === 0) return
    setStepIndex((prev) => Math.max(prev - 1, 0))
  }

  async function submit(pass: 'initial' | 'followup') {
    if (!MATCHMAKER_ENDPOINT) {
      setErrorMessage('Missing NEXT_PUBLIC_MATCHMAKER_ENDPOINT. Add it to your environment to submit answers.')
      return
    }
    if (submitInProgressRef.current) return
    submitInProgressRef.current = true
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      trackLeadSubmit({ pass, notSureCount })
      const payload = {
        action: 'score' as const,
        sessionId,
        email: '',
        answers: buildApiAnswers(answers),
        wrapper: resolvedWrapper.wrapper,
        utm: utmData,
        meta: {
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          referrer: typeof document !== 'undefined' ? document.referrer : ''
        }
      }

      const data = await postMatchmakerAnswers(MATCHMAKER_ENDPOINT, payload) as Record<string, unknown>
      if (typeof data.error === 'string' && data.error.trim()) {
        throw new Error(data.error)
      }
      const followups = normalizeFollowupIds(
        (data.needFollowups ?? data.need_followups) as boolean | QuestionId[] | undefined,
        (data.followupQuestionIds ?? data.followup_question_ids) as QuestionId[] | undefined
      )
      const topLevelRecommendation =
        data?.primary_model || data?.primaryModel
          ? data
          : null
      const recommended =
        data.result ??
        data.recommendation ??
        data.data ??
        // accept Apps Script "top-level" schema
        topLevelRecommendation

      const pendingFollowups = followups.filter((id) => !answers[id])
      const scorerAskedForFollowupsWithoutIds =
        (data.needFollowups === true || data.need_followups === true) && pendingFollowups.length === 0

      if (pass === 'initial' && pendingFollowups.length > 0) {
        setFlow('followup')
        setFollowupIds(pendingFollowups)
        setStepIndex(0)
        return
      }

      if (pass === 'initial' && scorerAskedForFollowupsWithoutIds) {
        throw new Error('Scorer requested follow-ups but did not return question IDs.')
      }

      if (!recommended) {
        throw new Error(
          'Scorer response is missing recommendation fields. Expected one of: result, recommendation, data, or top-level primary_model.'
        )
      }

      setResult(normalizeResultKeys(recommended as Record<string, unknown>) as MatchmakerResult)
      setFlow('results')
      trackQuizComplete()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not submit quiz answers')
    } finally {
      submitInProgressRef.current = false
      setIsSubmitting(false)
    }
  }

  async function onContinue() {
    if (!canContinue) return

    if (isLastStep) {
      if (flow === 'main') {
        // Show conditional questions (P7, F3, F4) without calling the API; only submit after user answers them or if there are none
        const pendingConditionalIds = getPendingConditionalIds(answers)
        if (pendingConditionalIds.length > 0) {
          setFlow('followup')
          setFollowupIds(pendingConditionalIds)
          setStepIndex(0)
          return
        }
        await submit('initial')
      } else {
        await submit('followup')
      }
      return
    }
    setStepIndex((prev) => prev + 1)
  }

  function restartQuiz() {
    if (onRestart) {
      onRestart()
      setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }), 0)
      return
    }
    setAnswers({})
    setFlow('main')
    setFollowupIds([])
    setStepIndex(0)
    setErrorMessage(null)
    setResult(null)
    setReportEmail('')
    setProductUrl('')
    setReportSent(false)
    setCopyStatus('idle')
    trackQuizStart()
  }

  if (flow === 'results' && result) {
    const resultWithConfidence = result as MatchmakerResult & { confidence?: { tier?: string } }
    const confidenceTier = result.confidenceTier ?? resultWithConfidence.confidence?.tier ?? 'Medium'
    const showMeasureNext =
      (confidenceTier === 'Medium' || confidenceTier === 'Low') &&
      Array.isArray(result.measureNextChecklist) &&
      result.measureNextChecklist.length > 0

    const altModels = [
      result.secondaryModel,
      ...['HYBRID', 'USAGE', 'SUB_TIERED', 'SEAT', 'CREDITS', 'TXN', 'OUTCOME'].filter(
        (model) => model !== result.primaryModel && model !== result.secondaryModel
      )
    ]
      .filter(Boolean)
      .slice(0, 2) as string[]

    // Why this fits: 2 bullets from model recommendation (reference doc)
    const whyThisFitsBullets = MODEL_WHY_FITS_BULLETS[result.primaryModel] ?? [result.whyThisFits?.[0], result.whyThisFits?.[1]].filter(Boolean) as string[]
    // Watch-out: 1 bullet from model's Watch-outs (reference doc)
    const watchOutLine = MODEL_WATCH_OUTS[result.primaryModel] ?? toPlainEnglishLine(result.watchOuts?.[0] ?? 'Validate assumptions with 3 target customers before final pricing launch.')
    // What to do next: use implementation notes or starter packaging; replace raw "Wrapper: CODE" with plain-English label
    const rawNextStep = result.implementationNotes?.[0] ?? result.starterPackagingSuggestion ?? ''
    const sanitized = sanitizeWrapperInText(rawNextStep, result.wrapper)
    const nextStepLine = toPlainEnglishLine(sanitized) || 'Review the starter packaging in your free report and validate with 2–3 target customers.'
    const summaryText = `Best fit: ${labelForValue(MODEL_LABELS, result.primaryModel)} priced by ${labelForValue(METRIC_LABELS, result.headlineMetric)}. Wrapper: ${labelForValue(WRAPPER_LABELS, result.wrapper)}.`

    const onCopySummary = async () => {
      try {
        await navigator.clipboard.writeText(summaryText)
        setCopyStatus('copied')
      } catch {
        setCopyStatus('error')
      }
      window.setTimeout(() => setCopyStatus('idle'), 1500)
    }

    const onScrollToReport = () => {
      if (!reportModuleRef.current || typeof window === 'undefined') return
      const rect = reportModuleRef.current.getBoundingClientRect()
      const headerOffset = 96
      const targetY = window.scrollY + rect.top - headerOffset
      window.scrollTo({ top: Math.max(targetY, 0), behavior: 'smooth' })
    }

    const onSubmitReportRequest = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!reportEmail.trim()) return
      if (!MATCHMAKER_ENDPOINT) {
        setReportError('Missing NEXT_PUBLIC_MATCHMAKER_ENDPOINT. Add it to your environment to submit.')
        return
      }
      if (reportSubmitting) return
      setReportSubmitting(true)
      setReportError(null)
      const apiAnswers = buildApiAnswers(answers)
      try {
        const payload = {
          action: 'draft_report' as const,
          sessionId,
          email: reportEmail.trim(),
          answers: apiAnswers,
          productUrl: productUrl.trim() || undefined,
          wrapper: resolvedWrapper.wrapper,
          utm: utmData,
          meta: {
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
            referrer: typeof document !== 'undefined' ? document.referrer : ''
          }
        }
        const response = await postMatchmakerReportDraft(MATCHMAKER_ENDPOINT, payload)
        const reportQueued = response?.ok === true || Boolean(response?.report_url)
        if (!reportQueued) {
          throw new Error('Could not queue your report. Please try again.')
        }
        setReportSent(true)
        trackLeadSubmit({ pass: 'followup', notSureCount })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Could not queue your report'
        const isReportTemplateBackendError =
          /REPORT_MODEL_LABELS_/i.test(message) ||
          /ReferenceError:\s*[A-Z0-9_]+\s+is not defined/i.test(message)

        if (isReportTemplateBackendError) {
          // Fallback: still capture the email + answers using score endpoint if report templating is unavailable.
          try {
            await postMatchmakerAnswers(MATCHMAKER_ENDPOINT, {
              action: 'score',
              sessionId,
              email: reportEmail.trim(),
              answers: apiAnswers,
              wrapper: resolvedWrapper.wrapper,
              utm: utmData,
              meta: {
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
                referrer: typeof document !== 'undefined' ? document.referrer : ''
              }
            })
            setReportSent(true)
            trackLeadSubmit({ pass: 'followup', notSureCount })
            return
          } catch {
            // fall through to show the original report queue error
          }
        }

        setReportError(message)
      } finally {
        setReportSubmitting(false)
      }
    }

    return (
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[var(--shadow-card)]">
        <div className="z-10 border-b border-[var(--color-border)] bg-white/95 px-4 py-3 text-center backdrop-blur sm:sticky sm:top-0 sm:px-8 sm:py-4">
          <h2 className="font-serif-playfair text-2xl font-semibold text-[var(--color-text)] sm:text-[28px]">
            Your pricing model match
          </h2>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-text)]">
              Confidence: {confidenceTier}
            </span>
            <span
              className="inline-flex h-4 w-4 items-center justify-center text-[var(--color-text-muted)]"
              title="Confidence level is based on the count of Not Sure answers. High = clear fit; Low = need validation."
            >
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="space-y-5 px-4 py-5 sm:space-y-6 sm:px-8 sm:py-6">
          <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-card)] sm:p-8">
            <div className="flex flex-wrap items-start justify-end gap-3">
              <button
                type="button"
                onClick={onCopySummary}
                className="min-h-10 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)]"
              >
                Copy
              </button>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Best-fit model</p>
                <p className="mt-1.5 text-base font-semibold leading-relaxed text-[var(--color-text)]">
                  {labelForValue(MODEL_LABELS, result.primaryModel)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Best-fit metric</p>
                <p className="mt-1.5 text-base font-semibold leading-relaxed text-[var(--color-text)]">
                  {labelForValue(METRIC_LABELS, result.headlineMetric)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Recommended wrapper</p>
                <p className="mt-1.5 text-base font-semibold leading-relaxed text-[var(--color-text)]">
                  {labelForValue(WRAPPER_LABELS, result.wrapper)}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Why this fits</p>
                <ul className="mt-2 space-y-2 pl-0 text-base leading-relaxed text-[var(--color-text)]">
                  {whyThisFitsBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-default)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Watch-out</p>
                <p className="mt-1.5 text-base leading-relaxed text-[var(--color-text)]">{watchOutLine}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">What to do next</p>
                <p className="mt-1.5 text-base leading-relaxed text-[var(--color-text)]">{nextStepLine}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-[var(--color-border)] pt-6">
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={onScrollToReport}
                  className="min-h-11 w-full rounded-xl bg-[var(--color-brand-default)] px-5 py-2.5 text-base font-semibold text-white hover:bg-[var(--color-brand-ink)] sm:w-auto"
                >
                  Get my free report →
                </button>
                {copyStatus === 'copied' ? <span className="text-sm text-green-700">Copied.</span> : null}
                {copyStatus === 'error' ? <span className="text-sm text-red-700">Could not copy.</span> : null}
              </div>
            </div>
          </article>

          <div ref={reportModuleRef} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-brand-soft)] p-4 shadow-[var(--shadow-card)] sm:p-8">
            {!reportSent ? (
              <form onSubmit={onSubmitReportRequest} className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-text)] sm:text-2xl">
                    Want the detailed version tailored to your product?
                  </h3>
                  <p className="mt-2 text-base text-[var(--color-text-muted)]">
                    Totally free. We&apos;ll email a report with starter packaging, top 3 alternatives, metric
                    candidates, and what to validate next—based on your answers.
                  </p>
                </div>
                <div className="space-y-3">
                  <input
                    type="email"
                    required
                    value={reportEmail}
                    onChange={(event) => {
                      setReportError(null)
                      setReportEmail(event.target.value)
                    }}
                    placeholder="Email address"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-base text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand-default)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-default)]"
                  />
                  <input
                    type="url"
                    value={productUrl}
                    onChange={(event) => {
                      setReportError(null)
                      setProductUrl(event.target.value)
                    }}
                    placeholder="Company / Product URL (optional; helps personalization)"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-base text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand-default)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-default)]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={reportSubmitting}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-text)] px-4 py-3 text-base font-semibold text-white hover:opacity-90"
                >
                  <Mail className="h-5 w-5" />
                  {reportSubmitting ? 'Submitting...' : 'Send my free report'}
                </button>
                {reportError ? (
                  <p className="text-center text-sm text-red-700">{reportError}</p>
                ) : null}
                <p className="text-center text-sm text-[var(--color-text-muted)]">
                  No spam. Unsubscribe anytime. If you don&apos;t see it within 10 minutes, check your
                  spam/promotions folder.
                </p>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-[var(--color-text)] sm:text-lg">
                  ✅ Sent! If it doesn&apos;t arrive in 10 minutes, check spam/promotions.
                  <br />
                  Issues or feedback? Email{' '}
                  <a
                    href="mailto:hello@sarahzou.com"
                    className="font-semibold text-[var(--color-brand-default)] underline decoration-[1.5px] underline-offset-2 hover:text-[var(--color-brand-ink)]"
                  >
                    hello@sarahzou.com
                  </a>
                  . <br />
                  Want help implementing this?
                </p>
                <a
                  href="/consulting/services/pricing-monetization-sprint"
                  className="inline-block rounded-lg bg-[var(--color-text)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  View Pricing Sprint
                </a>
              </div>
            )}
          </div>

          <details className="rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-base font-semibold text-[var(--color-text)]">
              Two good alternatives (when to choose instead)
            </summary>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {altModels.map((altModel, idx) => (
                <div key={`${altModel}-${idx}`} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <p className="text-base font-semibold text-[var(--color-text)]">
                    Alternative #{idx + 1}: {labelForValue(MODEL_LABELS, altModel)}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Choose this instead if…
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {(MODEL_ALTERNATIVE_REASONS[altModel] ?? MODEL_ALTERNATIVE_REASONS.HYBRID)
                      .slice(0, 2)
                      .map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              The free report explains these switches in plain English.
            </p>
          </details>

          {showMeasureNext ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4">
              <h3 className="text-sm font-semibold text-[var(--color-text)]">Measure-next checklist</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {result.measureNextChecklist?.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-text)]">Need help implementing what you just saw?</h3>
                <p className="mt-2 text-base text-[var(--color-text-muted)]">Get expert guidance to launch your new pricing model.</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto">
                <a
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-default)] px-5 py-2.5 text-base font-semibold text-white hover:bg-[var(--color-brand-ink)]"
                >
                  <Calendar className="h-5 w-5" />
                  Book a Free Consult
                </a>
                <a
                  href="/consulting/services/pricing-monetization-sprint"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-5 py-2.5 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)]"
                >
                  Pricing Sprint details
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] pt-8">
            <div className="flex flex-col items-center justify-center gap-3 text-sm text-[var(--color-text-muted)] sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={restartQuiz}
                className="inline-flex items-center gap-2 transition hover:text-[var(--color-text)]"
              >
                <RotateCcw className="h-4 w-4" />
                Not sure this fits? Retake the quiz
              </button>
              <span className="hidden text-[var(--color-border)] sm:inline" aria-hidden>·</span>
              <a
                href="mailto:hello@sarahzou.com"
                className="inline-flex items-center gap-2 transition hover:text-[var(--color-text)]"
              >
                Have issues or feedback? Email me
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!currentQuestion) {
    return (
      <section className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <p className="text-[#1f2933]">No question is available right now.</p>
      </section>
    )
  }

  const progressPercent = Math.max(0, Math.min(100, ((safeStepIndex + 1) / activeSequence.length) * 100))

  return (
    <section className="flex min-h-[calc(100svh-5rem)] flex-col px-4 py-4 sm:min-h-[calc(100vh-5rem)] sm:px-6 sm:py-5">
      <div className="mb-5">
        <div className="flex items-center justify-center">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#374151] sm:text-sm">
            Question {safeStepIndex + 1} of {activeSequence.length}
          </p>
        </div>
        <div className="mt-4 h-1.5 w-full rounded-full bg-[#d7dbe0]">
          <div
            className="h-1.5 rounded-full bg-[#f25a2a] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <h2 className="text-[1.35rem] font-semibold leading-[1.25] text-[#111827] sm:text-[1.9rem]">
        {currentQuestion.prompt}
      </h2>
      <p className="mt-3 flex items-start gap-2 text-sm leading-[1.5] text-[#344256] sm:text-[0.97rem]">
        <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#f25a2a]" />
        <span>{currentQuestion.helpText}</span>
      </p>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="grid gap-2.5">
          {currentQuestion.options.map((option) => {
            const checked = currentAnswer === option.value
            const { title, detail } = splitOptionParts(option.label)
            return (
              <label
                key={`${currentQuestion.id}-${option.value}`}
                className={`cursor-pointer rounded-2xl border px-4 py-3 transition sm:px-5 ${
                  checked
                    ? 'border-[#f6a58d] bg-[#fff6f2]'
                    : 'border-[#d2d8de] bg-transparent hover:border-[#aab5c0]'
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option.value}
                  checked={checked}
                  onChange={() => onSelectOption(option.value)}
                  className="sr-only"
                />
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1 h-5 w-5 rounded-full border-2 ${
                      checked ? 'border-[#f25a2a]' : 'border-[#d2d8de]'
                    }`}
                  />
                  <div>
                    <p className="text-[1.08rem] leading-[1.3] text-[#111827]">{title}</p>
                    {detail ? <p className="mt-0.5 text-sm leading-[1.35] text-[#334155]">{detail}</p> : null}
                  </div>
                </div>
              </label>
            )
          })}
        </div>

        {showNotSureHint ? (
          <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Guess based on your target customer or closest competitors.
          </p>
        ) : null}

        {resolvedWrapper.safetyNote && flow !== 'followup' ? (
          <p className="mt-3 rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-900">
            {resolvedWrapper.safetyNote}
          </p>
        ) : null}

        <p className="mt-4 rounded-2xl border border-[#d2d8de] bg-[#e9edf1] px-4 py-3 text-sm italic leading-[1.45] text-[#334155]">
          {currentQuestion.examples}
        </p>

        {errorMessage ? (
          <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {errorMessage}
          </p>
        ) : null}

        {resolvedWrapper.wasAutoDowngraded && flow !== 'followup' ? (
          <p className="mt-3 text-xs text-[#6b7280]">
            Wrapper note: safety overrides changed wrapper guidance to Free trial.
          </p>
        ) : null}
      </div>

      <div className="sticky bottom-0 mt-3 border-t border-[#d2d8de] bg-[#f2f0f2]/95 px-1 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm">
        <div className="flex w-full items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={safeStepIndex === 0 || isSubmitting}
            className="min-h-11 flex-1 rounded-md border border-[#d1d5db] px-4 py-2 text-sm font-medium text-[#1f2933] transition hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue || isSubmitting}
            className="min-h-11 flex-1 rounded-md bg-[#1f2933] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit' : 'Continue'}
          </button>
        </div>
        <div className="mt-2 flex justify-center sm:mt-3">
          <a
            href={`mailto:hello@sarahzou.com?subject=${encodeURIComponent(`Pricing Model Matchmaker feedback – ${currentQuestionId ?? 'quiz'} (Question ${safeStepIndex + 1} of ${activeSequence.length})`)}`}
            className="text-sm text-[#6b7280] underline-offset-2 hover:text-[#111827] hover:underline"
          >
            Feedback
          </a>
        </div>
      </div>
    </section>
  )
}

