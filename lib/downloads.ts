// Define the available downloads and their file paths
export const downloads = {
  'metrics-storytelling-one-pager': {
    filename: 'Metrics-Storytelling_One-Pager.pdf',
    title: 'Metrics-Storytelling One-Pager',
    description: 'Know exactly which KPIs & funding narratives investors expect at each funding stage.'
  },
  'saas-benchmark-source-navigator': {
    filename: 'SaaS_Benchmark_Source_Navigator.pdf',
    title: 'SaaS Benchmark Source Navigator',
    description: 'Side-by-side view of 9 leading surveys and indexes—sorted by freshness, stage match, sample bias, and size—so you pull the right numbers the first time.'
  },
  'stage-smart-metrics-benchmarks-2025-q2': {
    filename: 'Stage-Smart_Metrics_Benchmarks_2025Q2.pdf',
    title: 'Stage-Smart Metrics Benchmarks 2025 Q2',
    description: 'Instantly compare median and top-quartile ARR growth, GRR, NRR, CAC payback, burn multiple, ARR/FTE, and more—from Seed to Pre-IPO.'
  },
  'monetization-roadmap': {
    filename: 'Monetization_Roadmap.pdf',
    title: 'Monetization Roadmap',
    description: 'A strategic guide to monetization, metrics, and forecasting designed for capital-efficient growth.'
  }
} as const;

export type DownloadSlug = keyof typeof downloads;
export type Download = typeof downloads[DownloadSlug]; 