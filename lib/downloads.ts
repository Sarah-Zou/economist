// Define the available downloads and their file paths
export const downloads = {
  'monetization-roadmap': {
    filename: 'Monetization_Roadmap_Nov2025.pdf',
    title: 'Monetization Roadmap',
    description: 'A strategic guide to monetization, metrics, and forecasting designed for capital-efficient growth.'
  }
} as const;

export type DownloadSlug = keyof typeof downloads;
export type Download = typeof downloads[DownloadSlug]; 