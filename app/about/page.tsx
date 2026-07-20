import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { generateBreadcrumbJsonLd } from '@/lib/generateJsonLd'
import { OG_IMAGE_ABOUT } from '@/lib/seo'

const careerChapters = [
  {
    number: '01',
    period: 'Economics',
    title: 'Learning to ask what drives the outcome.',
    description:
      'Doctoral training at Rutgers and research with NBER and the World Bank taught me to separate signal from noise—and to make assumptions visible before trusting a conclusion.',
  },
  {
    number: '02',
    period: 'Finance',
    title: 'Learning what a model must withstand.',
    description:
      'At Citigroup, I worked with risk and forecasting models where precision mattered, but so did judgment, governance, and the ability to explain what the numbers could not guarantee.',
  },
  {
    number: '03',
    period: 'Transformation',
    title: 'Learning to translate across disciplines.',
    description:
      'At Capgemini, I led generative-AI and digital-transformation work across technical and business teams. The challenge was rarely the technology alone; it was creating shared language around the decision.',
  },
  {
    number: '04',
    period: 'Operations',
    title: 'Learning where strategy meets constraint.',
    description:
      'Operating an infrastructure data platform as COO brought the work closest to reality: pricing against cost floors, structuring paid pilots, and building an economic story that could survive diligence.',
  },
]

const convictions = [
  {
    number: '01',
    title: 'Begin with behavior.',
    description:
      'A commercial model should reflect how customers evaluate, adopt, use, and expand—not simply how the company prefers to charge.',
  },
  {
    number: '02',
    title: 'Make complexity legible.',
    description:
      'Technical products do not need to be made simplistic. They need an economic logic that buyers, teams, and investors can understand from their own vantage point.',
  },
  {
    number: '03',
    title: 'Use the model to expose the decision.',
    description:
      'The purpose of analysis is not a more elaborate spreadsheet. It is to reveal the tradeoff, define what matters, and make the next move easier to defend.',
  },
  {
    number: '04',
    title: 'Stay close to operating reality.',
    description:
      'A recommendation is only strong if it can survive product constraints, cost behavior, sales conversations, and the imperfect information of a growing company.',
  },
]

export const metadata: Metadata = {
  title: 'About Sarah Zou | Economist, Operator & Advisor',
  description:
    'Sarah Zou is a PhD economist and infrastructure operator. Read how research, finance, consulting, and operating experience shaped her commercial point of view.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sarahzou.com/about',
  },
  openGraph: {
    title: 'About Sarah Zou | Economist, Operator & Advisor',
    description:
      'The path from economic research to finance, transformation, and operating an infrastructure data platform.',
    type: 'website',
    url: 'https://sarahzou.com/about',
    images: [OG_IMAGE_ABOUT],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Sarah Zou | Economist, Operator & Advisor',
    description:
      'The path from economic research to finance, transformation, and operating an infrastructure data platform.',
    images: [OG_IMAGE_ABOUT],
  },
}

export default function AboutPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div id="about-norm" className="overflow-hidden bg-page text-text">
        <section className="border-b border-border-soft bg-surface">
          <div className="section-shell grid gap-12 py-16 sm:py-20 lg:min-h-[690px] lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16 lg:py-24">
            <div className="max-w-[47rem] lg:pb-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-text-subtle">
                About Sarah Zou
              </p>
              <h1 className="mt-6 max-w-[44rem] font-serif-playfair text-ink">
                I’m an economist who cares about what happens behind the model.
              </h1>
              <p className="mt-7 max-w-[36rem] text-[17px] leading-[1.78] text-text-muted sm:text-[19px]">
                I’ve spent my career learning how evidence becomes judgment—from research and
                finance to transformation and infrastructure operations.
              </p>
            </div>

            <figure className="w-full lg:justify-self-end">
              <div className="relative aspect-[4/5] max-h-[610px] w-full overflow-hidden bg-page">
                <Image
                  src="/images/about_headshot.webp"
                  alt="Sarah Zou, economist, operator, and advisor"
                  fill
                  priority
                  sizes="(min-width: 1024px) 470px, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-4 border-t border-border-subtle pt-3 text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                Economist &middot; Operator &middot; Advisor
              </figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="career-path-title">
          <div className="section-shell py-20 sm:py-24 lg:py-32">
            <div className="grid gap-8 border-b border-border-soft pb-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                The path
              </p>
              <h2 id="career-path-title" className="max-w-[44rem] font-serif-playfair text-ink">
                Four contexts that changed how I see commercial problems.
              </h2>
            </div>

            <ol>
              {careerChapters.map((chapter) => (
                <li
                  key={chapter.number}
                  className="grid gap-5 border-b border-border-soft py-9 sm:grid-cols-[3rem_0.38fr_1fr] sm:gap-8 lg:py-11"
                >
                  <span className="text-[11px] tracking-[0.14em] text-text-subtle">
                    {chapter.number}
                  </span>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-subtle">
                    {chapter.period}
                  </p>
                  <div className="max-w-[42rem]">
                    <h3 className="font-serif-playfair text-[24px] font-medium leading-[1.2] tracking-[-0.01em] text-ink sm:text-[27px]">
                      {chapter.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.8] text-text-muted sm:text-[16px]">
                      {chapter.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-ink text-white">
          <div className="section-shell grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:py-28">
            <figure>
              <div className="relative aspect-[3/2] overflow-hidden bg-white/[0.04]">
                <Image
                  src="/images/about-model-and-decision-v2.webp"
                  alt="Handwritten financial-modeling calculations beside a printed radar chart"
                  fill
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 border-t border-white/20 pt-3 text-[11px] uppercase tracking-[0.16em] text-white/50">
                Evidence, judgment, and the decision between them
              </figcaption>
            </figure>

            <div className="max-w-[46rem]">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/[0.5]">
                A working thesis
              </p>
              <blockquote>
                <p className="mt-6 font-serif-playfair text-[32px] leading-[1.22] text-white sm:text-[38px] lg:text-[43px]">
                  The strongest commercial decisions are neither purely analytical nor purely
                  intuitive.
                </p>
              </blockquote>
              <p className="mt-8 max-w-[41rem] border-t border-white/[0.18] pt-7 text-[16px] leading-[1.8] text-white/70 sm:text-[17px]">
                They connect evidence with judgment. They make uncertainty explicit without becoming
                paralyzed by it. And they give the people responsible for the outcome a logic they
                can carry forward.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="convictions-title">
          <div className="section-shell py-20 sm:py-24 lg:py-32">
            <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                  Point of view
                </p>
                <h2 id="convictions-title" className="mt-5 font-serif-playfair text-ink">
                  What I have come to believe.
                </h2>
              </div>

              <div className="border-t border-border-soft">
                {convictions.map((conviction) => (
                  <article
                    key={conviction.number}
                    className="grid grid-cols-[2.5rem_1fr] gap-6 border-b border-border-soft py-8"
                  >
                    <span className="text-[11px] tracking-[0.14em] text-text-subtle">
                      {conviction.number}
                    </span>
                    <div className="max-w-[41rem]">
                      <h3 className="text-[18px] font-medium text-ink">{conviction.title}</h3>
                      <p className="mt-3 text-[15px] leading-[1.8] text-text-muted sm:text-[16px]">
                        {conviction.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border-soft bg-surface">
          <div className="section-shell grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:py-28">
            <figure>
              <div className="relative aspect-[3/2] overflow-hidden bg-page">
                <Image
                  src="/images/about-boutique-office.webp"
                  alt="A quiet boutique consulting office prepared for a working session"
                  fill
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 border-t border-border-subtle pt-3 text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                A small practice, close to the work
              </figcaption>
            </figure>

            <div className="max-w-[46rem]">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                Why EconNova
              </p>
              <h2 className="mt-5 font-serif-playfair text-ink">
                A practice built for questions without an off-the-shelf answer.
              </h2>
              <div className="mt-8 space-y-6 text-[16px] leading-[1.85] text-text-muted sm:text-[17px]">
                <p>
                  I started EconNova to bring economic reasoning and operating context into the same
                  conversation. Technical founders are often told to borrow a familiar SaaS playbook
                  even when their products, costs, buyers, and adoption patterns behave very
                  differently.
                </p>
                <p className="text-text">
                  I am most interested in the moment before the answer looks obvious—when the right
                  framing can prevent months of optimizing the wrong model.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="section-shell grid gap-9 py-20 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-20 lg:py-28">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                From perspective to practice
              </p>
              <h2 className="mt-5 max-w-[48rem] font-serif-playfair text-ink">
                See how this point of view translates into the work.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <Link
                href="/consulting"
                className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-[15px] font-medium text-ink"
              >
                Explore the practice
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
              <Link
                href="/newsletter"
                className="border-b border-border pb-1 text-[14px] text-text-muted transition-colors hover:border-ink hover:text-ink"
              >
                Read the field notes
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
