import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Sarah Zou, PhD',
  description:
    'How sarahzou.com collects, uses, and protects your data. Covers analytics cookies, contact-form submissions, and newsletter sign-ups.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://sarahzou.com/privacy' },
  openGraph: {
    title: 'Privacy Policy | Sarah Zou, PhD',
    description: 'How sarahzou.com collects, uses, and protects your data.',
    type: 'website',
    url: 'https://sarahzou.com/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="bg-page text-text">
      <section className="border-b border-border-soft bg-surface">
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
            Legal
          </p>
          <h1 className="mt-5 font-serif-playfair text-ink">Privacy Policy</h1>
          <p className="mt-6 max-w-[42rem] text-[17px] leading-[1.8] text-text-muted">
            A plain-language account of what this site collects, why it is collected, and the
            choices available to you.
          </p>
        </div>
      </section>

      <section>
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <div className="prose prose-lg max-w-[58rem] text-text text-base leading-[1.75] sm:text-[17px]">
            <p>
              <strong>Effective date:</strong> July 20, 2026
            </p>

            <p>
              This site (
              <Link href="/" className="text-brand-ink hover:underline font-medium">
                sarahzou.com
              </Link>
              ) is operated by Sarah Zou / EconNova Consulting. Your privacy matters — this page
              explains what data is collected, why, and how it is handled.
            </p>

            <h2>1. Analytics and measurement</h2>
            <p>
              This site uses Google Analytics 4 to understand how visitors interact with content and
              Google Ads conversion measurement to understand whether marketing leads to a
              consultation request. Optional analytics and advertising storage remain disabled
              unless you accept them through the cookie banner. Declining optional cookies does not
              affect access to the site.
            </p>

            <h2>2. Contact forms</h2>
            <p>
              When you submit a contact form, the information you provide (name, email, company,
              message, and any optional fields) is sent to a private Google Apps Script endpoint and
              stored in a Google Sheets document accessible only to Sarah Zou. This data is used
              solely to respond to your inquiry and is never sold or shared with third parties.
            </p>

            <h2>3. Newsletter</h2>
            <p>
              Newsletter sign-ups are managed through Substack. When you subscribe, your email
              address is stored by Substack under their{' '}
              <a
                href="https://substack.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-ink hover:underline font-medium"
              >
                privacy policy
              </a>
              . You can unsubscribe at any time via the link in every email.
            </p>

            <h2>4. Booking</h2>
            <p>
              The booking page uses Calendly. When you book a meeting, your name, email, and
              scheduling details are processed by Calendly under its{' '}
              <a
                href="https://calendly.com/legal/privacy-notice"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-ink hover:underline"
              >
                privacy notice
              </a>
              . No payment information is collected.
            </p>

            <h2>5. Cookies and local storage</h2>
            <p>This site may use the following browser storage:</p>
            <ul>
              <li>
                <strong>Google Analytics</strong> (<code>_ga</code>, <code>_ga_*</code>) — traffic
                analysis. Set only if you accept cookies.
              </li>
              <li>
                <strong>Google Ads conversion measurement</strong> — used to understand whether a
                marketing visit results in an inquiry or booking. Advertising storage is enabled
                only if you accept optional cookies and may include <code>_gcl_*</code> identifiers.
              </li>
              <li>
                <strong>Consent preference</strong> (<code>econova-cookie-consent</code>) — stored
                in your browser&apos;s local storage so the site remembers your choice.
              </li>
            </ul>

            <h2>6. Third-party services</h2>
            <p>
              Beyond those listed above, the site uses GitHub Pages for hosting and Cloudflare for
              traffic delivery and URL handling. Fonts are delivered with the site rather than
              loaded from a third-party font service in your browser.
            </p>

            <h2>7. Data retention</h2>
            <p>
              Contact-form submissions are retained as long as needed to respond and for reasonable
              follow-up. Analytics data is retained according to the default Google Analytics 4
              retention period (14 months).
            </p>

            <h2>8. Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of any personal data collected
              through this site by emailing{' '}
              <a
                href="mailto:hello@sarahzou.com"
                className="text-brand-ink hover:underline font-medium"
              >
                hello@sarahzou.com
              </a>
              .
            </p>

            <h2>9. Changes</h2>
            <p>
              This policy may be updated from time to time. Material changes will be noted with an
              updated effective date at the top of this page.
            </p>

            <hr className="my-8 border-border-subtle" />

            <p className="text-sm text-text-muted">
              Questions? Email{' '}
              <a
                href="mailto:hello@sarahzou.com"
                className="text-brand-ink hover:underline font-medium"
              >
                hello@sarahzou.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
