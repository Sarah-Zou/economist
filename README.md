# Personal Website

A modern personal website for a Fractional Economist & SaaS/AI Strategist, built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- Responsive design with mobile-first approach
- Modern UI components using shadcn/ui
- Calendly integration for scheduling
- Buttondown newsletter integration
- SEO optimized
- Smooth scrolling navigation
- Case studies and service showcase
- Blog post previews

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React Icons

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_CALENDLY_URL=your_calendly_url
NEXT_PUBLIC_BUTTONDOWN_API_KEY=your_buttondown_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This site is configured for deployment on Netlify. To deploy:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Log in to Netlify and click "New site from Git"

3. Choose your repository and configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

4. Add your environment variables in the Netlify dashboard:
   - `NEXT_PUBLIC_CALENDLY_URL`
   - `NEXT_PUBLIC_BUTTONDOWN_API_KEY`

5. Deploy!

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── consulting/        # Consulting page
│   ├── newsletter/        # Newsletter page
│   └── about/            # About page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Hero.tsx         # Hero section
│   ├── ServiceCard.tsx  # Service card component
│   └── ...
├── public/               # Static assets
│   ├── headshot.jpg     # Profile image
│   └── logos/           # Company logos
└── styles/              # Global styles
```

## Customization

1. Update the content in each page component
2. Replace placeholder images in the `public` directory
3. Modify the color scheme in `tailwind.config.js`
4. Update the Calendly and Buttondown integrations with your own accounts

## License

MIT 