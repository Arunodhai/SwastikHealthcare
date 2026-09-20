# Swastik Healthcare

React and Vite website for Swastik Healthcare, with content managed through Sanity Studio.

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`. Sanity Studio is available at `/studio`.

## Checks

```bash
npm run lint
npm run build
```

## Netlify deployment

This repository includes `netlify.toml` with the required Vite build and single-page application routing configuration.

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`

The public Sanity project ID and dataset are configured in the application. After Netlify assigns the production domain, add that exact `https://` origin to Sanity with credentials enabled so the embedded `/studio` route can authenticate.
