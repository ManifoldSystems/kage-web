# Kage

Engineering is a loop. Plan. Build. Review. Test. Iterate.

Product site for Kage, an autonomous engineering system that coordinates AI agents through the full engineering cycle — from objective to verified outcome.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Cloudflare Workers (static assets + `/api/*`)

## Development

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build       # production build
npm run preview     # preview the build locally
npx wrangler deploy # deploy to Cloudflare Workers
```

`npm run typecheck` runs TypeScript with no emit.

---

A [Manifold Systems](https://github.com/ManifoldSystems) project.
