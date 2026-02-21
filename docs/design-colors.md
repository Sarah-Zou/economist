# Design Colors

This project uses a tokenized brand color system. Do not introduce ad-hoc orange shades.

## Approved Orange Tokens

- `brand.DEFAULT` / `--color-brand-default`: `#ff5722`
- `brand.ink` / `--color-brand-ink`: `#c2410c`
- `brand.soft` / `--color-brand-soft`: `#fff1eb`
- `brand.on` / `--color-brand-on`: `#ffffff`

## Usage Rules

- Use `brand.DEFAULT` for primary filled CTA surfaces.
- Primary CTA text and icons on orange backgrounds must be white (`brand.on`).
- CTA typography on orange must be large/bold for contrast (for example `text-[19px]` + `font-bold`).
- Use `brand.ink` for orange text on white or light backgrounds (links, small labels, icon accents).
- Use `brand.soft` for subtle highlight backgrounds and soft orange tints.
- Do not use Tailwind `orange-*` utilities.
- Do not add new orange hex values directly in component/page code.

## Accessibility Notes

- White on `#ff5722` is acceptable for large, bold CTA text.
- For small text on light backgrounds, use `brand.ink` instead of `brand.DEFAULT`.
- For any orange surface, ensure text and icons are white.

## Guardrail

CI runs `npm run check:color-drift` to prevent color drift:

- Fails on disallowed orange hexes:
  - `#e44e1f`
  - `#e64a19`
  - `#9a3412`
  - `#ffe0d6`
  - `#fff8f5`
  - `#fff5f2`
- Fails on Tailwind `orange-*` utility classes.
