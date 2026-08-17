# Kage

Engineering is a loop. Plan. Build. Review. Test. Iterate.

Product site for Kage, an autonomous engineering system that coordinates AI agents through the full engineering cycle — from objective to verified outcome.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Deployed on Vercel

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # production build
npm run preview   # preview the build locally
```

`npm run typecheck` runs TypeScript with no emit.

Deployment is handled by Vercel: pushes to `main` deploy to production, and pull requests get preview URLs.

---

A [Manifold Systems](https://github.com/ManifoldSystems) project.
