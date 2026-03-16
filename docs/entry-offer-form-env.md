# Entry offer form: environment variable

The form at `/consulting/entry-offer/form` POSTs to a Google Apps Script web app. The URL is read from:

- **`NEXT_PUBLIC_PRICING_SESSION_FORM_URL`**

Next.js inlines `NEXT_PUBLIC_*` at **build time**. If this variable is missing when the app is built, the form action is empty and submissions hit the same page → **405 Not Allowed**.

## Where to set it

### Local / development

- **File:** `.env.local` (create in project root if it doesn’t exist; do not commit).
- **Value:** Your Apps Script web app URL, e.g.  
  `https://script.google.com/macros/s/…/exec`
- **After changing:** Restart the dev server (`npm run dev`).

### Production (e.g. Vercel)

- **Where:** Your hosting dashboard, in the project’s **Environment Variables** (or equivalent).
  - **Vercel:** Project → **Settings** → **Environment Variables**. Add `NEXT_PUBLIC_PRICING_SESSION_FORM_URL` for the environment(s) used when building (usually **Production** and optionally **Preview**).
- **Value:** Same Apps Script URL as above.
- **When:** Set it **before** the next build. If the variable is added after a build, the existing deployment still has an empty form action until you **redeploy** (trigger a new build so the URL is inlined into the client bundle).

### Confirming it’s set

- **Local:** If the variable is missing, the form page shows an amber “Form URL not set” message and the Submit button is disabled.
- **Production:** After a build with the variable set, the rendered form’s `action` attribute in the HTML will be the full `https://script.google.com/…/exec` URL. Use “View page source” or DevTools on the form page to verify.
