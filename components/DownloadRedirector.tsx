"use client";

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, action: string, params: any) => void;
  }
}

import { useEffect, useState } from 'react';
import type { Download, DownloadSlug } from '@/lib/downloads';

export default function DownloadRedirector({ download, slug }: { download: Download, slug: DownloadSlug }) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleDownload = async () => {
      try {
        // Track the download event in GA4
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'download', {
            event_category: 'PDF Download',
            event_label: download.title,
            value: 1
          });
        }
        // Small delay to ensure GA4 event is sent
        await new Promise(resolve => setTimeout(resolve, 100));
        // Redirect to the actual PDF file
        const pdfUrl = `/downloads/${download.filename}`;
        window.location.href = pdfUrl;
      } catch (err) {
        setError('Failed to initiate download. Please try again.');
      }
    };
    handleDownload();
  }, [download, slug]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#fff8f2] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-[#222] mb-2">Download Error</h1>
          <p className="text-[#4b636e] mb-4">{error}</p>
          <a 
            href={`/downloads/${download.filename}`} 
            className="bg-[#ff5722] text-white px-6 py-3 rounded-full hover:bg-[#e64a19] transition-colors"
          >
            Try Direct Download
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f2] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff5722] mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold text-[#222] mb-2">Preparing your download...</h1>
        <p className="text-[#4b636e] mb-2">{download.title}</p>
        <p className="text-sm text-[#666] mb-4">Tracking download analytics...</p>
        <p className="text-sm text-[#666]">If download doesn't start automatically, <a href={`/downloads/${download.filename}`} className="text-[#ff5722] hover:underline">click here</a></p>
      </div>
    </div>
  );
} 