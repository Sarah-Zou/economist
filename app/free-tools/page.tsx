import Link from 'next/link'
import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Mail, Map, Sparkles } from 'lucide-react'
import { brandLink, outlineButton, primaryButtonSm } from '@/lib/brandStyles'

export const metadata: Metadata = {
  title: 'Free Resources | EconNova',
  description: 'Free pricing tools and guides for AI and SaaS founders.',
  alternates: {
    canonical: 'https://sarahzou.com/free-tools',
  },
}

export default function FreeToolsPage() {
  const quickChooser = [
    {
      heading: 'If you want a fast recommendation',
      startWith: 'Pricing Model Matchmaker',
      copy: 'Get a tailored recommendation for pricing model, value metric, wrapper, and launch-now vs. evolve-later path.',
      href: '/free-tools/pricing-model-matchmaker',
      cta: 'Try it now',
      icon: Sparkles,
    },
    {
      heading: 'If you want a step-by-step playbook',
      startWith: 'Startup Monetization Roadmap',
      copy: 'Get a practical guide to building pricing from zero to first structure.',
      href: '/cheat-sheets',
      cta: 'Get the roadmap',
      icon: Map,
    },
    {
      heading: 'If you want to understand pricing concepts better',
      startWith: 'Pricing Wiki',
      copy: 'Browse clear explanations of pricing, packaging, monetization models, and related concepts.',
      href: '/wiki/pricing',
      cta: 'Explore the wiki',
      icon: BookOpen,
    },
    {
      heading: 'If you want ongoing insights',
      startWith: 'Newsletter',
      copy: 'Get weekly research, frameworks, and startup pricing ideas in your inbox.',
      href: '/newsletter',
      cta: 'Subscribe',
      icon: Mail,
    },
  ]

  const featuredResources = [
    {
      id: '1',
      label: 'Interactive tool',
      name: 'Pricing Model Matchmaker',
      title: 'Find your best-fit pricing model in about 3 minutes',
      copy: 'Answer a short set of questions about your product, customer, and cost structure to get a tailored recommendation on pricing model, value metric, and GTM wrapper. Designed for pre-seed to Series A AI, SaaS, and API products.',
      points: [
        'Best-fit pricing model',
        'Suggested headline metric',
        'Wrapper recommendation',
        'Launch-now vs. evolve-later guidance',
        'Why it fits, watch-outs, and next steps',
      ],
      pointsHeading: 'What you get',
      primaryCta: 'Open the Matchmaker',
      primaryHref: '/free-tools/pricing-model-matchmaker',
      secondaryCta: 'Read the pricing wiki first',
      secondaryHref: '/wiki/pricing',
      visual: 'matchmaker',
    },
    {
      id: '2',
      label: 'Free playbook',
      name: 'Startup Monetization Roadmap',
      title: 'Get the free roadmap for building pricing from zero to first structure',
      copy: 'A step-by-step playbook to go from zero to first dollar with a more defensible monetization foundation. It includes a 4-phase system, interview prompts, pricing architecture guidance, and a 30-60-90 action plan. The download is delivered through your welcome email.',
      points: [
        '4 pricing phases',
        'Interview kit',
        'Architecture decisions',
        'Price-setting worksheets',
        '30-60-90 rollout plan',
      ],
      pointsHeading: "What's inside",
      primaryCta: 'Get the Free Roadmap',
      primaryHref: '/cheat-sheets',
      visual: 'roadmap',
    },
    {
      id: '3',
      label: 'Reference library',
      name: 'Pricing Wiki',
      title: 'Learn pricing and monetization without the jargon',
      copy: 'A growing pricing and monetization reference library for tech startups. Use it to understand foundational concepts, compare models, and build stronger pricing judgment over time. The current wiki includes four active categories and dozens of concepts.',
      points: [
        'founders who want to learn the logic behind pricing decisions',
        'teams aligning on concepts internally',
        'anyone who wants a better vocabulary for pricing work',
      ],
      pointsHeading: 'Best for',
      primaryCta: 'Explore the Pricing Wiki',
      primaryHref: '/wiki/pricing',
      visual: 'wiki',
    },
    {
      id: '4',
      label: 'Weekly insights',
      name: 'Newsletter',
      title: 'Get practical pricing and growth ideas in your inbox',
      copy: 'Subscribe for weekly pricing research, case studies, frameworks, and benchmark-driven thinking for tech startups. The current newsletter page positions it as a weekly deep dive into pricing and growth strategies.',
      points: [
        'pricing research and benchmarks',
        'real startup case studies',
        'frameworks you can apply quickly',
      ],
      pointsHeading: "What you'll get",
      primaryCta: 'Subscribe to the Newsletter',
      primaryHref: '/newsletter',
      visual: 'newsletter',
    },
  ]

  const resourcePath = [
    {
      title: 'Step 1 - Start with the Matchmaker',
      copy: 'Use it when you want a fast recommendation and a clearer starting point.',
      href: '/free-tools/pricing-model-matchmaker',
    },
    {
      title: 'Step 2 - Use the Roadmap',
      copy: 'Use it when you want a more structured path from recommendation to actual pricing work.',
      href: '/cheat-sheets',
    },
    {
      title: 'Step 3 - Read the Wiki',
      copy: 'Use it when you want to understand the concepts more deeply or explain them to your team.',
      href: '/wiki/pricing',
    },
    {
      title: 'Step 4 - Stay on the Newsletter',
      copy: 'Use it to keep improving your pricing thinking over time.',
      href: '/newsletter',
    },
  ]

  const resourceStats = [
    { value: '4', label: 'Core resources' },
    { value: '1', label: 'Interactive tool' },
    { value: '32+', label: 'Wiki concepts' },
  ]

  const visualPanels: Record<string, JSX.Element> = {
    matchmaker: (
      <div className="media-shell h-full bg-[#f2ece5] p-3">
        <div className="media-inner">
          <Image
            src="/images/pmm_hero_image.png"
            alt="Pricing Model Matchmaker interface preview"
            fill
            className="object-cover object-left-top"
          />
        </div>
      </div>
    ),
    roadmap: (
      <div className="media-shell h-full bg-[#f2ece5] p-3">
        <div className="media-inner">
          <Image
            src="/images/roadmap_stacked.webp"
            alt="Startup Monetization Roadmap preview"
            fill
            className="object-contain p-6"
          />
        </div>
      </div>
    ),
    wiki: (
      <div className="media-shell h-full bg-[#f2ece5] p-3">
        <div className="media-inner">
          <Image
            src="/images/pricing.webp"
            alt="Pricing Wiki category visual"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    ),
    newsletter: (
      <div className="media-shell h-full bg-[#f2ece5] p-3">
        <div className="media-inner">
          <Image
            src="/images/metrics.webp"
            alt="Newsletter article cover preview"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    ),
  }

  return (
    <main className="min-h-screen bg-page">
      <section className="bg-white/70">
        <div className="section-shell py-16 sm:py-20">
          <p className="kicker-accent">Free Resources</p>
          <h1 className="mt-4 max-w-[13ch] font-serif-playfair text-[34px] font-bold leading-tight text-text sm:text-[46px]">
            Free pricing tools and guides for AI and SaaS founders
          </h1>
          <p className="mt-6 max-w-[44rem] text-base leading-[1.85] text-text-muted sm:text-[18px]">
            Use these resources to choose a pricing model, improve monetization decisions, build a
            stronger pricing foundation, and keep learning as you grow.
          </p>
          <p className="mt-4 max-w-[42rem] text-base leading-[1.85] text-text-muted sm:text-[17px]">
            Not ready to hire yet? Start here. Need a sharper answer faster?{' '}
            <Link href="/consulting/entry-offer/form" className={`${brandLink} font-medium`}>
              Book the 90-minute session.
            </Link>
          </p>
          <p className="meta-note mt-6">Start with one resource, not all of them at once.</p>
          <div className="mt-10 flex flex-wrap gap-8 border-t border-border-soft pt-5">
            {resourceStats.map((item) => (
              <div key={item.label}>
                <p className="font-serif-playfair text-[26px] leading-none text-ink">
                  {item.value}
                </p>
                <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-text-subtle">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="section-shell">
          <h2 className="text-center font-serif-playfair text-3xl font-semibold leading-tight text-text sm:text-[34px]">
            Start with the right resource
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-[1.65] text-text-muted sm:text-[17px]">
            Each resource is built for a different kind of need. Start with the one that matches
            where you are right now.
          </p>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {quickChooser.map((item) => (
              <Link
                key={item.startWith}
                href={item.href}
                className="border-t border-border pt-5 transition-colors hover:border-brand/40"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-brand-soft">
                  <item.icon className="h-4 w-4 text-brand" />
                </div>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-text-subtle">
                  {item.heading}
                </p>
                <p className="mt-2 font-serif-playfair text-lg font-semibold leading-snug text-text sm:text-xl">
                  Start with: {item.startWith}
                </p>
                <p className="mt-3 text-[15px] leading-[1.8] text-text-muted sm:text-[16px]">
                  {item.copy}
                </p>
                <p className="mt-4 inline-flex items-center text-[14px] font-semibold text-brand-ink">
                  {item.cta} <ArrowRight className="ml-1 h-4 w-4" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-12">
        <div className="section-shell">
          <h2 className="font-serif-playfair text-3xl font-semibold leading-tight text-text sm:text-[34px]">
            Explore the free resources
          </h2>

          <div className="mt-10 space-y-14">
            {featuredResources.map((resource, index) => (
              <article
                key={resource.title}
                className="grid items-stretch gap-10 border-t border-border pt-8 md:grid-cols-2"
              >
                <div className={index % 2 === 0 ? 'order-1' : 'order-1 md:order-2'}>
                  <p className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.14em] text-text-subtle">
                    {resource.label}
                  </p>
                  <h3 className="mt-5 font-serif-playfair text-2xl font-semibold leading-tight text-text sm:text-3xl">
                    {resource.name}
                  </h3>
                  <h4 className="mt-3 font-serif-playfair text-xl font-semibold leading-tight text-text sm:text-2xl">
                    {resource.title}
                  </h4>
                  <p className="mt-5 max-w-[38rem] text-base leading-[1.85] text-text-muted sm:text-[17px]">
                    {resource.copy}
                  </p>

                  <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-text-subtle">
                    {resource.pointsHeading}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {resource.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-base text-text-muted sm:text-[17px]"
                      >
                        <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-brand" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center gap-5">
                    <Link href={resource.primaryHref} className={primaryButtonSm}>
                      {resource.primaryCta}
                    </Link>
                    {resource.secondaryCta && resource.secondaryHref ? (
                      <Link
                        href={resource.secondaryHref}
                        className={`${brandLink} inline-flex items-center`}
                      >
                        {resource.secondaryCta} <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
                <div
                  className={
                    index % 2 === 0 ? 'order-2 min-h-[380px]' : 'order-2 min-h-[380px] md:order-1'
                  }
                >
                  {visualPanels[resource.visual]}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="section-shell py-16 sm:py-18">
          <h2 className="text-center font-serif-playfair text-3xl font-semibold leading-tight text-white sm:text-[34px]">
            A simple path through the free resources
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-[1.75] text-white/72 sm:text-[17px]">
            This section matters because it turns four separate pages into one connected system.
          </p>

          <div className="relative mt-12 grid gap-10 md:grid-cols-4">
            <div className="absolute left-[12.5%] right-[12.5%] top-[18px] hidden h-px bg-white/12 md:block" />
            {resourcePath.map((step) => (
              <Link key={step.title} href={step.href} className="relative text-center">
                <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/6 text-sm font-semibold text-brand-soft">
                  {step.title.split(' - ')[0].replace('Step ', '')}
                </span>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-soft">
                  Step {step.title.split(' - ')[0].replace('Step ', '')}
                </p>
                <p className="mt-2 font-serif-playfair text-lg font-semibold leading-snug text-white sm:text-xl">
                  {step.title.split(' - ')[1]}
                </p>
                <p className="mt-2 text-sm leading-[1.7] text-white/70 sm:text-[15px]">
                  {step.copy}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="section-shell">
          <h2 className="text-center font-serif-playfair text-3xl font-semibold leading-tight text-text sm:text-[34px]">
            Who these are built for
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-center text-base leading-[1.65] text-text-muted sm:text-[17px]">
            These resources are best for:
          </p>

          <ul className="mx-auto mt-10 grid max-w-4xl gap-x-8 gap-y-5 sm:grid-cols-2">
            {[
              'AI, SaaS, and API founders',
              'pre-seed to Series A teams',
              'product and GTM leads working through pricing questions',
              'operators who need sharper monetization decisions before hiring outside help',
            ].map((audience) => (
              <li
                key={audience}
                className="flex items-center gap-2.5 border-t border-border pt-4 text-base leading-[1.75] text-text sm:text-[17px]"
              >
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand" />
                <span>{audience}</span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-[1.65] text-text-muted sm:text-[17px]">
            That audience matches the current positioning of the Matchmaker, Roadmap, and broader
            site.
          </p>
        </div>
      </section>

      <section className="relative z-10 -mb-12 pb-6 pt-12 sm:-mb-20 sm:pb-8 sm:pt-14">
        <div className="section-shell text-center">
          <div className="cta-panel">
            <h2 className="mx-auto max-w-4xl font-serif-playfair text-3xl font-semibold leading-tight text-text sm:text-[34px]">
              Need a sharper answer than a free resource can give you?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-[1.65] text-text-muted sm:text-[17px]">
              The free resources are built to help you self-serve. But if you need a faster
              recommendation, clearer tradeoffs, or direct help with a live commercial decision, start
              with the 90-minute commercial strategy session.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link href="/consulting/entry-offer/form" className={primaryButtonSm}>
                Book the 90-Minute Session <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
              <Link href="/consulting" className={outlineButton}>
                Explore Work With Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
