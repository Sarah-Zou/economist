import type {
  MatchmakerReportDraftPayload,
  MatchmakerReportDraftResponse,
  MatchmakerSubmissionPayload,
  ScorerResponse
} from '@/lib/matchmaker/types'

const MATCHMAKER_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbxGxJ8eMrdy_0-a_aJ2HGRdLlozzX1SkF01e7UtIy696Ia6b3YBQtPxHjsbtktaXSNJMg/exec'

export const MATCHMAKER_ENDPOINT = process.env.NEXT_PUBLIC_MATCHMAKER_ENDPOINT ?? MATCHMAKER_WEB_APP_URL

export async function postMatchmakerAnswers(
  endpoint: string,
  payload: MatchmakerSubmissionPayload
): Promise<ScorerResponse> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }

  const text = await response.text()
  if (!text) return {}

  try {
    const parsed = JSON.parse(text) as ScorerResponse & { error?: unknown; status_code?: unknown; ok?: unknown }
    const statusCode = typeof parsed.status_code === 'number' ? parsed.status_code : null
    if (statusCode !== null && statusCode >= 400) {
      throw new Error(typeof parsed.error === 'string' ? parsed.error : `Scorer returned status ${statusCode}`)
    }
    if (parsed.ok === false && typeof parsed.error === 'string') {
      throw new Error(parsed.error)
    }
    return parsed
  } catch (error) {
    if (error instanceof Error) throw error
    throw new Error('Scorer returned a non-JSON response')
  }
}

export async function postMatchmakerReportDraft(
  endpoint: string,
  payload: MatchmakerReportDraftPayload
): Promise<MatchmakerReportDraftResponse> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }

  const text = await response.text()
  if (!text) return { ok: false }

  try {
    const parsed = JSON.parse(text) as MatchmakerReportDraftResponse
    if (typeof parsed.error === 'string' && parsed.error.trim()) {
      throw new Error(parsed.error)
    }
    return parsed
  } catch (error) {
    if (error instanceof Error) throw error
    throw new Error('Report service returned a non-JSON response')
  }
}

