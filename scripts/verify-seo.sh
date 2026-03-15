#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-https://sarahzou.com}"

failures=0

log_ok() {
  printf "OK   %s\n" "$1"
}

log_fail() {
  printf "FAIL %s\n" "$1"
  failures=$((failures + 1))
}

check_301() {
  local from="$1"
  local expected_to="$2"
  local code location redirects
  code="$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN$from")"
  location="$(curl -s -I "$DOMAIN$from" | awk 'BEGIN{IGNORECASE=1}/^Location:/{print $2}' | tr -d '\r' | head -n 1)"
  redirects="$(curl -s -o /dev/null -w "%{num_redirects}" -L --max-redirs 10 "$DOMAIN$from")"
  if [[ "$code" == "301" && "$location" == "$expected_to" && "$redirects" -le 1 ]]; then
    log_ok "301 $from -> $expected_to (no chain)"
  else
    log_fail "301 mismatch for $from (code=$code location=$location redirects=$redirects expected=$expected_to)"
  fi
}

check_410() {
  local from="$1"
  local code
  code="$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN$from")"
  if [[ "$code" == "410" ]]; then
    log_ok "410 $from"
  else
    log_fail "Expected 410 for $from, got $code"
  fi
}

check_200_canonical() {
  local page="$1"
  local expected="$DOMAIN$page"
  local code html canonical
  code="$(curl -s -o /dev/null -w "%{http_code}" "$expected")"
  html="$(curl -s "$expected")"
  canonical="$(printf "%s" "$html" | sed -n 's/.*<link[^>]*rel="canonical"[^>]*href="\([^"]*\)".*/\1/p' | head -n 1)"
  if [[ "$code" == "200" && "$canonical" == "$expected" ]]; then
    log_ok "200 + self-canonical $page"
  else
    log_fail "Canonical mismatch on $page (code=$code canonical=$canonical expected=$expected)"
  fi
}

check_sitemap_clean() {
  local tmp idx
  tmp="$(mktemp)"
  for idx in sitemap.xml sitemap-wiki.xml sitemap-posts.xml sitemap_index.xml; do
    curl -s "$DOMAIN/$idx" >> "$tmp" || true
  done

  local bad_regex='/_next/|\.woff2|\.css|\.js|[?][^<]*</loc>|/wiki/pricing/comms-and-deals/|/wiki/pricing/competitive-and-positioning/'
  if grep -Eiq "$bad_regex" "$tmp"; then
    log_fail "Sitemap contains known bad/non-indexable URLs"
  else
    log_ok "Sitemap excludes known bad/non-indexable URLs"
  fi
  rm -f "$tmp"
}

echo "Verifying against $DOMAIN"

# Sample legacy redirects.
check_301 "/consulting/services/rapid-pricing-experiment-toolkit" "$DOMAIN/consulting/services/pricing-monetization-sprint"
check_301 "/wiki/pricing/models-and-metering/per-user-per-seat" "$DOMAIN/wiki/pricing/models-and-metering/seat-based-pricing"
check_301 "/wiki/pricing/price-architecture/" "$DOMAIN/wiki/pricing/packaging-and-bundling"
check_301 "/about/" "$DOMAIN/about"

# Sample explicit removals.
check_410 "/wiki/pricing/comms-and-deals/value-selling"
check_410 "/downloads/metrics-storytelling-one-pager"

# Sample canonical live pages.
check_200_canonical "/"
check_200_canonical "/consulting/services/pricing-monetization-sprint"
check_200_canonical "/wiki/pricing/foundations/value-based-pricing"
check_200_canonical "/wiki/pricing/models-and-metering/usage-based-pricing"

check_sitemap_clean

if [[ "$failures" -gt 0 ]]; then
  echo "SEO verification failed with $failures issue(s)."
  exit 1
fi

echo "SEO verification passed."

