import { notFound } from 'next/navigation';
import { downloads, type DownloadSlug } from '@/lib/downloads';
import DownloadRedirector from '@/components/DownloadRedirector';

// Generate static params for static export
export async function generateStaticParams() {
  return Object.keys(downloads).map((slug) => ({
    slug: slug,
  }));
}

export default function DownloadPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as DownloadSlug;
  const download = downloads[slug];
  if (!download) notFound();
  return <DownloadRedirector download={download} slug={slug} />;
} 