export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      const targetUrl = `http://77.90.42.18:1025${url.pathname}${url.search}`;
      
      // Kopiere die Header und passe den Host an
      const newHeaders = new Headers(request.headers);
      newHeaders.set("Host", "77.90.42.18:1025");

      const newRequest = new Request(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.body
      });

      try {
        const response = await fetch(newRequest);
        return response;
      } catch (err) {
        // Falls Cloudflare den Server nicht erreicht, senden wir echtes JSON!
        return new Response(JSON.stringify({ 
          status: "error", 
          message: `Cloudflare konnte das Bot-Backend nicht erreichen: ${err.message}` 
        }), {
          status: 502,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};
