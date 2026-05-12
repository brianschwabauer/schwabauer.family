/**
 * Thin client for the @schwabauerfamily/server worker.
 *
 * Calls go through the SvelteKit platform's service binding to the server
 * worker — which works identically in dev (Miniflare wires it to the local
 * `wrangler dev` instance) and in production (Cloudflare's real service
 * binding). No HTTP/localhost fallbacks needed.
 */

export interface Rsvp {
	id: number;
	name: string;
	comment: string | null;
	created_at: number;
}

interface ListResponse {
	rsvps: Rsvp[];
	total: number;
}

interface CreateResponse {
	rsvp: Rsvp;
}

interface ErrorResponse {
	error: string;
}

async function call<T>(
	platform: App.Platform | undefined,
	path: string,
	init?: RequestInit,
): Promise<T> {
	if (!platform?.env?.SERVER) {
		throw new Error(
			"Server binding is unavailable. Make sure 'wrangler dev' is running for the server worker.",
		);
	}
	// The host portion doesn't matter — service bindings ignore it.
	const url = `https://server${path}`;
	const res = await platform.env.SERVER.fetch(url, init);
	if (!res.ok) {
		const body = (await res.json().catch(() => ({}))) as Partial<ErrorResponse>;
		throw new Error(body.error ?? `Server returned ${res.status}`);
	}
	return (await res.json()) as T;
}

export function listRsvps(platform: App.Platform | undefined, year: number) {
	return call<ListResponse>(platform, `/rsvp/${year}/list`);
}

export function createRsvp(
	platform: App.Platform | undefined,
	year: number,
	body: { name: string; comment: string | null },
) {
	return call<CreateResponse>(platform, `/rsvp/${year}/create`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(body),
	});
}
