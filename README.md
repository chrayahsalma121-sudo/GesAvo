# Lexis Pro — Law Firm Management App

A React single-page dashboard for law-firm management, redesigned with Tailwind CSS and localized for Moroccan legal offices.

## What changed

- Replaced the old component CSS string with Tailwind CSS utility classes.
- Added Arabic, French, and English language switching.
- Added RTL layout support when Arabic is selected.
- Added dark/light mode switching with preference saved in `localStorage`.
- Localized the mock data for Morocco: Moroccan cities, courts, CIN/CNIE, and MAD currency.
- Cleaned default Create React App files that were not used.

## Run the project

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Main files

```txt
src/law-firm-app.jsx   Main app, translations, components, pages, modals
src/index.css          Tailwind directives + global font setup
tailwind.config.js     Tailwind theme, dark mode, and custom law-firm colors
```

## Notes

The app still uses mock data stored in React state. For production, add authentication, backend APIs, database storage, file upload handling, and role-based permissions.
