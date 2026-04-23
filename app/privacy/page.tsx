import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sarah Zou, PhD',
  description:
    'How sarahzou.com collects, uses, and protects your data. Covers analytics cookies, contact-form submissions, and newsletter sign-ups.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://sarahzou.com/privacy' },
  openGraph: {
    title: 'Privacy Policy | Sarah Zou, PhD',
    description:
      'How sarahzou.com collects, uses, and protects your data.',
    type: 'website',
    url: 'https://sarahzou.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-text mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none text-text text-base sm:text-[17px] leading-[1.65] space-y-6">
          <p>
            <strong>Effective date:</strong> February 21, 2026
          </p>

          <p>
            This site (<Link href="/" className="text-brand-ink hover:underline font-medium">sarahzou.com</Link>) is
            operated by Sarah Zou / EconNova Consulting. Your privacy matters — this page explains what
            data is collected, why, and how it is handled.
          </p>

          <h2>1. Analytics</h2>
          <p>
            This site uses Google Analytics 4 with anonymized IP addresses to understand how
            visitors interact with content (pages viewed, time on page, referral source). No
            personally identifiable information is sent to Google unless you explicitly provide it
            via a form. You can opt out of analytics cookies through the cookie consent banner that
            appears on your first visit.
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
            The "Book Free Consult" feature uses Cal.com. When you book a meeting, your name
            and email are processed by Cal.com under their privacy policy. No payment information
            is collected.
          </p>

          <h2>5. Cookies</h2>
          <p>
            This site sets the following cookies:
          </p>
          <ul>
            <li>
              <strong>Google Analytics</strong> (<code>_ga</code>, <code>_ga_*</code>) — traffic
              analysis. Set only if you accept cookies.
            </li>
            <li>
              <strong>Cookie consent preference</strong> (<code>econova-cookie-consent</code>) — remembers your choice. Always set.
            </li>
          </ul>

          <h2>6. Third-party services</h2>
          <p>
            Beyond those listed above, the site uses Vercel for hosting and may load fonts from
            Google Fonts. No other third-party trackers or advertising networks are used.
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
  );
}
