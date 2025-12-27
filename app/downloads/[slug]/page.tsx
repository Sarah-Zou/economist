import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { downloads, type DownloadSlug } from '@/lib/downloads';
import DownloadRedirector from '@/components/DownloadRedirector';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug as DownloadSlug;
  const download = downloads[slug];
  
  if (!download) {
    return {
      title: 'Download Not Found',
    };
  }

  return {
    title: `Download: ${download.title} | Sarah Zou`,
    description: download.description || `Download ${download.title}`,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `https://sarahzou.com/downloads/${slug}`,
    },
  };
}

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