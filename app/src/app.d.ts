/// <reference types="@cloudflare/workers-types" />

declare global {
  namespace App {
    interface Platform {
      env: {
        /**
         * Service binding to the @schwabauerfamily/server worker
         * (the one that owns the RsvpDO). In dev, points at the
         * locally running `wrangler dev` instance; in prod, the
         * deployed sibling worker.
         */
        SERVER: Fetcher;
      };
      cf?: CfProperties;
      ctx: ExecutionContext;
    }
    interface Locals {}
    interface PageData {}
    interface Error {}
  }
}

export {};
