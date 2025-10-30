# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server with Turbopack on http://localhost:3000
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint
```

## Project Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19
- **Styling**: Tailwind CSS v4 with custom animations (`tw-animate-css`)
- **Graphics**: OGL (WebGL library) for light ray effects
- **Analytics**: PostHog (client-side tracking via `posthog-js`)
- **Type System**: TypeScript with strict mode enabled

### Path Aliases
- `@/*` maps to the root directory (e.g., `@/components`, `@/lib`)

### Key Architecture Patterns

**App Router Structure**: This project uses Next.js App Router (not Pages Router). All routes are defined in the `app/` directory.

**Component Organization**:
- `components/` - Reusable UI components
- `app/` - Route-specific pages and layouts
- `lib/` - Utility functions and constants
- `public/` - Static assets (icons, images)

**Type Definitions**: Global type definitions are in `types.d.ts` at the root level, not in a separate `types/` directory.

**PostHog Integration**: Analytics is initialized in `instrumentation-client.ts` with custom proxy routes configured in `next.config.ts` to route through `/ingest/*` endpoints. The PostHog API key should be set as `NEXT_PUBLIC_POSTHOG_KEY` environment variable.

**WebGL Effects**: The `LightRays` component uses the OGL library (not Three.js) to render custom shader-based light ray animations. It implements:
- Custom vertex and fragment shaders
- Mouse tracking with smooth interpolation
- Intersection Observer for performance optimization
- Multiple configuration options (origin, color, speed, spread, etc.)

**Styling Approach**: 
- Uses Tailwind CSS v4 (latest major version with PostCSS plugin `@tailwindcss/postcss`)
- Custom font setup using `next/font/google` with Schibsted Grotesk and Martian Mono
- CSS variables are enabled in `components.json` for theming

### Data Flow
Static event data is stored in `lib/constants.ts` and rendered via the `EventCard` component. Events are currently hardcoded—no backend or CMS integration exists.
