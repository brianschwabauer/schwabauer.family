# Notes for Claude

## Formatting
Always run `pnpm -C app format` after editing any code in this repo. Runs `oxfmt . || prettier --write .` so the working tree stays consistent. Don't leave unformatted changes for the user to clean up.

## Dev
- `pnpm dev` starts both workers via `concurrently` (server on :8787, vite on :5175).
- Two workers, one service binding. SvelteKit calls the DO worker via `platform.env.SERVER.fetch(...)` — same path in dev and prod.

## Architecture
- `app/` — SvelteKit app (Cloudflare worker)
- `app/server/` — Durable Object worker, owns `RsvpDO` (SQLite, one DB per event year)
- `delightstack/` — git submodule; pnpm workspace exposes its component/utility/auth packages

## Stack quirks
- Svelte 5 runes
- adapter-cloudflare 7 writes the worker bundle to `.svelte-kit/cloudflare/_worker.js`. We let it use the default path — no custom `main` overrides, no post-build inject scripts.
- The submodule's `dist/` directories are gitignored upstream and rebuilt locally by the root `postinstall` script.
