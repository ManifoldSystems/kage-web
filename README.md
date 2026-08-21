# kage-web

Product site for [Kage](https://github.com/algonacci/kage), an engineering workflow orchestrator for
AI coding agents.

Kage does not implement a coding agent; it drives the ones you already have installed, through
`TASK -> PLAN -> EXECUTE -> TEST -> REVIEW -> DECISION -> DONE`, with a `FIX` arrow back to `TEST`.
Note the order: TEST runs before REVIEW, so a build that does not pass never reaches the reviewer.

This repository is the marketing site only. It contains no part of Kage itself, and nothing here
runs a Kage loop.

## Keeping the copy true

Every claim on this page is checked against the Kage repository, not against an earlier draft of the
page. When editing content, the sources of truth are:

- `kage/README.md` — the loop diagram, the command table, and the **Scope** section
- `kage/AGENTS.md` — the decisions behind the code and its **Known gaps** list
- `kage/src/config/schema.rs` — the shape of `.kage/config.yaml`; unknown keys are a hard error, so
  a config sample that cannot be pasted is worse than no sample
- `kage/src/state/run.rs` — the `Phase` enum, which is what the loop stages must be named after
- `kage/src/adapters/` — which harnesses are actually supported

Kage is v0.1: one planner, one executor, one reviewer. No DAGs, no parallel agents, no dynamic
delegation, one repository per run. Under-claiming is fine here; over-claiming is not.

Nearly all site copy lives in `src/data/kage.ts`; the components are in `src/components/Kage.tsx`
and the page is assembled in `src/main.tsx`.

## Installing Kage

Kage is installed from a checkout:

```bash
cargo install --path .
```

There is no published Kage crate. The name `kage` on crates.io belongs to an unrelated project, so
`cargo install kage` would install someone else's software.

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

Deployment is handled by Vercel: pushes to `main` deploy to production, and pull requests get
preview URLs.

---

A [Manifold Systems](https://github.com/ManifoldSystems) project.
