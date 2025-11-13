# Deploying YOLO to Cloudflare Pages + Workers

This project is configured to build correctly when hosted from the `/yolo/` sub-path on `flent.in`. Follow the steps below to deploy without impacting the primary Webflow site.

## 1. Create a Cloudflare Pages project

1. In Cloudflare, create a new **Pages** project from this repository.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set the following Pages environment variables (Production & Preview):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_BASE_PATH=/yolo/`

> `VITE_BASE_PATH` forces the Vite build to emit assets relative to `/yolo/`, which matches the final URL structure on Cloudflare.

## 2. Deploy the Pages project

Trigger a production deploy. The site will be available at `https://<project>.pages.dev/yolo/` and is safe to test there.

## 3. Add the Cloudflare Worker proxy

To serve the app from `flent.in/yolo` while leaving the main Webflow site intact, create a Worker that proxies to your Pages deployment.

Example Worker (update `PAGES_ORIGIN` with your Pages URL):

```ts
const PAGES_ORIGIN = "https://<your-pages-project>.pages.dev";

export default {
  async fetch(request: Request) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith("/yolo")) {
      // Not our path – let Webflow handle it.
      return fetch(request);
    }

    // Rewrite /yolo/foo -> https://<pages>/foo
    const targetPath = url.pathname.replace(/^\/yolo/, "") || "/";
    const targetUrl = new URL(targetPath + url.search, PAGES_ORIGIN);

    // Preserve method/headers/body for POSTs (e.g. Supabase forms)
    const init: RequestInit = {
      method: request.method,
      headers: request.headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.clone().arrayBuffer(),
      redirect: "manual",
    };

    const response = await fetch(targetUrl, init);

    // Mirror response back to the original caller
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  },
};
```

### Worker deployment notes

1. Save the worker (for example `workers/yolo-proxy.ts`) and deploy with `wrangler`.
2. Configure the worker route to match `flent.in/yolo*`.
3. Set `PAGES_ORIGIN` via Worker environment variable if you don’t want the value hard-coded.

## 4. DNS / routing

- Keep the existing Webflow DNS records.
- In Cloudflare, add a Worker route for `flent.in/yolo*` pointing to the proxy Worker.
- Optionally create a dedicated Pages custom domain (`yolo.flent.in`) for testing before enabling the Worker route.

## 5. Post-deploy verification

- Visit `https://flent.in/yolo` and ensure all assets, videos, and form submissions work.
- Confirm Supabase receives referral and notification entries.
- Check that navigating away from `/yolo` still loads the Webflow site (Worker should fall through for other paths).

With these pieces in place, the YOLO microsite will live at `flent.in/yolo` without disturbing the main site.
