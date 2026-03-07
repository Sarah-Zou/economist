export type QuestionId =
  | 'P0'
  | 'P1'
  | 'P3'
  | 'P4'
  | 'P5'
  | 'P6'
  | 'P7'
  | 'Q0'
  | 'A1'
  | 'A2'
  | 'A3'
  | 'B1'
  | 'B2'
  | 'B5'
  | 'C1'
  | 'C2'
  | 'C4'
  | 'D1'
  | 'D2'
  | 'D3'
  | 'D3b'
  | 'W1'
  | 'W2'
  | 'F3'
  | 'F4'

export type AnswerValue = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
export type AnswersMap = Partial<Record<QuestionId, AnswerValue>>

export type QuizOption = {
  value: AnswerValue
  label: string
}

export type QuizQuestion = {
  id: QuestionId
  prompt: string
  helpText: string
  examples: string
  options: QuizOption[]
}

export type ConfidenceTier = 'High' | 'Medium' | 'Low' | string

export type MatchmakerResult = {
  primaryModel: string
  secondaryModel?: string | null
  wrapper: string
  headlineMetric: string
  secondaryMeter?: string | null
  launchNow: string
  evolveLater: string
  whyThisFits: string[]
  watchOuts: string[]
  starterPackagingSuggestion: string
  implementationNotes: string[]
  measureNextChecklist?: string[]
  confidenceTier?: ConfidenceTier
}

/** API can return camelCase or snake_case (e.g. Apps Script); frontend normalizes to camelCase */
export type ScorerResponse = {
  result?: MatchmakerResult | Record<string, unknown>
  recommendation?: MatchmakerResult | Record<string, unknown>
  needFollowups?: boolean | QuestionId[]
  followupQuestionIds?: QuestionId[]
  /** Apps Script snake_case variant */
  need_followups?: boolean | QuestionId[]
  /** Apps Script snake_case variant */
  followup_question_ids?: QuestionId[] | string[]
  /** Top-level result (Apps Script); when set, whole response is the recommendation */
  primary_model?: string
}

export type MatchmakerSubmissionPayload = {
  action: 'score'
  sessionId: string
  email: string
  answers: Record<QuestionId, string>
  /** Resolved wrapper (FREEMIUM | FREE_TRIAL | NONE) sent so Apps Script can use it when present */
  wrapper?: string
  utm: {
    source: string
    medium: string
    campaign: string
    term: string
    content: string
  }
  meta: {
    userAgent: string
    referrer: string
  }
}

export type MatchmakerReportDraftPayload = {
  action: 'draft_report'
  sessionId: string
  email: string
  answers: Record<QuestionId, string>
  productUrl?: string
  /** Resolved wrapper (FREEMIUM | FREE_TRIAL | NONE) sent so Apps Script can use it when present */
  wrapper?: string
  utm: {
    source: string
    medium: string
    campaign: string
    term: string
    content: string
  }
  meta: {
    userAgent: string
    referrer: string
  }
}

export type MatchmakerReportDraftResponse = {
  ok?: boolean
  report_url?: string
  error?: string
}

