import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { listRsvps, createRsvp } from "$lib/server/rsvp";

const EVENT_YEAR = new Date().getFullYear();

export const load: PageServerLoad = async ({ platform, setHeaders }) => {
  setHeaders({ "cache-control": "no-store" });
  const { rsvps, total } = await listRsvps(platform, EVENT_YEAR);
  return { rsvps, total, year: EVENT_YEAR };
};

export const actions: Actions = {
  default: async ({ request, platform }) => {
    const form = await request.formData();
    const name = String(form.get("name") ?? "").trim();
    const comment = String(form.get("comment") ?? "").trim() || null;

    if (!name) return fail(400, { name, comment, error: "Please tell us your name." });
    if (name.length > 80)
      return fail(400, {
        name,
        comment,
        error: "Name is a bit long — keep it under 80 characters.",
      });
    if (comment && comment.length > 250)
      return fail(400, {
        name,
        comment,
        error: "Comment must be 250 characters or less.",
      });

    try {
      await createRsvp(platform, EVENT_YEAR, { name, comment });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save RSVP.";
      return fail(500, { name, comment, error: message });
    }
    return { success: true };
  },
};
