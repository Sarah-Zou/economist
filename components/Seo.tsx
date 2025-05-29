import Head from 'next/head';

type Props = {
  title: string;
  description: string;
  path?: string;           // e.g. "/consulting"
  image?: string;          // fallback to og-default
};

export default function Seo({ title, description, path = '', image = '/og-default.jpg' }: Props) {
  const url = `https://sarahzou.com${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Sarah Zou, PhD" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`https://sarahzou.com${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://sarahzou.com${image}`} />
    </Head>
  );
} 