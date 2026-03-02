# GitHub Copilot Instructions



## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict mode)
- **UI**: React (functional components)
- **Styling**: Tailwind CSS + custom CSS variables in `globals.css`
- **i18n**: Custom context-based solution (EN / DE)

### Build / Deploy

The app deploys as a static export to GitHub Pages via GitHub Actions. The `GITHUB_ACTIONS` env var in `next.config.ts` controls the switch between dev and production output modes.

---

## Project Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Main page — owns top-level state
├── components/             # Feature components (each in their own folder)
├── hooks/                  # Shared custom hooks
├── i18n/                   # Language context and translation dictionaries
└── styles/                 # Global CSS
```

---

## Key Conventions

### State & Data Flow
- Top-level input state lives in `page.tsx` and is passed down as props.
- All measurement values are in **mm** — reflect this in variable names and comments.

### i18n
- All UI strings go through the `i18n(key)` function from `useLanguage()`.
- Translation keys are defined in `lang.ts`. Always add new keys to **both** `en` and `de` dictionaries.

### Styling
- Use Tailwind utility classes for layout.
- Use custom CSS classes defined in `globals.css` for component-level styles.
- Follow **BEM** naming when adding new CSS classes.
- Design tokens (colours, spacing, etc.) are defined as CSS custom properties in `globals.css` — use those variables instead of hardcoding values.

---

## React Components

Use functional components with explicit TypeScript interfaces:

```typescript
import React from 'react';

export interface MyProps {
  propA: string;
  propB?: number;
}

export const MyComponent: React.FC<MyProps> = ({ propA, propB }) => {
  return <div>{propA}</div>;
};
```

- Add `'use client'` when a component uses hooks or browser APIs.
- Export prop interfaces so they can be reused across components.

---

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run start        # Start production server
```

## Best Practices

1. Prefer TypeScript (`.ts`, `.tsx`) over JavaScript
2. Follow BEM naming for new CSS classes
3. Include `.spec.js` files for test coverage
4. Add `'use client'` when using hooks or browser APIs
5. Always add translations for both `en` and `de` when adding new UI strings
6. All measurement values are in **mm** — reflect this in comments and variable names
