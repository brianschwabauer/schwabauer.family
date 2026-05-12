import { DurableObject } from "cloudflare:workers";

export interface Rsvp {
  id: number;
  name: string;
  comment: string | null;
  created_at: number;
}

export interface RsvpPayload {
  name: string;
  comment?: string | null;
}

const MAX_NAME = 80;
const MAX_COMMENT = 250;

export class RsvpDO extends DurableObject<Env> {
  #sql: SqlStorage;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.#sql = ctx.storage.sql;
    this.#sql.exec(`
			CREATE TABLE IF NOT EXISTS rsvps (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				comment TEXT,
				created_at INTEGER NOT NULL
			);
			CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps (created_at DESC);
		`);
  }

  list(limit = 200): Rsvp[] {
    return this.#sql
      .exec<Rsvp>(
        "SELECT id, name, comment, created_at FROM rsvps ORDER BY created_at DESC LIMIT ?",
        limit,
      )
      .toArray();
  }

  count(): number {
    return this.#sql.exec<{ c: number }>("SELECT COUNT(*) AS c FROM rsvps").one().c;
  }

  create(payload: RsvpPayload): Rsvp {
    const name = (payload.name ?? "").trim().slice(0, MAX_NAME);
    const comment = payload.comment ? String(payload.comment).trim().slice(0, MAX_COMMENT) : null;
    if (!name) throw new Error("Name is required.");
    return this.#sql
      .exec<Rsvp>(
        "INSERT INTO rsvps (name, comment, created_at) VALUES (?, ?, ?) RETURNING id, name, comment, created_at",
        name,
        comment,
        Date.now(),
      )
      .one();
  }
}

interface Env {
  RSVP: DurableObjectNamespace<RsvpDO>;
}

function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      ...(init.headers ?? {}),
    },
  });
}

function stub(env: Env, year: string) {
  const id = env.RSVP.idFromName(`funrun-${year}`);
  return env.RSVP.get(id);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") return json(null, { status: 204 });

    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    // Routes: /rsvp/:year/list | /rsvp/:year/create
    if (parts[0] !== "rsvp" || !parts[1]) return json({ error: "Not found" }, { status: 404 });

    const year = parts[1];
    if (!/^\d{4}$/.test(year)) return json({ error: "Invalid year" }, { status: 400 });

    const rsvp = stub(env, year);

    try {
      if (parts[2] === "list" && request.method === "GET") {
        const rsvps = await rsvp.list(200);
        return json({ rsvps, total: rsvps.length });
      }
      if (parts[2] === "create" && request.method === "POST") {
        const body = (await request.json()) as RsvpPayload;
        const created = await rsvp.create(body);
        return json({ rsvp: created });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Server error";
      return json({ error: message }, { status: 500 });
    }

    return json({ error: "Not found" }, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
