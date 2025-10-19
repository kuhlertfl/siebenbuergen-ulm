# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.6 website for the Siebenbürger Sachsen Ulm e.V. (Transylvanian Saxons Ulm association), a cultural organization preserving Transylvanian Saxon heritage in Ulm, Germany. The site is in German and features event calendars, community information, and photo galleries.

## Development Commands

**Development server:**
```bash
npm run dev
```
Runs Next.js dev server with Turbopack at http://localhost:3000

**Production build:**
```bash
npm run build
```
Builds with Turbopack for production deployment

**Start production server:**
```bash
npm start
```
Runs the production build

**Linting:**
```bash
npm run lint
```
Runs ESLint with Next.js config

## Technology Stack

- **Framework:** Next.js 15.5.6 with App Router
- **React:** 19.1.0
- **Styling:** Tailwind CSS v4 with PostCSS
- **Fonts:** Geist Sans and Geist Mono (via next/font/google)
- **Build tool:** Turbopack (enabled by default)

## Architecture

### App Structure

The project uses Next.js App Router with the following structure:

- `src/app/page.js` - Main homepage (client component with interactive calendar and event listings)
- `src/app/layout.js` - Root layout with metadata, fonts, and German language setting
- `src/app/berichte/page.js` - Reports/news page
- `src/app/datenschutz/page.js` - Privacy policy page
- `src/app/impressum/page.js` - Legal notice/imprint page
- `src/app/globals.css` - Global styles with Tailwind v4 inline theme configuration

### Path Aliases

jsconfig.json configures `@/*` to resolve to `./src/*`

### Client Components

The homepage (`page.js`) is a client component (`"use client"`) with:
- Interactive event calendar that dynamically updates based on selected events
- Mobile-responsive navigation with hamburger menu
- Event listings with calendar week calculations
- State management for selected events, current month, and mobile menu

### Styling Approach

- Tailwind CSS v4 with inline theme configuration
- Custom CSS variables for background/foreground colors
- Dark mode support via prefers-color-scheme
- Custom fade-in animation defined in globals.css
- Extensive use of gradient backgrounds, border effects, and backdrop blur
- Color scheme: Yellow/amber accents with red/blue gradients reflecting Transylvanian Saxon coat of arms colors

### Static Assets

- `/public/pictures/` contains images including coat of arms, event photos, and background images
- `/public/documents/` contains downloadable PDFs (membership forms)

## Key Features

**Event Management:**
- Hardcoded event list in `UPCOMING_EVENTS` array (src/app/page.js:6-37)
- Dynamic calendar rendering based on selected month
- Calendar week and weekday calculations (getWeekNumber, getWeekday functions)

**Navigation:**
- Desktop navigation in header
- Mobile hamburger menu with overlay
- Smooth scrolling enabled via globals.css

**Responsive Design:**
- Different backgrounds for mobile (gradient with coat of arms watermark) vs desktop (photo background)
- Mobile-first approach with breakpoints at sm, md, and lg

## Important Notes

- All text content is in German
- Events are currently hardcoded - when adding new events, update the `UPCOMING_EVENTS` array in src/app/page.js
- When updating calendar months, update the `monthData` object in the `renderCalendar` function (src/app/page.js:71-75)
- The site references "Bürgerzentrum Wiblingen" as the primary event location
