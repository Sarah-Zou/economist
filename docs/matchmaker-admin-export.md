# Matchmaker Admin Export (Leads + Results)

This quiz now sends a stable payload for each scoring request with:

- `sessionId` (same per user session)
- `answers` (question ids + selected ids)
- `utm` (`source`, `medium`, `campaign`, `term`, `content`)
- `meta` (`userAgent`, `referrer`)

## Persist UTM into lead records

Frontend behavior:

- UTM params are captured from URL (`utm_*`) and persisted in session storage.
- If a user returns to the quiz during the session, the same UTM values are reused.
- Every score POST includes `utm`, so Apps Script can write UTM directly into the lead row.

## Simple Google Sheet export

Recommended lead/result sheet columns:

- `timestamp`
- `sessionId`
- `email`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `answers_json`
- `primary_model`, `secondary_model`
- `wrapper`
- `headline_metric`, `secondary_meter`
- `confidence_tier`
- `launch_now`, `evolve_later`

Then export with:

1. Google Sheet -> `File` -> `Download` -> `Comma Separated Values (.csv)`
2. Or publish as CSV for admin tooling if needed.

## Pass 1 / Pass 2 note

For two-pass scoring flows, both requests share the same `sessionId`, so Apps Script can upsert a single lead record and append follow-up answers/results before export.

