# schwabauer.family

A tiny private corner of the internet for the Schwabauer family. Two
Cloudflare Workers (SvelteKit app + Durable Object server) deployed
side-by-side, wired with a service binding.

## Layout

```
schwabauerfamily/
├── delightstack/         git submodule
├── app/
│   ├── server/           Durable Object worker (RsvpDO + SQLite)
│   │   ├── src/index.ts
│   │   └── wrangler.toml
│   ├── src/              SvelteKit app
│   │   ├── lib/server/rsvp.ts   thin client over the service binding
│   │   └── routes/...
│   └── wrangler.jsonc    SvelteKit worker (service-binds SERVER → app/server)
└── pnpm-workspace.yaml
```

The SvelteKit worker never talks to the DO directly. It calls
`platform.env.SERVER.fetch(...)`, which:

- In dev, Miniflare routes to the locally running `wrangler dev` instance of
  `app/server` (`[connected]` shows in the dev output).
- In production, Cloudflare's real service binding routes to the deployed
  `schwabauerfamily-server` worker.

Same code path in both environments — no `if (dev)` branching.

## Pages

- `/` — warm hero with the family name in Fraunces display, placeholder
  portrait, link to the fun run, "coming soon" teaser.
- `/funrun` — landing page for **Let Freedom Run**. Animated canvas
  fireworks (click anywhere to spawn more), event details, RSVP form, live
  who's-in list, photo gallery placeholders.

## RSVPs

The `RsvpDO` SQLite-backed Durable Object lives in `app/server/`. Each year
gets its own DO instance keyed by `idFromName('funrun-${year}')` — so
re-using the page next year is a one-line bump (`EVENT_YEAR` in
`app/src/routes/funrun/+page.server.ts`) and the previous year's RSVPs
stay intact in their own DB.

## First-time setup

```bash
git submodule update --init
pnpm install
```

`pnpm install` also builds delightstack's component/utility packages
via a postinstall hook.

## Dev

```bash
pnpm dev
```

Runs both workers in parallel via `concurrently`:
- `wrangler dev` for the server worker on `:8787`
- `vite dev` for the SvelteKit app on `:5175`

The output is prefixed with `[server]` / `[svelte]` so it's easy to follow.

## Deploy

```bash
pnpm deploy
```

Deploys the server worker first (so its DO class is registered before the
SvelteKit app's service binding tries to call it), then builds and deploys
the SvelteKit worker.

## Drop-in content

- Family hero photo → `app/static/family/family.jpg` (replaces the SVG
  placeholder). No code change needed.
- Fun-run gallery → drop images into `app/static/funrun/2025/` (the
  previous year) and they'll appear in the gallery section.

## Stack

- Svelte 5 (runes) + SvelteKit 2 + adapter-cloudflare 7
- Vite 7 (Rolldown under the hood)
- TypeScript via `tsgo` (`@typescript/native-preview`) when available; falls
  back to `tsc`
- Formatting via `oxfmt` when available; falls back to Prettier
- Linting via `oxlint`
- Vanilla CSS with custom properties and `light-dark()`. No Tailwind.
- `concurrently` to run dev processes in parallel
